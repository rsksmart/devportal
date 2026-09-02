---
sidebar_label: RPC Methods (B)
sidebar_position: 105
title: Rootstock RPC API Method Reference (Part 2)
tags: [Rootstock, rpc api, testnet, address, wallet, tools]
description: "curl examples and response schemas for Rootstock RPC API methods."
---

Part 2: logs, receipts, and subscription methods. See [part 1](/developers/rpc-api/rootstock/method-reference-part-1/) or [part 3](/developers/rpc-api/rootstock/method-reference-part-3/).

## eth_getLogs

- _Method:_ `eth_getLogs`
  - Returns an array of all the logs matching the given filter object.
- _Params:_
  - `blockHash`: String, optional. Using blockHash is:
    - is equivalent to fromBlock = toBlock = the block number with hash blockHash
    - if blockHash is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.
  - `address`: String, optional. Contract address from which logs should originate.
  - `fromBlock`: String, optional.
    - either the hexadecimal value of a blockNumber, OR one of the following block tags:
      - **latest:** the most recent block the client has available.
      - **earliest:** the lowest numbered block the client has available.
      - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
  - `toBlock`: String, optional.
    - either the hexadecimal value of a blockNumber, OR one of the following block tags:
      - **latest:** the most recent block the client has available.
      - **earliest:** the lowest numbered block the client has available.
      - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
  - `topics`: Array of 32 bytes DATA topics, optional. The required topic to filter.
- _Returns:_
  - **log objects:** An array of log objects, or an empty array if nothing has changed since last poll. Log objects contain the following keys and their values:
    - **logIndex:** Hexadecimal of the log index position in the block. Null when it is a pending log.
    - **transactionIndex:** Hexadecimal of the transactions index position from which the log created. Null when it is a pending log.
    - **transactionHash:** 32 bytes. Hash of the transactions from which this log was created. Null when it is a pending log.
    - **blockHash:** 32 bytes. Hash of the block where this log was in. Null when it is a pending log.
    - **blockNumber:** Block number where this log was in. Null when it is a pending log.
    - **address:** 20 bytes. Address from which this log originated.
    - **data:** Contains one or more 32-bytes non-indexed arguments of the log.
    - **topics:** An array of 0 to 4 indexed log arguments, each 32 bytes. In solidity the first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256)), except when you declared the event with the anonymous specifier.
- Constraints:
  - You can make `eth_getLogs` requests on any block range with a cap of:
    - 10K logs in the response
    - OR a 2K block range with no cap on logs in the response
    - Note that it can be filtered either by blockHash OR (fromBlock and toBlock), but not both.
    - If `fromBlock`, `toBlock`, or `blockHash` are not specified, the query will return the logs corresponding to the latest block
- Example request by `blockHash`:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getLogs",
    "params":[
    {"blockHash":  "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f"}],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": [
        {
            "address": "0x0000000000000000000000000000000001000008",
            "blockHash": "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
            "blockNumber": "0xfcea",
            "data": "0xe6a06c82436df2ac379ed378269415c15ffda97df39ccabf71b0a9639475dd51e0778423488365",
            "logIndex": "0x1",
            "topics": [
                "0x000000000000000000000000000000006d696e696e675f6665655f746f706963",
                "0x0000000000000000000000004495768e683423a4299d6a7f02a0689a6ff5a0a4"
            ],
            "transactionHash": "0xd63e3b6e1dd408800df812d2ab758316ac21cde155c401ae63ff9d2fff7e7710",
            "transactionIndex": "0x0"
        },
        {
            "address": "0x0000000000000000000000000000000001000008",
            "blockHash": "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
            "blockNumber": "0xfcea",
            "data": "0x...",
            "logIndex": "0x2",
            "topics": [
                "0x000000000000000000000000000000006d696e696e675f6665655f746f706963"
            ],
            "transactionHash": "0xd63e3b6e1dd408800df812d2ab758316ac21cde155c401ae63ff9d2fff7e7710",
            "transactionIndex": "0x0"
        }
    ]
}
```

- Example request by `blockHash` and `address`:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getLogs",
    "params":[{"blockHash":  "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
    "address": "0x7f62ed5ffed1ddf15fb44632fae33f33712e31b5"}],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": [
        {
            "address": "0x7f62ed5ffed1ddf15fb44632fae33f33712e31b5",
            "blockHash": "0x98e7878cc686d5ca61ca2339bda064004c82a6bbf7b6d43d7674897f775edc91",
            "blockNumber": "0xf904",
            "data": "0x0000000000000000000000000000000000000000000001ffe49e9e1d03940000",
            "logIndex": "0x1",
            "topics": [
                "0x296ba4ca62c6c21c95e828080cb8aec7481b71390585605300a8a76f9e95b527"
            ],
            "transactionHash": "0xb6f35548247f43a6a5c20923fe6b7bfc57242e3c3b2b39354c6d0d131527140c",
            "transactionIndex": "0x0"
        }
    ]
}
```

- Example request by `fromBlock`, `toBlock`:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getLogs",
    "params":[
    {
    "fromBlock":  "0xfcea",
    "toBlock": "0xfcea"
    }
],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": [
        {
            "address": "0x0000000000000000000000000000000001000008",
            "blockHash": "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
            "blockNumber": "0xfcea",
            "data": "0xe6a06c82436df2ac379ed378269415c15ffda97df39ccabf71b0a9639475dd51e0778423488365",
            "logIndex": "0x1",
            "topics": [
                "0x000000000000000000000000000000006d696e696e675f6665655f746f706963",
                "0x0000000000000000000000004495768e683423a4299d6a7f02a0689a6ff5a0a4"
            ],
            "transactionHash": "0xd63e3b6e1dd408800df812d2ab758316ac21cde155c401ae63ff9d2fff7e7710",
            "transactionIndex": "0x0"
        },
        {
            "address": "0x0000000000000000000000000000000001000008",
            "blockHash": "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
            "blockNumber": "0xfcea",
            "data": "0x...",
            "logIndex": "0x2",
            "topics": [
                "0x000000000000000000000000000000006d696e696e675f6665655f746f706963"
            ],
            "transactionHash": "0xd63e3b6e1dd408800df812d2ab758316ac21cde155c401ae63ff9d2fff7e7710",
            "transactionIndex": "0x0"
        }
    ]
}
```

## eth_getStorageAt

- _Method:_ `eth_getStorageAt`
  - Returns the value from a storage position at a given address.
- _Params:_
  - **Address:** String, required - A string representing the address (20 bytes) of the storage.
  - **Position:** String, required - A hexadecimal code of the position in the storage.
  - **Block:** String: required, either the hexadecimal value of a **blockNumber**, OR a blockHash, OR one of the following block tags:
    - **Latest:** the most recent block the client has available.
    - **Earliest:** the lowest numbered block the client has available.
    - **Pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
- Example request:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getStorageAt",
    "params":[
        "0x295a70b2de5e3953354a6a8344e616ed314d7251",
        "0x0",
        "latest"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

## eth_getTransactionByHash

- _Method:_ `eth_getTransactionByHash`
  - Returns the information about a transaction requested by transaction hash. In the response object, `blockHash`, `blockNumber`, and `transactionIndex` are null when the transaction is pending.
- _Params:_
  - `transactionHash`: String, required - A string representing the hash (32 bytes) of a transaction.
- **Returns:**
  - A transaction object, or null when no transaction was found. The transaction object will consist of the following keys and their values:
    - `blockHash`: 32 bytes. A hash of the block including this transaction. null when it's pending.
    - `blockNumber`: The number of the block including this transaction. null when it's pending.
    - `from`: 20 bytes. The address of the sender.
    - `to`: 20 bytes. The address of the receiver. null when it's a contract creation transaction.
    - `gas`: Gas provided by the sender.
    - `gasPrice`: Gas price provided by the sender in Wei.
    - `hash`: 32 bytes. The hash of the transaction.
    - `input`: The data sent along with the transaction.
    - `nonce`: The number of transactions made by the sender prior to this one.
    - `v`: The ECDSA recovery ID.
    - `r`: 32 bytes. The ECDSA signature r.
    - `s`: 32 bytes. The ECDSA signature s.
    - `transactionIndex`: The transaction's index position in the block, in hexadecimal. null when it's pending.
    - `type`: The transaction type.
    - `value`: The value transferred in Wei.
- **Example Request:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByHash",
    "params":["0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        "hash": "0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110",
        "nonce": "0x10",
        "blockHash": "0xf0b093db64e06ff6b94cd3cfc06d85d3664d7b021bef36c4471475b4f1d8b2b9",
        "blockNumber": "0x35aa",
        "transactionIndex": "0x0",
        "from": "0x3843d583b0f087ec7e3476c3495e52dbde5280b3",
        "to": "0x052ef40ccda2d51ca3d49cc3d6007b25965bec5b",
        "gas": "0x20cfb",
        "gasPrice": "0x387ee40",
        "value": "0x0",
        "input": "0xcc6ebc8b00000000000000000000000000000000000000000000000000000000000003e900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000",
        "v": "0x62",
        "r": "0x1f8bb5859d8194eebfb781ed6d56fd246912ee0bf83fee2a312de95d44b66ecf",
        "s": "0x4a98b84d16a534681c5a639318b1c63f7bff6f5ca7554ceffe967ce751458f51",
        "type": "0x0"
    }
}
```

## eth_getTransactionCount

- _Method:_ `eth_getTransactionCount`
  - Returns the number of transactions sent from an address.
- **Params:**
  - _Address_: String, required - 20 Bytes
  - _Block_: String: optional, either the hexadecimal value of a `blockNumber`, OR a `blockHash`, OR one of the following block tags:
    - `latest`: the most recent block the client has available.
    - `earliest`: the lowest numbered block the client has available.
    - `pending`: A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
    - if not specified, it will return the transaction count at the latest block available.
- **Returns:**
  - **transaction count:** A hexadecimal equivalent of the integer representing the number of transactions sent from the given address.
- **Example Request:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionCount",
    "params":["0x4495768e683423a4299d6a7f02a0689a6ff5a0a4", "latest"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x9856"
}
```

## eth_getTransactionReceipt

- _Method:_ `eth_getTransactionReceipt`
  - Returns the receipt of a transaction given transaction hash. Note that the receipt is not available for pending transactions.
- _Params:_
  - `transactionHash`: String, required. A string representing the hash (32 bytes) of a transaction.
- _Returns:_
  - A transaction receipt object, or null when no receipt was found. The transaction receipt object will contain the following keys and their values:
    - `blockHash`: 32 bytes. Hash of the block including this transaction.
    - `blockNumber`: Block number including this transaction.
    - `contractAddress`: 20 bytes. The contract address created if the transaction was a contract creation, otherwise null.
    - `cumulativeGasUsed`: The total amount of gas used when this transaction was executed in the block.
    - `effectiveGasPrice`: The actual value per gas deducted from the sender's account. Before EIP-1559, equal to the gas price.
    - `from`: 20 bytes. The address of the sender.
    - `gasUsed`: The amount of gas used by this specific transaction alone.
    - `logs`: (Array) An array of log objects generated by this transaction.
    - `logsBloom`: 256 bytes. Bloom filter for light clients to quickly retrieve related logs.
    - One of the following:
      - `root`: 32 bytes of post-transaction stateroot (pre-Byzantium)
      - `status`: Either 1 (success) or 0 (failure)
    - `to`: 20 bytes. The address of the receiver. null when the transaction is a contract creation transaction.
    - `transactionHash`: 32 bytes. The hash of the transaction.
    - `transactionIndex`: Hexadecimal of the transaction's index position in the block.
    - `type`: the transaction type.
- **Example Request:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionReceipt",
    "params":[
        "0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        "transactionHash": "0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110",
        "transactionIndex": "0x0",
        "blockHash": "0xf0b093db64e06ff6b94cd3cfc06d85d3664d7b021bef36c4471475b4f1d8b2b9",
        "blockNumber": "0x35aa",
        "cumulativeGasUsed": "0x15efc",
        "gasUsed": "0x15efc",
        "contractAddress": null,
        "logs": [],
        "from": "0x3843d583b0f087ec7e3476c3495e52dbde5280b3",
        "to": "0x052ef40ccda2d51ca3d49cc3d6007b25965bec5b",
        "status": "0x1",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "type": "0x0"
    }
}
```

## eth_getBlockTransactionCountByHash

- _Method:_ `eth_getBlockTransactionCountByHash`
  - Returns the number of transactions for the block matching the given block hash (in hex).
- _Params:_
  - `blockHash`: String, required. The hash of the block from which the number of transactions is required.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByHash",
    "params":["0xf0b093db64e06ff6b94cd3cfc06d85d3664d7b021bef36c4471475b4f1d8b2b9"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x2"
}
```

## eth_getBlockTransactionCountByNumber

- _Method:_ `eth_getBlockTransactionCountByNumber`
  - Returns the number of transactions for the block matching the given block number (in hex).
- _Params:_
  - `blockNumber`: String, required. The number of the block (in hex) from which the number of transactions is required, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockTransactionCountByNumber",
    "params":["0xfcea"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x1"
}
```

## eth_getTransactionByBlockHashAndIndex

- _Method:_ `eth_getTransactionByBlockHashAndIndex`
  - Returns information about a transaction for a specific block and transaction index position.
- _Params:_
  - blockHash: String, required. The hash of the block in which the transaction is recorded.
  - index: String, required. The position number of the transaction (in Hex).
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockHashAndIndex",
    "params":[
    "0x1e3566b5fe1109d0054e43cf169f9aa4484aba61fc83fe6799d2271bab725d36",
    "0x0"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        "hash": "0x7188161bc67e8c19031bfa1732a8e74f32921b45fa3762e5451122459c5fe135",
        "nonce": "0x37a",
        "blockHash": "0x1e3566b5fe1109d0054e43cf169f9aa4484aba61fc83fe6799d2271bab725d36",
        "blockNumber": "0x35c7",
        "transactionIndex": "0x0",
        "from": "0x9a3bfdea2245738dd5f25453d13742350a4f1c6e",
        "to": "0x0000000000000000000000000000000001000006",
        "gas": "0x0",
        "gasPrice": "0x0",
        "value": "0x0",
        "input": "0xe5400e7b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000500000ff3feef74a17227d680e1bc4117b4207f8b101f132f5da9c9abf8699d590000000006708c984514a47f5d4781d31ce2761392b41254374f636ab3bf3f838f40f28cccf27265d531d041a40bd27d900000000000000000000000000000000",
        "v": "0x61",
        "r": "0xfdb6ea619ca1fbb42e8f8976209ec0f617b7068e7e89cceae2dc33492eab92af",
        "s": "0x8b2a4279058793069d74b9e1d5e71747120ba90bbfa99d99215a55c5020b47",
        "type": "0x0"
    }
}
```

## eth_getTransactionByBlockNumberAndIndex

- _Method:_ `eth_getTransactionByBlockNumberAndIndex`
  - Returns information about a transaction for a specific block and transaction index position.
- _Params:_
  - `blockNumber`: String, required. The number of the block (in hex) from which the number of transactions is required, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
  - `index`: String, required. The position number of the transaction (in Hex).
- Example:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getTransactionByBlockNumberAndIndex",
    "params":[
    "0x35c7",
    "0x0"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        "hash": "0x7188161bc67e8c19031bfa1732a8e74f32921b45fa3762e5451122459c5fe135",
        "nonce": "0x37a",
        "blockHash": "0x1e3566b5fe1109d0054e43cf169f9aa4484aba61fc83fe6799d2271bab725d36",
        "blockNumber": "0x35c7",
        "transactionIndex": "0x0",
        "from": "0x9a3bfdea2245738dd5f25453d13742350a4f1c6e",
        "to": "0x0000000000000000000000000000000001000006",
        "gas": "0x0",
        "gasPrice": "0x0",
        "value": "0x0",
        "input": "0xe5400e7b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000500000ff3feef74a17227d680e1bc4117b4207f8b101f132f5da9c9abf8699d590000000006708c984514a47f5d4781d31ce2761392b41254374f636ab3bf3f838f40f28cccf27265d531d041a40bd27d900000000000000000000000000000000",
        "v": "0x61",
        "r": "0xfdb6ea619ca1fbb42e8f8976209ec0f617b7068e7e89cceae2dc33492eab92af",
        "s": "0x8b2a4279058793069d74b9e1d5e71747120ba90bbfa99d99215a55c5020b47",
        "type": "0x0"
    }
}
```

## eth_getUncleCountByBlockHash

- _Method:_ `eth_getUncleCountByBlockHash`
  - Returns the number of uncles for the block matching the given block hash (in hex).
- _Params:_
  - `blockHash`: String, required. The hash of the block from which the number of uncles is required.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockHash",
    "params":[
    "0xf0b093db64e06ff6b94cd3cfc06d85d3664d7b021bef36c4471475b4f1d8b2b9"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x3"
}
```

## eth_getUncleCountByBlockNumber

- _Method:_ `eth_getUncleCountByBlockNumber`
  - Returns the number of uncles for the block matching the given block number (in hex).
- _Params:_
  - `blockNumber`: String, required. The number of the block (in hex) from which the number of uncles is required, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getUncleCountByBlockNumber",
    "params":[
    "0x35aa"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x3"
}
```

## eth_protocolVersion

- _Method:_ `eth_protocolVersion`
  - Returns the current protocol version.
- _Params:_ None
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_protocolVersion",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x3e"
}
```

## eth_sendRawTransaction

- _Method:_ `eth_sendRawTransaction`
  - Creates a new message call transaction or a contract creation for signed transactions.
- _Response:_ The transaction hash, or the zero hash if the transaction is not yet available.
- _Params:_
  - `transactionData`: Required, the signed transaction data (typically signed with a library, using your private key). Use `eth_getTransactionReceipt` to get the contract address, after the transaction was mined, when you created a contract.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_sendRawTransaction",
    "params":[
        "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110"
}
```

## eth_subscribe

- _Method:_ `eth_subscribe`
  - Creates a new subscription for particular events. The node returns a subscription ID. For each event that matches the subscription, a notification with relevant data is sent together with the subscription ID.
- _Params:_
  - `subscription`: String, required. The type of subscription to create. Supported subscription types:
    - **newHeads**: Subscribing to this returns a notification each time a new header is appended to the chain, including chain reorganizations. In a chain reorganization, the subscription emits all new headers for the new chain. Therefore the subscription can emit multiple headers at the same height.
    - **logs**: Returns logs that are included in new imported blocks and match the given filter criteria. In case of a chain reorganization, previously sent logs that are on the old chain are resent with the removed property set to `true`. Logs from transactions that ended up in the new chain are emitted. Therefore a subscription can emit logs for the same transaction multiple times.
    - **newPendingTransactions**: Returns the hash for all transactions that are added to the pending state and are signed with a key that's available in the node. When a transaction that was previously part of the canonical chain isn't part of the new canonical chain after a reorganization, it's emitted again.
    - **syncing**: Indicates when the node starts or stops synchronizing with the network.
  - `filter`: Object, optional. Filter criteria for logs subscription. Contains:
    - **address**: String or Array, optional. Either an address or an array of addresses. Only logs that are created from these addresses are returned.
    - **topics**: Array, optional. Only logs that match these specified topics are returned.
- _Returns:_
  - **subscription ID**: String. The ID of the newly created subscription on the node.
- _Note:_ This method requires a WebSocket connection. HTTP connections will return an error.

:::info[Recommendation]
We strongly recommend specifying a filter (`address` or `topics` or both) when subscribing to the `logs` event.
:::

### newHeads Subscription

- **Description**: Subscribing to this returns a notification each time a new header is appended to the chain, including chain reorganizations. In a chain reorganization, the subscription emits all new headers for the new chain. Therefore the subscription can emit multiple headers at the same height.
- **Example Request:**

```shell
wscat -c wss://rpc.testnet.rootstock.io/<api-key>
```

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newHeads"],
  "id": 1
}
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x9cef478923ff08bf67fde6c64013158d"
}
```

- **Example Notification:**

```js
{
    "jsonrpc": "2.0",
    "method": "eth_subscription",
    "params": {
        "subscription": "0x39272296274706424fa7e81489b96d02",
        "result": {
            "difficulty": "0xfa02664f",
            "extraData": "0xce018c524545442d61303266376265",
            "gasLimit": "0x67c280",
            "gasUsed": "0x2384e",
            "logsBloom": "0x00000000000000000000400000000000000000000000000000000000000000000000400000000000000000000000000000000000010000000000000000000000000080000000000000000000000800001000008000000000000000000200000000000000000200000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000400100004000000000080100000000000000010000000000000000000001001000000000000000001040000000000000000000000000020000000000084200000100000000000000000000000000000000020000000080000000000000000000000000000",
            "miner": "0xad418c1d48780005f6d847ef0a5e3bd93ea09090",
            "number": "0x69da35",
            "parentHash": "0xf5cc7facc8c008b1d0eb9df0e25a1c289ff14ec2b08ebc18a2a244b7b36f7fdb",
            "receiptsRoot": "0x5776dd4f58720744f39f73caef7fe16250cfbd28d0b32b7c6e7a2586762f924b",
            "sha3Uncles": "0x7ae3129c05b3da951a77d543c2a9860d047f51582c3f710137d2912920fc7153",
            "stateRoot": "0x083bbec675f24464681b69c3124929badd4d79cd6975b9e531c9dbd8a4775dd3",
            "timestamp": "0x68f261df",
            "transactionsRoot": "0x2c7873627f6a4f693127ce68644275aa4566e1a1e154de3baeee7ebc13451931",
            "hash": "0x207b0e0ab7352871ca933693e2c7b9e7bab22d00e316eb71b8fa9e96174b5997"
        }
    }
}
```

### logs Subscription

- **Description**: Returns logs that are included in new imported blocks and match the given filter criteria. In case of a chain reorganization, previously sent logs that are on the old chain are resent with the removed property set to `true`. Logs from transactions that ended up in the new chain are emitted. Therefore a subscription can emit logs for the same transaction multiple times.
- **Example Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": [
    "logs",
    {
      "address": "0x7f62ed5ffed1ddf15fb44632fae33f33712e31b5",
      "topics": [
        "0x000000000000000000000000000000006d696e696e675f6665655f746f706963"
      ]
    }
  ],
  "id": 1
}
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x4a8a4c0517381924f9838102c5a4dcb7"
}
```

- **Example Notification (normal log):**

```js
{
    "jsonrpc": "2.0",
    "method": "eth_subscription",
    "params": {
        "subscription": "0x79e74533e032fe94fe5b70d50507777a",
        "result": {
            "transactionIndex": "0x2",
            "removed": false,
            "logIndex": "0x5",
            "blockNumber": "0x69d9f8",
            "topics": [
                "0x000000000000000000000000000000006d696e696e675f6665655f746f706963",
                "0x000000000000000000000000b774aa2876145b2f6f3de27e5e6ac970aa12d771"
            ],
            "address": "0x0000000000000000000000000000000001000008",
            "data": "0xe8a0542bdd23300b27a1f00b5a89d254b4fb3fa8557579b74910733e353d2e27be9b8603615054545b",
            "transactionHash": "0x89907f5d4dd95ed73160999cc6ab19c502b78b33ac19f0510dead96229c4b09d",
            "blockHash": "0x637aa66e83c0489c2ee1386448559b4da8679ac6b27cd114fb3c03c77953cda6"
        }
    }
}
```

- **Example Notification (log from chain reorganization):**

```js
{
    "jsonrpc": "2.0",
    "method": "eth_subscription",
    "params": {
        "subscription": "0x79e74533e032fe94fe5b70d50507777a",
        "result": {
            "transactionIndex": "0x2",
            "removed": true,
            "logIndex": "0x5",
            "blockNumber": "0x69d9f8",
            "topics": [
                "0x000000000000000000000000000000006d696e696e675f6665655f746f706963",
                "0x000000000000000000000000b774aa2876145b2f6f3de27e5e6ac970aa12d771"
            ],
            "address": "0x0000000000000000000000000000000001000008",
            "data": "0xe8a0542bdd23300b27a1f00b5a89d254b4fb3fa8557579b74910733e353d2e27be9b8603615054545b",
            "transactionHash": "0x89907f5d4dd95ed73160999cc6ab19c502b78b33ac19f0510dead96229c4b09d",
            "blockHash": "0x637aa66e83c0489c2ee1386448559b4da8679ac6b27cd114fb3c03c77953cda6"
        }
    }
}
```

### newPendingTransactions Subscription

- **Description**: Returns the hash for all transactions that are added to the pending state and are signed with a key that's available in the node. When a transaction that was previously part of the canonical chain isn't part of the new canonical chain after a reorganization, it's emitted again.
- **Example Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newPendingTransactions"],
  "id": 1
}
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xc3b33aa549fb9a60e95d21862596617c"
}
```

- **Example Notification:**

```js
{
    "jsonrpc": "2.0",
    "method": "eth_subscription",
    "params": {
        "subscription": "0xc3b33aa549fb9a60e95d21862596617c",
        "result": "0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110"
    }
}
```

### syncing Subscription

- **Description**: Indicates when the node starts or stops synchronizing with the network.
- **Example Request:**

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["syncing"],
  "id": 1
}
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x4"
}
```

- **Example Notification (when syncing):**

```js
{
    "jsonrpc": "2.0",
    "method": "eth_subscription",
    "params": {
        "subscription": "0x4",
        "result": {
            "startingBlock": "0x0",
            "currentBlock": "0x4bdcfc",
            "highestBlock": "0x4bdd00"
        }
    }
}
```

- **Example Notification (when not syncing):**

```js
{
    "jsonrpc": "2.0",
    "method": "eth_subscription",
    "params": {
        "subscription": "0x4",
        "result": false
    }
}
```

### Unsubscribing

To unsubscribe from a subscription, use the `eth_unsubscribe` method:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_unsubscribe",
  "params": ["0x9cef478923ff08bf67fde6c64013158d"],
  "id": 1
}
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": true
}
```
