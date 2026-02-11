---
sidebar_position: 1
title: Build AI Agents
sidebar_label: Overview
description: "Exploring the convergence of Artificial Intelligence and Bitcoin-native smart contracts."
tags: [ai, mcp, agents, autonomous-finance, emerging-tech, fundamentals]
---

Focus on giving AI agents capabilities to read the chain and power to execute transactions. By combining Rootstock's security with the Model Context Protocol (MCP), we enable autonomous agents to manage Bitcoin assets intelligently.

<!-- On Rootstock, AI is more than a chatbot; it is a participant in the economy.

## The Purpose: Why AI on Bitcoin?
As AI models become more capable, they require a secure value layer to store capital and execute financial logic. Bitcoin is the world’s premier neutral money, and Rootstock is the programmable layer that allows AI to interact with it. Whether it is a portfolio rebalancing agent or a DAO governor, AI needs the trust-minimized execution that only Rootstock provides.

## The Role of Rootstock
Rootstock acts as the **Standardized Interface** between Large Language Models and Bitcoin. 
* **Verifiable Action:** Every decision an AI agent makes on-chain is recorded and auditable.
* **Connectivity:** Through the **Model Context Protocol (MCP)**, LLMs can query Rootstock balances and contracts in real-time.

## Technical Architecture
When building AI solutions, you utilize [MCP Server](/use-cases/ai-emerging/mcp-rootstock/) to provide context to the LLM and **Smart Contract Permissions** to execute actions via the RVM. Refer to [The Rootstock MCP Server](/concepts/fundamentals/stack).

<details>
<summary>Click to expand full architecture stack</summary>
<div className="rootstock-stack-container">
    {/* Application Layer (Pink) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">PORTFOLIO AGENTS</div>
            <div className="sub-module">PREDICTION MARKETS</div>
            <div className="sub-module">AI GOVERNANCE</div>
            <div className="sub-module">AUTONOMOUS DAOs</div>
        </div>
    </div>
    {/* Tooling Layer (Purple) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • MCP SERVER
        </div>
    </div>
    {/* Infrastructure Layer (Cyan) */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">MCP SERVERS</div>
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">FLYOVER BRIDGE</div>
            <div className="sub-module">RNS</div>
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
| **Connectivity** | Standardized servers that allow LLMs like Claude or GPT to "read" Rootstock data. | [Rootstock MCP Server](https://github.com/rsksmart/rootstock-mcp-server) |
| **SDK** | Equip your AI agents with the eyes to read the chain and the hands to execute Bitcoin-native transactions. | [Rootstock SDK]( [https://github.com/rsksmart/sdk-base](https://github.com/rsksmart/sdk-base)) |
| **Autonomy** | Granting AI agents the power to execute transactions within user-defined guardrails. | [Spend Permissions](/use-cases/ai-emerging/autonomous-agents-btcfi) |
| **Intelligence** | Using on-chain data to train or fine-tune models specifically for the Bitcoin ecosystem. | [The Graph / Indexers](/dev-tools/data/thegraph/) |

## Key Concepts

### 1. Model Context Protocol (MCP)
MCP is an open standard that connects AI models to external data sources. The **Rootstock MCP Server** allows an AI to fetch account balances, read contract states, and even estimate gas fees, providing the real-time context needed for autonomous action.

### 2. Spend Permissions & Session Keys
To protect users, AI agents should never have full access to a private key. Instead, they use "Spend Permissions"—limited authorizations that allow an agent to move a specific amount of tokens between specific vaults for a limited time.

### 3. Autonomous Portfolio Management
By combining market data context with spend permissions, agents can autonomously move BTC into yield-bearing vaults (BTCFi) when certain APY thresholds are met, rebalancing a user's portfolio 24/7 without manual intervention.

## Top Tools for Developers
* **Rootstock MCP Server SDK:** The essential tool for giving AI models access to the Rootstock network.
* **LangChain / Eliza:** Frameworks for building agentic workflows that can be connected to the RVM.
* **Safe SDK:** Used to manage the complex permissioning required for autonomous agent accounts.

## Implementation Guides
Explore the recipes below to start building the future of AI on Bitcoin.

import DocCardList from '@theme/DocCardList';

<DocCardList />