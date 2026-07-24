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

## How Atlas fits the stack

Atlas is a client of the RSK Swap API. The web UI and the SDK both request quotes from the same API. Providers execute the peg-in or peg-out route. Settlement lands on the destination network you selected.

| Orange | Pink | Cyan | Purple | Green | Solid | Dotted |
| --- | --- | --- | --- | --- | --- | --- |
| Source network | Atlas UI | SDK | API + providers | Destination | Primary path | Status / refund |

```mermaid
flowchart LR
  Source["Source network<br/>(BTC, LN, or EVM)"]

  subgraph Clients["Clients"]
    direction TB
    Atlas["Atlas Bridge UI"]
    SDK["RSK Swap SDK<br/>(dApps / wallets)"]
  end

  API["RSK Swap API<br/>+ providers"]
  Dest["Destination<br/>(often Rootstock)"]

  Source -->|"1. Choose amount<br/>and route"| Atlas
  Atlas -->|"2a. Quote / execute"| API
  SDK -->|"2b. Quote / execute"| API
  API -->|"3. Provider completes<br/>peg-in or peg-out"| Dest
  API -.->|"4. Status / refund path"| Source

  classDef source fill:#FFF0D9,stroke:#FF9100,stroke-width:2px,color:#1a1a1a
  classDef ui fill:#FCE4F6,stroke:#FF71E1,stroke-width:2px,color:#1a1a1a
  classDef sdk fill:#E0FFFA,stroke:#08FFD0,stroke-width:2px,color:#1a1a1a
  classDef api fill:#EDE7FF,stroke:#9E76FF,stroke-width:2px,color:#1a1a1a
  classDef dest fill:#E8F5D0,stroke:#79C600,stroke-width:2px,color:#1a1a1a

  class Source source
  class Atlas ui
  class SDK sdk
  class API api
  class Dest dest
```

UI and SDK are parallel clients. They do not call each other. Destination depends on direction: peg-in usually targets Rootstock; peg-out returns value to the source network.
Atlas compares provider routes before you connect a wallet. For programmatic quoting and swaps, use the RSK Swap SDK against the same API.

## Prerequisites
You need a wallet for the source network and a wallet address for the destination network. You also need enough balance to cover both transfer amount and fees.

Do not send funds from exchange deposit addresses. Use wallets you control.

## Getting Started
To get started, read [How to use Atlas Bridge](/resources/guides/atlas/getting-started-atlas/). Find and resolve common errors in the [FAQ](/resources/guides/atlas/faq/).

## Integrate with the RSK Swap SDK

[Atlas Bridge](https://atlas.rootstock.io) is the web interface for comparing provider routes before you connect a wallet. To quote and execute swaps from your own wallet, exchange, or dApp, use the [RSK Swap SDK](https://github.com/rsksmart/rsk-swap-sdk). The SDK calls the RSK Swap API. That API returns routes from third-party providers. Supported pairs and providers come from the API at request time. They can differ from the routes Atlas shows in the UI.

Install the package:

```bash
npm install @rsksmart/rsk-swap-sdk
```

The SDK estimates routes, reads swap limits, broadcasts EVM transactions through your connected wallet, and returns BIP21 or BOLT11 strings for Bitcoin and Lightning steps. Chain IDs identify EVM networks. Pass `BTC` for Bitcoin and `LN` for Lightning. Use `BTC` or `tBTC` to select mainnet or testnet on those networks. See the [RSK Swap SDK repository](https://github.com/rsksmart/rsk-swap-sdk) for setup, examples, and API reference.

### Store swap context securely

When you create a swap, the SDK returns a result object with a `context` field. That field holds provider-specific data for claiming or refunding the swap. Some providers include sensitive client-side material in `context`, such as keys for atomic swaps. The SDK generates this data in the browser or your app. It does not send `context` to the RSK Swap API.

Persist the full swap result in storage you control. Treat `context` as secret. Do not log it, cache it in plain text, or send it to analytics or support channels unless your runbook requires it.

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