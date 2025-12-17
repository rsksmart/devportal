---
sidebar_position: 300
title: The Institutional Hub
sidebar_label: Institutions & Partners
tags: [rsk, rootstock, solutions, guides, tutorials, institutions]
description: "Architectural blueprints and security frameworks for financial institutions looking to deploy capital or offer Bitcoin DeFi services."
---

This section provides the architectural blueprints and security frameworks for financial institutions looking to deploy capital or offer Bitcoin DeFi services to their customers.

Rootstock offers the security of Bitcoin with the programmability of EVM smart contracts, creating a unique environment for **Institutional Bitcoin Finance (BTCFi)**.

## Integration Models

We have tailored strategies for different institutional actors. Select your integration model below.

<CardsGrid>
  <CardsGridItem
    title="Distribution Partners"
    subtitle="Wallets & Custodians"
    color="green"
    description="Integrate the Bitcoin Vault SDK directly into your UI to offer white-labeled yield products to your customers."
    linkHref="/cookbook/institutions/integrate-vault/"
    linkTitle="View Integration Playbook"
  />
  <CardsGridItem
    title="Liquidity Providers"
    subtitle="Market Makers & Funds"
    color="cyan"
    description="Deploy capital into secure Lending & Borrowing protocols or provide liquidity to DEXs to earn swap fees."
    linkHref="/cookbook/institutions/liquidity-strategy/"
    linkTitle="View Capital Deployment"
  />
</CardsGrid>

## The Yield Strategies

Generate organic yield through protocol fees and lending demand.

### 1. Bitcoin Yield (rBTC)
For institutions holding Bitcoin on their balance sheet or on behalf of clients.
* **Yield Source:** The Bitcoin Vault generates yield through protocol-native lending and borrowing demand.
* **Security:** Anchored by the [PowPeg](/concepts/powpeg/), which is secured by over 60% of Bitcoin's hashrate.
* **Implementation:** [Integrate the rBTC Vault SDK](/cookbook/institutions/integrate-vault/).

### 2. Stablecoin Yield (USDRIF)
For institutions seeking stablecoin yield or USD-denominated exposure.
* **Yield Source:** Demand for USDRIF borrowing drives value back to the ecosystem.
* **Assets:** [USDRIF](/tokens/usdrif), [DOC (Dollar on Chain)](/tokens/doc), and USDT.

## Partner Resources

Technical guides for integrating the Vaults and managing data.

* [**Partner Integration Playbook**](/cookbook/institutions/integrate-vault/) - Best practices for Wallets and Custodians integrating the SDK.
* [**Vaults SDK Reference**](/cookbook/developers/vaults-sdk/) - Full technical documentation, methods, and installation (Developer Hub).
* [**Building a Yield Dashboard**](/cookbook/developers/yield-dashboard/) - Frontend patterns for displaying Vault stats.

## Risk & Compliance

Due diligence is critical for institutional deployment. Use these resources to evaluate the Rootstock security model.

* [**Audits & Bug Bounties**](/resources/security/audits/) - Comprehensive reports for the Bridge, Vaults, and core protocols.
* [**The PowPeg Security Model**](/concepts/powpeg/) - Technical deep-dive into the 2-Way Peg architecture.
* [**Network Stats**](http://stats.rootstock.io/) - Real-time hashrate, TVL, and node distribution.

## Infrastructure for Scale

Running institutional-grade services requires robust infrastructure.

| Component | Recommendation | Resource |
| :--- | :--- | :--- |
| **Nodes** | Run a dedicated Node for high throughput | [Run a Node](/node-operators/setup) |
| **Data Indexing** | Use The Graph for historical data queries | [The Graph Integration](/cookbook/developers/the-graph) |
| **Oracles** | Integration with API3, DIA, or Chainlink | [Oracle Providers](/cookbook/developers/oracles) |

:::info Contact Solutions Team
Looking to deploy significant capital or require a custom integration plan? 
[**Contact Institutional Sales**](https://rootstock.io/contact/) for partner onboarding and support.
:::