---
sidebar_position: 4
sidebar_label: Compliance Reporting
title: Generating Compliance-Ready Audit Reports
description: "How to use Rootstock indexing tools to generate verified transaction logs for tax and regulatory audits." 
tags: [compliance, audit, institutional, data]
---

Institutional users require verified, immutable logs of all on-chain activity. This guide explains how to extract and format Rootstock data for regulatory submissions.

## Prerequisites
* **Indexing Service:** Access to [The Graph](https://thegraph.com/explorer/subgraph/rsksmart/rootstock-subgraph) or a local Rootstock node.
* **Data Tools:** Python or JavaScript for post-processing JSON logs into CSV/PDF formats.

## Getting Started

### 1. Querying Historical Data
Use GraphQL to pull specific transaction histories for your institutional Safe or wallet.

```graphql
{
  transactions(where: { from: "YOUR_SAFE_ADDRESS" }) {
    id
    value
    timestamp
    gasUsed
  }
}
```

### 2. Verifying Transaction Finality
For compliance, you must prove that a transaction is irreversible. On Rootstock, "Deep Finality" is achieved after a certain number of block confirmations (~100 blocks for absolute certainty). Use a block explorer API to attach "Block Confirmation" metadata to your reports.

## Troubleshooting
- Missing Events: If you are querying smart contract events (e.g., Deposit), ensure your indexing service has fully synced to the current block height.

- Price Conversion: When reporting dollar values, use a historical price oracle (like CoinGecko API) to map the rBTC/USD price to the exact timestamp of the transaction.

## Related Use Cases or Resources
- Rootstock Explorer API

- Institutional Custody Setup