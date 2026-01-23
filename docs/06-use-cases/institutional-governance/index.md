---
sidebar_position: 1
title: Governance
sidebar_label: Overview
description: "Blueprints for institutional-grade custody and decentralized coordination on Rootstock."
tags: [institutional, governance, dao, safe, multi-sig, fundamentals]
---

For institutions and decentralized organizations, security and transparency are not optional—they are foundational. **Institutional & Governance** on Rootstock provides the tools to move beyond single-key risks toward programmable, multi-signature custody and verifiable on-chain governance.

<!-- On Rootstock, institutional-grade security is backed by the planet's most secure settlement layer: Bitcoin.

## The Purpose: Why Institutions & Governance?
Entities managing significant capital or community mandates require robust "checks and balances." Institutional frameworks on Rootstock eliminate single points of failure through multi-signature workflows and allow for decentralized coordination where stakeholders—not a central authority—dictate the future of the treasury.

## The Role of Rootstock
Rootstock provides the **Verifiable Trust Layer** for organizations building on Bitcoin. 
* **Immutable Custody:** Use smart-contract-based wallets that require signatures for any asset movement.
* **Transparent Coordination:** Launch DAOs with automated voting and execution, ensuring every governance decision is auditable on-chain.
* **Auditability:** Every transaction is time-stamped and recorded on a public ledger, simplifying compliance and regulatory reporting.

## Technical Architecture
When building institutional solutions, you utilize Vaults Whitelabel infrastructure and RootstockCollective on top of the RVM. This ensures that organizational logic is executed with the same finality as a Bitcoin transaction. Refer to [The Stack](/concepts/fundamentals/stack).

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer (Pink) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">TREASURY MGMT</div>
            <div className="sub-module">DAO VOTING</div>
            <div className="sub-module">COMPLIANCE</div>
            <div className="sub-module">CUSTODY</div>
        </div>
    </div>
    {/* Tooling Layer (Purple) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • OZ • COLLECTIVE SDK
        </div>
    </div>
    {/* Infrastructure Layer (Cyan) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">SAFE WALLET</div>
            <div className="sub-module">RNS</div>
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">INDEXERS</div>
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

## Core Pillars

| Pillar | Description | Primary Tool/Protocol |
| :--- | :--- | :--- |
| **Institutional Custody** | Eliminating single points of failure with multi-signature smart contracts. | [Safe &#123;Wallet&#125;](https://safe.rootstock.io/) |
| **On-Chain Governance** | Managing ecosystem upgrades and treasuries through decentralized voting. | [RootstockCollective](https://app.rootstockcollective.xyz/) |
| **Compliance & Audit** | Tools for generating immutable transaction logs for regulatory reporting. | [The Graph / Explorer APIs](#) |
| **Asset Issuance** | Deploying compliant ERC-20 tokens with specific permission logic. | [OpenZeppelin Contracts](#) |

## Key Concepts

### 1. Multi-Signature Security (Safe)
A multi-sig wallet requires multiple independent signatures to authorize a transaction. This is the industry standard for institutional custody, ensuring that assets cannot be moved without collective institutional approval.

### 2. stRIF & Delegated Voting
In the RootstockCollective, governance power is tied to **stRIF** (Staked RIF). Participants can vote directly on ecosystem proposals or delegate their power to expert "Shepherds" to ensure informed decision-making.

### 3. Proof of Auditability
Unlike traditional finance, blockchain allows for real-time auditability. Institutions can use indexers and explorer APIs to prove solvency and track every movement of funds without relying on 3rd-party audits.

## Top Tools for Developers
* **Safe SDK:** The primary library for building and managing multi-sig infrastructure.
* **Tally:** Standard governance dashboards for tracking and casting DAO votes.
* **Rootstock Subgraphs:** Custom indexing services for extracting compliance-ready data.

## Implementation Guides
Explore the recipes below to start building secure governance and custody systems on Rootstock.

import DocCardList from '@theme/DocCardList';

<DocCardList />