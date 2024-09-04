---
sidebar_position: 1400
sidebar_label:  Peg-out using Ledger
title: "Performing a peg-out using Ledger Hardware Wallet"
description: "Here, we will learn how to perform a peg-out using Ledger Hardware Wallet."
tags: [2 way peg app, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

![PowPeg (peg-out)](/img/resources/powpeg/pegout.gif)

## Performing a peg-out transaction using rLogin(Trezor and Ledger)

​> - Note that we will be using the PowPeg on [PowPeg - Testnet](https://powpeg.testnet.rootstock.io/) for learning purposes.
> - For transactions using **real tokens**, use the [PowPeg - Mainnet](https://powpeg.rootstock.io/) application.
> - We're using Ledger Nano and Trezor One hardware wallets on this tutorial.
> - To use Ledger hardware wallet to create a **peg-in** see [How to perform a peg-in transaction using Ledger](/resources/guides/powpeg/pegin/ledger/)
> - To use Trezor hardware wallet to create a **peg-in** see [How to perform a peg-in transaction using Trezor](/resources/guides/powpeg/pegin/trezor/)


### Get started with Ledger

To perform a peg-out transaction using the Ledger device directly, follow the steps below:

Step 1:  Plug the Ledger device into the computer

Step 2: Enter your pin to unlock it

Step 3: On the device, navigate to the TRSK or RSK Test app on your Ledger device
​

Step 4: Access **peg-out** screen:

![pegout screen](/img/resources/powpeg/pegout-button.png)

Step 5: Choose Ledger option:
![connect-wallet](/img/resources/powpeg/pegout-ledger-trezor-connection.png)

Step 6: Click on **Ledger** button <br/>
![connect-wallet](/img/resources/powpeg/using-hd-wallets/ledger.png)


Step 8: The application will show what network you are connecting on. For this tutorial we are using **Testnet**
![network](/img/resources/powpeg/using-hd-wallets/network.png)

Step 9: The application will show a simple tutorial:
![1-plug](/img/resources/powpeg/using-hd-wallets/1-plug.png)
![2-install](/img/resources/powpeg/using-hd-wallets/2-install.png)
![3-close](/img/resources/powpeg/using-hd-wallets/3-close.png)
![4-open](/img/resources/powpeg/using-hd-wallets/4-open.png)
![5-confirm](/img/resources/powpeg/using-hd-wallets/5-confirm.png)

Step 10: Click on the **Finish tutorial and connect** button: <br/>
![6-finish](/img/resources/powpeg/using-hd-wallets/6-finish.png)

Step 11: Select an account <br/>
![7-select](/img/resources/powpeg/using-hd-wallets/select.png)

Step 12: Ledger Connected <br/>
![8-connected](/img/resources/powpeg/using-hd-wallets/ledger-connected.png)
<br/>
Step 13: Continue filling in the other fields as amount and click on the Send button

Step 14: After finish the pegout transaction creation, click here to see how to see the steps to access to Bitcoin derived address in hardware wallet using [Electrum](/resources/guides/powpeg/advanced-operations#electrum-hardware-wallets)

----

## Next

* See [Performing a peg-out transaction using Ledger and Liquality](/resources/guides/powpeg/pegout/ledger-liquality/)


----

## Resources
* PowPeg frontend [repo](https://github.com/rsksmart/2wp-app)
* PowPeg backend [repo](https://github.com/rsksmart/2wp-api)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Design architecture](/resources/guides/powpeg/advanced-operations/design-architecture/)