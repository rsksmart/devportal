---
sidebar_label: Verify Smart Contracts using the Hardhat Verify Plugin
sidebar_position: 107
title: Verify a Smart Contract using the Hardhat Verification Plugin
description: "Configuring Hardhat Verification plugin for Rootstock"
tags: [hardhat, tutorial, developers, quick starts, rsk, rootstock]
---

Smart contracts are the backbone of decentralized applications (dApps). They automate agreements and processes, but their code can be complex and prone to errors. Verifying your smart contracts is crucial to ensure they function as intended.

This tutorial will guide you through verifying your contracts using the Hardhat Verification Plugin on the Rootstock Explorer and Blockscout Explorer with a single command. This plugin simplifies the verification of Solidity smart contracts deployed on the Rootstock network. By verifying the contracts, you allow block explorers like Rootstock and Blockscout to link your contract's source code with its deployed bytecode on the blockchain, allowing for more trustless interaction with the code.

In this tutorial, we'll do the following steps:
- Set up your hardhat config environment in your project
- Use the `hardhat-verify` plugin to verify a contract address.

## Prerequisites

To follow this tutorial, you should have knowledge of the following:
* Hardhat
* Basic knowledge of smart contracts

:::note[Hardhat Starter dApp]

A [Hardhat Starter dApp](https://github.com/rsksmart/rootstock-hardhat-starterkit) has been created with preset configuration for the Rootstock network. Clone and follow the instructions in the README to setup the project. Note: To set the `.env` variables to match the `hardhat.config.ts` file, if using the starter dApp for this tutorial.

:::

## What is hardhat-verify?

[Hardhat](https://hardhat.org/) is a full-featured development environment for contract compilation, deployment and verification. 
The [hardhat-verify plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify) supports contract verification on the [Rootstock Explorer](https://explorer.rootstock.io/) and [Rootstock Blockscout Explorer](https://rootstock.blockscout.com/).

### Installation

```bash
npm install --save-dev @nomicfoundation/hardhat-verify
```

And add the following code to your `hardhat.config.ts` file:

```bash
require("@nomicfoundation/hardhat-verify");
```

Or, if you are using TypeScript, add this to your hardhat.config.ts:

```bash
import "@nomicfoundation/hardhat-verify";
```

### Usage

You need to add the following Etherscan config to your `hardhat.config.ts` file:


```bash
require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

module.exports = {
  defaultNetwork: 'rootstockTestnet',
  networks: {
    rootstockMainnet: {
      url: 'https://public-node.rsk.co',
      chainId: 30,
      accounts: [PRIVATE_KEY],
    },
    rootstockTestnet: {
      url: 'https://public-node.testnet.rsk.co',
      chainId: 31,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.25',
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  etherscan: {
    apiKey: {
      // Is not required by Blockscout or Rootstock explorers, 
      // but must be any non-empty string, si leave it as "rootstock".
      rootstockTestnet: 'rootstock',
      rootstockMainnet: 'rootstock',
    },
    customChains: [
      {
        network: 'rootstockTestnet',
        chainId: 31,
        urls: {
          apiURL: 'https://be.explorer.testnet.rootstock.io/api/v3/',
          browserURL: 'https://explorer.testnet.rootstock.io/',
        },
      },
      {
        network: 'rootstockMainnet',
        chainId: 30,
        urls: {
          apiURL: 'https://be.explorer.rootstock.io/api/v3/',
          browserURL: 'https://explorer.rootstock.io/',
        },
      },
    ],
  },
  blockscout: {
    enabled: true,
    customChains: [
      {
        network: 'rootstockTestnet',
        chainId: 31,
        urls: {
          apiURL: 'https://rootstock-testnet.blockscout.com/api/',
          browserURL: 'https://rootstock-testnet.blockscout.com/',
        },
      },
      {
        network: 'rootstockMainnet',
        chainId: 30,
        urls: {
          apiURL: 'https://rootstock.blockscout.com/api/',
          browserURL: 'https://rootstock.blockscout.com/',
        },
      },
    ],
  },
};
```

Now, run the verify task, passing the address of the contract, 
the network where it's deployed, and the constructor arguments that were used to deploy the contract:
```bash
npx hardhat verify --network rootstockTestnet DEPLOYED_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS
```
or 
```bash
npx hardhat verify --network rootstockMainnet DEPLOYED_CONTRACT_ADDRESS CONSTRUCTOR_ARGUMENTS
```

:::tip[Tip]

- Replace `DEPLOYED_CONTRACT_ADDRESS` with the contract address that you want to verify.

:::

**The response should look like this:**
```bash
npx hardhat verify --network rootstockTestnet 0x1b4951c57ce2c53addcfa173d1106b5e12f11e38 1000 MyToken23 MTK23
Successfully submitted source code for contract
contracts/MyToken.sol:MyToken at 0x1b4951c57ce2c53addcfa173d1106b5e12f11e38
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MyToken on the block explorer.
https://explorer.testnet.rootstock.io/address/0x1b4951c57ce2c53addcfa173d1106b5e12f11e38#code

Successfully verified contract MyToken on the block explorer.
https://rootstock-testnet.blockscout.com/address/0x1b4951c57ce2c53addcfa173d1106b5e12f11e38#code
```

With that, the contract has been successfully verified in both block explorers.

## Resources
- [Deploy, Interact and Verify Smart Contracts using Remix and Rootstock Explorer](/developers/quickstart/remix/)
- Visit [hardhat-verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify)
- Visit [blockscout](https://docs.blockscout.com/for-users/verifying-a-smart-contract/hardhat-verification-plugin)
- [Hardhat Starter Kit for Rootstock](https://github.com/rsksmart/rootstock-hardhat-starterkit)