---
sidebar_position: 1400
sidebar_label:  Peg-in using Trezor Hardware Wallet
title: "Performing a peg-in in using Trezor Hardware Wallet"
description: "Here, we will learn how to perform a peg-in transaction using the Trezor Hardware Wallet."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

In this guide, we will be performing a peg in transaction using the [PowPeg App](https://powpeg.rootstock.io/).

## Access Pegin Page

<center>
    <img src="/img/resources/powpeg/pegin.png"  title="Connect Trezor" width="50%"/>
</center>

## Verify if you have enabled **Perform Safety Checks** to **PROMPT**

    > - If is not enabled you will receive this error ![Trezor Error Key Path](/img/resources/powpeg/trezor-error.png) 
    > - This video explains how to enable **Perform Safety Checks** to **PROMPT** on **Trezor Suite** [Enabling Prompt for Key Path](/img/resources/powpeg/trezor-error-fixed.mp4) 
    <Video url="/img/resources/powpeg/trezor-error-fixed.mp4" thumbnail="/img/resources/powpeg/trezor-error.png" />

## Select Trezor Wallet

![Connect Trezor](/img/resources/powpeg/pegin-wallets.png)

## Trezor Hardware Wallet

![Connect Trezor](/img/resources/powpeg/pegin-connect-your-trezor.png)


## Read pop up information

The pop up shown in the image below describes the duration of the peg-in process which requires at least 100 confirmations on the Bitcoin network, this gives an estimate of around 17 hours in total. It also describes the three main steps involved which is; connecting to the hardware wallet, sending a signed transaction to the BTC network until the corresponding RBTC value is made available in the destination wallet and a receipt for this transaction.

> Note: Using fast mode, pegin time has been significantly reduced to ~20 mins.

![Connect Trezor](/img/resources/powpeg/pegin-popup.png)

**Step 1: Connecting to a trezor wallet**

Plug your Trezor wallet by connecting the USB cable that comes with Trezor.

**Step 2: Export multiple addresses**
In this step, the user is redirected to Trezor's site and needs to click on export to export the addresses. 

<center>
    <img src="/img/resources/powpeg/34-export-testnet-addresses.png"  title="Export Testnet Addresses" width="50%"/>
</center>

**Step 3: Enter Pin and confirm**
Enter a pin for your Trezor, displayed on your hardware wallet. Click **confirm**.

<center>
    <img src="/img/resources/powpeg/35-insert-trezor-wallet-pin.png"  title="Insert Trezor Wallet Pin" width="50%"/>
</center>

<center>
    <img src="/img/resources/powpeg/35a-insert-wallet-pin-trezor.png"  title="Insert Wallet Pin - Trezor" width="50%"/>
</center>

**Step 4: Unlock Trezor with passphrase**

<center>
    <img src="/img/resources/powpeg/36-enter-passphrase.png"  title="Enter passphrase" width="50%"/>
</center>

Step 5:
- Type Trezor passphrase
- Trezor will display the message: 'Please enter your passphrase using the computer's keyboard'.

<center>
    <img src="/img/resources/powpeg/36a-enter-passphrase-keyboard.png"  title="Enter Passphrase using Keyboard" width="50%"/>
</center>

The user fills the passphrase, and confirms passphrase fields, using the Trezor Connect application. The user will see this screen on Trezor: "Access Hidden Wallet?".

<center>
    <img src="/img/resources/powpeg/37-access-hidden-wallet-notification.png"  title="Access hidden wallet notification" width="50%"/>
</center>

<center>
    <img src="/img/resources/powpeg/37a-use-passphrase.png"  title="Use passphrase" width="50%"/>
</center>

Now, you have successfully connected your Trezor to the Bitcoin network.

## Performing a peg-in transaction with Trezor
 
**Step 1: Connect to the App**

Click **Continue** to connect to the PowPeg App.

![Connect to the App](/img/resources/powpeg/pegin-trezor-connection.png)

The PowPeg shows the pop-up with the connected usb ledger devices, if your device is not visible, unplug the usb device and plug in again, unlock with a pin and click **Retry** or go back to the [connect ledger wallet](#ledger-hardware-wallet) section.

![Connect device error](/img/resources/powpeg/error-conecting-trezor.png)

To confirm successful connection to the PowPeg, you will be directed to the screen below, where we will perform a Peg-in transaction. 

<center>
    <img src="/img/resources/powpeg/4-confirm-connection-testnet.png"  title="Peg-in screen" width="50%"/>
</center>

> - The balance of the accounts in your hardware wallet will be loaded, and this shows the balance of 3 different types of accounts: segwit, legacy, native segwit. See the [supported addresses](#supported-addresses) for the meaning of these types of accounts.

**Choose Account**

Select the account you would like to send BTC from, by clicking on the dropdown as shown in the image below. 

![Select Testnet Bitcoin Account](/img/resources/powpeg/select-btc-account.png)

**Step 5: Sending a transaction**

**Choose Account**

Select the account you would like to send BTC from, by clicking on the dropdown as shown in the image below. 

![Select Testnet Bitcoin Account](/img/resources/powpeg/select-btc-account.png)

:::info[Info]
For each selected account type, we will see a corresponding balance.ente
:::

<center>
    <img src="/img/resources/powpeg/account-selected-pegin-ledger.png"  title="Bitcoin Account Selected" width="50%"/>
</center>

**Enter Amount**

After selecting the account you will like to send BTC from, the next step is to enter an amount you would like to send. The amount entered appears in the BTC field, and you can see the corresponding amount in USD under transaction summary.

![Enter Amount](/img/resources/powpeg/enter-amount.png)

> - The minimum amount to send to perform a pegin operation is **0.005 BTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The minimum amount to send to perform a pegout operation is **0.004 RBTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - The maximum amount to send to perform a pegout or pegout operation is **10 RBTC / BTC**, any amount greater than this throws an error message: **“The maximum accepted value is 10”**.

> - Note that the amount sent in BTC is the same amount to be received in RBTC on the Rootstock network.

**Step 6: Enter address**

To enter an address, we are provided with two options: 

- (1) Your connected Rootstock address. See [Account based addresses](/concepts/account-based-addresses/) 
- (2) Connect to a software wallet. E.g, Metamask. Here, the address is automatically filled in by the account that is connected to your metamask wallet.

![Enter address](/img/resources/powpeg/ledger-pegin-destination-address.png)

**Tips:**

> - Use the [address verifier](/developers/) to verify if an address is Rootstock-compatible and can be used to perform a peg in a transaction.
> - Use the [Metamask-Rootstock](https://metamask-landing.rifos.org/) tool to automatically connect to Rootstock mainnet or [manually connect metamask to the Rootstock mainnet or testnet](/developers/blockchain-essentials/browser/).

**Step 6a: Add a custom address**

Also you can input a custom Rootstock address, different than the connected address.

Paste destination address:
![Paste address](/img/resources/powpeg/ledger-pegin-paste-destination-address.png)
 
**Step 7: Select Transaction Fee**

Here, we can select the fee that will be used for this transaction, this is set on default to average.

![Select Transaction Fee](/img/resources/powpeg/select-pegin-fee.png)

> - The transaction fee is not part of the amount you’re sending via the PowPeg, it will only be used for the correct processing of the transaction on the Bitcoin network. Also see the different types of fees (slow, average, fast) and their corresponding cost in TBTC and USD, depending on preference, you can choose any of those three. See the [adjusting network fees](/resources/guides/powpeg-app/advanced-operations#adjusting-network-fees) section for more information. 
> - The time for each type of fee per transaction may vary depending on the number of transactions on the network and the fees charged at the time.

**Step 8: Select Mode**

In this section, we will see 2 options, Fast Mode and Native Mode:
- Fast Mode uses [Flyover Protocol](/developers/integrate/flyover/) to search for quotes, is faster than Native Mode, is provided by an Liquidity Provider, which in turn charges a fee for the service, called a provider fee.

![Fast mode option](/img/resources/powpeg/fast-pegin-review-details.png)

- Native Mode uses [PowPeg Protocol](/concepts/powpeg/) that is decentralized, permissionless and uncensorable protocol created by Rootstock Labs, generally is slower than Fast mode and the user needs to pay only the network fees.

![Native mode option](/img/resources/powpeg/native-pegin-review-details.png)

- Value to receive: The estimated amount to receive when transaction finishes.
- Total Fee (Network & Provider): The total fee paid, network fee (BTC Fee) + provider fee (not applied).

> - In the instance of an error on this transaction, the amount will be sent to the address indicated in the **refund Bitcoin address** located in your hardware wallet.
> - See the [glossary](/resources/guides/powpeg-app/glossary/) section for the meaning of these values.

**Step 9: Confirm and sign transaction**

By clicking on the **Send** button, we can see all the transactions that will be made, their corresponding inputs and outputs, and the network fees that will be charged, all this information must be confirmed on your hardware wallet screen.

![View transaction summary](/img/resources/powpeg/ledger-pegin-confirm-and-send-transaction.png)

**Step 10: View transaction status**

This shows the status of your transaction, with a transaction ID and a link to check the transaction on the explorer. 

![view transaction status](/img/resources/powpeg/ledger-pegin-tx-finished.png)

By clicking on the **See Transaction** button, the user can check the status directly in the transaction status page, by clicking in **Start Again** button the user can perform another transaction.

See the [Viewing Peg-in Transaction Status](/resources/guides/powpeg-app/pegin/status) section for more information. 

**Now you have successfully performed a peg-in transaction using the PowPeg App.**