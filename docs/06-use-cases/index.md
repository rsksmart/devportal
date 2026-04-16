---
sidebar_position: 1
title: Use Cases
sidebar_label: Overview
tags: [rsk, rootstock, use cases, solutions, guides, tutorials, institutions, users, developers]
description: "Implementation guides for building and integrating on Rootstock."
---

The **Use Cases** hub groups tasks you can ship: onboarding, bridging, automation, governance, and payments. Each published guide states prerequisites, flags risks where they matter, and walks through concrete steps for integration on Rootstock.

:::note[Expand the library]

If you want a new guide in this hub, use the links below.

* Request a use case article using the Request Article on the right navigation options on this page.
* [**Submit an Idea on the Hacktivator Marketplace**](https://hacktivator-marketplace.rootstock.io/)
* [**Rootstock Discord**](https://discord.gg/rootstock)

:::

## Explore by use case

Use the filters to narrow by goal. Links go only to **published** guides or section overviews.

<Filter
values={[
  {label: 'Generate Yield', value: 'btcfi'},
  {label: 'Onboard Users', value: 'ux'},
  {label: 'Automation and AI', value: 'agents'},
  {label: 'Bridge Assets', value: 'interop'},
  {label: 'RIF economy and governance', value: 'rif'},
  {label: 'Payments', value: 'payments'}
]}>

<FilterItem
  value="btcfi"
  title="Generate Yield"
  subtitle="BTCFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance-yield/"
  linkTitle="View section"
  description="How Rootstock fits BTCFi, rBTC, and vault-related work. See Generate Yield for the USDRIF Vaults SDK walkthrough."
/>

<FilterItem
  value="interop"
  title="Bridge Assets"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/"
  linkTitle="View section"
  description="Peg-in, peg-out, liquidity routes, and cross-chain messaging. End-user peg flows live under Resources. Atlas Bridge SDK tutorial is not on the portal yet."
/>

<FilterItem
  value="interop"
  title="Build Omnichain Fungible Tokens (OFTs) with LayerZero"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/rootstock-layerzero/"
  linkTitle="View guide"
  description="Cross-chain token transfers between Rootstock and Ethereum Sepolia using LayerZero OFT."
/>

<FilterItem
  value="ux"
  title="Getting Started with Para"
  subtitle="Onboarding"
  color="green"
  linkHref="/use-cases/onboarding-ux/para/"
  linkTitle="View guide"
  description="Para SDK provider setup, Rootstock testnet config, and modal options for social login and external wallets."
/>

<FilterItem
  value="ux"
  title="Internet-Free DeFi with USSD"
  subtitle="Onboarding"
  color="green"
  linkHref="/use-cases/onboarding-ux/ussd-rootstock-defi/"
  linkTitle="View guide"
  description="Relay server and smart contract pattern for feature-phone users on GSM networks without mobile data."
/>

<FilterItem
  value="agents"
  title="Conversational App with On-Chain Actions"
  subtitle="Automation and AI"
  color="pink"
  linkHref="/use-cases/ai-automation/ai-agent-rootstock/"
  linkTitle="View guide"
  description="Connect a chat-style UI to Rootstock testnet for balance checks and simple transactions."
/>

<!-- <FilterItem
  value="agents"
  title="Integrate SDK Logic into Agent Workflows"
  subtitle="Automation and AI"
  color="pink"
  linkHref="/use-cases/ai-automation/integrate-rootstock-sdk/"
  linkTitle="View guide"
  description="Wire Rootstock SDK layers so automation can read chain state and submit guarded transactions."
/> -->

<FilterItem
  value="agents"
  title="Model Context Protocol (MCP) on Rootstock"
  subtitle="Automation and AI"
  color="pink"
  linkHref="/use-cases/ai-automation/mcp-rootstock/"
  linkTitle="View guide"
  description="How MCP connects AI clients to Rootstock reads and scoped actions."
/>

<FilterItem
  value="btcfi"
  title="DeFi tutorials (AMM + oracles)"
  subtitle="DeFi"
  color="orange"
  linkHref="/use-cases/defi/"
  linkTitle="View section"
  description="Practical Rootstock testnet tutorials for a constant-product AMM and a mock Chainlink-style oracle consumer."
/>

<FilterItem
  value="rif"
  title="DAO Voting with the Collective SDK"
  subtitle="RIF economy and governance"
  color="green"
  linkHref="/use-cases/integrate-rif-economy/build-dao-voting-collective-sdk/"
  linkTitle="View guide"
  description="Stake RIF, read proposals, simulate writes, and vote using the Collective SDK."
/>

<FilterItem
  value="payments"
  title="Automate Payments"
  subtitle="Payments"
  color="orange"
  linkHref="/use-cases/payments-assets/"
  linkTitle="View section"
  description="Tokens, rBTC settlement, and programmable payment patterns. Dedicated use-case guides for mocks and agentic commerce are in draft."
/>

<FilterItem
  value="payments"
  title="Integrating x402 Payments with Rootstock"
  subtitle="Tutorials"
  color="orange"
  linkHref="/resources/tutorials/integrate-x402/"
  linkTitle="View tutorial"
  description="HTTP 402 style pay-per-use APIs on Rootstock (Resources tutorial)."
/>
</Filter>
