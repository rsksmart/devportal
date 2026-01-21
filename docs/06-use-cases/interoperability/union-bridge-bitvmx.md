---
sidebar_position: 2
sidebar_label: Union Bridge (BitVMX)
title: Trust-Minimized Transfers via Union Bridge (BitVMX)
description: "How to use the BitVMX-powered Union Bridge for secure, trust-minimized BTC transfers." 
tags: [interoperability, bitvmx, bridge, bitcoin, security]
---

The Union Bridge is a next-generation bridging protocol that utilizes **BitVMX** to move assets between Bitcoin and Rootstock with a 1-of-N trust assumption. Unlike traditional federated bridges, Union requires only a single honest functionary to ensure the integrity of the peg.

## Prerequisites

* **Taproot Wallet:** A Bitcoin wallet capable of sending to and receiving from Taproot (P2TR) addresses.
* **Rootstock Account:** A standard address to receive `uBTC` (Union BTC).
* **Union CLI or SDK:** Installed in your development environment.

## Getting Started

### 1. The 1-of-N Security Model
Union uses optimistic verification. When BTC is locked on Bitcoin, a "Challenge-Response" window opens. Functionaries monitor the chain; if an invalid peg-out is attempted, a single honest functionary can trigger a BitVMX fraud proof to stop the transaction.

### 2. Performing a Peg-In
To move BTC to Rootstock, you must lock funds into a BitVMX-secured VMXO.

1.  **Request a Deposit Address:** The Union API generates a unique Taproot address for your session.
2.  **Lock Funds:** Send your BTC to the generated address.
3.  **Wait for Confirmations:** The bridge requires 6 Bitcoin block confirmations (~60 minutes) to ensure finality before minting `uBTC` on Rootstock.

### 3. Performing a Peg-Out
Peg-outs are facilitated by "Operators" who front the BTC to you on the mainchain in exchange for the locked VMXO on the bridge.

```javascript
// Example: Initiating a Peg-out via the Union SDK
const tx = await unionBridge.initiatePegOut({
  amount: parseUnits("0.05", 8),
  destinationBtcAddress: "bc1p..."
});
```

## Troubleshooting
- Timelock Delays: If a dispute is raised, funds may be locked during the "Chess Clock" dispute period. This is a security feature of BitVMX to allow verifiers to submit fraud proofs.

- Address Compatibility: Ensure you are not sending BTC from a legacy (P2PKH) address to a Taproot deposit address, as some older wallets may fail to calculate the correct witness.

## Related Use Cases or Resources
- BitVMX Whitepaper

- Fast Bridging with Flyover

- Institutional Asset Custody

