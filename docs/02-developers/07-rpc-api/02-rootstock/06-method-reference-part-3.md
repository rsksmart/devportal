---
sidebar_label: RPC Methods (C)
sidebar_position: 106
title: Rootstock RPC API Method Reference (Part 3)
tags: [Rootstock, rpc api, testnet, address, wallet, tools]
description: "curl examples and response schemas for Rootstock RPC API methods."
---

Part 3: network, Rootstock, trace, and web3 methods. See [part 1](/developers/rpc-api/rootstock/method-reference-part-1/) or [part 2](/developers/rpc-api/rootstock/method-reference-part-2/). Index: [methods](/developers/rpc-api/rootstock/methods/).

## net_version

- _Method:_ `net_version`
  - Returns the number of the network, in decimal value.
- _Params:_ None
- **Responses:**
  - `31` -> Rootstock Testnet
  - `30` -> Rootstock Mainnet
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"net_version",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "31"
}
```

## rsk_getRawBlockHeaderByHash

- _Method:_ `rsk_getRawBlockHeaderByHash`
  - Returns the RLP-encoded block header for a given block hash. This is the raw byte representation of the block header, useful for clients that need to verify block data independently or build Merkle proofs.
- _Params:_
  - **blockHash:** String, required. The hash (32 bytes) of the block.
- _Returns:_
  - **rawBlockHeader:** String. The RLP-encoded block header as a hexadecimal string, or `null` if no block was found.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"rsk_getRawBlockHeaderByHash",
    "params":[
        "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0xf90225a0b004f5597ac7eedb515079d33e5b805818fab26c269aa6094fbfea4d99845405a0ff84b3163df46a90bc9414e86bfb70ddb15ecb67834eb87528f8a8abbddc23e0941fab9a0e24ffc209b01faa5a61ad4366982d0b7fa01e07d7d8c5e82f40ef338816c777f5f67a445f904dbcf785647dde1bc24512eaa03db27be7411aed7534c14990298234782ad91e2b7964be25bb081fc014d49583a011422b4b5228ed3bed9eae08bb64bbad7230e9b85ef4f74b75964d17dcdecc66b90100000000080000008000000000000000000000000000000000000000000000080000000000000400000000000000000000500000000000000000000000000000000000000000000000000000000050000000100080000000001000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000002000000000002000000000000010400000000000004000000000000000000001000000000000000100000000000000000000010000000000000010000010000000000000000000000000000200000000000802000001000000000000000000000000000000000000000000800000000000000000000000000008424aa890782fcea8367c28080845d404bf080800001b85000000020ec6f391bfb4fbad152de916fcf40868295b82d96533ce2329501000000000000fc38d5be8687dc934c89b3ae2a6ad3e8f77efdad192b9ceef737399fcffb1ff30c4c405df421031a441284ce"
}
```

## rsk_getRawBlockHeaderByNumber

- _Method:_ `rsk_getRawBlockHeaderByNumber`
  - Returns the RLP-encoded block header for a given block number or block tag. Like `rsk_getRawBlockHeaderByHash`, this returns the raw byte representation of the header.
- _Params:_
  - **blockNumber:** String, required. The block number in hexadecimal, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
- _Returns:_
  - **rawBlockHeader:** String. The RLP-encoded block header as a hexadecimal string, or `null` if no block was found.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"rsk_getRawBlockHeaderByNumber",
    "params":["0x677b78"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0xf90242a028b4d9c06f33011ebb6e6f709c15d01cab58f9221677a330e07bdd574170895aa00277913dcdf8b5f414f81772aa35f7bc689a7e26bf0b8826e3e4659e41b50532941fab9a0e24ffc209b01faa5a61ad4366982d0b7fa040cce40ac804d47361aa79025167a2bec2e2788e9a71515807442c25dcf5dfc5a01a0150967764e9ce870dcece131d3ecd80daf841dc1323951ad15ff4ed1cfbcea0f04a1b299d8291c2f8f83634757db367fa3ef61ae4b243b4d4cc3fb3c85ac3f0b901000000000000000000000000000000000000000000000000000000000000000000000000000404000000000000000000000000000000002000000000000020000000000000000000000000000000800200000000800000000000000000000000000000000000020000000000000000000000800000000000000000000000000000000008000000000000000000020000000000000004000000000000040000000002000000000010000000000000001800000000000000000000100000000000000000000100000020000200000000000000002000000000008020000010000000001000000000000000000000000000000008000000000000000000000000000084288b3e9b83677b788367c2808274738468b6cc1391d0018e4c4f56454c4c2d626632363766638520fb1adfaa8341ea690280b85000000020071905876277aadb0cfe654c2ef578ceb02e7a35b230fe9e4989f2a8000000002b592e56d583bea3a2fddc0cff4cbc641fb34596fdc868fc9062cb691046373b22ccb668e1e9001ac128d843"
}
```

## rsk_getRawTransactionReceiptByHash

- _Method:_ `rsk_getRawTransactionReceiptByHash`
  - Returns the RLP-encoded transaction receipt for a given transaction hash. The receipt is retrieved from the main chain only. This is useful for clients that need to independently verify receipt data or construct Merkle proofs.
- _Params:_
  - **transactionHash:** String, required. The hash (32 bytes) of the transaction.
- _Returns:_
  - **rawReceipt:** String. The RLP-encoded transaction receipt as a hexadecimal string, or `null` if no receipt was found.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"rsk_getRawTransactionReceiptByHash",
    "params":["0x359f6010957a25b885387e3201c9262c71f91e47ff487c49e5168a54fc8ea110"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0xf9010e0183015efcb9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c083015efc01"
}
```

## rsk_getStorageBytesAt

- _Method:_ `rsk_getStorageBytesAt`
  - Returns raw bytes from a storage position at a given address and block.
  - This is a Rootstock-specific RPC method. It is not part of the Ethereum JSON-RPC specification.
  - Availability can be restricted.
  - It is primarily used for bridge data inspection (for example UTXOs and peg-out related state), but it can be used for any contract storage.
  - This method was introduced to preserve Ethereum compatibility in `eth_getStorageAt` while still allowing retrieval of storage values larger than 32 bytes.
- _Params:_
  - **Address:** String, required. Contract address to read from.
  - **Position:** String, required. Storage position key (hex bytes).
  - **Block:** String or Number, required. Block identifier at which to read state (for example hex block number).
- _Note:_
  - `Position` can be either:
    - a direct storage slot key in hex, or
    - an ASCII identifier encoded as hex (for example, `nextPegoutHeight` -> `0x6e6578745065676f7574486569676874`) used by bridge state mappings.
- _Returns:_
  - **Bytes:** String. Raw bytes from the requested storage position, hex-encoded.

- **Example request:**

```json
{
  "jsonrpc": "2.0",
  "id": 4207034673815346,
  "method": "rsk_getStorageBytesAt",
  "params": [
    "0x0000000000000000000000000000000001000006",
    "0x6e6578745065676f7574486569676874",
    "0x32"
  ]
}
```

- **Example request (bridge storage key):**

```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "rsk_getStorageBytesAt",
  "params": [
    "0x0000000000000000000000000000000001000006",
    "0x00000072656c6561736552657175657374517565756557697468547848617368",
    "0x140"
  ]
}
```

- **Example response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0xf8ae94f7ee9ab7297134a0ccc76f3d50e94def17488f2c8310c8e0a04c06412341fefcd7416934acbc686fa2f4a86dd2f264299e7355d12db2d2e62794f7ee9ab7297134a0ccc76f3d50e94def17488f2c8310c8e0a06d9d917d2c058548212136e937bcc8691a6b476c754847996dd3a3d39d681e3e94f7ee9ab7297134a0ccc76f3d50e94def17488f2c8310c8e0a097711c76e1239be03af54a071eded8917a67aff6cebdb61debd70c15a76fc936"
}
```

## rsk_getTransactionReceiptNodesByHash

- _Method:_ `rsk_getTransactionReceiptNodesByHash`
  - Returns the Merkle proof nodes for a transaction receipt within a block's receipts trie. The result is an array of RLP-encoded trie nodes that form the path from the trie root to the receipt. This is useful for light clients that need to verify a receipt's inclusion in a block without downloading the full block data.
- _Params:_
  - **blockHash:** String, required. The hash (32 bytes) of the block containing the transaction.
  - **transactionHash:** String, required. The hash (32 bytes) of the transaction whose receipt proof is requested.
- _Returns:_
  - **nodes:** Array of Strings. An array of hex-encoded trie nodes forming the Merkle proof, or `null` if the transaction was not found in the given block.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"rsk_getTransactionReceiptNodesByHash",
    "params":[
        "0xf0b093db64e06ff6b94cd3cfc06d85d3664d7b021bef36c4471475b4f1d8b2b9",
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
    "result": [
        "0x700600c2d84607471d23e1b66ff5be0626e51c7e6dacf28ebbd9a899d0a72cb1b553c1000111",
        "0x4f267006027fcad12dc6e650408058ba29ad7a6fb3d4c2340f29972f56baf575320287274700042426700600c2d84607471d23e1b66ff5be0626e51c7e6dacf28ebbd9a899d0a72cb1b553c1000111fd8105"
    ]
}
```

## rsk_protocolVersion

- _Method:_ `rsk_protocolVersion`
  - Returns the current Rootstock protocol version in hexadecimal.
- _Params:_ None
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"rsk_protocolVersion",
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

## trace_block

- _Method:_ `trace_block`
  - Returns traces of all transactions in a given block. This can be useful for debugging purposes or for analyzing the behavior of a blockchain.
- _Params:_
  - **Block:** String: required, either the hexadecimal value of a **blockNumber**, OR a **blockHash**, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
- _Returns:_
  - **Block traces**: Array. An array of block traces. It includes the traces for every transaction in the given block.

- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"trace_block",
    "params":["0x677b78"],
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
            "action": {
                "callType": "call",
                "from": "0x5e9127dd60377cd56c58d93a454b687d6612b0c8",
                "to": "0x641487cf1fca15d7a0ba1fcb5068840fd822f4cf",
                "gas": "0x7473",
                "input": "0x095ea7b3000000000000000000000000e84a6b3cd3b736a4f26a2fb54f60b73fcd233f6f0000000000000000000000000000000000000000000000004563918244f40000",
                "value": "0x0"
            },
            "blockHash": "0xb4c74f621aeede6a242d250666a81c394678a469fa62c7a44b4a42c8d0cfd784",
            "blockNumber": 6781816,
            "transactionHash": "0x79825731fd5acf9fc078ad5a35267be4c1bc5997103d63311ec057a0b35c08c0",
            "transactionPosition": 0,
            "type": "call",
            "subtraces": 0,
            "traceAddress": [],
            "result": {
                "gasUsed": "0x7473",
                "output": "0x"
            }
        }
    ]
}
```

## trace_transaction

- _Method:_ `trace_transaction`
  - Returns the traces of a previously executed transaction. This can be useful for debugging purposes, or for understanding how a transaction works.
- _Params:_
  - **Transaction Hash:** String, required. A string representing the hash (32 bytes) of a transaction.
- _Returns:_
  - **Traces**: Array. An array of traces for the transaction.

- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"trace_transaction",
    "params":["0x5be397900442f9a5f491839bc0683dab48acd5d0fa8fd588af312c432b242295"],
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
            "action": {
                "callType": "call",
                "from": "0xf813c5dfe9602fb4b76ad71305788e9ca1649f31",
                "to": "0x45eda601198db28413fa7653300c52d5e4db9b8b",
                "gas": "0x16a54",
                "input": "0xcbf83a0400000000000000000000000000000000000000000000000000000000000000035249465553440000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007fa2f7497d70ae000000000000000000000000f813c5dfe9602fb4b76ad71305788e9ca1649f31000000000000000000000000000000000000000000000000000000000070146b0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000001b000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000001b0000000000000000000000000000000000000000000000000000000000000003ae4de56750faaf024d070b9dc728f110778090bfe5388a6eb86339b9eae57f1a4d95c4e05c867ba5daa8213be1e5a22866207c4b3283b254134b0addfac9870dbc56def79ca5157e3a8be27b4b3ed6da0a8bc0f3ca8b9c3029c67a651b586875000000000000000000000000000000000000000000000000000000000000000366a93d3e35a6c08298e5bc620621e66bea4a82e589d3c58618e43fa71f81d7da33df0940804cc6bfafcb1399095a50ac806e067e4f86fd4f0aaf3e89c3788a5b68761017dbcae18f423bde3b89bb31c4e14123364396c98ce09f66a6bc1c9616",
                "value": "0x0"
            },
            "blockHash": "0xb4eea0022471167e0874b106981156a6916601b317b2550b41d7423f74ec6005",
            "blockNumber": 7345262,
            "transactionHash": "0x5be397900442f9a5f491839bc0683dab48acd5d0fa8fd588af312c432b242295",
            "transactionPosition": 2,
            "type": "call",
            "subtraces": 1,
            "traceAddress": [],
            "result": null,
            "error": "Reverted"
        }
    ]
}
```

## trace_filter

- _Method:_ `trace_filter`
  - Returns traces of multiple transactions in a single request based on the filters provided. You can specify a range of block numbers (`fromBlock` and `toBlock`), and a set of origin and destination addresses (`fromAddress` and `toAddress`). This is useful for debugging purposes or for monitoring specific addresses.
- _Params:_
  - **Filter Object:** Object, required. An object with the following properties:
    - `fromBlock`: String: optional (defaults to the latest block number), either the hexadecimal value of a **blockNumber**, OR one of the following block tags:
      - **latest:** the most recent block the client has available.
      - **earliest:** the lowest numbered block the client has available.
    - `toBlock`: String: optional (defaults to the latest block number), either the hexadecimal value of a **blockNumber**, OR one of the following block tags:
      - **latest:** the most recent block the client has available.
      - **earliest:** the lowest numbered block the client has available.
    - `fromAddress`: String / Array of Strings, optional - 20 Bytes (type: account). The address from which the transaction is sent. It can be one or more addresses.
    - `toAddress`: String / Array of Strings, optional - 20 Bytes (type: account). The address to which the transaction is sent. It can be one or more addresses.
    - `after`: Number, optional. The offset trace number. Defaults to 0.
    - `count`: Number, optional. Integer number of traces to return. Defaults to 100, and the limit is 100.
- _Returns:_
  - **Traces**: Array. Traces of transactions based on the given filters.

:::info[Recommendation]
The maximum allowed block range is 2000 blocks. If block numbers are not passed in the request, `fromBlock` and `toBlock` default to `latest` block number.
:::

- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"trace_filter",
    "params":[{
        "fromBlock": "0x6FE8CA",
        "toBlock": "0x6FF09A",
        "fromAddress": ["0xCF8E22c13116CA63d837EC4AC0d4FD4FC4b1498A", "0x1313055a13cf2e89E26dB20f1DE340793B72A100"],
        "toAddress": ["0x45EDa601198dB28413Fa7653300c52D5e4Db9B8B", "0x39192498fCf1dbE11653040Bb49308e09A1056aC"],
        "count": 100,
        "after": 500
        }],
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
            "action": {
                "callType": "staticcall",
                "from": "0x45eda601198db28413fa7653300c52d5e4db9b8b",
                "to": "0x493eefbb8f0a22f85708c0c890e7b531e61a7018",
                "gas": "0x65b0",
                "input": "0xc6cd9cd6000000000000000000000000f813c5dfe9602fb4b76ad71305788e9ca1649f31",
                "value": "0x0"
            },
            "blockHash": "0x6110ffd2912ef8801881b88ec3f83fb3adecf2f5fc71766a124efcc1466d34af",
            "blockNumber": 7334200,
            "transactionHash": "0x807574576291478394438844118d8edbc025a8c47b07e4573c4ffb9f7a123a2a",
            "transactionPosition": 3,
            "type": "call",
            "subtraces": 1,
            "traceAddress": [
                0,
                5
            ],
            "result": {
                "gasUsed": "0x90a",
                "output": "0x00000000000000000000000017f9fbb707fa50eb98d7ec32cfeda33d0924f1a1"
            }
        },
        {
            "action": {
                "callType": "delegatecall",
                "from": "0x493eefbb8f0a22f85708c0c890e7b531e61a7018",
                "to": "0x6ef810908a2a75577926133799d19b7d37bedd81",
                "gas": "0x5fb9",
                "input": "0xc6cd9cd6000000000000000000000000f813c5dfe9602fb4b76ad71305788e9ca1649f31",
                "value": "0x0"
            },
            "blockHash": "0x6110ffd2912ef8801881b88ec3f83fb3adecf2f5fc71766a124efcc1466d34af",
            "blockNumber": 7334200,
            "transactionHash": "0x807574576291478394438844118d8edbc025a8c47b07e4573c4ffb9f7a123a2a",
            "transactionPosition": 3,
            "type": "call",
            "subtraces": 0,
            "traceAddress": [
                0,
                5,
                0
            ],
            "result": {
                "gasUsed": "0x2e7",
                "output": "0x00000000000000000000000017f9fbb707fa50eb98d7ec32cfeda33d0924f1a1"
            }
        }
    ]
}
```

## web3_clientVersion

- _Method:_ `web3_clientVersion`
  - Returns the current client version.
- _Params:_ None
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"web3_clientVersion",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "RskJ/6.2.0/Linux/Java1.8/ARROWHEAD-45eb751"
}
```

## web3_sha3

- _Method:_ `web3_sha3`
  - Returns Keccak-256 (not the standardized SHA3-256) hash of the given data.
- _Params:_
  - `data`: Required, string: The data in hexadecimal form to convert into a SHA3 hash
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"web3_sha3",
    "params":["0x68656c6c6f20776f726c64"],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```
