---
sidebar_position: 1
sidebar_label: Overview of Rootstock CLI 
title: Overview of Rootstock CLI  
description: "The Rootstock CLI tool enables users to manage wallets, check balances, send transactions, verify smart contracts and interact with smart contracts on the Rootstock blockchain - a Bitcoin sidechain designed for smart contracts. It supports both mainnet and testnet environments." 
tags: [Rootstock CLI, developer tools, guides, rsk, rootstock, dApps, smart contracts, solidity, dev-environments]
---

The Rootstock CLI (rsk-cli) tool enables users to manage wallets, check balances, send transactions, verify smart contracts, and interact with smart contracts on the Rootstock blockchain—a Bitcoin sidechain designed for smart contracts. 

It supports both mainnet and testnet environments. Additionally, the tool provides bridge interaction features, allowing users to seamlessly transfer assets between Rootstock and Bitcoin (or other supported blockchains) via integrated bridge protocols.

The CLI allows you to interact with your Rootstock wallet directly from the terminal, giving you control over creating, managing, and funding your wallet with RBTC (Smart Bitcoin). 

In this guide, we will explore how to use the Rootstock CLI to create a wallet, manage it securely, and add funds to it.

## Key Features  

<Accordion>
 
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">1. Wallet Management</Accordion.Header>
    <Accordion.Body>
      The wallet command lets you manage Ethereum-compatible wallets on Rootstock. You can:
      <ul>
        <li>Create, import, or use an existing wallet.</li>
        <li>List saved wallets, switch wallets, update wallet names, and delete wallets.</li>
        <li>Wallets are securely encrypted with AES-256-CBC, and private keys are stored in a JSON file.</li>
      </ul>
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">2. Checking Balance</Accordion.Header>
    <Accordion.Body>
      Use the <code>balance</code> command to view your wallet's current balance on the Rootstock blockchain. 
      This is supported on both mainnet and testnet.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">3. Sending RBTC</Accordion.Header>
    <Accordion.Body>
      The <code>transfer</code> command enables sending RBTC to another address. 
      Transactions can be initiated on both mainnet and testnet.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">4. View Transaction Status</Accordion.Header>
    <Accordion.Body>
      View the status of a transaction using the <code>tx</code> command by providing the transaction ID.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">5. Deploying Smart Contracts</Accordion.Header>
    <Accordion.Body>
      The <code>deploy</code> command allows users to deploy smart contracts on the blockchain by providing the ABI [Application Binary Interface](/concepts/glossary/#a) and bytecode files. 
      This is supported on both mainnet and testnet.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">6. Verifying Smart Contracts</Accordion.Header>
    <Accordion.Body>
      With the <code>verify</code> command, users can verify deployed smart contracts using Rootstock’s explorer API. 
      It supports both mainnet and testnet.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">7. Interacting with Verified Contracts</Accordion.Header>
    <Accordion.Body>
      The <code>contract</code> command lets users interact with read-only functions of a verified smart contract, listing the available methods for interaction.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>


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

2. **Access to Rootstock Network**: Ensure to have access to Rootstock's mainnet or testnet. For testnet use, we’ll need testnet RBTC for experimentation, which can be requested from a testnet faucet.

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