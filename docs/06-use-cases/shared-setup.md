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

## Project initialization

```bash
mkdir rootstock-use-cases
cd rootstock-use-cases
npm init -y
npm install --save-dev hardhat
```

## Install dependencies

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
npm install dotenv
```

## Hardhat initialization

```bash
npx hardhat
```

If you already have a Hardhat project, you can skip initialization and only install the dependencies you need.

## Dependencies

### Optional: Configure Hardhat Using Ethers v5 (For Compatibility with Some Guides)

Some tutorials use `ethers.utils.*` in test snippets. If your project uses ethers v6 tooling, those snippets will not match. In that case, install the ethers v5-style dependencies below and configure Hardhat accordingly.

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

## Testnet configuration (Rootstock)

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
    rootstockTestnet: {
      url: process.env.ROOTSTOCK_TESTNET_RPC_URL || "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
```

## tRBTC usage (testnet gas fees)

You’ll need **tRBTC** to pay gas fees when you deploy and test contracts on Rootstock testnet.

- **Faucet**: [/dev-tools/additional-tools/#faucets](/dev-tools/additional-tools/#faucets)
- **Explorer**: [https://explorer.testnet.rootstock.io](https://explorer.testnet.rootstock.io)

After you request tRBTC, verify the funds arrived by searching your address on the explorer. If you run out of tRBTC, your deployments and transactions will fail due to insufficient gas.

## OpenZeppelin explanation

Install OpenZeppelin contracts:

```bash
npm install @openzeppelin/contracts
```

Most tutorials in this hub assume you can import OpenZeppelin components like:

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
```

## Compile

```bash
npx hardhat compile
```

## Deploy

Most use-case tutorials include a deployment script under `scripts/`. A typical deployment command looks like:

```bash
npx hardhat run scripts/deploy.js --network rootstockTestnet
```

After deploy, verify your transaction on the Rootstock testnet explorer:

- [https://explorer.testnet.rootstock.io](https://explorer.testnet.rootstock.io)

## Verify

Verification depends on the specific explorer/tooling used by the guide you’re following. If your tutorial includes a verification command, run it after deployment and confirm the contract address and constructor args match your deploy output.

