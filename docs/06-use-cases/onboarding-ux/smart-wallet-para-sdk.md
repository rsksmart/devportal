---
sidebar_position: 3
sidebar_label: Smart Wallet Onboarding with Para SDK
title: Onboarding Users with Smart Wallets & Social Login
description: "Remove seed phrases and gas hurdles using Para SDK's MPC-based social login and Account Abstraction on Rootstock." 
tags: [onboarding, para-sdk, mpc, account-abstraction, rbtc, social-login]
---

Mainstream adoption requires removing the technical barriers of entry to decentralized applications. Traditional onboarding requires users to manage 12-word seed phrases and hold rBTC for gas before their first transaction. This tutorial explains how to use the Para SDK to implement social logins and smart contract accounts on Rootstock.

## Para SDK and Rootstock Architecture

Para uses a 2-of-2 Multi-Party Computation (MPC) system to manage keys securely without a single point of failure. In this architecture, Para acts as the Signer or Externally Owned Account (EOA) that controls a smart contract wallet (such as SAFE or Biconomy).

1.  **MPC Signer:** It generates non-custodial keys via biometrics or social identity.
2.  **Smart Account:** it resides on the Rootstock blockchain and executes logic like gas sponsorship and batched transactions.
3.  **Paymaster:** It covers the rBTC gas fees, allowing users to interact with your dApp immediately.



## Prerequisites

You must prepare the following components before starting the integration.

* Register for an API Key at the [Para Developer Portal](https://developer.getpara.com).
* Install the `@getpara/react-sdk` or `@getpara/server-sdk` packages.
* Select an Account Abstraction (AA) provider supported by Rootstock, such as SAFE.

## Initializing the Onboarding Flow

You must initialize the Para client to handle user sessions and key material.

```typescript
// Initialize the Para client with your project API key
const para = new Para(Environment.PRODUCTION, "YOUR_API_KEY");

// Define the login method (Google, Apple, or Passkey)
// The SDK handles the OAuth redirect and share generation
await para.login(LoginMethod.GOOGLE);
```

## Integrating Smart Contract Accounts

Once the user is authenticated, their MPC wallet acts as the owner of a smart account. You must adjust the signature recovery byte (v) for compatibility with Rootstock smart accounts.

### Signature Adjustment
Para produces signatures where the recovery byte might require adjustment for on-chain verification in an AA context.

```ts
// Adjust the signature byte to ensure compatibility with AA providers
const adjustedSignature = adjustParaSignature(signature);

// Deploy or connect to a smart account using the adjusted EOA signer
const smartAccount = await Safe.create({
  ethAdapter,
  safeAddress,
  signer: adjustedSignature
});
```

## Executing Gasless Transactions
The primary outcome of this integration is the ability for users to sign transactions without holding rBTC. The smart account sends a "UserOperation" to a bundler, which the paymaster then sponsors.

```ts
// Execute a transaction without requiring the user to pay gas
// The paymaster context is provided by your AA infrastructure
const transactionHash = await smartAccount.sendTransaction({
  to: contractAddress,
  data: encodedFunctionData
});
```

## Next Steps
Now that your users can enter the ecosystem without friction, you should provide them with productive utilities: