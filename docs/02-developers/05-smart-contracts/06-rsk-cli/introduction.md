---
sidebar_position: 1
sidebar_label: Overview of Rootstock CLI
title: Overview of Rootstock CLI
description: "The Rootstock CLI tool enables users to manage wallets, check balances, send transactions, verify smart contracts and interact with smart contracts on the Rootstock blockchain - a Bitcoin sidechain designed for smart contracts. It supports both mainnet and testnet environments."
tags: [Rootstock CLI, developer tools, guides, rsk, rootstock, dApps, smart contracts, solidity, dev-environments]
---

The Rootstock CLI (rsk-cli) tool enables users to manage wallets, check balances, send transactions, verify smart contracts, and interact with smart contracts on Rootstock. Rootstock is a Bitcoin sidechain designed for smart contracts.

It supports both mainnet and testnet environments. The tool also provides bridge interaction features so you can transfer assets between Rootstock and Bitcoin through integrated bridge protocols.

The CLI lets you interact with your Rootstock wallet from the terminal. You can create, manage, and fund your wallet with rBTC.

In this guide, we will explore how to use the Rootstock CLI to create a wallet, manage it securely, and add funds to it.

## Key Features

rsk-cli groups wallet, transfer, and contract commands behind a single CLI.

### Wallet Management

The `wallet` command lets you manage Ethereum-compatible wallets on Rootstock. You can:

- Create, import, or use an existing wallet.
- List saved wallets, switch wallets, update wallet names, and delete wallets.
- Wallets are encrypted with AES-256-CBC. Private keys are stored in a JSON file.

### Checking Balance

Use the `balance` command to view your wallet's current balance on the Rootstock blockchain. This is supported on both mainnet and testnet.

### Sending rBTC

The `transfer` command enables sending rBTC to another address. Transactions can be initiated on both mainnet and testnet.

### View Transaction Status

View the status of a transaction using the `tx` command by providing the transaction ID.

### Deploying Smart Contracts

The `deploy` command allows users to deploy smart contracts on the blockchain by providing the ABI ([Application Binary Interface](/concepts/glossary/)) and bytecode files. This is supported on both mainnet and testnet.

### Verifying Smart Contracts

With the `verify` command, users can verify deployed smart contracts using Rootstock’s explorer API. It supports both mainnet and testnet.

### Interacting with Verified Contracts

The `contract` command lets users interact with read-only functions of a verified smart contract, listing the available methods for interaction.

## Prerequisites

Before using rsk-cli, you need the following:

1. **Node.js**: The tool is built using Node.js, so you need to have it installed. You can download it from the [official Node.js website](https://nodejs.org/) and npm **(Node Package Manager)** comes bundled with Node.js.

Verify the installation by running:

```bash
node -v
npm -v
```
:::warning[Warning]

Ensure to have v22.9.0 version of node and above for compatibility

:::

2. **Access to Rootstock Network**: Ensure to have access to Rootstock's mainnet or testnet. For testnet use, we’ll need testnet rBTC for experimentation, which can be requested from a testnet faucet.

Once these prerequisites are met, proceed to install and use rsk-cli.

## Installation

To install the tool, use Node.js's package manager npm:

```bash
npm i -g @rsksmart/rsk-cli
```

This installs the tool globally, allowing  you to use the rsk-cli command in the terminal from any directory.


:::tip[--testnet or -t]
This flag tells `rsk-cli` to operate on the Rootstock testnet rather than the mainnet. Rootstock has both a mainnet (for real transactions) and a testnet (for testing purposes). Using the testnet helps avoid spending actual tokens and allows for safe testing.

:::
