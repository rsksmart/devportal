---
sidebar_label: FAQs
sidebar_position: 250  
title: Frequently Asked Questions  
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]  
description: Frequently asked questions about the rBTC Flyover.
---

Here you can find a list of frequently asked questions (FAQs) about the rBTC Flyover.

## General

### What is rBTC Flyover?

rBTC Flyover is a protocol built on the Rootstock PowPeg that speeds up BTC–rBTC transfers using a pool of Liquidity Providers (LPs) while preserving trust-minimization. User funds never go to the LP. On peg-in, the PowPeg federation (a decentralized multi-signature entity) receives the user's BTC. On peg-out, the Liquidity Bridge Contract (smart contract) receives and releases the user's rBTC. Flyover offers faster transfer times with minimal confirmations while inheriting the PowPeg's security model.

### How does Flyover compare to the traditional PowPeg?

The PowPeg requires a 100-block confirmation period for security, so transfer times are around 16 hours. Flyover can be configured by the Liquidity Provider to use as few as 2 Bitcoin block confirmations for peg-in, reducing transfer times to about 10–20 minutes. For peg-outs, LPs wait for 2 Bitcoin block confirmations before receiving a refund.

### Is Flyover secure?

Yes. Flyover is built on the PowPeg and inherits the same security guarantees. Trust-minimization is preserved: in both peg-in and peg-out, a decentralized entity receives the funds. On peg-in, the federation receives the user's BTC. On peg-out, the smart contract (Liquidity Bridge Contract) holds and releases the funds. The Liquidity Provider never receives or holds custody of user funds. This design is relevant for institutional users who require clear custody and security.

## For Developers

### How can I integrate Flyover in my dApp?

Integrating Flyover into your application is straightforward using the Flyover SDK. This developer-friendly toolkit provides the necessary tools and code samples needed to easily integrate Flyover features and functionalities. See [how to get started with the SDK integration](/developers/integrate/flyover/sdk/).

### What are the benefits of using Flyover in my dApp?

By integrating Flyover, you offer your users an enhanced user experience with significantly faster Bitcoin-Rootstock transfers. This can attract more users and increase engagement with your platform.

### Is the Flyover SDK customizable?

Yes, the Flyover SDK provides customization options to tailor the integration to your specific application requirements. You can configure various parameters to fit your user needs.

## For Liquidity Providers

### How do I become a Liquidity Provider?

To become a Liquidity Provider (LP), you'll need to set up and run the Liquidity Provider Service (LPS). Once the LPS is operational, it will automatically register itself with the configured wallet address. See [how to get started as an LP](/developers/integrate/flyover/LP/get-started/).

### What is the minimum recommended amount of liquidity?

The minimum required collateral is **0.06 rBTC**, regardless of the total liquidity provided. This collateral is paid upon transaction registration. The recommended amount of liquidity depends on the anticipated volume of concurrent operations the LP wishes to support. A higher liquidity level enables the LP to handle more transactions simultaneously.

Note: For peg outs, LPs will need to wait for 2 Bitcoin block confirmations before receiving a refund.

### Can I become both an integrator and a Liquidity Provider?

Yes, you can integrate Flyover into your platform and simultaneously act as a Liquidity Provider. This allows you to benefit from both sides of the system by maintaining control over liquidity management, potentially reducing costs, and creating synergies within your platform. To achieve this, integrate the Flyover SDK, configure your own LPS, and direct user transactions to your LPS within your platform's code.

### What are the benefits of being a Liquidity Provider?

As a liquidity provider, you contribute to the growth of the Rootstock ecosystem while earning fees on every transfer facilitated through your liquidity. You also gain exposure to a wider user base.

### Are there any risks associated with being a Liquidity Provider?

To safeguard against financial loss, Liquidity Providers are responsible for the security of their wallets and private keys. For detailed guidelines, refer to the sections on [Wallet Management](/developers/integrate/flyover/LP/management/) and the Security Requirements.

## For Users - Converting BTC to rBTC and vice versa

### How can I use Flyover to transfer BTC to rBTC?

The easiest way to use Flyover is through the PowPeg. This user-friendly interface guides you through the transfer process, allowing you to quickly and securely convert your BTC to rBTC.

### Does it cost money to use the PowPeg?

The Flyover protocol maintains consistent fees across all integrated applications including the [PowPeg App](/resources/guides/powpeg-app/). Fee variations arise primarily from the specific Liquidity Provider (LP) chosen and the network transaction fees.

### Why is Flyover improving the user experience for the PowPeg?

Flyover significantly enhances the user experience by reducing the wait times for Bitcoin-Rootstock transfers from hours to minutes. This makes interacting with the Rootstock ecosystem much more convenient and efficient.
