---
sidebar_position: 1300
sidebar_label:  Viewing Peg-in Transaction Status
title: "Viewing Transaction Status"
description: "Here, we will learn how to view a transaction status on the 2 way peg app."
tags: [2 way peg app, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

The transaction status shows the status of transactions performed using the 2 way peg application.

There are two ways to view the transaction status.

1. Using the Transaction status page on the 2 way peg application.
2. View a transaction using Blockcypher Explorer

### Using the transaction status page

To view a transaction status using the 2 way peg application, we will do the following steps;

**Step 1: Go to the homepage**

Visit: [2 way peg on Testnet](https://app.2wp.testnet.rootstock.io/). 

Click on transaction status.

![Transaction status](/img/resources/two-way-peg-app/39-transaction-status.png)

**Step 2: Enter Transaction ID**

Copy the transaction ID derived in [Step 12: Performing a Pegin transaction with Ledger](#performing-a-peg-in-transaction-with-ledger), paste into the field as shown below, click on enter or click on the search icon.

![Transaction status field](/img/resources/two-way-peg-app/40-transaction-status-field.png)

![Enter transaction ID](/img/resources/two-way-peg-app/41-enter-transaction-id.png)

**Step 3: View transaction status**

This shows what stage the transaction is in, the transaction performed was a peg-in transaction (BTC to RBTC), in the image below, you will see whether funds have moved from the Bitcoin network to the Rootstock network, and also when the funds have been successfully delivered to an Rootstock address, here you can also view the total no of confirmations needed and the estimated time left. 

![Transaction status update](/img/resources/two-way-peg-app/42-transaction-status-update.png)

Click on the **refresh** button by scrolling down on the page below to view the updated status.

![Transaction status full page](/img/resources/two-way-peg-app/43-transaction-status-full-page.png)

**Step 4: View transaction summary**

Here, you can see the following information:

**Device account address:**
- The account address the user is sending from in BTC.

**Amount in BTC:**
- The amount a user is sending

**Destination Rootstock address:**
- The account address to receive the RBTC.

**Refund Bitcoin address**
- The bitcoin address to be refunded

**Transaction fee**
- The transaction fee, its equivalent is specified in BTC and USD

**Transaction total**
- This comprises the BTCs amount + Transaction fee selected.

![Transaction summary started](/img/resources/two-way-peg-app/44-transaction-summary-started.png)

**Transaction completed!**

![Transaction summary completed](/img/resources/two-way-peg-app/45-transaction-summary-completed.png)

:::danger[Error]

- In case an error occurs with this transaction, the amount will be sent back to the address indicated in the refund Bitcoin address located in your hardware wallet.
- See the [glossary](/resources/guides/two-way-peg-app/glossary/) section for in-depth definition and explanation of these terms.
:::

### Using Blockcypher Explorer

To view transactions status using Blockcypher Explorer, we will do the following:

**Step 1: Click the transaction link**

In the successful transaction notification page, click the transaction link.

![Transaction successful page](/img/resources/two-way-peg-app/46-transaction-successful-page.png)

This automatically opens a new tab which leads to viewing the transaction status directly on [Blockcypher](https://live.blockcypher.com/). 

![Blockcypher Explorer](/img/resources/two-way-peg-app/47-blockcypher-explorer.png)

Alternatively, you can copy the transaction ID from the successful transaction notification page.

**Step 1a: Visit Blockcypher Explorer**

Once you’re on the [Blockcypher explorer](https://live.blockcypher.com/), toggle on Bitcoin Testnet as shown in image below;

![Choose Bitcoin Testnet](/img/resources/two-way-peg-app/48-choose-bitcoin-testnet.png)

**Step 1b: Paste Transaction ID**

Paste transaction ID into search field and click on Search icon or press enter.

![Enter Transaction ID](/img/resources/two-way-peg-app/49-enter-transaction-id.png)

This shows the status for the transaction.

![Blockcypher Transaction Status](/img/resources/two-way-peg-app/50-blockcypher-transaction-status.png)