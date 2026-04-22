---
sidebar_position: 1
title: Bridge Assets
sidebar_label: Overview
description: "Understanding how Rootstock connects Bitcoin to the world of programmable finance."
tags: [interoperability, bridges, powpeg, flyover, bitvmx, fundamentals]
---

Interoperability is the ability for Bitcoin to move seamlessly between its native layer and programmable smart contract environments. Rootstock provides the infrastructure that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities.

## Core Pillars

| Pillar | Description | Best Use Case |
| :--- | :--- | :--- |
| **[Swap SDK](https://github.com/rsksmart/rsk-swap-sdk)** | Enable secure movement of assets between Bitcoin and Rootstock using the Swap SDK. | Trustless DeFi & L2 interoperability. |
| **[PowPeg](https://github.com/rsksmart/powpeg-sdk)** | SDK for creating native peg-in and peg-out transactions following the PowPeg protocol. | Institutional & high-value transfers. |
| **[Flyover SDK](https://github.com/rsksmart/flyover-sdk)** | A liquidity-based fast bridge that uses LPs to front the funds for the user. | Retail users & fast dApp onboarding. |
| **[Union (BitVMX)](https://github.com/rsksmart/union-bridge-contracts)** | A trust-minimized 1-of-N bridge that uses optimistic fraud proofs on Bitcoin. | Trustless DeFi & L2 interoperability. |
| **[Layerzero](/use-cases/interoperability/rootstock-layerzero/)** | Build Omnichain Fungible Token (OFTs) on Rootstock with Layerzero. | Trustless DeFi & L2 interoperability. |
| **[LI.FI](/use-cases/interoperability/integrate-lifi/)** | Omnichain liquidity routing from Ethereum, Arbitrum, Base, and more directly to Rootstock. | Single-transaction cross-chain liquidity. |

## Key Concepts

### 1. Peg-In (Bitcoin to Rootstock)
A Peg-In occurs when you send native BTC to a designated vault address on the Bitcoin network. Once confirmed, the Rootstock network mints an equivalent amount of rBTC to your Rootstock address.

### 2. Peg-Out (Rootstock to Bitcoin)
A Peg-Out is the reverse process: rBTC is burned on Rootstock, and the bridge infrastructure releases native BTC to your Bitcoin address.

### 3. Trust-Minimized Security (BitVMX)
With the advent of **[BitVMX](https://bitvmx.org/)**, Rootstock bridges are moving toward an optimistic verification model. This allows for Bitcoin-native fraud proofs, meaning that as long as one participant is honest, the bridge remains secure.

## Top Tools for Developers
* **[Flyover SDK](https://github.com/rsksmart/flyover-sdk):** The primary library for integrating near-instant bridging into your frontend.
* **[Swap SDK](https://github.com/rsksmart/rsk-swap-sdk):** Atlas Bridge is a cross-chain bridge for the Rootstock ecosystem. You can use it to move assets between Rootstock and other supported networks.
* **[LI.FI](/use-cases/interoperability/integrate-lifi/):** Leading cross-chain liquidity aggregator to route swaps and bridges into Rootstock.
* **[Rootstock Explorer](http://explorer.rootstock.io/):** Visually track cross-chain transactions and bridge health.

## Implementation Guides
Explore the recipes below to start integrating bridging solutions into your application.

import DocCardList from '@theme/DocCardList';

<DocCardList />