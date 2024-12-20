---
sidebar_label: Overview
sidebar_position: 100
title: RIF Relay - Overview
description: RIF Relay Overview.
tags: [rif, envelope, relay, integrate, integration guide]
---

:::info[Note]
If you wish to suggest changes on this document, please open a PR on the [Rif Relay Repository](https://github.com/rsksmart/rif-relay.git)
:::

# RIF Relay
Most blockchains have native cryptocurrency to pay for transaction fees and gas consumption; this simple design has many benefits. First, to bootstrap an economy, the native cryptocurrency model creates an initial demand for it. Second, it simplifies the interaction between users and miners because it forces them to use the same means of payment. Third, it reduces the complexity of the consensus rules. Finally, it provides Denial of Service (DoS) protection to the network as full nodes can pay what the miners expect to include a received transaction. This way nodes can decide to propagate a transaction or not, preventing the free consumption of network bandwidth, and stop spam transactions.

Cryptocurrencies tend to be associated with volatility and to counter measure this fact, Stablecoins were introduced. Stablecoins bridge the worlds of cryptocurrency and everyday fiat currency because their prices are pegged to a reserve asset like the U.S. dollar or gold.

But with the advent of Decentralized Finance (DeFi), several stable coins have become a preferred means of payment and savings for both users and miners, therefore, separate systems to facilitate alternative payment mechanisms. Transactions that enable paying transactions with any coin other than the native currency are named meta-transactions because in some systems the user transaction is embedded in a higher-level (or meta) transaction created by a third party. A more accessible term for these transactions is “envelopes” or, for the whole system, a relay system. A meta-transaction/relay system can serve at least two different use cases: 1) pay the transaction fees with tokens, where one new party receives the tokens (from the user) and pays the fees on behalf of the user, and 2) enable smart contract developers to subsidize the gas used to interact with their contracts.

With this in mind, the main goal of the RIF Relay Project is to **provide the Rootstock (RSK) ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC**. The system should allow Rootstock (RSK) users to pay transaction fees with methods of payment (i.e., tokens) other than RBTC while maintaining their accounts as transaction senders.

RIF Relay takes its inspiration from the [Gas Station Network (GSN) project](https://github.com/opengsn/gsn). GSN is a decentralized system that improves dApp usability without sacrificing security. In a nutshell, GSN abstracts away gas (used to pay transaction fees) to minimize onboarding and UX friction for dApps. With GSN, "gasless clients" can interact with smart contracts paying for gas with tokens instead of native-currency.


## Modules

RIF Relay is built in modules, the entire system is made up by 3 modules.

1. [RIF Relay Contracts](https://github.com/rsksmart/rif-relay-contracts) contains all the contracts used by the RIF Relay System.
2. [RIF Relay Client](https://github.com/rsksmart/rif-relay-client) contains a library to interact with the relay server.
3. [RIF Relay Server](https://github.com/rsksmart/rif-relay-server) has all the relay server code. You can run the server directly from there.

Each module has instructions for development and usage.

[Deprecated Docs](docs/README.md)


## Contribution Guidelines
* Please refer to the Rootstock Contribution Guidelines for more information on how to contribute to this project.

## License:
MIT License - Copyright (c) 2023 Rootstock