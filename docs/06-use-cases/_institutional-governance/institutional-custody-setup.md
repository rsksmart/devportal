---
sidebar_position: 2
sidebar_label: Institutional Custody
title: Deploying a Multi-Signature Safe on Rootstock
description: "Eliminate single points of failure by setting up an institutional-grade multi-sig wallet." 
tags: [institutional, custody, safe, security]
---

For institutions and DAOs, private key management is the highest risk factor. Rootstock Safe provides a programmable, multi-signature interface that requires $M$-of-$N$ signatures to authorize any movement of funds. 

## Prerequisites
* **Signer Wallets:** At least two (ideally three or more) independent wallets (e.g., Ledger, Trezor, or MetaMask).
* **Gas:** A small amount of rBTC in one of the signer wallets to pay for the Safe deployment.

## Getting Started

### 1. Initialize the Safe
Navigate to the [Rootstock Safe Interface](https://safe.rootstock.io/) and connect your primary signer wallet.

1. Click **"Create New Safe"**.
2. **Name your Safe:** This is a local identifier (e.g., "Treasury-Alpha").
3. **Add Signers:** Input the addresses of your institutional co-signers. It is a best practice to use hardware wallets for all institutional signers.

### 2. Configure the Threshold
The threshold is the number of signatures required to broadcast a transaction.
* **Recommended:** 2-of-3 or 3-of-5.
* **Warning:** Never set a 1-of-$N$ threshold for institutional assets, as it restores the single point of failure.

### 3. Deployment
Review the configuration and click **"Create"**. You will sign a transaction to deploy the Safe smart contract to the Rootstock blockchain. Once confirmed, you will receive a permanent Safe address.

## Troubleshooting
* **Transaction Stuck:** Multi-sig transactions are executed in two steps: *Proposal* (off-chain) and *Execution* (on-chain). If a transaction is "pending," ensure the minimum number of signers have logged in to sign the proposal.
* **Nonce Mismatch:** If multiple transactions are proposed simultaneously, they must be executed in the order of their nonce. Ensure the oldest pending transaction is cleared first.

## Related Use Cases or Resources
* [Official Safe Docs](https://docs.safe.global/)
* [Managing On-Chain Governance](/use-cases/institutional-governance/dao-rootstock-collective)
* [Compliance & Audit Reporting](/use-cases/institutional-governance/compliance-reporting-tooling)

