---
sidebar_position: 2
sidebar_label: Gasless Transactions
title: Enabling Gasless Transactions with RIF Relay
description: "A technical walkthrough for implementing sponsored and token-paid transactions on Rootstock." 
tags: [ux, rif-relay, gasless, onboarding]
---

# Enabling Gasless Transactions

High gas fees or the requirement to hold native rBTC are major friction points for new users. RIF Relay solves this by allowing a third party (a Paymaster) to sponsor the gas or allowing users to pay fees in ERC-20 tokens like USDRIF.



## Prerequisites

* **RIF Relay SDK:** Installed via npm.
* **Smart Wallet:** Users must use a RIF Relay-compatible Smart Wallet (e.g., the RIF Wallet or a custom proxy).
* **Funded Paymaster:** If you are sponsoring transactions, your Paymaster contract must have a t-rBTC balance on Testnet.

## Getting Started

### 1. Install the Relay SDK
Add the necessary libraries to your frontend project.

```bash
npm install @rsksmart/rif-relay-sdk ethers
```

### 2. Configure the Relay Client
Initialize the client to connect to a Relay Server. This server acts as the "worker" that submits the transaction to the network on the user's behalf.

```js
import { RelayProvider } from '@rsksmart/rif-relay-sdk';

const config = {
  relayHubAddress: '0x...', // Official RelayHub address
  rpcUrl: '[https://public-node.testnet.rsk.co](https://public-node.testnet.rsk.co)'
};

const provider = new RelayProvider(window.ethereum, config);
```

### 3. Sending a Sponsored Transaction

The user signs a data structure instead of a standard Ethereum transaction. The Relay server then wraps this and submits it.

```js
const tx = await contract.populateTransaction.myFunction(arg1, arg2);
const relayRequest = await provider.createRelayRequest(tx);

// The user signs the request (does not cost gas)
const signedRequest = await provider.signRelayRequest(relayRequest);

// Submit to the Relay Server
const metadata = await provider.submitRelayRequest(signedRequest);
```

## Troubleshooting
- "Paymaster balance too low": Ensure your Paymaster contract is funded. If the Paymaster runs out of rBTC, it cannot "wrap" and pay for user transactions.

- Signature Mismatch: Ensure the domainSeparator in your signing logic matches the RelayHub version deployed on the network.

## Related Use Cases or Resources
- RIF Relay Full Documentation

- Onboarding with Smart Wallets

- Accepting USDRIF Payments