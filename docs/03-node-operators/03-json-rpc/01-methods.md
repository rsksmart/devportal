---
title: Supported JSON-RPC Methods
sidebar_label: RPC Methods
sidebar_position: 100
tags: [rsk, rskj, node, rpc, rpc api, node operators, rootstock]
description: "The JSON-RPC methods supported by Rootstock nodes."
render_features: "tables-with-borders"
---


Here are the supported JSON-RPC Methods.

> For a full description, see the [JSON-RPC method reference](/node-operators/json-rpc/method-details-part-1/).

| Module     | Method                                                                                | Supported | Comments                                                              |
| ---------- | ------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------- |
| `web3`     | [`web3_clientVersion`](/node-operators/json-rpc/method-details-part-1/#web3_clientversion)                                           | YES       |                                                                       |
| `web3`     | [`web3_sha3`](/node-operators/json-rpc/method-details-part-1/#web3_sha3)                                                             | YES       |                                                                       |
| `eth`      | [`net_version`](/node-operators/json-rpc/method-details-part-1/#net_version)                                                         | YES       | Mainnet Chain Id = `30`, Testnet Chain Id = `31`                      |
| `eth`      | [`net_peerCount`](/node-operators/json-rpc/method-details-part-1/#net_peercount)                                                     | YES       |                                                                       |
| `eth`      | [`net_peerList`](/node-operators/json-rpc/method-details-part-1/#net_peerlist)                                                       | YES       |                                                                       |
| `eth`      | [`net_listening`](/node-operators/json-rpc/method-details-part-1/#net_listening)                                                     | YES       |                                                                       |
| `eth`      | [`eth_chainId`](/node-operators/json-rpc/method-details-part-1/#eth_chainid)                                                         | YES       | Same response as `eth_protocolVersion`                                |
| `eth`      | [`eth_protocolVersion`](/node-operators/json-rpc/method-details-part-1/#eth_protocolversion)                                         | YES       |                                                                       |
| `eth`      | [`eth_syncing`](/node-operators/json-rpc/method-details-part-1/#eth_syncing)                                                         | YES       |                                                                       |
| `eth`      | [`eth_coinbase`](/node-operators/json-rpc/method-details-part-1/#eth_coinbase)                                                       | YES       |                                                                       |
| `eth`      | [`eth_mining`](/node-operators/json-rpc/method-details-part-1/#eth_mining)                                                           | YES       |                                                                       |
| `eth`      | [`eth_hashrate`](/node-operators/json-rpc/method-details-part-1/#eth_hashrate)                                                       | YES       |                                                                       |
| `eth`      | [`eth_gasPrice`](/node-operators/json-rpc/method-details-part-1/#eth_gasprice)                                                       | YES       |                                                                       |
| `eth`      | [`eth_accounts`](/node-operators/json-rpc/method-details-part-1/#eth_accounts)                                                       | YES       |                                                                       |
| `eth`      | [`eth_blockNumber`](/node-operators/json-rpc/method-details-part-1/#eth_blocknumber)                                                 | YES       |                                                                       |
| `eth`      | [`eth_getBalance`](/node-operators/json-rpc/method-details-part-1/#eth_getbalance)                                                   | YES       |                                                                       |
| `eth`      | [`eth_getStorageAt`](/node-operators/json-rpc/method-details-part-1/#eth_getstorageat)                                               | YES       |                                                                       |
| `eth`      | [`eth_getTransactionCount`](/node-operators/json-rpc/method-details-part-1/#eth_gettransactioncount)                                 | YES       |                                                                       |
| `eth`      | [`eth_getBlockTransactionCountByHash`](/node-operators/json-rpc/method-details-part-1/#eth_getblocktransactioncountbyhash)           | YES       |                                                                       |
| `eth`      | [`eth_getBlockTransactionCountByNumber`](/node-operators/json-rpc/method-details-part-1/#eth_getblocktransactioncountbynumber)       | YES       |                                                                       |
| `eth`      | [`eth_getUncleCountByBlockHash`](/node-operators/json-rpc/method-details-part-1/#eth_getunclecountbyblockhash)                       | YES       |                                                                       |
| `eth`      | [`eth_getUncleCountByBlockNumber`](/node-operators/json-rpc/method-details-part-1/#eth_getunclecountbyblocknumber)                   | PARTIALLY | Option "pending" not yet supported.                                   |
| `eth`      | [`eth_getCode`](/node-operators/json-rpc/method-details-part-1/#eth_getcode)                                                         | PARTIALLY | Option "pending" not yet supported.                                   |
| `eth`      | [`eth_sign`](/node-operators/json-rpc/method-details-part-1/#eth_sign)                                                               | YES       |                                                                       |
| `eth`      | [`eth_sendTransaction`](/node-operators/json-rpc/method-details-part-1/#eth_sendtransaction)                                         | YES       |                                                                       |
| `eth`      | [`eth_sendRawTransaction`](/node-operators/json-rpc/method-details-part-1/#eth_sendrawtransaction)                                   | YES       |                                                                       |
| `eth`      | [`eth_call`](/node-operators/json-rpc/method-details-part-1/#eth_call)                                                               | YES       |                                                                       |
| `eth`      | [`eth_estimateGas`](/node-operators/json-rpc/method-details-part-1/#eth_estimategas)                                                 | YES       |                                                                       |
| `eth`      | [`eth_getBlockByHash`](/node-operators/json-rpc/method-details-part-2/#eth_getblockbyhash)                                           | YES       |                                                                       |
| `eth`      | [`eth_getBlockByNumber`](/node-operators/json-rpc/method-details-part-2/#eth_getblockbynumber)                                       | PARTIALLY | Option "pending" not yet supported.                                   |
| `eth`      | [`eth_getTransactionByHash`](/node-operators/json-rpc/method-details-part-2/#eth_gettransactionbyhash)                               | YES       |                                                                       |
| `eth`      | [`eth_getTransactionByBlockHashAndIndex`](/node-operators/json-rpc/method-details-part-2/#eth_gettransactionbyblockhashandindex)     | YES       |                                                                       |
| `eth`      | [`eth_getTransactionByBlockNumberAndIndex`](/node-operators/json-rpc/method-details-part-2/#eth_gettransactionbyblocknumberandindex) | PARTIALLY | Option "pending" not yet supported.                                   |
| `eth`      | [`eth_getTransactionReceipt`](/node-operators/json-rpc/method-details-part-2/#eth_gettransactionreceipt)                             | YES       |                                                                       |
| `eth`      | [`eth_pendingTransactions`](/node-operators/json-rpc/method-details-part-2/#eth_pendingtransactions)                                 | YES       |                                                                       |
| `eth`      | [`eth_getUncleByBlockHashAndIndex`](/node-operators/json-rpc/method-details-part-2/#eth_getunclebyblockhashandindex)                 | YES       |                                                                       |
| `eth`      | [`eth_getUncleByBlockNumberAndIndex`](/node-operators/json-rpc/method-details-part-2/#eth_getunclebyblocknumberandindex)             | PARTIALLY | Option "pending" not yet supported.                                   |
| `eth`      | `eth_getCompilers`                                                                    | -         | For security reasons, we've decided not to include compilers in node. |
| `eth`      | `eth_compileLLL`                                                                      | -         | For security reasons, we've decided not to include compilers in node. |
| `eth`      | `eth_compileSolidity`                                                                 | -         | For security reasons, we've decided not to include compilers in node. |
| `eth`      | `eth_compileSerpent`                                                                  | -         | For security reasons, we've decided not to include compilers in node. |
| `eth`      | [`eth_newFilter`](/node-operators/json-rpc/method-details-part-2/#eth_newfilter)                                                     | YES       |                                                                       |
| `eth`      | [`eth_newBlockFilter`](/node-operators/json-rpc/method-details-part-2/#eth_newblockfilter)                                           | YES       |                                                                       |
| `eth`      | [`eth_newPendingTransactionFilter`](/node-operators/json-rpc/method-details-part-2/#eth_newpendingtransactionfilter)                 | YES       |                                                                       |
| `eth`      | [`eth_uninstallFilter`](/node-operators/json-rpc/method-details-part-2/#eth_uninstallfilter)                                         | YES       |                                                                       |
| `eth`      | [`eth_getFilterChanges`](/node-operators/json-rpc/method-details-part-2/#eth_getfilterchanges)                                       | YES       |                                                                       |
| `eth`      | [`eth_getFilterLogs`](/node-operators/json-rpc/method-details-part-2/#eth_getfilterlogs)                                             | YES       |                                                                       |
| `eth`      | [`eth_getLogs`](/node-operators/json-rpc/method-details-part-2/#eth_getlogs)                                                         | YES       |                                                                       |
| `eth`      | `eth_bridgeState`                                                                     | YES       |                                                                       |
| `eth`      | `eth_netHashrate`                                                                     | YES       |                                                                       |
| `db`       | `db_putString`                                                                        | -         | Deprecated                                                            |
| `db`       | `db_getString`                                                                        | -         | Deprecated                                                            |
| `db`       | `db_putHex`                                                                           | -         | Deprecated                                                            |
| `db`       | `db_getHex`                                                                           | -         | Deprecated                                                            |
| `debug`    | `debug_traceTransaction`                                                              | YES       |                                                                       |
| `debug`    | `debug_traceBlockByHash`                                                              | YES       |                                                                       |
| `debug`    | `debug_wireProtocolQueueSize`                                                         | YES       |                                                                       |
| `evm`      | `evm_increaseTime`                                                                    | YES       |                                                                       |
| `evm`      | `evm_mine`                                                                            | YES       |                                                                       |
| `evm`      | `evm_reset`                                                                           | YES       |                                                                       |
| `evm`      | `evm_revert`                                                                          | YES       |                                                                       |
| `evm`      | `evm_snapshot`                                                                        | YES       |                                                                       |
| `evm`      | `evm_startMining`                                                                     | YES       |                                                                       |
| `evm`      | `evm_stopMining`                                                                      | YES       |                                                                       |
| `mnr`      | `mnr_submitBitcoinBlock`                                                              | YES       |                                                                       |
| `mnr`      | `mnr_submitBitcoinBlockTransactions`                                                  | YES       |                                                                       |
| `mnr`      | `mnr_submitBitcoinBlockPartialMerkle`                                                 | YES       |                                                                       |
| `mnr`      | `mnr_getWork`                                                                         | YES       |                                                                       |
| `personal` | `personal_dumpRawKey`                                                                 | YES       |                                                                       |
| `personal` | `personal_importRawKey`                                                               | YES       |                                                                       |
| `personal` | `personal_listAccounts`                                                               | YES       |                                                                       |
| `personal` | `personal_lockAccount`                                                                | YES       |                                                                       |
| `personal` | `personal_newAccountWithSeed`                                                         | YES       |                                                                       |
| `personal` | `personal_newAccount`                                                                 | YES       |                                                                       |
| `personal` | `personal_sendTransaction`                                                            | YES       |                                                                       |
| `personal` | `personal_unlockAccount`                                                              | YES       |                                                                       |
| `rsk`      | `rsk_getRawTransactionReceiptByHash`                                                  | YES       |                                                                       |
| `rsk`      | `rsk_getTransactionReceiptNodesByHash`                                                | YES       |                                                                       |
| `rsk`      | `rsk_getRawBlockHeaderByHash`                                                         | YES       |                                                                       |
| `rsk`      | `rsk_getRawBlockHeaderByNumber`                                                       | YES       |                                                                       |
| `rsk`      | `rsk_protocolVersion`                                                                 | YES       |                                                                       |
| `trace`    | `trace_transaction`                                                                   | YES       |                                                                       |
| `trace`    | `trace_block`                                                                         | YES       |                                                                       |
| `trace`    | [`trace_filter`](/node-operators/json-rpc/method-details-part-2/#trace_filter)                                                       | YES       |                                                                       |
| `txpool`   | `txpool_content`                                                                      | YES       |                                                                       |
| `txpool`   | `txpool_inspect`                                                                      | YES       |                                                                       |
| `txpool`   | `txpool_status`                                                                       | YES       |                                                                       |
| `sco`      | `sco_banAddress`                                                                      | YES       |                                                                       |
| `sco`      | `sco_unbanAddress`                                                                    | YES       |                                                                       |
| `sco`      | `sco_peerList`                                                                        | YES       |                                                                       |
| `sco`      | `sco_bannedAddresses`                                                                 | YES       |                                                                       |
| `sco`      | `sco_reputationSummary`                                                               | YES       |                                                                       |
| `shh`      | `shh_post`                                                                            | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_version`                                                                         | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_newIdentity`                                                                     | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_hasIdentity`                                                                     | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_newGroup`                                                                        | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_addToGroup`                                                                      | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_newFilter`                                                                       | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_uninstallFilter`                                                                 | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_getFilterChanges`                                                                | -         | Whisper protocol not supported.                                       |
| `shh`      | `shh_getMessages`                                                                     | -         | Whisper protocol not supported.                                       |

For parameter lists, examples, and return shapes, see the [JSON-RPC method reference](/node-operators/json-rpc/method-details-part-1/).

