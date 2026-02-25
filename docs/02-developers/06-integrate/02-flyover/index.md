---
sidebar_label: RBTC Flyover
sidebar_position: 100
title: RBTC Flyover - Overview
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The RBTC Flyover enables fast, trust-minimized onboarding of users into the Rootstock ecosystem from Bitcoin with less friction. It improves the usability for bitcoiners and integrators to interact with the Rootstock ecosystem via the Powpeg and Flyover SDK.
---


Its main goal is to accelerate getting into Rootstock from Bitcoin by significantly reducing the wait times associated with the current PowPeg. Developers, integrators, and Liquidity Providers (LPs) who want to offer rBTC access, cross-chain swaps, or liquidity can integrate the Flyover SDK. Visit the [LP integration section](/developers/integrate/flyover/LP/) to get started.

## Security and trust-minimization
Flyover preserves the PowPeg's trust-minimization model. User funds are never sent to the Liquidity Provider. On peg-in, the user's BTC goes to the PowPeg federation (a decentralized multi-signature entity). On peg-out, the user's rBTC is locked in the Liquidity Bridge Contract (smart contract), which releases BTC on Bitcoin. This design is important for institutional users who require custody and security.

## Features of the Flyover
* Flyover significantly reduces the time required to transfer BTC and rBTC between the Bitcoin and Rootstock networks.
* Trustless design: a pool of Liquidity Providers supplies liquidity, but user funds go to the federation (peg-in) or the smart contract (peg-out), never to the LP.
* Provides the same security guarantees as the Powpeg
* Customizable SDK for LPs and integrators 

:::info[Flyover SDK]

The [Flyover SDK](https://github.com/rsksmart/flyover-sdk) is currently available on Mainnet and Testnet. 
To convert RBTC to BTC and vice versa, use the PowPeg App.

:::

## Use Cases

Here are some of the use cases provided by the Flyover:

### For Developers

The Flyover offers a way for developers to integrate Flyover into wallets, dApps, DEXs and swaps using the Flyover SDK. 

**With Flyover:**
* Wallet or exchange platforms can integrate Flyover to offer faster depositing and withdrawing of BTC and rBTC within their platform using the Flyover LP network. Users can move funds between wallets and platforms without the long wait times of traditional peg-in.
* DeFi and Lending Platforms can integrate Flyover to allow users to easily deposit Bitcoin as collateral for borrowing assets on Rootstock. The faster peg-in times provided by Flyover would unlock borrowing opportunities for users who hold RBTC against other rootstock on-chain assets (MOC, USDRIF and others).

**Flyover offers;**

1. Streamlined and Customizable SDK Integration: The Flyover SDK provides developers with a user-friendly toolkit for integrating the Flyover functionalities into wallets, swaps, exchanges, and dApps, reducing development time and effort. The SDK can be configured to suit the user's needs.

2. Enhanced user experience: Integrators can offer faster Bitcoin–Rootstock transfers within their applications, with trust-minimization preserved (user funds go to the federation or smart contract, not to the LP).

3. Increased security: Flyover is built on top of the proven security of the PowPeg.

Want to integrate the Flyover in your Exchange, dApp, Wallet or DeFi platform? See the section on [how to Integrate Flyover SDK](/developers/integrate/flyover/sdk/).


### For Liquidity Providers (LP)
An LP supplies BTC and rBTC liquidity so Flyover can offer faster transfers. The LP does not receive or custody user funds; the federation receives peg-in BTC and the Liquidity Bridge Contract holds peg-out rBTC. LPs can be wallets, exchanges, aggregators, or institutions. See [LP Management](/developers/integrate/flyover/LP/management/) for more information.

**With Flyover, the LP can:** 
* Contribute to the growth of the Rootstock Ecosystem by joining the Flyover's network of LPs to ensure there's sufficient liquidity for users to transfer Bitcoin (BTC) between the Bitcoin network and Rootstock (RBTC) for their user base while also serving as LPs providing services to other users.
* Assume both roles as an integrator and an LP, or may limit themselves as LPs by configuring the SDK accordingly.

**Flyover Offers;**
* Reduced friction in the peg-in/out processes: Flyover reduces the friction in the current Powpeg time. It solves the 100 blocks confirmation friction required in the native Powpeg.  With Flyover, a minimum of 1-2 bitcoin block confirmation is needed instead (~20 minutes). Note that LPs can configure the number of blocks.

* Revenue potential: Flyover allows LPs to configure and earn revenue from users using their liquidity for BTC and RBTC transfers on the Flyover protocol. 

* Increased User Reach: By being a part of the Flyover network of LPs, LPs can gain access to a wider user base of Bitcoiners seeking to interact with the Rootstock ecosystem.

For more information, see [LP Onboarding](/developers/integrate/flyover/LP/) section.

:::tip[Ready to integrate Flyover into your platform or become a Liquidity Provider?]
[Contact the Flyover team](https://rootstock.io/contact/) to explore partnership opportunities and learn more about how you can contribute to the growth of the Rootstock ecosystem and integrate Flyover into your dApps.
:::

### Converting BTC to RBTC - General Users

Flyover is integrated in the [PowPeg App](http://powpeg.rootstock.io) which provides a user-friendly UI for Bitcoiners to use the native Rootstock PowPeg protocol to Peg in and out, as well as to easily perform trust-minimized BTC and RBTC transfers between Bitcoin and Rootstock using Flyover. See section on [Using the PowPeg App](/developers/integrate/flyover/powpeg/) to learn about how you can convert BTC - RBTC and vice versa.


## Resources
- [Release Notes](https://github.com/rsksmart/flyover-sdk/releases)
- [Flyover SDK](https://github.com/rsksmart/flyover-sdk)
- [Liquidity Provider Server](https://github.com/rsksmart/liquidity-provider-server?tab=readme-ov-file)
- [Liquidity Bridge Contract](https://github.com/rsksmart/liquidity-bridge-contract)
- [Flyover LBC Mainnet Contract Address](https://explorer.rootstock.io/address/0xaa9caf1e3967600578727f975f283446a3da6612)
- [Flyover LBC Testnet Contract Address](https://explorer.testnet.rootstock.io/address/0xc2a630c053d12d63d32b025082f6ba268db18300)
