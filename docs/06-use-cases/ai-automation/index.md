---
sidebar_position: 1
title: AI Agents
sidebar_label: Overview
description: "Connect AI models to on-chain data and deploy autonomous agents for intelligent portfolio management. Build AI agents that stake, bridge, swap and transact on Rootstock with guardrails."
tags: [ai, mcp, agents, autonomous-finance, emerging-tech, fundamentals]
---

This hub is for builders who ship Agents workflows and are looking to connect MCP clients to live chain data, submit transactions on the Rootstock network.

## Core pillars

| Pillar | Description | Primary tool |
| :--- | :--- | :--- |
| **Connectivity** | Expose chain reads and scoped actions to MCP clients. | [Rootstock MCP Server](https://github.com/rsksmart/rsk-mcp-server) |
| **AI Agents** | A lightweight dApp that connects a conversational AI agent to the Rootstock testnet, allowing users to perform DeFi actions like checking token balances and sending tRBTC simply by chatting. | [AI Agent Rootstock](/use-cases/ai-automation/ai-agent-rootstock/) |

## Key concepts

### 1. Model Context Protocol (MCP)

MCP connects clients to tools and data sources. The **[Rootstock MCP Server](https://github.com/rsksmart/rsk-mcp-server)** can read balances, contract state, and gas estimates so responses reflect current chain data.

### 2. Conversational Agents with Blockchain Actions

Build a lightweight dApp that connects a [conversational AI agent](/use-cases/ai-automation/ai-agent-rootstock/) to the Rootstock testnet, allowing users to perform DeFi actions like checking token balances and sending tRBTC simply by chatting. This is not just a chatbot—it is a minimal DeFi agent that can reason over wallet data, maintain conversational context, and issue token actions with a human-like touch.

## Tools

* **Rootstock MCP Server:** Exposes chain reads and safe actions to MCP clients. [Access the Server](https://github.com/rsksmart/rsk-mcp-server).
* **LangChain / Eliza:** Orchestration frameworks you can point at Rootstock RPC and wallets.

## Implementation guides

import DocCardList from '@theme/DocCardList';

<DocCardList />