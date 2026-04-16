---
sidebar_position: 1
title: Onboard Users
sidebar_label: Overview
description: "Mastering the tools that make Bitcoin dApps as seamless as Web2."
tags: [ux, onboarding, rif-relay, rns, account-abstraction, fundamentals]
---

Blockchain technology often comes with high friction, such as hard to remember seed phrases, gas fees, and long hexadecimal addresses. Enhancing the UX and Onboarding on Rootstock is about abstracting this complexity. By leveraging core devtools compatible with Rootstock such as [Para Wallet](/developers/quickstart/para), [Reown](/developers/quickstart/reown), developers can build applications that feel like standard web apps while retaining the security of Bitcoin.

## Core Pillars

| Pillar | Description | Primary Tool/Protocol |
| :--- | :--- | :--- |
<!-- | **Gasless Tx** | Sponsored transactions where users pay zero gas or pay in ERC-20 tokens. | [RIF Relay](/use-cases/onboarding-ux/gasless-transactions-relay) | -->
| **Identity** | Transforming hex addresses into readable, portable Bitcoin identities. | [RIF Name Service (RNS)](https://rns.rifos.org/) |
| **Smart Wallets** | Remove seed phrases and gas hurdles using Para SDK's MPC-based social login and Account Abstraction on Rootstock. | [Para SDK](https://dev.rootstock.io/developers/quickstart/para/) |

## Key Concepts

### 1. Gasless Transactions
Traditionally, every action on a blockchain requires native tokens for gas. RIF Relay abstracts this by allowing a "Paymaster" to cover the cost. This is essential for e-commerce or gaming dApps where users may not have rBTC yet.

### 2. Social Login & Account Abstraction
By using Safe (Gnosis) and providers like Web3Auth, you can create a "Smart Wallet" for a user triggered by their Google or Apple ID. This removes the "Seed Phrase" barrier while keeping the user in full control of their funds.

### 3. Human-Readable Names (RNS)
[RNS](/concepts/rif-suite/rns/) provides a decentralized way for users to map their addresses to names. This reduces the risk of sending funds to the wrong address and provides a consistent identity across the Rootstock ecosystem.

## Top Tools for Developers
* **RIF Relay SDK:** The primary library for implementing sponsored and token-paid transactions.
* **Safe SDK:** Build institutional-grade security and account abstraction into your dApp.
* **Web3Auth / Privy / Para:** Integrated social login providers that work out-of-the-box with Rootstock.

## Implementation Guides
Explore the recipes below to start building a frictionless experience on Rootstock.

import DocCardList from '@theme/DocCardList';

<DocCardList />