---
sidebar_label: Architecture & Data Flow
sidebar_position: 2
title: USSD-RSK Architecture & Data Flow
tags: [rsk, rootstock, developers, architecture, ussd]
description: Understand the complete USSD session lifecycle, relay server architecture, and how the Rootstock JSON-RPC layer connects feature phone interactions to on-chain smart contract execution.
---

## Architecture & Data Flow

This page describes the full architecture of the USSD-Rootstock bridge how a user interaction on a feature phone translates into a signed blockchain transaction on the Rootstock network.

## Components Overview

Four core components work together in a linear pipeline to convert user input into an on-chain state change:

### 1. GSM Network & USSD Gateway

USSD sessions are stateful, real-time text sessions established over a GSM network. When a user dials a shortcode (e.g., `*384#`), the telecom carrier routes the session to a configured callback URL via **HTTP POST**. In this architecture, [Africa's Talking](https://developers.africastalking.com/docs/ussd/overview) provides that gateway.

Each HTTP POST from the gateway includes:

- `sessionId`: A unique string identifying the current USSD session
- `phoneNumber`: The caller's MSISDN (phone number)
- `text`: A `*`-delimited string of all user inputs in the current session

**Session state is fully encoded in the `text` field.** No server-side session storage is required. For example, if a user selected option `2` then entered a recipient address, the `text` field arrives as:

```plaintext
2*0xRecipientAddress
```

### 2. Node.js Relay Server

The Express server is the core bridge component. It is responsible for:

- Parsing the incoming USSD payload and determining which menu level the user is at
- Routing the request to either a read call (balance check) or a write transaction (transfer, loan)
- Signing and broadcasting transactions to the Rootstock network using **ethers.js**
- Returning a correctly formatted USSD response string

USSD responses must begin with either `CON` (continue → show next menu) or `END` (terminate the session and display a final message). No other prefixes are valid.

### 3. Ethers.js + Rootstock JSON-RPC

The relay server connects to the Rootstock network using a standard JSON-RPC provider pointed at the Rootstock public node:

```plaintext
https://dev.rootstock.io/developers/rpc-api/rootstock/
```

A single **relayer wallet** signs all transactions, with its private key loaded from an environment variable. This wallet holds tRBTC to pay gas fees on behalf of users. The wallet interacts with the deployed `InclusiveDeFi` contract through an ABI-defined interface.

### 4. InclusiveDeFi Smart Contract

The on-chain component is a Solidity contract that maintains internal balance and loan mappings. It does not use ERC-20 or any external token standard, it uses native tRBTC via `msg.value` deposits and internal accounting via `mapping(address => uint256)`.

## USSD Session Lifecycle

The following diagram shows the full data flow for a **balance check** request:

```plaintext
User dials *384#
            ↓
GSM Network routes session to Africa's Talking gateway
            ↓
Africa's Talking sends HTTP POST to relay server:
{
  text: "",
  phoneNumber: "+2348012345678",
  sessionId: "ATsession_xyz"
}
            ↓
Relay server parses text === "" → serves main menu:
CON Rootstock DeFi (+2348012345678)
1. My Balance
2. Send Money (P2P)
3. Request Micro-Loan
            ↓
User selects 1
            ↓
Africa's Talking sends HTTP POST:
{ text: "1", phoneNumber: "...", sessionId: "..." }
            ↓
Relay server calls contract.getBalance(wallet.address)
→ Rootstock JSON-RPC read call (no gas, no transaction)
            ↓
Relay server formats and returns:
END Your Balance: 0.01 tRBTC
            ↓
Session terminates. User sees final balance on screen.
```

## USSD Session Lifecycle and P2P Transfer

A transfer requires **three sequential interactions** within one USSD session, which is why stateless `text` accumulation is critical:

```plaintext
Round 1: text = ""        → Main menu shown
Round 2: text = "2"       → Prompt: "Enter Recipient Address:"
Round 3: text = "2*0xABC" → Prompt: "Enter Amount:"
Round 4: text = "2*0xABC*0.005"
         → Relay server:
              1. Parses input[1] = "0xABC" (recipient)
              2. Parses input[2] = "0.005" (amount)
              3. Calls contract.transfer("0xABC", parseEther("0.005"))
              4. Signs & broadcasts tx via Rootstock JSON-RPC
              5. Awaits tx confirmation
         → Returns: END Transfer Sent! Hash: 0xa924c40e...
```

:::note
Each round trip has a latency budget imposed by the telecom network. Typical USSD gateways require a response within **5–10 seconds**. For write operations (transfer, loan), the relay server calls `tx.wait()` which blocks until the transaction is mined on Rootstock. Ensure your Rootstock node connection is reliable and monitor average block confirmation time on the testnet.
:::

## Relay Server Architecture

The relay server is a minimal Express application. Its request handler implements a single `/ussd` POST route that acts as the USSD state machine:

```plaintext
POST /ussd
│
├── text === ""           → Serve main menu (CON)
│
├── input[0] === "1"      → Read: getBalance()          → END
│
├── input[0] === "2"
│   ├── !input[1]         → Prompt: Enter recipient     (CON)
│   ├── !input[2]         → Prompt: Enter amount        (CON)
│   └── input[1] & [2]    → Write: transfer()           → END
│
└── input[0] === "3"      → Write: applyForLoan()       → END
```

This pattern is intentionally flat and stateless. Every USSD payload contains the complete session history in the `text` field no database or session store is needed.

## Security Considerations

The current proof-of-concept architecture has deliberate simplifications that are acceptable for a guidance demo but must be addressed in production:

**Single relayer wallet:** All users share one relayer wallet address. This means `getBalance()` always returns the relay wallet's balance, not the individual user's. In production, map each `phoneNumber` to a unique wallet address stored in a database.

**Private key in environment variables:** The relayer's private key is stored in `.env`. This is standard practice for local development but is not acceptable for production. Use a secrets manager (e.g., AWS Secrets Manager, HashiCorp Vault) or an HSM-backed signing service.

**No input sanitization:** Recipient addresses and amounts from USSD text are passed directly to ethers.js. Validate Ethereum address format and parse amounts safely before calling contract functions.

**No loan repayment logic:** The current `applyForLoan()` function issues a loan with no repayment mechanism. This is a demo limitation. Implement a separate repayment flow and time-based interest logic for production.

## Gas & Fee Model

The relayer wallet pays all gas fees on behalf of users. This is a **meta-transaction pattern** (without formal EIP-2771 implementation). The implications are:

Keep the relayer wallet funded with sufficient tRBTC for gas. Users never need to hold tRBTC to interact with the system. Gas costs on Rootstock are denominated in RBTC and are significantly cheaper than Ethereum mainnet. Build a fee recovery model (e.g., charging a small service fee per transaction or operating as a subsidized financial inclusion service).

## Network Configuration

| Parameter | Value |
|---|---|
| Network | RSK Testnet |
| Chain ID | 31 |
| RPC URL | `https://dev.rootstock.io/developers/rpc-api/rootstock/` |
| Block Explorer | `https://explorer.testnet.rootstock.io` |
| Native Currency | tRBTC |
| Consensus | Merge-mined with Bitcoin (PoW) |

Rootstock is fully EVM-compatible. Use standard Ethereum tooling (ethers.js, Hardhat, Ignition) without modification by pointing it at the Rootstock RPC endpoint.