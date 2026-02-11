---
title: "Understanding Keys and Wallets"
sidebar_label: "Keys and Wallets"
sidebar_position: 2
description: "Learn how cryptographic keys and wallets work in blockchain systems."
tags: [guides, developers, blockchain, rsk, rootstock, beginners, wallets]
---

This module explains how users interact with blockchains through cryptographic key pairs and wallet software.


## Public/Private Keys

:::info
For a more detailed guide on this topic, see [Private Keys and Public Keys](/developers/blockchain-essentials/browser/#private-keys-and-public-keys).
:::


Every user interacts with a blockchain through a cryptographic key pair:

- **Private Key:** A secret number used to sign transactions.  
- **Public Key:** Derived from the private key.  
- **Address:** A shortened, user-friendly representation of the public key.

Transactions are "signed" using the private key, proving ownership without revealing the key itself.

### How Keys Work Together

```text
Private Key (secret)
      ↓
Public Key (derived)
      ↓
Address (shortened for use)
```

:::warning[Keep Your Private Key Safe]
Anyone with access to your private key can control your funds. Never share it or store it in plaintext.
:::

## Wallets

A wallet is a tool (software or hardware) that:

- Stores your private key  
- Signs transactions  
- Generates addresses  

### Types of Wallets

| Wallet Type | Description | Examples |
|------------|-------------|----------|
| Browser Extension | Runs in your browser | MetaMask, Rabby |
| Hardware Wallet | Physical device for cold storage | Ledger, Trezor |
| Mobile Wallet | App on your phone | Trust Wallet |
| Web Wallet | Accessed via browser | Rootstock Web Wallet |

### Recommended Wallets for Rootstock

For a list of recommended wallets and setup guides, see the [Wallets](/dev-tools/wallets/) section.

## Summary

Before moving forward, ensure you understand:

- The relationship between private keys, public keys, and addresses
- How transaction signing works
- Different wallet types and their trade-offs

**Next:** [Understanding Gas and Transactions](/developers/blockchain-essentials/new-to-blockchain/gas-transactions/)
