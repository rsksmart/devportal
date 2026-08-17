---
sidebar_label: Overview
sidebar_position: 1
title: Rootstock Foundations
tags: [rsk, rootstock, beginner, concepts, foundations]
description: "Bitcoin's financial infrastructure: an EVM-compatible Bitcoin sidechain secured by over 85% of Bitcoin's hash power for lending, payments, yield, and treasury products."
---

## What is Rootstock?

Rootstock is Bitcoin's financial infrastructure. It is an open-source, EVM-compatible Bitcoin sidechain secured by over 85% of Bitcoin's hash power through merge mining. Businesses, financial institutions, and builders use it to launch Bitcoin-secured lending, payments, yield, and treasury products with Ethereum tooling.

See the [Rootstock Stack](/concepts/foundations/stack/) and the [Security at Rootstock](/concepts/foundations/security/) hub.

## How is Rootstock connected to Bitcoin?

### Merged mining with Bitcoin

The first point of contact is through mining.

Bitcoin miners perform [merged mining](/concepts/foundations/merged-mining/), securing both networks with the same infrastructure and energy consumption.

They create blocks on the Bitcoin network every 10 minutes, including transfers of bitcoin between addresses, and in the process they create new bitcoins.

On Rootstock, blocks are created every 30 seconds to secure the execution of smart contracts. This does not mint new coins, but it does earn a reward from merged mining.

> See [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) for more about mining.

### PowPeg with Bitcoin

The second point of contact is the [PowPeg](/concepts/foundations/powpeg/), also known as the bridge.

This component connects both networks so you can move bitcoin to Rootstock and interact with smart contracts. You pay gas in rBTC, which is pegged 1:1 with BTC.

To peg in, you send bitcoin to a special address where it is locked on Bitcoin. The same amount of rBTC is then available on Rootstock. To peg out, you send rBTC to a special address on Rootstock and receive BTC back on Bitcoin.

For the full security model behind merged mining, the PowPeg, and how RootstockLabs ships and verifies code, see [Security at Rootstock](/concepts/foundations/security/).

## Explore Foundations

<CardsGrid>
  <CardsGridItem
    title="Security"
    subtitle="security"
    color="green"
    description="Why Rootstock is secure, how it stays secure, and how you can verify the model."
    linkHref="/concepts/foundations/security/"
    linkTitle="Learn security"
  />
  <CardsGridItem
    title="The Stack"
    subtitle="architecture"
    color="cyan"
    description="Layers from applications down to Bitcoin merged mining and the Rootstock Virtual Machine."
    linkHref="/concepts/foundations/stack/"
    linkTitle="Learn the stack"
  />
  <CardsGridItem
    title="Merged Mining"
    subtitle="bitcoin"
    color="purple"
    description="How merge mining Rootstock with Bitcoin works, and its benefits."
    linkHref="/concepts/foundations/merged-mining/"
    linkTitle="Learn merged mining"
  />
  <CardsGridItem
    title="PowPeg"
    subtitle="bridge"
    color="pink"
    description="Transfer BTC to rBTC and back through the PowPeg protocol."
    linkHref="/concepts/foundations/powpeg/"
    linkTitle="Learn PowPeg"
  />
</CardsGrid>
