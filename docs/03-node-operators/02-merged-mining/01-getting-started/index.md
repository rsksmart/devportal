---
sidebar_label: Implementation Guide
title: Implementation Guide
tags: [rsk, mining, bitcoin, pool]
description: "How to merge mine Rootstock using Bitcoin mining pool software."
---

Here are the steps needed to add Rootstock (RSK) merged mining capabilities to mining pool software.

## What do you need to do

Add the Rootstock merged mining information in Bitcoin block as a commitment, the complete steps are as follows:

### 1. Get the work from Rootstock node

Use the [`mnr_getWork`](/node-operators/json-rpc/methods/) method from the Rootstock node's JSON-RPC API. This method returns the information of the current block for merged mining, the boundary condition to be met ("target"), and some other data.

### 2. Put the information for merged mining in the Bitcoin block

#### Format

`OP_RETURN` + `Length` + `RSKBLOCK:` + `RskBlockInfo`

* `OP_RETURN:` is`0x6a`
* `Length` is `0x29` and represents the length of the information included after the `OP_RETURN` opcode
* `RSKBLOCK:` is the ASCII string for`0x52534b424c4f434b3a`
* `RskBlockInfo` is the block information in binary format.

For example, if `RskBlockInfo` is `e5aad3b6b9dc71a3eb98a069bd29ca32211aee8b03fd462f4ffbbe97cc75a174`
the merged mining information is `6a2952534b424c4f434b3ae5aad3b6b9dc71a3eb98a069bd29ca32211aee8b03fd462f4ffbbe97cc75a174`

#### Position

Include as the last output of Bitcoin coinbase transaction.

#### Restrictions

- The number of bytes immediately after `RskBlockInfo`, up to the end of the coinbase transaction must be lower than or equal to 128 bytes.
- The trailing raw bytes must not contain the binary string `RSKBLOCK:`
- The probability of the `RSK` tag to appear by chance is negligible, but pool servers must not rule out the possibility of a rogue Bitcoin address included in the coinbase transaction having this pattern, and being used as an attack to break the validity of merged mining header.
- The `RSKBLOCK:` tag may appear by chance or maliciously in the `ExtraNonce2` data field that is provided by miners as part of the Stratum protocol. This is not a problem as long as the poolserver adds the `RSKBLOCK:` tag after the `ExtraNonce2` chunk.

### 3. Notify Miners on a faster pace

Rootstock's average block time is 30 seconds, which is faster than Bitcoin's 10 minutes. This fact triggers the following implementation changes:

* Retrieve work from Rootstock node every **2 seconds**, so as to be always mining on the last Rootstock work.
* Sent to miners a `mining.notify` message, from stratum protocol, every time new Rootstock work is received.

### 4. Mine until work is enough to meet the target received in the work info

### 5. Submit Solution to Rootstock node

Use the [`mnr_submitBitcoinBlockPartialMerkle`](/node-operators/json-rpc/methods) method from Rootstock node's JSON-RPC API. That method has optimum performance, and is preferred among other available methods.
Other submission methods and information about the pros and cons between them can be found in the [Mining JSON-RPC API documentation](/node-operators/json-rpc).

## Transaction Execution Planning

With the implementation of parallel transaction execution ([RSKIP-144](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP144.md)), miners have an additional responsibility when creating blocks:

### How Miners Create Execution Plans

When executing transactions to build a block, miners must partition transactions into sublists for parallel execution:

- **Parallel Sublists**: Transactions are divided into multiple parallel sublists (up to 4 by default) that can be executed simultaneously
- **Sequential Sublist**: Transactions that cannot be parallelized are placed in a sequential sublist that executes after all parallel sublists complete

### Transaction Assignment Process

As miners execute transactions serially during block creation, they track which storage keys each transaction reads and writes. Based on this analysis:

1. **Independent transactions** are assigned to parallel sublists (distributed across available sublists)
2. **Connected transactions** (those accessing the same storage keys) must be in the same sublist or in the sequential sublist
3. **REMASC transaction** must always be the last transaction in the sequential sublist

### Execution Plan in Block Header

The transaction partition is recorded in the block header extension field `txExecutionSublistsEdges`, which specifies where each sublist ends in the transaction list. This allows full nodes to execute the transactions in parallel according to the miner's plan.

### Gas Limits

Each sublist has its own gas limit (block gas limit divided by number of sublists + 1), ensuring fair distribution of resources across parallel execution threads.

## Influence on Bitcoin

As a result of Rootstock's implementation of merged mining, the Bitcoin network does not get filled up with merged mining information. Only a minimal amount of information is stored: An extra output on the coinbase transaction.

Furthermore, no changes are required on Bitcoin node to support merged mining with Rootstock.
