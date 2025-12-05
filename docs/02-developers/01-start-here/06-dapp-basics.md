---
title: Beginner Developer: Build Your First Rootstock DApp (Frontend + Smart Contract)
sidebar_label: Beginner Path
description: Learn about how to build a simple decentralized application (dApp) on Rootstock.
tags: [guides, developers, blockchain, rsk, rootstock]
---

# Module 6 — Build Your First Rootstock DApp (Frontend + Smart Contract)

This module walks you through building a simple decentralized application (dApp) on Rootstock. You'll integrate a deployed smart contract with a frontend using Ethers.js and a wallet provider (MetaMask or Rabby). By the end, you'll have a fully functional dApp where users can read/write data on the Rootstock Testnet.

## 1. Overview: What We Are Building

You will build a minimal dApp that:
- Connects to Rootstock Testnet
- Lets users connect their wallet
- Interacts with a simple smart contract (HelloRootstock.sol)
- Reads stored data from the blockchain
- Updates contract state using a transaction

This is the first "real" end-to-end Rootstock project — contract, deployment, and frontend.

## 2. Prerequisites

Before starting, ensure you have:
- A deployed contract on Rootstock Testnet (from Module 5)
- Node.js installed
- Basic familiarity with React or Next.js
- MetaMask or Rabby wallet configured for Rootstock Testnet
- Your contract's:
  - address
  - ABI
  - Testnet RPC

If you deployed the example contract from Module 5, you already have everything needed.

## 3. Project Setup (Next.js)

Create a fresh project:

```bash
npx create-next-app rootstock-dapp
cd rootstock-dapp
npm install ethers
```

This gives you a clean React/Next environment with zero noise.

## 4. Add Your Contract ABI

Inside your project, create:
```
/src/abi/HelloRootstock.json
```

Paste your contract ABI from the compiled Hardhat/Foundry output:

```json
[
  {
    "inputs": [],
    "name": "message",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_msg", "type": "string" }],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

## 5. Wallet Connection (Ethers.js)

Create a reusable wallet connection hook:

`/src/hooks/useWallet.js`

```javascript
import { useState } from "react";
import { ethers } from "ethers";

export default function useWallet() {
  const [account, setAccount] = useState(null);

  async function connect() {
    if (!window.ethereum) return alert("No wallet found");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  }

  const provider = typeof window !== "undefined" && window.ethereum
    ? new ethers.BrowserProvider(window.ethereum)
    : null;

  return { account, connect, provider };
}
```

## 6. Contract Interaction Code

Create a helper file:

`/src/lib/contract.js`

```javascript
import { ethers } from "ethers";
import abi from "../abi/HelloRootstock.json";

const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const RPC_URL = "https://public-node.testnet.rsk.co";

export function getReadProvider() {
  return new ethers.JsonRpcProvider(RPC_URL);
}

export function getContract(provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
}
```

## 7. DApp UI (Read + Write)

Modify your homepage:

`/src/app/page.js`

```jsx
"use client";

import useWallet from "../hooks/useWallet";
import { getReadProvider, getContract } from "../lib/contract";
import { useEffect, useState } from "react";

export default function Home() {
  const { account, connect, provider } = useWallet();

  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  async function loadMessage() {
    const readProvider = getReadProvider();
    const contract = getContract(readProvider);

    const msg = await contract.message();
    setMessage(msg);
  }

  async function updateMessage() {
    if (!provider) return alert("Wallet not connected");

    const signer = await provider.getSigner();
    const contract = getContract(signer);

    const tx = await contract.setMessage(newMessage);
    await tx.wait();

    loadMessage();
  }

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Hello Rootstock DApp</h1>

      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}

      <h2>Stored Message:</h2>
      <p>{message}</p>

      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Enter new message"
      />

      <button onClick={updateMessage}>Update Message</button>
    </main>
  );
}
```

## 8. Run the DApp

Start the local server:

```bash
npm run dev
```

Open:
```
http://localhost:3000
```

You should now be able to:
- Connect wallet
- Read message from Rootstock Testnet
- Write/update on-chain
- See the value update live

This is the first meaningful end-to-end Rootstock experience.

## 9. Troubleshooting

### ❗ Wallet doesn't connect
Ensure Rootstock Testnet is configured in your MetaMask:
- Chain ID: 31
- Currency: tRBTC
- RPC: https://public-node.testnet.rsk.co

### ❗ Transaction fails
Check your Testnet balance:
- You must have tRBTC from the faucet (covered earlier).

### ❗ Read works but write doesn't
Your wallet may not be connected as signer.
Verify the provider:

```javascript
const signer = await provider.getSigner();
```

For further practice, check out the [Dapp Tutorial](https://hackernoon.com/how-to-build-dapp-on-rootstock-with-nextjs-typescript-and-solidity).


## 10. Summary

In this module you learned how to:
- Build a simple Rootstock dApp using Next.js
- Connect a wallet using Ethers.js
- Read contract state from Rootstock Testnet
- Send transactions to update contract data
- Structure frontend + blockchain interactions cleanly

This module transitions a learner from contract developer to full dApp builder , the skillset required for all advanced Rootstock applications.