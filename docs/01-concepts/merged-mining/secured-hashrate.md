---
sidebar_label: Secured Hashrate
sidebar_position: 100
title: How Rootstock's secured hashrate is calculated
tags: [concepts, rsk, rootstock, merged mining, hashrate]
description: "How Rootstock measures the Bitcoin hashpower securing it, by counting merge-mining tags in Bitcoin coinbase transactions and scaling the Bitcoin hashrate."
---

Rootstock is secured by Bitcoin miners who [merge mine](/concepts/merged-mining/) both chains with the same proof of work. The share of Bitcoin's hashpower that does this is measurable. Every participating miner leaves a tag inside the Bitcoin block they mine, so you can count the tagged blocks and scale Bitcoin's total hashrate by that share.

The Rootstock Explorer publishes the result. This page explains each step of the calculation, so you can audit the published numbers or re-derive them yourself.

## The published metrics

The Explorer API serves the metrics at `GET /api/v3/stats`.

| Field | Meaning | Unit |
| ----- | ------- | ---- |
| `hashrate` | Rootstock network hashrate, reported by a Rootstock node | hashes per second, as a string |
| `bitcoinHashrate` | Estimated total Bitcoin network hashrate | hashes per second, as a string |
| `mergeMiningPercentage` | Share of recent Bitcoin blocks that carry the Rootstock merge-mining tag | ratio between 0 and 1, as a string |
| `rootstockSecuredHashrate` | Bitcoin hashpower actively securing Rootstock | hashes per second, as a string |

A response looks like this.

```json
{
  "data": {
    "activeAccounts": 112242,
    "hashrate": "608900501771594900000",
    "bitcoinHashrate": "909038172416238900000",
    "rootstockSecuredHashrate": "565421743242900595800",
    "mergeMiningPercentage": "0.622000",
    "circulatingSupply": "1662.234700019254340177",
    "totalSupply": 21000000
  }
}
```

The two hashrate values are strings because a network hashrate is a 21-digit number, far past the range where a JSON number stays exact. `mergeMiningPercentage` travels as a string for the same reason, carrying six fixed decimals. Parse all three with a big-number library.

## Step 1: Find the merge-mining tag in a Bitcoin coinbase

Every Bitcoin block starts with a coinbase transaction, which mints the block reward and pays the miner. A merge-mining pool writes a commitment to the Rootstock block it secured into that transaction. The commitment starts with the ASCII string `RSKBLOCK:`, which is `0x52534b424c4f434b3a` in hex, followed by 32 bytes holding the Rootstock block's merged-mining hash.

The [merged mining implementation guide](/node-operators/merged-mining/getting-started/) documents the exact wire format that pools produce. For measurement you only need to answer one question: do those nine tag bytes appear anywhere in the coinbase?

![Bitcoin blocks carrying the RSKBLOCK: tag each commit to one Rootstock block, and the byte layout of that commitment inside the coinbase OP_RETURN output](/img/concepts/merged-mining/merge-mining-commitment.png)

Bitcoin block [955,501](https://mempool.space/block/000000000000000000004cfd1f9cb5463a597662fa3cf15d5c8218fbfd6fbdcb) answers yes. Its coinbase carries an `OP_RETURN` output holding this script.

```
6a 29 52534b424c4f434b3a 410ac1c4b7fb2330ffa2b6434afb44429b702189371c4158d102fe13008922b6
```

Each piece has a job.

- `6a` is the `OP_RETURN` opcode, which marks the output as data rather than spendable value.
- `29` pushes the next 41 bytes.
- `52534b424c4f434b3a` is the `RSKBLOCK:` tag.
- The final 32 bytes are the merged-mining hash of the Rootstock block that this Bitcoin block secured.

Nine tag bytes plus 32 hash bytes make 41, which matches the push opcode. The block is merge mined, and it records a commitment to a specific Rootstock block.

Those 32 bytes are a Rootstock block header hash computed for merged mining, so they will not resolve as a canonical Rootstock block hash through `eth_getBlockByHash`. Rootstock nodes use them during consensus to verify that the proof of work in this Bitcoin block belongs to that Rootstock block.

Two properties of this check matter for correctness. First, classification depends on tag presence alone. The calculation never looks at Rootstock transactions, so a chain of custody back to Rootstock's own state is not required. Second, the scan covers both places the tag can live. Pools normally use an `OP_RETURN` output, but the coinbase input script is also valid, and checking only one location undercounts.

## Step 2: Count tagged blocks across a window

One block tells you nothing about the network. The Explorer walks back from the Bitcoin tip over the latest 1,000 blocks, roughly seven days, and classifies each one.

```
mergeMiningPercentage = mergeMinedBlocks / bitcoinBlocksSampled
```

A 1,000 block window balances two errors. A short window swings wildly when a single large pool pauses for an afternoon. A long window averages in hashpower that stopped merge mining weeks ago. Seven days smooths out pool-level noise while still describing the network as it is today.

The sample size is also the denominator, not a hardcoded 1,000. If some blocks cannot be fetched, the ratio uses the blocks that were actually classified, so a partial sample never reads as a drop in participation.

## Step 3: Estimate the total Bitcoin hashrate

Nobody can measure Bitcoin's hashrate directly, because miners do not report how many hashes they tried. It is inferred from two values the network does publish: how hard the mining puzzle is, and how fast blocks arrive.

```
bitcoinHashrate ≈ difficulty × 2^32 / 600
```

At difficulty 1 a miner needs about 2^32, or 4.29 billion, attempts to find a block. Scaling by the real difficulty and spreading the work over Bitcoin's 600 second target block time gives hashes per second. Using block 955,501's difficulty of about 1.249 × 10^14, that formula returns roughly 894 EH/s, where one EH/s is 10^18 hashes per second.

The Explorer does not use that formula. It reads the current network hashrate estimate that a Bitcoin data provider publishes, because the formula assumes a perfect 600 second block time while the provider derives its figure from the pace blocks actually arrived at. Read at the same moment, the two land within a few percent of each other, and the provider's figure tracks reality more closely when blocks run fast or slow.

## Step 4: Scale the Bitcoin hashrate by the share

The headline metric is a product of the previous two steps.

```
rootstockSecuredHashrate = bitcoinHashrate × mergeMiningPercentage
```

Read the example response above out loud and it says that about 565 EH/s of Bitcoin's 909 EH/s also secures Rootstock. That is close to two thirds of Bitcoin's hashpower protecting a second chain, at no extra energy cost.

The share moves in large steps rather than drifting. Merge mining is a setting a pool enables once in its poolserver, so a participating pool tags nearly every block it finds and a non-participating pool tags none. Measured over 600 recent blocks, AntPool, F2Pool, ViaBTC, SECPOOL and Luxor tagged 100% of their blocks, while Foundry USA tagged 0% of its 161 blocks. One large pool changing its configuration moves the published metric by several percentage points.

That per-pool split is also a useful check on an independent implementation. Results should be close to all or nothing for each pool, apart from a pool that changed its configuration partway through the window. A detector reporting middling rates for every pool is probably scanning only one of the two tag locations.

## How the Explorer produces and serves the numbers

The calculation runs on a schedule rather than on request. A daily job in the Explorer indexer samples the window, computes the three values, and stores one snapshot per day keyed by date. The `/api/v3/stats` endpoint reads the most recent snapshot, so a request never triggers a walk over 1,000 Bitcoin blocks and response times stay flat.

Three behaviours follow from that design, and they matter if you consume the endpoint.

- The Bitcoin metrics are up to a day old. They describe a seven day window, so they move slowly and a daily refresh is enough resolution.
- The three fields are `null` until the first snapshot exists. Handle that case rather than assuming a number is always present.
- A snapshot only gets written when the job could classify at least 90% of the window. If a data provider degrades, the job fails and leaves the previous snapshot in place, so the endpoint keeps serving the last good reading instead of a value skewed by missing blocks.

## Reproduce the calculation yourself

Start by reading the published metrics.

```bash
curl -s https://be.explorer.rootstock.io/api/v3/stats | jq '.data'
```

Then check a single Bitcoin block for the tag. This looks up block 955,501 and prints any coinbase script, input or output, containing the tag bytes.

```bash
HASH=$(curl -s https://mempool.space/api/block-height/955501)
curl -s "https://mempool.space/api/block/$HASH/txs/0" \
  | jq -r '.[0].vin[].scriptsig, .[0].vout[].scriptpubkey' \
  | grep -i 52534b424c4f434b3a
```

A match prints the same `OP_RETURN` script shown in step 1. To audit the share, repeat the check across a range of recent heights and divide the number of matches by the number of blocks you checked. Pace your requests, because public Bitcoin APIs rate-limit bulk access; the Explorer's own job waits 250 ms between blocks.

The commitment can also be audited from the Rootstock side. The diagram in step 1 shows that the payload's last four bytes are a block number, and `0x008922b6` is 8,987,318. Ask a Rootstock node for that block.

```bash
curl -s -X POST https://public-node.rsk.co -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_getBlockByNumber","params":["0x8922b6",false]}' \
  | jq -r '.result.hashForMergedMining'
```

It returns `0x410ac1c4...8922b6`, the exact 32 bytes sitting in the Bitcoin coinbase. The same response carries `bitcoinMergedMiningHeader`, the 80 byte Bitcoin block header whose proof of work seals this Rootstock block. Hash that header twice with SHA-256 and you get Bitcoin block 955,501's hash, which closes the loop: one unit of work, committed on both chains, checkable in both directions.

:::info[Reading the numbers]
The figures on this page were measured over Bitcoin blocks 958,563 to 959,562, and the single-block walkthrough uses block 955,501. Difficulty, hashrate, and the merge-mining share all drift, so treat every number here as a worked example rather than the current state of the network. Read the endpoint for live values.
:::

## Details worth knowing

A few properties of this metric are easy to misread.

- **The tag is a commitment, not a full proof.** Its presence shows that a miner claimed a Rootstock block. Verifying the claim means checking the merkle proof that links the two blocks, which Rootstock nodes do during consensus. For a participation share, the tag is the correct lightweight signal.
- **Testnet reads zero, and that is accurate.** Almost no miners embed the tag on Bitcoin testnet, so `mergeMiningPercentage` there is legitimately 0 and `rootstockSecuredHashrate` follows it to 0. The `bitcoinHashrate` value stays non-zero, because testnet still has real hashpower behind it.
- **The share is not a security guarantee on its own.** It measures how much hashpower participates. The [merged mining reference](/node-operators/merged-mining/reference/) covers the growth phases and the additional protections against double-spend attacks.
- **Precision is limited by the inputs.** The Bitcoin hashrate is an estimate read to a few significant digits, so the secured hashrate inherits that precision. Comparing two readings to the last digit is not meaningful.
