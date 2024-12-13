---
sidebar_label: Using Rootstock in Browser
sidebar_position: 300
title: 'Using Rootstock with a Browser Extension'
description: 'Learn how to interact with Rootstock in your web browser, how to look at Rootstock transactions, develop and deploy your very first smart contract to the Rootstock network.'
tags: [quick-starts, rsk, rootstock, blockchain, browser wallets, developers, beginners]
---

As Rootstock is a blockchain with smart contract capabilities, it is possible to build decentralised applications (dApps) with it.
Most dApps are web applications that you access with a regular Internet browser, such as Chrome.
However, the blockchain interactions require some additional software, which comes in the form of browser extensions.
These browser extensions insert a **web3 provider** object, with the Javascript parts of the web application used to interact with the blockchain, forming an integral part of dApp architecture.

> Note that these browser extensions store your private keys,
> and use them to sign transactions. So keep them secure.

:::note[Rootstock Wallets]
There are several browser extensions that you can use to interact with the Rootstock blockchain, this includes: [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn). For a full list of wallets, see the [Dev Tools](/dev-tools/) section.
:::

Since this is a quick start, we will not go through all of them - just MetaMask.

There are some hidden complexity that we've glossed over in the content above so
you can set up and get running as quickly as possible.
If you would like to delve deeper, here are some resources that we recommend.

## Install Metamask

MetaMask is the most popular browser extension with web3 provider capabilities.
It enables users to buy, store, send and swap tokens.

Metamask also equips you with a key vault, secure login, token wallet, and token exchange—everything you need to manage your digital assets.

Open up Chrome browser, and install the extension from the [Chrome store](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn).

This short video demonstrates how to download and install MetaMask on your browser, and also how to create a wallet to store your crypto assets.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/VlyqXD1TjJk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Cryptography

## Private Keys and Public Keys

In wallet software, you generally see “accounts” represented by addresses on the blockchain network.
In the case of Rootstock, this is `0x` followed by a series of hexadecimal characters, for example, `0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`.
There is some hidden complexity behind that, to do with cryptography, which is necessary to secure the account, and all the blockchain transactions it makes.

- You start off with a private key, which is essentially an extremely large number, and should be randomly generated.
  You should keep the private key secret, because that is what is used to sign transactions.
- A public key is generated from the private key, and this is also a very large number.
  This does not need to be kept secret, because others in the blockchain network use it to verify transactions.
- An address is generated from the public key, and is the hexadecimal string that you see in your wallet software.

### Seed Phrases

When you open up MetaMask for the first time after installing it, you will be asked to initialise it using a seed phrase.
If you have done this before, you can use your own seed phrase. Otherwise, let’s generate a new one!

> To generate a new seed phrase, you will need to create a new wallet.
> See the above steps to create a new wallet.

Most blockchain users operate one or more accounts, and it can be quite difficult to remember the value of cryptographic keys - those very large numbers - you’ll need superhuman memory!
The **seed phrase** is presently the most popular method used to generate, store, remember, and recover keys for crypto wallets, and is something that is approachable for the average user.

It also is the default method used by MetaMask (and many other wallets).
In a nutshell, it takes a randomly generated sequence of dictionary words.
The wallet then uses this sequence of words to generate not one, but multiple sets of cryptographic keys.
This is how MetaMask is able to support multiple accounts using a single seed phrase.

This process is described in detail in the BIP-44 technical standard.
This ensures that the way that seed phrases work is the same between multiple crypto wallets, enabling the same phrase to be portable.

## Configure custom network for Rootstock Testnet

MetaMask comes pre-configured with connections for Ethereum networks.
Let’s use its custom networks feature to add a connection to an Rootstock network.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/VyPewQoWhn0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

After creating the custom network for the Rootstock Testnet, you should be able to interact with smart contracts deployed on the Rootstock Testnet!
You should also see your balances in tRBTC (Testnet RBTC).
This is currently zero, which means that we cannot send any transactions to the blockchain, so let’s get some using the RBTC faucet.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/twfK8Rd5hak" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Now you should have a balance of tRBTC, and you will be able to send transactions on the Rootstock Testnet!

:::info[Additional Faucet Options (Please note these faucets may have daily limits)]

* Use [Thirdweb Faucet](https://thirdweb.com/rootstock-testnet): This faucet offers a convenient way to get free test RBTC tokens for development and testing. Its max daily token allocation is `0.01` tRBTC.
* Use [Blast Faucet](https://blastapi.io/faucets/rootstock-testnet): This faucet offers a convenient way to get free test RBTC tokens for development and testing. It has a higher max daily token allocation of `0.1` tRBTC.

:::

## Configure Custom Token for tRIF

The Rootstock Infrastructure Framework (RIF) includes multiple services for decentralised applications.
These services may be paid for using the RIF token.
Let’s configure MetaMask to be aware of the RIF token.
We’ll use tRIF as the token symbol, since we’re on the Rootstock Testnet.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/QCabRPfr2Zs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Now that MetaMask has the RIF token configured, let’s get some test tokens using the RIF faucet.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/ttb8EOTWey8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Now you should have a balance of tRIF, and you will be able to use RIF services on the Rootstock Testnet!


### Further Reading
- [How to configure Metamask](/dev-tools/wallets/metamask/)
- [Account based addresses on Rootstock](/concepts/account-based-addresses/) 
- [About the RIF token](/concepts/rif-suite/token/)
- [About the RBTC cryptocurrency](/concepts/rbtc/)
- [About Gas](/concepts/rbtc/gas/)
- [About RIF Services](https://www.rifos.org/)
- [About BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [About EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
- [Asymmetric Key Generation](https://en.wikipedia.org/wiki/Public-key_cryptography)
