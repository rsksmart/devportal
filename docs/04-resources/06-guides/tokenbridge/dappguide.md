---
sidebar_position: 301
sidebar_label: Token Bridge dApp Guide
title: Tokenbridge dApp Guide - Cross-Chain Transactions
tags: [resources, tokenbridge, blockchain, bridges, tokens, ethereum, rootstock, rsk]
---

This guide describes the steps to transfer tokens using the Web Interface for the [Rootstock Token Bridge dApp](https://dapp.tokenbridge.rootstock.io/). Please refer to the project documentation, if you’d like to know more about how this bridge works. It is possible to test the transfer of tokens between Rootstock Testnet and Sepolia networks, or Rootstock Mainnet and Ethereum networks using the Rootstock Tokenbridge web interface.

## Prerequisites

This will require the use of either Chrome or Chromium web browser, with one of the following wallet browsers extensions:
- [Metamask](https://metamask.io/download.html) using a [custom network](/dev-tools/wallets/metamask/) to add the Rootstock network.
- Get test tokens from the [Rootstock Token Faucet](https://rsksmart.github.io/rsk-token-faucet/)
- Get [Test Sepolia ETH](https://www.alchemy.com/faucets/ethereum-sepolia)

:::tip[Tip]
- See the Tools Section for a list of [wallets compatible with Rootstock](/dev-tools/)
- See the [Contract addresses](/resources/guides/tokenbridge/contractaddresses/) section for a list of contract addresses.
:::

## Get Started

Start by connecting your wallet and select the network of your choice, in this case we will use [Rootstock Testnet](https://dapp.testnet.bridges.rootstock.io/) network.

<img src="/img/resources/tokenbridge/dapp-image1-1.png" alt="tokenbridge connect"/>

Choose from the list of available wallet types, for this guide, we will connect to a Metamask Wallet:

<img src="/img/resources/tokenbridge/dapp-image1-1a.png" alt="token bridge wallet connected" />

You should see the following screen:

<img src="/img/resources/tokenbridge/dapp-image1-2.png" alt="token bridge token bridge connected" />

Then choose the original network token that you want to transfer, enter the amount, and the receiver address. 

<img src="/img/resources/tokenbridge/dapp-image2.png" alt="token bridge approve" />

Click the `Continue` button.

:::info[Info]

- For example, tRUSDT, RDAI, RUSDC, or RLINK, etc token can be obtained from the [Rootstock Token](https://rsksmart.github.io/rsk-token-faucet/) Faucet. 
You will need to approve the bridge contract to use the token, this will happen only once.

- Min transfer is 1RUSDT and max transfer is 250,000RUSDT

:::

Confirm transaction, fees, and confirmation time and click on **Transfer Tokens from Rootstock Testnet**.

<img src="/img/resources/tokenbridge/dapp-image3.png" />

:::warning[Important]

Don't use the bridge to send tokens to your exchange address, you won't be able to claim it

:::

As soon as the process starts, you will see a loader and a popup from Metamask asking to approve and confirm the transaction.

<img src="/img/resources/tokenbridge/dapp-image4.png" alt="token bridge wait for transaction" />

Once the tokens have crossed, **you need to claim them on the Sepolia network**., you will be asked to switch network to Sepolia. Click on **switch network to Sepolia** and approve in MetaMask.

> Switching to the opposite network is important in order to claim your tokens.

<img src="/img/resources/tokenbridge/dapp-image5.png"  alt="switch network to Sepolia" />

If everything worked correctly, you should see a prompt to **Claim Tokens**. Click on the claim button.

<img src="/img/resources/tokenbridge/dapp-image6.png" />

A confirmation popup will appear to send the claim transaction to the network, submit it. You should see a confirmation screen.

<img src="/img/resources/tokenbridge/dapp-image7.png" alt="token bridge claim button" />

After the transaction get mined, you can see your transaction as Claimed by checking your transaction list of claims.

<img src="/img/resources/tokenbridge/dapp-image8.png" alt="token bridge claimed transaction"/>

:::success[Success]
- You can check the token contract on the other network by clicking on the transaction hash (in this case RUSDT).
You can also confirm the funds in your wallet. To do this add a custom token on the network where the token crossed using the address mentioned before.

- You can transfer tokens in the other direction too, using the same method.

:::