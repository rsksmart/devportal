---
sidebar_position: 1
title: UX & Onboarding Fundamentals
sidebar_label: Overview
description: "Mastering the tools that make Bitcoin dApps as seamless as Web2."
tags: [ux, onboarding, rif-relay, rns, account-abstraction, fundamentals]
---

Blockchain technology often comes with high friction: seed phrases, gas fees, and long hexadecimal addresses. Enhancing the UX and Onboarding on Rootstock is about abstracting this complexity. By leveraging core devtools compatible with Rootstock such as [Para Wallet](/developers/quickstart/para), [Reown](/developers/quickstart/reown), developers can build applications that feel like standard web apps while retaining the security of Bitcoin.

## The Purpose: Why UX Matters?
Mainstream adoption requires a seamless blockchain experience. Users should be able to sign up with an email, pay transaction fees in the tokens they already hold (like USDRIF), and interact with human-readable names rather than 42-character strings.

## The Role of Rootstock
Rootstock provides the core identity and relay infrastructure needed to bridge the gap between Web2 convenience and Web3 security.

* **Frictionless Entry:** Support for **Social Login** means users don't need to manage private keys immediately.
* **Simplified Payments:** **RIF Relay** allows for "Gasless" flows where the developer sponsors fees or the user pays in stablecoins.
* **Human-Centric Identity:** **RNS** replaces complex addresses with simple names like `satoshis.rsk`.

## Technical Architecture
When building onboarding flows, you utilize **RIF Services** and **Smart Contract Wallets** on top of the RVM. This layer translates human actions into cryptographically secure transactions.

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer (Pink) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">SOCIAL LOGIN</div>
            <div className="sub-module">WALLETS</div>
            <div className="sub-module">NAME SERVICES</div>
        </div>
    </div>
    {/* Tooling Layer (Purple) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • PARA WALLET SDK
        </div>
    </div>
    {/* Infrastructure Layer (Cyan) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">RNS</div>
            <div className="sub-module">FLYOVER BRIDGE</div>
            <div className="sub-module">MCP SERVERS</div>
        </div>
    </div>
    {/* Execution Layer (Green) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>EXECUTION</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (EVM-COMPATIBLE)</div>
        </div>
    </div>
    {/* Security Layer (Orange) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SECURITY</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: MERGED MINING</div>
        </div>
    </div>
</div>
</details>

## Core Pillars of Rootstock Onboarding

| Pillar | Description | Primary Tool/Protocol |
| :--- | :--- | :--- |
| **Gasless Tx** | Sponsored transactions where users pay zero gas or pay in ERC-20 tokens. | [RIF Relay](/use-cases/onboarding-ux/gasless-transactions-relay) |
| **Identity** | Transforming hex addresses into readable, portable Bitcoin identities. | [RIF Name Service (RNS)](https://rns.rifos.org/) |
| **Smart Wallets** | Contract-based accounts that enable social recovery and complex permissions. | [Safe (Gnosis)](https://safe.rootstock.io/) |
| **Fiat On-ramps** | Direct paths for users to purchase rBTC or USDRIF using local currency. | [Mt Pelerin / Ramp](#) |

## Key Concepts

### 1. Gasless Transactions
Traditionally, every action on a blockchain requires native tokens for gas. RIF Relay abstracts this by allowing a "Paymaster" to cover the cost. This is essential for e-commerce or gaming dApps where users may not have rBTC yet.

### 2. Social Login & Account Abstraction
By using Safe (Gnosis) and providers like Web3Auth, you can create a "Smart Wallet" for a user triggered by their Google or Apple ID. This removes the "Seed Phrase" barrier while keeping the user in full control of their funds.

### 3. Human-Readable Names (RNS)
RNS provides a decentralized way for users to map their addresses to names. This reduces the risk of sending funds to the wrong address and provides a consistent identity across the Rootstock ecosystem.

## Top Tools for Developers
* **RIF Relay SDK:** The primary library for implementing sponsored and token-paid transactions.
* **Safe SDK:** Build institutional-grade security and account abstraction into your dApp.
* **Web3Auth / Privy / Para:** Integrated social login providers that work out-of-the-box with Rootstock.

## Implementation Guides
Explore the recipes below to start building a frictionless experience on Rootstock.

import DocCardList from '@theme/DocCardList';

<DocCardList />