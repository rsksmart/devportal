---
sidebar_label: Interface Registry
sidebar_position: 500
title: Universal Smart Contract Interface Registry
description: "See the ERC1820 standard interface, address support and smart contract implementation"
tags: [smart contracts, rsk, rootstock, developers, interface registry]
---

The ERC1820 standard defines a universal registry smart contract where any address (contract or regular account) can register which interface it supports and which smart contract is responsible for its implementation.

## Description

This standard defines a registry where smart contracts and regular accounts can publish which functionality they implement - either directly or through a proxy contract.

Anyone can query this registry to ask if a specific address implements a given interface and which smart contract handles its implementation.

This registry may be deployed on any chain and shares the same address on all chains.

Interfaces with zeroes (0) as the last 28 bytes are considered ERC165 interfaces, and this registry SHALL forward the call to the contract to see if it implements the interface.

This contract also acts as an ERC165 cache to reduce gas consumption.

## Motivation

[EIP1820](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1820.md)
allows contracts to register interface and query the registry, avoiding miscommunications that may result in the loss of funds.

For example, with an ERC20 smart contract, a mistake can result in tokens being burnt.
Though the ERC20 token standard is well documented and well implemented overall, it contains a bug. This bug has result in losses of tokens worth millions of US dollars. With the `transfer` function, you can only send tokens to an externally account. If you use the `transfer` function to send tokens to a smart contract (which is not an externally owned account), you will see a successful transaction, but the contract will never receive the tokens. This effectively destroys the tokens forever, as they cannot be retrieved. By using the wrong function, several users have lost their tokens for good!

The ERC777 token standard solves this problem using the EIP1820 interface registry, and it is backward compatible with the ECR20 token standard.

In order to enable implementations based on the ERC777 token standard,
as well as any other smart contracts that would benefit from
the use of a universal smart contract interface registry,
Rootstock has deployed an implementation of the EIP1820 registry on both its
[Mainnet](https://explorer.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24),
and [Testnet](https://explorer.testnet.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24).

## Links and Information

Original:

- [EIP1820](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1820.md)
- Comparing [ERC777 to ERC20](https://hackernoon.com/erc777-is-the-new-token-standard-replacing-the-erc20-fd6319c3b13)
- Comparing [ERC777 and ERC223 to ERC20](https://101blockchains.com/erc20-vs-erc223-vs-erc777/)

Rootstock:

- [Rootstock Mainnet deployed EIP1820 smart contract](https://explorer.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24)
- [Rootstock Testnet deployed EIP1820 smartcontract](https://explorer.testnet.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24)
- Corresponding Rootstock Improvement Proposal: [RSKIP148](https://github.com/rsksmart/RSKIPs/blob/e0ac990679a2e6f476e41db0c1050132cd2b1bfc/IPs/RSKIP148.md)