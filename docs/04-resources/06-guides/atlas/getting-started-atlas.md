---
sidebar_position: 200
sidebar_label: How to use Atlas Bridge
title: "How to use Atlas Bridge"
description: "Step-by-step guide to bridge with Atlas."
tags: [rsk, rootstock, bridge, atlas, flyover, powpeg]
---

:::tip[Tip]
You need enough balance to cover transfer amount and fees. Check [Minimum Transaction Amounts](/resources/guides/atlas/#minimum-transaction-amounts) before starting.
:::

## Getting Started
1. **Open Atlas Bridge App**
- Go to **[https://atlas.rootstock.io](https://atlas.rootstock.io)** (or testnet if applicable).  
- You do **not** need to connect a wallet to start.
<img src="/img/resources/bridge/bridge-home.png" alt="Atlas Bridge home"/>

2. **Select the desired pair**
- Choose source and destination assets. One side must always be a Rootstock token (e.g. rBTC, trBTC). The other is the asset on the other chain (e.g. BTC, ETH, USDT).  
- See *Mainnet* and *Testnet available swaps* in the [User Guide](/resources/guides/atlas) for supported pairs.
<img src="/img/resources/bridge/select-token.png" alt="Select tokens"/>

3. **Enter the amount**
- Type the amount you want to bridge.  
- If no providers appear, your amount may be below the minimum, confirm [Minimum Transaction Amounts](/resources/guides/atlas) and adjust.

<img src="/img/resources/bridge/input-amount.gif" alt="Input amount"/>

4. **Choose a provider**
- The bridge lists all available providers for your pair and amount.  
- Compare rates, fees, and conditions.
- Select a provider, then click **Review transaction**.

5. **Review provider details and add destination address**
- Review fees, minimums, and estimated time for the selected provider.
<img src="/img/resources/bridge/review-provider-add-destination-address.png" alt="Review provider details"/>
- Click **Add Destination Wallet** and paste the destination address where you want to receive funds.
- Confirm the destination chain matches the address type.
<img src="/img/resources/bridge/add-destination-address.png" alt="Add destination address"/>

6. **Complete the transaction**
After selecting a provider and accepting terms, finish in one of two ways:
<img src="/img/resources/bridge/terms-complete-tx.png" alt="Paths to complete tx"/>
   - **With a wallet**: Connect a compatible wallet (for example MetaMask for Rootstock) and authorize the transaction.
   - **Without a wallet**: Complete with **QR code** and follow provider instructions.
   <img src="/img/resources/bridge/qr-code.png" alt="Qr code"/>

7. **Review and confirm**
- Check fees, destination address, and final received amount.
- Wait for confirmations. See [Expected Time & Confirmations](/resources/guides/atlas).
- Track progress in the bridge UI.

8. **Done**
- You should receive the asset on the destination network.
- Keep the transaction hash until funds arrive.

## Warning: Important Visual Warnings (UI Callouts)

```text
⚠️ Do NOT send BTC from an exchange
⚠️ Only use wallets you control
⚠️ Always verify the destination address
⚠️ Bitcoin transactions are irreversible
```

## If the transaction looks stuck
First wait for the estimated confirmation window. Then:
- Open the source-chain explorer with your transaction hash.
- Re-open Atlas and check provider status.
- Contact support with transaction hash, provider name, and time submitted.

## Status Indicators Users Will See

* 🟡 **Waiting for network confirmations**
* 🟡 **Processing bridge transaction**
* 🟢 **Completed successfully**
* 🔴 **Action required / error**

<!-- The diagram below shows the full user flow from opening the bridge to receiving assets on the destination network. Each box is a step; you can complete the transaction with a connected wallet or via QR code (no wallet required). -->

<!-- ```text
┌──────────────┐
│   User       │
│ (No wallet   │
│  needed yet) │
└──────┬───────┘
       │
       ▼
┌────────────────────────────────────┐
│ atlas.rootstock.io                │
│ 1. Select the desired pair         │
│    (one side = Rootstock token)    │
│    e.g. BTC ↔ rBTC, ETH → rBTC     │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ 2. Enter amount                    │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ 3. Bridge lists available providers│
│    Compare rates & fees → pick one │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ 4. Complete the transaction        │
│    ┌─────────────────────────────┐ │
│    │ With wallet: connect &      │ │
│    │ authorize in wallet         │ │
│    └─────────────────────────────┘ │
│    ┌─────────────────────────────┐ │
│    │ Without wallet: scan QR     │ │
│    │ and follow provider steps   │ │
│    └─────────────────────────────┘ │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ 5. Review & confirm                │
│    Wait for confirmations          │
│    Track status in bridge UI       │
└────────────────────────────────────┘
``` -->
