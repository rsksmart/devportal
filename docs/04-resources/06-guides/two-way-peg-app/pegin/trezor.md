---
sidebar_position: 1400
sidebar_label:  Peg-in using Trezor Hardware Wallet
title: "Performing a peg-in in using Trezor Hardware Wallet"
description: "Here, we will learn how to perform a peg-in transaction using the Trezor Hardware Wallet."
tags: [2 way peg app, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

In this guide, we will be using performing a peg in transaction using the [2 way peg app](https://app.2wp.rootstock.io/) application.

## Trezor Hardware Wallet

![Connect Trezor](/img/resources/two-way-peg-app/33-connect-trezor.png)

**Step 1: Connecting to a trezor wallet**

Plug your Trezor wallet by connecting the USB cable that comes with Trezor.

**Step 2: Export multiple addresses**
In this step, the user is redirected to Trezor's site and needs to click on export to export the addresses. 

![Export Testnet Addresses](/img/resources/two-way-peg-app/34-export-testnet-addresses.png)

**Step 3: Enter Pin and confirm**
Enter a pin for your Trezor, displayed on your hardware wallet. Click **confirm**.

![Insert Trezor Wallet Pin](/img/resources/two-way-peg-app/35-insert-trezor-wallet-pin.png)

![Insert Wallet Pin - Trezor](/img/resources/two-way-peg-app/35a-insert-wallet-pin-trezor.png)

**Step 4: Unlock Trezor with passphrase**

![Enter passphrase](/img/resources/two-way-peg-app/36-enter-passphrase.png)

Step 5:
- Type Trezor passphrase
- Trezor will display the message: 'Please enter your passphrase using the computer's keyboard'.

![Enter Passphrase using Keyboard](/img/resources/two-way-peg-app/36a-enter-passphrase-keyboard.png)

The user fills the passphrase, and confirms passphrase fields, using the Trezor Connect application. The user will see this screen on Trezor: "Access Hidden Wallet?".

![Access hidden wallet notification](/img/resources/two-way-peg-app/37-access-hidden-wallet-notification.png)

![Use passphrase](/img/resources/two-way-peg-app/37a-use-passphrase.png)

Now, you have successfully connected your Trezor to the Bitcoin network.

## Performing a peg-in transaction with Trezor

![Waking Device](/img/resources/two-way-peg-app/38-waking-device.png)

**Step 1: Select Conversion Type**

Since we are performing a peg-in, choose the BTC - RBTC conversion type, as shown in the image below;

![Select Conversion Type](/img/resources/two-way-peg-app/5-select-conversion-type.png)

**Step 2: Choose Hardware Wallet**

Here, we are using the ledger hardware wallet to interact with the 2 way peg app. Select your hardware wallet, ensure your device is already connected by inserting your pin into the Ledger device before clicking the Ledger option in the 2 way peg app. See the [connect to a ledger wallet](#ledger-hardware-wallet) section. 

![Choose Hardware wallet](/img/resources/two-way-peg-app/6-choose-hardware-wallet.png)

**Step 3: Read pop up information**

The pop up shown in the image below describes the duration of the peg-in process which requires at least 100 confirmations on the Bitcoin network, this gives an estimate of around 17 hours in total. It also describes the three main steps involved which is; connecting to the hardware wallet, sending a signed transaction to the BTC network until the corresponding RBTC value is made available in the destination wallet and a receipt for this transaction.

![Read popup info](/img/resources/two-way-peg-app/7-read-popup-info.png)

> Click the checkbox - “Don’t show again” to turn off this pop-up in the future or close temporarily.

**Step 4: Connect to the app**

Click **Continue** to connect to the 2 way peg application.

![Connect to the app](/img/resources/two-way-peg-app/8-connect-to-the-app.png)

The 2 way peg app shows the pop-up with the connected usb ledger devices, if your device is not visible, unplug the usb device and plug in again, unlock with a pin and click **Retry** or go back to the [connect ledger wallet](#ledger-hardware-wallet) section.

![Connect device error](/img/resources/two-way-peg-app/8a-connect-device-error.png)

To confirm successful connection to the 2 way peg app, you will be directed to the screen below, where we will perform a Peg-in transaction. 

![Peg-in screen](/img/resources/two-way-peg-app/8b-pegin-screen.png)

> - The balance of the accounts in your hardware wallet will be loaded, and this shows the balance of 3 different types of accounts: segwit, legacy, native segwit. See the [supported addresses](#supported-addresses) for the meaning of these types of accounts.

**Step 5: Sending a transaction**

**Choose Account**

Select the account you would like to send BTC from, by clicking on the dropdown as shown in the image below. 

![Select Testnet Bitcoin Account](/img/resources/two-way-peg-app/9-select-testnet-btc-account.png)

> Note that for each selected account type, we will see a corresponding balance in the 'Device account' field in transaction summary section on the right hand side of the screen.

**Enter Amount**

After selecting the account you will like to send BTC from, the next step is to enter an amount you would like to send. The amount entered appears in the BTC field, and you can see the corresponding amount in USD under transaction summary.

![Enter Amount](/img/resources/two-way-peg-app/10-enter-amount.png)

> - The minimum amount to send to perform a pegin operation is **0.005 BTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The minimum amount to send to perform a pegout operation is **0.004 RBTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.

> - Note that the amount sent in BTC is the same amount to be received in RBTC on the Rootstock network.

**Step 6: Enter address**

To enter an address, we are provided with two options: 

- (1) Manually enter or copy and paste an Rootstock compatible address. See [Account based addresses](/concepts/account-based-addresses/) 
- (2) Connect to a software wallet. E.g, Metamask. Here, the address is automatically filled in by the account that is connected to your metamask wallet.

![Enter address](/img/resources/two-way-peg-app/11-enter-address.png)

**Tips:**

> - Use the [address verifier](/developers/) to verify if an address is Rootstock-compatible and can be used to perform a peg in a transaction.
> - Use the [Metamask-Rootstock](https://metamask-landing.rifos.org/) tool to automatically connect to Rootstock mainnet or [manually connect metamask to the Rootstock mainnet or testnet](/developers/blockchain-essentials/browser/).

**Step 6a: Click on Connect Wallet**

![Click Connect Wallet](/img/resources/two-way-peg-app/12-click-connect-wallet.png)

**Step 6b: Choose your preferred wallet**

In this section, we will use the Liquality wallet.

![Choose Liquality wallet](/img/resources/two-way-peg-app/13-choose-liquality-wallet.png)

This triggers a pop-up. Ensure to check the wallet address and the network automatically selected by Liquality. Grant the requested permissions to liquality by clicking on **Confirm**.

> See connect with [Metamask](/dev-tools/wallets/metamask/#connect-with-metamask).

**Step 6c: Confirm Details**

![Confirm network details](/img/resources/two-way-peg-app/14-confirm-network-details.png)

This automatically connects your wallet and adds a destination address. You can choose to disconnect the wallet by clicking on the **Disconnect wallet** button.

![Select Address](/img/resources/two-way-peg-app/15-select-address.png)

**Step 7: Select Transaction Fee**

Here, we can select the fee that will be used for this transaction, this is set on default to average.

![Select Transaction Fee](/img/resources/two-way-peg-app/16-select-transaction-fee.png)

> - The transaction fee is not part of the amount you’re sending via the 2 way peg app, it will only be used for the correct processing of the transaction on the Bitcoin network. Also see the different types of fees (slow, average, fast) and their corresponding cost in TBTC and USD, depending on preference, you can choose any of those three. See the [adjusting network fees](/resources/guides/two-way-peg-app/advanced-operations#adjusting-network-fees) section for more information. 
> - The time for each type of fee per transaction may vary depending on the number of transactions on the network and the fees charged at the time.

**Step 8: View transaction summary**

In this section, we can confirm the selected values:

- Device account address
- Amount in BTC
- Destination Rootstock address
- Refund Bitcoin address
- Transaction fee in BTC and USD
- Transaction total (BTCs amount + Transaction fee selected)

![Transaction Summary](/img/resources/two-way-peg-app/17-transaction-summary.png)

> - In the instance of an error on this transaction, the amount will be sent to the address indicated in the **refund Bitcoin address** located in your hardware wallet.
> - See the [glossary](/resources/guides/two-way-peg-app/glossary/) section for the meaning of these values.

**Step 9: Continue and sign transaction**

By clicking on the **Continue** button, we can see all the transactions that will be made, their corresponding inputs and outputs, and the network fees that will be charged, all this information must be confirmed on your hardware wallet screen.

![View transaction summary](/img/resources/two-way-peg-app/18-view-transaction-summary.png)

Under transaction summary, we can see the **destination** and **refund** address, as well as the **Powpeg** recipient address. After confirming these details are correct, click on the **sign** button, and confirm all information on your hardware wallet.

![Sign Transaction Summry](/img/resources/two-way-peg-app/19-transaction-summary-sign.png)


**Step 12: View transaction status**

This shows the status of your transaction, with a transaction ID and a link to check the transaction on the explorer. 

![view transaction status](/img/resources/two-way-peg-app/31-view-transaction-status.png)

By clicking on the transaction link, the user can check the status directly in the block explorer, outside the 2 way peg app application, and view the data on the bitcoin blockchain. 

![View transaction on Blockcypher](/img/resources/two-way-peg-app/32-view-tx-blockcypher.png)

> Users can also copy the transaction id to view the status of their transaction on the Bitcoin network. See the view transaction status section for how to view transaction status.

Click **Done**.

**Now you have successfully performed a peg-in transaction using the 2 way peg application.**