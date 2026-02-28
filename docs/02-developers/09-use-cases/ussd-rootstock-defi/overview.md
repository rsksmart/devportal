---
sidebar_label: Overview
sidebar_position: 1
title: USSD-Based Decentralized Finance on Rootstock
tags: [rsk, rootstock, developers, defi, ussd]
description: Learn how to build internet-free decentralized financial services on Rootstock using USSD, enabling P2P transfers and micro-loans on feature phones without internet access.
---

# USSD-Based Decentralized Finance on Rootstock

This guide introduces a novel integration architecture that connects **legacy GSM feature phones** to the Rootstock(rsk) blockchain network via USSD (Unstructured Supplementary Service Data). The system enables decentralized financial services, including P2P transfers and micro-loans, for users without smartphone or internet access.

:::note
USSD is a real-time communication protocol built into every GSM network globally. It works on any mobile phone, requires no internet, no app installation, and no data plan, making it one of the most accessible communication channels in the world.
:::

## Why This Matters

Web3 services today are largely gated behind smartphones and reliable internet connectivity. Across large parts of Africa, South Asia, and Latin America, hundreds of millions of people still rely on basic feature phones for communication. This creates a clear contradiction because blockchain offers financial inclusion, yet its interfaces exclude the very populations who need it most.

This architecture removes that barrier. By routing USSD sessions through an off-chain relay server that communicates with the Roostock network, anyone with a basic GSM phone and a SIM card can access the following capabilities:

- Check their on-chain token balance.
- Send peer-to-peer transfers to other wallet addresses.
- Request micro-loans from a smart contract.

## Who This Is For

This documentation is intended for developers building financial inclusion tools on Rootstock. You should be familiar with:

- Solidity and deploying smart contracts on Rootstock Network.
- Node.js backend development.
- Basic telecom concepts, including USSD session flows.

## System At a Glance

Three layers power this solution, working together to bridge feature phones and the blockchain:

1. **User Layer**  
A feature phone initiates a USSD session by dialing a shortcode (for example, `*384#`). All interaction happens through a menu-driven text interface.

2. **Off-Chain Relay Layer**  
A Node.js Express server receives the USSD payload from a telecom gateway such as Africa's Talking, interprets the user's menu choices, and constructs the appropriate blockchain transaction or read call.

3. **On-Chain Layer**  
A Solidity smart contract deployed on the Roostock Testnet manages balances, P2P transfers, and micro-loan logic. The Off-Chain Relay Layer acts as a funded relayer wallet that signs and broadcasts transactions on behalf of the user.