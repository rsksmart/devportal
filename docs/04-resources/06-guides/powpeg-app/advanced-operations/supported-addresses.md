---
sidebar_position: 1400
sidebar_label: Supported Addresses
title: "Supported Addresses"
description: "See supported addresses on the PowPeg App"
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

The PowPeg App accepts common Bitcoin address formats for peg-in and related flows. Use an address type your wallet can generate and that matches the network you are using (Bitcoin mainnet or testnet).

## Address types

### SegWit (P2SH)

A SegWit address wrapped in P2SH starts with `3` on Bitcoin mainnet. Types include P2SH-P2WPKH and P2SH-P2WSH. Many hardware and software wallets still expose this format as the default SegWit option.

Example shape (do not send funds to sample strings):

```text
3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy
```

### Native SegWit (Bech32)

Native SegWit, also called Bech32, starts with `bc1` on Bitcoin mainnet. Prefer this format when your wallet supports it. Fees are typically lower than legacy or P2SH-wrapped SegWit for the same spend.

Example shape:

```text
bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
```

On Bitcoin testnet, native SegWit addresses often start with `tb1` instead of `bc1`. Confirm the prefix your wallet shows before you paste an address into the PowPeg App.

### Legacy (P2PKH)

Legacy addresses use P2PKH and start with `1` on Bitcoin mainnet. They remain supported, but they usually cost more to spend than SegWit formats.

Example shape:

```text
1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
```

## Practical notes

- Match network and address: a mainnet `bc1` / `3` / `1` address is not valid on testnet, and testnet prefixes are not valid on mainnet.
- Peg-in deposits go to a Bitcoin address the PowPeg App derives for your session. Peg-out destinations are Rootstock (rBTC) addresses in your EVM wallet, not Bitcoin address types from this list.
- If an address is rejected, check the prefix, network, and that the wallet exported a standard Base58 or Bech32 string with no extra spaces.

## Related pages

- [Supported wallets](/resources/guides/powpeg-app/advanced-operations/supported-wallets/)
- [Supported browsers](/resources/guides/powpeg-app/advanced-operations/supported-browsers/)
- [PowPeg App overview](/resources/guides/powpeg-app/overview/)
