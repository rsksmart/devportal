---
sidebar_position: 11
title: Move USDRIF to USDC on Symbiosis | Cross-chain transfers
sidebar_label: Move USDRIF to USDC on Symbiosis 
tags: [rsk, rootstock, symbiosis, usdrif, rbtc rust, tutorials, exchange, resources, move stablecoins from Rootstock]
description: "Want to move your USDRIF from Rootstock to another blockchain to access new DeFi opportunities or a different stablecoin? This guide shows you how to securely and efficiently bridge your USDRIF to USDC using Symbiosis."
---

Symbiosis is a cross-chain AMM DEX that enables asset transfers and swaps on Rootstock. Want to move tokens from Rootstock to other blockchains? This tutorial demonstrates how to securely and efficiently bridge `USDRIF` on Rootstock to `USDC` on Ethereum using [Symbiosis](https://symbiosis.finance/). 
 
## Prerequisites

* Software wallet (e.g., [MetaMask](https://metamask.io/)). 
    * See how to [Configure MetaMask Wallet for Rootstock](https://dev.rootstock.io/dev-tools/wallets/metamask/).
* Ensure to have at least `0.000015` **rBTC** on Rootstock for gas.
    * No rBTC? See how to [Get RBTC](https://rootstock.io/rbtc/#get-rbtc)
* A minimum of 20 USDRIF
    * See how to [Get RIF](https://rif.technology/rif-token/) or [stake RIF](https://app.rootstockcollective.xyz/).
* Ensure you're connected to the **Rootstock** Mainnet network in your wallet.
    * See how to [Add Rootstock network to MetaMask](https://dev.rootstock.io/dev-tools/wallets/metamask/#option-1-add-rootstock-networks-to-metamask-automatically).

## Getting Started

1. Visit [Symbiosis](https://symbiosis.finance/) and click on [Go to Swap](https://app.symbiosis.finance/swap).

2. Connect Wallet and choose the asset & amount
    * Select a Rootstock token and enter the amount you want to bridge.
    * Select the destination chain and the token you want to receive 
3. Approve
![Approve USDRIF](/img/resources/tutorials/symbiosis/1-approve-usdrif.png)

> Note: The panel at the bottom shows the route and an estimate of the gas fees

4. Confirm the spending cap (approval limit) as prompted.

![Confirm Spending Cap USDRIF](/img/resources/tutorials/symbiosis/2-confirm-spending-cap.png)

5. Rates often fluctuates, click the ‘Update Rates’ button

![Update Rates](/img/resources/tutorials/symbiosis/3-update-rates.png)

Observe the rate changes in the image below:

![View Updated Rates](/img/resources/tutorials/symbiosis/4-view-updated-rates.png)

6. Confirm the swap transaction

![Confirm Swap Transaction](/img/resources/tutorials/symbiosis/5-confirm-swap-transaction.png)

7. Review the transaction status popup for step by step updates

![Step by step updates](/img/resources/tutorials/symbiosis/6-step-by-step-updates.png)

8. Track wallet activity

You can monitor progress in your wallet’s **Activity / Transactions** tab.

![Track wallet activity](/img/resources/tutorials/symbiosis/7-view-wallet-activity.png)

## Using Symbiosis to pay for gas

On the destination chain without its **native token**? You can use **Symbiosis** to pay fees with the **same token you’re swapping**.

1. Choose the **token you just funded** and select the **native token** of that chain as the output. 

![Symbiosis gas](/img/resources/tutorials/symbiosis/8-use-symbiosis-for-gas.png)

> Note: Check the bottom section for route and gas fee details

2. Approve and confirm the spending cap (approval limit) as prompted.

![Symbiosis Confirm Spending Cap](/img/resources/tutorials/symbiosis/9-confirm-spending-cap.png)

> Note: Fees are paid in the token you’re swapping, not in the native token.

3. Rates often fluctuates, click the ‘Update Rates’ button

![Symbiosis Updated rates](/img/resources/tutorials/symbiosis/10-updated-rate-change.png)

4. Click ‘Swap’ and confirmation the transaction in your wallet.

![Confirm Transaction Wallet](/img/resources/tutorials/symbiosis/11-confirm-transaction-wallet.png)

5. Confirm the swap.

Approve the **swap transaction** in your wallet.

![Confirm Transaction Wallet](/img/resources/tutorials/symbiosis/12-confirm-transaction-status.png)

6. Check wallet

Your **native token** is now available for gas.

![Native token available](/img/resources/tutorials/symbiosis/13-native-token-available.png)