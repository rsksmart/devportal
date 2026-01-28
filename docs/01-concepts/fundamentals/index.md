---
sidebar_label: Rootstock Fundamentals
sidebar_position: 2
title: Rootstock Fundamentals
tags: [rsk, rootstock, beginner, concepts]
description: Rootstock is the first and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities.
---

## What is Rootstock?

Rootstock is the first and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, making it the gateway to a vibrant ecosystem of dApps that continues to evolve to become fully trustless.

See the [Rootstock Stack](/concepts/fundamentals/stack/).

## How is Rootstock connected to bitcoin?

### Merged mining with Bitcoin

The first point of contact is through mining.

The bitcoin miners do what is known as
[merged mining](/node-operators/merged-mining/),
securing both networks with the same infrastructure and energy consumption.


They create blocks on the bitcoin network every 10 minutes,
including transfer of bitcoin from different addresses
and in the process they create new bitcoins.

On Rootstock, blocks are created every 30 seconds,
to secure the execution of smart contracts.
This does not mint any new coins in the process,
but does earn a reward from the merged mining.

> Check out [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) to learn more about mining.


### PowPeg with Bitcoin

The second point of contact is the
PowPeg,
also known as the bridge.

This component connects both networks to allow
the transfer of bitcoins to Rootstock,
thereby allowing developers to interact with smart contracts.
They pay gas using the same bitcoin, the smart bitcoin.


To do so, you send bitcoin to a special address,
where they are locked in the bitcoin network.
Next, in the same address over in the Rootstock network,
that same bitcoin is released to the user
for use in the Rootstock network.
This is called peg-in.

You can do the reverse operation called peg-out,
by sending your bitcoin to a special address in the Rootstock network,
and receiving your bitcoin back in the bitcoin network.
