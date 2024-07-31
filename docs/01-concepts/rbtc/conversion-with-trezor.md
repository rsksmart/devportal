---
title: Accessing and using funds that are not in accounts derived with Rootstock (RSK) dpath in Trezor T
sidebar_label: With Trezor T
tags: [rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation, trezor, dpath]
description: 'How to configure a Trezor T hardware wallet to derive with a custom dpath.'
sidebar_position: 306
---

How to solve the problem of moving your funds when they are in an account that needs to
be derived with a custom derivation path (dpath) using Trezor T.

## Context

If you made a [BTC to RBTC conversion](/concepts/rbtc/conversion-with-ledger#btc-to-rbtc-conversion) using Trezor T, you need to access your account by using a custom dpath (`44'/0'/0'/0/0` for Mainnet). With the last firmware versions, Trezor T is checking that the dpath matches with the expected one as a safety feature and this is a blocker when you intend to use a different dpath.
You may also want to access your account with a different dpath if you made a mistake; for example, receiving RBTC at an address derived using the Ethereum dpath instead of the Rootstock dpath.

In MyCrypto or MyEtherWallet you may have received this message: `"Forbidden key path"`.

## Solution

To allow custom derivation paths, you will need to turn off safety checks (see [Pavol Rusnak message](https://github.com/trezor/trezor-firmware/issues/1255#issuecomment-691463540)).

To do this, you need to install [python-trezor](https://github.com/trezor/python-trezor):

```shell
pip3 install --upgrade setuptools
pip3 install trezor
```

Once you are ready, run this command:

```shell
trezorctl set safety-checks prompt
```
(you need to have your Trezor T unlocked and accept the configuration in the device)

After moving your funds, you can turn them on again:

```shell
trezorctl set safety-checks strict
```