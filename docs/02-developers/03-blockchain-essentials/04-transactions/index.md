---
title: 'Exploring Rootstock Transactions'
sidebar_position: 400
sidebar_label: Rootstock Transactions
description: 'Learn how to interact with Rootstock in your web browser, how to look at Rootstock transactions, develop and deploy your very first smart contract to the Rootstock network.'
tags: [quick-starts, rsk, rootstock, blockchain, browser wallets, developers, beginners]
---

In the previous section on [blockchain overview](/developers/blockchain-essentials/overview/), we set up a browser extension that is a crypto wallet, MetaMask. We connected to the Rootstock Testnet, and loaded this up with Rootstock’s cryptocurrency, RBTC, and an Rootstock-based token, RIF.

:::note[Using Rootstock in the browser]

If you are yet to do the above, we encourage you to go back and complete that step first. See: [Using Rootstock in the browser](/developers/blockchain-essentials/browser/).

:::

## Block Explorer

Now that we are set up, let’s explore some transactions!
The Rootstock network is an **immutable public ledger**.
Let’s dissect that phrase:

- **Ledger**: An ordered list of transactions recorded in some form
- **Immutable**: The way this ledger is recorded and stored means that any existing transactions may not be deleted or modified. You may also think of it as being an “append-only” ledger.
- **Public**: The contents of this ledger are open and transparent, therefore anyone connected to this network can view every single transaction in history.

This is where block explorers come in.
They are a special type of software that connect to a blockchain network, and display the data from this immutable public ledger.

Since it is open and transparent, there is nothing stopping multiple block explorers from displaying the data in a single blockchain. This is certainly true for Rootstock, and there are multiple block explorers. We’ll use the canonical one here, however, feel free to use other block explorers too!

### View account in the block explorer

Watch this short video demonstrating how to view an account in the block explorer.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/p-q7NBmEqBo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

For the Rootstock Mainnet, we would go to [`explorer.rootstock.io`](https://explorer.rootstock.io/).
However, since we are currently connected to the Rootstock Testnet, we go to [`explorer.testnet.rootstock.io`](https://explorer.testnet.rootstock.io/) instead.

## Transfer tRBTC

So far, you have not made any transactions from your address. The transactions that you see when you view the address in the block explorer were made from other addresses (in this case, a couple of Testnet faucets). Now, it’s time for you to initiate your own transactions!

Watch this short video demonstrating **how to transfer tRBTC from one account to another**.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/fMdiNeDLKo0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

We’ll start by transferring cryptocurrency from your address, back to the faucet’s address.

## Transfer tRIF

Watch this short video demonstrating **how to transfer tRIF from one account to another**.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/ncCzQnnMVr8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## RBTC Balance Decrease

You may have noticed that when you sent tRBTC, the tRBTC balance decreased by **slightly more** than the amount that you sent. You may also have noticed that when you sent tRIF, the tRBTC balance also decreased by a small amount, even though only tRIF were sent in that transaction.

You would have seen this in the transaction confirmation screens when you confirmed each transaction.

This is **not an error**, it is simply a fundamental aspect of how blockchain networks function - any time you add a transaction to the blockchain, you must pay the network a fee to compensate them for their computational costs.

## View Transactions

When you performed each of the transactions, you should have received notifications in popups.

However, if you missed this, not to worry, you can also find this within the transaction history within MetaMask. To do so, within the main screen of MetaMask, click on the “Activity” tab. You’ll see the list of the transactions.

Then you click on any transaction, and click on the arrow button beside copy button named transaction ID, this takes you to the [Testnet explorer](https://explorer.testnet.rootstock.io)

If you clicked on the popup notification, or if you find it within the “Activity” tab, either way, this should open up the block explorer with the selected transaction selected.

For the transaction of the tRBTC transfer, you should see this

You will notice that this transaction has an amount.

For the transaction of the tRIF transfer, you should see this

You will notice that this transaction has a zero amount, but it does emit some events, which is because the smart contract of the RIF token does this.

## View Network Stats

So far we have checked out individual addresses and transactions. These are very detailed and specific information. What if you were after the big picture instead? A bird’s eye view of the Rootstock blockchain as a whole?

For this, we will not use the Rootstock Block explorer, and instead use the [Rootstock Stats](https://stats.rootstock.io) page.

Here, we can see some very important numbers such as the average block duration, and the merged mining hash rate - and several other important technical indicators of the Rootstock network.
A key indicator to look for is the average block time, which should be approximately 33s. Another key indicator to look for is the percentage of the Bitcoin network’s hash rate that is merge mining Rootstock.