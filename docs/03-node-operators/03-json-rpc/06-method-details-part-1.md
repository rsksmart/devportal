---
title: JSON-RPC Method Reference (Part 1)
sidebar_label: Method Reference (A)
sidebar_position: 150
tags: [rsk, rskj, node, rpc, rpc api, node operators, rootstock]
description: "Parameter lists, examples, and return shapes for JSON-RPC methods supported by Rootstock nodes."
---

Part 1 of the JSON-RPC method reference. Continue with [part 2](/node-operators/json-rpc/method-details-part-2/). See the [method index](/node-operators/json-rpc/methods/).


Full parameter lists, examples, and return shapes for each JSON-RPC method. For a quick index, see [Supported JSON-RPC Methods](/node-operators/json-rpc/methods/).

### JSON RPC method details

These descriptions are taken from
[Ethereum's JSON RPC documentation](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).

#### web3_clientVersion

Returns the current client version.

##### Parameters

none

##### Returns

`String` - The current client version.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Mist/v0.9.3/darwin/go1.4.1"
}
```

---

#### web3_sha3

Returns Keccak-256 (_not_ the standardized SHA3-256) of the given data.

##### Parameters

1. `DATA` - the data to convert into a SHA3 hash.

##### Example Parameters

```js
params: ["0x68656c6c6f20776f726c64"];
```

##### Returns

`DATA` - The SHA3 result of the given string.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'

// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

---

#### net_version

Returns the current network id.

##### Parameters

none

##### Returns

`String` - The current network id.

- "30": Rootstock Mainnet
- "31": Ethercamp test network
- "32": Developer network
- "33": Rootstock created local network

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

---

#### net_listening

Returns `true` if client is actively listening for network connections.

##### Parameters

none

##### Returns

`Boolean` - `true` when listening, otherwise `false`.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

---

#### net_peerCount

Returns number of peers currently connected to the client.

##### Parameters

none

##### Returns

`QUANTITY` - integer of the number of connected peers.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'

// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

---

#### net_peerList

Returns list of peers known to the client.

##### Parameters

none

##### Returns

`Array` - The list of peers.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerList","params":[],"id":1}'


// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result": [
    "3fd44f66 | ec2-52-15-37-171.us-east-2.compute.amazonaws.com/52.15.37.171:5050",
    "50517861 | bootstrap14.rsk.co/54.169.136.187:5050",
    "434f8932 | bootstrap07.rsk.co/54.169.12.15:5050"]
}
```

---

#### eth_chainId

Returns the currently configured chain id, a value used in replay-protected transaction signing as introduced by EIP-155.

##### Parameters

none

##### Returns

`String` - The current chainId.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1e"
}
```

---

#### eth_protocolVersion

Returns the current ethereum protocol version.

##### Parameters

none

##### Returns

`String` - The current ethereum protocol version.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'

// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x54"
}
```

---

#### eth_syncing

Returns an object with data about the sync status or `false`.

##### Parameters

none

##### Returns

`Object|Boolean`, An object with sync status data or `FALSE`, when not syncing:

- `startingBlock`: `QUANTITY` - The block at which the import started (will only be reset, after the sync reached his head)
- `currentBlock`: `QUANTITY` - The current block, same as eth_blockNumber
- `highestBlock`: `QUANTITY` - The estimated highest block

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

---

#### eth_coinbase

Returns the client coinbase address.

##### Parameters

none

##### Returns

`DATA`, 20 bytes - the current coinbase address.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'

// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0xc94770007dda54cF92009BFF0dE90c06F603a09f"
}
```

---

#### eth_mining

Returns `true` if client is actively mining new blocks.

##### Parameters

none

##### Returns

`Boolean` - returns `true` of the client is mining, otherwise `false`.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'

// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}

```

---

#### eth_hashrate

Returns the number of hashes per second that the node is mining with.

##### Parameters

none

##### Returns

`QUANTITY` - number of hashes per second.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'

// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}

```

---

#### eth_gasPrice

Returns the current price per gas in wei.

##### Parameters

none

##### Returns

`QUANTITY` - integer of the current gas price in wei.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'

// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x09184e72a000" // 10000000000000
}
```

---

#### eth_accounts

Returns a list of addresses owned by client.

##### Parameters

none

##### Returns

`Array of DATA`, 20 Bytes - addresses owned by the client.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"]
}
```

---

#### eth_blockNumber

Returns the number of most recent block.

##### Parameters

none

##### Returns

`QUANTITY` - integer of the current block number the client is on.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0xc94" // 1207
}
```

---

#### eth_getBalance

Returns the balance of the account of given address.

##### Parameters

1. `DATA`, 20 Bytes - address to check for balance.
2. `QUANTITY|TAG|MAP` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block), or a map containing a block hash string, under the key `"blockHash"` or a string hexadecimal number, under the key `"blockNumber"`.

##### Example Parameters

```js
params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"];
```

##### Returns

`QUANTITY` - integer of the current balance in wei.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

---

#### eth_getStorageAt

Returns the value from a storage position at a given address.

##### Parameters

1. `DATA`, 20 Bytes - address of the storage.
2. `QUANTITY` - integer of the position in the storage.
3. `QUANTITY|TAG|MAP` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block), or a map containing a block hash string, under the key `"blockHash"` or a string hexadecimal number, under the key `"blockNumber"`.

##### Returns

`DATA` - the value at this storage position (A 32-byte zero value is returned
for non-existing keys).

##### Example

Calculating the correct position depends on the storage to retrieve. Consider the following contract deployed at `0x295a70b2de5e3953354a6a8344e616ed314d7251` by address `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;

    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Retrieving the value of pos0 is straight forward:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Retrieving an element of the map is harder. The position of an element in the map is calculated with:

```js
keccack(LeftPad32(key, 0), LeftPad32(map position, 0))
```

This means to retrieve the storage on pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] we need to calculate the position with:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
);
```

The geth console which comes with the web3 library can be used to make the calculation:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Now to fetch the storage:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}

```

---

#### eth_getTransactionCount

Returns the number of transactions _sent_ from an address.

##### Parameters

1. `DATA`, 20 Bytes - address.
2. `QUANTITY|TAG|MAP` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block), or a map containing a block hash string, under the key `"blockHash"` or a string hexadecimal number, under the key `"blockNumber"`.

##### Example Parameters

```js
params: [
  "0xc94770007dda54cF92009BFF0dE90c06F603a09f",
  "latest", // state at the latest block
];
```

##### Returns

`QUANTITY` - integer of the number of transactions send from this address.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

---

#### eth_getBlockTransactionCountByHash

Returns the number of transactions in a block from a block matching the given block hash.

##### Parameters

1. `DATA`, 32 Bytes - hash of a block.

##### Example Parameters

```js
params: ["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"];
```

##### Returns

`QUANTITY` - integer of the number of transactions in this block, or `null` when no block was found.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc" // 11
}
```

---

#### eth_getBlockTransactionCountByNumber

Returns the number of transactions in a block matching the given block number.

##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).

##### Example Parameters

```js
params: [
  "0xe8", // 232
];
```

##### Returns

`QUANTITY` - integer of the number of transactions in this block.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa" // 10
}
```

---

#### eth_getUncleCountByBlockHash

Returns the number of uncles in a block from a block matching the given block hash.

##### Parameters

1. `DATA`, 32 Bytes - hash of a block.

##### Example Parameters

```js
params: ["0xc94770007dda54cF92009BFF0dE90c06F603a09f"];
```

##### Returns

`QUANTITY` - integer of the number of uncles in this block.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xc" // 1
}
```

---

#### eth_getUncleCountByBlockNumber

Returns the number of uncles in a block from a block matching the given block number.

##### Parameters

1. `QUANTITY|TAG` - integer of a block number, or the string "latest", "earliest" or "pending", see the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).

```js
params: [
  "0xe8", // 232
];
```

##### Returns

`QUANTITY` - integer of the number of uncles in this block.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

---

#### eth_getCode

Returns code at a given address.

##### Parameters

1. `DATA`, 20 Bytes - address.
2. `QUANTITY|TAG|MAP` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block), or a map containing a block hash string, under the key `"blockHash"` or a string hexadecimal number, under the key `"blockNumber"`.

##### Example Parameters

```js
params: [
  "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
  "0x2", // 2
];
```

##### Returns

`DATA` - the code from the given address.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", "0x2"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
}
```

---

#### eth_sign

The sign method calculates an Ethereum specific signature with: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

By adding a prefix to the message makes the calculated signature recognisable as an Ethereum specific signature. This prevents misuse where a malicious dApp can sign arbitrary data (e.g. transaction) and use the signature to impersonate the victim.

**Note** the address to sign with must be unlocked.

##### Parameters

account, message

1. `DATA`, 20 Bytes - address.
2. `DATA`, N Bytes - message to sign.

##### Returns

`DATA`: Signature

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

#### eth_sendTransaction

Creates new message call transaction or a contract creation, if the data field contains code.

##### Parameters

1. `Object` - The transaction object

- `from`: `DATA`, 20 Bytes - The address the transaction is sent from.
- `to`: `DATA`, 20 Bytes - (optional when creating new contract) The address the transaction is sent to.
- `gas`: `QUANTITY` - (optional, default: 90000) Integer of the gas provided for the transaction execution. It will return unused gas.
- `gasPrice`: `QUANTITY` - (optional, default: 0) Integer of the gasPrice used for each paid gas
- `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
- `data`: `DATA` - The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. For details see [Ethereum Contract ABI](https://docs.soliditylang.org/en/develop/abi-spec.html)
- `nonce`: `QUANTITY` - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

##### Example Parameters

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
];
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use [eth_getTransactionReceipt](/node-operators/json-rpc/method-details-part-2/#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

---

#### eth_sendRawTransaction

Creates new message call transaction or a contract creation for signed transactions.

##### Parameters

1. `DATA`, The signed transaction data.

##### Example Parameters

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
];
```

##### Returns

`DATA`, 32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.

Use [eth_getTransactionReceipt](/node-operators/json-rpc/method-details-part-2/#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

---

#### eth_call

Executes a new message call immediately without creating a transaction on the block chain.

##### Parameters

1. `Object` - The transaction call object

- `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
- `to`: `DATA`, 20 Bytes - The address the transaction is directed to.
- `gas`: `QUANTITY` - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
- `gasPrice`: `QUANTITY` - (optional) Integer of the gasPrice used for each paid gas
- `value`: `QUANTITY` - (optional) Integer of the value sent with this transaction
- `data|input`: `DATA` - (optional) Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI in the Solidity documentation](https://solidity.readthedocs.io/en/latest/abi-spec.html)

2. `QUANTITY|TAG` - integer block number, or the string `"latest"`, `"earliest"` or `"pending"`, see the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block)

3. `Object` - From [LOVELL-7.2.0](https://rootstock.io/blog/introducing-rskj-lovell-7-2-0/) release and on, we support the State Override Set. The state override set is an optional address-to-state mapping, used in `eth_call`, where each entry specifies some state to be momentarily overridden prior to executing the call. Each address maps to an object containing the following fields:

- `balance`: `QUANTITY`, 32 Bytes - (optional) Fake balance to set for the account before executing the call.
- `nonce`: `QUANTITY`, 8 Bytes - (optional) Fake nonce to set for the account before executing the call.
- `code`: `DATA`, any - (optional) Fake EVM bytecode to inject into the account before executing the call.
- `state`: `Object`, any - (optional) Fake key-value mapping to override all slots in the account storage before executing the call.
- `stateDiff`: `Object`, any - (optional) Fake key-value mapping to override individual slots in the account storage before executing the call.
- `movePrecompileToAddress`: `DATA`, 20 Bytes - Not suppported yet.

:::tip[Tip]

State override can be enabled/disabled and its behavior can be tweaked via [rpc configurations](https://dev.rootstock.io/node-operators/setup/configuration/reference/#rpc).

:::

##### Example without State Override

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}

// In case of REVERT error
{
   "jsonrpc":"2.0",
   "id":1,
   "error":{
      "code":-32015,
      "message":"VM Exception while processing transaction: revert reason",
      "data":"0x08c379a..."
   }
}
```

##### Example with State Override

```js
// Request
curl -X POST --data '{
    "jsonrpc":"2.0",
    "method":"eth_call",
    "params":[
        {
            "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            "gas": "0x76c0",
            "gasPrice": "0x9184e72a000",
            "value": "0x9184e72a",
            "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
        },
        "latest",
        {
            "0xb60e8dd61c5d32be8058bb8eb970870f07233155": {
                "balance": "0x1000000000000000000",
                "nonce": "0x2",
                "code": "<your EVM bytecode here>",
                "state": {
                    "0x0000000000000000000000000000000000000000000000000000000000000000": "0x0000000000000000000000000000000000000000000000000000000000000001",
                    "0x0000000000000000000000000000000000000000000000000000000000000001": "0x0000000000000000000000000000000000000000000000000000000000000002"
                },
                "stateDiff": {
                    "0x0000000000000000000000000000000000000000000000000000000000000002": "0x0000000000000000000000000000000000000000000000000000000000000003"
                }
            },
            "0xd46e8dd67c5d32be8058bb8eb970870f07244567": {
                "balance": "0x2000000000000000000",
                "nonce": "0x10"
            }
        }
    ]
}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}

// In case of REVERT error
{
   "jsonrpc":"2.0",
   "id":1,
   "error":{
      "code":-32015,
      "message":"VM Exception while processing transaction: revert reason",
      "data":"0x08c379a..."
   }
}
```


```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}

// In case of REVERT error
{
   "jsonrpc":"2.0",
   "id":1,
   "error":{
      "code":-32015,
      "message":"VM Exception while processing transaction: revert reason",
      "data":"0x08c379a..."
   }
}
```
---

#### eth_estimateGas

Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.

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

##### Parameters

See [eth_call](#eth_call) parameters, expect that all properties are optional. If no gas limit is specified geth uses the block gas limit from the pending block as an upper bound. As a result the returned estimate might not be enough to executed the call/transaction when the amount of gas is higher than the pending block gas limit.

##### Returns

`QUANTITY` - the amount of gas used.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

---
