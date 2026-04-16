---
sidebar_position: 100
title: Bridge assets with Atlas
sidebar_label: Atlas Bridge
tags: [rsk, rootstock, bridge, atlas, flyover, powpeg]
description: "Bridge assets in and out of Rootstock with Atlas."
---

Atlas Bridge is a cross-chain bridge for the Rootstock ecosystem. You can use it to move assets between Rootstock and other supported networks.

- Peg-in means you move assets into Rootstock.
- Peg-out means you move assets out of Rootstock.

## Prerequisites
You need a wallet for the source network and a wallet address for the destination network. You also need enough balance to cover both transfer amount and fees.

Do not send funds from exchange deposit addresses. Use wallets you control.

## Getting Started
To get started, read [How to use Atlas Bridge](/resources/guides/atlas/getting-started-atlas/). Find and resolve common errors in the [FAQ](/resources/guides/atlas/faq/).

## Before you bridge
Atlas lets you compare provider routes, amounts, and estimated completion times before you connect a wallet. This helps you choose a route that matches your amount, speed target, and fee tolerance.

### Minimum Transaction Amounts
If Atlas shows no provider for your amount, your amount is often below a provider minimum.

| Provider | Minimum Peg-In | Minimum Peg-Out |
| :--- | :---: | ---: |
| Flyover - Teks | 0.00500001 BTC | 0.004 rBTC |
| Changelly | Equivalent of 30 USD | Equivalent of 30 USD |
| Boltz | 0.00001 BTC | 0.00001 rBTC |
| Native | 0.005 BTC | 0.004 rBTC |

:::tip[Tip]

For some providers, minimums do not include fees. Keep extra balance in the source wallet.
:::

### Mainnet
Available swaps on [Mainnet](https://atlas.rootstock.io/):

- rBTC → BTC (L1)
- BTC (L1) → rBTC
- rBTC → BTC (Lightning)
- BTC (Lightning) → rBTC
- ETH → rBTC
- USDT → rBTC
- USDC → rBTC
- WBTC → rBTC
- BNB → rBTC
- rBTC → ETH
- rBTC → USDT
- rBTC → USDC
- rBTC → BNB
- rBTC → WBTC

### Testnet
Available swaps on [Testnet](https://atlas.testnet.rootstock.io/):

- trBTC → BTC (L1)
- BTC (L1) → trBTC

## Expected Time & Confirmations
Bridging depends on source-chain confirmations and provider processing. Times below are estimates. Actual times vary with network conditions.

| Provider | Peg-In | Peg-Out |
| :--- | :---: | :---: |
| Flyover - Teks | 20m | 20m |
| Flyover - Rootstock | 20m | 20m |
| Changelly | 15m | 15m |
| Boltz | 1m | 5m |
| Native | 17h | 34h |

## Safety checks before confirmation
Use this checklist before you submit:
- Confirm source and destination networks.
- Confirm destination address on the correct chain.
- Confirm amount after fees.
- Keep the transaction hash for support and tracking.

## Where to Get Help
If you run into issues:
- Check the [FAQ](/resources/guides/atlas/faq/) first.
- Use [Rootstock Discord](https://rootstock.io/discord) for community help.
- Contact the team via [Rootstock Contact Us](https://rootstock.io/contact/).

## Resources

- [Get rBTC: Comprehensive Guide to Bridging to Rootstock](https://rootstock.io/blog/get-rbtc-comprehensive-guide-to-bridging-to-rootstock/)
- [Rootstock: the most secure and advanced Bitcoin layer](https://rootstock.io/technology/)
- [rBTC overview](https://rootstock.io/rbtc/)
- [Release Notes](https://github.com/rsksmart/bridge/releases)