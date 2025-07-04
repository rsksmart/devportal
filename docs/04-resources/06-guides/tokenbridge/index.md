---
sidebar_position: 4
sidebar_label: Token Bridge
title: Rootstock Token Bridge
tags: [resources, tokenbridge, blockchain, bridges, tokens, ethereum, rootstock, rsk]
---

Safely move your ERC20 tokens between Rootstock and Ethereum with the Tokenbridge dApp. This user-friendly interface lets you interact with the Token Bridge contracts directly. It is available on [Mainnet](https://dapp.tokenbridge.rootstock.io/) or [Testnet](https://dapp.testnet.bridges.rootstock.io/).

## Rationale

Cross chain events are very important in the future of cryptocurrencies. Exchanging tokens between networks allows the token holders to use them in their favorite chain without being restricted to the network choice of the contract owner. Moreover, this also allows layer 2 solutions to use the same tokens on different chains. The combination of token bridges and stable coins creates a great way of payment with low volatility across networks.

## Overview

We have a bridge smart contract on each network, the bridge on one chain will receive and lock the ERC20 tokens, then it will emit an event that will be served to the bridge on the other chain. There is a Federation in charge of sending the event from one contract to the other. Once the bridge on the other chain receives the event from the Federation, it mints the tokens on the mirror ERC20 contract.
See the [FAQs](/resources/guides/tokenbridge/faq/) to learn more about how it works!

<img src="/img/resources/tokenbridge/token-bridge-diagram.jpg"/>


The bridge contracts are upgradeable, this enables a smoother move to a more decentralized bridge in the future. This is the
[token bridge repository](https://github.com/rsksmart/unified-bridges-ui)

## Usage

You can use the ['Token Bridge dApp'](https://dapp.tokenbridge.rootstock.io/) together with [Metamask with custom network](/dev-tools/wallets/metamask/) to move tokens between networks.

Follow the [dApp guide](/resources/guides/tokenbridge/dappguide/) for more details on how to use the token bridge.

Alternatively, you can use a wallet or web3js with the ABI of the contracts. See ['interaction guide using MyCrypto'](/resources/guides/tokenbridge/usingmycrypto/) for more information on how to use the bridge.


## Developers

### Contracts

Here are the ['addresses'](/resources/guides/tokenbridge/contractaddresses/) of the deployed contracts in the different networks.

The smart contracts used by the bridge and the deploy instructions are in the token bridge repository in the 'bridge folder'.

The ABI to interact with the contracts are in the 'abis folder'.


### Federation

There is a federation in charge of notifying the events that have happened in the bridge between one chain and the other. The federation is composed of the creators of the token contracts who want to enable their token for crossing.
See in the ['token bridge federator repository'](https://github.com/rsksmart/unified-bridges-sdk/tree/main/packages/tokenbridge-sdk/src/blockchain/federation) for more information.
