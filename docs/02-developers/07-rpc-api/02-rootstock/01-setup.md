---
sidebar_label: Getting Started with the Rootstock RPC API
sidebar_position: 101
title: Getting Started with the Rootstock RPC API
tags: [faucet, Rootstock, testnet, address, wallet, tools]
description: "Get started with the Rootstock RPC Service to interact with Rootstock nodes."
---

<div align="center">
    <img width="100%" src="/img/tools/rpc-api/01-rpc-api-landing.png" alt="RPC Service Landing Page"/>
</div>

:::info[Info]
The [Rootstock RPC API](https://rpc.rootstock.io/)  is available on <Shield label="mainnet" title="testnet" tooltip="Supported on Mainnet and Testnet" color="orange" />
:::

## Get A FREE Account

Visit the [Rootstock RPC API](https://rpc.rootstock.io/) to create a **free** account, and click on _Sign up_

<div align="center">
    <img width="100%" src="/img/tools/rpc-api/02-sign-up.png" alt="RPC Service Sign Up"/>
</div>

## Get An API Key

To get an API key:

Log in to the dashboard, and click on _New API key_:

<div align="center">
    <img width="100%" src="/img/tools/rpc-api/03-generate-new-api-key.png" alt="Generate an API key"/>
</div>

Choose a name to identify your `apikey`, and the Network (either `Testnet` or `Mainnet`). You can also add a description (optional). Click on **Create**.

<div align="center">
    <img width="100%" src="/img/tools/rpc-api/04-create-api-key.png" alt="Create API key"/>
</div>

## Make First API Call

Click on the newly created `apikey` to get the details:

<div align="center">
    <img width="100%" src="/img/tools/rpc-api/05-make-first-api-call.png" alt="Make First API Call"></img>
</div>

You can make your first api call by using one of the provided examples, or simply by adding a url and `apikey` to your application.

<div align="center">
    <img width="100%" src="/img/tools/rpc-api/06-connect-api.png" alt="Connect API"/>
</div>

### Example Request

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