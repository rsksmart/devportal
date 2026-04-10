---
title: Shared Setup Guide (Rootstock Testnet)
sidebar_position: 0
description: Install Hardhat, configure Rootstock testnet, get tRBTC, and set up OpenZeppelin dependencies for Rootstock use-case tutorials.
tags: [rsk, rootstock, use cases, hardhat, testnet, solidity]
---

This setup guide is shared by multiple Rootstock use-case tutorials. Complete it once, then return to the tutorial you’re following.

## Prerequisites

- Node.js 18+
- A wallet (e.g., MetaMask) configured for Rootstock testnet

## 1) Create a project and install Hardhat

```bash
mkdir rootstock-use-cases
cd rootstock-use-cases
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat
```

If you already have a Hardhat project, you can skip the init prompts and just install dependencies.

### Option: Use the ethers v5-style Hardhat setup (for some guides)

Some tutorials (including the DeFi AMM and oracle mock guides) use `ethers.utils.*` in test snippets. If your project uses ethers v6 tooling, those snippets will not match. In that case, install the ethers v5-style dependencies below and configure Hardhat accordingly.

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers chai
```

Your `hardhat.config.js` should include:

```javascript
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
};
```

## 2) Configure Rootstock testnet in Hardhat

Create a `.env` file (do not commit it):

```text
PRIVATE_KEY=your_testnet_private_key_here
ROOTSTOCK_TESTNET_RPC_URL=https://public-node.testnet.rsk.co
```

Then add a Rootstock testnet network entry to your Hardhat config.

```js
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    rsktestnet: {
      url: process.env.ROOTSTOCK_TESTNET_RPC_URL || "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
```

## 3) Get tRBTC for gas

You’ll need tRBTC to deploy and test contracts on Rootstock testnet.

- Faucet: [/dev-tools/additional-tools/#faucets](/dev-tools/additional-tools/#faucets)
- Explorer: [https://explorer.testnet.rootstock.io](https://explorer.testnet.rootstock.io)

## 4) Install OpenZeppelin contracts

```bash
npm install @openzeppelin/contracts
```

Most tutorials in this hub assume you can import OpenZeppelin components like:

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

## 5) Compile and sanity-check

```bash
npx hardhat compile
```

If compilation succeeds, you’re ready to continue with your selected use-case tutorial.

