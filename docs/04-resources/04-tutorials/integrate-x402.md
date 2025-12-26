---
sidebar_label: Integrating x402 Payments
sidebar_position: 13
title: Integrating x402 Payments with Rootstock
description: Build a decentralized pay-per-use API on Rootstock using the x402 protocol standards. This guide covers implementing a Sovereign Mode Node.js server that verifies on-chain tRBTC payments directly.
tags: [rsk, rootstock, tutorials, x402, payments, agents]
---

# Integrating x402 Payments with Rootstock

The **x402 protocol** (deriving from HTTP Status `402 Payment Required`) is emerging as the standard for **Agentic Commerce**. It allows AI agents, automated scripts, and browsers to autonomously negotiate and pay for resources, such as premium APIs, gated content, or computational tasks, without human intervention.

While some chains rely on centralized facilitators, **Rootstock (RSK)** is uniquely positioned for **Sovereign Mode** integration. As the EVM-compatible Bitcoin sidechain, Rootstock allows you to verify payments with Bitcoin-level security directly on your server.

In this guide, we will build a **Sovereign x402 Server** that:
1.  **Intercepts** requests to premium endpoints.
2.  **Challenges** unpaid requests with a `402` status and payment metadata.
3.  **Verifies** on-chain tRBTC transaction proofs directly against the Rootstock ledger.
4.  **Enforces** idempotency via Redis to prevent replay attacks.


## The Protocol Flow 

Unlike hosted solutions, "Sovereign Mode" means your API acts as its own payment processor. This eliminates middleman fees and reliance on third-party gateways.

1.  **Challenge (Handshake):** The client requests a resource (e.g., `/api/premium`). The server detects a missing payment header and responds with `402 Payment Required`. Crucially, it returns a `WWW-Authenticate` header containing the **Price**, **Asset (tRBTC)**, and **Target Address**.
2.  **Execution:** The client (or AI Agent) parses these details, signs a transaction, and broadcasts it to the Rootstock network.
3.  **Proof:** The client retries the original request, this time including the **Transaction Hash** in the `X-Payment` (or `Payment-Signature`) header.
4.  **Settlement:** The server validates the transaction on-chain, ensures it hasn't been used before (via Redis), and serves the content.


## Prerequisites

* **Node.js** (v18.x or higher)
* **Redis** (Required for replay protection/idempotency)
* **Rootstock Testnet Wallet** funded with `tRBTC`.
    * [**Rootstock Faucet**](https://faucet.rootstock.io/)
* **RPC Endpoint:** * Testnet: `https://public-node.testnet.rsk.co`
    * *Recommendation:* For production, use a dedicated RPC key from providers like pure RPC or QuickNode to avoid rate limits.


## 1. Project Setup

Initialize a strictly typed Node.js environment. We will use `web3.js` for blockchain interaction and `redis` for state management.

```bash
mkdir rootstock-x402
cd rootstock-x402
npm init -y

# Core dependencies:
# express: Web server
# web3: Interface for the Rootstock Blockchain
# redis: In-memory store for idempotency (anti-replay)
# dotenv: Environment variable management
npm install express redis dotenv web3

```

Ensure your `package.json` supports ES6 modules:

```json
"type": "module"

```

## 2. Configuration

Create a `.env` file in your project root. This effectively acts as your "Pricing Table."

```env
PORT=4000
# Local Redis or hosted instance string
REDIS_URL=redis://127.0.0.1:6379

# Rootstock Testnet RPC
RSK_NODE_RPC=[https://public-node.testnet.rsk.co](https://public-node.testnet.rsk.co)

# The address that receives the funds
RECEIVER_ADDRESS=0xYourWalletAddressHere

# Security settings
REQUIRED_CONFIRMATIONS=1
MIN_PRICE_TRBTC=0.00001

```

## 3. Server Implementation

In this section, we will build `server.js` step-by-step. Instead of a single block of code, we break it down into four logical stages: **Setup**, **The Challenge**, **The Verification**, and **The Route**.

### Step 3.1: Imports and Initialization

First, we set up our environment. We use `express` for the API, `web3` to talk to the Rootstock blockchain, and `redis` to remember which payments have already been spent.

```javascript
// server.js

// 1. Imports
import express from 'express';
import { Web3 } from 'web3'; // Rootstock interaction
import dotenv from 'dotenv';
import { createClient } from 'redis'; // Anti-replay database

// 2. Load Configuration
dotenv.config();

const app = express();
app.use(express.json()); // Allows us to parse JSON bodies

// 3. Database Connection (Redis)
// We use Redis to store "spent" transaction hashes so they can't be reused.
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis.on('error', (err) => console.error('Redis Client Error', err));
await redis.connect(); 

// 4. Blockchain Connection
// We connect to a Rootstock Node (Testnet or Mainnet) in Read-Only mode.
// No private keys are needed here because we are only verifying data.
const web3 = new Web3(process.env.RSK_NODE_RPC);

```

### Step 3.2: Defining the "Price Tag"

We define our constants here. In blockchain payments, precision is key. We convert our human-readable price (`0.00001 BTC`) into **Wei** (the smallest unit) to ensure mathematically perfect comparisons.

```javascript
// Normalize the receiver address to lowercase to avoid case-sensitivity bugs
const RECEIVER = process.env.RECEIVER_ADDRESS.toLowerCase();

// Convert 0.00001 tRBTC to Wei (10000000000000 Wei)
const MIN_PRICE_WEI = web3.utils.toWei(process.env.MIN_PRICE_TRBTC || '0.00001', 'ether'); 

// Security: How many blocks must pass before we trust the payment?
// 1 for speed, 12 for high security.
const REQUIRED_CONFIRMATIONS = Number(process.env.REQUIRED_CONFIRMATIONS) || 1;

```

### Step 3.3: The Middleware (The "Guard")

This is the core of the x402 protocol. This middleware function runs *before* the user gets access to the content. It acts as a bouncer.

#### Phase A: The Challenge (402 Response)

If the user hasn't sent a payment proof header (`X-Payment`), we stop them right here and tell them how to pay.

```javascript
const verifyPayment = async (req, res, next) => {
  // Check for the payment proof header
  const txHash = req.headers['x-payment'] || req.headers['payment-signature'];

  // If missing or invalid format (not a 64-char hex string), reject it.
  if (!txHash || !/^0x([A-Fa-f0-9]{64})$/.test(txHash)) {
    return res.status(402).json({
      error: 'Payment Required',
      details: {
        payTo: RECEIVER,
        amount: process.env.MIN_PRICE_TRBTC,
        asset: 'tRBTC',
        network: 'rootstock-testnet',
        chainId: 31
      },
      instructions: 'Send tRBTC to the address above. Retry request with transaction hash in "X-Payment" header.',
    });
  }
  
  // If we get here, the user claims they have paid. Let's verify it.
  try {
    // ... verification logic continues below ...

```

#### Phase B: Idempotency (Anti-Replay)

A critical security step. If User A pays for content, they shouldn't be able to give their Transaction Hash to User B to unlock the same content. Once a hash is used, we "burn" it in our database.

```javascript
    // Check Redis: Has this hash been used before?
    const isUsed = await redis.get(`x402:spent:${txHash}`);
    
    if (isUsed) {
      return res.status(409).json({ // 409 Conflict
        error: 'Double Spend Detected',
        message: 'This payment proof has already been exchanged for content.'
      });
    }

```

#### Phase C: On-Chain Verification

Now we ask the Rootstock blockchain: *"Did this transaction actually happen?"*

```javascript
    // 1. Get the Receipt (Proof the tx was mined)
    const receipt = await web3.eth.getTransactionReceipt(txHash);

    if (!receipt) {
      return res.status(402).json({ error: 'Transaction not found or pending' });
    }
    if (!receipt.status) {
      return res.status(402).json({ error: 'Transaction failed on-chain' });
    }

    // 2. Check Confirmations (Re-org protection)
    const latestBlock = await web3.eth.getBlockNumber();
    const confirmations = latestBlock - receipt.blockNumber;

    if (confirmations < REQUIRED_CONFIRMATIONS) {
      return res.status(402).json({
        error: 'Confirmations pending',
        current: Number(confirmations),
        required: REQUIRED_CONFIRMATIONS
      });
    }

    // 3. Validate Transaction Details (Recipient & Amount)
    const tx = await web3.eth.getTransaction(txHash);
    
    // Did they send it to ME?
    if (tx.to.toLowerCase() !== RECEIVER) {
      return res.status(402).json({ error: 'Incorrect payment recipient' });
    }

    // Did they send ENOUGH? (BigInt comparison is essential for crypto)
    if (BigInt(tx.value) < BigInt(MIN_PRICE_WEI)) {
      return res.status(402).json({ error: 'Insufficient payment amount' });
    }

```

#### Phase D: Finalization

The payment is valid! We mark it as spent and let the user through.

```javascript
    // Mark as spent in Redis for 30 days (2592000 seconds)
    await redis.set(`x402:spent:${txHash}`, 'true', { EX: 2592000 });

    // Attach tx details to the request object for the next function to use
    req.payment = tx;

    // Proceed to the protected route
    next();

  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ error: 'Internal verification error' });
  }
};

```

### Step 3.4: The Protected Route

Finally, we apply our middleware to the route.

```javascript
// Apply 'verifyPayment' middleware to this route
app.get('/api/premium-content', verifyPayment, (req, res) => {
  res.json({
    success: true,
    message: 'Premium content unlocked 🔓',
    data: 'This data is protected by Rootstock Sovereign Payments.',
    paid_via: req.payment.hash // We can reference the payment details here
  });
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`x402 Rootstock Paywall running on port ${process.env.PORT}`);
});

```


## 4. Testing the Integration

Since we are running in Sovereign Mode, you can test the entire flow using standard CLI tools like `curl`.

### Step 1: Trigger the Challenge

Attempt to access the protected resource without payment credentials.

```bash
curl -i http://localhost:4000/api/premium-content

```

**Expected Response:** `402 Payment Required`

*Observe the JSON body for the payment destination and price.*

### Step 2: Perform Payment

Using a wallet (MetaMask or a script), send `0.00001 tRBTC` to the address provided in your `.env`.

* **Wait** for the transaction to be mined (approx. 30 seconds on Rootstock).
* **Copy** the resulting Transaction Hash (e.g., `0xabc...`).

### Step 3: Access with Proof

Retry the request, this time attaching the proof of payment.

```bash
curl -i http://localhost:4000/api/premium-content \
  -H "X-Payment: 0x<YOUR_TX_HASH>" \
  -H "Content-Type: application/json"

```

**Expected Response:** `200 OK`
*You will receive the protected JSON payload.*


## Best Practices for Production

1. **Block Confirmations (Security vs. Speed):**
* Rootstock is merge-mined with Bitcoin. While extremely secure, occasional reorganization can occur at the tip.
* **Recommendation:** Wait for **2 confirmations** for micropayments, and **12 confirmations** for high-value transfers.


2. **RPC Strategy:**
* Public RPC endpoints have rate limits. If your API expects high traffic, your `verifyPayment` function will fail if rate-limited. Always use a dedicated RPC provider or run your own node.


3. **Idempotency & Storage:**
* The Redis TTL (Time-To-Live) is set to 30 days in this example. Adjust this based on your business logic. For perpetual purchases, you may need a permanent database (PostgreSQL) instead of Redis.


4. **CORS:**
* If calling this API from a browser, ensure you expose the custom headers. Add `cors` middleware with `exposedHeaders: ['WWW-Authenticate', 'X-Payment']`.



## Troubleshooting

* **`Transaction not found`**: Rootstock block times are ~30 seconds. Ensure the tx is mined before the client sends the proof.
* **`Chain ID mismatch`**: Ensure your wallet is connected to **RSK Testnet (ID: 31)** and not Mainnet (ID: 30) or Ethereum.


## Resources

* **[Rootstock Developers Portal](https://dev.rootstock.io/)** - The central hub for RSK documentation.
* **[x402 Protocol Specification](https://x402.org)** - Standards for HTTP 402.
* **[Rootstock Faucet](https://faucet.rootstock.io/)** - Get free tRBTC for testing.
* **[Web3.js Documentation](https://web3js.readthedocs.io/)** - Reference for the library used in this guide.

*Happy building on the smartest Bitcoin sidechain!* 🧡
