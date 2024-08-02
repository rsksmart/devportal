---
sidebar_position: 1500
sidebar_label:  Peg-out using Liquality
title: "Performing a peg-out using Liquality Wallet"
description: "Here, we will learn how to perform a peg-out using Liquality Software Wallet."
tags: [2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, trezor, liquality, leger, guide, setup, integrate, use]
---


![2 way peg app (peg-out)](/img/resources/two-way-peg-app/pegout.gif)

## Performing a peg-out transaction using Liquality

The Liquality Wallet is a browser extension for accessing Bitcoin, Rootstock, and Ethereum applications. 

:::warning[Warning]
Liquality Wallet has been discountinued. See section on [Supported wallets](/resources/guides/two-way-peg-app/advanced-operations/supported-wallets) by the 2 Way Peg App.
:::
​
**Step 1: Choose the RBTC - BTC conversion type**

![Select rbtc to btc conversion](/img/resources/two-way-peg-app/select-rbtc-to-btc-conversion.png)
​
**Step 2: Connect your Liquality wallet**
​
![Click connect wallet](/img/resources/two-way-peg-app/connect-wallet-btn.png)
![Select liquality wallet](/img/resources/two-way-peg-app/select-liquality.png)
​
See how to unlock your wallet, if locked.
​
![Waiting wallet connection](/img/resources/two-way-peg-app/unlock-liquality.png)
​
Then, click 'Confirm' to complete the first step.
​
![Confirm metamask wallet connection](/img/resources/two-way-peg-app/confirm-liquality.png)
​
**Step 3: Enter the amount you want to send**

​
You can either enter it manually or click 'Use max available balance' if you want to convert all the rbtc you have.
​
![Rbtc amount to send input](/img/resources/two-way-peg-app/amount-input.png)
​
**Step 4: Verify your Bitcoin destination address**

We don't support the Bitcoin destination address' derivation from Liquality yet, so you have to follow the documentation linked here:
​
![Can't derive destination address using liquality](/img/resources/two-way-peg-app/cant-derive-liquality.png)
​
**Step 5: Send transaction**


Review the information, and click 'Send' in 2-way peg app and then click 'Confirm' in Liquality.
​
![Send pegout transaction](/img/resources/two-way-peg-app/send-liquality.png)
![Confirm pegout transaction on liquality wallet](/img/resources/two-way-peg-app/confirm-liquality.png)

​
The final screen will be like the one below.
![Btc is on its way](/img/resources/two-way-peg-app/final-screen-liquality.png)

​
To see the status of a transaction, click on the *Go to status page* button, you will see a page  as shown below, with your pegout tx and your Bitcoin recipient address information as well.
​
![Transaction status for pegout id](/img/resources/two-way-peg-app/tx-status.png)


This address should match the one you can access through Electrum. See [How to view a derived address](/resources/guides/two-way-peg-app/pegout/deriving-electrum) and [How to check a transaction status](/resources/guides/two-way-peg-app/pegin/status/).

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Design architecture](/resources/guides/two-way-peg-app/advanced-operations/design-architecture/)