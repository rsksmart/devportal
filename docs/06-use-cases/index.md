---
sidebar_position: 1
title: Use Cases
sidebar_label: Overview
tags: [rsk, rootstock, use cases, solutions, guides, tutorials, developers]
description: "Implementation guides for building and integrating on Rootstock."
---

The **Use Cases** hub groups implementation guides by goal: **Bitcoin DeFi**, **Bridge**, **Onboard**, **Pay**, and **AI**. Each guide lists prerequisites, expected outcomes, and risks where they apply.

:::note[Contribute a guide]

To propose a new guide, use the links below.

* [**Submit a Docs / Tooling Idea on the Hacktivator Marketplace**](https://hacktivator-marketplace.rootstock.io/)
* [**Join the Rootstock Discord**](https://discord.gg/rootstock)

:::

## Browse by use case

Use the filters to narrow by goal. Links go to published guides or section overviews.

<Filter
values={[
  {label: 'Bitcoin DeFi', value: 'btcfi'},
  {label: 'Bridge', value: 'interop'},
  {label: 'Onboard', value: 'ux'},
  {label: 'Pay', value: 'payments'},
  {label: 'AI', value: 'agents'},
  {label: 'RIF economy and governance', value: 'rif'}
]}>

<FilterItem
  value="btcfi"
  title="Bitcoin DeFi"
  subtitle="Bitcoin DeFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance-yield/"
  linkTitle="View section"
  description="Lending, vaults, and stablecoin flows with rBTC and on-chain assets."
/>

<FilterItem
  value="btcfi"
  title="Rootstock DeFi developer guide"
  subtitle="Foundations"
  color="orange"
  linkHref="/resources/guides/defi-developer-guide/"
  linkTitle="View guide"
  description="Token standards, security patterns, and protocol basics for DeFi on Rootstock."
/>

<FilterItem
  value="btcfi"
  title="Integrate USDRIF Vault on Rootstock"
  subtitle="Bitcoin DeFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance-yield/yield-vaults-sdk/"
  linkTitle="View guide"
  description="Use the Vaults SDK and viem to read vault state, approve USDRIF, and deposit with slippage protection."
/>

<FilterItem
  value="btcfi"
  title="Cross-Chain rBTC Lending with USDT0"
  subtitle="Bitcoin DeFi"
  color="orange"
  linkHref="/use-cases/btcfi-finance-yield/cross-chain-lending-rbtc/"
  linkTitle="View guide"
  description="Deploy an over-collateralized lending protocol on Rootstock with LayerZero cross-chain collateral and oracle routing."
/>

<FilterItem
  value="btcfi"
  title="Constant-product AMM tutorial"
  subtitle="Bitcoin DeFi"
  color="orange"
  linkHref="/use-cases/interoperability/amm-constant-product/"
  linkTitle="View guide"
  description="Rootstock testnet tutorial for a constant-product AMM and pool interactions."
/>

<FilterItem
  value="interop"
  title="Bridge"
  subtitle="Bridge"
  color="cyan"
  linkHref="/use-cases/interoperability/"
  linkTitle="View section"
  description="Peg-in, peg-out, liquidity routes, and cross-chain messaging."
/>

<FilterItem
  value="interop"
  title="Build Omnichain Fungible Tokens (OFTs) with LayerZero"
  subtitle="Bridge"
  color="cyan"
  linkHref="/use-cases/interoperability/rootstock-layerzero/"
  linkTitle="View guide"
  description="Cross-chain token transfers between Rootstock and Ethereum Sepolia using LayerZero OFT."
/>

<FilterItem
  value="interop"
  title="Cross-Chain Swaps on Rootstock with Symbiosis Finance"
  subtitle="Interoperability"
  color="cyan"
  linkHref="/use-cases/interoperability/integrate-symbiosis/"
  linkTitle="View guide"
  description="Integrate Symbiosis into your Rootstock dApp for cross-chain liquidity, swaps."
/>

<FilterItem
  value="interop"
  title="Omnichain Liquidity Routing with LI.FI"
  subtitle="Bridge"
  color="cyan"
  linkHref="/use-cases/interoperability/integrate-lifi/"
  linkTitle="View guide"
  description="Integrate LI.FI into your Rootstock dApp for single-transaction cross-chain liquidity."
/>

<FilterItem
  value="ux"
  title="Onboard"
  subtitle="Onboard"
  color="green"
  linkHref="/use-cases/onboarding-ux/"
  linkTitle="View section"
  description="Wallet connection, social login, and low-connectivity onboarding patterns."
/>

<FilterItem
  value="ux"
  title="Getting Started with Para"
  subtitle="Onboard"
  color="green"
  linkHref="/use-cases/onboarding-ux/para/"
  linkTitle="View guide"
  description="Para SDK provider setup, Rootstock testnet config, and modal options for social login and external wallets."
/>

<FilterItem
  value="ux"
  title="Internet-Free DeFi with USSD"
  subtitle="Onboard"
  color="green"
  linkHref="/use-cases/onboarding-ux/ussd-rootstock-defi/"
  linkTitle="View guide"
  description="Relay server and smart contract pattern for feature-phone users on GSM networks without mobile data."
/>

<FilterItem
  value="agents"
  title="AI"
  subtitle="AI"
  color="pink"
  linkHref="/use-cases/ai-automation/"
  linkTitle="View section"
  description="MCP server setup and agent patterns for on-chain reads and actions."
/>

<FilterItem
  value="agents"
  title="Conversational App with On-Chain Actions"
  subtitle="AI"
  color="pink"
  linkHref="/use-cases/ai-automation/ai-agent-rootstock/"
  linkTitle="View guide"
  description="Connect a chat-style UI to Rootstock testnet for balance checks and simple transactions."
/>

<FilterItem
  value="agents"
  title="Model Context Protocol (MCP) on Rootstock"
  subtitle="AI"
  color="pink"
  linkHref="/use-cases/ai-automation/mcp-rootstock/"
  linkTitle="View guide"
  description="How MCP connects AI clients to Rootstock reads and scoped actions."
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
  title="Pay"
  subtitle="Pay"
  color="orange"
  linkHref="/use-cases/payments-assets/"
  linkTitle="View section"
  description="Programmable payments, splits, and pay-per-use APIs on Rootstock."
/>

<FilterItem
  value="payments"
  title="Integrating x402 Payments with Rootstock"
  subtitle="Pay"
  color="orange"
  linkHref="/use-cases/payments-assets/integrate-x402/"
  linkTitle="View tutorial"
  description="HTTP 402 pay-per-use APIs on Rootstock."
/>

<FilterItem
  value="payments"
  title="Prism payment splits"
  subtitle="Pay"
  color="orange"
  linkHref="/use-cases/payments-assets/prism-payment-splits/"
  linkTitle="View guide"
  description="Split one Lightning or on-chain Bitcoin payment into multiple non-custodial payouts on Rootstock."
/>
</Filter>
