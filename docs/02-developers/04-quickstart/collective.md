---
sidebar_position: 113
sidebar_label: Collective DAO
title: Collective DAO Starter Kit
description: Run the Rootstock Collective sample dApp with Wagmi, RainbowKit, staking, proposals, and voting. Setup steps live in the GitHub README.
tags: [quickstart, collective-sdk, dao, governance, rootstock, wagmi, rif]
---

This quick start points to the [Rootstock Collective starter kit](https://github.com/rsksmart/rootstock-collective-starter-kit), a sample dApp that uses [`@rsksmart/collective-sdk`](https://www.npmjs.com/package/@rsksmart/collective-sdk) for staking RIF, listing proposals, and voting on Rootstock Mainnet or Testnet.

## What you do here

Follow the **Setup** section in the repo README: clone, copy `.env` from `.env.example`, set the variables it describes, install, and run `npm run dev`. That README is the **only** canonical place for install commands and environment keys so they stay in sync with the kit.

## Prerequisites

- Node.js 18+
- A Reown (WalletConnect) project ID for the dApp (see README)
- Optional Rootstock RPC API key for higher rate limits (see README)
- A wallet on Rootstock (chain ID 30 or 31) with tRBTC for gas and RIF or stRIF as needed for flows you test

## After the app runs

For how SDK calls map to `src/` files, simulation before writes, governance UX edge cases, and a production checklist, use the use case guide:

- [Build DAO voting and RIF utility with the Collective SDK](/use-cases/integrate-rif-economy/build-dao-voting-collective-sdk/)

## References

- [rootstock-collective-starter-kit on GitHub](https://github.com/rsksmart/rootstock-collective-starter-kit)
- [Collective SDK source](https://github.com/rsksmart/collective-sdk)
- [Rootstock Collective app](https://app.rootstockcollective.xyz/)
