---
title: Build DAO Voting and RIF Utility on Rootstock with the Collective SDK
label: Build DAO Voting
description: Learn how to build Rootstock governance dApps with the Collective SDK. Use the starter kit to stake RIF, fetch proposals, simulate writes, and cast votes safely.
slug: /use-cases/integrate-rif-economy/build-dao-voting-collective-sdk
sidebar_label: DAO Voting with Collective SDK
sidebar_position: 3
tags:
  - governance
  - dao
  - collective-sdk
  - rif
  - rootstock
keywords:
  - Rootstock Collective SDK
  - on-chain voting Rootstock
  - DAO voting
  - RIF staking
---

This guide is written for developers who want to move from reading SDK docs to building production dApps with staking, governance, and RIF utility.

## Why Build Governance dApps?

Governance dApps fail when developers cannot connect business goals to chain actions. The Collective SDK solves that gap for Rootstock by exposing staking, proposals, backing, and holdings in one TypeScript package. You can ship participation flows fast, then expand into richer use cases.

For this guide, the target outcome is practical. A developer should be able to open a starter kit, connect a wallet, stake RIF, read active proposals, and cast a vote with simulation before write.

This is the core bridge between RIF utility and DAO activity.

## What the Kit Covers

The starter kit is a working reference app. It covers governance participation and keeps complexity low.

Implemented now:

- Connect wallet with Wagmi and RainbowKit.
- Initialize `CollectiveSDK` for Rootstock Mainnet or Testnet.
- Stake and unstake RIF.
- Fetch and display proposals.
- Vote with simulation before submit.

Not implemented in the sample UI:

- Proposal creation UI.
- Backing module UI.
- Rewards claim UI.
- Vault-specific flows.

Those are ideal "build next" paths for teams that need custom business logic.

## Getting Started

- **Setup:** Clone, environment variables, `npm install`, and `npm run dev` live in the [rootstock-collective-starter-kit README](https://github.com/rsksmart/rootstock-collective-starter-kit) (Setup). The Dev Portal does not copy those steps here. When the kit changes, update the README once and both the [quick start](/developers/quickstart/collective/) and this guide stay accurate.

- **Quick start:** Use [Collective DAO starter kit](/developers/quickstart/collective/) for links to the repo and a minimal run checklist.

- **Deep dive:** Continue with [About the SDK](#about-the-sdk) for how Collective SDK methods map to files in the kit, simulation, FAQs, and a production checklist.

## About the SDK

The package is [`@rsksmart/collective-sdk`](https://www.npmjs.com/package/@rsksmart/collective-sdk). It exposes modules you can compose by use case.

- `sdk.staking` for RIF to stRIF flows and voting power setup.
- `sdk.proposals` for reading proposals and casting votes.
- `sdk.backing` for builder allocation workflows.
- `sdk.holdings` for balances, voting power, and rewards.

The [starter kit](https://github.com/rsksmart/rootstock-collective-starter-kit) demonstrates the first two modules directly in UI components. It also keeps contract addresses explicit in one file so teams can manage deployments safely.

```ts
// /src/constants/contracts.ts
// Override Collective contract addresses per Rootstock chain.
export const COLLECTIVE_CONTRACT_ADDRESSES = {
  31: {
    governor: "0x25b7eb94f76cc682a402da980e6599478a596379",
    treasury: "0xc4dacee263b0d1f2a09006dbc0170a4fda861b68",
    backersManager: "0xd520cb42c46115762c02e4340646c2051ca3406d",
    builderRegistry: "0x5fc1dd934ef2e6b5c4a433a3ec0a1326834b0f42",
    RIF: "0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE",
    stRIF: "0xe7039717c51c44652fb47be1794884a82634f08f",
    USDRIF: "0x8dbf326e12a9fF37ED6DDF75adA548C2640A6482",
  },
} as const
```

## Core Implementation Flow

This section maps method calls to files within the kit so developers can navigate quickly. 

### 1) Initialize SDK from wallet chain

Use the connected wallet chain. Do not hardcode one network in the hook.

```ts
// /src/hooks/useCollective.ts
// Create CollectiveSDK for chain 30 or 31 with explicit address overrides.
const sdk = new CollectiveSDK({
  chainId,
  rpcUrl,
  contractAddresses,
})
```

What it does:
- File: `src/hooks/useCollective.ts`
- Method: `new CollectiveSDK({ chainId, rpcUrl, contractAddresses })`
- Guardrails: return `isReady: false` when wallet is disconnected or chain is not Rootstock.

### 2) Stake RIF and mint voting power

Stake is a two-step flow when allowance is missing.

```ts
// /src/components/dao/StakingCard.tsx
// Check allowance before staking.
const info = await sdk.staking.getStakingInfo(address)
const needsApprove = !info.hasAllowance(value)

// Simulate and approve only when required.
if (needsApprove) {
  await simulateApproveRIF(publicClient, address, addresses, value)
  const approveTx = await sdk.staking.approveRIF(walletClient, value)
  await approveTx.wait()
}

// Simulate and execute stake.
await simulateStakeRIF(publicClient, address, addresses, value, address)
const stakeTx = await sdk.staking.stakeRIF(walletClient, value, address)
await stakeTx.wait()
```

What it does:
- File: `src/components/dao/StakingCard.tsx`
- Methods: `getStakingInfo`, `approveRIF`, `stakeRIF`, `unstakeRIF`
- UX detail: stake progress timeline in component state.

### 3) Read active proposals

The list view fetches proposals and renders proposal state plus votes.

```ts
// /src/components/dao/ProposalList.tsx
// Fetch proposal list with an explicit limit.
const result = await sdk.proposals.getProposals({ limit: 20 })
```

What it does:

- File: `src/components/dao/ProposalList.tsx`
- Method: `sdk.proposals.getProposals({ limit: 20 })`
- Empty state message clarifies that proposal creation is outside current sample scope.

### 4) Cast vote with support option

Vote uses `VoteSupport` enum and sends the wallet signature.

```ts
// /src/components/dao/VoteButton.tsx
// Simulate first, then cast vote.
await simulateCastVote(publicClient, address, addresses, proposalId, support)
const voteTx = await sdk.proposals.castVote(walletClient, proposalId, support)
await voteTx.wait()
```

What it does:

- File: `src/components/dao/VoteButton.tsx`
- Method: `sdk.proposals.castVote(walletClient, proposalId, support)`
- Enum: `VoteSupport.For | VoteSupport.Against | VoteSupport.Abstain`

## Simulation before Write is Required

Write calls can fail for predictable reasons. The starter kit simulates every write and stops early on failure.

Simulation helpers live in `src/lib/simulation.ts`.

```ts
// /src/lib/simulation.ts
// Simulate vote call against Governor before sending transaction.
await publicClient.simulateContract({
  address: addresses.governor,
  abi: governorCastVoteAbi,
  functionName: "castVote",
  args: [id, support],
  account,
})
```

This pattern protects users from avoidable gas spend and gives clear feedback for balance, allowance, and proposal-state issues.

> Implement one additional flow, backing, rewards, or proposal creation.

## Error Handling for Builders

In your app, pair UI feedback with clear failure semantics, say what failed and why, not only a toast.

In `src/lib/errors.ts`, insufficient voting power is handled with context:

```ts
// /src/lib/errors.ts
// Explain VP snapshot behavior so users know why vote can fail after staking.
return `${current}Voting power is based on your stRIF at the proposal snapshot (start of voting period); new stakes apply from the next epoch. You need more than 0 stRIF to vote. 1 RIF staked = 1 voting power.`
```

This is important for governance UX. Users often assume staking now means voting now. Proposal snapshots can invalidate that expectation.

## Production Checklist for Builders

Before publishing your own Collective-based dApp:
- Confirm wallet chain updates trigger state refresh for balances and SDK flows.
- Verify RIF and stRIF addresses per chain in `constants/contracts.ts`.
- Keep simulation before all writes, including proposal creation if you add it.
- Show explorer links for every write result so users can verify on chain.
- Include RPC key fallback logic. Public nodes can rate limit in traffic spikes.
- Test insufficient VP and allowance failures intentionally.
- Test wallet reconnect and account switching.

## Extend the Use Cases from this Base

This section ties directly to RIF utility strategy.

### Use case 1: Backing allocation dashboard

Goal: let stRIF holders allocate support to builders and monitor returns.

SDK paths:

- `sdk.backing.getBuilders()`
- `sdk.backing.getBackedBuilders()`
- `sdk.backing.getAvailableForBacking()`

Business impact:

- Increases stickiness for stRIF holders.
- Turns governance participation into active ecosystem allocation.

### Use case 2: Rewards cockpit for active backers

Goal: show claimable balances and claim paths in one screen.

SDK paths:

- `sdk.holdings.getBalances()`
- `sdk.holdings.getUnclaimedRewards()`
- `sdk.holdings.claimRewards()`

Business impact:

- Makes reward flow visible, which increases recurring engagement.

### Use case 3: Treasury operation builder

Goal: create and track treasury-related governance proposals.

SDK paths:

- `sdk.proposals.createProposal()`
- `sdk.proposals.createTreasuryTransferProposal()`
- `sdk.proposals.getProposalDetails()`

Business impact:

- Expands from participation to DAO operations.

## Frequently Asked Questions

This FAQ is based on issues that may surface while implementing and testing the starter kit.

### Why does the app not react when I switch networks in MetaMask?

Your UI state can become stale if you do not invalidate queries on wallet events. The starter kit addresses this with wallet sync and query invalidation. Also verify your chain guard. `useCollective` returns not-ready state when chain is not Rootstock.

### Why do I see tRBTC balance but no RIF balance?

Native balance and ERC20 balance are separate reads. Verify the RIF token address for your chain in `constants/contracts.ts`. Also verify that token reads use the same connected chain. If token balance reads are undefined, inspect RPC and token contract availability for that chain.

### Why does voting fail right after staking?

Voting power is tied to proposal snapshot timing. New stakes may apply in a later epoch. The starter kit surfaces this via `getInsufficientVPDescription` in `src/lib/errors.ts`.

### Why do I need simulation if the SDK already validates?

Simulation catches contract reverts before signature and send. It reduces user friction and failed transactions. Keep it for all writes.

### What wallet object should I pass to SDK write methods?

Pass Wagmi `walletClient`. The SDK expects a signer-capable client for `approveRIF`, `stakeRIF`, `unstakeRIF`, and `castVote`.

### Why does the ConnectButton show 0 balance while my wallet has funds?

Do not rely only on third-party account widgets for balance display. The starter kit also reads balances directly with Wagmi `useBalance` for chain-consistent values.

### Which chain IDs are supported in this implementation?

Rootstock Mainnet (`30`) and Rootstock Testnet (`31`). The hook and chain utils enforce that range.

### Where should I add custom contract addresses?

Use `src/constants/contracts.ts`. Keep all overrides there so QA and deployments stay predictable.

### What is the fastest way to add proposal creation?

Reuse the existing `useCollective` hook. Add a proposal form component. Keep simulation before write. Start with `sdk.proposals.createProposal` and `sdk.proposals.createTreasuryTransferProposal`.

### What is the minimum environment setup?

Use the **Environment** subsection under **Setup** in the [starter kit README](https://github.com/rsksmart/rootstock-collective-starter-kit#setup). Variable names and required vs optional keys are defined only there so they do not drift from this guide.

:::tip[Submit a Use Case]

Fork the starter kit and open a PR with your custom use case. Install `@rsksmart/collective-sdk` and ship your first governance action on Rootstock.

:::

## References

Use these links in the published article and sidebar.

- [Collective SDK on npm](https://www.npmjs.com/package/@rsksmart/collective-sdk)
- [Collective SDK source](https://github.com/rsksmart/collective-sdk)
- [Rootstock Collective starter kit](https://github.com/rsksmart/rootstock-collective-starter-kit)
- [Rootstock Developers Portal](https://dev.rootstock.io/)
- [Rootstock Collective](https://rootstockcollective.xyz/)
