---
sidebar_label: Configure Hardhat for Rootstock
sidebar_position: 102
title: Configure Hardhat for Rootstock
description: "Learn how to configure your Hardhat project for development on Rootstock testnet and mainnet"
tags: [guides, developers, smart contracts, rsk, rootstock, hardhat, dApps, ethers]
---

## Prerequisites

1. Rootstock-compatible accounts/address. 
  - You can use existing accounts or create new ones. See [Account Based Addresses](/concepts/account-based-addresses/).
2. Wallet
  - Set up a [Metamask wallet](/dev-tools/wallets/metamask/) and get a [private key](/developers/blockchain-essentials/browser#private-keys-and-public-keys).
  
## Getting Started

### Step 1: Set up Your Hardhat Environment

- Install dotenv 
To manage environment variables, install `dotenv` using the following command:

```shell
  npm install dotenv
```

- Create a `.env` file
  - In the `rootstock-quick-start-guide` project root, create a `.env` file and add your private keys (do not share this file):

```shell
  ROOTSTOCK_MAINNET_PRIVATE_KEY="your_mainnet_private_key"
  ROOTSTOCK_TESTNET_PRIVATE_KEY="your_testnet_private_key"
```

:::info[Note]
Depending on your desired network, using a Testnet and Mainnet private key is optional, as you're not required to have separate private keys in your environment variable.
:::

### Step 2: Configure Private Keys

To configure your `rskMainnet` and `rskTestnet` private keys, you'll need to update your `hardhat.config.js` file in the root directory with your private keys.

- Copy the code snippet below and replace the existing code in your `hardhat.config.js` file. See [diff file](https://github.com/rsksmart/rootstock-quick-start-guide/blob/d018514628c4888cdba8bcdcf307cc5a2077e496/hardhat.config.js#L1) for initial code.

```js
  require("@nomiclabs/hardhat-ethers");
  require('dotenv').config();

<!-- Hardhat configuration -->
  module.exports = {
    solidity: "0.8.20",
    networks: {
      rskMainnet: {
        url: "https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}",
        chainId: 30,
        gasPrice: 60000000,
        accounts: [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY]
      },
      rskTestnet: {
        url: "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}",
        chainId: 31,
        gasPrice: 60000000,
        accounts: [process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY]
      }
    }
  };
```

> See how to [Get an API Key from the RPC API](/developers/rpc-api/rootstock/setup/)


> Replace `"your_mainnet_private_key"` and `"your_testnet_private_key"` with your private keys. For information on how to retrieve your private keys, see [How to export an account's private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

### Step 3: Fund Your Accounts
- Mainnet
  - You'll need RBTC, which you can obtain from an exchange. See [Get RBTC using Exchanges](https://rootstock.io/rbtc/).
- Testnet
  - You can get tRBTC from the [Rootstock Faucet](https://faucet.rootstock.io/). Additional faucet options include; [Thirdweb](https://thirdweb.com/rootstock-testnet) and [Blast](https://blastapi.io/faucets/rootstock-testnet) Faucets.