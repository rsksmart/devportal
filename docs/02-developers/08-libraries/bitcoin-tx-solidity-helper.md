---
title: How to Handle Bitcoin Transactions in Solidity
tags: [rif, rootstock, solidity, bitcoin, smart contracts, libraries, bitcoin transactions]
sidebar_label: Bitcoin Transaction Solidity Helper Library
sidebar_position: 300
description: "This guide demonstrates to a developer how to handle Bitcoin transactions in a Solidity Smart contract, we will also learn how to parse transactions, hash transactions and validate scripts for bitcoin transactions"
---

Bitcoin, a decentralized digital currency, serves as both a store of value and a means of transferring wealth. Its security is rooted in the blockchain, a distributed ledger maintained by a network of miners. These miners expend significant computational power and energy to create new blocks, which are added to the blockchain every 10 minutes. The more hashing power contributed by miners, the more secure the network becomes. [Learn more about Bitcoin](https://developer.bitcoin.org/index.html).

Rootstock, the pioneering open-source smart contract platform built on Bitcoin, aims to enhance the Bitcoin ecosystem by introducing smart contract functionality, near-instant payments, and improved scalability. Its comprehensive technology stack, encompassing Rootstock smart contracts and the Rootstock Infrastructure Framework, is designed to foster a more equitable and inclusive financial system. Read more about the [Rootstock Stack](/concepts/fundamentals/stack/).

The [Bitcoin Solidity helper library](https://github.com/rsksmart/btc-transaction-solidity-helper) facilitates seamless interaction between Bitcoin transactions and Solidity smart contracts on the Rootstock platform. In this guide, we will learn how to handle Bitcoin transactions in a Solidity Smart contract, we will also learn how to parse transactions, hash transactions and validate scripts for bitcoin transactions. You can find the public repository for the [bitcoin transaction solidity helper library](https://github.com/rsksmart/btc-transaction-solidity-helper).

## Features of the Library

The features of the Bitcoin Solidity Helper library include:
1. Bitcoin transaction output parsing: This accurately extracts and organizes transaction outputs from raw Bitcoin transactions. It is able to receive a raw tx and return an array of structures with the tx outputs.
2. Bitcoin transaction hashing: This calculates the cryptographic hash of a Bitcoin transaction, ensuring its authenticity and integrity. It receives a raw tx and returns its hash.
3. Bitcoin transaction output script validation: This verifies the validity and type of output scripts within a Bitcoin transaction, allowing for specific data extraction. It receives a raw output script, validates that it is from a specific type and returns a result. E.g. receive a raw null-data script and return the embedded data in it
4. Bitcoin address generation: is able to generate Bitcoin the address from a specific script and also to validate if a given address was generated from a script or not.
Bitcoin address validation: This checks if a Bitcoin address conforms to a particular type or format. It validates if a Bitcoin address is of a given type or not.

## Prerequisites
* Knowledge of Solidity and how to write smart contracts.
* [Bitcoin Solidity Helper Package](https://github.com/rsksmart/btc-transaction-solidity-helper/pkgs/npm/btc-transaction-solidity-helper)

## Setup
To setup the Solidity helper library in your project, run the following npm command:

```bash
   npm install @rsksmart/btc-transaction-solidity-helper
```

## Usage

### Import the library:

```bash
import "@rsksmart/btc-transaction-solidity-helper/contracts/BtcUtils.sol";
```

### Using the library:

```bash
BtcUtils.TxRawOutput[] memory outputs = BtcUtils.getOutputs(btcTx);
bytes memory scriptData = BtcUtils.parseNullDataScript(outputs[0].pkScript);
```

_This fragment parses a raw Bitcoin transaction to extract its outputs and then parses the first output to get the data of the null data script._

## Parsing a Bitcoin Transaction Output
All the bitcoin transactions have a specific format when they are serialized. By having knowledge of this format, we can process a raw transaction in order to extract the information about its outputs.

A raw transaction has the following top-level format:

| Bytes | Name | Data Type | Description |
| --- | --- | --- | --- |
| 4 | Version | `int32_t` | [Transaction version number](https://developer.bitcoin.org/terms.html#term-transaction-version-number) (note, this is signed); currently version 1 or 2. Programs creating transactions using newer consensus rules may use higher version numbers. Version 2 means that [BIP68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki#specification) applies. |
| Varies | tx_in count | compactSize uint | Number of inputs in this transaction. |
| Varies | tx_in | txIn | Transaction inputs. See description of txIn below. |
| Varies | tx_out count | compactSize uint | Number of outputs in this transaction. |
| Varies | tx_out | txOut | Transaction outputs. See description of txOut below. |
| 4 | lock_time | `uint32_t` | A time ([Unix epoch time](https://en.wikipedia.org/wiki/Unix_time)) or block number. See the [locktime parsing rules](https://developer.bitcoin.org/devguide/transactions.html#locktime_parsing_rules). |


> See the [Reference Implementation](https://developer.bitcoin.org/reference/transactions.html#raw-transaction-format)

The approach that the library takes is to calculate, based on the length of each section, where does the output part start. After this, it starts parsing each output separately and adding its script and value into a solidity data structure.

| Bytes | Name | Data Type | Description |
| --- | --- | --- | --- |
| 8 | Value | `int64_t` | Number of satoshis to spend. May be zero; the sum of all outputs may not exceed the sum of satoshis previously spent to the outpoints provided in the input section. (Exception: coinbase transactions spend the block subsidy and collect transaction fees.) |
| 1+ | pk_script bytes | compactSize uint | Number of bytes in the pubkey script. Maximum is 10,000 bytes. |
| 1+ | pk_script | `char[]` | Defines the conditions which must be satisfied to spend this output. |

> See the [Reference Implementation](https://developer.bitcoin.org/reference/transactions.html#txout-a-transaction-output)

```solidity
struct TxRawOutput {
        uint64 value;
        bytes pkScript;
        uint256 scriptSize;
        uint256 totalSize;
    }
```

After finishing the processing of each output, the library returns an ordered output array, so the user can take advantage of this information in its solidity contract.  

In order to show the benefits of this library, we’ll use the example of the [Flyover Protocol](/developers/integrate/flyover/). In this protocol, there is a smart contract that one party uses to claim a refund, in order to claim this refund, they need to prove that there was a payment with a specific amount done to a specific address in the Bitcoin Network, in order to do this, the smart contract receives the Bitcoin raw transaction. Since making this validation is not a trivial process, as it requires to parse the whole transaction, here is where we can see the utility of the library.

The usage of the output parsing functionality is the following:
```solidity
BtcUtils.TxRawOutput[] memory outputs = BtcUtils.getOutputs(btcTx);
```

Then the user is able to perform any validation:
```solidity
require(expectedValue <= outputs[0].value, "incorrect amount");
```

:::info[Important]
The value field of the output structure is in satoshis.
:::

## Hashing Transactions
The hash algorithm used in the Bitcoin Network is just the `SHA256(SHA256())` of the serialized transaction. The library exposes one function that will apply this hash algorithm to any byte array passed to it, making it easy to calculate the transaction id of any raw transaction present in the contract.

This function is specifically useful to interact with the [rootstock native bridge](/concepts/powpeg/), as many of its functions have a transaction id as parameter. For example, by using the transaction hash function, it is easy to know how many confirmations a Bitcoin block has inside a smart contract function.

### Example code with explanation
Based on the example stated in the previous section, after validating that a specific transaction has an output paying a certain amount to an address. We need to know if that transaction has enough confirmations:

Here's an example:

```solidity
BtcUtils.TxRawOutput[] memory outputs = BtcUtils.getOutputs(btcTx);
require(expectedValue <= outputs[0].value, "incorrect amount");
bytes32 txId = BtcUtils.hashBtcTx(btcTx)
// assuming btcBlockHeaderHash,partialMerkleTree, merkleBranchHashes
// were provided in the function parameters
uint confirmations = bridge.getBtcTransactionConfirmations(
              txId,
               btcBlockHeaderHash,
               partialMerkleTree,
               merkleBranchHashes
           )
require(confirmations > expectedConfirmations, "not enough confirmations");
```

Read more about the [bridge functionality](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/co/rsk/peg/BridgeSupport.java)

## Script Validation for Bitcoin Transaction Output
In the Bitcoin network, when a user wants to send funds to another, the user creates a transaction and adds an output with the value that it wants to send. The other user doesn’t “receive” this amount directly, instead, we call receiving to the ability of providing the proper input to the output script so it returns `true`:

<Quote caption="Bitcoin Script Documentation">
  A transaction is valid if nothing in the combined script triggers failure and the top stack item is True (non-zero) when the script exits. Read more info in [Bitcoin Script](https://en.bitcoin.it/wiki/Script)
</Quote>

> By having knowledge of the structure of the outputs that each type of address has, we can process and validate any arbitrary output extracted with the functions explained in the previous sections. In the same way, we can parse those outputs to obtain the specific value that later is encoded (in base58check, bech32 or bech32m) and presented as the “destination address”. 

The output that the library supports and is able to parse to an address are:
* P2PKH (Pay to public key hash)
* P2SH (Pay to script hash)
* P2WPKH (Pay to witness public key hash)
* P2WSH (Pay to witness script hash)
* P2TR (Pay to taproot)

**Some use cases for script validation:**

As seen in the previous example, we validated inside our smart contract that a Bitcoin transaction has the correct amount and enough confirmations, now we need to validate that it was performed on the correct address. To do this, the library has the capability of parsing an arbitrary output and converting it into an address.

Here's an example:

```solidity
bytes memory btcTxDestination = BtcUtils.outputScriptToAddress(
           outputs[0].pkScript,
           mainnetFlag
       );
       require(keccak256(expectedAddress) == keccak256(btcTxDestination), "incorrect address");
```

## Conclusion
Congratulations, we have successfully learnt how to use the Solidity Helper library to parse, hash, and validate scripts within Bitcoin transactions. By using this library, developers can gain valuable insights into Bitcoin transaction data and build more sophisticated smart contract dApps on Rootstock.

**Some future enhancements to the library includes:**
* Transaction Input Parsing: The ability to extract and analyze transaction input data to receive a raw tx and return an array of structs with the tx inputs.
* Transaction Creation: Utilities to facilitate the creation of raw Bitcoin transactions within smart contracts.
