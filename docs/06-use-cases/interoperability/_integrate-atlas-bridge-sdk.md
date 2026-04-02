---
sidebar_position: 3
sidebar_label: Integrate Atlas Bridge SDK
title: Integrate cross-chain flows with the Atlas Bridge SDK
description: "Coordinate Bitcoin and Rootstock assets in your application using the bridge SDK."
tags: [interoperability, bridges, atlas, sdk, rbtc, cross-chain]
---

Interoperability is how value and messages move between Bitcoin, Rootstock, and other networks. The **Atlas Bridge SDK** gives your app a single integration surface for cross-chain transfers that involve Bitcoin and Rootstock. This guide describes the moving parts and a **pseudocode** integration shape. Replace types and method names with the versions that ship in your SDK release.

End users also move assets through [Atlas Bridge](https://atlas.rootstock.io/). Use this guide when you need **in-app** orchestration, status tracking, and custom UX.

## How the SDK fits together

The bridge SDK sits above RPC providers for Bitcoin and Rootstock. It tracks lock, confirmation, and release steps so your UI can show accurate state.

1. **Source chain:** Initiates lock or burn on the chain where the user starts.
2. **Relay and confirmations:** Waits for Bitcoin or Rootstock finality rules before the next step.
3. **Destination chain:** Mints or releases the user’s balance on the target chain.

## Prerequisites

* Node.js 18 or newer for a typical web or service integration.
* RPC or node access for Bitcoin and Rootstock (testnet for experiments).
* Test BTC and rBTC for fees on both sides when you run on test networks.
* Install the bridge SDK package and `@rskSmart/w3layer` (or the Web3 layer your team standardizes on). Use the versions from your internal release notes or npm.

## Initialize the client

Configure both endpoints before you create a session. The snippet below is illustrative. Match imports and class names to your SDK.

```typescript
// Network endpoints for Bitcoin and Rootstock
const bridgeConfig = {
  bitcoinRpc: "https://your-bitcoin-testnet-endpoint.example",
  rootstockRpc: "https://public-node.testnet.rsk.co",
};

// Replace BridgeClient with the exported client from your SDK
const bridge = new BridgeClient(bridgeConfig);
```

## Start a transfer (example peg-in)

Moving native BTC toward Rootstock is a peg-in. It is **slow** on purpose. Bitcoin confirmations can take a long time. Show progress in your UI and never promise instant finality.

```typescript
const transferParams = {
  amount: 0.01,
  destination: "0xYourRootstockAddress",
};

const session = await bridge.initiateTransfer(transferParams);

session.on("confirming", (count) => {
  console.log(`Bitcoin confirmations: ${count}`);
});
```

## Track status

Poll or subscribe to bridge state so the user sees whether funds are still confirming, ready on Rootstock, or failed. Map SDK states to clear labels in your product.

```typescript
const status = await bridge.getTransferStatus(session.id);

if (status === "released") {
  console.log("Funds are available on Rootstock.");
}
```

## Next steps

After value is on Rootstock, connect your app to vaults, DEX contracts, or governance flows using the guides under [Generate Yield](/use-cases/btcfi-finance-yield/) and [RIF economy](/use-cases/integrate-rif-economy/).
