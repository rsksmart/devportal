---
sidebar_position: 200
sidebar_label: Overview
title: "Overview"
description: "Welcome to the overview section of the PowPeg App documentation."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

In this section, we are going to learn about the PowPeg App, [how it works](#how-it-works), its [features](#features), and the [benefits](#why-use-the-powpeg) of using the application.

:::info[Notice: Name Change to PowPeg App]

Effective September 03rd, 2024, the 2 Way Peg App has been officially renamed to PowPeg App, this name change reflects Rootstock's commitment to providing a more intuitive and engaging experience for users. 

**Note that the previous address still works, redirecting users to the new one.**

The app is available at [https://powpeg.rootstock.io/](https://powpeg.rootstock.io/)

If you have any questions or concerns, please don't hesitate to [contact support](https://discord.com/channels/842021106956238848/1123675841369489438).
:::

> To get started, see the [prerequisites](/resources/guides/powpeg-app/prerequisites/) section.

The [PowPeg App](https://powpeg.rootstock.io/) converts BTC to RBTC and vice versa. It is secured by the [PowPeg protocol](/concepts/powpeg/), which is a unique protocol that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus.

It is a web application that fosters the interaction between the bitcoin blockchain and the Rootstock network for easier exchange of BTC and RBTC. It also provides a way to visualize the status of transactions, communicate with a user wallet (both hardware wallets and software wallets), while also providing the highest possible level of security for transactions.

## How it Works

The PowPeg App uses a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) and a [PowPeg api](https://github.com/rsksmart/2wp-api) as the backend, this API uses a [daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) process, which is responsible for listening on blockchain transactions to update the state of peg-ins and in the future, the state of peg-outs, these state changes (tx hash, date change, last status) are stored in a mongodb database.

:::info[Info]

The PowPeg App is available on both [Mainnet](https://powpeg.rootstock.io/) and [Testnet](https://powpeg.testnet.rootstock.io/). 

:::

The source code is available on github, and open source:
- [Front end](https://github.com/rsksmart/2wp-app)
- [Back end](https://github.com/rsksmart/2wp-api)

## Features

The PowPeg App, has two primary features, they are:

- Peg-in: A conversion from BTC to RBTC. See [pegin](/resources/guides/powpeg-app/pegin/) for more explanation.
    - **Note: The peg-in process is final and cannot be reverted**.
    - **Native pegin transaction has 17 hours estimated time to completion**.
    - **Flyover pegin transaction time to completion, deppends on the Liquidity Provider conditions**.
    - See [Glossary](/resources/guides/powpeg-app/glossary/) page for more explanation. 

- Peg-out: A conversion from RBTC to BTC. This current version of the PowPeg. See [pegout](/resources/guides/powpeg-app/pegout/) for more explanation.
    - **Native pegout transaction has 34 hours estimated time to completion**.
    - **Flyover pegout transaction time to completion, deppends on the Liquidity Provider conditions**.
    - See [Glossary](/resources/guides/powpeg-app/glossary/) page for more explanation. 

## Why use the PowPeg App?

The PowPeg App has lots of benefits, these include:
 
1. Simplified transactions

The PowPeg App (peg-in and peg-out) are its nature is a complex process and this app makes it simpler. Using the PowPeg App enables you to choose where to receive the converted BTC / RBTC, which is also possible without it, but with an even higher level of complexity than a legacy peg-in and peg-out.


2. Visualization of transactions

Enables the visualization of the status of transactions on the Rootstock network

3. Enables communication with a user wallet (hardware and software)

The PowPeg App communicates directly with the following services:
- Trezor: Directly via USB
- Ledger: Directly via USB and integrated with the manufacturer's application
- Metamask: Through the rLogin application. Learn more about the [rLogin application](https://github.com/rsksmart/rLogin)

4. Secure transactions

All transactions need to be confirmed via the device used by the customer, whether a hardware or software wallet, all transaction information and the appropriate signatures are generated through integration with the wallets.

----

## Next

* Convert [BTC to RBTC using the PowPeg App](/resources/guides/powpeg-app/pegin/).
* Convert [RBTC to BTC using the PowPeg App](/resources/guides/powpeg-app/pegout/).
* View [Advanced Operations](/resources/guides/powpeg-app/advanced-operations/)
* Comparing [PowPeg and Flyover](/developers/integrate/flyover/powpeg-vs-flyover/).