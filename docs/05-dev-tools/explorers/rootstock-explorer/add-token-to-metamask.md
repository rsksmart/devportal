---
sidebar_position: 245
sidebar_label: Add Token to MetaMask
title: Add a Token to MetaMask
tags: [dev tools, rsk, rootstock, explorer, metamask]
description: "Import ERC-20 tokens into MetaMask from a token page by clicking the MetaMask icon so the explorer fills contract address, symbol, and decimals."
---

When interacting with tokens on the Rootstock network, some tokens may not appear automatically in your MetaMask wallet. In these cases, you need to manually add the token so it becomes visible and usable in your wallet.

The Rootstock Explorer simplifies this process by providing a **MetaMask** icon directly from each token.

## Why Add Tokens Manually?

MetaMask does not list every token automatically. After you add a token, you can:

- See your balance for that token.
- Send and receive it.
- Use it with applications that expect that asset in your wallet.

## Required Token Information

To add a token manually, MetaMask requires the following details:

- Contract Address.
- Token Symbol (e.g., DOC, RIF, USDRIF).
- Decimals of Precision.

The Rootstock Explorer automatically provides this information, so you don’t need to enter it manually when using the built-in feature.

## Find the Token in the Explorer

1. Open the [Rootstock Explorer Mainnet](https://explorer.rootstock.io/) or [Rootstock Explorer Testnet](https://explorer.testnet.rootstock.io/).
2. Use the search bar to enter the **token name**, **symbol**, or **contract address**.
3. Choose the token from the results and open its token page.

<div align="center"><img width="100%" src="/img/tools/explorer/rootstock/metamask-icon.png" alt="MetaMask icon next to the token contract address on the Rootstock Explorer token page"/></div>


## Add the Token to MetaMask

1. Stay on the token **details** page for the asset you want.
2. Find the **MetaMask** icon next to the token contract address on that page.
3. Click the icon. MetaMask opens with a prompt to add the token.

<div align="center"><img width="100%" src="/img/tools/explorer/rootstock/add-token.png" alt="MetaMask Add Token confirmation popup showing the token details to be imported from the Rootstock Explorer"/></div>

## Confirm in MetaMask

1. Check that the symbol and decimals match the token you expect.
2. Confirm **Add token**.

If nothing opens, confirm the MetaMask extension is installed and unlocked, and that you selected the correct Rootstock network in MetaMask (mainnet or testnet to match the explorer).

## Check Your Wallet

After you confirm:

- The token appears in your asset list for that network.
- You can view balance and send or receive as usual.

<div align="center"><img width="100%" src="/img/tools/explorer/rootstock/token-added.png" alt="Token visible in MetaMask after import"/></div>

If the token does not show right away, refresh the MetaMask view or switch away from Rootstock and back. Confirm you are on the same network you used in the explorer.

## What the Explorer Sends

Clicking the **MetaMask** icon passes the **contract address**, **symbol**, and **decimals** into MetaMask’s import API. That cuts copy-paste mistakes and matches the on-chain token the explorer lists.

## Tips

- Always verify the token contract address to avoid scams.
- Use the official Rootstock Explorer to find trusted tokens.
- Ensure MetaMask is connected to the Rootstock network.
- If you need wallet setup steps, see the [MetaMask wallet setup guide](/dev-tools/wallets/metamask/).

## Conclusion

Adding a token to MetaMask using the Rootstock Explorer is a quick and secure process. By using the built-in feature, users can avoid manual entry and easily manage their tokens on the Rootstock network.