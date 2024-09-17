---
sidebar_label: PowPeg vs RBTC Flyover
sidebar_position: 105
title: Comparison of PowPeg and RBTC Flyover
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The PowPeg App is a user-friendly interface for the conversion of BTC to RBTC and vice versa. It is secured by the powpeg protocol, which is a unique 2-way peg system that allows users to natively transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice versa, creating a token called RBTC that is pegged to the value of Bitcoin.
---

Here's a detailed comparison of the PowPeg vs RBTC Flyover.

|  | PowPeg | Flyover (Includes PowPeg) |
| --- | --- | --- |
| Network (and Coin) | Bitcoin (BTC) and Rootstock (RBTC) | Bitcoin (BTC) and Rootstock (RBTC) |
| Key Differentiators | Native for Rootstock (as a Bitcoin sidechain) | Significantly Faster than the PowPeg |
| Core Concept | Federated 2 Way Peg | Liquidity Provider (LP) Service + Federated 2 Way Peg (i.e. the PowPeg) |
| Trust | Requires trust in PowPeg | Requires trust in PowPeg. LPs are trustless |
| Time to transfer value to Rootstock | 100 Bitcoin Blocks (about 17 hours) | ~20 minutes <sup>1</sup> |
| Time for value transfer from Rootstock | 4000 Rootstock Blocks (about 34 hours) | ~15 minutes <sup>2</sup> |
|  Cost Structure | No service fees, Only blockchain TX fees on Bitcoin (for peg-in) and Rootstock (for peg-out) | LP provider fees (0.0001 RBTC) <sup>3</sup> + transaction fees on Rootstock + Bitcoin TX fee  |
| Minimum Limit for value transfer | 0.005 BTC for peg in and 0.004 RBTC for peg-out | Same as PowPeg for peg in (BTC). Peg out min (RBTC) is configurable by the LP (set at 0.004 RBTC initially) |
| Max Limit for value transfer | None | 0.1 BTC and 0.1 RBTC <sup>4</sup> |

:::note[Notes]
1. Based on the number of Bitcoin block confirmations configured by the LP (currently set at 2 Bitcoin block confirmations for amounts `<= 0.1 BTC`). Bitcoin blocks can take longer to confirm.
2. Based on the number of Rootstock block confirmations configured by the LP (currently set at 10 Rootstock confirmations for amounts `<= 0.1 RBTC`) + 1 Bitcoin block confirmation.
3. An LP can set their own fees.  The initial LP In the PowPeg app has set its provider fee at `0.0001` RBTC so that the LP covers network fees when receiving and rebalancing funds from PowPeg.
4. There is no technical limit for transfers.  It depends on the available liquidity and limitations set by the LP. The initial LP in the PowPeg app, has set the max transfer limits to `0.1 BTC/RBTC`.
:::