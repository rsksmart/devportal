---
sidebar_position: 1700
sidebar_label:  Troubleshooting and Common Errors
title: "Common errors when using the PowPeg App"
description: "Common errors and troubleshooting when using the PowPeg App."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

![PowPeg App (peg-out)](/img/resources/powpeg/pegout.gif)

You may encounter the following errors when trying out the application:

## Trezor will not connect (browser pop-up blocked) {#trezor-connect-popups}

The PowPeg App uses Trezor Connect in a browser pop-up. Chrome and Brave can block that window. When the pop-up is blocked, Trezor may not connect and the PowPeg App can show a generic error.

**What to do:**

1. Connect your Trezor and open the PowPeg App in Chrome or Brave.
2. Click **Connect wallet** and choose **Trezor** so the browser tries to open Trezor Connect.
3. Look for a **pop-ups blocked** icon in the address bar. Click it.
4. Select **Always allow pop-ups and redirects from** the PowPeg App URL you are using:
   - Mainnet: `https://powpeg.rootstock.io`
   - Testnet: `https://powpeg.testnet.rootstock.io`
5. Click **Done**, reload the page, and try again.

<center>
    <img src="/img/resources/powpeg/trezor-popup-blocked-chrome.png"  title="Chrome pop-ups blocked dialog for Trezor Connect on the PowPeg App" width="80%"/>
</center>

Other Rootstock web apps that use Trezor Connect need the same setting for their own site URL.

If Trezor still does not connect, confirm **Perform Safety Checks** is set to **PROMPT** in Trezor Suite. See [Peg-in using Trezor](/resources/guides/powpeg-app/pegin/trezor/) or the [Forbidden key path FAQ](/resources/guides/powpeg-app/faqs/).

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