---
sidebar_label: Secured Hashrate Calculator
sidebar_position: 100
title: How Rootstock Calculates Secured Hashrate
tags: [concepts, rsk, rootstock, merged mining, hashrate]
description: "How Rootstock measures the Bitcoin hash power securing it, by counting merge-mining tags in Bitcoin coinbase transactions and scaling the Bitcoin hashrate."
---

Rootstock is secured by Bitcoin miners who [merge mine](/concepts/merged-mining/) both chains with the same proof of work. The share of Bitcoin's hash power that does this is measurable. Every participating miner leaves a tag inside the Bitcoin block they mine, so you can count the tagged blocks and scale Bitcoin's total hashrate by that share.

The Rootstock Explorer publishes the result. This page explains each step of the calculation, so anyone can independently verify the published numbers or re-derive them from raw chain data. One framing matters before the math: the metric measures participation, not security directly. It says how much hash power takes part in merge mining, not what attacking Rootstock would cost.

## The published metrics

The Explorer API serves the metrics at `GET /api/v3/stats`. It exposes four hashrate related fields.

| Field | Meaning | Unit |
| ----- | ------- | ---- |
| `hashrate` | Rootstock network hashrate, reported by a Rootstock node | hashes per second, as a string |
| `bitcoinHashrate` | Estimated total Bitcoin network hashrate | hashes per second, as a string |
| `mergeMiningPercentage` | Share of recent Bitcoin blocks that carry the Rootstock merge-mining tag | ratio between 0 and 1, as a string |
| `rootstockSecuredHashrate` | Bitcoin hash power actively securing Rootstock | hashes per second, as a string |

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

The two hashrate values are strings because a network hashrate is a 21-digit number, far past the range where a JSON number stays exact. `mergeMiningPercentage` travels as a string for the same reason, carrying six fixed decimals. The hashrates parse cleanly with JavaScript's built-in `BigInt` or ethers' `BigNumber`; the percentage carries decimals, so use an arbitrary-precision decimal library such as `bignumber.js` or `decimal.js`.

## Step 1: Find the merge-mining tag in a Bitcoin coinbase

Every Bitcoin block starts with a coinbase transaction, which mints the block reward and pays the miner. A merge-mining pool writes a commitment to the Rootstock block it secured into that transaction. The commitment starts with the ASCII string `RSKBLOCK:`, which is `0x52534b424c4f434b3a` in hex, followed by 32 bytes holding the Rootstock block's merged-mining hash.

The [merged mining implementation guide](/node-operators/merged-mining/getting-started/) documents the exact wire format that pools produce. For measurement you only need to answer one question: **do those nine tag bytes appear anywhere in the coinbase?**

![Bitcoin blocks carrying the RSKBLOCK: tag each commit to one Rootstock block. Inside the coinbase OP_RETURN output, the commitment is the 9 byte tag followed by the 32 byte hashForMergedMining, whose last four bytes are the Rootstock block number.](/img/concepts/merged-mining/merge-mining-commitment.png)

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

Those 32 bytes are a Rootstock block header hash computed for merged mining, not the block's canonical hash, and `eth_getBlockByHash` looks blocks up by their canonical hash only. Passing the merged-mining value returns `null`. The field travels in the other direction: request a block by number or canonical hash and read `hashForMergedMining` from the response, as the reproduction section below does. Rootstock nodes use it during consensus to verify that the proof of work in this Bitcoin block belongs to that Rootstock block.

Two properties of this check matter for correctness. First, classification depends on tag presence alone. The calculation never looks at Rootstock transactions, so a chain of custody back to Rootstock's own state is not required. Second, the scan covers both places the tag can live. Pools normally use an `OP_RETURN` output, but the coinbase input script is also valid, and checking only one location undercounts.

## Step 2: Count tagged blocks across a window

One block tells you nothing about the network. The Explorer classifies every Bitcoin block it indexes and stores the result, then measures the share over the most recent 1,000 stored heights, roughly seven days.

```
mergeMiningPercentage = mergeMinedBlocks / bitcoinBlocks
```

A 1,000 block window balances two errors. A short window swings wildly when a single large pool pauses for an afternoon. A long window averages in hash power that stopped merge mining weeks ago. Seven days smooths out pool-level noise while still describing the network as it is today.

The window is a complete count over a stated range of heights rather than a sample of it, and the snapshot records the first and last height it covered. That is what makes the published share auditable: anyone can count the same heights and arrive at the same number. It also removes an ambiguity a sample cannot avoid, where a lower figure could mean either less merge mining or fewer blocks examined.

## Step 3: Estimate the total Bitcoin hashrate

Nobody can measure Bitcoin's hashrate directly, because miners do not report how many hashes they tried. It is inferred from two values the network does publish: how hard the mining puzzle is, and how fast blocks arrive.

```
bitcoinHashrate ≈ difficulty × 2^32 / 600
```

At difficulty 1 a miner needs about 2^32, or 4.29 billion, attempts to find a block. Scaling by the real difficulty and spreading the work over Bitcoin's 600 second target block time gives hashes per second. Using block 955,501's difficulty of about 1.249 × 10^14, that formula returns roughly 894 EH/s, where one EH/s is 10^18 hashes per second.

That formula is background rather than implementation: it shows what a hashrate estimate means, but it assumes a perfect 600 second block time, which the network never delivers exactly. The Explorer asks Bitcoin itself instead, through the standard `getnetworkhashps` RPC method, which derives the estimate from how fast blocks actually arrived rather than from the target rate. Any Bitcoin node answers it, so the figure can be re-checked against a node of your own.

Two arguments go with the call, and both matter. The first is how many blocks to average over, which is the same 1,000 as the window above. The second is the height to measure up to, which is the window's last height rather than the node's current tip. Without it the two factors of the published product would describe different stretches of the chain: a share counted over one range, multiplied by a hashrate read over another. Passing the height keeps them aligned and makes the result reproducible, because the same call at the same height returns the same number tomorrow.

## Step 4: Scale the Bitcoin hashrate by the share

The headline metric is a product of the previous two steps.

```
rootstockSecuredHashrate = bitcoinHashrate × mergeMiningPercentage
```

The Explorer API's example response in [the published metrics](#the-published-metrics) shows this product already computed: multiplying `bitcoinHashrate` (909 EH/s) by `mergeMiningPercentage` (0.622) gives the 565 EH/s published as `rootstockSecuredHashrate`. That is close to two thirds of Bitcoin's hash power protecting a second chain, at no extra energy cost.

The share moves in large steps rather than drifting. Merge mining is a setting that a pool enables once in its poolserver, so a participating pool tags nearly every block it finds and a non-participating pool tags none. Measured over 600 recent blocks, AntPool, F2Pool, ViaBTC, SECPOOL and Luxor tagged 100% of their blocks, while Foundry USA tagged 0% of its 161 blocks. One large pool changing its configuration moves the published metric by several percentage points.

That per-pool split is also a useful check on an independent implementation. Results should be close to all or nothing for each pool, apart from a pool that changed its configuration partway through the window. A detector reporting middling rates for every pool is probably scanning only one of the two tag locations.

## How the Explorer produces and serves the numbers

The calculation runs on a schedule rather than on request, and it runs in two parts. An hourly job in the Explorer indexer fetches Bitcoin blocks it has not seen yet, classifies each one, and stores it. A daily job then counts the stored rows over the window, computes the three values, and writes one snapshot per day keyed by date. The `/api/v3/stats` endpoint reads the most recent snapshot, so a request never touches Bitcoin at all and response times stay flat.

Splitting the work that way is what decouples the published metric from provider availability. The daily job reads a database table, not a Bitcoin endpoint, so an outage delays ingestion instead of costing a day of statistics. It also means the block table can answer questions the snapshot does not, such as the merge-mining share on a particular day, without fetching anything.

The daily cadence is deliberate. The metric summarises a seven day window, so it barely moves within a single day, and a faster refresh would recount the same thousand rows to produce the same numbers. One date-keyed row per day also builds a clean historical series for charts, and a re-run on the same day updates that row in place instead of duplicating it.

Three behaviours follow from that design, and they matter if you consume the endpoint.

- The Bitcoin metrics trail the Bitcoin tip, by up to a day from the refresh cadence and by a further hundred blocks by design. The Explorer only indexes blocks buried deep enough that they can no longer be reorganised out, because it never revisits a height once stored. Against a seven day average that lag is not visible.
- The three fields are `null` until the first snapshot exists. Handle that case rather than assuming a number is always present.
- A snapshot only gets written when at least 98% of the window's heights are stored. Below that the job refuses and leaves the previous snapshot in place, rather than publishing a share divided by a materially smaller denominator. Between 98% and 100% it publishes over the heights it has and records the count, which is why the stored block count is worth reading alongside the range.

## Reproduce the calculation yourself

Four checks take you from the published numbers back to raw chain data.

### 1. Read the published metrics

Start from the endpoint itself.

```bash
curl -s https://be.explorer.rootstock.io/api/v3/stats | jq '.data'
```

### 2. Check one Bitcoin block for the tag

The check needs the block's coinbase transaction, and there are two ways to fetch it. The main path uses a Bitcoin RPC provider; a public REST API also works if you have no provider at hand.

#### With a Bitcoin RPC provider

Any endpoint that speaks the standard Bitcoin JSON-RPC interface works: a hosted provider of your choice or your own node. Replace the placeholder URL with your provider's endpoint.

```bash
RPC="https://your-bitcoin-rpc-provider.example/YOUR_API_KEY"

HASH=$(curl -s -X POST "$RPC" -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"getblockhash","params":[955501]}' | jq -r '.result')
TXID=$(curl -s -X POST "$RPC" -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"getblock","params":["'"$HASH"'"]}' | jq -r '.result.tx[0]')
curl -s -X POST "$RPC" -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"getrawtransaction","params":["'"$TXID"'", true, "'"$HASH"'"]}' \
  | jq -r '.result.vin[].coinbase, .result.vout[].scriptPubKey.hex' \
  | grep -i 52534b424c4f434b3a
```

The three calls resolve the height to a block hash, take the block's first transaction, which is always the coinbase, and decode it. Passing the block hash as the third `getrawtransaction` argument lets the node locate the transaction without a full transaction index, so the command works on any provider. The `jq` filter prints the coinbase input script and every output script, and `grep` keeps the ones carrying the tag.

#### With a public REST API

The same check runs against a public Esplora compatible API such as mempool.space, with no key required.

```bash
HASH=$(curl -s https://mempool.space/api/block-height/955501)
curl -s "https://mempool.space/api/block/$HASH/txs/0" \
  | jq -r '.[0].vin[].scriptsig, .[0].vout[].scriptpubkey' \
  | grep -i 52534b424c4f434b3a
```

Both paths print the same single line of hex, the `OP_RETURN` script shown in step 1 without the spacing.

```
6a2952534b424c4f434b3a410ac1c4b7fb2330ffa2b6434afb44429b702189371c4158d102fe13008922b6
```

### 3. Audit the share across a window

Repeat the check across a range of recent heights and divide the number of matches by the number of blocks you checked. Pace your requests: public APIs rate-limit bulk access and hosted provider plans meter request volume, and each height costs three calls. The Explorer's own job holds a sustained 25 requests per second and honours `Retry-After`, a rate established by measurement rather than by a short benchmark, because burst capacity hides a provider's real limit for the first few seconds.

### 4. Close the loop from the Rootstock side

The diagram in step 1 shows that the payload's last four bytes are a block number, and `0x008922b6` is 8,987,318. Ask a Rootstock node for that block.

```bash
curl -s -X POST https://public-node.rsk.co -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_getBlockByNumber","params":["0x8922b6",false]}' \
  | jq -r '.result.hashForMergedMining'
```

It returns `0x410ac1c4...8922b6`, the exact 32 bytes sitting in the Bitcoin coinbase. The same response carries `bitcoinMergedMiningHeader`, the 80 byte Bitcoin block header whose proof of work seals this Rootstock block. Hash that header twice with SHA-256, reverse the byte order (explorers display block hashes big-endian), and you get Bitcoin block 955,501's hash, which closes the loop: one unit of work, committed on both chains, checkable in both directions.

:::info[Reading the numbers]
The figures on this page were measured over Bitcoin blocks 958,563 to 959,562, and the single-block walkthrough uses block 955,501. Difficulty, hashrate, and the merge-mining share all drift, so treat every number here as a worked example rather than the current state of the network. Read the endpoint for live values.
:::

## Details worth knowing

A few properties of this metric are easy to misread.

- **The tag is a commitment, not a full proof.** Its presence shows that a miner claimed a Rootstock block. Verifying the claim means checking the Merkle proof that links the two blocks, which Rootstock nodes do during consensus. For a participation share, the tag is the correct lightweight signal.
- **Testnet reads zero, and that is accurate.** Almost no miners embed the tag on Bitcoin testnet, so `mergeMiningPercentage` there is legitimately 0 and `rootstockSecuredHashrate` follows it to 0. The `bitcoinHashrate` value stays non-zero, because testnet still has real hash power behind it.
- **The share is not a security guarantee on its own.** It measures how much hash power participates. The [merged mining reference](/node-operators/merged-mining/reference/) covers the growth phases and the additional protections against double-spend attacks.
- **Precision is limited by the inputs.** The Bitcoin hashrate is an estimate inferred from how fast blocks arrived, however many digits it is reported with, and the secured hashrate inherits that. Comparing two readings to the last digit is not meaningful.
