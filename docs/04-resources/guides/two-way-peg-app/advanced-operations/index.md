---
sidebar_position: 1200
sidebar_label: Advanced Operations 
title: "Overview | Advanced Operations"
description: "See how to perform advanced operations on the two way peg app"
tags: [2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, rootstock, testnet, mainnet, guide, setup, integrate, use]
---

This section contains detailed instructions on how to perform advanced operations on the 2 way peg app. 

These operations include;

* How to review funds in Bitcoin after a pegout by [viewing a derived address](/resources/guides/two-way-peg-app/pegout/deriving-electrum), 
* Convert RBTC - BTC and import a [key in Electrum](/resources/guides/two-way-peg-app/pegout/deriving-electrum#import-key-in-electrum), import in Electrum if you are using [hardware wallets](/resources/guides/two-way-peg-app/pegout/deriving-electrum#import-key-in-electrum-using-hardware-wallets)
* Selecting different accounts
* Viewing advanced details
* Adjusting network fees
* Viewing Advanced data

> For  more information, see [design and architecure](/resources/guides/two-way-peg-app/advanced-operations/design-architecture/), [supported addresses](/resources/guides/two-way-peg-app/advanced-operations/supported-addresses/), [supported wallets](/resources/guides/two-way-peg-app/advanced-operations/supported-wallets/), [supported browsers](/resources/guides/two-way-peg-app/advanced-operations/supported-browsers/)

--- 

## Account selection

### Pegin:

There are three types of accounts on the 2 way peg app. See [supported addresses](/resources/guides/two-way-peg-app/advanced-operations/supported-addresses/) section for examples of these types of addresses.

To select an account to send BTC from, click on **Select the account** as shown in the image below. This loads the balance for all the addresses in your hardware wallet.

> Note: Your hardware wallet must be connected to view this section of the 2 way peg app.

![Bitcoin account to send from](/img/resources/two-way-peg-app/51-bitcoin-account-to-send-from.png)

Choose the address you want to send TBTC from. See the [getting funds](/resources/guides/two-way-peg-app/prerequisites#get-funds) section for how to get BTC or TBTC.

## How to view advanced details

To view advanced details, click on the plus icon as shown in the image below;

![View advanced details](/img/resources/two-way-peg-app/52-view-advanced-details.png)

Here you can find a long string of numbers called an unsigned raw tx.

![Advanced data](/img/resources/two-way-peg-app/53-advanced-data.png)

### Advanced data

**Unsigned raw tx**

A Bitcoin raw transaction is a chunk of bytes that contains the info about a Bitcoin transaction. That raw transaction will become part of the blockchain when a miner adds it to a block. The pegin transaction has at least one input and two outputs, all information is encoded and displayed for the users’ verification.

## Adjusting network fees

There are three options to choose from when deciding on which fee rate to use when sending a transaction.

**Slow**

A slow transaction is less expensive and will take longer to confirm.

![Slow transaction](/img/resources/two-way-peg-app/54-slow-transaction.png)

**Average**

This is also known as normal, here, the transaction is priced at an average rate and will take an average time to confirm.

![Average transaction](/img/resources/two-way-peg-app/55-average-transaction.png)

**Fast**

A fast transaction is the most expensive but the transaction confirms at the quickest time possible.

![Fast transaction](/img/resources/two-way-peg-app/56-fast-transaction.png)

> The type of fee to be selected depends on several variables, like network speed, time, and amount the user is willing to spend on a single transaction.

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Design architecture](/resources/guides/two-way-peg-app/advanced-operations/design-architecture/)