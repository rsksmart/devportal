---
sidebar_position: 10
title: Move USDRIF to USDC on OKU | Cross-chain transfers
sidebar_label: Move USDRIF to USDC on OKU 
tags: [rsk, rootstock, oku, usdrif, rbtc rust, tutorials, exchange, resources, move stablecoins from Rootstock]
description: "Want to move your USDRIF from Rootstock to another blockchain to access new DeFi opportunities or a different stablecoin? This guide shows you how to securely and efficiently bridge your USDRIF to USD using the OKU protocol."
---

Want to move tokens from Rootstock to another blockchain to access DeFi opportunities or get a different token? This tutorial demonstrates how to securely and efficiently bridge `USDRIF` on Rootstock to `USDC` on Ethereum using [OKU](https://oku.trade/). Oku is a DeFi aggregator that offers the best swap and bridge rates across any chain including Rootstock. 

## Prerequisites

* Software wallet (e.g., [MetaMask](https://metamask.io/)). 
    * See how to [Configure MetaMask Wallet for Rootstock](https://dev.rootstock.io/dev-tools/wallets/metamask/).
* Make sure you have at least `0.000015` **rBTC** on Rootstock for gas.
    * No rBTC? See how to [Get rBTC](https://rootstock.io/rbtc/#get-rbtc) or how to [Get RIF](https://rif.technology/rif-token/).
* At least `20` USDRIF
    * See how to [Get RIF](https://rif.technology/rif-token/) or [stake RIF](https://app.rootstockcollective.xyz/).
* Ensure you're connected to the **Rootstock** Mainnet network in your wallet.
    * See how to [Add Rootstock network to MetaMask](https://dev.rootstock.io/dev-tools/wallets/metamask/#option-1-add-rootstock-networks-to-metamask-automatically).

## Getting Started

1. Visit [Oku.trade](https://oku.trade/bridge?inputChain=rootstock&inToken=0x3a15461d8ae0f0fb5fa2629e9da7d66a794a6e37&outputChain=ethereum&outToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&inAmount=&outAmount=) and connect wallet.

2. Choose the Bridge Tab and select the asset & amount  
   * Select any **Rootstock token** and enter the **amount** you want to bridge. In this tutorial, we will use **USDRIF**. 
   * Choose the **destination chain** and the **token** you want to receive.

![OKU Bridge USDRIF to USDC](/img/resources/tutorials/oku/1-bridge-usdrif-usdc.png)  

> Note:  The panel on the right shows the route and an estimate of the gas fees

3. Review Transaction

Click on Bridge and review the transaction

![Confirm Transaction](/img/resources/tutorials/oku/2-confirm-transaction.png)

4. Confirm the **spending cap** (approval limit) as prompted.

![Spending Cap OKU MetaMask](/img/resources/tutorials/oku/3-oku-spending-cap.png)

5. View status / progress modals while the bridge executes

![Oku Status and Progress bar](/img/resources/tutorials/oku/4-oku-status-progress.png)

6. Confirm network fee.  

Approve the **network fee** in your wallet when prompted.

![MetaMask Confirm Network Fee](/img/resources/tutorials/oku/5-confirm-network-fee.png)

7. Track activity  

You can monitor progress in your wallet’s **Activity / Transactions** tab.

![Track Activity](/img/resources/tutorials/oku/6-track-activity-metamask.png)

8. Switch networks & verify funds  
* Switch your wallet to the **destination chain - Ethereum** you selected.  
* If the received token isn’t visible, **add/import the token** to your wallet (by address if needed).

![Switch Wallet](/img/resources/tutorials/oku/7-switch-wallet-destination-chain.png) 

> Note:  While waiting for the funds to arrive, no transaction can be done with this address.

All done! Your cross-chain transfer is complete.

## Using OKU to pay for gas

On the destination chain without its **native token**? You can use **OKU** to pay fees with the **same token you’re swapping**.

1. Switch to Swap tab and choose the **token you just funded** and select the **native token** of that chain as the output. 

![Choose native token](/img/resources/tutorials/oku/8-choose-native-token.png) 

> Note: Review the routes section on the right for the transaction details

2. Click ‘**Swap**’ when ready  
     
3. Review Transaction

![Review transaction popup](/img/resources/tutorials/oku/9-review-transaction-popup.png)

4. Confirm the **spending cap** (approval limit) as prompted.

![Confirm Spending Cap Native](/img/resources/tutorials/oku/10-confirm-spending-cap-native.png)

Note: **Fees are paid in the token you’re swapping**, not in the native token.

5. Confirm the swap.  

Approve the **swap transaction** in your wallet.

![Confirm Transaction Request](/img/resources/tutorials/oku/11-confirm-transaction.png)

6. View status / progress modals while the swap executes

![Transaction Successful](/img/resources/tutorials/oku/12-transaction-successful.png)

7. Check your wallet  

Your **native tokens** is now available for gas.

![Native Token Available](/img/resources/tutorials/oku/13-native-token-available.png)