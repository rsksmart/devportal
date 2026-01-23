---
sidebar_position: 1800
sidebar_label:  Viewing Peg-out Transaction Status
title: "Viewing the status of a transaction after peg-out"
description: "Here, we will learn how to view  a transaction status after a peg-out."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

## Using the transaction status page

To view a transaction status using the PowPeg App, we will do the following steps;

**Step 1: Go to the homepage**

Visit the [PowPeg App](https://powpeg.rootstock.io/). 

Click on transaction status.

![Transaction status](/img/resources/powpeg/first-page.png)

The processing of a pegout transaction is made up of several dependencies, and for each dependency a processing step is added, and at each step in the process, the pegout is shown in a form on the transaction status query screen.

After finish a pegout you can search for the current status in the [status page](https://powpeg.rootstock.io/status)

**Step 2: Enter Transaction ID**

Copy the transaction ID derived in [Step 12: Performing a Pegout transaction with Ledger](/resources/guides/powpeg-app/pegout/ledger), paste into the field as shown below, click on enter or click on the search icon or click on Enter.

![Transaction status field](/img/resources/powpeg/transaction-status-field.png)

**Step 3: View transaction status**

This shows what stage the transaction is in, the transaction performed was a peg-out transaction (RBTC to BTC), in the image below, you will see whether funds have moved from the Bitcoin network to the Rootstock network, and also when the funds have been successfully delivered to an Rootstock address.

Click on the **refresh** button by scrolling down on the page below to view the updated status.


![Transaction status update](/img/resources/powpeg/transaction-status-pegout.png)

**Rootstock Side**
- Recipient Address: The address when you will receive the funds
- Transaction ID: Rootstock Transaction hash
- Fee: Rootstock Network fee
- You will receive: The amount that you will receive in Recipient Address
**Bitcoin Side:**
- Sender Address: The address used to send BTC
- Transactino ID: Bitcoin Transaction hash
- Fee: Bitcoin Network fee
- You will send: The amount send + fee to the Bitcoin Network


:::danger[Error]
- In case an error occurs with this transaction, the amount will be sent back to the refund Bitcoin address.
- See the [glossary](/resources/guides/powpeg-app/glossary/) section for in-depth definition and explanation of these terms.
:::


## Using Block Explorer

To view transactions status using Block Explorer, you can click on the open windonw icon, or copy transaction ID and paste in your prefered block explorer.
