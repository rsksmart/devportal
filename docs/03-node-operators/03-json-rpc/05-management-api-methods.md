---
title: Management API Methods
sidebar_label: Management API Methods
sidebar_position: 500
tags: [rsk, rskj, node, rpc, rpc api, node operators, rootstock]
description: "The JSON-RPC methods supported by Rootstock nodes."
---

| Method | Supported | Comments |
| ------ | ------ | ------ |
| `admin_addPeer` | NO | |
| `admin_datadir` | NO | |
| `admin_nodeInfo` | NO | |
| `admin_peers` | NO | |
| `admin_setSolc` | NO | |
| `admin_startRPC` | NO | |
| `admin_startWS` | NO | |
| `admin_stopRPC` | NO | |
| `admin_stopWS` | NO | |
| `debug_backtraceAt` | NO | |
| `debug_blockProfile` | NO | |
| `debug_cpuProfile` | NO | |
| `debug_dumpBlock` | NO | |
| `debug_getBlockRlp` | NO | |
| `debug_goTrace` | NO | |
| `debug_memStats` | NO | |
| `debug_seedHash` | NO | |
| `debug_setHead` | NO | |
| `debug_setBlockProfileRate` | NO | |
| `debug_stacks` | NO | |
| `debug_startCPUProfile` | NO | |
| `debug_startGoTrace` | NO | |
| `debug_stopGoTrace` | NO | |
| `debug_traceBlock` | NO | |
| `debug_traceBlockByNumber` | YES | |
| `debug_traceBlockByHash` | YES | |
| `debug_traceBlockFromFile` | NO | |
| `debug_traceTransaction` | YES | |
| `debug_vmodule` | NO | |
| `debug_writeBlockProfile` | NO | |
| `debug_writeMemProfile` | NO | |
| `miner_setExtra` | NO | |
| `miner_setGasPrice` | NO | |
| `miner_start` | NO | |
| `miner_stop` | NO | |
| `miner_setEtherBase` | NO | |
| `personal_importRawKey` | YES | |
| `personal_listAccounts` | YES | |
| `personal_lockAccount` | YES | |
| `personal_newAccount` | YES | |
| `personal_unlockAccount` | YES | |
| `personal_sendTransaction` | YES | |
| `personal_sign` | NO | |
| `personal_ecRecover` | NO | |
| `trace_block` | PARTIALLY | Option "pending" not supported. It also supports block hash as parameter. |
| `trace_transaction` | YES | |
| `txpool_content` | YES | |
| `txpool_inspect` | YES | |
| `txpool_status` | YES | |

## RPC PUB SUB methods

| Method | Supported | Comments |
| ------ | ------ | ------ |
| `eth_subscribe` | PARTIALLY | Only options "newHeads" and "logs" are supported. |
| `eth_unsubscribe` | YES | |

## RPC SPV methods

| Method | Supported | Comments |
| ------ | ------ | ------ |
| `rsk_getRawBlockHeaderByNumber` | YES | Obtains the RLP encoded block header used for SPV, if this is hashed using Keccak256 it gives the block hash. This function takes the block number (in hexa) or the string "latest", "pending", "genesis". |
| `rsk_getRawBlockHeaderByHash` | YES | Obtains the RLP encoded block header used for SPV, if this is hashed using Keccak256 it gives the block hash. This function takes the block hash as parameter. |
| `rsk_getRawTransactionReceiptByHash` | YES | Obtains the RLP encoded Transaction Receipt, if this is hashed using Keccak256 it gives the transaction receipt hash. This function takes the transaction hash as parameter.|
| `rsk_getTransactionReceiptNodesByHash` | YES | Obtains an array of nodes of the transactions receipt Trie. This is used to hash up to the transaction receipt root. This function takes the block hash and transaction hash as parameters.|