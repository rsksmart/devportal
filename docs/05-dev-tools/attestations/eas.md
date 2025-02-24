---
sidebar_position: 100
title: Ethereum Attestation Service
sidebar_label: Ethereum Attestation Service
description: "Ethereum Attestation Service (EAS) is a system that allows individuals and organizations to create verifiable claims or proofs about specific events, actions, or data, either on-chain (on the blockchain) or off-chain (outside the blockchain but linked to it). Learn how to use it on Rootstock."
tags: [rsk, rootstock, guides, EAS, Attestation, Ethereum]
---

[Ethereum Attestation Service (EAS)](/resources/guides/eas/) is an open-source infrastructure public good for making attestations onchain or offchain.

EAS is a foundational layer that empowers anyone to make attestations about anything. By creating a decentralized ledger of verifiable claims, we can revolutionize traditional finance, build decentralized reputation systems, voting mechanisms, governance frameworks, social media platforms, supply chain tracking systems, knowledge graphs, and lots more.

Supported on: <Shield label="mainnet" title="testnet" tooltip="Available on Mainnet and Testnet" color="orange" />

## How EAS is integrated with Rootstock

The EAS essential contracts has been successfully deployed to Rootstock, this includes a robust indexer, and a user-friendly alternative explorer. The following sections will delve into the technical details of these implementations.

### About EAS

EAS runs on two [smart contracts](https://docs.attest.org/docs/core--concepts/how-eas-works)
1. Registering attestation Schemas 
2. Attesting the Schemas. 

:::info[Info]

For developers, see guide on [How to Run EAS DevTool Locally](/resources/guides/eas/overview/).

Schemas can be registered for a wide range of use cases, and attestations can be made both on-chain and off-chain. For more complex scenarios, you can incorporate a resolver contract into the Schema. This enables on-chain verification of attestation data and the ability to attach payments to attestations.
:::

## Start Building

### Open-Source Code

Find the open-source repositories

- [EAS Contracts](https://github.com/rsksmart/eas-contracts): The contracts are elegantly simple. We forked the repository adding the contracts for Rootstock Mainnet and Testnet.
- [EAS SDK](https://github.com/ethereum-attestation-service/eas-sdk): See the latest version of the SDK Library.
- [EAS Indexing Service](https://github.com/rsksmart/eas-indexing-service): See how we index attestation data. Added support for Rootstock Testnet and Mainnet.
- [EAS Explorer](https://github.com/rsksmart/EAS-devtool): Alternative Explorer UI to display attestations.

:::info[Info]

For developers, see guide on [How to Run EAS DevTool Locally](/resources/guides/eas/overview/).
:::

## EAS Contracts

Find the deployed EAS contracts on Rootstock Mainnet and Tesnet:

### Mainnet

* **EAS**:
  * Contract: [0x54C0726E9d2D57Bc37AD52c7E219A3229e0eE963](https://explorer.rootstock.io/address/0x54c0726e9d2d57bc37ad52c7e219a3229e0ee963)  
* **SchemaRegistry**:
  * Contract: [0xeF29675d82CC5967069d6d9C17F2719f67728F5B](https://explorer.rootstock.io/address/0xeF29675d82CC5967069d6d9C17F2719f67728F5B)
* **EIP712Proxy**:
  * Contract: [0x08cc68B734B14E7984D638eF141eC6De9Faf7d27](https://explorer.rootstock.io/address/0x08cc68B734B14E7984D638eF141eC6De9Faf7d27)
* **Indexer**:
  * Contract: [0x4c0Ac010C2ec50fc1Ff3e7E35DaDA06A7F26073f](https://explorer.rootstock.io/address/0x4c0Ac010C2ec50fc1Ff3e7E35DaDA06A7F26073f)

### Testnet

* **EAS**:
  * Contract: [0xc300aeEaDd60999933468738c9F5D7e9C0671e1c](https://explorer.testnet.rootstock.io/0xc300aeEaDd60999933468738c9F5D7e9C0671e1c)
* **SchemaRegistry**:
  * Contract: [0x679c62956cD2801AbAbF80e9D430f18859Eea2d5](https://explorer.testnet.rootstock.io/0x679c62956cD2801AbAbF80e9D430f18859Eea2d5)
* **EIP712Proxy**:
  * Contract: [0x91dD0c0795E22f7448bC2330aDe1020D2115cCbC](https://explorer.testnet.rootstock.io/0x91dD0c0795E22f7448bC2330aDe1020D2115cCbC)
* **Indexer**:
  * Contract: [0x4352E5b2567551986E21eD65D5Ad3052a09e3717](https://explorer.testnet.rootstock.io/address/0x4352E5b2567551986E21eD65D5Ad3052a09e3717)


## Useful Resources
- [How to Run EAS DevTool Locally](/resources/guides/eas/overview/)
- [Navigating the EAS Dashboard](/resources/guides/eas/user-guide/)
- [EAS Github](https://github.com/ethereum-attestation-service)