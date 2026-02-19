---
sidebar_position: 100
title: Bridge tokens with Rootstock
sidebar_label: Super Bridge
tags: [rsk, rootstock, bridge, atlas, flyover, powpeg]
description: "How to Bridge Tokens in and out of Rootstock?"
---

# Super Bridge

Super Bridge is a cross-chain bridge designed for the Rootstock ecosystem. It provides a seamless way for users to move assets between Rootstock and other blockchain networks.

- Peg-In (Move In): Transfer assets from other chains (like Bitcoin) into the Rootstock network.

- Peg-Out (Move Out): Transfer your assets from Rootstock back to their native or other supported chains.

## What the Bridge Does
Our interface is built for maximum simplicity. You can explore all available exchange options, check rates, and view provider details before you even need to connect your wallet. This allows you to plan your transaction privately and securely.

### Minimum Transaction Amounts
If you are having trouble finding an available provider, it is likely because the amount you wish to transfer is below the minimum limit required by the providers.

To ensure a successful transaction, please verify that your amount meets the requirements in the table below:

| Provider | Minimum Peg-In | Minimum Peg-Out |
| :--- | :---: | ---: |
| Flyover - Teks | 0.00500001 BTC | 0.004 rBTC |
| Changelly | Equivalent of 30 USD | Equivalent of 30 USD |
| Boltz | 0.00001 BTC | 0.00001 rBTC |
| Native | 0.005 BTC | 0.004 rBTC |

> For some providers, the minimum amounts above do not include fees. Ensure your wallet balance covers both the transfer amount and fees.

### Mainnet
Below are available swaps on [Mainnet](https://bridge.rootstock.io/).

- rBTC → BTC (L1)
- BTC (L1) → rBTC
- rBTC → BTC (Lightning)
- BTC (Lightning) → rBTC
- ETH → rBTC
- USDT → rBTC
- USDC → rBTC
- WBTC → rBTC
- BNB → rBTC
- rBTC → ETH
- rBTC → USDT
- rBTC → USDC
- rBTC → BNB
- rBTC → WBTC

### Testnet
Below are available swaps on [Testnet](https://bridge.testnet.rootstock.io/).

- trBTC → BTC (L1)
- BTC (L1) → trBTC

## What is rBTC?

**rBTC** is the native Bitcoin-pegged asset on Rootstock. For every BTC you bridge in, an equal amount of rBTC is minted on the Rootstock network.
Once you have rBTC, you can:

* Pay gas fees on Rootstock
* Swap or trade assets
* Use DeFi protocols (lending, staking, liquidity provision)
* Interact with decentralized applications (dApps) ([rootstock.io][3])

## Expected Time & Confirmations

Bridging BTC to Rootstock depends on confirmations on the Bitcoin blockchain. Each provider has different processing times. Use the table below as a guide. Actual times can vary. Track your transaction in the bridge UI for current status. ([rootstock.io][1])

| Provider | Peg-In | Peg-Out |
| :--- | :---: | :---: |
| Flyover - Teks | 20m | 20m |
| Flyover - Rootstock | 20m | 20m |
| Changelly | 15m | 15m |
| Boltz | 1m | 5m |
| Native | 17h | 34h |

## Important Notes

* **Do not send BTC directly to exchange addresses** — you should only use your own wallet.
* Always double-check the destination network and address before submitting.
* Bridges may require multiple confirmations; be patient and monitor progress in the interface.
* When in doubt, consult official Rootstock documentation and support channels.

## What You Can Do After Bridging

Once BTC is successfully bridged and you have rBTC:

* **Use rBTC as gas** for transactions on Rootstock.
* Interact with **DeFi apps** and protocols built on Rootstock.
* **Provide liquidity** or participate in decentralized markets.
* Explore more bridges and tools in the Rootstock ecosystem. ([rootstock.io][3])

## Where to Get Help

If you run into issues or need guidance:

* Check the official guides and [Rootstock.io content][2] and the [bridging guide][1]
* Join the community on [Rootstock Discord](https://discord.gg/rootstock) and the [Rootstock Research & Community Forum](https://research.rootstock.io)
* For bridge-specific questions, ask in the **#tokenbridge** channel on Discord or in related ecosystem channels

## Resources

- [Get rBTC: Comprehensive Guide to Bridging to Rootstock][1]
- [Rootstock: the most secure and advanced Bitcoin layer][2]
- [rBTC: Smart Bitcoin powering network Rootstock][3]
- [Release Notes](https://github.com/rsksmart/bridge/releases)

[1]: https://rootstock.io/blog/get-rbtc-comprehensive-guide-to-bridging-to-rootstock/ "Get rBTC: Comprehensive Guide to Bridging to Rootstock"
[2]: https://rootstock.io/technology/ "Rootstock: the most secure and advanced Bitcoin layer | Rootstock"
[3]: https://rootstock.io/rbtc/ "rBTC: Smart Bitcoin powering Rootstock network"
