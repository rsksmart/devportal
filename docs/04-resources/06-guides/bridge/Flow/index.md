---
sidebar_position: 1000
sidebar_label: How to use Super Bridge
title: "How to use Super Bridge"
description: "Frequently asked questions about the SuperBride App."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

## How to use Super Bridge

```text
┌──────────────┐
│   User       │
│ (No wallet   │
│  needed yet) │
└──────┬───────┘
       │
       ▼
┌────────────────────────────────────┐
│ bridge.rootstock.io                │
│ 1. Select the desired pair         │
│    (one side = Rootstock token)    │
│    e.g. BTC ↔ rBTC, ETH → rBTC     │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ 2. Enter amount                    │
│    (check Minimum Transaction      │
│     Amounts if no providers show)  │
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
```

## Step-by-Step (User View)

1. **Open the bridge**
- Go to **[https://bridge.rootstock.io](https://bridge.rootstock.io)** (or testnet if applicable).  
- You do **not** need to connect a wallet to start.

2. **Select the desired pair**
- Choose source and destination assets. One side must always be a Rootstock token (e.g. rBTC, trBTC). The other is the asset on the other chain (e.g. BTC, ETH, USDT).  
- See *Mainnet* and *Testnet available swaps* in the [User Guide](user-guide.md) for supported pairs.

3. **Enter the amount**
- Type the amount you want to bridge.  
- If no providers appear, your amount may be below the minimum — check **Minimum Transaction Amounts** in the [User Guide](user-guide.md) and adjust.

4. **Choose a provider**
- The bridge lists all available providers for your pair and amount.  
- Compare rates, fees, and conditions, then select the provider you want.

5. **Complete the transaction**
After selecting a provider, finish in one of two ways:  
   - **With a wallet**
    — Connect a compatible wallet (e.g. MetaMask for RSK) and authorize the transaction when prompted.  
   - **Without a wallet**
    — Complete via **QR code**: scan and follow the provider’s instructions; no wallet connection required.

6. **Review and confirm**
- Check fees, destination address, and amounts before confirming.  
- Wait for confirmations (may take minutes to hours depending on the chain).  
- Track progress in the bridge UI.

7. **Done**
✅ You receive the asset on the destination network (e.g. rBTC on Rootstock).  
🚀 Use it for gas, DeFi, swaps, and dApps.

## Important Visual Warnings (UI Callouts)

```text
⚠️ Do NOT send BTC from an exchange
⚠️ Only use wallets you control
⚠️ Always verify the destination address
⚠️ Bitcoin transactions are irreversible
```

## Status Indicators Users Will See

* 🟡 **Waiting for network confirmations**
* 🟡 **Processing bridge transaction**
* 🟢 **Completed successfully**
* 🔴 **Action required / error**
