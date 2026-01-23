---
sidebar_position: 2
sidebar_label: MCP Server Setup
title: Building an MCP Server to Connect LLMs to Rootstock
description: "A technical guide to setting up a Model Context Protocol (MCP) server for real-time blockchain data access." 
tags: [ai, mcp, agents, infrastructure]
---

The Model Context Protocol (MCP) is an open standard that allows AI models (like Claude or Cursor) to securely interact with external data and tools. By building a Rootstock MCP server, you enable AI agents to read balances, query smart contracts, and track transactions directly using natural language.


## Prerequisites

* **Node.js (v18+)** and npm installed.
* **Rootstock RPC URL:** Access to a node (e.g., via Rootstock's public nodes).
* **MCP Inspector:** For testing your server locally.

## Getting Started

### 1. Initialize the Server
Create a new TypeScript project and install the official MCP SDK.

```bash
mkdir rootstock-mcp && cd rootstock-mcp
npm init -y
npm install @modelcontextprotocol/sdk viem
```

### 2. Implement the Blockchain Tool
Define a "Tool" that the AI can call. In this example, we create a tool that allows the AI to fetch the rBTC balance of any address.

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createPublicClient, http, formatEther } from "viem";

const server = new McpServer({ name: "Rootstock", version: "1.0.0" });
const publicClient = createPublicClient({ transport: http('[https://public-node.testnet.rsk.co](https://public-node.testnet.rsk.co)') });

// Register the "get_balance" tool
server.tool("get_balance", { address: z.string() }, async ({ address }) => {
  const balance = await publicClient.getBalance({ address: address as `0x${string}` });
  return {
    content: [{ type: "text", text: `Balance: ${formatEther(balance)} rBTC` }]
  };
});

// Start the server using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 3. Testing with MCP Inspector
Run the inspector to simulate an AI client calling your Rootstock tools.

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

## Troubleshooting
- Connection Timeouts: Ensure your RPC provider isn't rate-limiting the MCP server during intensive AI sessions.

- Context Window Overload: AI models have limits. When returning contract ABIs or large transaction histories, truncate the data to keep the most relevant context.

## Related Use Cases or Resources
- [Official Rootstock MCP Server Repository](https://github.com/rsksmart/rsk-mcp-server)

- [Autonomous BTCFi Agents](/use-cases/ai-emerging/autonomous-agents-btcfi)

- Querying On-Chain Data