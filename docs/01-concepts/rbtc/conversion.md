---
title: "RBTC Conversion: Peg in and Peg Out"
sidebar_label: Peg In & Out
tags: [rsk, rootstock, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation, powpeg]
description: 'Converting BTC to RBTC (peg-in) and RBTC to BTC (peg-out), for both Mainnet and Testnet.'
sidebar_position: 301
---

In this article, we explain step by step on how to convert from BTC to RBTC, and vice versa.
The process of conversion utilises a [Powpeg](/concepts/powpeg/) mechanism. Thus, these conversions are referred to as peg-ins and peg-outs.

- **Peg-in**:
  - A conversion from BTC to RBTC
  - Locks BTC in the BTC Federation address
  - Releases RBTC in the Rootstock derived address
- **Peg-out**:
  - A conversion from RBTC to BTC
  - Locks RBTC on the Rootstock network
  - Releases BTC on the Bitcoin network

## Compatibility

**The types of addresses that are accepted for the Federation are**:
- Legacy (P2PKH)
- Segwit Compatible (P2SH-P2WPKH)

:::info[Note]
On the Testnets, the token symbols are prefixed with a lowercase `t`.
Thus, we have `BTC` and `RBTC` on the Mainnets, which correspond to `tBTC` and `tRBTC` of the Testnets.
:::

### Address verifier

Enter your BTC address below to verify whether it may be used to peg in from BTC to RBTC.

<AddressVerifier />

## User Guide

- [Mainnet Guide](/concepts/rbtc/networks#mainnet-conversion)
- [Testnet Guide](/concepts/rbtc/networks#testnet-conversion)

You can try the conversion process using either options below;

- Using a [ledger hardware wallet](/concepts/rbtc/conversion-with-ledger)
- Using a [software](/concepts/rbtc/conversion-with-node-console)

## Video

Watch this explainer video on **How to do BTC & R-BTC Conversions using the Rootstock Powpeg**.

<iframe width="949" height="534" src="https://youtube.com/embed/XTpQW9Rw838" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### FAQs

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">How often does the Rootstock Federation address change?</Accordion.Header>
    <Accordion.Body>
      Rootstock Federation address has changed several times since Rootstock mainnet launch.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Do I lose my Bitcoin if the Rootstock Federation address change during my transfer?</Accordion.Header>
    <Accordion.Body>
      There is a grace period for the Rootstock Federation address change. You will still be able to lock Bitcoin and get RBTC during the grace period. However, any Bitcoin sent to the old Rootstock Federation address will be lost post to the grace period.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

### Feedback

Join the [Rootstock Global Discord Community](https://rootstock.io/discord), to ask questions and get answers.
