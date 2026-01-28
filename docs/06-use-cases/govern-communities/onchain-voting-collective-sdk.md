---
sidebar_position: 3
sidebar_label: On-Chain Voting with Collective SDK
title: Implementing On-Chain Voting with Collective SDK
description: "A guide to staking RIF, minting stRIF, and voting on ecosystem proposals." 
tags: [governance, dao, collective, sdk, rbtc, tutorial]
---

Decentralized governance allows communities to manage shared treasuries and protocol parameters. The Rootstock Collective SDK provides the tools to build these coordination frameworks on the Bitcoin network. This tutorial explains how to use the `@rskSmart/collective` module to cast votes on active proposals.

## Collective SDK Architecture

[cite_start]The Collective SDK uses a modular structure to maintain a separation between blockchain communication and governance logic [cite: 908-909].

1.  **Web3 Core Layer:** It handles the low-level blockchain interaction logic.
2.  **Collective Module:** It contains the business logic for staking and voting.
3.  **Contract Registry:** It stores the addresses for governance and treasury contracts.



## Prerequisites

You must install the following dependencies to interact with the governance module.

* Install the `@rskSmart/collective` and `@rskSmart/w3layer` packages.
* Acquire RIF tokens to stake for voting power.
* Acquire rBTC to pay for transaction gas fees.

## Initializing the SDK

You start by configuring the Web3 Core Layer with your network settings. This layer is a shared foundation for all Rootstock SDK modules.

```ts
// Set the RPC URL for the Rootstock Testnet
const config = { rpcUrl: "https://public-node.testnet.rsk.co" };

// Create the core interaction layer
const core = new Web3CoreLayer(config);

// Load the Collective module to access governance functions
const collective = new CollectiveSDK(core);
```

## Reading Governance Data

[cite_start]The SDK uses the "Read" sequence to fetch data from the blockchain [cite: 908-909]. This sequence involves a request to the Contract Registry to obtain the correct ABI and contract address.



### Checking Voting Power

You must verify your voting power before you attempt to participate in a proposal. Voting power is usually proportional to the amount of RIF you have staked.

```ts
// Request the current voting power for a specific account
// The SDK fetches the staking contract details automatically
const power = await collective.getVotingPower(userAddress);
```

## Casting a Vote

Casting a vote is a "Write" operation that changes the state of the blockchain. This process requires a signature from your wallet and incurs a gas fee in rBTC. [cite_start]The SDK simulates the transaction to verify it will succeed before you sign it [cite: 908-909].



### Submitting a Vote

You choose a proposal and a choice to submit your vote.

```ts
// Define the proposal ID and your voting choice
const voteParams = { proposalId: 42, support: true };

// The SDK simulates the vote to check for errors
// You must provide a signer or wallet client to authorize the transaction
const txHash = await collective.writeContract("castVote", voteParams, signer);

// Check the confirmation status to ensure the network accepted the vote
const result = await core.checkConfirmations(txHash);
```

## Functional Flow in the Stack

Governance is a primary outcome of decentralized coordination. The following diagram illustrates how the Collective SDK integrates with the Rootstock stack.

<div className="rootstock-stack-container">
    {/* Final Value Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>OUTCOME</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">DAO GOVERNANCE</div>
            <div className="sub-module">TREASURY MANAGEMENT</div>
        </div>
    </div>

    {/* Dev Interface Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVELOP</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            ROOTSTOCK COLLECTIVE SDK • HARDHAT
        </div>
    </div>

    {/* Functional Tools Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>UTILITY</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">CONTRACT REGISTRY</div>
            <div className="sub-module">WEB3 CORE LAYER</div>
        </div>
    </div>

    {/* Logic Engine Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>LOGIC</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (EVM-COMPATIBLE)</div>
        </div>
    </div>

    {/* Secure Settlement Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SETTLE</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: SECURE SETTLEMENT LAYER</div>
        </div>
    </div>
</div>

## Next Steps

After you cast your first vote, you can expand your participation in the community.

* [Managing Treasuries with Multi-Sig Wallets](./govern-communities)
* [Deploying Automated Yield Strategies with Vaults SDK](./generate-yield)
* [Automating Governance Actions with AI Agents](./build-ai-agents)