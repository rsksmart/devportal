---
sidebar_position: 3
sidebar_label: Smart Wallet Onboarding
title: Onboarding Users with Smart Wallets & Social Login
description: "Integrate account abstraction to allow users to sign up via email or social accounts." 
tags: [ux, account-abstraction, wallets, onboarding]
---

Smart Wallets move beyond the traditional 12-word seed phrase. By using Account Abstraction (ERC-4337 logic), you can offer users social login (Google, Apple) and biometric recovery, making your dApp feel like a standard web application.


## Prerequisites

* **Web3Auth or Privy:** For social-to-key mapping.
* **Safe (Gnosis) SDK:** For deploying the smart contract account.
* **Bundler RPC:** To handle the UserOperations.

## Getting Started

### 1. Initialize Social Login
Use a provider to generate a cryptographic key from a social identity.

```javascript
import { Web3Auth } from "@web3auth/modal";

const web3auth = new Web3Auth({
  clientId: "YOUR_CLIENT_ID",
  chainConfig: { chainNamespace: "eip155", chainId: "0x1f" } // Rootstock Testnet
});

await web3auth.initModal();
const provider = await web3auth.connect();
```

### 2. Deploy the Smart Contract Wallet
Once the user is logged in, deploy a "Safe" wallet that they control. This wallet becomes their permanent on-chain identity.

```js
import { SafeAccountPack } from '@safe-global/auth-kit';

const safeAccountPack = new SafeAccountPack();
await safeAccountPack.init({ provider, sdkConfig: { ... } });

const { protocolKit } = await safeAccountPack.signIn();
const address = await protocolKit.getAddress();
console.log(`User Smart Wallet: ${address}`);
```

## Troubleshooting
Deployment Costs: Deploying a smart wallet is a transaction. It is best practice to combine this with a Gasless Relay (see the RIF Relay guide) so the user doesn't need rBTC for their first login.

Provider Latency: Social login providers can sometimes timeout. Implement a "Retry" logic in your UI to handle network hiccups gracefully.

## Related Use Cases or Resources
- Safe Architecture on Rootstock

- Gasless Transactions Guide

- RIF Name Service (RNS)