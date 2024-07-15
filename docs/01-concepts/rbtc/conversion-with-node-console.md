---
title: Conversion with node and console
sidebar_label: Node and Console
tags: [rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation, node, cli]
description: 'How to perform the Powpeg mechanism using node and console.'
sidebar_position: 305
---

This section explains how to try the Powpeg mechanism using
your Rootstock (RSK) node and a command line.

## General Requirements
- You need to be in full control of your BTC private key.
- You need a BTC Wallet properly configured using said private key.
- _[Only for release process]_ You need an Rootstock node up and running,
  with the RPC interface enabled, and the personal and eth modules enabled
  - See [how do I run an Rootstock Node?](/node-operators/setup/).

## BTC to RBTC conversion

How to perform a peg-in.

:::warning[Warning]

Read the [lock requirements](/concepts/rbtc/networks#mainnet-conversion)

:::

1. With your Bitcoin address,
   send a BTC transaction to the Rootstock Federation Address.
2. Using your preferred BTC block explorer
   (e.g. [Blocktrail](https://www.blocktrail.com/BTC)),
   follow your transaction and wait the stipulated time.
3. Convert the private key to Rootstock format with this tool:
   [https://github.com/rsksmart/utils](https://github.com/rsksmart/utils)),
   and write down your Rootstock account information.
4. Then use the [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io)
   or [Rootstock Mainnet Explorer](https://explorer.rootstock.io)
   to see your RBTC balance.
   Remember that Rootstock addresses must start with `0x`.

## RBTC to BTC conversion

How to perform a peg-out.

:::warning[Warning]

Read the [release requirements](/concepts/rbtc/networks#rbtc-to-btc-conversion)

:::

1. Add your obtained Rootstock private key to your Rootstock node.
   Replace `RSKConvertedPrivateKey`, `RSKNode` and `RSKNodePort`
   and run this command:
   ```shell
   $ curl -X POST --data '{"method":"personal_importRawKey", "params":["<RSKConvertedPrivateKey>", "<passPhraseToEncryptPrivKey>"], "jsonrpc":"2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
2. Unlock your account for transfers.
   Replace `RSKAddress`, `passPhraseJustUsedToEncryptPrivKey`, `RSKNode`
   and `RSKNodePort` and run:
   ```shell
   $ curl -X POST --data '{"method":"personal_unlockAccount", "params":["<RSKAddress>", "<passPhraseJustUsedToEncryptPrivKey>", ""], "jsonrpc":"2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
3. Transfer your desired amount.
   Replace `RSKAddress`, `valueToReleaseInWeis`, `RSKNode` and `RSKNodePort`
   and run:
   ```shell
   $ curl -X POST --data '{"method":"eth_sendTransaction", "params":[{"from": "<RSKAddress>", "to": "0x0000000000000000000000000000000001000006", "gasPrice": 59240000, "gas": 44000, "value": <valueToReleaseInWeis>}], "jsonrpc":"2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
4. Wait the stipulated time and check your BTC balance.