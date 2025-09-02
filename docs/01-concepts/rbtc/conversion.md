---
title: "rBTC Conversion: Peg in and Peg Out"
sidebar_label: Peg In & Out
tags: [rsk, rootstock, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation, powpeg]
description: 'Converting BTC to RBTC (peg-in) and rBTC to BTC (peg-out), for both Mainnet and Testnet.'
sidebar_position: 301
---

In this article, we explain step by step on how to convert from BTC to rBTC, and vice versa.
The process of conversion utilises a [Powpeg](/concepts/powpeg/) mechanism. Thus, these conversions are referred to as peg-ins and peg-outs.

- **Peg-in**:
  - A conversion from BTC to rBTC
  - Locks BTC in the BTC Federation address
  - Releases rBTC in the Rootstock derived address
- **Peg-out**:
  - A conversion from rBTC to BTC
  - Locks rBTC on the Rootstock network
  - Releases BTC on the Bitcoin network

## Address Compatibility

There are two main ways to perform a peg-in:

1. **Direct Peg-in (Legacy)**: You can send funds directly from your wallet to a Federation (PowPeg) address. This method is only supported for two specific address types:
    - Legacy Addresses (P2PKH): Starts with a `1`. These addresses are the original Bitcoin address format.
    - SegWit Compatible Addresses (P2SH-P2WPKH): Starts with a `3`. These addresses support Segregated Witness (SegWit), a type of upgrade to the Bitcoin network.

2. **Using a Peg-in App (Modern)**: For other address types, you must use a specialized tool like the [PowPeg App](https://powpeg.rootstock.io/). This is required for addresses such as:
    - Native SegWit (Bech32): Starts with `bc1`. Starts with `bc1`. This is the newest address format. You cannot use it for a direct peg-in because it requires the `OP_RETURN` field to be included in the transaction. Modern tools like the PowPeg App include this field from the destination address.

:::tip[Tip]

The address verifier on this page is designed to check for direct peg-in compatibility only. If you are using a Native Segwit (Bech32) address, you will need to use a tool like the [PowPeg App](https://powpeg.rootstock.io/) to perform a peg-in.
:::

## Address verifier

Enter your BTC address below to verify whether it may be used to peg in from BTC to rBTC. 

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

````mdx-code-block
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
      There is a grace period for the Rootstock Federation address change. You will still be able to lock Bitcoin and get rBTC during the grace period. However, any Bitcoin sent to the old Rootstock Federation address will be lost post to the grace period.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
````

### Feedback

Join the [Rootstock Global Discord Community](https://rootstock.io/discord), to ask questions and get answers.
