---
sidebar_position: 1500
sidebar_label: Glossary
title: "Glossary"
description: "Welcome to the glossary section for the 2 way peg app documentation."
tags: [2 way peg, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

See a list of terms about/related to the 2 way peg app and their meanings.

- What is the 2 way peg app:?
    > The [2 way peg app](https://app.2wp.rootstock.io/) is a frontend application developed in Vue.js and typescript. The or 2 way peg app is a web application that fosters the interaction between the bitcoin blockchain and the Rootstock network for faster exchange of BTC and RBTC. See the [github repo](https://github.com/rsksmart/2wp-app).
- Amount in BTC:
    > The amount a user is sending. Not less than `0.005 BTC`.
- Device account address:
    > The account address the user is sending from in BTC.
- Destination Rootstock address:
    > The account address to receive the RBTC.
- Hardware Wallet
    > A hardware wallet is a special-purpose device configured to accept supported cryptocurrencies and tokens. Hardware wallets usually take the form of a physical device. Examples of hardware wallets are [Ledger](https://shop.ledger.com/products/ledger-nano-s-plus) and [Trezor](https://shop.trezor.io/).
- Legacy address
    > Legacy address is the original BTC address. It is the most expensive address type because it uses the most amount of space inside a transaction.
- Mainnet:
    > Assets on mainnet have real value and should be used only in Production.
- Native SegWit address:
    > The SegWit native transaction is `Bech32`, and crypto wallets that support SegWit generally incur lower fees.
- Network Fee
    > A Network Fee, as the name implies, is a fee you pay to a blockchain network for transferring a digital asset on that network.
- Peg-ins
    > A conversion from BTC to RBTC. In the peg-in process, the customer sends some BTC and gets the equivalent amount in RBTC inside the Rootstock Blockchain network. The peg-in process is **final and cannot be reverted**, it requires **100** Bitcoin block confirmation which is approximately 200 Rootstock Blocks.
- Peg-outs
    > A conversion from RBTC to BTC. This locks RBTC on the Rootstock network and releases BTC on the Bitcoin network. Peg-outs is not supported for this current version of the 2 way peg app. This feature will come with feature releases.
- Refund Bitcoin address
    > The bitcoin address to be refunded.
- Powpeg
    > The powpeg is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. Read more about the [Powpeg](/concepts/powpeg/).
- SegWit address
    > Segwit, short for Segregated Witness, is an upgrade to the Bitcoin protocol, it separates the digital signature (also known as “the witness”) from the transaction, it is a newer address format with lower fees. It makes Bitcoin transaction sizes smaller, which allows Bitcoin to handle more transactions at once (scalability). Watch the video: [What is Segwit? Explained](https://youtu.be/f3CFUbeehc8).
- Software Wallet
    > A software wallet is an application that is installed on a computer or smartphone. The private keys are stored on the computer or smartphone.
- Testnet:
    > - This is a testing network used for testing and development purposes, assets on the Testnet have zero value, funds used in this network are called Test tokens (tRBTC), they can be gotten through a faucet that dispenses tokens. These tokens are utility tokens that are required to operate certain DApps. Developers of those DApps also need to test them on the Testnet, and hence these are provided as a convenience for them. The Rootstock network provides a cryptocurrency faucet. The tRBTC faucet provides the cryptocurrency required to pay for gas fees on the Rootstock Testnet. See how to get tRBTC using the [Rootstock Faucet](https://faucet.rootstock.io/).
- Transaction fee
    > The transaction fee, its equivalent, is specified in BTC and USD.
- Transaction total
    > This comprises of the BTC amount + transaction fee selected.