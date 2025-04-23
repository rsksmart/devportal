---
sidebar_position: 1300
sidebar_label: Viewing Peg-in Transaction Status
title: Viewing Transaction Status
description: Here, we will learn how to view a transaction status on the PowPeg App.
tags:
  - powpeg app
  - peg-in
  - peg-out
  - bridge
  - rsk
  - rootstock
---

The transaction status shows the status of transactions performed using the PowPeg App.

There are two ways to view the transaction status.

1. Using the Transaction status page on the PowPeg App.
2. View a transaction using Blockcypher Explorer

### Using the transaction status page

To view a transaction status using the PowPeg App, we will do the following steps;

**Step 1: Go to the homepage**

Visit: [2 way peg](https://powpeg.rootstock.io/).

Click on transaction status.

![Transaction status](/img/resources/powpeg/first-page.png)

**Step 2: Enter Transaction ID**

Copy the transaction ID derived in [Step 12: Performing a Pegin transaction with Ledger](#performing-a-peg-in-transaction-with-ledger), paste into the field as shown below, click on enter or click on the search icon or click on Enter.

![Transaction status field](/img/resources/powpeg/transaction-status-field.png)

**Step 3: View transaction status**

This shows what stage the transaction is in, the transaction performed was a peg-in transaction (BTC to RBTC), in the image below, you will see whether funds have moved from the Bitcoin network to the Rootstock network, and also when the funds have been successfully delivered to an Rootstock address.

Click on the **refresh** button by scrolling down on the page below to view the updated status.

![Transaction status update](/img/resources/powpeg/transaction-status-pegin.png)

**Step 4: View transaction summary**

Here, you can see the following information:

**Bitcoin Side:**

- Sender Address: The address used to send BTC
- Transactino ID: Bitcoin Transaction hash
- Fee: Bitcoin Network fee
- You will send: The amount send + fee to the Bitcoin Network

**Rootstock Side**

- Recipient Address: The address when you will receive the funds
- Transaction ID: Rootstock Transaction hassh
- Fee: Rootstock Network fee
- You will receive: The amount that you will receive in Recipient Address

:::danger\[Error]

- In case an error occurs with this transaction, the amount will be sent back to the refund Bitcoin address.
- See the [glossary](/resources/guides/powpeg-app/glossary/) section for in-depth definition and explanation of these terms.
  :::

### Using Block Explorer

To view transactions status using Block Explorer, you can click on the open windonw icon, or copy transaction ID and paste in your prefered block explorer.