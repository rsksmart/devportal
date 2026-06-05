---
sidebar_label: Prism payment splits
sidebar_position: 3
title: Prism payment splits on Rootstock
description: "Split one Lightning or on-chain Bitcoin payment into multiple payouts. Prism uses Rootstock smart contracts for non-custodial settlement."
tags: [payments, lightning, geyser, prism, rootstock, bitcoin, payment-splits, rbtc]
---

[Geyser](https://geyser.fund/) is an open-source crowdfunding platform for Bitcoin, Lightning, and Nostr. **Geyser Prism** is its payment architecture for routing one incoming payment to multiple recipients.

**Prism** accepts Lightning or on-chain Bitcoin payments and applies your split rules. **Rootstock**, the EVM-compatible Bitcoin sidechain, settles each payout on chain. Geyser does not hold project funds in a central custodial wallet.

## Get started

Choose the path that matches your role.

**Run a project on Geyser**

1. Open [geyser.fund](https://geyser.fund/) and follow the [Geyser guide](https://guide.geyser.fund/) to configure your project wallet and withdrawals.
2. Save your wallet password offline. Geyser cannot recover it if you lose it.

**Build or fork a Bitcoin payment app**

1. Visit the [geyser repo on GitHub](https://github.com/geyserfund/geyser-app).
2. For custom settlement on Rootstock, use [Hardhat](/dev-tools/dev-environments/hardhat/) or [Foundry](/dev-tools/dev-environments/foundry/) with a [Rootstock RPC](/dev-tools/node-rpc/) endpoint on testnet first.

:::note[Third-party builders]

Prism ships on Geyser first. APIs and reuse outside Geyser may change. Check [geyser-app](https://github.com/geyserfund/geyser-app) release notes before you ship.

:::

## What problem Prism solves

Lightning is strong for single payments. Platforms often need one checkout to pay a seller, a fee, affiliates, or collaborators at once. Prism defines split rules for that case and runs payout distribution through Rootstock contracts after the incoming payment is accepted.

## How it works

One payment enters your app. Prism applies your split rules. Rootstock confirms each recipient’s share on chain.

<center>
  <img src="/img/use-cases/payments/prism-geyser-rootstock.png" alt="Diagram of one payment split into multiple payouts through Prism and Rootstock" title="Prism payment splits on Rootstock" width="80%" />
</center>

1. The payer uses **Lightning** or an **on-chain** path your app supports.
2. **Prism** maps the payment to your split rules (fees, shares, royalties).
3. **Rootstock** executes the split so each recipient gets the correct amount.

Wallet setup, withdrawals, and operator UI are documented on [guide.geyser.fund](https://guide.geyser.fund/), not on this page.

:::info[Why Rootstock]

Rootstock gives you EVM smart contracts secured by Bitcoin merge-mining. Prism uses that layer to enforce split rules on chain instead of trusting a single platform balance.

:::

:::warning[Project wallet password]

When you launch a Geyser project with Prism, you set a wallet password that encrypts your project key. Geyser does not store that password. If you lose it, you cannot withdraw project funds.

:::

## Example products

You are responsible for compliance, UX, and wallet policy in your jurisdiction. The table shows common fits for split payments.

| Product type | Split behavior |
| :--- | :--- |
| Multi-vendor marketplace | One payment to sellers, platform fee, royalties, affiliates |
| Agencies and freelancers | Client payment to lead, subcontractors, platform |
| Creator tips and subs | Share between creator, collaborators, platform |
| Affiliates and referrals | Commissions to referrers, seller, platform |
| Royalties | Fixed shares for artist, label, platform |
| DAOs and treasuries | Revenue to contributors, treasury, or governance rules |
| Charity | One donation across multiple causes plus overhead |
| Bounties and grants | Sponsor funds to winners when your rules are met |
| Bundled subscriptions | One charge split across providers in the bundle |

## Other payment guides on Rootstock

| Use case | Solution |
| :--- | :--- |
| Pay-per-request APIs for agents | [x402 on Rootstock](/use-cases/payments-assets/integrate-x402/) |
| Gas paid in ERC-20 | [RIF Relay](/developers/integrate/rif-relay/overview/) |
| BTC ↔ rBTC | [PowPeg App](/resources/guides/powpeg-app/) |
| Rootstock vs Lightning | [FAQs](/resources/faqs/) |

## Resources

* [Geyser](https://geyser.fund/) and [Geyser guide](https://guide.geyser.fund/)
* [geyser-app](https://github.com/geyserfund/geyser-app) (open source)
* [Prism announcement](https://x.com/geyserfund/status/2033944353912328460)

Have a unique idea or need a comprehensive integration guide? Submit an idea on the [Hacktivator Marketplace](https://hacktivator-marketplace.rootstock.io/).
