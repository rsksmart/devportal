---
sidebar_label: Reference
title: Merged mining reference
tags:
  - rsk
  - mining
  - bitcoin
description: How Rootstock leverages the Bitcoin network's consensus mechanism for its own secruity, and adds additional features to prevent double spending
---

Satoshi consensus, based on proof-of-work (PoW), is the only consensus system that prevents the rewrite of blockchain history at a low cost. The academic community is advancing the knowledge and study of proof-of-stake (PoS) as an alternative, but currently PoW provides the highest proven security. Merge mining is a technique that allows Bitcoin miners to mine other cryptocurrencies simultaneously with nearly zero marginal cost. The same mining infrastructure and setup they use to mine Bitcoins is reused to mine Rootstock (RSK) simultaneously. This means that as Rootstock rewards the miners with additional transaction fees, the incentive for merged mining becomes high.

We have identified three phases for Rootstock merge-mining growth:

- Bootstrap phase: Merge-mining is below 30% of Bitcoin hashrate.
- Stable phase: Merge-mining is between 30% and 60% of Bitcoin hashrate.
- Mature phase: Merge-mining is higher than 60% of Bitcoin hashrate.

Rootstock has left behind its bootstrapping phase, when rogue merge-miners could theoretically revert Rootstock blockchain at a low cost. As of December 2021, more than 50% of Bitcoin miners are engaged in Rootstock merge-mining. But as Rootstock fees remain low compared to Bitcoin block reward, the cost to attack Rootstock through double-spending is lower than Bitcoin’s.
Rootstock has some properties to reduce the risk of double-spend attacks, such as long miner rewards maturity. Still RootstockLabs research team has developed several protections to prevent attacks during the stable and mature phases of the project:

- _**Signed notifications:**_ Rootstock clients can make use of signed notifications by notaries. Nodes can use these notifications to detect Sybil attacks and inform the user.
- _**Transparent double-spend trails:**_ this is a method where all Rootstock merge-mining tags are augmented with additional information that can be used to detect selfish Rootstock forks that are public in the Bitcoin blockchain. Selfish-fork proofs are automatically constructed and these proofs are presented to the Rootstock nodes, which spread them over the network. The proofs force nodes to enter a “safe mode” where no transaction is advertised as confirmed. The safe mode prevents merchants and exchanges from accepting payments that could be double-spent. Once the proven selfish-fork is outpaced by the Rootstock mainchain in accumulated PoW, the network reverts to its normal state. This method is a deterrent for any Rootstock double-spend attempt, where the malicious miner still tries to collect Bitcoin rewards when mining the selfish fork.

Once the platform enters the maturity phase, we estimate the security of Rootstock will be enough to support the economy of worldwide financial inclusion.

## Main features:

- [REMASC consensus protocol](/node-operators/merged-mining/remasc/)
- One-day maturity for mining reward
- No loss of efficiency in Bitcoin mining expected from merge mining (for late mid-state switching)
