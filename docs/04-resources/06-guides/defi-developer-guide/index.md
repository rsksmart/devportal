---
sidebar_position: 1
sidebar_label: Overview
title: 'Rootstock DeFi Developer Guide'
description: 'A structured guide for building DeFi protocols on Rootstock – token standards, oracles, AMMs, security, and templates.'
tags: [rsk, rootstock, defi, solidity, web3, developer-guide]
---

:::tip[Prerequisites]
This guide assumes you have basic knowledge of Solidity, blockchain fundamentals, and the Rootstock ecosystem. You should have a development environment set up (Hardhat, Foundry, or Truffle) and a testnet wallet with tRBTC.
:::

# Rootstock DeFi Developer Guide

Welcome to the **Rootstock DeFi Developer Guide**! This guide is your one-stop resource for building decentralized finance (DeFi) applications on Rootstock, the world's most secure Bitcoin sidechain. Whether you're a seasoned Ethereum developer or new to DeFi, this guide will help you navigate the unique opportunities and considerations of developing on Rootstock.

Rootstock brings smart contracts to Bitcoin, combining the security of Bitcoin's proof-of-work with Ethereum's flexibility. With full EVM compatibility, you can deploy your existing Solidity contracts with minimal changes, while leveraging Bitcoin's liquidity and user base.

The Rootstock DeFi ecosystem is growing rapidly, but developers often lack a structured path to build and integrate DeFi applications. This guide fills that gap by providing practical workflows, example code, and best practices for creating DeFi protocols on Rootstock.

## Why Rootstock for DeFi?

- **Bitcoin Security**: Rootstock is merge-mined with Bitcoin, inheriting its robust security model.
- **EVM Compatibility**: Write and deploy contracts in Solidity, just like on Ethereum.
- **Low Fees**: Transactions on Rootstock are significantly cheaper than on Ethereum mainnet.
- **Growing Ecosystem**: Access to a wide range of DeFi primitives, bridges, and tools.
- **RBTC**: The native currency is Bitcoin-pegged (1 RBTC = 1 BTC), enabling Bitcoin holders to participate in DeFi.

## What You Will Learn

This guide is divided into five main sections, each building on the previous:

### 1. [Token Standards & Best Practices](./03-token-standards.md)
Learn how to implement and extend ERC-20, ERC-721, and ERC-4626 tokens on Rootstock. Understand wrapping RBTC (wRBTC), gas optimization, and security considerations specific to token development.

### 2. [Oracle Integration](./01-oracle-integration.md)
Discover how to fetch reliable off-chain data using Chainlink or other oracles. Implement price feeds, randomness (VRF), and secure oracle patterns to protect your protocol from manipulation.

### 3. [Automated Market Makers (AMM) Basics](./02-amm-basics.md)
Build a simple constant-product AMM from scratch. Understand liquidity pools, swap mechanics, fees, and slippage. Test your contract with Hardhat and integrate it with a React frontend.

### 4. [Security Patterns](./04-security-patterns.md)
Explore essential security practices for DeFi: reentrancy protection, access control, integer safety, upgradeability, circuit breakers, and flash loan resistance. Learn how to audit your code and avoid common pitfalls.

### 5. [Example Templates](./05-example-templates.md)
Get started quickly with full-stack templates. Each template includes smart contracts, Hardhat deployment scripts, and a React frontend with ethers.js integration. Templates cover price oracles, AMMs, ERC-20 with permit, yield vaults (ERC-4626), and upgradeable contracts.

## Target Audience

This guide is designed for:

- **Solidity developers** who are new to Rootstock and want to deploy their first DeFi dApp.
- **DeFi protocols** planning to expand to Rootstock and seeking best practices.
- **Web3 developers** looking for reusable patterns and templates to accelerate development.
- **Students and researchers** interested in learning how DeFi protocols work under the hood.

## Prerequisites

Before diving in, ensure you have:

- **Basic Solidity knowledge**: You should understand functions, modifiers, events, and inheritance.
- **Familiarity with Ethereum concepts**: Transactions, gas, wallets, and ERC standards.
- **A development environment**: We recommend Hardhat, but Foundry or Truffle also work.
- **A Rootstock testnet wallet**: You'll need tRBTC (testnet RBTC) to deploy and test contracts.

### Setting Up Your Environment

Follow these steps to prepare your development environment:

#### 1. Install Node.js and npm

Download from [nodejs.org](https://nodejs.org/) (LTS version recommended).

#### 2. Create a new Hardhat project

```bash
mkdir my-defi-project
cd my-defi-project
npm init -y
npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npx hardhat
```
Choose "Create a basic sample project" and follow the prompts.

## 3. Install OpenZeppelin contracts

```bash
npm install @openzeppelin/contracts
```
## 4. Configure Hardhat for Rootstock

Edit hardhat.config.js to add Rootstock networks:

```javascript
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {},
    rsktestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY] // Use environment variable for security
    },
    rskmainnet: {
      url: "https://public-node.rsk.co",
      chainId: 30,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

Create a .env file to store your private key (never commit this):

```text
PRIVATE_KEY=your_testnet_private_key_here
```
## 5. Get tRBTC from the Rootstock testnet faucet

Visit the Rootstock Testnet Faucet and request tRBTC to your testnet address. You'll need this to pay for gas when deploying contracts.

**[Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io)**


## 6. (Optional) Set up a frontend with React

#### If you plan to build a dApp, create a React app:

```bash
npx create-react-app frontend
cd frontend
npm install ethers
```
## How to Use This Guide

Follow sequentially: Each section builds on concepts from the previous one. Start with Token Standards, then move to Oracles, AMM, Security, and finally Templates.

Jump directly: If you're already familiar with a topic, feel free to skip to the section you need.

Run the code: All code examples are tested on Rootstock testnet. Copy, deploy, and experiment.

Refer to the templates: The final section provides complete, working projects that you can use as a starting point.

## Additional Resources

- [Rootstock Documentation](https://dev.rootstock.io/)

- [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io)

- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

- [Chainlink Documentation](https://docs.chain.link/)

- [Hardhat Documentation](https://hardhat.org/docs/getting-started)

Let's Get Started!