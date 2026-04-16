---
sidebar_position: 1
title: Automate Payments
sidebar_label: Overview
description: "Tokens, rBTC settlement, and programmable payment patterns on Rootstock."
tags: [payments, assets, erc-20, stablecoins, checkout, fundamentals]
---

Programmable payments on Rootstock are normal EVM contracts with Bitcoin-anchored finality. Gas costs and confirmation time depend on network load and how you batch work. **USDRIF**, **RIF Relay**, and HTTP 402 style flows each solve different jobs; pick the stack that matches your product and disclose fees and settlement time to users.

## Core pillars

| Pillar | Description | Where to go |
| :--- | :--- | :--- |
| **x402 and agentic commerce** | Machine clients pay for HTTP resources with on-chain settlement. | [Integrating x402 Payments with Rootstock](/use-cases/payments-assets/integrate-x402/)|
| **ERC-20 and rBTC** | Fungible tokens and native rBTC for checkout, escrow, and streaming. | Contract patterns in your stack (Hardhat, Foundry) plus [RIF Relay](/developers/integrate/rif-relay/overview/) when you need sponsored gas. |

## Key concepts

### 1. ERC-20 assets

ERC-20 tokens work on Rootstock the same way as on other EVM chains. Wallets and indexers you already use apply, but you must verify token addresses per network (mainnet vs testnet).

### 2. Native rBTC payments

rBTC is the native gas token and is pegged 1:1 to BTC through the PowPeg. Users need rBTC for gas unless you sponsor fees with RIF Relay or a similar paymaster pattern.

### 3. Programmable money

Contracts can hold funds, release them on conditions, or stream them over time. You still need clear failure handling, upgrade policies, and user messaging when a payment path reverts.

## Tools

* **Hardhat / Foundry:** Write and test payment and escrow contracts.
* **RIF Relay SDK:** Sponsored or token-paid gas for end users.
* **Explorers and indexers:** Confirm settlement and build support tooling.

## Implementation guides

import DocCardList from '@theme/DocCardList';

<DocCardList />
