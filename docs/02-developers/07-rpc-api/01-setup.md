---
sidebar_label: Getting Started
sidebar_position: 100
title: Getting Started with the RPC API
tags: [faucet, Rootstock, testnet, address, wallet, tools]
description: "Easily create, interact and deploy EVM compatible smart contracts using a robust set of JSON RPC methods available through the RPC API."
---

The [RPC API](http://rpc.rootstock.io/) provides a seamless and intuitive web interface for developers to interact with [Rootstock nodes](/node-operators/setup/) via [JSON-RPC](/node-operators/json-rpc/methods/) methods. It aims to address the challenges faced by developers when trying to access critical information like logs, transactions, and balances through RPC, which can significantly impact the timely development of dApps on the Rootstock blockchain.

In this guide, you will learn:

- How to create an account and [make your first API call](#getting-started)
- View a list of [JSON-RPC methods](/node-operators/json-rpc/methods/) available.

[Use the RPC API](http://rpc.rootstock.io/)

## Who is it for?

*  dApp Developers looking to interact with the Rootstock nodes

## Features

**Easy Setup:**
- Create an API key effortlessly to initiate development.
- Make the First API call in minutes.

**API Key Authentication:**
- Provides secure authentication for decentralized applications (dApps).
- Limits API requests on a daily or monthly basis.

## Getting Started

:::info[Note]
The [RPC API](https://rpc.rootstock.io/) is available on TESTNET and MAINNET.
:::

Visit the [Rootstock RPC API](https://rpc.rootstock.io/)

<div align="center">
    <img width="50%" src="/img/tools/rpc-api/01-rpc-api-landing.png" alt="RPC API Landing Page"/>
</div>

### Get a FREE account

To create an account, click on _Sign up_

<div align="center">
    <img width="50%" src="/img/tools/rpc-api/02-sign-up.png" alt="RPC API Sign Up"/>
</div>

### Get an API Key

To get an API key:

Log in to the dashboard, and click on _New API key_:

````mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/03-generate-new-api-key.png" alt="Generate an API key"/>
</div>
````

Choose a name to identify your `apikey`, and the Network (either `Testnet` or `Mainnet`). You can also add a description (optional). Click on **Create**.

````mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/04-create-api-key.png" alt="Create API key"/>
</div>
````

### Make first API Call

Click on the newly created `apikey` to get the details:

````mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/05-make-first-api-call.png" alt="Make First API Call" />
</div>
````

You can make your first api call by using one of the provided examples, or simply by adding a url and `apikey` to your application.

````mdx-code-block
<div align="center">
    <img width="50%" src="/img/tools/rpc-api/06-connect-api.png" alt="Connect API"/>
</div>
````

#### Example Request

```shell
curl --location --request POST 'https://rpc.testnet.rootstock.io/<your-apikey>' \
--header 'Content-Type: application/json' \
--data ' {
"jsonrpc": "2.0",
"method": "eth_blockNumber",
"params": [],
"id": 0
}'
```

**Response:**

```text
{"jsonrpc":"2.0","id":0,"result":"0x4b7eca"}
```

> The daily limit is 25,000 requests per user, and each user can have up to 4 API keys, which allows an easy differentiation for different applications the user wants to test.

## Get Support

Join the [Rootstock Discord](https://rootstock.io/discord) to get support or give feedback.

## Useful Links

- Supported [JSON RPC Methods](/node-operators/json-rpc/methods/)
- [Quick Start Guide with Hardhat](/developers/smart-contracts/hardhat/)
- [RBTC Faucet](https://faucet.rootstock.io/)
