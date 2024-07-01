---
title: Markdown page example
---

# Markdown page example

You don't need React to write simple standalone pages.


## Tabs

<Tabs>
  <TabItem value="contribute" label="Contribute to Rootstock" default>
    Are you passionate about web3, bitcoin and the Blockchain? Do you have a passion for Open Source and Web3? Do you enjoy writing, coding, bounty hunting, solving real-world problems, and eager to contribute to the future of Bitcoin and Decentralized Finance? Join the Rootstock Discord Community and start making contributions!
  </TabItem>
  <TabItem value="contest" label="Contest Themes">
    The contest welcomes submissions under the following themes:

    * Thought Leadership: Explore various topics about Bitcoin, both new and old, such as Runes, what Satoshi’s writings mean to you, ordinals, layer 2 solutions, sidechains, how Bitcoin changed finance forever, and/or quality analysis about its price prediction or impact on inflation.
    * Dev Stack and Tooling: Delve into the development stack and tooling related to building on Bitcoin, including SDKs, APIs, smart contract development frameworks, etc. Developers and makers should showcase the technical capabilities for building with Bitcoin.
    * Tutorials and Guides: Provide step-by-step tutorials and guides on how to build applications, smart contracts, or implement specific features. Bonus points for building with Rootstock. These tutorials and guides will serve as practical guides for developers and enthusiasts looking to start building on Bitcoin.
  </TabItem>
  <TabItem value="requirements" label="Requirements">
    > RSKj allows you to run a Rootstock node, crucial for local development and testing. It supports connections to Regtest (local), Testnet (testing), and Mainnet (production). Visit the [official RSKj GitHub repository](https://github.com/rsksmart/rskj) to download the latest stable release.
  </TabItem>
</Tabs>

## Heading 2

Miners earn a high percentage of transaction fees from the Rootstock block they mine. This mining process is done with the same hashing power used in Bitcoin mining, and has no additional cost or impact.

### Heading 3

An [ERC20](https://github.com/ethereum/EIPs/issues/20)
token transaction between a regular/non-contract address and contract are two different transactions: You should call `approve` on the token contract and then call `transferFrom` on the other contract when you want to deposit your tokens into it.

#### Heading 4

Rootstock Addresses incorporate an optional blockchain identifier (also known as chainId). If the chainId is not present, it is assumed the address refers to the Rootstock main network.

## Lists

### Unordered list

- The first level of the hierarchy is for *purpose*.
  This is always `44'`, as per the BIP44 specification.
- The second level of the hierarchy is for the *registered coin type*.
  - For Rootstock Mainnet, this should be `137'`, as per the
    [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md "Registered coin types for BIP-0044")
    specification.
  - For Rootstock Testnet, this should be `37310'`, as per the
    [RSKIP-57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md "Derivation Path for Hierarchical Deterministic Wallets")
    specification.
- The final level of the hierarchy is for *index*: Addresses are numbered from index 0 in sequentially increasing manner. This number is used as child index in [BIP32 derivation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#specification-key-derivation "Hierarchical Deterministic Wallets - Key Derivation"). Public derivation is used at this level.

### Ordered List

1. The 2 Way Peg Application is now available on [Testnet](https://app.2wp.testnet.rootstock.io/) and [Mainnet](https://app.2wp.rootstock.io/).
2. For general information about the design and architecture, how to perform a peg-in transaction using Ledger and Trezor, Frequently asked questions and advanced operations you can perform on the 2 way peg app, please refer to the [2 way peg app user guide](/resources/user-guides/two-way-peg-app/).
3. Get information on the signatories and attestion in the [Powpeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation) section.


## Video

<iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Images

![Rootstock Technology Stack - High Level](/img/concepts/rootstock-tech-stack.svg)

![Metamask gas limit](/img/metamask-gas-limit.png)

## Gallery / Slider

<Carousel images={['/img/concepts/rootstock-tech-stack.svg', '/img/legacy-private-key.png', '/img/metamask-gas-limit.png']} />

## Filter

## Admonitions

:::note[Your Title **with** some _Markdown_ `syntax`!]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

[The Smart Bitcoin (RBTC)](#) is the native currency in Rootstock and it is used to pay for the gas required for the execution of transactions. It is pegged 1:1 with Bitcoin, which means in Rootstock there are exactly 21M RBTC. A Powpeg allows the transfer of bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice-versa
make test

:::

:::tip[Tip]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::info[Info]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::warning[Wwarning]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

:::danger[Error]

Some **content** with _Markdown_ `syntax`. Check [this `api`](#).

:::

## Tables


| Product                                                      | Description                                                                                    |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Flyover | Flyover is a fast and secure way for users to transfer BTC in and out of the Rootstock Ecosystem where it can be used to interact with a range of applications to send, save and spend money. |
| RNS | RNS (RIF Name Service) replaces complicated cryptocurrency addresses with easy-to-remember nicknames, simplifying digital asset transactions. It also facilitates the integration of a Self Sovereign Identity protocol into your products, which enhances user security and flexibility. .|
| Wallet | Bring Bitcoin DeFi to your users with RIF Wallet, an open source Bitcoin wallet with smart contract capabilities. Open-source, fully programmable and customizable.|
| [Relay](/developers/integration-guides/rif-relay/) | RIF Relay simplifies gas fee payments by allowing users to pay transaction fees with any ERC20 token. This enables end users to transact entirely using one asset, removing complexity and improving onboarding.|


