---
sidebar_position: 1
title: AI
sidebar_label: Overview
description: "MCP server setup and agent patterns for on-chain reads and scoped actions on Rootstock."
tags: [ai, mcp, agents, autonomous-finance, emerging-tech, fundamentals]
---

This hub is for builders who ship agent workflows and connect MCP clients to live chain data and transactions on Rootstock.

## Core pillars

| Pillar | Description | Primary tool |
| :--- | :--- | :--- |
| **Connectivity** | Expose chain reads and scoped actions to MCP clients. | [Rootstock MCP Server](https://github.com/rsksmart/rsk-mcp-server) |
| **AI Agents** | A dApp that connects a conversational agent to Rootstock testnet for balance checks, transfers, and other scoped actions. | [AI Agent Rootstock](/use-cases/ai-automation/ai-agent-rootstock/) |

## Key concepts

### 1. Model Context Protocol (MCP)

MCP connects clients to tools and data sources. The **[Rootstock MCP Server](https://github.com/rsksmart/rsk-mcp-server)** can read balances, contract state, and gas estimates so responses reflect current chain data.

### 2. Conversational agents with on-chain actions

The [AI agent guide](/use-cases/ai-automation/ai-agent-rootstock/) walks through a minimal dApp that connects a conversational agent to Rootstock testnet. Users can check token balances and send tRBTC through chat. The agent reads wallet data, keeps conversational context, and submits scoped token actions.

## Tools

* **Rootstock MCP Server:** Exposes chain reads and safe actions to MCP clients. [Access the Server](https://github.com/rsksmart/rsk-mcp-server).
* **LangChain / Eliza:** Orchestration frameworks you can point at Rootstock RPC and wallets.

## Implementation guides

import DocCardList from '@theme/DocCardList';

<DocCardList />