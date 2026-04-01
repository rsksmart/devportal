---
sidebar_position: 1
title: Onboard Users
sidebar_label: Overview
description: "Tools and patterns that lower friction for Bitcoin dApp onboarding."
tags: [ux, onboarding, rif-relay, rns, account-abstraction, fundamentals]
---

Onboarding is where users hit seed phrases, gas, and long addresses. On Rootstock you can use smart wallets, social login, RIF Relay for sponsored gas, and RNS for names. For a concrete Para integration, see [Getting Started with Para](/use-cases/onboarding-ux/para/). For a Wagmi-based kit, see [Reown quick start](/developers/quickstart/reown/). For feature phones without data, see [USSD and Rootstock DeFi](/use-cases/onboarding-ux/ussd-rootstock-defi/) (testnet-oriented architecture).

<!-- ## The Purpose: Why UX Matters?
Mainstream adoption requires a seamless blockchain experience. Users should be able to sign up with an email, pay transaction fees in the tokens they already hold (like USDRIF), and interact with human-readable names rather than 42-character strings. -->

<!-- ## The Role of Rootstock
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
</details> -->

## Core pillars

<!-- Future pillar row: Gasless Tx + RIF Relay guide when that page ships. -->

| Pillar | Description | Primary tool |
| :--- | :--- | :--- |
| **Identity** | Transforming hex addresses into readable, portable Bitcoin identities. | [RIF Name Service (RNS)](https://rns.rifos.org/) |
| **Smart Wallets** | Remove seed phrases and gas hurdles using Para SDK's MPC-based social login and account abstraction on Rootstock. | [Para on Rootstock](/use-cases/onboarding-ux/para/) |
| **USSD access** | Reach users on feature phones via carrier USSD menus and an off-chain relay that talks to Rootstock. | [USSD Rootstock DeFi](/use-cases/onboarding-ux/ussd-rootstock-defi/) |

## Key concepts

### 1. Sponsored gas (RIF Relay)

Most actions still need rBTC for gas unless you sponsor fees. RIF Relay lets a paymaster cover gas or accept fees in an ERC-20 your user already holds. You configure limits and abuse controls in your relayer integration.

### 2. Social login and account abstraction

Providers such as Para, Web3Auth, or Privy can create or connect a smart account without forcing a seed phrase on first visit. You still document recovery, device loss, and key material for your product.

### 3. Human-readable names (RNS)

RNS maps names to addresses so users send to a short handle instead of a hex string. Integration details are on [RNS](https://rns.rifos.org/).

## Tools
* **RIF Relay SDK:** The primary library for implementing sponsored and token-paid transactions.
* **Safe SDK:** Build institutional-grade security and account abstraction into your dApp.
* **Web3Auth / Privy / Para:** Integrated social login providers that work out-of-the-box with Rootstock.

## Implementation guides

Published guides in this section are listed below.

import DocCardList from '@theme/DocCardList';

<DocCardList />