---
sidebar_label: Smart Wallets
sidebar_position: 800
title: RIF Relay Smart Wallets
description: RIF Relay Smart Wallets.
tags: [rif, envelope, relay, user, guide]
---


This guide is intended to explain more about the interaction and deployment of the Smart Wallets. We will be using additional testing contracts that were included in the project, like the `UtilToken(ERC20)`. All the utils scripts are executed from the account[0] from the regtest network. 

## Prerequisites

* Follow the deployment process in [Deployment Guide](/developers/integrate/rif-relay/deployment).
* The definition of the smart wallet can be found in [Architecture](/developers/integrate/rif-relay/architecture/)

## Ways to create smart wallets

There are **two ways** to create a Smart Wallet:

1. **Regular transaction:** The Requester (or another account on behalf of the Requester) calls the Proxy Factory asking to get a new Smart Wallet. Therefore the Proxy Factory creates a proxy to the SmartWallet code, delegating the ownership to the Requester.
2. **Sponsored:** It needs to go through the RIF Relay process, which is described in detail below. The requester asks a third party to pay for the Smart Wallet deployment, and the requester pays in tokens for that (or free if it is subsidized by the third-party, a.k.a, Sponsor).

## Send funds

In the [RIF Relay Contracts](https://github.com/rsksmart/rif-relay-contracts) there is a script that would help us to mint ERC20 tokens.

We need to execute the following script:

```shell
npx hardhat mint --token-address <0xabc123> --amount <amount_in_wei> --receiver <0xabc123> --network regtest
```
> The token contract needs to have a mint function. 

## Deploy a Smart Wallet

To deploy a smart wallet we need to follow some steps that will be described below:

1. We need to generate the smart wallet address. As we mentioned before, the Smart Wallet is a contract-based account, therefore, we can generate as many smart wallet addresses as we want without spending gas by calling the `getSmartWalletAddress` from the relay client library. 

> A Smart Wallet only needs to be deployed when we need to execute a transaction. The deployment process uses gas so, unless it's subsidized, we need to pay for it.


At this point we should have the Relay Client object created. 

```typescript
    import type {
      getSmartWalletAddress,
      UserDefinedDeployRequest,
    } from '@rsksmart/rif-relay-client';

    const smartWalletAddress = await getSmartWalletAddress(<EOA>, <INDEX>);

    const relayTransactionOpts: UserDefinedDeployRequest = {
      request: {
        from: <EOA>,
        tokenContract: <TOKEN_ADDRESS>,
        tokenAmount: <AMOUNT_OF_TOKENS_IN_WEI>,
        index: <INDEX>,
      },
    };

    const transaction = await relayClient.relayTransaction(
      relayTransactionOpts
    );

```
> Keep in mind that to pay any amount of token fees during the deployment, the smart wallet must receive funds first.

Where variables are:

* **EOA**: Externally Owned Account, the owner of the smart wallet.
* **INDEX**: The index that we would like to use to generate the smart wallet.
* **TOKEN_ADDRESS**: The token contract address that we want to use to pay for the fee.
* **AMOUNT_OF_TOKENS_IN_WEI**: The amount that we want to pay for the fee in wei.