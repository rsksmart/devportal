---
sidebar_label: Configure Hardhat for Rootstock
title: 'Configure Hardhat for Rootstock'
description: 'Learn how to configure your Hardhat project for development on Rootstock testnet and mainnet'
tags: [quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain]
render_features: 'collapsible'
---

## Prerequisites

1. Rootstock-compatible accounts/address. 
  - You can use existing accounts or create new ones. See [Account Based Addresses](/rsk/architecture/account-based/).
2. Wallet
  - Set up a [Metamask wallet](/develop/wallet/use/metamask/) or [Liquality wallet](https://chromewebstore.google.com/detail/liquality-wallet/kpfopkelmapcoipemfendmdcghnegimn?pli=1) and get a [private key](/guides/quickstart/browser#private-keys-and-public-keys).
  
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

> Note: Depending on your desired network, using a Testnet and Mainnet private key is optional, as you're not required to have separate private keys in your environment variable.

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
        url: "https://public-node.rsk.co",
        chainId: 30,
        gasPrice: 60000000,
        accounts: [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY]
      },
      rskTestnet: {
        url: "https://public-node.testnet.rsk.co",
        chainId: 31,
        gasPrice: 60000000,
        accounts: [process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY]
      }
    }
  };
```

> Replace `"your_mainnet_private_key"` and `"your_testnet_private_key"` with your private keys. For information on how to retrieve your private keys, see [How to export an account's private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

### Step 3: Fund Your Accounts
[](#top "collapsible")
- Mainnet
  - You'll need RBTC, which you can obtain from an exchange. See [Get RBTC using Exchanges](https://dev.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/).
- Testnet
  - You can get tRBTC from the [Rootstock Faucet](https://faucet.rootstock.io/).

----
## Next
- [Write a Smart Contract](/guides/quickstart/hardhat/write-smart-contract/) on the Rootstock network.
