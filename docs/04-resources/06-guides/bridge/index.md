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

### [Mainnet](https://bridge.rootstock.io/) available swaps

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

### [Testnet](https://bridge.testnet.rootstock.io/) available swaps

- trBTC → BTC (L1)
- BTC (L1) → trBTC

## What is rBTC?

**rBTC** is the native Bitcoin-pegged asset on Rootstock. For every BTC you bridge in, an equal amount of rBTC is minted on the Rootstock network.
Once you have rBTC, you can:

* Pay gas fees on Rootstock
* Swap or trade assets
* Use DeFi protocols (lending, staking, liquidity provision)
* Interact with decentralized applications (dApps) ([rootstock.io][3])

## How to Use the Bridge

> This is a general step-by-step guide. Always follow on-screen instructions carefully. You do **not** need to connect a wallet to start. You can explore options and complete the flow first, then connect or pay via QR when you are ready.

1. **Select the desired pair**: Choose the source and destination assets. One side of the pair must always be a token from the Rootstock network (e.g. rBTC, trBTC, or other supported Rootstock tokens). The other side is the asset on the other chain (e.g. BTC, ETH, USDT). See *Mainnet* and *Testnet available swaps* above for supported pairs.

2. **Enter the amount**: Type the amount you want to bridge. Each provider has minimum (and possibly maximum) limits; if no providers appear, your amount may be below the minimum. See **Minimum Transaction Amounts** above for provider limits and adjust your amount if needed.

3. **Choose a provider**: The bridge will list all available providers for your pair and amount. Compare rates, fees, and conditions, then select the provider you want to use.

4. **Complete the transaction**: After selecting a provider you can finish in one of two ways:
   - **With a wallet**: Connect a compatible wallet (e.g. MetaMask or another web3 wallet that supports Rootstock) and authorize the transaction when prompted.
   - **Without a wallet (QR code)**: Complete the transaction by scanning a QR code and following the provider’s instructions; no wallet connection is required.

5. **Review and confirm**: Check all details (fees, destination address, amounts) before confirming. Then wait for confirmations; due to blockchain (e.g. Bitcoin) block times, this may take from minutes to several hours. Use the bridge UI to track status. ([rootstock.io][1])

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
