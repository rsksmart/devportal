---
sidebar_label: Integrations
sidebar_position: 200
title: RIF Relay Integration
description: Integrating RIF Relay in a dApp.
tags: [rif, envelope, relay, integration guide]
---


This guide goes over the exposed RIF Relay methods that dApps and wallets can consume to provide relaying as a service, with the purpose of allowing users to pay transaction fees with tokens in a particular system.

## Introduction

There are multiple ways to integrate RIF Relay into a system. These will be detailed down below.

Additionally, it's important to note that not _all_ of the RIF Relay components are needed for a successful integration, as explained in the following section.

## Requirements

### RIF Relay Smart Contracts

These need to be deployed and their addresses known. For steps on how to do this, please refer to the [Contract Deployment](/developers/integrate/rif-relay/deployment/) page of this guide.

### RIF Relay Server

The RIF Relay Server is the off-chain component in charge of receiving transactions and sending them to the on-chain components, chiefly the RIF Relay Hub. The RIF Relay Hub manages information about the RIF Relay Workers and RIF Relay Managers, but also communicates with the rest of the on-chain components in turn: the Smart Wallets, Factory and Verifier contracts.

The RIF Relay Manager owns RIF Relay Worker accounts with funds in native coin. To relay a transaction, a Worker signs it and sends it to the RIF Relay Hub paying for the gas consumed. In the case of a happy flow, transactions will ultimately be relayed through the RIF Relay Hub, using the EIP-712 library.

For more details on this, please refer to the [Architecture page](/developers/integrate/rif-relay/).

Users can interact with the RIF Relay Server directly or indirectly. For the latter, a user can communicate with a RIF Relay Server through a RIF Relay Client. A RIF Relay Client knows the addresses of different RIF Relay Servers and it can send on-chain requests to any one of them. The RIF Relay Client then sends the transaction to be sponsored to the RIF Relay Server via HTTP request.

In any case, you'll need to have the server installed and running. To achieve this please refer to the following guides:
1. [RIF Relay Installation Requirements](/developers/integrate/rif-relay/installation-requirements/)
2. [RIF Relay Deployment](/developers/integrate/rif-relay/deployment/)

### RIF Relay Client

The `RelayClient` class, from the RIF Relay Client library, assists in building a relay request, searching for an available server and sending the request via http protocol. 

To create a `RelayClient` we need to follow these steps:

1. Set the configuration.
2. Set (ethers) provider.
3. Create instance.

```typescript
import {
  RelayClient,
  setEnvelopingConfig,
  setProvider,
} from '@rsksmart/rif-relay-client';

  setEnvelopingConfig({
    chainId: <CHAIN_ID>, 
    preferredRelays: <SERVER_URL_ARRAY>,
    relayHubAddress: <RELAY_HUB_ADDRESS>,
    deployVerifierAddress: <DEPLOY_VERIFIER_ADDRESS>,
    relayVerifierAddress: <RELAY_VERIFIER_ADDRESS>,
    smartWalletFactoryAddress: <SMART_WALLET_FACTORY_ADDRESS>
  });

  setProvider(ethersProvider);
  
  const relayClient =  new RelayClient();
```

Where variables are:

  * **CHAIN_ID**: Identifies a network to interact with.
  * **SERVER_URL_ARRAY**: An array of relay server URL strings that the RelayClient can interact with.
  * **RELAY_HUB_ADDRESS**: The relay hub contract address.
  * **DEPLOY_VERIFIER_ADDRESS**: The deploy verifier contract address.
  * **RELAY_VERIFIER_ADDRESS**: The relay verifier contract address.
  * **SMART_WALLET_FACTORY_ADDRESS**: The smart wallet factory contract address.

After setting the configuration and the ethers provider, we can start creating instances from the `Relay Client`.

#### Account Manager

The `Account Manager` manager is a singleton component from the RIF Relay Client library that helps to sign relay transactions.  This component can sign the transactions with an internal account that was previously added or using a wallet provider like [metamask](https://metamask.io/). The `Account Manager` will look first for manually added accounts and, if none is found, will try to use the provider that was [previously setup](#rif-relay-client).

The `Account Manager` accepts [Ethers V5 Wallets](https://docs.ethers.org/v5/api/signer/#Wallet) as internal accounts.  

To interact with the `Account Manager` we need to follow the next steps:

1. Get an instance.
2. Add a new account.

```typescript
    import {
      AccountManager,
    } from '@rsksmart/rif-relay-client';

    const accountManager = AccountManager.getInstance();

    accountManager.addAccount(<INTERNAL_ACCOUNT_OBJECT>);
```

Where variables are:

  * **INTERNAL_ACCOUNT_OBJECT**: [Ethers V5 Wallet](https://docs.ethers.org/v5/api/signer/#Wallet) object.

### Relay Transaction

To relay transactions we need a smart wallet already deployed, the deployment process and definition of a smart wallet can be found [Smart Wallet](/developers/integrate/rif-relay/smart-wallets).

The steps that we must follow are:

1. Deploy the smart wallet.
2. Create the transaction that we would like to relay.
3. Relay the transaction.

```typescript
    const relayTransactionOpts: UserDefinedEnvelopingRequest = {
      request: {
        from: <EOA>,
        data: <DATA_TO_EXECUTE>,
        to: <DESTINATION_ADDRESS>,
        tokenContract: <TOKEN_ADDRESS>,
        tokenAmount: <AMOUNT_OF_TOKENS_IN_WEI>,
      },
      relayData: {
        callForwarder: <SMART_WALLET_ADDRESS>,
      },
    };

    const transaction: Transaction = await relayClient.relayTransaction(
      relayTransactionOpts
    );
```

Where variables are:

  * **EOA**: Externally Owned Account, the owner of the smart wallet.
  * **DATA_TO_EXECUTE**: The encoded function that we want to relay.
  * **DESTINATION_ADDRESS**: The address of the destination contract that we want to execute.
  * **TOKEN_ADDRESS**: The token contract address that we want to use to pay for the fee.
  * **AMOUNT_OF_TOKENS_IN_WEI**: The amount that we want to pay for the fee in wei.
  * **SMART_WALLET_ADDRESS**: The smart wallet address that is going to execute the relayed transaction.

### Relay Verifiers

To obtain the verifier addresses we need to execute the command:
  ```
  curl http://<SERVER_URL>/verifiers
  ```
  > The command needs to be executed in a different terminal since it needs the server to be running to perform the request.

```json
  {
    "trustedVerifiers": [
        "0x03f23ae1917722d5a27a2ea0bcc98725a2a2a49a",
        "0x73ec81da0c72dd112e06c09a6ec03b5544d26f05"
    ]
  }
```

### Build Request

To relay transactions, the Relay Server exposes an HTTP post handler to the following path `http://<SERVER_URL>/relay`. The Relay Client provides an abstraction to build and send each transaction to the available servers; although the client can simplify the interaction with the server, it's always possible to send HTTP requests to the server without using the Relay Client. 

Each transaction that will be sent, needs to have the following structure:

```json
    {
      "relayRequest": "<DEPLOY_REQUEST|RELAY_REQUEST>",
      "metadata": "<METADATA>"
    }
```

Below we will describe each field that is required in the request. 

#### Relay Request

  ```json
    {
      "request": {
        "relayHub": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
        "to": "0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8",
        "data": "0xa9059cbb000000000000000000000000c60b724c0865e294d64c94fed89c1e90bce0a7fe0000000000000000000000000000000000000000000000008ac7230489e80000",
        "from": "0x553f430066ea56bd4fa9190218af17bad23dcdb1",
        "value": "0",
        "nonce": "1",
        "tokenAmount": "2803630780191436371",
        "tokenGas": "31643",
        "tokenContract": "0x726ECC75d5D51356AA4d0a5B648790cC345985ED",
        "gas": "31515",
        "validUntilTime": 1676747217,
      },
      "relayData": {
        "gasPrice": "60000000",
        "callVerifier": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
        "callForwarder": "0x1C8bb3b6809b92F2e38e305FD6bDE9687Bb4ba54",
        "feesReceiver": "0x9C34f2225987b0725A4201F1C6EC1adB35562126"
      }
    }
  ```
Where each key from `request` is:

  * **relayHub**: The relay hub address that will be used to validate the caller from the transaction.
  * **to**: The address of the destination contract that we want to execute.
  * **data**: The encoded function that we want to relay.
  * **from**: Externally Owned Account, the owner of the smart wallet.
  * **value**: The native currency value that wants to be transferred from smart wallet during the execution.
  * **nonce**: Smart Wallet [nonce](https://github.com/rsksmart/rif-relay-contracts/blob/d1b1ee1c429786f967205f32ed015b3f9a1edaaf/contracts/smartwallet/SmartWallet.sol#L18) to avoid replay attacks.
  * **tokenAmount**: The amount of token that we want to pay for the fee in wei.
  * **tokenGas**: The gas limit for the token payment transaction.
  * **tokenContract**: The token contract address that we want to use to pay for the fee.
  * **gas**: The gas limit for the execution of the relaying transaction.
  * **validUntilTime**: Transaction expiration time in seconds.

Where each key from `relayData` is:

  * **gasPrice**: The gas price that will be used to relay the transaction.
  * **callVerifier**: The relay verifier address to validate the correctness of the transaction.
  * **callForwarder**: The smart wallet address that is going to execute the transaction. 
  * **feesReceiver**: The address of the worker or collector contract that is going to receive fees.

#### Deploy Request

  ```json
    {
      "request": {
        "relayHub": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
        "to": "0x0000000000000000000000000000000000000000",
        "data": "0x",
        "from": "0x553f430066EA56BD4fa9190218AF17bAD23dCdb1",
        "value": "0",
        "nonce": "0",
        "tokenAmount": "0",
        "tokenGas": "0",
        "tokenContract": "0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8",
        "recoverer": "0x0000000000000000000000000000000000000000",
        "index": "1",
        "validUntilTime": 1676747036,
      },
      "relayData": {
        "gasPrice": "60000000",
        "callVerifier": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05",
        "callForwarder": "0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad",
        "feesReceiver": "0x9C34f2225987b0725A4201F1C6EC1adB35562126"
      }
    }
  ```

Where each key from `request` is:

  * **relayHub**: The relay hub address that will be used to validate the caller from the transaction.
  * **to**: The address of the destination contract that we want to execute (`0x0000000000000000000000000000000000000000` for the Smart Wallet deployment).
  * **data**: The encoded function that we want to relay (`0x` for the Smart Wallet deployment).
  * **from**: Externally Owned Account, the owner of the smart wallet.
  * **value**: The native currency value that wants to be transferred from smart wallet during the execution.
  * **nonce**: The SmartWalletFactory keeps track of the [nonces](https://github.com/rsksmart/rif-relay-contracts/blob/d1b1ee1c429786f967205f32ed015b3f9a1edaaf/contracts/factory/SmartWalletFactory.sol#L95) used for each smart wallet owner, to avoid replay attacks. It can be retrieved with [`IWalletFactory.nonce(from)`](https://github.com/rsksmart/rif-relay-contracts/blob/d1b1ee1c429786f967205f32ed015b3f9a1edaaf/contracts/interfaces/IWalletFactory.sol#L8)
  * **tokenAmount**: The amount that we want to pay for the fee in wei.
  * **tokenGas**: The gas limit for the token payment transaction.
  * **tokenContract**: The token contract address that we want to use to pay for the fee.
  * **recoverer**: The recoverer address, to recover funds from the smart wallet. This feature is still pending to implement. 
  * **index**: The index from the smart wallet that we want to deploy.
  * **validUntilTime**: Transaction expiration time in seconds.

Where each key from `relayData` is:

  * **gasPrice**: The gas price that will be used to relay the transaction.
  * **callVerifier**: The deploy verifier address to validate the correctness of the transaction.
  * **callForwarder**: The smart wallet factory address that is going to perform the deployment. 
  * **feesReceiver**: The address from the worker or collector contract that is going to receive fees.

#### Metadata

```json
  {
    "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
    "signature": "0xa9f579cf964c03ac194f577b5fca5271ba13e2965c...",
    "relayMaxNonce": 4
  }
```

Where each key is:

* **relayHubAddress**: The relay hub that will be used by the server to relay the transaction.
* **signature**: The relay transaction signed by the owner. After signing the transaction, it cannot be changed, since there is a on-chain validation that is part of the EIP712.
* **relayMaxNonce**: Relay worker nonce plus an extra gap.

### Custom worker replenish function

Each relayed transaction is signed by a Relay Worker account. The worker accounts are controlled by the Relay Manager. When a relay worker signs and relays a transaction, the cost for that transaction is paid using the funds in that worker's account. If the transaction is not subsidized, then the worker is compensated with tokens.

Worker accounts must always have some minimum balance to pay gas for the transaction. These balances can be managed by implementing a replenishment strategy. The Relay Manager can use the strategy to top off a relay worker's account when the balance gets too low.

We provide a default implementation for a replenish strategy. RIF Relay solution integrators can implement their own replenish strategy.

To implement and use your own replenish strategy:

1. In the folder `src` from the RIF Relay Server project, open `ReplenishFunction.ts` with a text editor.
2. On the function `replenishStrategy` write your new replenish strategy.
3. Re build the project `npm run build`
4. Change the config JSON file to set `customReplenish` on true.