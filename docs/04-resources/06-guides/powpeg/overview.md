---
sidebar_position: 200
sidebar_label: Overview
title: "Overview"
description: "Welcome to the overview section of the PowPeg App documentation."
tags: [2 way peg app, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

In this section, we are going to learn about the PowPeg app, [how it works](#how-it-works), its [features](#features), and the [benefits](#why-use-the-powpeg) of using the application.

:::info[Notice: Name Change to PowPeg App]

Effective September 03rd, 2024, the 2 Way Peg App has been officially renamed to PowPeg App, this name change reflects Rootstock's commitment to providing a more intuitive and engaging experience for users. 

**Note that the previous address still works, redirecting users to the new one.**

The app is available at [https://powpeg.rootstock.io/](https://powpeg.rootstock.io/)

If you have any questions or concerns, please don't hesitate to [contact support](https://discord.com/channels/842021106956238848/1123675841369489438).
:::

> To get started, see the [prerequisites](/resources/guides/powpeg/prerequisites/) section.

The [PowPeg](https://powpeg.rootstock.io/) is an application that converts BTC to RBTC and vice versa. It is secured by the powpeg protocol, which is a unique protocol that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. See the history of the [PowPeg](/concepts/powpeg/).

The PowPeg is a web application that fosters the interaction between the bitcoin blockchain and the Rootstock network for easier exchange of BTC and RBTC. It provides a way to visualize the status of transactions, communicate with a user wallet (both hardware wallets and software wallets), while also providing the highest possible level of security for transactions.

## How it Works

The PowPeg app uses a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) and a [PowPeg api](https://github.com/rsksmart/2wp-api) as the backend, this API uses a [daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) process, which is responsible for listening on blockchain transactions to update the state of peg-ins and in the future, the state of peg-outs, these state changes (tx hash, date change, last status) are stored in a mongodb database.

:::info[Info]

The PowPeg app is available on both [Mainnet](https://powpeg.rootstock.io/) and [Testnet](https://powpeg.testnet.rootstock.io/). 

:::

The source code is available on github, and open source:
- [Front end](https://github.com/rsksmart/2wp-app)
- [Back end](https://github.com/rsksmart/2wp-api)

## Features

The PowPeg app, has two primary features, they are:

- Peg-in: A conversion from BTC to RBTC. See [Glossary](/resources/guides/powpeg/glossary/) page for more explanation. 
    - **Note: The peg-in process is final and cannot be reverted**.
    - **Native pegin transaction has 17 hours estimated time to completion**.

- Peg-out: A conversion from RBTC to BTC. This current version of the PowPeg. See [pegout](/resources/guides/powpeg/pegout/) for more explanation.
    - **Native pegin transaction has 34 hours estimated time to completion**.

## Why use the PowPeg Application?

The PowPeg app has lots of benefits, these include:
 
1. Simplified transactions

The PowPeg app (peg-in and pegout) are its nature is a complex process and this app makes it simpler. Using the PowPeg enables you to choose where to receive the converted BTC / RBTC, which is also possible without it, but with an even higher level of complexity than a legacy peg-in and peg-out.


2. Visualization of transactions

Enables the visualization of the status of transactions on the Rootstock network

3. Enables communication with a user wallet (hardware and software)

The PowPeg app communicates directly with the following services:
- Trezor: Directly via usb
- Ledger: Directly via usb and integrated with the manufacturer's application
- Metamask: Through the rLogin application. Learn more about the [rLogin application](https://github.com/rsksmart/rLogin)

4. Secure transactions

All transactions need to be confirmed via the device used by the customer, whether a hardware or software wallet, all transaction information and the appropriate signatures are generated through integration with the wallets.

----

## Next

* Convert [BTC to RBTC using the PowPeg app](/resources/guides/powpeg/pegin/).
* Convert [RBTC to BTC using the PowPeg app](/resources/guides/powpeg/pegout/).
* View [Advanced Operations](/resources/guides/powpeg/advanced-operations/)