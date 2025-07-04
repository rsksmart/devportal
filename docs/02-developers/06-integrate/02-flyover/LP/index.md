---
sidebar_label: Liquidity Provider Onboarding
sidebar_position: 200
title: RBTC Flyover - LP Onboarding
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

A Liquidity Provider (LP) contributes funds in Rootstock (RBTC) and Bitcoin (BTC) to a liquidity pool. In exchange for providing this liquidity and facilitating trades between the two assets, LPs earn rewards (fees) generated from trading activity. 

> LPs can be individuals, institutions, exchanges, or aggregators. See [glossary](/developers/integrate/flyover/glossary/) section for explanation of terms.

This section outlines the key features and functionalities that Liquidity Providers (LPs) should be familiar with to effectively operate their Liquidity Provider Servers (LPS). The information provided encompasses both technical and operational aspects, making it a valuable resource for both LPs and those responsible for deploying the LPS environment.

## Requirements
* See minimum security requirements
* Configure environments
    - LPS Wallet
    - LPS environment
* Liquidity
    - The minimum required is the collateral amount (regardless of the amount of liquidity), which currently is 0.06 RBTC that needs to be paid during transaction registration. See [how to get RBTC](https://rootstock.io/rbtc/).

### Main Dependencies
The liquidity provider server has the following dependencies:
* Rootstock Node
* Bitcoin Node
* MongoDB instance

:::warning[Critical]

The Liquidity Provider Server (LPS) handles sensitive financial operations and relies on non-public functionalities of the Rootstock and Bitcoin networks. To mitigate the risk of fund loss, it is imperative to use dedicated, private nodes with stringent security measures. **Public or inadequately secured nodes are strongly discouraged and could result in funds loss.**

:::

## Benefits of becoming an LP

There are several benefits for LPs:

* Accelerated Transaction Speeds: Flyover drastically reduces transaction times by minimizing required block confirmations, increasing efficiency and providing an enhanced user experience.
* Expanded User Base: By joining the Flyover network, LPs gain access to a broader market of Bitcoin users seeking to interact with the Rootstock ecosystem.
* Enhanced Revenue Opportunities: Flyover enables LPs to generate increased revenue through transaction fees by providing liquidity for the growing number of users.
* Versatility: LPs have the flexibility to integrate Flyover into their existing platforms or operate solely as liquidity providers, adapting to their specific business needs.
* Contribution to Ecosystem Growth: LPs play a pivotal role in expanding the Rootstock ecosystem by ensuring sufficient liquidity for seamless Bitcoin-Rootstock transfers.

## Fees
When using the Flyover protocol, two fees apply:
* Network Fee: A fee charged by the Rootstock network to cover transaction processing costs (gas). See the [Gas](/concepts/rbtc/gas/) section for how the gas fee is calculated.
* Liquidity Provider (LP) Fee: A fee paid to the Liquidity Provider who facilitates the transaction. This fee is configurable and can vary based on the LP's chosen settings.

## Security
See the [minimum security requirements](https://github.com/rsksmart/liquidity-provider-server/blob/master/docs/LP-Management.md#minimum-security-requirements).

## Resources
<!-- - [Release Notes](https://github.com/rsksmart/unified-bridges-sdk/releases)
- [Flyover SDK](https://github.com/rsksmart/unified-bridges-sdk/tree/main/packages/flyover-sdk) -->
- [Liquidity Provider Server](https://github.com/rsksmart/liquidity-provider-server?tab=readme-ov-file)
- [Liquidity Bridge Contract](https://github.com/rsksmart/liquidity-bridge-contract)
- [Flyover LBC Mainnet Contract Address](https://explorer.rootstock.io/address/0xaa9caf1e3967600578727f975f283446a3da6612)
- [Flyover LBC Testnet Contract Address](https://explorer.testnet.rootstock.io/address/0xc2a630c053d12d63d32b025082f6ba268db18300)