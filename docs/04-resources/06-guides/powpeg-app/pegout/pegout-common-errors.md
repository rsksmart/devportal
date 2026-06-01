---
sidebar_position: 1700
sidebar_label:  Troubleshooting and Common Errors
title: "Common errors when using the PowPeg App"
description: "Here, we will learn how to perform a peg-out using Metamask Wallet."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

![PowPeg App (peg-out)](/img/resources/powpeg/pegout.gif)

You may encounter the following errors when trying out the application:

## BTC not visible after a peg-out (Trezor and Electrum)

The peg-out can succeed on chain while your balance still shows zero in Trezor Suite or Electrum.

**Cause:** Trezor Suite does not support the custom derivation path for peg-out Bitcoin addresses. Electrum is required to view those funds. A common mistake is to enter a BIP39 passphrase in Electrum when you do not use one on Trezor. That opens a different wallet than the one used for the peg-out.

**What to do:**

1. Confirm the Bitcoin transaction on a block explorer using the destination address from the [PowPeg status page](https://powpeg.rootstock.io/).
2. Follow [Viewing a derived bitcoin address](/resources/guides/powpeg-app/pegout/deriving-electrum/#import-key-in-electrum-using-hardware-wallets) with path `m/44'/137'/0'` on Mainnet.
3. Leave the Electrum passphrase fields empty if you do not use a BIP39 passphrase on Trezor. See [Trezor passphrase in Electrum](/resources/guides/powpeg-app/pegout/deriving-electrum#trezor-passphrase-in-electrum).

## Resources
* PowPeg App frontend [repo](https://github.com/rsksmart/2wp-app)
* PowPeg App backend [repo](https://github.com/rsksmart/2wp-api)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Thirdweb Faucet](https://thirdweb.com/rootstock-testnet) 
* [Blast Faucet](https://blastapi.io/faucets/rootstock-testnet)
* [Design architecture](/resources/guides/powpeg-app/advanced-operations/design-architecture/)