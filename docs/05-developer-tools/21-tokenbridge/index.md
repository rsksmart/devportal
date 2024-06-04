---
sidebar_label: Token Bridge
title: Rootstock (RSK) and Ethereum (ETH) Token Bridge | Rootstock (RSK)
tags: [erc20, bridge, faqs, rootstock, defi, decentralized, token-bridge, tokens, quick-start, guides, tutorial, testnet, networks, dapps, tools, rsk, ethereum, eth, rbtc, smart-contracts, install, get-started, how-to, mainnet, testnet, sidechain, contracts, swaps]
---

Ethereum/Rootstock Bridge that allows to move ERC20 tokens between one chain and the other.

## Rationale

Cross chain events are very important in the future of cryptocurrencies. Exchanging tokens between networks allows the token holders to use them in their favorite chain without being restricted to the network choice of the contract owner. Moreover, this also allows layer 2 solutions to use the same tokens on different chains. The combination of token bridges and stable coins creates a great way of payment with low volatility across networks.

## Overview

We have a bridge smart contract on each network, the bridge on one chain will receive and lock the ERC20 tokens, then it will emit an event that will be served to the bridge on the other chain. There is a Federation in charge of sending the event from one contract to the other. Once the bridge on the other chain receives the event from the Federation, it mints the tokens on the mirror ERC20 contract.
See the [FAQ](/tools/tokenbridge/faq/) to learn more about how it works!

<img src="/img/tools/tokenbridge/token-bridge-diagram.jpg"/>


The bridge contracts are upgradeable, this enables a smoother move to a more decentralized bridge in the future. This is the
[token bridge repository](https://github.com/rsksmart/tokenbridge)

## Usage

You can use the ['Token Bridge Dapp'](https://tokenbridge.rsk.co/) together with [Metamask with custom network](https://developers.rsk.co/develop/apps/wallets/metamask/) to move tokens between networks.

Follow the [Dapp guide](/tools/tokenbridge/dappguide/) for more details on how to use the token bridge.

Alternatively, you can use a wallet or web3js with the ABI of the contracts. See ['interaction guide using MyCrypto'](/tools/tokenbridge/usingmycrypto/) for more information on how to use the bridge.


## Developers

### Contracts

Here are the ['addresses'](/tools/tokenbridge/contractaddresses/) of the deployed contracts in the different networks.

The smart contracts used by the bridge and the deploy instructions are in the token bridge repository in the ['bridge folder'](https://github.com/rsksmart/tokenbridge/tree/master/bridge/).

The ABI to interact with the contracts are in the ['abis folder'](https://github.com/rsksmart/tokenbridge/tree/master/bridge/abi)


### Federation

There is a federation in charge of notifying the events that have happened in the bridge between one chain and the other. The federation is composed of the creators of the token contracts who want to enable their token for crossing.
See in the token bridge repository the ['federator folder'](https://github.com/rsksmart/tokenbridge/tree/master/federator) for more information.


## Troubleshooting

If you need guide troublehsooting an issue go to [https://developers.rsk.co/kb/tokenbridge-troubleshooting/](https://developers.rsk.co/kb/tokenbridge-troubleshooting/)
