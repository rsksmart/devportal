---
sidebar_position: 1600
sidebar_label: Supported Wallets
title: "Supported Wallets"
description: "See wallets which supports the PowPeg App"
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

The PowPeg App works with a small set of wallets that can sign Bitcoin peg-in and peg-out flows. Use a listed hardware or software wallet, then confirm it appears in the PowPeg UI before you send funds.

Peg-in moves BTC on Bitcoin into rBTC on Rootstock. Peg-out moves rBTC back to BTC. The wallet you connect must be able to create a [supported Bitcoin address](/resources/guides/powpeg-app/advanced-operations/supported-addresses/) on the network you selected (mainnet or testnet).

Complete [PowPeg prerequisites](/resources/guides/powpeg-app/prerequisites/) before you start. Use [PowPeg Testnet](https://powpeg.testnet.rootstock.io/) to practice. Use [PowPeg Mainnet](https://powpeg.rootstock.io/) only for real BTC.

## Hardware wallets

Hardware wallets keep keys on the device. You confirm each PowPeg transaction on the device screen.

### Ledger

Ledger is supported for peg-in. Set a PIN, install the Bitcoin app, and follow [Performing a peg-in using Ledger](/resources/guides/powpeg-app/pegin/ledger/).

The minimum peg-in amount in that guide is **0.005 BTC**. Confirm the amount shown in the PowPeg App for your session. Match the Bitcoin address type to [Supported Addresses](/resources/guides/powpeg-app/advanced-operations/supported-addresses/).

### Trezor

Trezor is supported for peg-in. Unlock the device, open the Bitcoin account you will use, and follow [Performing a peg-in using Trezor](/resources/guides/powpeg-app/pegin/trezor/).

Export an address the PowPeg App accepts. If the app rejects the address, check the network (mainnet vs testnet) and the address prefix.

## Software wallets

Software wallets run in the browser or as a desktop/mobile app. They do not replace a hardware device for high-value peg-outs, but they are the documented path for Leather.

### Leather

Leather is the documented software wallet for PowPeg peg-in. Follow [Performing a peg-in using Leather](/resources/guides/powpeg-app/pegin/leather/).

Connect Leather, select the Bitcoin account, and confirm the destination Rootstock address in the PowPeg App before you broadcast.

## Confirm a wallet in the PowPeg UI

1. Open the PowPeg App for the network you intend to use.
2. Choose peg-in or peg-out.
3. Connect the wallet from the list the app shows.
4. Check that the Bitcoin address prefix matches [Supported Addresses](/resources/guides/powpeg-app/advanced-operations/supported-addresses/).
5. Check the destination Rootstock address for peg-in, or the Bitcoin destination for peg-out.

If the wallet does not appear, try a [supported browser](/resources/guides/powpeg-app/advanced-operations/supported-browsers/). For other software wallets, see [Wallets](/dev-tools/wallets/).

:::tip[Tip]
See [alternative software wallets](/dev-tools/wallets/) supported by the PowPeg App.
:::

## Related pages

- [Supported addresses](/resources/guides/powpeg-app/advanced-operations/supported-addresses/)
- [Supported browsers](/resources/guides/powpeg-app/advanced-operations/supported-browsers/)
- [PowPeg App overview](/resources/guides/powpeg-app/overview/)
