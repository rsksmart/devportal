---
sidebar_position: 300
sidebar_label: FAQ
title: "Frequently Asked Questions (FAQs)"
description: "Frequently asked questions about the Atlas Bridge App."
tags: [rsk, rootstock, bridge, atlas, flyover, powpeg]
---

## What is Atlas Bridge?

Atlas Bridge is a cross-chain bridge for Rootstock. It helps you move supported assets between Rootstock and other supported networks.

- Peg-in means you move assets into Rootstock.
- Peg-out means you move assets out of Rootstock.

## Which networks and assets does Atlas support?
Support depends on provider availability and network conditions. Check the current supported pairs in the Atlas interface and in the [Atlas guide](/resources/guides/atlas/).

## What is rBTC?

rBTC is the Bitcoin-pegged native asset on Rootstock. You use it for gas and dApp interactions on Rootstock.

## Is my BTC safe when using Atlas Bridge?

BTC bridged through Rootstock-native routes uses the PowPeg mechanism. Third-party routes have their own trust and risk model. Always review provider details before you confirm a transaction.

## How long does the bridging process take?

The process depends on confirmations and provider processing time. It can take minutes or hours depending on route and network load.

| Provider | Peg-In | Peg-Out |
| :--- | :---: | :---: |
| Flyover - Teks | 20m | 20m |
| Flyover - Rootstock | 20m | 20m |
| Changelly | 15m | 15m |
| Boltz | 1m | 5m |
| Native | 17h | 34h |

## Why do I need to wait for Bitcoin confirmations?

Bitcoin confirmations reduce reversal risk before assets are released on the destination side. This step is required.

## Can I send BTC from an exchange?

**No.** You should only send BTC from a wallet **you fully control**. Sending BTC from an exchange may result in loss of funds.

## What wallets are supported?

You need:

* A **Bitcoin wallet** you control to send BTC
* A **Rootstock-compatible wallet** (e.g., MetaMask configured for Rootstock) to receive and use rBTC

Always follow the bridge UI instructions for supported wallets.

## What fees should I expect?

You may encounter:

* Bitcoin network fees (miners’ fees)
* Destination-chain gas fees
* Provider service fees and spread

All applicable fees are displayed before you confirm the transaction.

## Can I cancel a bridge transaction?

No. Once a Bitcoin transaction is broadcast to the network, it **cannot be reversed or canceled**. Always double-check details before confirming.

## What happens if I close the browser during the process?

Your transaction will **continue on-chain**. You can return to the bridge later and check the status using your wallet or transaction hash.

## What should I do if something goes wrong?

If the transaction is still pending, wait for the expected confirmation window first. If you still think there is a problem:

* Check the transaction status on the Bitcoin blockchain
* Check destination-chain transaction status
* Review bridge UI messages for provider-specific next steps
* Contact support with transaction hash, provider name, and timestamp

## Where can I learn more?

* Official Rootstock [documentation](https://dev.rootstock.io/)
* Join community support on [Rootstock Discord](https://rootstock.io/discord)
* Reach out through [Rootstock Contact Us](https://rootstock.io/contact/)
