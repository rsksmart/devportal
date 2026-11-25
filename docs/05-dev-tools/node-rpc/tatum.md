---
sidebar_position: 8
title: Tatum
sidebar_label: Tatum
tags: [dev tools, rsk, rootstock, rpc, tatum]
description: "Tatum runs JSON-RPC endpoints for Rootstock Mainnet and Testnet. Call them without an API key for development and testing, or add a key for higher limits."
---

[Tatum](https://tatum.io/chain/rootstock) is a blockchain infrastructure provider. It runs JSON-RPC endpoints for Rootstock Mainnet and Rootstock Testnet.

## Endpoints

Both endpoints serve JSON-RPC over HTTPS.

| Network | Chain ID | JSON-RPC URL |
|---------|----------|--------------|
| Rootstock Mainnet | 30 | `https://rootstock-mainnet.gateway.tatum.io` |
| Rootstock Testnet | 31 | `https://rootstock-testnet.gateway.tatum.io` |

## Rate Limits

You can call both endpoints without an API key at up to 5 requests per minute. This limit is meant for development and testing. Requests above it return HTTP 429.

For a higher limit, create an API key at [tatum.io](https://tatum.io) and send it in the `x-api-key` header. Paid plans raise the limit further.

[freerpc.com/rootstock](https://freerpc.com/rootstock) lists the free Tatum endpoints for Rootstock.

## Make Your First Call

The request below returns the latest block number on Rootstock Mainnet. It needs no API key.

```bash
curl -X POST https://rootstock-mainnet.gateway.tatum.io \
  -H 'Content-Type: application/json' \
  -d '{"id":1,"jsonrpc":"2.0","method":"eth_blockNumber"}'
```

The response looks like this:

```json
{"id":1,"jsonrpc":"2.0","result":"0x8ffe9e"}
```

The `result` field is the block number in hexadecimal.
