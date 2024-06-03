---
sidebar_label: GetBlock
title: 'RPC via GetBlock - Instant connection to blockchain nodes | Rootstock'
description: 'Learn how to use the API methods within GetBlock to connect to an RSK node'
tags: [GetBlock, rsk-solutions, rsk, rootstock, bitcoin, defi, dApps, blockchain, node, tutorial, docs, api, websocket, json-rpc]
render_features: 'custom-terminals'
---

![GetBlock - Banner](/img/solutions/getblock/getblock_logo.png)

[GetBlock](/solutions/getblock/) is a provider of access to full nodes of the most popular cryptocurrencies:
- Instant connection to blockchain nodes of 45+ cryptocurrencies including  Rootstock, Bitcoin (BTC), Ethereum (ETH), among others
- Supports JSON-RPC, REST and Websocket APIs
- Free plan — up to 40K requests/day

In this tutorial, you will learn how to connect to a Rootstock node using different endpoints or API methods available within GetBlock.

## How to make a JSON-RPC request over HTTP

### Mainnet

To send JSON RPC over HTTP, it is required to send the request using POST to URL `rsk.getblock.io/mainnet` with the headers `Content-Type:application/json` and `x-api-key:your-api-key`, and also, the request body. 

The example of receiving the number of the last block:

```json
{"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
```

Here's the full code sample:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  curl --location --request POST         
  'https://rsk.getblock.io/mainnet/' \ 
  --header 'x-api-key:<YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "id": "blockNumber", 
      "jsonrpc": "2.0", 
      "method": "eth_getBlockByNumber", 
    "params": ["latest", false]}'
  ```
- Windows
  ```windows-command-prompt
  curl --location --request POST         
  'https://rsk.getblock.io/mainnet/' \ 
  --header 'x-api-key:<YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "id": "blockNumber", 
      "jsonrpc": "2.0", 
      "method": "eth_getBlockByNumber", 
      "params": ["latest", false]}'
  }'
  ```

**Result**

```shell
{"jsonrpc":"2.0","id":"blockNumber","result":{"number":"0x3bfe8d","hash":"0xa431674a114cbfa4ed94748e114c87430e2d4dc325e34e52688bbcbdc1eabd9b"......
```

## Testnet

To send JSON RPC over HTTP, it is required to send the request using POST to the testnet URL `rsk.getblock.io/testnet` with the headers `Content-Type:application/json` and `x-api-key:your-api-key`, and also, the request body. 

The example of receiving the number of the last block:

```json
{"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
```

Here's the full code sample:
    
[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  curl --location --request POST         
  'https://rsk.getblock.io/testnet/' \ 
  --header 'x-api-key:<YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "id": "blockNumber", 
      "jsonrpc": "2.0", 
      "method": "eth_getBlockByNumber", 
    "params": ["latest", false]}'
  ```
- Windows
  ```windows-command-prompt
  curl --location --request POST         
  'https://rsk.getblock.io/testnet/' \ 
  --header 'x-api-key:<YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "id": "blockNumber", 
      "jsonrpc": "2.0", 
      "method": "eth_getBlockByNumber", 
    "params": ["latest", false]}'
  ```

**Result**

```shell
{"jsonrpc":"2.0","id":"blockNumber","result":{"number":"0x250256","hash":"0x7c010a2b60622981c0ba90b6354131698b87e54cfa8fe21ee9616d64b715eed8".......,
```

## How to make a JSON-RPC request using Postman

![GetBlock - PostmanRequest](/img/solutions/getblock/postman.png)

Visit: [Postman Collection](https://getblock.io/docs/get-started/postman-collection/)

## Websockets

To send JSON RPC over WebSockets, it is required to establish the connection:

## Mainnet
    
[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  wscat -c wss://rsk.getblock.io/mainnet/websocket -H "x-api-key:<YOUR-API-KEY>”
  ```
- Windows
  ```windows-command-prompt
  wscat -c wss://rsk.getblock.io/mainnet/websocket -H "x-api-key:<YOUR-API-KEY>”
  ```

Then, send the request body:

```json
{"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
```

## Testnet
    
[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  wscat -c wss://rsk.getblock.io/testnet/websocket -H "x-api-key:<YOUR-API-KEY>”
  ```
- Windows
  ```windows-command-prompt
  wscat -c wss://rsk.getblock.io/testnet/websocket -H "x-api-key:<YOUR-API-KEY>”
  ```
    
Then, send the request body:

```json
{"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
```

**Result**

```shell
# > {"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
# < {"jsonrpc":"2.0","id":"healthcheck","result":{"number":"0x3bfee3","hash":"0xb8a48a6df1fe24be6473177d5259df81e60a40bafee174b7ed37274c57d5ced3","parentHash":"0xdd07746cc68e303ff5d567ae1d19e7732bb9f8a02c8d6d71db5312337fe265c9",
```

----

## Resources

- [GetBlock Solutions Page](/solutions/getblock/)
- [Watch the GetBlock - Rootstock AMA Recording on Youtube](https://www.youtube.com/watch?v=k8qowcdtxm0)
- [About GetBlock](https://getblock.io/about)
- [What is a Blockchain Node and How Does it Work?](https://getblock.io/blog/what-is-a-blockchain-node-and-how-does-it-work)
- [Getting started with GetBlock: Authentication with API Key and API methods (JSON-RPC, REST, Websockets, etc.)](https://getblock.io/docs)