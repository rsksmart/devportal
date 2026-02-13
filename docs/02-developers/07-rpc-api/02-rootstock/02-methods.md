---
sidebar_label: Rootstock RPC API Methods
sidebar_position: 102
title: Rootstock RPC API Methods
tags: [faucet, Rootstock, rpc api, testnet, address, wallet, tools]
description: "Easily create, interact and deploy EVM compatible smart contracts using a robust set of JSON RPC methods available through the RPC API."
---

Find below a list of methods available on the Rootstock RPC Service. See [how to setup the Rootstock RPC Service](/developers/rpc-api/rootstock/setup/).

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

- Example Response:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x4bdcfb"
}
```

## eth_call

- Executes a new message call immediately without creating a transaction on the blockchain.
- _Params:_
  - `transaction`: object, the transaction call object which contains the following fields:
    - **from:** String, the address from which the transaction is sent
    - **to:** String, required, the address to which the transaction is addressed
    - **gas:** String, the integer of gas provided for the transaction execution
    - **gasPrice:** String, the integer of the `gasPrice` used for each paid gas, encoded as a hexadecimal
    - **value:** String, the integer of value sent with this transaction encoded as hexadecimal
    - **data:** string, the hash of the method signature and encoded parameters. For more information, see the Contract ABI description in the [Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html)
  - `blockNumber`: String, required. The number of the block (in hex) from which the number of transactions is required, OR one of the following block tags:
    - **latest:** the most recent block the client has available.
    - **earliest:** the lowest numbered block the client has available.
    - **pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
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

- _Method:_
  - Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain.
- _Params:_
  - **transaction:** object, the transaction call object which contains the following fields:
    - **from:** String, the address from which the transaction is sent
    - **to:** String, required, the address to which the transaction is addressed
    - **gas:** String, the integer of gas provided for the transaction execution
    - `gasPrice`: String, the integer of gasPrice used for each paid gas encoded as hexadecimal
    - `value`: String, the integer of value sent with this transaction encoded as hexadecimal
    - `data`: string, the hash of the method signature and encoded parameters. For more information, see the Contract ABI description in the [Solidity documentation](https://docs.soliditylang.org/en/latest/abi-spec.html)
  - `blockNumber`: String, optional. The number of the block (in hex) from which the number of transactions is required, OR one of the following block tags:
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

- Rootstock will behave same way as Ethereum's behavior for simulated transaction failures.
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
    - **Pending:** A sample next block built by the client on top of latest and containing the set of transactions usually taken from local mempool. Intuitively, you can think of these as blocks that have not been mined yet. - if not specified, it will return the balance at the latest block available.
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

- Example Response:

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

    - Example Response:

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

    - Example Response:

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
    - **bitcoinMergedMiningHeader:** It is the Bitcoin block header of the block that was used for merged mining the RSK block.
    - **bitcoinMergedMiningCoinbaseTransaction:** It is the coinbase transaction of the Bitcoin block that was used for merged mining the RSK block.
    - **bitcoinMergedMiningMerkleProof:** It is the Merkle proof that links the Bitcoin block's Merkle root with the coinbase transaction.
    - **hashForMergedMining:** It is a hash that is calculated from various fields in the RSK block header.
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
false],
    "id":0
}'
```

- Example Response:

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
    "bitcoinMergedMiningHeader":
"0x00000020ec6f391bfb4fbad152de916fcf40868295b82d96533ce2329501000000000000fc38d5be8687dc934c89b3ae2a6ad3e8f77efdad192b9ceef737399fcffb1ff30c4c405df421031a441284ce",
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
  - Block: String: required, either the hexadecimal value of a blockNumber, OR one of the following block tags:
    - latest: the most recent block the client has available.
    - earliest: the lowest numbered block the client has available.
    - pending: A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
  - Option: Boolean, optional.
    - false: returns only the hashes of the transactions (default)
    - true: returns the full transactions object
- Returns:
  - object - A block object, or null when no block was found. The returned object has the following properties:
  - number - The block number of the requested block encoded as a hexadecimal string. null if pending.
  - hash - The block hash of the requested block. null if pending.
  - parentHash - Hash of the parent block.
  - sha3Uncles - SHA3 of the uncles data in the block.
  - logsBloom - The bloom filter for the logs of the block. null if pending.
  - transactionsRoot - The root of the transaction trie of the block.
  - stateRoot - The root of the final state trie of the block.
  - receiptsRoot - The root of the receipts trie of the block.
  - miner - The address of the beneficiary to whom the mining rewards were given.
  - difficulty - Integer of the difficulty for this block encoded as a hexadecimal string.
  - totalDifficulty - Integer of the total difficulty of the chain until this block encoded as a hexadecimal string.
  - extraData - The “extra data” field of this block.
  - size - The size of this block in bytes as an Integer value encoded as hexadecimal.
  - gasLimit - The maximum gas allowed in this block encoded as a hexadecimal string.
  - gasUsed - The total used gas by all transactions in this block encoded as a hexadecimal string.
  - timestamp - The unix timestamp for when the block was collated.
  - transactions - Array of transaction objects - please see eth_getTransactionByHash for exact shape.
  - uncles - Array of uncle hashes.
  - minimumGasPrice: minimum gas price a transaction should have in order to be included in that block.
  - bitcoinMergedMiningHeader: It is the Bitcoin block header of the block that was used for merged mining the Rootstock block.
  - bitcoinMergedMiningCoinbaseTransaction: It is the coinbase transaction of the Bitcoin block that was used for merged mining the Rootstock block.
  - bitcoinMergedMiningMerkleProof: It is the Merkle proof that links the Bitcoin block's Merkle root with the coinbase transaction.
  - hashForMergedMining: It is a hash that is calculated from various fields in the Rootstock block header.
  - paidFees: It represents the total amount of fees paid by all transactions included in the block.
  - cumulativeDifficulty: It represents the total difficulty of the chain up to the current block.
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
    "bitcoinMergedMiningHeader":
"0x00000020ec6f391bfb4fbad152de916fcf40868295b82d96533ce2329501000000000000fc38d5be8687dc934c89b3ae2a6ad3e8f77efdad192b9ceef737399fcffb1ff30c4c405df421031a441284ce",
    "bitcoinMergedMiningCoinbaseTransaction": "0x0000000000000080e53dea0fdaf87e68c8b878bb8741ae72dc2d529c9604fb603d9fade1340ad3f66088ac0000000000000000266a24aa21a9ed55c19836d4dbd18acc186dae6ff453d46444df4a4ee48b6850179b871755b90d00000000000000002a6a52534b424c4f434b3a9b846df8ecbe1e7b98351144b1672c25f54207e3998ef7d8c8492a320000fcea00000000",
    "bitcoinMergedMiningMerkleProof": "0x2e925b7315afc6cf5a938435ad424fa9c71c61b1c668104e34dfd30107915b7d60293a2d23038560421361d1bf29901efe8d30228d04f593c1cc991c4a5d373094588d9356998b9736912df45fb8c02c2c1228c415a5ed15b2e0dd9e14c501c40d6c398a3c6d0796b08b2d7c8e06a986e3cfc3b58b1a15073a8ef8d0ecad33d5b5d9b4d4da261ac1629892cec44816ebdc64e1d92756b554f525ff933fdfd016cab57a26339ba10486f4af5f3fdf8bf11651d5c345abb4f797c30d75252e8bf5e90e9da3aa73428dc01b7c165760eff60d0742ea243f907a7156c897a8fa29ce357a909b4933c4ea9f1744e21422550bde9e0c51064f160e7ba0b19646ca7d6d",
    "hashForMergedMining": "0x9b846df8ecbe1e7b98351144b1672c25f54207e3998ef7d8c8492a320000fcea",
    "paidFees": "0x0",
    "cumulativeDifficulty": "0x47e89477"
    }
}
```

## eth_getCode

- _Method:_ Returns the compiled byte code of a smart contract, if any, at a given address.
- _Params:_
  - Address: String: required, address
  - Block: String, required, either the hexadecimal value of a blockNumber, OR a blockHash, OR one of the following block tags:
    - latest: the most recent block the client has available.
    - earliest: the lowest numbered block the client has available.
    - pending: A sample next block built by the client on top of latest and containing the set of transactions usually taken from a local mempool. Intuitively, you can think of these as blocks that have not been mined yet.
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
    "result": "0x608060405260043610610...."
}
```

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

- Example Response:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": [
        {
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
            }, {...}  }]
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

- Example Response:

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

- Example Response:

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
        }, {...}
    ] }
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
"0x295a70b2de5e3953354a6a8344e616ed314d7251","0x0"
"latest"],
    "id":0
}'
```

- Example Response:

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

- Example Response:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": [
        {
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
        "input": "0xcc6ebc8b00000000000000000000000000",
        "v": "0x62",
        "r": "0x1f8bb5859d8194eebfb781ed6d12de95d44b66ecf",
        "s": "0x4a98b84d16a534681c5a639318b1ceffe967ce751458f51",
        "type": "0x0"
    }]
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
    - if not specified, it will return the balance at the latest block available.
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
- Returns:
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
    "params":["
    0xf0b093db64e06ff6b94cd3cfc06d85d3664d7b021bef36c4471475b4f1d8b2b9"],
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
- **Example**

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
        "_id": "6528a2bdc44af7001f969f62",
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
    - **index:** String, required. The position number of the transaction (in Hex).
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

- Example Response:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        "_id": "6528a2bdc44af7001f969f62",
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

## trace_block

- _Method:_ `trace_block`
  - It can be used to get a trace of all the transactions in a given block. This can be useful for debugging purposes or for analyzing the behavior of a blockchain.
- _Params:_
  - **Block:** String: required, either the hexadecimal value of a **blockNumber**, OR a **blockHash**, OR one of the following block tags:
    - `latest`: the most recent block the client has available.
    - `earliest`: the lowest numbered block the client has available.
- _Returns:_
  - **Array**: Array. An array of block traces. It includes the traces for every transaction in the given block.

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
    "id": 3,
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
        },
    ...
    ]
}
```

## trace_transaction

- _Method:_ `trace_transaction`
  - It can be used to get the traces of a previously executed transaction. This can be useful for debugging purposes, or for understanding how a transaction works.
- _Params:_
  - **Transaction Hash:** String, required. A string representing the hash (32 bytes) of a transaction.
- _Returns:_
  - **Array**: Array. An array of traces for the transaction.

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
    "id": 3,
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
        },
    ...
    ]
}
```

## trace_filter

- _Method:_ `trace_filter`
  - It allows users to get the traces of multiple transactions in a single request based on the filters provided. You can specify a range of block numbers (`fromBlock` and `toBlock`), and a set of origin and destination addresses (`fromAddress` and `toAddress`). This is useful for debugging purposes or for monitoring specific addresses.
- _Params:_
  - **Filter Object:** Object, required. An object with the following properties:
    - `fromBlock`: String: optional (defaults to `latest` block number), either the hexadecimal value of a **blockNumber**, OR a **blockHash**, OR one of the following block tags:
      - `latest`: the most recent block the client has available.
      - `earliest`: the lowest numbered block the client has available.
    - `toBlock`: String: optional (defaults to `latest` block number), either the hexadecimal value of a **blockNumber**, OR a **blockHash**, OR one of the following block tags:
      - `latest`: the most recent block the client has available.
      - `earliest`: the lowest numbered block the client has available.
    - `fromAddress`: String / Array of Strings, optional - 20 Bytes (type: account). The address from which the transaction is sent. It can be one or more addresses.
    - `toAddress`: String / Array of Strings, optional - 20 Bytes (type: account). The address to which the transaction is sent. It can be one or more addresses.
    - `after`: Number, optional. The offset trace number. Defaults to 0.
    - `count`: Number, optional. Integer number of traces to return. Defaults to 100, and the limit is 100.
- _Returns:_
  - **Array**: Array. Traces of transactions based on the given filters.

:::info[Recommendation]
The maximum allowed block range is 2000 blocks. If block numbers are not passes in the request, `fromBlock` and `toBlock` default to `latest` block number.
:::

- **Example:**

```shell
curl --location 'https://rpc.testnet.rootstock.io/<api-key>' \
--request POST \
--header 'accept: application/json' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc":"2.0",
    "method":"trace_transaction",
    "params":[{
        "fromBlock": "0x6FE8CA",
        "toBlock": "0x6FF09A",
        "fromAddress": ["0xCF8E22c13116CA63d837EC4AC0d4FD4FC4b1498A", "0x1313055a13cf2e89E26dB20f1DE340793B72A100"],
        "toAddress": ["0x45EDa601198dB28413Fa7653300c52D5e4Db9B8B", "0x39192498fCf1dbE11653040Bb49308e09A1056aC"],
        "count": 100,
        "after": 500
        }],
    "id":3
}'
```

- **Example Response:**

```js
{
    "jsonrpc": "2.0",
    "id": 3,
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
        },
    ...
    ]
}
```
