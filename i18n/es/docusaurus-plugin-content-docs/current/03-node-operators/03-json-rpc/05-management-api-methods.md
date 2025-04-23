---
title: Métodos API de gestión
sidebar_label: Métodos API de gestión
sidebar_position: 500
tags:
  - rsk
  - rskj
  - nodo
  - rpc
  - rpc api
  - operadores de nodos
  - rootstock
description: Los métodos JSON-RPC soportados por nodos Rootstock.
---

| Método                      | Soportado    | Comentarios                                                                                                      |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `admin_addPeer`             | NO           |                                                                                                                  |
| `admin_datadir`             | NO           |                                                                                                                  |
| `admin_nodeInfo`            | NO           |                                                                                                                  |
| `admin_peers`               | NO           |                                                                                                                  |
| `admin_setSolc`             | NO           |                                                                                                                  |
| `admin_startRPC`            | NO           |                                                                                                                  |
| `admin_startWS`             | NO           |                                                                                                                  |
| `admin_stopRPC`             | NO           |                                                                                                                  |
| `admin_stopWS`              | NO           |                                                                                                                  |
| `debug_backtraceAt`         | NO           |                                                                                                                  |
| `debug_blockPerfil`         | NO           |                                                                                                                  |
| `debug_cpuProfil`           | NO           |                                                                                                                  |
| `debug_dumpBlock`           | NO           |                                                                                                                  |
| `debug_getBlockRlp`         | NO           |                                                                                                                  |
| `debug_goTrace`             | NO           |                                                                                                                  |
| `debug_memStats`            | NO           |                                                                                                                  |
| `debug_seedHash`            | NO           |                                                                                                                  |
| `debug_setHead`             | NO           |                                                                                                                  |
| `debug_setBlockProfileRate` | NO           |                                                                                                                  |
| `debug_stacks`              | NO           |                                                                                                                  |
| `debug_startCPUProfile`     | NO           |                                                                                                                  |
| `debug_startGoTrace`        | NO           |                                                                                                                  |
| `debug_stopGoTrace`         | NO           |                                                                                                                  |
| `debug_traceBlock`          | NO           |                                                                                                                  |
| `debug_traceBlockByNumber`  | YES          |                                                                                                                  |
| `debug_traceBlockByHash`    | YES          |                                                                                                                  |
| `debug_traceBlockFromFile`  | NO           |                                                                                                                  |
| `debug_traceTransaction`    | SI           |                                                                                                                  |
| `debug_vmodule`             | NO           |                                                                                                                  |
| `debug_writeBlockProfile`   | NO           |                                                                                                                  |
| `debug_writeMemProfile`     | NO           |                                                                                                                  |
| `miner_setExtra`            | NO           |                                                                                                                  |
| `miner_setGasPrice`         | NO           |                                                                                                                  |
| `miner_start`               | NO           |                                                                                                                  |
| `miner_stop`                | NO           |                                                                                                                  |
| `miner_setEtherBase`        | NO           |                                                                                                                  |
| `personal_importRawKey`     | SI           |                                                                                                                  |
| `personal_listAccounts`     | SI           |                                                                                                                  |
| `personal_lockAccount`      | SI           |                                                                                                                  |
| `personal_newAccount`       | SI           |                                                                                                                  |
| `personal_unlockAccount`    | SI           |                                                                                                                  |
| `personal_sendTransaction`  | SI           |                                                                                                                  |
| `personal_sign`             | NO           |                                                                                                                  |
| `personal_ecRecover`        | NO           |                                                                                                                  |
| `trace_block`               | PARTIALMENTE | Opción "pending" no soportada. También soporta el hash de bloque como parámetro. |
| `trace_transaction`         | SI           |                                                                                                                  |
| `txpool_contenido`          | SI           |                                                                                                                  |
| `txpool_inspect`            | SI           |                                                                                                                  |
| `txpool_status`             | SI           |                                                                                                                  |

## Métodos RPC PUB SUB

| Método            | Soportado    | Comentarios                                                            |
| ----------------- | ------------ | ---------------------------------------------------------------------- |
| `eth_subscribe`   | PARTIALMENTE | Sólo las opciones "newHeads" y "logs" son compatibles. |
| `eth_unsubscribe` | SI           |                                                                        |

## Métodos RPC SPV

| Método                                 | Soportado | Comentarios                                                                                                                                                                                                                                                                 |
| -------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rsk_getRawBlockHeaderByNumber`        | SI        | Obtiene la cabecera de bloque codificada RLP usada para SPV, si esto es hashed usando Keccak256 le da el block hash. Esta función toma el número de bloque (en hexa) o la cadena de texto "latest", "pending", "genesis. |
| `rsk_getRawBlockHeaderByHash`          | SI        | Obtiene la cabecera de bloque codificada RLP usada para SPV, si esto es hashed usando Keccak256 le da el block hash. Esta función toma el block hash como parámetro.                                                                        |
| `rsk_getRawTransactionReceiptByHash`   | SI        | Obtiene el recibo de transacción codificado RLP, si esto se realiza usando Keccak256 le da el transaction receipt hash. Esta función toma el hash de transacción como parámetro.                                                            |
| `rsk_getTransactionReceiptNodesByHash` | SI        | Obtiene un array de nodos de la transactions receipt Trie. Esto se utiliza para cifrar hasta la raíz del recibo de la transacción. Esta función toma el hash de bloque y el hash de transacción como parámetros.            |