---
sidebar_position: 1200
sidebar_label:  Peg-in using Leather Software Wallet
title: "Performing a peg-in using Leather Software Wallet"
description: "Here, we will learn how to perform a peg-in transaction using the Leather Software Wallet."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

## Using Leather Software wallet to perform a peg-in

In this guide, we will be using the [PowPeg App](https://powpeg.rootstock.io/) for unlocking Leather, access peg-in to use Leather, and verify if peg-in is active.

### Acessing pegin to use Leather

![leather-pegin](/img/resources/powpeg/pegin-wallets.png)

After click on **Leather** button, you will see the pegin Leather page, then the PowPeg will connect with your Leather wallet.

> NOTE: To know how to install the Leather chrome plugin, go to [Leather Page](https://leather.io/).

### Unlocking Leather

Unlock Leather using the same password that you created in the installation.

![leather-error](/img/resources/powpeg/leather-unlock-2.png)

<center>
    <img src="/img/resources/powpeg/leather-unlock.png"  title="leather unlocking" width="50%"/>
</center>

### Using Correct Network on Leather

If you see the message below, it means that your Leather wallet is in the incorrect environment, change it to the correct environment and try again.

![leather-error](/img/resources/powpeg/incorrect-network-leather.png)

Select the correct environment on Leather:

<center>
    <img src="/img/resources/powpeg/change-network1.png"  title="leather environment" width="50%"/>
</center>

<center>
    <img src="/img/resources/powpeg/change-network2.png"  title="leather environment 2" width="50%"/>
</center>

### Verifying if the plugin is active

If you see the message below, it means that your Leather wallet is not enabled, change it to enable and use the software wallet.

![leather-not-activated](/img/resources/powpeg/leather-not-enabled.png)

Go to chrome (manage extensions)[chrome://extensions/] and active your Leather wallet

<center>
    <img src="/img/resources/powpeg/enable-leather.png"  title="leather not activated" width="50%"/>
</center>

<center>
    <img src="/img/resources/powpeg/enable-leather2.png"  title="leather not activated" width="50%"/>
</center>

**Step 1: Creatting a transaction**

**Enter Amount**

The next step is to enter an amount you would like to send. The amount entered appears in the BTC field, and you can see the corresponding amount in USD under transaction summary.

![Enter Amount](/img/resources/powpeg/enter-amount.png)

> - The minimum amount to send to perform a pegin operation is **0.005 BTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The minimum amount to send to perform a pegout operation is **0.004 RBTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The maximum amount to send to perform a pegout or pegout operation is **10 RBTC / BTC**, any amount greater than this throws an error message: **“The maximum accepted value is 10”**.

> - Note that the amount sent in BTC is the same amount to be received in RBTC on the Rootstock network.

**Step 2: Enter address**

To enter an address, we are provided with two options: 

- (1) Your connected Rootstock address. See [Account based addresses](/concepts/account-based-addresses/) 
- (2) Connect to a software wallet. E.g, Metamask. Here, the address is automatically filled in by the account that is connected to your metamask wallet.

![Enter address](/img/resources/powpeg/ledger-pegin-destination-address.png)

**Step 3: Add a custom address**

Also you can input a custom Rootstock address, different than the connected address.

**Step 4: Select Transaction Fee**

Here, we can select the fee that will be used for this transaction, this is set on default to average.

**Step 5: Select Mode**

In this section, we will see 2 options, Fast Mode and Native Mode:
- Fast Mode uses [Flyover Protocol](/developers/integrate/flyover/) to search for quotes, is faster than Native Mode, is provided by an Liquidity Provider, which in turn charges a fee for the service, called a provider fee.

![Fast mode option](/img/resources/powpeg/fast-pegin-review-details.png)

- Native Mode uses [PowPeg Protocol](/concepts/powpeg/) that is decentralized, permissionless and uncensorable protocol created by Rootstock Labs, generally is slower than Fast mode and the user needs to pay only the network fees.

![Native mode option](/img/resources/powpeg/native-pegin-review-details.png)

- Value to receive: The estimated amount to receive when transaction finishes.
- Total Fee (Network & Provider): The total fee paid, network fee (BTC Fee) + provider fee (not applied).

> - In the instance of an error on this transaction, the amount will be sent to the address indicated in the **refund Bitcoin address** located in your hardware wallet.
> - See the [glossary](/resources/guides/powpeg-app/glossary/) section for the meaning of these values.

**Step 6: Confirm the Transaction**

![leather-verify](/img/resources/powpeg/confirm-leather-pegin-tx.png)

 **Step 7: View transaction status**

This shows the status of your transaction, with a transaction ID and a link to check the transaction on the explorer. 

![view transaction status](/img/resources/powpeg/ledger-pegin-tx-finished.png)

By clicking on the **See Transaction** button, the user can check the status directly in the transaction status page, by clicking in **Start Again** button the user can perform another transaction.

See the [Viewing Peg-in Transaction Status](/resources/guides/powpeg-app/pegin/status) section for more information. 

**Now you have successfully performed a peg-in transaction using the PowPeg App.**