---
sidebar_label: Merged Mining
title: Armadillo - Merged Mining
description: The guardian of RSK
tags: [armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain]
---

[![Armadillo-banner](/img/guides/armadillo/Armadillo_banner.png)](/guides/armadillo/)

## What is merged mining?

Merged mining is the process that allows RSK blockchain to be mined simultaneously with the Bitcoin blockchain.
This can be done because both chains use the same [proof-of-work (PoW)](https://en.wikipedia.org/wiki/Proof_of_work) algorithm,
double SHA-256.

## How it works

[Bitcoin mining pools](https://developers.rsk.co/rsk/architecture/mining/) include a reference to RSK’s block in every the block candidate they deliver to miners as a mining job. This reference is included in the latest output of the Bitcoin coinbase transaction. The proof of work puzzle difficulty informed by the mining pool to miners is called the share difficulty. The share difficulty is lower than RSK block difficulty, which is in turn lower than Bitcoin block difficulty.
Every time miners find a solution to a share, it is submitted to the mining pool and there it is compared to both RSK and Bitcoin networks’ difficulties,
delivering three possible outcomes:

- The solution satisfies Bitcoin [network difficulty](https://en.bitcoin.it/wiki/Difficulty).
  Hence, a block is assembled and sent to the Bitcoin network.
  As the RSK’s merged mining reference had been previously included in the Bitcoin block, it will be seen in the Bitcoin blockchain, but it is ignored by the Bitcoin network.
  Since RSK’s network difficulty is lower than Bitcoin,
  this solution will also work for RSK and can be submitted to the RSK network for the referenced RSK block.

![merged-mining](/img/guides/armadillo/merged-mining.png)

- The Solution does not satisfy Bitcoin network difficulty,
  but satisfies RSK’s network difficulty.
  Consequently, the solution will be submitted to the RSK network along with the referenced RSK block,
  but not to the Bitcoin network.

- The solution only satisfies the pool share difficulty,
  and it is not submitted to any network. It is only used for accounting of miners' work.

The reference to RSK’s block is called [RSKtag](/guides/armadillo/glossary/#rsktag/),
which currently contains, among other data, a 20 byte hash of the RSK block.
When a Bitcoin proof of work solution is submitted to the RSK node by the mining pool,
the node builds an [SPV proof](/guides/armadillo/glossary/#spv-proof)
from the Bitcoin block to the RSKtag, and then submits everything to the RSK network.
This proof allows other RSK nodes to verify the proof of work.

Prior to Wasabi, RSKtag was the 32 byte hash of the RSK block,
but this hash along did not provide sufficient information to Armadillo for fork detection.
If some Bitcoin block contains the RSKtag,
may or may not be in the RSK mainchain.
If the block hash in an RSKtag does not correspond to a block in the RSK mainchain,
there was no way to figure out what the reason that this work was not contributing to the honest chain.
That was the justification for the design and implementation of a new RSKtag format, which was activated in the Wasabi network upgrade.

### New tag for merged mining



[RSKIP110](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP110.md) proposes a format for the RSKtag used for merged mining.
This new format allows RSK users to understand better the health of the network,
recognizing if miners are mining on the honest chain and detect if a parallel selfish blockchain is being created,
all of this with some probability.

![merged-mining-tag](/img/guides/armadillo/merged-mining-tag.png)

The new tag is divided in 4 fields:
1. **Prefix Hash**: Prefix RSK block hash
2. **CPV**: Commit to parent vector
3. **NU**: Number of Uncles
4. **NB**: RSK block number

Armadillo was created to take advantage of this new tag format.

### Prefix Hash

Is a 20-bytes prefix for the RSK block hash.
20 bytes is more than enough to identify the RSK block in terms of defense against hash collision. Also, since the RSK block number is part of the tag, collisions can only be used to create siblings at the same height. Since RSK shares the block reward evenly between all miners of sibling blocks, mining more siblings does not generally provide any additional income.

![prefix-hash](/img/guides/armadillo/prefix-hash.png)

### Commit to Parent Vector (CPV)

Is a 7 bytes field where each byte represents the link to a block in the RSK mainchain in the last 448 blocks from the block to consider.
Each byte consists of the least significant byte of the Bitcoin Block ID field of the 7 RSK blocks positioned at specific checkpoint positions and
spaced 64 blocks between them.

![Commit-to-parent-vector](/img/guides/armadillo/boxes-bytes-cpv.jpg)

The data representation of the Commit to Parent Vector (CPV).
The CPV helps to understand if the RSKtag found in every subsequent BTC block follows the mainchain path or not.
If there is a mismatch in the CPV bytes it means there is an ongoing fork which could end in a double-spend attack.

Hence, ranges of 64 blocks will have the same CPV.
The CPV helps to determine whether the RSKtag found in every subsequent Bitcoin block follows the mainchain fork.
If there is a mismatch in the CPV bytes for blocks in the same 64 block range, it means there is an ongoing fork, which could end in a double-spend attack.

Let’s go over an example:

Suppose we have to calculate the CPV field for a RSK block at height 5000 (BN = 5000).
Then every byte in the 7 CPV array will be formed with a Least Significant Byte of the Bitcoin block ID (LSB) positioned at RSK height,
calculated for the formula  **⎣(BN -1 ) 64⎦ 64 -64\*i**, where i is the position of each byte in the array (0 ⋜ i < 7).
Then the CPV will be using the least significant byte for the Bitcoin Block ID at the RSK heights (4992 4928 4864 4800 4736 4672 4608).
For simplicity we use 00, 11, 22, 33, 44, 55, 66  as LSBs.
Then the CPV in hex will be 00112233445566.
Then, let’s see the difference between an honest miner which follows the RSK mainchain fork,
and a dishonest miner which follows its own fork and differs from the mainchain CPV.

![honest miner](/img/guides/armadillo/honest-miner.png)

![dishonest miner](/img/guides/armadillo/dishonest-miner.png)

## Number of Uncles (NU)

This field represents the number of uncles in the last 32 blocks.
Each block can reference a maximum of 10 uncles (TU),
so 32 blocks can reference up to 320 uncles. However,
since the space used by the NU field is only 1 byte,
the number of uncles is capped to 255.

![Number-Of-Uncles](/img/guides/armadillo/boxes-bytes-nu.jpg)

A high number of uncles indicates either an exceptionally abnormal situation of the network or a surreptitious form of attack.

![number of uncles](/img/guides/armadillo/number-of-uncles.png)

![number of uncles 2](/img/guides/armadillo/nu-2.png)

## Block Number

Block number is the height of the RSK block being merge mined.
With this information, users can detect if a mining pool is merge mining the best block correctly,
if it is delayed, or it is mining on its own fork due to a consensus split.

![Block Number](/img/guides/armadillo/block-number.png)
