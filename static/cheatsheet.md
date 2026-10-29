# Rootstock Developer Cheatsheet

> Everything you need to start building on Rootstock. One page. All the essentials.

**Web page:** https://dev.rootstock.io/cheatsheet

---

## Start here - about 10 minutes

1. **Add Rootstock Testnet to your wallet.** Use MetaMask or the Rootstock Explorer add-network flow.
2. **Get testnet tRBTC.** https://faucet.rootstock.io (event promo codes posted on the faucet site).
3. **Deploy your first contract.** [Remix quickstart](https://dev.rootstock.io/developers/quickstart/remix/) or [Hardhat quickstart](https://dev.rootstock.io/developers/quickstart/hardhat/).

---

## 1.0 Set up your environment

Essential network setup and developer tooling.

### 1.1 Add Rootstock to MetaMask

Use MetaMask buttons on the web page, or add the network from the Rootstock Explorer:

- Testnet Explorer: https://explorer.testnet.rootstock.io
- Mainnet Explorer: https://explorer.rootstock.io
- Add-network guide: https://dev.rootstock.io/dev-tools/explorers/rootstock-explorer/add-rootstock-network-to-metamask/
- MetaMask setup: https://dev.rootstock.io/dev-tools/wallets/metamask/

**Rootstock Testnet**

| Field | Value |
|---|---|
| Network Name | Rootstock Testnet |
| RPC URL | https://public-node.testnet.rsk.co |
| Chain ID | 31 |
| Currency Symbol | tRBTC |
| Block Explorer | https://explorer.testnet.rootstock.io |

**Rootstock Mainnet**

| Field | Value |
|---|---|
| Network Name | Rootstock Mainnet |
| RPC URL | https://public-node.rsk.co |
| Chain ID | 30 |
| Currency Symbol | rBTC |
| Block Explorer | https://explorer.rootstock.io |

### 1.2 Get Testnet Tokens

Get tRBTC from the faucet. Promo codes for events are posted on the faucet site.

| Field | Value |
|---|---|
| Faucet URL | https://faucet.rootstock.io |
| Promo Code | TBD (event codes posted at faucet) |

### 1.3 RPC Provider

Production-grade RPC API for Rootstock. Create a free API key for higher limits.

| Field | Value |
|---|---|
| Rootstock RPC Service | https://rpc.rootstock.io |
| RPC API Sandbox | https://rpc.rootstock.io/doc |
| Setup guide | https://dev.rootstock.io/developers/rpc-api/rootstock/setup/ |

### 1.4 Solidity Compiler

Recommended compiler settings for Rootstock. See the EVM compatibility matrix for opcode support and behavioral differences vs Ethereum.

Full opcode and compiler matrix: [EVM Compatibility Explorer](https://rskj-evm-compatibility.rsk.co/) · [Requirements](https://dev.rootstock.io/developers/requirements/)

| Field | Value |
|---|---|
| Supported Version | up to 0.8.35 |
| EVM Version | Cancun |

---

## 2.0 Build and Deploy Smart Contracts

- **Wagmi Starter Kit.** React Hooks for EVM. TypeScript-first. https://github.com/rsksmart/rsk-wagmi-starter-kit
- **Foundry Starter Kit.** Fast Solidity testing with Forge. https://github.com/rsksmart/rootstock-foundry-starterkit
- **Hardhat Starter Kit.** JS/TypeScript with plugins and tasks. https://github.com/rsksmart/rootstock-hardhat-starterkit
- **Quickstart hub.** All starter kits and deploy guides. https://dev.rootstock.io/developers/quickstart/

---

## 3.0 Verify and Observe

- **Testnet Explorer.** Browse blocks, addresses, and transactions on testnet. https://explorer.testnet.rootstock.io
- **Verify smart contracts.** Hardhat verify plugin and explorer submission guide. https://dev.rootstock.io/developers/smart-contracts/hardhat/verify-smart-contracts/
- **Deploy and verify with Remix.** Write, compile, deploy, and verify in Remix IDE. https://dev.rootstock.io/developers/quickstart/remix/

---

## 4.0 Build with AI

### MCP Server

Connect your AI agent to Rootstock via MCP.

```json
{
  "mcpServers": {
    "rootstock": {
      "command": "npx",
      "args": ["-y", "@rsksmart/rsk-mcp-server"]
    }
  }
}
```

- GitHub: https://github.com/rsksmart/rsk-mcp-server
- NPM: https://www.npmjs.com/package/@rsksmart/rsk-mcp-server
- Quickstart: https://dev.rootstock.io/developers/quickstart/mcp/

### Rootstock Skills

Install agent skills for Claude Code and Cursor.

```bash
npx skills add rootstock/skills
```

- GitHub: https://github.com/rootstock/skills

### Rootstock AI Assistant

In-docs AI assistant trained on Rootstock documentation. Open it with the Ask Rootstock AI button in the portal.

- Developer portal: https://dev.rootstock.io

---

## 5.0 Institutional

| Product | Description | Link |
|---|---|---|
| Atlas Bridge | Permissionless Bitcoin bridge to Rootstock | https://dev.rootstock.io/resources/guides/atlas/ |
| PowPeg | Two-way Bitcoin peg secured by merged mining | https://dev.rootstock.io/concepts/foundations/powpeg/ |

---

## 6.0 Support and Documentation

- **Developer Docs.** https://dev.rootstock.io
- **Discord Community.** https://rootstock.io/discord
- **GitHub.** https://github.com/rsksmart
- **Support.** https://support.rootstock.io

---

## Network Quick Reference

Related guides:

- [MetaMask setup](https://dev.rootstock.io/dev-tools/wallets/metamask/)
- [RPC API setup](https://dev.rootstock.io/developers/rpc-api/rootstock/setup/)

| Parameter | Testnet | Mainnet |
|---|---|---|
| Chain ID | 31 | 30 |
| RPC URL | https://public-node.testnet.rsk.co | https://public-node.rsk.co |
| Currency | tRBTC | rBTC |
| Explorer | https://explorer.testnet.rootstock.io | https://explorer.rootstock.io |
| Faucet | https://faucet.rootstock.io | N/A |
| RPC Service | https://rpc.rootstock.io | https://rpc.rootstock.io |
| Solidity | up to 0.8.35 | up to 0.8.35 |
| EVM | Cancun | Cancun |

---

*Rootstock. Bitcoin's Financial Infrastructure*
