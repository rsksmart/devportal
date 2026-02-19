---
sidebar_position: 200
sidebar_label: How to use Super Bridge
title: "How to use Super Bridge"
description: "How to use Super Bridge App."
tags: [rsk, rootstock, bridge, atlas, flyover, powpeg]
---

:::tip[Tip]
To exchange on Super Bridge you need enough funds in a crypto wallet. See [Minimum Transaction Amounts](/resources/guides/bridge) for limits per provider.
:::

## Getting Started

1. **Open Super Bridge App**
- Go to **[https://bridge.rootstock.io](https://bridge.rootstock.io)** (or testnet if applicable).  
- You do **not** need to connect a wallet to start.
<img src="/img/resources/bridge/bridge-home.png" alt="Super Bridge home"/>

2. **Select the desired pair**
- Choose source and destination assets. One side must always be a Rootstock token (e.g. rBTC, trBTC). The other is the asset on the other chain (e.g. BTC, ETH, USDT).  
- See *Mainnet* and *Testnet available swaps* in the [User Guide](/resources/guides/bridge) for supported pairs.
<img src="/img/resources/bridge/select-token.png" alt="Select tokens"/>

3. **Enter the amount**
- Type the amount you want to bridge.  
- If no providers appear, your amount may be below the minimum, confirm [Minimum Transaction Amounts](/resources/guides/bridge) and adjust.

<img src="/img/resources/bridge/input-amount.gif" alt="Input amount"/>

4. **Choose a provider**
- The bridge lists all available providers for your pair and amount.  
- Compare rates, fees, and conditions, then select the provider you want, then click on "Review transaction".

5. **Review provider details and add destination address**
- Review fee and details of the provider selected
<img src="/img/resources/bridge/review-provider-add-destination-address.png" alt="Review provider details"/>
- Click on "Add Destination Wallet" button, and copy paste the addess where you wish to receive ypur funds.
<img src="/img/resources/bridge/add-destination-address.png" alt="Add destination address"/>

6. **Complete the transaction**
After selecting a provider, and accepting Terms and Conditions, finish in one of two ways:
<img src="/img/resources/bridge/terms-complete-tx.png" alt="Paths to complete tx"/>
   - **With a wallet** Connect a compatible wallet (e.g. MetaMask for Rootstock, Leather for Bitcoin) and authorize the transaction when prompted.
   - **Without a wallet** Complete via **QR code**: scan and follow the provider’s instructions; no wallet connection required.
   <img src="/img/resources/bridge/qr-code.png" alt="Qr code"/>

7. **Review and confirm**
- Check fees, destination address, and amounts before confirming.
- Wait for confirmations. See [Expected Time & Confirmations](/resources/guides/bridge).
- Track progress in the bridge UI.

8. **Done**
- You should have received the asset on the destination network. Check on your wallet.

## Warning: Important Visual Warnings (UI Callouts)

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

The diagram below shows the full user flow from opening the bridge to receiving assets on the destination network. Each box is a step; you can complete the transaction with a connected wallet or via QR code (no wallet required).

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
