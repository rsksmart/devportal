---
sidebar_label: Public Nodes
sidebar_position: 9
title: Using Rootstock Public Nodes (Mainnet & Testnet)
tags: [rsk, networks, rskj node, json rpc, mainnet, testnet, cURl]
description: "Rootstock Public nodes (Mainnet, Testnet), RPC Methods."
---

[RootstockLabs](https://www.rootstocklabs.com/) currently provides two public nodes that you can use
for testing purposes, and you will find that information below.

Alternatively, follow the [installation instructions](/node-operators/setup/installation/),
to run your own Rootstock node or use an alternative node provider.
This is highly recommended for production environments,
and in accordance with the bitcoiners' maxim: **Don't trust. Verify.**

:::info[RPC Node Providers]
The Rootstock public nodes do not expose WebSockets, they are `HTTP` only.
To work around this, you may either [run your own Rootstock node](/node-operators/setup/node-runner/), or use the [Rootstock RPC API](/developers/rpc-api/rootstock/setup/) or use a third-party node provider, such as [Getblock](https://getblock.io/nodes/rsk/), [NowNodes](https://nownodes.io/nodes/rsk), [dRPC](https://drpc.org/chainlist/rootstock?utm_source=docs&utm_medium=rootstock) or [Blast API](/dev-tools/node-rpc/blast-api/).
:::

## Testnet

```text
https://public-node.testnet.rsk.co
```

## Mainnet

```text
https://public-node.rsk.co
```

## Supported JSON RPC methods

List of supported JSON-RPC methods for each module can be found in the [JSON-RPC documentation](/node-operators/json-rpc/methods/).

### Using cURL

Here's an example request using `cURL` to get the Mainnet block number:

> `"Content-Type: application/json"`

```bash
curl https://public-node.rsk.co \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```