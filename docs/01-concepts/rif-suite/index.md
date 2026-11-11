---
sidebar_label: RIF Suite
title: RIF Suite
description: "Learn what each RIF Suite product does on Rootstock: the RIF token, the rBTC Flyover, RNS names, and RIF Relay. Find the right concept page before you build."
tags: [rsk, rootstock, concepts, rif]
---

The Rootstock Infrastructure Framework (RIF) Suite is a set of open source tools for building on Rootstock. Use this page to find the product that fits your use case:

- **RIF token:** The utility token for RIF services. Stake RIF to mint stRIF and vote in the RootstockCollective DAO.
- **rBTC Flyover:** A fast bridge between BTC and rBTC. Liquidity Providers advance funds so users skip the PowPeg wait.
- **RNS:** The RIF Name Service maps human-readable names such as `alice.rsk` to addresses.
- **RIF Relay:** A sponsored transaction system. Users pay gas in tokens other than rBTC, or a dApp pays for them.

## Start here

1. Read the concept page for the product you need below.
2. Ready to build? Go to [Integrate](/developers/integrate/) for SDKs and integration guides.

````mdx-code-block
<Filter
values={[
{label: 'Token', value: 'token'},
{label: 'Bridge', value: 'flyover'},
{label: 'Names', value: 'rns'},
{label: 'Gas', value: 'relay'}
]}>
<FilterItem
    value="token"
    title="RIF Token"
    subtitle="Token"
    color="orange"
    linkHref="/concepts/rif-suite/token/"
    linkTitle="Learn about RIF"
    description="Token details, where to get RIF, and how staking for stRIF works."
  />
<FilterItem
    value="flyover"
    title="rBTC Flyover"
    subtitle="Bridge"
    color="green"
    linkHref="/concepts/rif-suite/flyover/"
    linkTitle="Learn about Flyover"
    description="How Flyover moves BTC to rBTC faster than the PowPeg."
  />
<FilterItem
    value="rns"
    title="RIF Name Service (RNS)"
    subtitle="Names"
    color="purple"
    linkHref="/concepts/rif-suite/rns/"
    linkTitle="Learn about RNS"
    description="How RNS replaces long addresses with readable names."
  />
<FilterItem
    value="relay"
    title="RIF Relay"
    subtitle="Gas"
    color="orange"
    linkHref="/concepts/rif-suite/relay/"
    linkTitle="Learn about RIF Relay"
    description="How RIF Relay sponsors transactions and accepts token fees."
  />
</Filter>
````
