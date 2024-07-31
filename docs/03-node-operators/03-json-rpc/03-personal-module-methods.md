---
title: Personal Module Methods
sidebar_label: Personal Module
sidebar_position: 300
tags: [rsk, rskj, node, rpc, rpc api, node operators, rootstock]
description: "The JSON-RPC methods supported by Rootstock nodes."
---

## personal_lockAccount

Locks the given account.

### Parameters

1. `DATA`, 20 Bytes - address.

#### Example Parameters

```js
params: ['0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b']
```

##### Returns

`Boolean` - `true` if the account was successfully locked, otherwise `false`.


**Example**
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```


## personal_unlockAccount

Unlocks the given account for a given amount of time.

### Parameters

1. `DATA`, 20 Bytes - address.
2. `String` - The passphrase of the account.
3. `QUANTITY`  - (optional, default: 1800000 milliseconds) The duration for the account to remain unlocked.

#### Example Parameters

```js
params: [
  "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  "test passphrase!",
  "927C0" // 600000 milliseconds (10 min)
]
```

##### Returns

`Boolean` - `true` if the account was successfully unlocked, otherwise `false`.

##### Example
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test passphrase!",
  "927C0"],"id":73}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

***

## personal_sendTransaction

Sends a transaction over the management API.

### Parameters

1. `Object` - The transaction call object
  - `from`: `DATA`, 20 Bytes - (optional) The address the transaction is sent from.
  - `to`: `DATA`, 20 Bytes  - The address the transaction is directed to.
  - `gas`: `QUANTITY`  - (optional) Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.
  - `gasPrice`: `QUANTITY`  - (optional) Integer of the gasPrice used for each paid gas.
  - `value`: `QUANTITY`  - (optional) Integer of the value sent with this transaction.
  - `data`: `DATA`  - (optional) Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI in the Solidity documentation](https://solidity.readthedocs.io/en/latest/abi-spec.html).
2. `String` - The passphrase of the current account.

#### Example Parameters

```js
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0", // 30400
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}, "test passphrase!"]
```

##### Returns

`DATA` - The transaction hash.

** Example**
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{see above}],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```


## personal_importRawKey

Imports the given private key into the key store, encrypting it with the passphrase.

### Parameters

1. `DATA` - An unencrypted private key (hex string).
2. `String` - The passphrase of the current account.

#### Example Parameters

```js
params: [
  "0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e",
  "test passphrase!"
]
```

##### Returns

`DATA` - The address of the new account.

** Example**
```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e",
  "test passphrase!"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8f337bf484b2fc75e4b0436645dcc226ee2ac531"
}
```

## personal_dumpRawKey

Returns an hexadecimal representation of the private key of the given address.

### Parameters

1. `DATA`, 20 Bytes - The address of the account, said account must be unlocked.

#### Example Parameters

```js
params: ["0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e"]
```

##### Returns

`DATA` - A hexadecimal representation of the account's key.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_dumpRawKey","params":["0xcd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "777ebfc1e2b6930b09647e7a2273b3e53f759c751c0056695af466783db3642f"
}
```

## personal_newAccount

Creates a new account.

### Parameters

1. `String` - The passphrase to encrypt this account with.

#### Example Parameters

```js
params: ["test passphrase!"]
```

##### Returns

`DATA` - The address of the newly created account.

##### Example

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["test passphrase!"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8f337bf484b2fc75e4b0436645dcc226ee2ac531"
}
```

## personal_newAccountWithSeed

Creates a new account using a seed phrase.

### Parameters

1. `String` - The seed phrase to encrypt this account with.

#### Example Parameters

```js
params: ["seed"]
```

##### Returns

`DATA` - The address of the newly created account.

**Example**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccountWithSeed","params":["seed"],"id":1}'

// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8f337bf484b2fc75e4b0436645dcc226ee2ac531"
}
```
