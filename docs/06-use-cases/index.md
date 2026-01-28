---
sidebar_position: 1
title: Use Cases
sidebar_label: Overview
tags: [rsk, rootstock, use cases, solutions, guides, tutorials, institutions, users, developers]
description: "Real-world implementation guides for building on Rootstock."
---

Welcome to the Rootstock **Use Cases Library**. This hub is designed to help you move from an idea to a live implementation. Each use case provides a conceptual overview, technical prerequisites, and a step-by-step integration guide. It solves the dev dilemma: What can I build for my users?. 

## Explore by Use Cases

Use the interactive filters below to find the specific guide for your development goal.

<Filter
values={[
  {label: 'Governance', value: 'govern'},
  {label: 'Generate Yield', value: 'btcfi'},
  {label: 'Onboard Users', value: 'ux'},
  {label: 'Build AI Agents', value: 'agents'},
  {label: 'Bridge Assets', value: 'interop'},
  {label: 'Automate Payments', value: 'payments'}
]}>

<FilterItem
  value="btcfi"
  title="Deploying Your First Organic Yield Vault"
  subtitle="BTCFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance/yield-vaults"
  linkTitle="View Guide"
  description="Build an ERC-4626 compliant yield engine using the Rootstock Vaults SDK."
/>

<FilterItem
  value="btcfi"
  title="Building Automated Yield Vaults"
  subtitle="BTCFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance/automate-yield-vault"
  linkTitle="View Guide"
  description="Learn to build and manage automated yield strategies on Bitcoin using the Rootstock Vaults SDK."
/>

<FilterItem
  value="interop"
  title="Building Multi-Chain dApps with Super Bridge"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/integrate-super-bridge-sdk"
  linkTitle="View Guide"
  description="Enable secure movement of assets between Bitcoin and Rootstock using the Super Bridge SDK."
/>

<FilterItem
  value="interop"
  title="Build Omnichain Fungible Token (OFTs) with Layerzero"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/rootstock-layerzero"
  linkTitle="View Guide"
  description="Implement cross-chain token transfers using OFT between Rootstock and Ethereum Sepolia via LayerZero."
/>

<FilterItem
  value="ux"
  title="Smart Wallet Onboarding with Para SDK"
  subtitle="Onboarding"
  color="green"
  linkHref="/use-cases/onboarding-ux/smart-wallet-para-sdk"
  linkTitle="View Guide"
  description="Remove seed phrases and gas hurdles using Para SDK's MPC-based social login and Account Abstraction on Rootstock."
/>

<FilterItem
  value="agents"
  title="Conversational AI Agent with Blockchain Actions"
  subtitle="AI Agents"
  color="pink"
  linkHref="/use-cases/ai-agents/ai-agent-rootstock"
  linkTitle="View Guide"
  description="Build a dApp that connects a conversational AI agent to Rootstock testnet for DeFi actions via chat."
/>

<FilterItem
  value="agents"
  title="Integrating SDK Logic into Agentic Workflows"
  subtitle="AI Agents"
  color="pink"
  linkHref="/use-cases/ai-agents/integrate-rootstock-sdk"
  linkTitle="View Guide"
  description="Equip your AI agents with the eyes to read the chain and the hands to execute Bitcoin-native transactions."
/>

<FilterItem
  value="govern"
  title="On-Chain Voting with Collective SDK"
  subtitle="Governance"
  color="cyan"
  linkHref="/use-cases/govern-communities/onchain-voting-collective-sdk"
  linkTitle="View Guide"
  description="A guide to staking RIF, minting stRIF, and voting on ecosystem proposals."
/>

<FilterItem
  value="payments"
  title="Agentic Commerce with x402 Payment Standard"
  subtitle="Payments & Assets"
  color="orange"
  linkHref="/use-cases/payments-assets/agentic-commerce"
  linkTitle="View Guide"
  description="Utilize the x402 standard to enable autonomous fund deposits and automated settlements for AI agents on Rootstock."
/>

<FilterItem
  value="payments"
  title="Mocking Stablecoins (USDT0) for Testnet"
  subtitle="Payments & Assets"
  color="orange"
  linkHref="/use-cases/payments-assets/stablecoin-mock-usdt0"
  linkTitle="View Guide"
  description="Simulate USDT0 and USDRIF liquidity to harden your financial logic and test protocol stability on the Rootstock Testnet."
/>

</Filter>

## Expand the Library

The Rootstock ecosystem is evolving with faster block times and parallel execution. If you have built a unique solution or want to see a specific guide added to this hub, we want to hear from you.

* [**Request a Use Case Guide**](https://github.com/rsksmart/devportal/issues)
* [**Submit an Idea on the Hacktivator Marketplace**](https://hacktivator-marketplace.rootstock.io/)
* [**Join the Discord Community**](https://discord.gg/rootstock)
