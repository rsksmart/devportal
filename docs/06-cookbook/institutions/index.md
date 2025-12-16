---
sidebar_position: 300
title: Institutions
sidebar_label: Institutions
tags: [rsk, rootstock, solutions, guides, tutorials, institutions]
description: "This section provides the architectural blueprints and security frameworks for financial institutions looking to deploy capital or offer Bitcoin DeFi services to their customers."
---

Welcome to the Institutional Hub. This section provides the architectural blueprints and security frameworks for financial institutions looking to deploy capital or offer Bitcoin DeFi services to their customers.

Rootstock offers the security of Bitcoin with the programmability of EVM smart contracts, creating a unique environment for **Institutional Bitcoin Investors (BTCFi)**.

We have tailored strategies for different institutional actors. Select your integration model below.

<!-- <div class="card-grid">

  <a href="/cookbook/institutions/distribution-partners" class="card">
    <h3>🤝 Distribution Partners</h3>
    <p><strong>Exchanges, Wallets & Custodians.</strong> Integrate the "Bitcoin Vault" directly into your user interface to offer white-labeled yield products to your customers.</p>
    <ul>
      <li>Vault SDK Integration</li>
      <li>White-label Yield UI</li>
    </ul>
  </a>

  <a href="/cookbook/institutions/liquidity-provision" class="card">
    <h3>🌊 Liquidity Providers</h3>
    <p><strong>Market Makers & Funds.</strong> Deploy capital into secure Lending & Borrowing protocols or provide liquidity to DEXs to earn swap fees and rewards.</p>
    <ul>
      <li>Market Making on Rootstock</li>
      <li>Institutional Lending Pools</li>
    </ul>
  </a>

</div> -->

## The Secure Yield Standard

Generate Organic Yield through protocol fees and lending demand, rather than inflationary token emissions.

### The Bitcoin Engine (rBTC)
For institutions holding Bitcoin on their balance sheet or on behalf of clients:
* **Yield Source:** The Bitcoin Vault (Phase 3 rBTC Strategy) generates yield through protocol-native lending and borrowing demand.
* **Security:** Anchored by the [PowPeg](/concepts/powpeg), which is secured by over 50% of Bitcoin's hashrate.
* **Integration:** [View the Vault Integration Guide](/developers/integrate/).

### The Dollar Engine (USDRIF)
For institutions seeking stablecoin yield or USD-denominated exposure:
* **Yield Source:** Demand for USDRIF borrowing drives value back to the ecosystem, creating sustainable stablecoin yield strategies.
* **Assets:** [USDRIF](/concepts/rif), [DOC (Dollar on Chain)](/concepts/rif), and USDT.

## Risk & Compliance Resources

Due diligence is critical for institutional deployment. Use these resources to evaluate the Rootstock security model.

* [**Audits & Bug Bounties**](/resources/) - *Comprehensive reports for the Bridge, Vaults, and core protocols.*
* [**The PowPeg Security Model**](/concepts/powpeg) - *Technical deep-dive into the 2-Way Peg architecture.*
* [**Network Stats**](http://stats.rootstock.io/) - *Real-time hashrate, TVL, and node distribution.*

## Infrastructure for Scale

Running institutional-grade services requires robust infrastructure.

| Component | Recommendation | Resource |
| :--- | :--- | :--- |
| **Nodes** | Run a dedicated Node for high throughput | [Run a Node](/node-operators/setup) |
| **Data Indexing** | Use The Graph for historical data queries | [The Graph Integration](/cookbook/developers/the-graph) |
| **Oracles** | Integration with API3, DIA, or Chainlink | [Oracle Providers](/cookbook/developers/oracles) |