---
sidebar_position: 4
sidebar_label: Deploying Your First Organic Yield Vault
title: "Deploying Your First Organic Yield Vault" 
description: "Build an ERC-4626 compliant yield engine using the Rootstock Vaults SDK." 
tags: [btcfi, yield, vault, sdk, rbtc, dev-tutorial]
---

Yield vaults turn rBTC into a productive asset by automating interest-bearing strategies. The Rootstock Vaults SDK provides a standardized way to interact with ERC-4626 vaults. This tutorial explains how to initialize the SDK and deposit rBTC into a vault.

## Vaults SDK Architecture

The Vaults SDK sits on top of the Web3 Core Layer to manage financial logic. It uses a modular pattern to separate chain communication from vault-specific functions[cite: 908].

1.  **Web3 Core Layer:** It provides the connection to the Rootstock network.
2.  **Vaults Module:** It contains functions to read vault data and execute deposits.
3.  **Contract Registry:** It stores the addresses and ABIs for the vault ecosystem.



## Prerequisites

You must prepare your environment before you interact with a vault.

* Install the `@rskSmart/vaults` and `@rskSmart/w3layer` packages.
* Acquire a small amount of rBTC for transaction fees.
* Configure a provider for the Rootstock Testnet or Mainnet.

## Initializing the Vaults SDK

You must establish a connection to the Rootstock network through the Web3 Core Layer. This layer is agnostic to the specific module you use.

```ts
// Define your network configuration
const config = { rpcUrl: "https://public-node.testnet.rsk.co" };

// Initialize the core interaction layer
const core = new Web3CoreLayer(config);

// Load the vaults module using the core layer
const vaults = new VaultsSDK(core);
```

## Interacting with a Yield Vault

The SDK uses the "Read" sequence to fetch vault metadata from the Contract Registry. This metadata includes the vault address and the current Annual Percentage Yield (APY).

### Reading Vault State

You check the status of a vault before you commit funds.

```ts
// Fetch the vault instance by its identifier
const vaultInstance = await vaults.getVault("rBTC-Primary-Vault");

// Retrieve the current total assets managed by the vault
const totalAssets = await vaultInstance.readBalance();
```

## Executing a Deposit

Depositing assets follows the SDK "Write" sequence. The process includes a mandatory simulation step to verify the transaction success[cite: 908].

### Depositing rBTC

The SDK handles the complexity of the ERC-4626 deposit function.

```ts
// Set the amount of rBTC to deposit
const depositAmount = parseEther("0.05");

// The SDK simulates the transaction to prevent gas loss
// It then requests a signature from your wallet client
const txHash = await vaults.writeContract("deposit", { amount: depositAmount }, signer);

// Wait for the network to confirm the transaction
const confirmation = await core.checkConfirmations(txHash);
```

## Functional Flow in the Stack

Yield generation is the primary outcome of the BTCFi ecosystem. The following diagram shows how the Vaults SDK connects your application to Bitcoin security.

<div className="rootstock-stack-container">
    {/* Value Outcome Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>OUTCOME</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">ORGANIC YIELD</div>
            <div className="sub-module">YIELD AGGREGATION</div>
        </div>
    </div>

    {/* SDK Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVELOP</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            ROOTSTOCK VAULTS SDK • FOUNDRY
        </div>
    </div>

    {/* Logic & Registry Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>UTILITY</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">CONTRACT REGISTRY</div>
            <div className="sub-module">WEB3 CORE LAYER</div>
        </div>
    </div>

    {/* Execution Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>LOGIC</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (RVM)</div>
        </div>
    </div>

    {/* Settlement Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SETTLE</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: PROOF-OF-WORK SECURITY</div>
        </div>
    </div>
</div>

## Next Steps

After you deploy your first vault interaction, you should improve your application:

* [Automating Portfolio Rebalancing with AI Agents](./build-ai-agents)
* [Implementing Multi-Sig Treasury Management](./govern-communities)
* [Monitoring Vault Events on the Rootstock Explorer](./navigate-the-chain)