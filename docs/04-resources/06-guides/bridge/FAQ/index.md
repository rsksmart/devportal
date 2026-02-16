---
sidebar_position: 900
sidebar_label: FAQ
title: "FAQ"
description: "Frequently asked questions about the SuperBridge App."
tags: [rsk, rootstock, bridge, atlas, flyover, powpeg]
---

## Frequently Asked Questions (FAQs)

### What is Super Bridge?

This platform is a cross-chain bridge designed for the Rootstock ecosystem. It provides a seamless way for users to move assets between Rootstock and other blockchain networks.

- Peg-In (Move In): Transfer assets from other chains (like Bitcoin) into the Rootstock network.

- Peg-Out (Move Out): Transfer your assets from Rootstock back to their native or other supported chains.

---

### What is rBTC?

rBTC is a **1:1 Bitcoin-pegged asset** on Rootstock. For every BTC you bridge, you receive the same amount of rBTC on the Rootstock network.

---

### Is my BTC safe when using Super Bridge?

BTC bridged to Rootstock is secured through Rootstock’s **PowPeg mechanism**, which locks BTC on the Bitcoin network and makes the equivalent rBTC available on Rootstock. As with any blockchain transaction, always verify addresses and details before confirming.

---

### How long does the bridging process take?

The process depends on **network confirmations**, which can take from several minutes to a few hours depending on network conditions. You can monitor the progress directly in the bridge interface. Here are some estimates by provider:

| Provider | Peg-In | Peg-Out |
| :--- | :---: | :---: |
| Flyover - Teks | 20m | 20m |
| Flyover - Rootstock | 20m | 20m |
| Changelly | 15m | 15m |
| Boltz | 1m | 5m |
| Native | 17h | 34h |

---

### Why do I need to wait for Bitcoin confirmations?

Bitcoin confirmations ensure the transaction is secure and irreversible before rBTC is made available on Rootstock. This is a security requirement and cannot be skipped.

---

### Can I send BTC from an exchange?

**No.** You should only send BTC from a wallet **you fully control**. Sending BTC from an exchange may result in loss of funds.

---

### What wallets are supported?

You need:

* A **Bitcoin wallet** you control to send BTC
* A **Rootstock-compatible wallet** (e.g., MetaMask configured for Rootstock) to receive and use rBTC

Always follow the bridge UI instructions for supported wallets.

---

### What fees should I expect?

You may encounter:

* Bitcoin network fees (miners’ fees)
* Rootstock transaction (gas) fees when using rBTC

All applicable fees are displayed before you confirm the transaction.

---

### Can I cancel a bridge transaction?

No. Once a Bitcoin transaction is broadcast to the network, it **cannot be reversed or canceled**. Always double-check details before confirming.

---

### What happens if I close the browser during the process?

Your transaction will **continue on-chain**. You can return to the bridge later and check the status using your wallet or transaction hash.

---

### What should I do if something goes wrong?

If the transaction is still pending, wait for confirmations. If you believe something is wrong:

* Check the transaction status on the Bitcoin blockchain
* Review the bridge UI messages
* Reach out through official Rootstock support or community channels


### Where can I learn more?

* Official Rootstock [documentation](https://dev.rootstock.io/)
