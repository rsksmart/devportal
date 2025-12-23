---
title: "Beginner Developer: Environment Setup"
sidebar_label: "Beginner Path"
description: "Learn about how to set up your environment to build on Rootstock."
tags: [guides, developers, blockchain, rsk, rootstock]
---


# 03 — Environment Setup

This module walks you through configuring your system to build on Rootstock.

---

## Required Tools

Install the following:

### Node.js (LTS)
Check version:
```bash
node -v
```

### Hardhat
```bash
npm install --save-dev hardhat
```

### Code Editor
VS Code recommended.

### Wallet (MetaMask or Rabby)
Configure Rootstock Testnet in your wallet:

**Rootstock Testnet**:
- RPC: https://public-node.testnet.rsk.co
- Chain ID: 31
- Symbol: tRBTC
- Block Explorer: https://explorer.testnet.rootstock.io

### Get Test RBTC

- You need tRBTC to deploy and test contracts on Rootstock Testnet.
- Use the official faucet: https://faucet.rootstock.io/
- Enter your wallet address → receive test tokens.

## Create a New Project

```bash
mkdir rootstock-demo
cd rootstock-demo
npm init -y
npm install --save-dev hardhat
npx hardhat
```

Select "Create a JavaScript project".

## Project Structure

```
rootstock-demo/
  ├─ contracts/
  │    └─ HelloRootstock.sol
  ├─ scripts/
  │    └─ deploy.js
  ├─ hardhat.config.js
  └─ package.json
```

You're now ready to write your first contract.
