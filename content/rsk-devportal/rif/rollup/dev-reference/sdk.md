---
menu_order: 300
menu_title: SDKs and APIs
layout: rsk
title: Using the API and SDKs
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology. See the dApps ported to Rootstock.
tags: rif, aggregation, zksync, rollup, sdks, apis, rif-rollup
render_features: 'tables-with-borders'
---

This section includes code snippets and API reference on how to use the RIF Rollup SDKs and APIs. The SDKs are libraries that provide a reliable, secure, and seamless connection from your dApp to RIF Rollup. The SDK is written in the following languages and available on the following platforms:

* [Javascript SDK](#javascript-js-sdk)
* Rust SDK (Coming Soon)

## Javascript (JS) SDK

This section contains documentation for the JS SDK for RIF Rollup. In this section, we will do the following; 
* [Prerequisites and Installation](#prerequisites)
* [Initialize and configure the SDK](#adding-dependencies)
* [Add Imports](#adding-imports)
* [Connect to RIF Rollup Network](#connecting-to-rif-rollup-network)
* [Create a wallet](#creating-a-wallet)
* [Deposit assets into Rootstock from RIF Rollup](#depositing-assets-from-rootstock-into-rif-rollup)
* [Unlocking RIF Rollup Account](#unlocking-rif-rollup-account)
* [Checking RIF Rollup Account Balance](#checking-rif-rollup-account-balance)
* [Making a transfer in RIF Rollup](#making-a-transfer-in-rif-rollup)
* [Withdrawing funds back to Rootstock](#withdrawing-funds-back-to-rootstock)
* [Advanced Features](#advanced-features)

## Prerequisites 

Here is a list of items necessary for setting up and running the Javascript SDK.

* Ethersjs Library (v5.0).
  * See how to setup Ethersjs on the [official site](https://docs.ethers.org/v5/getting-started/).
* Node (v18.0 and above).
  * See [how to install nodejs using NVM](https://nodejs.org/en/download/package-manager#nvm).
* RBTC.
    * See how to get test tokens using the [Rootstock Faucet](https://faucet.rsk.co/) or see the guide on how to [Get Crypto on Rootstock](/guides/get-crypto-on-rsk/).
* Get an API key to interact with the RPC API.
    * See the guide on [how to get started with RPC API](/tools/rpc-api/).

## Dependencies
* zkSync

## Dev Dependencies
* Typescript

## Getting Started

### Adding dependencies

To add dependencies for the RIF Rollup project:

```yarn=
yarn add @rsksmart/rif-rollup-js-sdk

yarn add ethers@^5
# ethers is a peer dependency of rif-rollup-js-sdk
```

### Adding Imports

To add import in a RIF Rollup Project:

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";
```

> Note that it is not required to import all of the library. For instance, if you only need the Wallet class, you can do:

```js
import { Wallet } from "@rsksmart/rif-rollup-js-sdk";
```

In the rest of this guide, we will assume that the library was imported as shown in the first step above to differentiate the content imported from the RIF Rollup and ethers libraries.

### Connecting to RIF Rollup network

To interact with the RIF Rollup network, users need to know the endpoint of the operator node.

```js
const syncProvider = await rifRollup.getDefaultProvider(network);
```

Where;

```
network = 'localhost' | 'testnet' | 'mainnet';
```

Most operations require some read-only access to the Rootstock network. We use the [ethers library](https://docs.ethers.org/v5/) to interact with Rootstock.

```js
const ethersProvider = ethers.getDefaultProvider(network);
```

> Note that the command may not always work (as Ethers do not always support Rootstock connections), use the workaround as shown below;

```js
const RSK_TESTNET_NODE_URL = "https://rpc.testnet.rootstock.io/";
const ethersProvider = new ethers.providers.JsonRpcProvider(RSK_TESTNET_NODE_URL);
```

> The value of `RSK_TESTNET_NODE_URL` will obviously vary depending on the network (regtest, testnet, mainnet).

### Creating a Wallet

To control your account in RIF Rollup, use the `rifRollup.Wallet` object. It can sign transactions with keys stored in `rifRollup.Signer` and send transactions to the RIF Rollup network using `rifRollup.Provider`.

`rifRollup.Wallet` is a wrapper around two objects:
* `ethers.Signer` to sign Rootstock transactions.
* `rifRollup.Signer` to sign native RIF Rollup transactions.

The private key used by `rifRollup.Signer` is implicitly derived from the Rootstock signature of a special message.

```js
// Create a rootstock wallet using ethers.js
const rskWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
// Derive rifRollup.Signer from rootstock wallet.
const syncWallet = await rifRollup.Wallet.fromEthSigner(rskWallet, syncProvider);
```

The above code snippet creates a new `ethers.Wallet` instance from the given mnemonic phrase and connects it to the provider. This allows the wallet to interact with the Ethereum and Rootstock network, and send and receive transactions. 

`.connect(ethersProvider)` connects the wallet to the given Ethereum provider. An Ethereum provider is a service that provides access to the Ethereum and  Rootstock network.

**Troubleshooting Tip**:
> - Note: `.connect(ethersProvider)` may not work for the latest version of Ethers (V6) but works on Ethers (V5).

### Depositing assets from Rootstock into RIF Rollup

We are going to deposit `0.001` RBTC to our RIF Rollup account. See the [prerequisites section](#prerequisites) for the different ways you can get RBTC.


```js
const deposit = await syncWallet.depositToSyncFromRootstock({
  depositTo: syncWallet.address(),
  token: 'RBTC',
  amount: ethers.utils.parseEther('0.001')
});
```

> "RBTC" is the native cryptocurrency for the Rootstock blockchain. To transfer supported ERC20 tokens, use an ERC20 address or ERC20 symbol instead of "RBTC".

After the tx is submitted to the Rootstock node, we can track its status using the returned object:

```js
// Await confirmation from the RIF Rollup operator
// Completes when a promise is issued to process the tx
const depositReceipt = await deposit.awaitReceipt();

// Await verification
// Completes when the tx reaches finality on Rootstock
const depositReceipt = await deposit.awaitVerifyReceipt();
```

### Unlocking RIF Rollup account

To control assets in the RIF Rollup network, an account must register a separate public key once.

```js
if (!(await syncWallet.isSigningKeySet())) {
  if ((await syncWallet.getAccountId()) == undefined) {
    throw new Error('Unknown account');
  }

  // As any other kind of transaction, `ChangePubKey` transaction requires fee.
  // User doesn't have (but can) to specify the fee amount. If omitted, library will query RIF Rollup node for
  // the lowest possible amount.
  const changePubkey = await syncWallet.setSigningKey({
    feeToken: 'RBTC',
    ethAuthType: 'ECDSA'
  });

  // Wait until the tx is committed
  await changePubkey.awaitReceipt();
}
```

### Checking RIF Rollup account balance

```javascript=
// Committed state is not final yet
const committedRBTCBalance = await syncWallet.getBalance('RBTC');

// Verified state is final
const verifiedRBTCBalance = await syncWallet.getBalance('RBTC', 'verified');
```

To list all tokens of this account at once, use `getAccountState`:

```javascript=
const state = await syncWallet.getAccountState();

const committedBalances = state.committed.balances;
const committedRBTCBalance = committedBalances['RBTC'];

const verifiedBalances = state.verified.balances;
const verifiedRBTCBalance = verifiedBalances['RBTC'];
```

### Making a transfer in RIF Rollup

Now, let's create a second wallet and transfer some funds into it. 

Note that we can send assets to a new Rootstock account, without preliminary registration!

```js
const rbtcWallet2 = ethers.Wallet.fromMnemonic(MNEMONIC2).connect(ethersProvider);
const syncWallet2 = await rifRollup.SyncWallet.fromEthSigner(rbtcWallet2, syncProvider);
```

We are going to transfer `0.999` RBTC to another account and pay `0.001` RBTC as a fee to the operator (RIF Rollup account balance of the sender is going to be decreased by `0.999 + 0.001` RBTC). The use of `closestPackableTransactionAmount()` and `closestPackableTransactionFee()` is necessary because the precision of transfer in RIF Rollup is limited (see docs below).

```js
const amount = rifRollup.utils.closestPackableTransactionAmount(ethers.utils.parseEther('0.999'));
const fee = rifRollup.utils.closestPackableTransactionFee(ethers.utils.parseEther('0.001'));

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: 'RBTC',
  amount,
  fee
});
```

> Note that setting the fee manually is not required. If fee field is omitted, SDK will choose the lowest possible fee acceptable by server:

```js
const amount = rifRollup.utils.closestPackableTransactionAmount(ethers.utils.parseEther('0.999'));

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: 'RBTC',
  amount
});
```

To track the status of this transaction:

```js
const transferReceipt = await transfer.awaitReceipt();
```

### Withdrawing funds back to Rootstock

```js
const withdraw = await syncWallet2.withdrawFromSyncToRootstock({
  ethAddress: rbtcWallet2.address,
  token: 'RBTC',
  amount: ethers.utils.parseEther('0.998')
});
```

Assets will be withdrawn to the rollup contract after the zero-knowledge proof of RIF Rollup block with this operation is generated and verified by the mainnet contract.

We can wait until ZKP verification is complete:

```js
await withdraw.awaitVerifyReceipt();
```

Up to this point the funds are on the Rollup contract on L1. A second step is required to move the funds from that contract to the target wallet.

> Note: You can check the pending balance (funds on the contract that are pending to withdraw to the target wallet).

```js
const pendingBalance = await rifRollup.utils.getPendingBalance(
        ethersProvider,
        syncProvider,
        rbtcWallet2.address,
        'RBTC'
);
```

To execute the second step withdrawal;

```js
const withdrawResponse = await rollupWallet.withdrawPendingBalance(
        rbtcWallet2.address,
        'RBTC',
        pendingBalance
    );

await withdrawResponse.wait();
```

## Advanced Features

### Providers

JSON-RPC protocol is used to communicate with RIF Rollup network nodes. **Provider** is used to abstract details of the communication and provides a useful API for interaction with the RIF Rollup network.

We support only HTTP protocols for JSON-RPC communications. HTTP transport is preferred due to its stability. `HTTPTransport` classes are used to implement details of communication, but usually, you don't need to deal with these objects directly.

#### RIF Rollup provider

##### Get default provider for network

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);
```

Where;

```
network = 'localhost' | 'testnet' | 'mainnet';
```

Used to connect to the common endpoint for the given network over HTTP transport.

##### Create HTTP Provider
> Creating a `provider` over HTTP transport.

```js
import * as rifRollup from '@rsksmart/rif-rollup-js-sdk';

const syncHTTPProvider = await rifRollup.Provider.getDefaultProvider ('https://jsonrpc.server.testnet.rollup.rif.technology ');
```

### Submit transaction

> Signature

```js
async submitTx(tx: any, signature?: TxEthSignature, fastProcessing?: boolean): Promise<string>;
```

**Inputs and Outputs:**

| Name | Description |
| -------- | -------- |
| Transaction (tx)    | Signed RIF Rollup transaction (see types, for detailed description)    |
| Signature    | Signature of the readable representation of the transaction signed by rootstock wallet |
|fastProcessing |For withdrawals only: request faster processing of transaction|
|returns |0x-prefixed hex-encoded hash of the transaction|

Example:

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);
const signedTransferTx = {
  accountId: 13, // id of the sender account in the RIF Rollup
  type: 'Transfer',
  from: '0x..address1',
  to: '0x..address2',
  token: 0, // id of the RBTC token
  amount: '1000000000000000000', // 1 RBTC in Wei
  fee: '10000000000000000', // 0.01 RBTC in Wei
  nonce: 0,
  signature: {
    pubKey: 'dead..', // hex encoded packed public key of signer (32 bytes)
    signature: 'beef..' // hex encoded signature of the tx (64 bytes)
  }
};

// const readableTxInfo =
//     `Transfer 1.0 RBTC\n` +
//     `To: 0x..address2\n` +
//     `Nonce: 0\n` +
//     `Fee: 0.01 RBTC\n` +
//     `Account Id: 13`;
const signature = '0xdddaaa...1c'; // Rootstock ECDSA signature of the readableTxInfo

const transactionHash = await syncHttpProvider.submitTx(signedTransferTx, signature);
// 0x..hash (32 bytes)
```

### Submit Transaction Batch

> Signature

```js
async submitTxsBatch(
  transactions: { tx: any; signature?: TxEthSignature }[],
  signatures?: TxEthSignature | TxEthSignature[]
): Promise<string[]>;
```

**Inputs and Outputs:**

| Name | Description| 
| -------- | -------- | 
| Transaction| An array of transactions / signature pairs.| 
| Signatures (Optional) | Either a single or a list of signatures that sign the entire batch| 
| fastProcessing | For withdrawals only: request faster processing of transaction |
| returns | An array of 0x-prefix hex-encoded hashes for each transaction in the batch |

For details on individual transactions, see [Submit transaction]().

> Example

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);
const firstTransferTx = {
  accountId: 13, // id of the sender account in the RIF Rollup
  type: 'Transfer',
  from: '0x..address1',
  to: '0x..address2',
  token: 0, // id of the RBTC token
  amount: '1000000000000000000', // 1 RBTC in Wei
  fee: '10000000000000000', // 0.01 RBTC in Wei
  nonce: 0,
  signature: {
    pubKey: 'dead..', // hex encoded packed public key of signer (32 bytes)
    signature: 'beef..' // hex encoded signature of the tx (64 bytes)
  }
};
const firstTransferEthSignature = '0xdddaaa...1c'; // Rootstock ECDSA signature for the first message

const secondTransferTx = {
  type: 'Transfer'
  // ...other fields omitted
};
const secondTransferEthSignature = '0xaaaddd...ff'; // Rootstock ECDSA signature for the second message

const batch = [
  { tx: firstTransferTx, signature: firstTransferEthSignature },
  { tx: secondTransferTx, signature: secondTransferEthSignature }
];

const transactionHashes = await syncHttpProvider.submitTxsBatch(batch);
// List of transaction hashes
```

### Get Contract Addresses

> Signature

```js
async getContractAddress(): Promise<ContractAddress>;
```

**Inputs and Outputs:**

|Name | Description |
|------|-------------|
|returns| Addresses of the RIF Rollup network smart contracts (see types, for detailed description)|


Example:

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);

const contractAddresses = await syncHttpProvider.getContractAddress();
```

**Returns:**

```shell
{
  "mainContract": "0xab..cd",
  "govContract": "0xef..12"
}
```

### Get Tokens

> Signature

```js
async getTokens(): Promise<Tokens>;
```

**Input and Output:**

|Name | Description |
|------|-------------|
|returns| All supported tokens (see types, for detailed description)|

Example:

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);

const contractAddresses = await syncHttpProvider.getTokens();
```

**Returns:**

```shell
{
  "ERC20-1": {
    "address": "0xbeeb9f55d523918f9cd2979a454610f673c2885e",
    "id": 1,
    "symbol": null
  },
  "RBTC": {
    "address": "0000000000000000000000000000000000000000",
    "id": 0,
    "symbol": "RBTC"
  }
}
```

### Get Account State by Address

> Signature

```js
async getState(address: Address): Promise<AccountState>;
```

**Input and Outputs:**

|Name | Description |
|------|-------------|
|address| 0x-prefix hex-encoded address of the RIF Rollup account.|
|returns| Detailed state of the RIF Rollup account, including balances, nonce. (see types, for detailed description)|

Returns:

```shell
{
  "address": "0x2d5bf7a3ab29f0ff424d738a83f9b0588bc9241e",
  "id": 1, // optional
  "committed": {
    "balances": {
      "RBTC": "1000000000000000000" // 1 RBTC in Wei
    },
    "nonce": 1
  },
  "depositing": {
    "balances": {
      "FAU": {
        "amount": "9000000000000000",
        "expectedAcceptBlock": 438929
      }
    }
  },
  "verified": {
    "balances": {
      "RBTC": "1000000000000000000", // 1 RBTC in Wei
      // ERC20 token
      "FAU": "1000000000000000000"
    },
    "nonce": 0
  }
}
```


For details on the `depositing` section, see the description of `AccountState` type on the `types` page.

###### Get amount of confirmations required for priority operations

> Signature

```js
async getConfirmationsForEthOpAmount(): Promise<number>;
```


|Name | Description |
|------|-------------|
|returns| Amount of confirmations required for priority operations to be processed by the RIF Rollup network|

Example:

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);
const requiredConfirmationsAmount = await syncHttpProvider.getConfirmationsForEthOpAmount();
```

### Get Transaction Receipt

> Signature

```js
async getTxReceipt(txHash: string): Promise<TransactionReceipt>;
```

**Input and Outputs:**

|Name | Description |
|------|-------------|
|txHash| `sync-tx`:-prefixed hex-encoded hash of the RIF Rollup transaction.|
|returns| Receipt of this transaction (see types, for detailed description)|

Example:

> Returns

```shell
// Not executed yet
{
    "executed": false
}

// Success
{
    "executed": true,
    "success": true,
    "block": {
      "blockNumber": 658,
      "committed": true,
      "verified": true
    }
}

// Failure
{
    "executed": true,
    "success": true,
    "failReason": "Nonce mismatch",
    "block": {
      "blockNumber": 658,
      "committed": true,
      "verified": true
    }
}
```

#### Wait for Transaction Receipt

Similar to [Get transaction receipt](#get-transaction-receipt) but this method will return when a given transaction is committed or verified in the RIF Rollup network.

> Signature

```js
async notifyTransaction(
    hash: string,
    action: "COMMIT" | "VERIFY"
): Promise<TransactionReceipt> ;
```

**Inputs and Outputs:**

|Name | Description |
|------|-------------|
|txHash| sync-tx:-prefixed hex-encoded hash of the RIF Rollup transaction.|
|action| "COMMIT" or "VERIFY"|
|returns| Receipt of this transaction (see types, for detailed description)|

Example:

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);

const receipt = await syncHttpProvider.notifyTransaction(
  'sync-tx:1111111111111111111111111111111111111111111111111111111111111111',
  'COMMIT'
);
```

### Get Operation Receipt

> Signature

```js
async getPriorityOpStatus(
    serialId: number
): Promise<PriorityOperationReceipt>;
```

**Inputs and Outputs:**

|Name | Description |
|------|-------------|
|serialId| Numerical ID of the priority operation|
|returns| Receipt of this priority operation|

> Serial ID of the priority operation can be found in logs of the rootstock transaction that created this operation (e.g. deposit).

**Returns**

```shell
{
  "executed": true,
  "block": {
    "blockNumber": 658,
    "committed": true,
    "verified": true
  }
}
```

> Serial ID of the priority operation can be found in logs of the rootstock transaction that created this operation (e.g. deposit).

> Returns

```shell
{
  "executed": true,
  "block": {
    "blockNumber": 658,
    "committed": true,
    "verified": true
  }
}
```


#### Wait for priority operation receipt

Similar to [Get priority operation receipt](#get-operation-receipt) but this method will return when given priority operation is committed or verified in the RIF Rollup network.

> Signature

```js
async notifyPriorityOp(
    serialId: number,
    action: "COMMIT" | "VERIFY"
): Promise<PriorityOperationReceipt>;
```

**Input and Outputs:**

|Name | Description |
|------|-------------|
|serialid| Numerical id of the priority operation.|
|action| "COMMIT" or "VERIFY"|
|returns| Receipt of this priority operation.|

> Serial ID of the priority operation can be found in logs of the rootstock transaction that created this operation (e.g. deposit).

**Example:**

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);

const receipt = await syncHttpProvider.notifyPriorityOp(
  178, // priority op id
  'COMMIT'
);
```

### Current token set

Provider stores a list of the available tokens with methods for working with them. See [working with tokens](https://github.com/rsksmart/rif-rollup-js-sdk-docs/tree/develop/utils#working-with-tokens).

> Signature

```shell
public tokenSet: TokenSet;
```

### Get transaction fee from the server

Performs a query to the server, obtaining an acceptable transaction fee for transactions. The returned value contains all the price components used for the fee calculation, and the fee itself (`totalFee` field).

Note: If a fee is requested for a `ForcedExit` operation, corresponding `txType` will be `Withdraw`.

> Signature

```js
async getTransactionFee(
    txType: "Withdraw" | "Transfer" | "FastWithdraw" | ChangePubKeyFee | LegacyChangePubKeyFee,
    address: Address,
    tokenLike: TokenLike
): Promise<Fee>;
```

Interface of `IncomingTxFeeType` type is described in the [fees](../#fees) section.

**Input and Outputs:**

|Name | Description |
|------|-------------|
|txType| Type of the transaction.|
|address| Address of the transaction recipients' wallet.|
|tokenLike| Token used in the transaction.|
|returns| Object containing the [packable fee](https://github.com/rsksmart/rif-rollup-js-sdk-docs/tree/develop/utils#check-if-fee-is-packable) amount and the price components used for calculation.|

#### Get transaction batch fee from the server

Performs a query to the server, obtaining an acceptable fee for a batch transaction (multi-transfer).

The fee provided is enough to perform all of the transactions of the batch. Thus you usually would need to specify the fee for only one transaction and set it to zero for the other ones.

> Note: For details about the type and amount of token for [batch transaction](https://github.com/rsksmart/rif-rollup-js-sdk-docs/tree/develop/providers#submit-transactions-batch) fees, see transaction batch docs.

> Signature

```js
async getTransactionsBatchFee(
    txTypes: IncomingTxFeeType[],
    addresses: Address[],
    tokenLike: TokenLike
): Promise<BigNumber>;
```

**Inputs and Outputs**

|Name | Description |
|------|-------------|
|txTypes| Array of types of transactions in the batch.|
|addresses| Addresses of the corresponding recipients' wallets.|
|tokenLike| Token used to pay fees for the batch.|
|returns| Fee amount sufficient for the batch.|

#### Get token price

Performs a query to the server, obtaining a token price in USD. Data is fetched by server using third-party API (e.g. coinmarketcap).

> Signature

```shell
async getTokenPrice(
    tokenLike: TokenLike
): Promise<number> ;
```

**Inputs and Outputs**

|Name | Description |
|------|-------------|
|tokenLike| Type of token.|
|returns| Currently observed price of the token (USD per token).|

**Example:**

```shell
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";

const syncHttpProvider = await rifRollup.getDefaultProvider(network);
const rbtcPrice = await syncHttpProvider.getTokenPrice('RBTC');

console.log(`Current Rootstock price is ${rbtcPrice} USD`);
```


#### RBTC Proxy

`RBTCProxy` class is used to simplify some communication with the Rootstock network.
Create RBTC Proxy

> Signature

```shell
constructor(
    private ethersProvider: ethers.providers.Provider,
    private contractAddress: ContractAddress
);
```

**Input and Outputs:**

|Name | Description |
|------|-------------|
|ethersProvider| ethers.js provider connected to Rootstock node|
|contractAddress| Addresses of the RIF Rollup network contracts|

**Example:**

```js
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";
import { ethers } from "ethers";

const ethersProvider = ethers.getDefaultProvider(network);
const syncHttpProvider = await rifRollup.getDefaultProvider(network);

const rbtcProxy = new rifRollup.RBTCProxy(ethersProvider, syncHttpProvider.contractAddress);
```

#### Resolve token id

To sign RIF Rollup transaction users have to know the unique numerical id of the given token. It can be retrieved from the RIF Rollup network governance contract.

> Signature

```shell
async resolveTokenId(token: TokenAddress): Promise<number>;
```

**Input and Outputs:**

|Name | Description |
|------|-------------|
|token| Rootstock token address (ERC20 contract address)|
|returns| Numerical identifier of the given token inside the RIF Rollup network.|

**Example:**

```shell
import * as rifRollup from "@rsksmart/rif-rollup-js-sdk";
import { ethers } from "ethers";

const ethersProvider = ethers.getDefaultProvider(network);
const syncProvider = await rifRollup.getDefaultProvider(network);
const rbtcProxy = new rifRollup.RBTCProxy(ethersProvider, syncProvider.contractAddress);

const rbtcId = await rbtcProxy.resolveTokenId('0x0000000000000000000000000000000000000000'); // RBTC token address is 0x0..0

// ERC20 token if it is supported, >= 1
const erc20Id = await rbtcProxy.resolveTokenId('0xFab46E002BbF0b4509813474841E0716E6730136');
```

> See [configuration examples](#connecting-to-rif-rollup-network) for how to deploy to different Rootstock networks.
