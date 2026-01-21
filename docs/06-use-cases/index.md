---
sidebar_position: 1
title: Use Cases
sidebar_label: Overview
tags: [rsk, rootstock, use cases, solutions, guides, tutorials, institutions, users, developers]
description: "Real-world implementation guides for building on Rootstock."
---

Welcome to the Rootstock Use Cases Library. This hub is designed to help you move from an idea to a live implementation. Each use case provides a conceptual overview, technical prerequisites, and a step-by-step integration guide.

## Explore by Use Cases

Use the interactive filters below to find the specific guide for your development goal.

<Filter
values={[
  {label: 'BTCFi & Yield', value: 'btcfi'},
  {label: 'Interoperability', value: 'interop'},
  {label: 'UX & Onboarding', value: 'ux'},
  {label: 'AI & Emerging', value: 'emerging'},
  {label: 'Institutional', value: 'institutional'}
]}>

<FilterItem
  value="btcfi, institutional"
  title="rBTC Yield Vaults"
  subtitle="BTCFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance/vaults-btcfi"
  linkTitle="View Guide"
  description="Integrate the multi-asset yield train (rBTC, RIF, USDRIF) to provide native, sustainable yield to your users."
/>

<FilterItem
  value="btcfi"
  title="Liquid Staking (LSTs)"
  subtitle="BTCFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance/liquid-staking-rbtc"
  linkTitle="View Guide"
  description="Enable users to earn yield on their BTC while maintaining liquidity via st-rBTC and protocol-native lending."
/>

<FilterItem
  value="interop"
  title="Union Bridge (BitVMX)"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/union-bridge-bitvmx"
  linkTitle="View Guide"
  description="Utilize the trust-minimized BitVMX bridge for BTC transfers, moving assets without relying on a centralized federation."
/>

<FilterItem
  value="interop"
  title="Fast Bridging with Flyover"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/flyover-fast-bridge"
  linkTitle="View Guide"
  description="Reduce bridge wait times by 60%+ using Liquidity Providers to facilitate near-instant BTC transfers."
/>

<FilterItem
  value="ux"
  title="Gasless Transactions"
  subtitle="Onboarding"
  color="green"
  linkHref="/use-cases/onboarding-ux/gasless-transactions-relay"
  linkTitle="View Guide"
  description="Allow users to pay transaction fees in ERC-20 tokens (e.g., USDRIF) or sponsor fees via RIF Relay."
/>

<FilterItem
  value="ux"
  title="Smart Wallet Onboarding"
  subtitle="Onboarding"
  color="green"
  linkHref="/use-cases/onboarding-ux/smart-wallet-onboarding"
  linkTitle="View Guide"
  description="Integrate social login and account abstraction to onboard non-crypto users seamlessly."
/>

<FilterItem
  value="emerging"
  title="Autonomous BTCFi Agents"
  subtitle="AI & Emerging"
  color="pink"
  linkHref="/use-cases/ai-emerging/autonomous-agents-btcfi"
  linkTitle="View Guide"
  description="Deploy AI Agents with spend permissions to rebalance portfolios autonomously on Rootstock's secure layer."
/>

<FilterItem
  value="emerging"
  title="MCP Server Integration"
  subtitle="AI & Emerging"
  color="pink"
  linkHref="/use-cases/ai-emerging/mcp-server-setup/"
  linkTitle="View Guide"
  description="Connect AI models to Rootstock data using the Model Context Protocol (MCP) for real-time on-chain analysis."
/>

<FilterItem
  value="institutional"
  title="DAO-as-a-Service"
  subtitle="Governance"
  color="cyan"
  linkHref="/use-cases/institutional-governance/dao-rootstock-collective"
  linkTitle="View Guide"
  description="Launch on-chain governance systems and manage institutional treasuries via RootstockCollective."
/>

</Filter>

## 💡 Help Us Expand the Library

The Rootstock ecosystem is evolving with faster block times and parallel execution. If you have built a unique solution or want to see a specific guide added to this hub, we want to hear from you.

* [**Request a Use Case Guide**](https://github.com/rsksmart/devportal/issues)
* [**Submit an Idea on the Hacktivator Marketplace**](https://hacktivator-marketplace.rootstock.io/)
* [**Join the Discord Community**](https://discord.gg/rootstock)
