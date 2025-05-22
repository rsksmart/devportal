---
sidebar_label: Verify Smart Contracts using the Hardhat Verify Plugin
sidebar_position: 107
title: Verify a Smart Contract using the Hardhat Verification Plugin
description: "Configuring Hardhat Verification plugin for Rootstock"
tags: [hardhat, tutorial, developers, quick starts, rsk, rootstock]
---

Smart contracts are the backbone of decentralized applications (dApps). They automate agreements and processes, but their code can be complex and prone to errors. Verifying your smart contracts is crucial to ensure they function as intended.

This tutorial will guide you through verifying your contracts using the Hardhat Verification Plugin on the Rootstock Blockscout Explorer. This plugin simplifies the verification of Solidity smart contracts deployed on the Rootstock network. By verifying the contracts, you allow Blockscout, an open-source block explorer, to link your contract's source code with its deployed bytecode on the blockchain, allowing for more trustless interaction with the code.

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
The [hardhat-verify plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify) supports contract verification on the [Rootstock Blockscout Explorer](https://rootstock.blockscout.com/).

> Note: The `hardhat-verify` plugin will be available soon on the [Rootstock Explorer](https://explorer.rootstock.io/).

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

You need to add the following Etherscan config to your `hardhat.config.ts` file and To obtain a Rootstock API key, follow the steps outlined in the [Obtaining a Rootstock API Key from Blockscout](../../verify-smart-contracts/Verify-Smart-Contracts-using-Blockscout) guide.:

```bash
// Hardhat configuration
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
        },
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        rskMainnet: {
            url: RSK_MAINNET_RPC_URL,
            chainId: 30,
            gasPrice: 60000000,
			accounts:[PRIVATE_KEY]
        },
        rskTestnet: {
            url: RSK_TESTNET_RPC_URL, 
            chainId: 31,
            gasPrice: 60000000,
			accounts:[PRIVATE_KEY]
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // Default is the first account
            mainnet: 0,
        },
        owner: {
            default: 0,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.24",
            },
        ],
    },
    sourcify: {
        enabled: false
      },      
    etherscan: {    
        apiKey: {
          // Is not required by blockscout. Can be any non-empty string
          rskTestnet: 'RSK_TESTNET_RPC_URL',
          rskMainnet: 'RSK_MAINNET_RPC_URL'
        },
        customChains: [
          {
            network: "rskTestnet",
            chainId: 31,
            urls: {
              apiURL: "https://rootstock-testnet.blockscout.com/api/",
              browserURL: "https://rootstock-testnet.blockscout.com/",
            }
          },
          {
            network: "rskMainnet",
            chainId: 30,
            urls: {
              apiURL: "https://rootstock.blockscout.com/api/",
              browserURL: "https://rootstock.blockscout.com/",
            }
          },

        ]
      },
};

export default config;
```

Now, run the verify task, passing the address of the contract, 
the network where it's deployed, and any other arguments that was used to deploy the contract:
```bash
npx hardhat verify --network rskTestnet DEPLOYED_CONTRACT_ADDRESS
```
or 
```bash
npx hardhat verify --network rskMainnet DEPLOYED_CONTRACT_ADDRESS
```

:::tip[Tip]

- Replace `DEPLOYED_CONTRACT_ADDRESS` with the contract address. 
- This can be gotten from the `MockERC721.json` file containing the addresses and abi under the `deployments/network` folder.

:::

**The response should look like this:**
```bash
npx hardhat verify  --network rskTestnet 0x33aC0cc41B11282085ff6db7E1F3C3c757143722 
Successfully submitted source code for contract
contracts/ERC721.sol:MockERC721 at 0x33aC0cc41B11282085ff6db7E1F3C3c757143722
for verification on the block explorer. Waiting for verification result...
Successfully verified contract MockERC721 on the block explorer.
https://rootstock-testnet.blockscout.com/address/0x33aC0cc41B11282085ff6db7E1F3C3c757143722#code
```
## Resources
- [Deploy, Interact and Verify Smart Contracts using Remix and Rootstock Explorer](/developers/quickstart/remix/)
- Visit [hardhat-verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify)
- Visit [blockscout](https://docs.blockscout.com/for-users/verifying-a-smart-contract/hardhat-verification-plugin)
- [Hardhat Starter Kit for Rootstock](https://github.com/rsksmart/rootstock-hardhat-starterkit)