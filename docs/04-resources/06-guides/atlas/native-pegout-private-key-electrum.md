---
sidebar_position: 500
sidebar_label: Access funds via private key
title: "How to access native pegout funds with a private key"
description: "Export your wallet private key, convert it to WIF, and import it into Electrum to access funds from a native pegout with Atlas."
tags: [rsk, rootstock, bridge, atlas, powpeg]
---

This guide explains how to access the Bitcoin funds received from a **native pegout** on [Atlas Bridge](https://atlas.rootstock.io) when you hold the wallet's private key directly (for example a MetaMask account), rather than using a hardware wallet.

## Why use a private key to access funds?

If you signed the native pegout with a wallet where you hold the private key directly, you don't need a derivation path to find your destination address. The private key itself is enough — once converted to the right format, you can import it directly into Electrum as a single address.

If instead you signed with a hardware wallet (Trezor or Ledger), use [Accessing the address derived by a native pegout](/resources/guides/atlas/native-pegout-hardware-wallet-electrum/) instead, which browses your account using the derivation path.

## Prerequisites

- Wallet private key
- [Electrum](https://electrum.org/#download)
- [Rootstock Utils](https://github.com/rsksmart/utils)

## Getting your wallet private key

### Using MetaMask

**Step 1**: Open the MetaMask wallet in your browser. You can find this in your browser's extensions.

**Step 2**: Click the menu icon on the right.

**Step 3**: Choose "Account details".

**Step 4**: Click the "Export private key" button.

**Step 5**: Fill out your wallet password and click "Confirm".

**Step 6**: Copy the private key and click "Done".

## Converting your private key to WIF

Before you can import the key into Electrum, convert it into a [Wallet Import Format (WIF)](https://learnmeabitcoin.com/technical/wif). A WIF private key is just another way of representing your original private key — it can always be converted back to its original format.

For more info on WIF, see the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Wallet_import_format).

### Using Rootstock Utils (Recommended) {#using-rootstock-utils}

[Rootstock Utils](https://github.com/rsksmart/utils#rsk-utils) converts keys from BTC to Rootstock format offline, without exposing your key to a website.

**Step 1**: Clone the [Rootstock Utils project](https://github.com/rsksmart/utils).

**Step 2**: Follow the steps explained in the [README](https://github.com/rsksmart/utils/blob/master/README.md).

**Step 3**: Install webpack:

```js
npm install webpack@4.46.0 -g
npm i webpack-cli@3.3.12 -g
npm install
webpack
```

[Optional] you will need npm to install webpack:

```
npm install --save-dev webpack
```

**Step 4**: Run webpack:

```
webpack
```

**Step 5**: Open the file in your browser:

```
./build/index.html
```

**Step 6**: In the generated application, add your private key and convert it to WIF.

### Using LearnMeABitcoin

> IMPORTANT: We discourage using websites on the internet for this. If your private key is exposed, your funds are also exposed. Use the offline option, [Rootstock Utils](#using-rootstock-utils), whenever possible.

**Step 1**: Visit [https://learnmeabitcoin.com/technical/wif](https://learnmeabitcoin.com/technical/wif).

You will find [Ruby](https://www.ruby-lang.org/en/) code and a tool to convert the private key into a WIF.

**Step 2**: Paste the private key from [Getting your wallet private key](#getting-your-wallet-private-key) into the "Private Key" field.

**Step 3**: Choose the network: `Mainnet` or `Testnet`.

**Step 4**: Choose the compressed option `true`.

**Step 5**: Copy the WIF value.

> IMPORTANT: Using the Ruby code directly is highly **recommended** over the web form. This code requires the `checksum.rb` and `base58_encode.rb` functions shown below.

Download the `checksum` file [here](https://github.com/in3rsha/learnmeabitcoin-code/blob/master/checksum.rb).
Download the `base58_encode` file [here](https://github.com/in3rsha/learnmeabitcoin-code/blob/master/base58_encode.rb).

```ruby
require_relative 'checksum'
require_relative 'base58_encode'

##### Convert Private Key to WIF

privatekey = "4fd050a8e4fd767f759d75492b9894bc97875e8201873e38443e3f5eae9c8db2f"
extended = "80" + privatekey + "01"
extendedchecksum = extended + checksum(extended)
wif = base58_encode(extendedchecksum)

puts wif
```

## Import the private key into Electrum

[Electrum](https://electrum.org/#download) is used to verify the destination address and view the funds received from your native pegout.

**Step 1**: Download Electrum for your OS from the [website](https://electrum.org/#download).

> NOTE: If you need to run Electrum on Testnet, execute the following commands:

```
cd /Applications/Electrum.app/Contents/MacOS
./run_electrum --testnet
```

**Step 2**: Start with the "Create New Wallet" option.

**Step 3**: Fill out a new wallet name and click "Next".

**Step 4**: Choose "Import Bitcoin addresses or private keys" and click "Next".

**Step 5**: Fill out the WIF value of the private key and click "Next".

**Step 6**: Create a new wallet password and click "Next".

> In this screen, you will see the address that received your native pegout BTC funds.

## Troubleshooting: pegout completed but balance is zero

Your BTC may have arrived even when Electrum shows a zero balance. Work through these checks in order:

1. Confirm the transaction on a block explorer using the destination Bitcoin address from Atlas' transaction status.
2. Confirm the WIF value you imported matches the private key used to sign the native pegout.
3. Confirm you selected the correct network (Mainnet or Testnet) both when converting to WIF and when launching Electrum.
4. If the balance is still wrong, delete the Electrum wallet file and repeat the import with the correct WIF value.

:::warning[Keep your private key safe]
Anyone with your private key or WIF value can spend the funds at that address. Prefer the offline [Rootstock Utils](#using-rootstock-utils) conversion method, avoid pasting your private key into websites, and never share it with anyone.
:::
