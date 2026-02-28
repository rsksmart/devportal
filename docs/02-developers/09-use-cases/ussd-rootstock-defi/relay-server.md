---
sidebar_label: Relay Server & Gateway Integration
sidebar_position: 4
title: Building the USSD Relay Server & Gateway Integration
tags: [rsk, rootstock, developers, nodejs, ussd]
description: Build the Node.js Express relay server that bridges Africa's Talking USSD sessions to the InclusiveDeFi smart contract on Rootstock Testnet using ethers.js.
---

# Relay Server & Gateway Integration

This page covers building the Node.js Express server that acts as the bridge between the Africa's Talking USSD gateway and the `InclusiveDeFi` contract on Rootstock Testnet. It also covers registering your USSD callback with Africa's Talking and exposing your local server to the internet using ngrok.


## How the Relay Server Works

The relay server is a stateless HTTP server exposing a single `POST /ussd` endpoint. Each keypress on a user's feature phone triggers Africa's Talking to send an HTTP POST request to this endpoint. The server reads the accumulated session input from the `text` field, determines user intent, calls the appropriate contract function, and returns either a `CON` (continue) or `END` (terminate) response string.

This proof of concept includes no database, no session store, and no authentication layer. The entire session state lives in the `text` field of each incoming request.

## Creating the Relay Server

Create `index.ts` in your project root:

```typescript
import express, { Request, Response } from 'express';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));

/* -------------------------------------------------------------------------- */
/*                           PROVIDER + RELAYER WALLET                        */
/* -------------------------------------------------------------------------- */

const provider = new ethers.JsonRpcProvider(process.env.RSK_TESTNET_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const ABI = [
  "function getBalance(address user) view returns (uint256)",
  "function transfer(address to, uint256 amount)",
  "function applyForLoan()"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

/* -------------------------------------------------------------------------- */
/*                    SESSION GUARD (PREVENTS DUPLICATE TXs)                  */
/* -------------------------------------------------------------------------- */

const processedSessions = new Set<string>();

// Auto-cleanup sessions after 5 minutes to prevent memory leak
function addSession(sessionId: string) {
  processedSessions.add(sessionId);
  setTimeout(() => processedSessions.delete(sessionId), 5 * 60 * 1000);
}

/* -------------------------------------------------------------------------- */
/*                                DEBUG LOGGER                                */
/* -------------------------------------------------------------------------- */

app.use((req, _res, next) => {
  console.log("USSD HIT");
  console.log("BODY:", req.body);
  next();
});

/* -------------------------------------------------------------------------- */
/*                                  USSD ROUTE                                */
/* -------------------------------------------------------------------------- */

app.post('/ussd', async (req: Request, res: Response) => {
  const { text, phoneNumber, sessionId } = req.body;
  const input = text ? text.split('*') : [''];
  let response = "";

  // Helper to send response
  const send = (msg: string) => {
    res.header('Content-Type', 'text/plain');
    res.send(msg);
  };

  try {

    /* ------------------------------ MAIN MENU ------------------------------ */
    if (text === "") {
      response = `CON Rootstock DeFi (${phoneNumber})
1. My Balance
2. Send Money (P2P)
3. Request Micro-Loan`;
      return send(response);
    }

    /* ---------------------------- BALANCE CHECK ---------------------------- */
    else if (input[0] === "1") {
      try {
        const bal = await contract.getBalance(wallet.address);
        response = `END Your Balance: ${ethers.formatEther(bal)} tRBTC`;
      } catch (err) {
        console.error("Balance fetch error:", err);
        response = "END Failed to fetch balance. Try again.";
      }
      return send(response);
    }

    /* ------------------------------ SEND MONEY ----------------------------- */
    else if (input[0] === "2") {

      // Step 1: Ask for recipient address
      if (!input[1]) {
        response = "CON Enter Recipient Address:";
        return send(response);
      }

      // Step 2: Ask for amount
      else if (!input[2]) {
        response = "CON Enter Amount (in tRBTC):";
        return send(response);
      }

      // Step 3: Execute transfer
      else {
        const sessionKey = `transfer_${sessionId}`;

        // Prevent duplicate transfer
        if (processedSessions.has(sessionKey)) {
          response = "END Transfer already submitted. Please wait for confirmation.";
          return send(response);
        }

        addSession(sessionKey);

        try {
          const to = input[1].trim();
          const amount = ethers.parseEther(input[2].trim());

          console.log(`Sending ${input[2]} tRBTC to ${to}...`);

          // Submit tx — DO NOT await tx.wait() (too slow for USSD timeout)
          const tx = await contract.transfer(to, amount);

          // Confirm in background
          tx.wait()
            .then(() => console.log(`Transfer confirmed: ${tx.hash}`))
            .catch((err: any) => console.error(`Transfer failed on-chain: ${err.reason || err.message}`));

          response = `END Transfer Submitted
To: ${to.substring(0, 10)}...
Tx: ${tx.hash.substring(0, 12)}...
Funds will arrive shortly.`;

        } catch (err: any) {
          processedSessions.delete(`transfer_${sessionId}`);
          console.error("Transfer error:", err);

          if (err.reason?.includes("Insufficient balance")) {
            response = "END Insufficient balance for transfer.";
          } else if (err.reason) {
            response = `END Transfer failed: ${err.reason}`;
          } else {
            response = "END Transfer failed. Check address and balance.";
          }
        }

        return send(response);
      }
    }

    /* ---------------------------- REQUEST LOAN ----------------------------- */
    else if (input[0] === "3") {
      const sessionKey = `loan_${sessionId}`;

      // Prevent duplicate loan tx
      if (processedSessions.has(sessionKey)) {
        response = "END Loan already submitted. Please wait for confirmation.";
        return send(response);
      }

      addSession(sessionKey);

      try {
        console.log("Applying for loan...");

        // Submit tx — DO NOT await tx.wait() (too slow for USSD timeout)
        const tx = await contract.applyForLoan();

        // Confirm in background
        tx.wait()
          .then(() => console.log(`Loan confirmed: ${tx.hash}`))
          .catch((err: any) => console.error(`Loan failed on-chain: ${err.reason || err.message}`));

        response = `END Loan Requested 
Tx: ${tx.hash.substring(0, 12)}...
0.01 tRBTC credited shortly.`;

      } catch (err: any) {
        processedSessions.delete(sessionKey);
        console.error("Loan error:", err);

        if (err.reason?.includes("Existing loan active")) {
          response = "END You already have an active loan.";
        } else if (err.reason) {
          response = `END Loan failed: ${err.reason}`;
        } else {
          response = "END Loan request failed. Try again.";
        }
      }

      return send(response);
    }
    else {
      response = "END Invalid choice. Please try again.";
      return send(response);
    }

  } catch (error) {
    console.error("USSD FATAL ERROR:", error);
    response = "END Something went wrong. Please try again.";
    return send(response);
  }
});

/* -------------------------------------------------------------------------- */
/*                                  SERVER                                    */
/* -------------------------------------------------------------------------- */

app.listen(3000, () => {
  console.log("RSK-USSD Bridge running on port 3000");
});

```

## Understanding the USSD State Machine

The `text` field from Africa's Talking accumulates all user inputs for the session, joined by `*`. The relay server splits on `*` and uses array index to determine the current menu depth:

| `text` value | `input` array | State | Action |
|---|---|---|---|
| `""` | `[""]` | Entry | Show main menu |
| `"1"` | `["1"]` | Balance selected | Call `getBalance()`, end session |
| `"2"` | `["2"]` | Transfer selected | Prompt for recipient |
| `"2*0xABC"` | `["2", "0xABC"]` | Recipient entered | Prompt for amount |
| `"2*0xABC*0.005"` | `["2", "0xABC", "0.005"]` | Amount entered | Execute transfer, end session |
| `"3"` | `["3"]` | Loan selected | Call `applyForLoan()`, end session |

This table driven pattern is the canonical way to implement multi-depth USSD menus without any server side session storage.

## Running the Server

Start the relay server with:
```bash
npm run start-bridge
```
You should see:
<img src="/img/developers/use-cases/ussd/1-start-bridge.png"/>

The server is now listening on `http://localhost:3000/ussd`. Africa's Talking requires a `publicly reachable HTTPS URL` to send USSD callbacks. During local development, use ngrok to tunnel your local port to the internet.

## Exposing the Server with ngrok

Install ngrok from [ngrok.com](https://ngrok.com) and run:

```bash
ngrok http 3000
```
ngrok will output a forwarding URL like:

```plaintext
Forwarding  https://abc123.ngrok-free.app → http://localhost:3000
```

Copy the `https://` URL and register it as your USSD callback in the next step. Note that on the ngrok free tier, the URL changes each time you restart ngrok.

## Registering with Africa's Talking

### Creating a Sandbox Account

1. Sign up at [Africa's Talking](https://africastalking.com) and navigate to the **Sandbox** environment from the top navigation bar.
2. In the sandbox, create a new application or use the default one provided.

### Setting Up the USSD Channel

1. In your Africa's Talking dashboard, go to **USSD** in the left sidebar.
2. Click **Create Channel**.
3. Set a shortcode for sandbox use any value like `*384#`.
4. Set the **Callback URL** to your ngrok HTTPS URL with the path:
   ```bash
   https://abc123.ngrok-free.app/ussd
   ```
5. Set the **HTTP Method** to `POST`.
6. Save the channel.

### Configuring the Simulator

Africa's Talking provides a built-in **USSD Simulator** in the sandbox dashboard. You do not need a physical phone to test.

To use it:

1. Go to **USSD → Simulator** in your dashboard.
2. Enter a phone number (any format, e.g., `+2348012345678`).
3. Dial your shortcode (e.g., `*384#`).
4. The simulator will fire HTTP POSTs to your callback URL and display the USSD responses in real time.

:::note
Keep your ngrok tunnel and relay server running in separate windows terminal while testing. Use ngrok’s web interface at `http://localhost:4040` to view every incoming HTTP request and response in real time. This helps you debug USSD payloads easily.
:::

## What Each Transaction Looks Like On-Chain

When the relay server calls a write function (transfer or applyForLoan), ethers.js performs the following steps:

1. Encodes the function call using the ABI.
2. Estimates gas using the Rootstock node's `eth_estimateGas` RPC method.
3. Signs the transaction with the relayer wallet's private key.
4. Broadcasts it via `eth_sendRawTransaction` to the Rootstock public node.
5. Polls for a receipt using `eth_getTransactionReceipt` until the block is confirmed.

The `await tx.wait()` call blocks until the transaction is included in a block. Rootstock testnet has an average block time of approximately `30 seconds`, meaning write operations will have a noticeable delay before the USSD session returns. Africa's Talking's default session timeout is `180 seconds`, which is sufficient for most cases, but monitor this carefully under real network conditions.

## Next Steps

With the relay server running, proceed to [Demo & Testing](../demo-and-testing) to test and validate the USSD flow, and verify transactions on the Rootstock Testnet Explorer.