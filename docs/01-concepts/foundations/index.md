---
sidebar_label: Foundations
sidebar_position: 2
title: Rootstock Foundations
tags: [rsk, rootstock, beginner, concepts, foundations]
description: Rootstock is the first and longest-lasting Bitcoin sidechain, secured by over 85% of Bitcoin's hash power through merge mining.
---

## What is Rootstock?

Rootstock is the first and longest-lasting Bitcoin sidechain. It combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 85% of Bitcoin's hash power through merge mining.

See the [Rootstock Stack](/concepts/foundations/stack/) and the [Security at Rootstock](/concepts/foundations/security/) hub.

## How is Rootstock connected to Bitcoin?

### Merged mining with Bitcoin

The first point of contact is through mining.

Bitcoin miners perform [merged mining](/concepts/merged-mining/), securing both networks with the same infrastructure and energy consumption.

They create blocks on the Bitcoin network every 10 minutes, including transfers of bitcoin between addresses, and in the process they create new bitcoins.

On Rootstock, blocks are created every 30 seconds to secure the execution of smart contracts. This does not mint new coins, but it does earn a reward from merged mining.

> See [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) for more about mining.

### PowPeg with Bitcoin

The second point of contact is the [PowPeg](/concepts/powpeg/), also known as the bridge.

This component connects both networks so you can move bitcoin to Rootstock and interact with smart contracts. You pay gas in rBTC, which is pegged 1:1 with BTC.

To peg in, you send bitcoin to a special address where it is locked on Bitcoin. The same amount of rBTC is then available on Rootstock. To peg out, you send rBTC to a special address on Rootstock and receive BTC back on Bitcoin.

For the full security model behind merged mining, the PowPeg, and how RootstockLabs ships and verifies code, see [Security at Rootstock](/concepts/foundations/security/).
