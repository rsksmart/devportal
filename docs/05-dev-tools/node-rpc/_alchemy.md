---
sidebar_position: 1
title: Alchemy
sidebar_label: Alchemy
tags: [rsk, rootstock, resources, tutorials,  Blockchains, JSON-RPC, WebSockets, Alchemy, RPC, API, RPC API]
description: "Alchemy is a leading blockchain developer platform that simplifies the process of building Web3 applications. It provides robust APIs for interacting with blockchains like Ethereum, Polygon, and more."
---

Alchemy is a leading blockchain developer platform that simplifies the process of building Web3 applications. It provides robust APIs for interacting with blockchains like Ethereum, Polygon, and more.

## Why Use Alchemy?
- **Scalable infrastructure:** Handle millions of API calls effortlessly.
- **Reliable and fast:** Built for high performance and minimal downtime.
- **Comprehensive features:** From querying blockchain data to managing NFTs, Alchemy has it all.


## Supported Blockchains
Alchemy supports multiple blockchains, including Rootstock:
- Arbitrum

## API Features
- **JSON-RPC Support:** Compatible with standard Ethereum JSON-RPC methods.
- **Enhanced APIs:** Custom endpoints for performance insights, NFT data, and more.
- **WebSockets:** For real-time updates and event subscriptions.

## Core API Methods
1. Get Account Balance
```
{
  "jsonrpc": "2.0",
  "method": "eth_getBalance",
  "params": ["0xAddress", "latest"],
  "id": 1
}
```

2. Send Transaction
```
{
  "jsonrpc": "2.0",
  "method": "eth_sendRawTransaction",
  "params": ["0xSignedTransactionData"],
  "id": 1
}
```

:::note[Info]

 To learn more about how to interact with Rootstock network with the Alchemy RPC Provider including the setup and a step by step guide,  
 
 click the button below:
 
<Button href="/developers/rpc-api/alchemy/" align="left">Alchemy Website</Button>

:::