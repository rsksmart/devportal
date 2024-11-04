---
sidebar_position: 7
title: What is Merged Mining?
sidebar_label: Merged Mining
tags: [rsk, rootstock, concepts, merged mining]
description: "How merge mining Rootstock with Bitcoin works, and its benefits."
---

[Merged mining](https://rootstock.io/mine-btc-with-rootstock/) is the process that allows Rootstock blockchain to be mined simultaneously with Bitcoin blockchain. This can be done because both chains use the same proof-of-work (PoW) algorithm, double SHA-256.

<Button href="/node-operators/merged-mining/getting-started/">Get Started</Button>

## How it works

Bitcoin mining pools include a reference to Rootstock's block in every mining job they deliver to miners.
Every time miners find a solution, it is compared to both networks' difficulties (Bitcoin and Rootstock), delivering three possible outcomes:

- Solution satisfies Bitcoin network difficulty. Hence, a block is assembled and sent to the network. Rootstock's merged mining reference will be included and ignored by Bitcoin network. Since Rootstock's network difficulty is lower than Bitcoin, this solution will also work for Rootstock and can be submitted to the network.
- Solution does not satisfy Bitcoin network difficulty, but does satisfy Rootstock network difficulty. As a consequence, solution will be submitted to the Rootstock network, but not to the Bitcoin network.
- Solution only satisfies pool difficulty, which is many times lower than Bitcoin or Rootstock network difficulty, and it is not submitted to any network.

Solution submitted to the network allows the node to build an SPV proof. If the proof is valid, it is included as part of the block that will be sent to the network.

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/l3DkV2tkjU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## What are the benefits?

Miners earn a high percentage of transaction fees from the Rootstock block they mine. This mining process is done with the same hashing power used in Bitcoin mining, and has no additional cost or impact.

## What is the current Rootstock network's hashing power?

You can see Rootstock network hashing power in the [Rootstock Stats Website](https://stats.rootstock.io).

## Implementation details for mining software pools

Check out the [Getting Started Implementation Guide](/node-operators/merged-mining/getting-started/).
