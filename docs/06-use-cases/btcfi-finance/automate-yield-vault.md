---
sidebar_position: 3
sidebar_label: Building Automated Yield Vaults
title: Building Automated Yield Vaults
description: "Learn to build and manage automated yield strategies on Bitcoin using the Rootstock Vaults SDK." 
tags: [btcfi, automation, vaults, sdk, rbtc, dev-tutorial]
---

Automated yield vaults execute predefined strategies to optimize returns for depositors. The Rootstock Vaults SDK simplifies the development of these vaults by providing standardized interfaces for capital movement. This tutorial covers the logic required to build a vault that rebalances assets across multiple protocols.

## The Automation Layer

Automated vaults reduce manual intervention by programmatically shifting funds. You use the `@rskSmart/vaults` module to monitor vault performance and trigger rebalancing events based on on-chain data.

[cite_start]The SDK interacts with the Web3 Core Layer to ensure every automated action is simulated before execution [cite: 908-909]. This verification step is critical because failing transactions on the mainnet consume gas without providing a result.

## Technical Architecture for Automation

The Rootstock SDK follows a layered pattern to maintain scalability. The Web3 Core Layer manages the low-level blockchain logic, while the Vaults module handles high-level business functions [cite: 908-909].

1.  **Web3 Core Layer:** It provides the JSON-RPC methods to query the state of the blockchain.
2.  **Shared Base Functions:** These encapsulate common utilities like error handling for the automation loop.
3.  **Module Specific Functions:** These execute the rebalancing logic, such as moving rBTC from one yield protocol to another.



## Implementing the Automation Loop

You must create a loop that checks the current strategy's efficiency. The agent uses the "Read" function sequence to fetch current yields from the Contract Registry [cite: 908-909].

### Querying Strategy Performance

The vault must know the current Annual Percentage Yield (APY) of its underlying strategies.

```ts
// Initialize the Vaults SDK with your configuration
const vaults = new VaultsSDK(core);

// Fetch the performance data for your primary strategy
// The registry provides the ABI and address for the strategy contract
const currentApy = await vaults.getVaultApy("rBTC-Alpha-Strategy");
```

## Executing the Rebalance

If a new strategy offers a higher return, you trigger a rebalance. This involves the "Write" function sequence, which requires a wallet client or signer to authorize the movement of funds [cite: 908-909].

### Triggering the Asset Shift

You must handle the complexity of protocol permissions. Most yield protocols require an approval step before the vault can move assets.

```ts
// Define the rebalancing parameters
const rebalanceParams = { targetProtocol: "rBTC-Beta-Strategy", amount: totalBalance };

// Simulate the rebalance transaction to check for potential errors
// The signer provides the authorization for the execution
const txHash = await vaults.writeContract("rebalance", rebalanceParams, signer);

// Monitor the confirmation status to verify the funds reached the target
const finalStatus = await core.checkConfirmations(txHash);
```

## Functional Flow in the Rootstock Stack

Automation sits at the top of the stack, leveraging the RVM for logic and Bitcoin for settlement security.

<div className="rootstock-stack-container">
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>OUTCOME</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">AUTOMATED YIELD</div>
            <div className="sub-module">STRATEGY OPTIMIZATION</div>
        </div>
    </div>

    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVELOP</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            ROOTSTOCK VAULTS SDK • HARDHAT
        </div>
    </div>

    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>UTILITY</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">WEB3 CORE LAYER</div>
            <div className="sub-module">CONTRACT REGISTRY</div>
        </div>
    </div>

    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>LOGIC</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (EVM-COMPATIBLE)</div>
        </div>
    </div>

    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SETTLE</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: SECURE SETTLEMENT LAYER</div>
        </div>
    </div>
</div>

## Next Steps

Automating your vault is only the beginning. You can now integrate more complex logic:

* [Integrating AI Agents for Intelligent Rebalancing](./build-ai-agents)
* [Securing Your Vault with Multi-Sig Governance](./govern-communities)
* [Using the Rootstock Explorer to Verify Strategy Executions](./navigate-the-chain)