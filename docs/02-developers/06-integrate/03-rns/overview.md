---
sidebar_label: Overview
sidebar_position: 100
title: RIF Name Service(RNS) - Overview
description: RNS Overview.
tags: [rns, rif, rootstock, wallet, integrate, integration guide, domain name service]
---
import Card from '/src/components/Card'

RIF Name Service (RNS) is a decentralised service that allows users to register and manage human-readable domain names on the blockchain. It is part of the [Rootstock Infrastructure Framework (RIF)](https://rif.technology/) and is designed to simplify the use of blockchain addresses by replacing complex alphanumeric strings with easy-to-remember names.

For example, the domain name `alice.rsk` is a human-readable alternative to the long wallet address  `0x6746f241e80d3ee1036ce57e1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`. Therefore, Alice can share her domain name instead of the alphanumeric string.

## Why it Matters

 Here are the major reasons RNS exists and its purpose:

1. **User Experience**: RNS provides an enhanced and user-friendly way for users to remember and share their blockchain addresses. This ensures interactions with the blockchain are intuitive and accessible.

2. **Adoption**: By simplifying blockchain addresses, RNS can drive the adoption of blockchain technology for non-technical users.

3. **Versatility**: RNS can be used for various purposes, such as creating custom domain names for websites, wallet addresses, and other blockchain-based services. This versatility makes it a valuable tool in the blockchain ecosystem.

## How to Integrate RNS 

There are two main ways to integrate RNS into your dApp:

- [**Javascript SDK:**](./03-rns/js-sdk)

  This involves using the [RNS JavaScript SDK](https://www.npmjs.com/package/@rsksmart/rns) directly from your web interface.  
  With a few function calls, you can resolve domains to addresses, check availability, or perform reverse lookups.

- [**Smart contract integration:**](./smart-contract)  
  This involves when your dApp interact directly with the RNS registry or resolver directly on-chain(contract address).  
  It’s ideal for cases like marketplaces or identity systems that store or verify domain ownership at the contract level.

## Resources

- [RIF Name Service](/concepts/rif-suite/rns/)