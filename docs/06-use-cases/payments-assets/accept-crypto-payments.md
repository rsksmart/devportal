---
sidebar_position: 3
sidebar_label: Accept Crypto Payments
title: Integrating rBTC and USDRIF Payments into Your dApp
description: "Learn how to build a payment checkout flow for native rBTC and stablecoins." 
tags: [payments, checkout, rbtc, usdrif, e-commerce]
---

# Integrating Crypto Payments

Accepting payments on Rootstock allows you to offer your users near-instant settlement with significantly lower fees than the Bitcoin mainnet. This guide covers how to implement a payment listener for both native rBTC and the USDRIF stablecoin.

## Prerequisites

* **Frontend Framework:** React or Next.js.
* **Web3 Library:** Ethers.js or Viem.
* **Stablecoin Address:** The USDRIF contract address on [Mainnet](https://explorer.rootstock.io/address/0x2d514488D56b82099354728551f307F99446342E) or Testnet.

## Getting Started

### 1. Native rBTC Checkout
To accept rBTC, you simply need to prompt the user to send a transaction to your merchant address.

```javascript
async function handlePayment() {
  const tx = await signer.sendTransaction({
    to: "MERCHANT_WALLET_ADDRESS",
    value: ethers.parseEther("0.001") // Amount in rBTC
  });
  await tx.wait(); // Wait for confirmation
  alert("Payment Successful!");
}
```

### 2. USDRIF (Stablecoin) Checkout
USDRIF is an ERC-20 token. You must use the transfer method on the token contract.

```js
const usdrifContract = new ethers.Contract(USDRIF_ADDRESS, ERC20_ABI, signer);

async function handleStablecoinPayment() {
  const amount = ethers.parseUnits("10.0", 18); // 10 USDRIF
  const tx = await usdrifContract.transfer("MERCHANT_WALLET_ADDRESS", amount);
  const receipt = await tx.wait();
  console.log(`Transaction Hash: ${receipt.hash}`);
}

```

## Troubleshooting
- Pending Transactions: E-commerce UIs should always provide a link to the [Rootstock Explorer](https://explorer.rootstock.io) so users can track their payment status.

- Decimal Precision: Native rBTC and USDRIF both use 18 decimals. Always use parseUnits or parseEther to avoid calculation errors that lead to failed payments.

## Related Use Cases or Resources
- Gasless Payments with RIF Relay

- Launching Your Own Token

- Fast Transfers with Flyover