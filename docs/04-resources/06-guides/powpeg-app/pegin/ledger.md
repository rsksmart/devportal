---
sidebar_position: 1100
sidebar_label:   Peg-in using Ledger Hardware Wallet
title: "Performing a peg-in using Ledger Hardware Wallet"
description: "Here, we will learn how to perform a peg-in transaction using the PowPeg App."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

## Using hardware wallets

In this guide, we will be using the PowPeg on [PowPeg - Testnet](https://powpeg.testnet.rootstock.io/) for learning purposes, for transactions using real tokens, please use the [PowPeg - Mainnet](https://powpeg.rootstock.io/) App.

:::warning[Warning]

Ensure to complete the steps in [prerequisites](/resources/guides/powpeg-app/prerequisites/) before proceeding with this section.

:::

### Ledger Hardware Wallet

A peg-in is the process of exchanging BTC for RBTC. See the [glossary](/resources/guides/powpeg-app/glossary/) section for more information.

:::tip[Tip]
The minimum values allowed when creating a peg-in transaction is **0.005 BTC**. 
:::

**Step 1: Select pegin option**

![Choose Pegin Option](/img/resources/powpeg/pegin.png)

**Step 2: Select ledger wallet**

![PowPeg (supported-wallets-pegin)](/img/resources/powpeg/pegin-wallets.png)

**Step 3: Read pop up information**

The pop up shown in the image below describes the duration of the peg-in process which requires at least 100 confirmations on the Bitcoin network, this gives an estimate of around 17 hours in total. It also describes the three main steps involved which is; connecting to the hardware wallet, sending a signed transaction to the BTC network until the corresponding RBTC value is made available in the destination wallet and a receipt for this transaction.

> Note: Using fast mode, pegin time has been significantly reduced to ~20 mins.

![Read popup info](/img/resources/powpeg/pegin-popup.png)

> Click the checkbox - “Don’t show again” to turn off this pop-up in the future or close temporarily.

**Step 4: Connect to a ledger wallet**

- Plug your Ledger wallet by connecting the USB cable that comes with the Ledger.
- Enter your pin that has already been configured in [requirements](#requirements), to unlock the Ledger.

![Connect Ledger](/img/resources/powpeg/connect-your-ledger.png)

**Step 5: Enter Pin**

![Enter Pin](/img/resources/powpeg/2-enter-pin.png)

**Step 6: Choose Wallet**

Here, we will use the Bitcoin Test wallet. For Mainnet, use the Bitcoin wallet.

![Choose Wallet](/img/resources/powpeg/3-choose-wallet.png)

_Note: On the Nano S ledger, whenever you want to confirm an option, click on the 2 upper buttons at the same time._

**Step 7: Confirm connection to Network**

Once the above steps have been completed, a confirmation appears - “Bitcoin Testnet is ready”. 

![Confirm Connection Testnet](/img/resources/powpeg/4-confirm-connection-testnet.png)

Now, you have successfully connected your Ledger device to the Bitcoin network.


**Step 8: Connect to the App**

Click **Continue** to connect to the PowPeg App.

![Connect to the App](/img/resources/powpeg/connect-ledger.png)

![Confirm your Ledger wallet](/img/resources/powpeg/connect-ledger2.png)

The PowPeg shows the pop-up with the connected usb ledger devices, if your device is not visible, unplug the usb device and plug in again, unlock with a pin and click **Retry** or go back to the [connect ledger wallet](#ledger-hardware-wallet) section.

![Connect device error](/img/resources/powpeg/error-connecting-ledger.png)

To confirm successful connection to the PowPeg, you will be directed to the screen below, where we will perform a Peg-in transaction. 

![Peg-in screen](/img/resources/powpeg/pegin-screen.png)

> - The balance of the accounts in your hardware wallet will be loaded, and this shows the balance of 3 different types of accounts: segwit, legacy, native segwit. See the [supported addresses](#supported-addresses) for the meaning of these types of accounts.
> - You can connect your destination wallet or paste your destination address.

**Step 9: Sending a transaction**

**Choose Account**

Select the account you would like to send BTC from, by clicking on the dropdown as shown in the image below. 

![Select Testnet Bitcoin Account](/img/resources/powpeg/select-btc-account.png)

:::info[Info]
For each selected account type, we will see a corresponding balance.ente
:::

![Bitcoin Account Selected](/img/resources/powpeg/account-selected-pegin-ledger.png)

**Enter Amount**

After selecting the account you will like to send BTC from, the next step is to enter an amount you would like to send. The amount entered appears in the BTC field, and you can see the corresponding amount in USD under transaction summary.

![Enter Amount](/img/resources/powpeg/enter-amount.png)

> - The minimum amount to send to perform a pegin operation is **0.005 BTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The minimum amount to send to perform a pegout operation is **0.004 RBTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The maximum amount to send to perform a pegout or pegout operation is **10 RBTC / BTC**, any amount greater than this throws an error message: **“The maximum accepted value is 10”**.

> - Note that the amount sent in BTC is the same amount to be received in RBTC on the Rootstock network.

**Step 10: Enter address**

To enter an address, we are provided with two options: 

- (1) Your connected Rootstock address. See [Account based addresses](/concepts/account-based-addresses/) 
- (2) Connect to a software wallet. E.g, Metamask. Here, the address is automatically filled in by the account that is connected to your metamask wallet.

Connect your wallet:

![Connect your wallet](/img/resources/powpeg/ledger-pegin-destination-address.png)


**Step 11: Add a custom address**

Also you can input a custom Rootstock address, different than the connected address.

Paste destination address:
![Paste address](/img/resources/powpeg/ledger-pegin-paste-destination-address.png)

**Step 12: Select Transaction Fee**

Here, we can select the fee that will be used for this transaction, this is set on default to average.

![Select Transaction Fee](/img/resources/powpeg/select-pegin-fee.png)

> - The transaction fee is not part of the amount you’re sending via the PowPeg, it will only be used for the correct processing of the transaction on the Bitcoin network. Also see the different types of fees (slow, average, fast) and their corresponding cost in TBTC and USD, depending on preference, you can choose any of those three. See the [adjusting network fees](/resources/guides/powpeg-app/advanced-operations#adjusting-network-fees) section for more information. 
> - The time for each type of fee per transaction may vary depending on the number of transactions on the network and the fees charged at the time.

**Step 13: Select Mode**

In this section, we will see 2 options, Fast Mode and Native Mode:
- Fast Mode uses [Flyover Protocol](/developers/integrate/flyover/) to search for quotes, is faster than Native Mode, is provided by an Liquidity Provider, which in turn charges a fee for the service, called a provider fee.

![Fast mode option](/img/resources/powpeg/fast-pegin-review-details.png)

- Native Mode uses [PowPeg Protocol](/concepts/powpeg/) that is decentralized, permissionless and uncensorable protocol created by Rootstock Labs, generally is slower than Fast mode and the user needs to pay only the network fees.

![Native mode option](/img/resources/powpeg/native-pegin-review-details.png)

- Value to receive: The estimated amount to receive when transaction finishes.
- Total Fee (Network & Provider): The total fee paid, network fee (BTC Fee) + provider fee (not applied).

> - In the instance of an error on this transaction, the amount will be sent to the address indicated in the **refund Bitcoin address** located in your hardware wallet.
> - See the [glossary](/resources/guides/powpeg-app/glossary/) section for the meaning of these values.

**Step 14: Confirm and sign transaction**

By clicking on the **Send** button, we can see all the transactions that will be made, their corresponding inputs and outputs, and the network fees that will be charged, all this information must be confirmed on your hardware wallet screen.

![View transaction summary](/img/resources/powpeg/ledger-pegin-confirm-and-send-transaction.png)

**Step 15: Send transaction in Ledger Device**

After click on the send button, you can confirm or reject the transaction in your hardware wallet. Unlock ledger device to confirm the transaction.

The user needs to review and approve all outputs, the value of the transaction and the fee of the transaction. This test transaction generates 3 outputs. 

> To approve or confirm any action on the screen, press on the two buttons beside the ledger hardware device at the same time.

**Review and accept output 1**

![review output one](/img/resources/powpeg/21-review-output-one.jpg)

![accept output one](/img/resources/powpeg/22-accept-output-one.jpg)

**Review and accept the output 2**

![review output two](/img/resources/powpeg/23-review-output-two.jpg)

![accept output two](/img/resources/powpeg/24-accept-output-two.jpg)

**Review and accept the output 3**

![review output three](/img/resources/powpeg/25-review-output-three.jpg)

![accept output three](/img/resources/powpeg/26-accept-output-three.jpg)

**Confirm amount of test transactions**

![confirm amount of test tx](/img/resources/powpeg/27-confirm-amount-test-tx.jpg)

**Confirm if the fee value is the same present in the transaction summary screen**.

![confirm fee value](/img/resources/powpeg/28-confirm-fee-value.jpg)

**Now, confirm all transactions**

![confirm transactions](/img/resources/powpeg/29-confirm-transactions.jpg)

**Accept and send the transaction to be broadcasted to the network.**

![accept and send](/img/resources/powpeg/30-accept-and-send.jpg)

> After signing, the transaction is sent to the network to be processed, taking into account the fee value selected previously. 

**Step 16: View transaction status**

This shows the status of your transaction, with a transaction ID and a link to check the transaction on the explorer. 

![view transaction status](/img/resources/powpeg/ledger-pegin-tx-finished.png)

By clicking on the **See Transaction** button, the user can check the status directly in the transaction status page, by clicking in **Start Again** button the user can perform another transaction.

See the [Viewing Peg-in Transaction Status](/resources/guides/powpeg-app/pegin/status) section for more information. 

**Now you have successfully performed a peg-in transaction using the PowPeg.**