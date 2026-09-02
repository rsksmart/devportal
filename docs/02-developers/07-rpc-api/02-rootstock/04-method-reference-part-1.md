---
sidebar_label: RPC Methods (A)
sidebar_position: 104
title: Rootstock RPC API Method Reference (Part 1)
tags: [Rootstock, rpc api, testnet, address, wallet, tools]
description: "curl examples and response schemas for Rootstock RPC API methods."
---

Part 1: account, block, and transaction methods. Next: [part 2](/developers/rpc-api/rootstock/method-reference-part-2/). Index: [methods](/developers/rpc-api/rootstock/methods/).


Part 1 of the Rootstock RPC API method reference (Ethereum-compatible methods). Continue with [part 2](/developers/rpc-api/rootstock/method-reference-part-2/). See the [method index](/developers/rpc-api/rootstock/methods/).


Full curl examples and response schemas for each method. For the method index, see [Rootstock RPC API Methods](/developers/rpc-api/rootstock/methods/).

## eth_accounts

- _Method:_ `eth_accounts`
  - Returns a list of addresses owned by the client. Since Rootstock RPC Service does not store keys, this will always return empty.
- _Params:_ None

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_accounts",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": []
}
```

## eth_blockNumber

- _Method:_ `eth_blockNumber`
  - Returns the number of the most recent block.
- _Params:_ None

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_blockNumber",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x4bdcfb"
}
```

## eth_call

- _Method:_ `eth_call`
  - Executes a new message call immediately without creating a transaction on the blockchain.
- _Params:_
  - `transaction`: object, the transaction call object which contains the following fields:
    - **from:** String, the address from which the transaction is sent
    - **to:** String, required, the address to which the transaction is addressed
    - **gas:** String, the integer of gas provided for the transaction execution
    - **gasPrice:** String, the integer of the `gasPrice` used for each paid gas, encoded as a hexadecimal
    - **value:** String, the integer of value sent with this transaction encoded as hexadecimal
    - **data:** string, the hash of the method signature and encoded parameters. For more information, see the Contract ABI description in the [Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html)
  - `blockNumber`: String, required. The block number (in hex) at which to execute the call, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
  - `stateOverride`: Object, optional. Overrides account state for the call. Available only by request; if unsupported, omit this parameter. Each key is an address; each value is an object that can include:
    - **balance:** String, hex. Override the account balance.
    - **nonce:** String, hex. Override the account nonce.
    - **code:** String, hex. Override the account contract code.
    - **stateDiff:** Object. Map of storage slot (hex) to value (hex). Override specific storage slots for the account.
    - **state:** Object. Same shape as stateDiff; replaces the full storage for the account.
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_call",
    "params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
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
    "result": "0x"
}
```

### State override (optional)

You can override account state for the call by passing a third parameter, `stateOverride`. This is useful to simulate different balances, storage, or code without changing chain state. Support for this parameter depends on your RPC Service Subscription.

**Example: `balanceOf()` without state override**

Request:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_call",
  "params": [
    {
      "to": "0xa423e580dbe727151e98576d770fd3538677801c",
      "data": "0x70a082310000000000000000000000003b32a6463bd0837fbf428bbc2a4c8b4c022e5077"
    },
    "latest"
  ],
  "id": 0
}
```

Response:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x00000000000000000000000000000000000000000000003154c9729d05780000"
}
```

The result is the balance in hex. Convert to decimal to get the human-readable value (e.g. `0x...3154c9729d05780000` → 910000000000000000000).

**Example: `balanceOf()` with state override**

Request (same call with a `stateOverride` that sets a storage slot for the contract):

```json
{
  "jsonrpc": "2.0",
  "method": "eth_call",
  "params": [
    {
      "to": "0xa423e580dbe727151e98576d770fd3538677801c",
      "data": "0x70a082310000000000000000000000003b32a6463bd0837fbf428bbc2a4c8b4c022e5077"
    },
    "latest",
    {
      "0xa423e580dbe727151e98576d770fd3538677801c": {
        "stateDiff": {
          "0x8d1e5f9a8a0b1c7a6dff2f1c7c17a0f4a9a5a7d4df90cfe45bcb6b0d6fa7c7f4": "0x7E37BE2022C0914B2680000000"
        }
      }
    }
  ],
  "id": 0
}
```

Response:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x00000000000000000000000000000000000000000000003154c9729d05780000"
}
```

Convert the result hex to decimal as needed (e.g. 910000000000000000000).

## eth_chainId

- _Method:_ `eth_chainId`
  - Returns the number of the network, in hexadecimal value.
- _Params:_ None
- _Responses:_
  - `0x1f` -> Rootstock Testnet
  - `0x1e` -> Rootstock Mainnet
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json'  \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_chainId",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x1f"
}
```

## eth_estimateGas

- _Method:_ `eth_estimateGas`
  - Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain.
- _Params:_
  - **transaction:** object, the transaction call object which contains the following fields:
    - **from:** String, the address from which the transaction is sent
    - **to:** String, required, the address to which the transaction is addressed
    - **gas:** String, the integer of gas provided for the transaction execution
    - `gasPrice`: String, the integer of gasPrice used for each paid gas encoded as hexadecimal
    - `value`: String, the integer of value sent with this transaction encoded as hexadecimal
    - `data`: string, the hash of the method signature and encoded parameters. For more information, see the Contract ABI description in the [Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html)
  - `blockNumber`: String, optional. The block number (in hex) at which to estimate gas, OR one of the following block tags:
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
    "method":"eth_estimateGas",
    "params":[{"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
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
    "result": "0x5cec"
}
```

Note that when `eth_estimateGas` is called, the node simulates the transaction execution without broadcasting it to the network.
The simulation runs through the entire transaction process as if it were being executed, including checking for sufficient balance, contract code execution, etc.
During the simulation, the method calculates the exact amount of gas that would be consumed by the transaction if it were to be executed on the blockchain. The estimated gas amount is returned, helping users set an appropriate gas limit for the actual transaction.

:::info[Info]

**Prior to Arrowhead 6.5.0**, there was a difference in Rootstock compared to Ethereum:

- If one of the steps of the simulated transaction fails, the node would return the gas estimation needed for the transaction
- On Ethereum, the node would return an error instead of the gas estimation.

**Starting with Arrowhead 6.5.0:**

- Rootstock behaves the same way as Ethereum for simulated transaction failures.
- If a simulated transaction step fails, the node will now return an error, mirroring Ethereum's response.

:::

You can see this behavior on the following example, where we call `eth_estimateGas` for a transaction that would be executed from an address without enough balance.

Example:

```js
{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params":[
        {"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
        "latest"
    ],
    "id":0
}
```

Response on Rootstock:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x5498"
}
```

Response on Ethereum:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "error": {
        "code": -32000,
        "message": "insufficient funds for transfer"
    }
}
```

## eth_gasPrice

- _Method:_ `eth_gasPrice`
  - Returns the current price per gas in wei (hexadecimal).
- _Params:_ None
- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_gasPrice",
    "params":[],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x3e252e0"
}
```

## eth_getBalance

- _Method:_ `eth_getBalance`
  - Returns the balance of the account of a given address (hexadecimal).
  - _Note:_ eth_getBalance only returns the balance of the native chain currency (rBTC) and does not include any ERC20 token balances for the given address.
- _Params:_
  - **Address:** String, required - 20 Bytes (type: account)
  - **Block:** String: optional, either the hexadecimal value of a **blockNumber**, OR a blockHash, OR one of the following block tags:
    - **Latest:** the most recent block the client has available.
    - **Earliest:** the lowest numbered block the client has available.
    - **Pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
    - if not specified, it will return the balance at the latest block available.
- Example request by `blockNumber`:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":[
        "0x1fab9a0e24ffc209b01faa5a61ad4366982d0b7f",
        "0x6444bb"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x2971b6b90ba793f"
}
```

- Example request by `blockHash`:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":[
        "0x1fab9a0e24ffc209b01faa5a61ad4366982d0b7f",
        "0x98e7878cc686d5ca61ca2339bda064004c82a6bbf7b6d43d7674897f775edc91"
    ],
    "id":0
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x2971b6b90ba793f"
}
```

- Example request by `blockTag`:

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBalance",
    "params":[
        "0x1fab9a0e24ffc209b01faa5a61ad4366982d0b7f",
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
    "result": "0x2971b6b90ba793f"
}
```

## eth_getBlockByHash

- _Method:_ `eth_getBlockByHash`
  - Returns information about a block by `blockHash`.
- _Params:_
  - **Block:** String: required, the hash of a block.
  - **Option:** Boolean, optional.
    - **false:** returns only the hashes of the transactions (default)
    - **true:** returns the full transactions objects
- _Returns:_
  - **object:** A block object, or null when no block was found. The returned object has the following properties:
    - **number:** The block number of the requested block encoded as a hexadecimal string. null if pending.
    - **hash:** The block hash of the requested block. null if pending.
    - **parentHash:** Hash of the parent block.
    - **sha3Uncles:** SHA3 of the uncles data in the block.
    - **logsBloom:** The bloom filter for the logs of the block. null if pending.
    - **transactionsRoot:** The root of the transaction trie of the block.
    - **stateRoot:** The root of the final state trie of the block.
    - **receiptsRoot:** The root of the receipts trie of the block.
    - **miner:** The address of the beneficiary to whom the mining rewards were given.
    - **difficulty:** Integer of the difficulty for this block encoded as a hexadecimal string.
    - **totalDifficulty:** Integer of the total difficulty of the chain until this block encoded as a hexadecimal string.
    - **extraData:** The “extra data” field of this block.
    - **size:** The size of this block in bytes as an Integer value encoded as hexadecimal.
    - **gasLimit:** The maximum gas allowed in this block encoded as a hexadecimal string.
    - **gasUsed:** The total used gas by all transactions in this block encoded as a hexadecimal string.
    - **timestamp:** The unix timestamp for when the block was collated.
    - **transactions:** Array of transaction objects - please see eth_getTransactionByHash for exact shape.
    - **uncles:** Array of uncle hashes.
    - **minimumGasPrice:** Minimum gas price a transaction should have in order to be included in that block.
    - **bitcoinMergedMiningHeader:** It is the Bitcoin block header of the block that was used for merged mining the Rootstock block.
    - **bitcoinMergedMiningCoinbaseTransaction:** It is the coinbase transaction of the Bitcoin block that was used for merged mining the Rootstock block.
    - **bitcoinMergedMiningMerkleProof:** It is the Merkle proof that links the Bitcoin block's Merkle root with the coinbase transaction.
    - **hashForMergedMining:** It is a hash that is calculated from various fields in the Rootstock block header.
    - **paidFees:** It represents the total amount of fees paid by all transactions included in the block.
    - **cumulativeDifficulty:** It represents the total difficulty of the chain up to the current block.
- **Example Request:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByHash",
    "params":[
        "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
        false
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
        "number": "0xfcea",
        "hash": "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
        "parentHash": "0xb004f5597ac7eedb515079d33e5b805818fab26c269aa6094fbfea4d99845405",
        "sha3Uncles": "0xff84b3163df46a90bc9414e86bfb70ddb15ecb67834eb87528f8a8abbddc23e0",
        "logsBloom": "0x00000008000000800000000000000000000000000000000000000000000008000000000000040000000000000000000050000000000000000000000000000000000000000000000000000000005000000010008000000000100000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000200000000000200000000000001040000000000000400000000000000000000100000000000000010000000000000000000001000000000000001000001000000000000000000000000000020000000000080200000100000000000000000000000000000000000000000080000000000000000000000000000",
        "transactionsRoot": "0x3db27be7411aed7534c14990298234782ad91e2b7964be25bb081fc014d49583",
        "stateRoot": "0x1e07d7d8c5e82f40ef338816c777f5f67a445f904dbcf785647dde1bc24512ea",
        "receiptsRoot": "0x11422b4b5228ed3bed9eae08bb64bbad7230e9b85ef4f74b75964d17dcdecc66",
        "miner": "0x1fab9a0e24ffc209b01faa5a61ad4366982d0b7f",
        "difficulty": "0x24aa8907",
        "totalDifficulty": "0x4b96af092bb7",
        "extraData": "0x",
        "size": "0x7a5",
        "gasLimit": "0x67c280",
        "gasUsed": "0x0",
        "timestamp": "0x5d404bf0",
        "transactions": [
            "0xd63e3b6e1dd408800df812d2ab758316ac21cde155c401ae63ff9d2fff7e7710"
        ],
        "uncles": [
            "0xa5c66b4cd18b4d4c355528d8b3fc4f1724fea9f56ac11c4649515c4aea55bb70"
        ],
        "minimumGasPrice": "0x0",
        "bitcoinMergedMiningHeader": "0x00000020ec6f391bfb4fbad152de916fcf40868295b82d96533ce2329501000000000000fc38d5be8687dc934c89b3ae2a6ad3e8f77efdad192b9ceef737399fcffb1ff30c4c405df421031a441284ce",
        "bitcoinMergedMiningCoinbaseTransaction": "0x0000000000000080e53dea0fdaf87e68c8b878bb8741ae72dc2d529c9604fb603d9fade1340ad3f66088ac0000000000000000266a24aa21a9ed55c19836d4dbd18acc186dae6ff453d46444df4a4ee48b6850179b871755b90d00000000000000002a6a52534b424c4f434b3a9b846df8ecbe1e7b98351144b1672c25f54207e3998ef7d8c8492a320000fcea00000000",
        "bitcoinMergedMiningMerkleProof": "0x2e925b7315afc6cf5a938435ad424fa9c71c61b1c668104e34dfd30107915b7d60293a2d23038560421361d1bf29901efe8d30228d04f593c1cc991c4a5d373094588d9356998b9736912df45fb8c02c2c1228c415a5ed15b2e0dd9e14c501c40d6c398a3c6d0796b08b2d7c8e06a986e3cfc3b58b1a15073a8ef8d0ecad33d5b5d9b4d4da261ac1629892cec44816ebdc64e1d92756b554f525ff933fdfd016cab57a26339ba10486f4af5f3fdf8bf11651d5c345abb4f797c30d75252e8bf5e90e9da3aa73428dc01b7c165760eff60d0742ea243f907a7156c897a8fa29ce357a909b4933c4ea9f1744e21422550bde9e0c51064f160e7ba0b19646ca7d6d",
        "hashForMergedMining": "0x9b846df8ecbe1e7b98351144b1672c25f54207e3998ef7d8c8492a320000fcea",
        "paidFees": "0x0",
        "cumulativeDifficulty": "0x47e89477"
    }
}
```

## eth_getBlockByNumber

- _Method:_ `eth_getBlockByNumber`
  - Returns information about a block by blockNumber.
- _Params:_
  - **Block:** String, required. Either the hexadecimal value of a **blockNumber**, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
  - **Option:** Boolean, optional.
    - **false:** returns only the hashes of the transactions (default)
    - **true:** returns the full transactions objects
- _Returns:_
  - **object:** A block object, or null when no block was found. The returned object has the following properties:
    - **number:** The block number of the requested block encoded as a hexadecimal string. null if pending.
    - **hash:** The block hash of the requested block. null if pending.
    - **parentHash:** Hash of the parent block.
    - **sha3Uncles:** SHA3 of the uncles data in the block.
    - **logsBloom:** The bloom filter for the logs of the block. null if pending.
    - **transactionsRoot:** The root of the transaction trie of the block.
    - **stateRoot:** The root of the final state trie of the block.
    - **receiptsRoot:** The root of the receipts trie of the block.
    - **miner:** The address of the beneficiary to whom the mining rewards were given.
    - **difficulty:** Integer of the difficulty for this block encoded as a hexadecimal string.
    - **totalDifficulty:** Integer of the total difficulty of the chain until this block encoded as a hexadecimal string.
    - **extraData:** The "extra data" field of this block.
    - **size:** The size of this block in bytes as an Integer value encoded as hexadecimal.
    - **gasLimit:** The maximum gas allowed in this block encoded as a hexadecimal string.
    - **gasUsed:** The total used gas by all transactions in this block encoded as a hexadecimal string.
    - **timestamp:** The unix timestamp for when the block was collated.
    - **transactions:** Array of transaction objects - please see eth_getTransactionByHash for exact shape.
    - **uncles:** Array of uncle hashes.
    - **minimumGasPrice:** Minimum gas price a transaction should have in order to be included in that block.
    - **bitcoinMergedMiningHeader:** It is the Bitcoin block header of the block that was used for merged mining the Rootstock block.
    - **bitcoinMergedMiningCoinbaseTransaction:** It is the coinbase transaction of the Bitcoin block that was used for merged mining the Rootstock block.
    - **bitcoinMergedMiningMerkleProof:** It is the Merkle proof that links the Bitcoin block's Merkle root with the coinbase transaction.
    - **hashForMergedMining:** It is a hash that is calculated from various fields in the Rootstock block header.
    - **paidFees:** It represents the total amount of fees paid by all transactions included in the block.
    - **cumulativeDifficulty:** It represents the total difficulty of the chain up to the current block.
- **Example Request:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getBlockByNumber",
    "params":[
        "0xfcea",
        false
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
        "number": "0xfcea",
        "hash": "0xcca8612942582f1a890231a25245174d6947b7e2e990adf74e84c035c52b104f",
        "parentHash": "0xb004f5597ac7eedb515079d33e5b805818fab26c269aa6094fbfea4d99845405",
        "sha3Uncles": "0xff84b3163df46a90bc9414e86bfb70ddb15ecb67834eb87528f8a8abbddc23e0",
        "logsBloom": "0x00000008000000800000000000000000000000000000000000000000000008000000000000040000000000000000000050000000000000000000000000000000000000000000000000000000005000000010008000000000100000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000200000000000200000000000001040000000000000400000000000000000000100000000000000010000000000000000000001000000000000001000001000000000000000000000000000020000000000080200000100000000000000000000000000000000000000000080000000000000000000000000000",
        "transactionsRoot": "0x3db27be7411aed7534c14990298234782ad91e2b7964be25bb081fc014d49583",
        "stateRoot": "0x1e07d7d8c5e82f40ef338816c777f5f67a445f904dbcf785647dde1bc24512ea",
        "receiptsRoot": "0x11422b4b5228ed3bed9eae08bb64bbad7230e9b85ef4f74b75964d17dcdecc66",
        "miner": "0x1fab9a0e24ffc209b01faa5a61ad4366982d0b7f",
        "difficulty": "0x24aa8907",
        "totalDifficulty": "0x4b96af092bb7",
        "extraData": "0x",
        "size": "0x7a5",
        "gasLimit": "0x67c280",
        "gasUsed": "0x0",
        "timestamp": "0x5d404bf0",
        "transactions": [
            "0xd63e3b6e1dd408800df812d2ab758316ac21cde155c401ae63ff9d2fff7e7710"
        ],
        "uncles": [
            "0xa5c66b4cd18b4d4c355528d8b3fc4f1724fea9f56ac11c4649515c4aea55bb70"
        ],
        "minimumGasPrice": "0x0",
        "bitcoinMergedMiningHeader": "0x00000020ec6f391bfb4fbad152de916fcf40868295b82d96533ce2329501000000000000fc38d5be8687dc934c89b3ae2a6ad3e8f77efdad192b9ceef737399fcffb1ff30c4c405df421031a441284ce",
        "bitcoinMergedMiningCoinbaseTransaction": "0x0000000000000080e53dea0fdaf87e68c8b878bb8741ae72dc2d529c9604fb603d9fade1340ad3f66088ac0000000000000000266a24aa21a9ed55c19836d4dbd18acc186dae6ff453d46444df4a4ee48b6850179b871755b90d00000000000000002a6a52534b424c4f434b3a9b846df8ecbe1e7b98351144b1672c25f54207e3998ef7d8c8492a320000fcea00000000",
        "bitcoinMergedMiningMerkleProof": "0x2e925b7315afc6cf5a938435ad424fa9c71c61b1c668104e34dfd30107915b7d60293a2d23038560421361d1bf29901efe8d30228d04f593c1cc991c4a5d373094588d9356998b9736912df45fb8c02c2c1228c415a5ed15b2e0dd9e14c501c40d6c398a3c6d0796b08b2d7c8e06a986e3cfc3b58b1a15073a8ef8d0ecad33d5b5d9b4d4da261ac1629892cec44816ebdc64e1d92756b554f525ff933fdfd016cab57a26339ba10486f4af5f3fdf8bf11651d5c345abb4f797c30d75252e8bf5e90e9da3aa73428dc01b7c165760eff60d0742ea243f907a7156c897a8fa29ce357a909b4933c4ea9f1744e21422550bde9e0c51064f160e7ba0b19646ca7d6d",
        "hashForMergedMining": "0x9b846df8ecbe1e7b98351144b1672c25f54207e3998ef7d8c8492a320000fcea",
        "paidFees": "0x0",
        "cumulativeDifficulty": "0x47e89477"
    }
}
```

## eth_getCode

- _Method:_ `eth_getCode`
  - Returns the compiled byte code of a smart contract, if any, at a given address.
- _Params:_
  - **Address:** String, required. The address of the smart contract.
  - **Block:** String, required. Either the hexadecimal value of a **blockNumber**, OR a **blockHash**, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
- **Example Request:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"eth_getCode",
    "params":[
        "0xebea27d994371cd0cb9896ae4c926bc5221f6317",
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
    "result": "0x608060405260043610610..."
}
```
