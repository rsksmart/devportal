---
sidebar_position: 3
sidebar_label: Build Multi-Chain dApps with Super Bridge SDK
title: Building Multi-Chain dApps with Super Bridge
description: "Enable secure movement of assets between Bitcoin and Rootstock using the Super Bridge SDK." 
tags: [interoperability, bridges, super-bridge, sdk, rbtc, cross-chain]
---

Interoperability is the process of moving assets across independent blockchain networks. The Super Bridge SDK provides a unified interface to handle cross-chain transfers between Bitcoin and Rootstock. This tutorial explains how to integrate the SDK to facilitate asset porting within your application.

## Super Bridge Architecture

The Super Bridge SDK abstracts the complexity of the underlying protocols. It coordinates between the Bitcoin network and the Rootstock Virtual Machine (RVM).

1.  **Source Layer:** It initiates the lock or burn of the asset on the originating chain.
2.  **Relay Logic:** It monitors transaction confirmations to trigger the mint or release on the destination chain.
3.  **Destination Layer:** It delivers the represented asset (such as rBTC) to the user's address.



## Prerequisites

You must meet these requirements before you implement the bridge logic.

* Install the `super-bridge-sdk` and `@rskSmart/w3layer` packages.
* Secure a provider for both Bitcoin and Rootstock networks.
* Acquire testnet BTC and rBTC to cover transaction fees on both chains.

## Initializing the Bridge SDK

You must configure the SDK with the network parameters for both environments. The SDK relies on the Web3 Core Layer to interact with Rootstock RPC nodes.

```typescript
// Define the dual-chain network configuration
const bridgeConfig = {
  bitcoinRpc: "[https://bitcoin-testnet-node.com](https://bitcoin-testnet-node.com)",
  rootstockRpc: "[https://public-node.testnet.rsk.co](https://public-node.testnet.rsk.co)"
};

// Initialize the Bridge SDK instance
const bridge = new SuperBridge(bridgeConfig);

```

## Initiating an Asset Transfer
The process of moving native BTC to Rootstock is a Peg-In. This process is time-intensive because it requires multiple confirmations on the Bitcoin network to ensure security.

### Executing a Peg-In
You must warn users that Bitcoin finality is slow. A typical Peg-In requires several hours to complete because of the confirmation depth needed.

```ts

// Define the transfer amount and the destination Rootstock address
const transferParams = {
  amount: 0.01, // Amount in BTC
  destination: "0xYourRootstockAddress"
};

// Start the bridge process
// The SDK generates a unique deposit address for the user
const bridgeSession = await bridge.initiateTransfer(transferParams);

// Monitor the Bitcoin network for the required confirmation count
bridgeSession.on("confirming", (count) => {
  console.log(`Current Bitcoin confirmations: ${count}`);
});
```

## Handling Cross-Chain State
The SDK uses the "Read" sequence to track the status of the bridge across the Contract Registry. This ensures your dApp UI reflects the real-time location of the assets.

### Tracking Bridge Progress
The bridge follows a specific state machine from initiation to final delivery.

```ts
// Query the bridge status via the Web3 Core Layer
const status = await bridge.getTransferStatus(bridgeSession.id);

// Update the UI based on the returned state
if (status === BridgeState.RELEASED) {
  console.log("Assets are now available on Rootstock.");
}
```

## Next Steps
Now that you can move assets onto the chain, you should build dApps that utilize them.