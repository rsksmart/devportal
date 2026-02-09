---
sidebar_position: 8
title: Bridge tokens with Rootstock
sidebar_label: Super Bridge
tags: [rsk, rootstock, bridge]
description: "How to Bridge Tokens in and out of Rootstock?"
---

[Super Bridge](https://github.com/rsksmart/bridge) 

This platform is a cross-chain bridge designed for the Rootstock ecosystem. It provides a seamless way for users to move assets between Rootstock and other blockchain networks.

- Peg-In (Move In): Transfer assets from other chains (like Bitcoin) into the Rootstock network.

- Peg-Out (Move Out): Transfer your assets from Rootstock back to their native or other supported chains.

## User Interface (UI)
Our interface is built for maximum simplicity. You can explore all available exchange options, check rates, and view provider details before you even need to connect your wallet. This allows you to plan your transaction privately and securely.

### Minimum Transaction Amounts
If you are having trouble finding an available provider, it is likely because the amount you wish to transfer is below the minimum limit required by the providers.

To ensure a successful transaction, please verify that your amount meets the requirements in the table below:
| Provider | Minimum Peg-In | Minimum Peg-Out |
| :--- | :---: | ---: |
| Flyover - Teks | 0.00500001 BTC | 0.004 rBTC |
| Changelly | Equivalent of 30 USD| Equivalent of 30 USD |
| Boltz | 0.00001 BTC | 0.00001 rBTC |
| Native | 0.005 BTC | 0.004 rBTC |

### [Mainnet](https://bridge.rootstock.io/) available swaps

- rBTC → BTC (L1)
- BTC (L1) → rBTC
- rBTC → BTC (Lighting)
- BTC (Lighting) → rBTC
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

### [Testnet](https://bridge.testnet.rootstock.io/) available swaps

- trBTC → BTC (L1)
- BTC (L1) → trBTC

<details>
<summary>Configuration for contributors</summary>

## Prerequisites

- Node.js v22.16.0 or higher
- yarn v4.* or higher

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rsksmart/bridge.git
cd bridge
yarn
```

## Development

### Configure environment variables

Add file `.env.yarn` for installation of private packages
```bash
GITHUB_TOKEN=YOUR_GITHUB_TOKEN
NODE_OPTIONS= --max-old-space-size=8192
```
Add file `.env` with the content specifyed in [.env.example](https://github.com/rsksmart/bridge/blob/main/.env.example)

### Start the development server:

```bash
yarn dev
```

Suggested command to run before pushing a PR:
```bash
nvm use && yarn && yarn lint:fix && yarn build && yarn test && yarn dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173).

## Building for Production

To build the application for production:

```bash
yarn build
```

The built files will be in the `dist` directory.
</details>
