---
sidebar_position: 1
title: Bridge Assets
sidebar_label: Overview
description: "How Rootstock connects Bitcoin to programmable finance and other chains."
tags: [interoperability, bridges, powpeg, flyover, bitvmx, fundamentals]
---

Interoperability is how BTC and rBTC move between Bitcoin, Rootstock, and other chains. Peg-ins, peg-outs, liquidity bridges, and messaging protocols differ by trust model, speed, and cost. Your job is to pick a path that matches your risk budget and to explain that choice to users.

## Core pillars

| Pillar | Description | Typical use |
| :--- | :--- | :--- |
| **Atlas** | Product UI for comparing bridge routes between Bitcoin and Rootstock. | [atlas.rootstock.io](https://atlas.rootstock.io/) for operators and users. The Dev Portal Atlas Bridge SDK tutorial is not published yet. |
| **PowPeg** | Two-way peg with federation and HSM-backed signers. | High-value BTC and rBTC moves when you follow protocol rules and confirmations. |
| **Flyover** | Liquidity providers can front funds for faster peg-side flows. | Faster UX when LPs are available on your route. |
| **Union (BitVMX)** | Designs that target lower trust via optimistic checks on Bitcoin. | Advanced integrations, not a generic default. |
| **LayerZero** | Omnichain tokens and messaging to other EVM networks. | Token portability beyond Bitcoin and Rootstock. Published guide: [LayerZero on Rootstock](/use-cases/interoperability/rootstock-layerzero/). |

## Key concepts

### 1. Peg-in (Bitcoin to Rootstock)

You send BTC to a peg-in path on Bitcoin. After enough confirmations, Rootstock credits rBTC to your Rootstock address. Time and fees depend on Bitcoin congestion and policy.

### 2. Peg-out (Rootstock to Bitcoin)

You burn or lock rBTC on Rootstock according to the peg-out flow. Native BTC is released on Bitcoin after protocol delays. Peg-outs are **not instant**.

### 3. Trust and verification

Some bridges optimize for speed with liquidity or federation assumptions. Others target stronger trust minimization with more moving parts. Pick the path that matches your risk model and disclose it to users.

## Tools

* **Flyover SDK:** Fast peg flows where the protocol is supported.
* **Explorers:** Trace peg-in, peg-out, and bridge transactions for support.
* **Atlas:** Route comparison at [atlas.rootstock.io](https://atlas.rootstock.io/).
* **PowPeg app:** User-facing peg walkthroughs under [Resources → PowPeg app](/resources/guides/powpeg-app/overview/). This section targets builders and cross-chain integration patterns.

## Implementation guides

Published tutorials in this section are listed below. Draft bridge SDK pages stay out of the sidebar until they are renamed for release.

import DocCardList from '@theme/DocCardList';

<DocCardList />
