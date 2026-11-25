---
sidebar_label: Integrate
title: Integrate Rootstock Products into Your dApp
description: "Integrate RIF Relay, the rBTC Flyover, and RNS into your dApp on Rootstock. Pick the SDK for sponsored gas, fast BTC onboarding, or human-readable names."
tags: [rsk, rootstock, developers, integrate, sdk]
---

Rootstock offers three integration paths for dApps. Pick the one that matches the problem your users have:

- **RIF Relay:** Your users hold tokens but no rBTC for gas. RIF Relay lets them pay fees in tokens, or lets your dApp sponsor the fees.
- **rBTC Flyover:** Your users need rBTC from BTC without the PowPeg wait of about 17 hours. A Liquidity Provider advances the funds in 20 to 60 minutes.
- **RNS:** Your users struggle with long hex addresses. RNS resolves names such as `alice.rsk` to addresses.

## Start here

1. New to these products? Read the concepts first in [RIF Suite](/concepts/rif-suite/).
2. Ready to build? Open the integration guide for your product below.
3. Need test funds? Get testnet rBTC from the [Rootstock faucet](https://faucet.rootstock.io/).

````mdx-code-block
<Filter
values={[
{label: 'Gas sponsorship', value: 'relay'},
{label: 'BTC onboarding', value: 'flyover'},
{label: 'Names', value: 'rns'},
{label: 'SDK', value: 'sdk'}
]}>
<FilterItem
    value="relay"
    title="RIF Relay Overview"
    subtitle="RIF Relay"
    color="orange"
    linkHref="/developers/integrate/rif-relay/overview/"
    linkTitle="Read the overview"
    description="Learn how RIF Relay lets users pay transaction fees in tokens instead of rBTC."
  />
<FilterItem
    value="relay, sdk"
    title="Integrate RIF Relay"
    subtitle="RIF Relay"
    color="orange"
    linkHref="/developers/integrate/rif-relay/integrate/"
    linkTitle="Integrate RIF Relay"
    description="Add RIF Relay to your dApp and send sponsored or token-paid transactions."
  />
<FilterItem
    value="flyover"
    title="rBTC Flyover Overview"
    subtitle="Flyover"
    color="green"
    linkHref="/developers/integrate/flyover/"
    linkTitle="Read the overview"
    description="Compare Flyover with the PowPeg and learn how Liquidity Providers speed up BTC and rBTC transfers."
  />
<FilterItem
    value="flyover, sdk"
    title="Flyover SDK"
    subtitle="Flyover"
    color="green"
    linkHref="/developers/integrate/flyover/sdk/"
    linkTitle="Use the SDK"
    description="Use the Flyover JavaScript and TypeScript SDK to add peg-ins and peg-outs to your app."
  />
<FilterItem
    value="rns"
    title="RNS Overview"
    subtitle="RNS"
    color="purple"
    linkHref="/developers/integrate/rns/overview/"
    linkTitle="Read the overview"
    description="Learn how RNS maps human-readable names to Rootstock addresses."
  />
<FilterItem
    value="rns, sdk"
    title="RNS JavaScript SDK"
    subtitle="RNS"
    color="purple"
    linkHref="/developers/integrate/rns/js-sdk/"
    linkTitle="Use the SDK"
    description="Register, manage, and resolve RNS domains from JavaScript."
  />
</Filter>
````
