---
sidebar_label: Configure Foundry for Rootstock
sidebar_position: 102
title: Configure Foundry for Rootstock
description: "Learn how to configure your Foundry project for development on Rootstock testnet and mainnet"
tags: [guides, developers, smart contracts, rsk, rootstock, foundry, dApps, ethers]
---

### Environment Configuration

Once you have an account with a private key, create a `.env` file in the root of the foundry project and add the variables. 

Foundry automatically loads a `.env` file present in the project directory.

The `.env` file should follow this format:

```bash
ROOTSTOCK_RPC_URL=https://rpc.testnet.rootstock.io/{YOUR_APIKEY}
PRIVATE_KEY=0x...
```
:::info[Info]
* To obtain a Rootstock Rpc Url, visit the [RPC API DASHBOARD](https://rpc.rootstock.io/), create an account and get your testnet or mainnet rpc url.
:::

At the root of the project, run:

```bash
# To load the variables in the .env file
source .env
```