---
title: PowPeg and the security model
sidebar_position: 200
sidebar_label: Security model
tags: [Rootstock, security, powpeg, architecture, federation, 2-way peg]
description: "How the PowPeg fits Rootstock defense in depth, and where to read the full security model."
---

The [PowPeg](/concepts/foundations/powpeg/) is Rootstock's Bitcoin-native two-way peg. It locks BTC on Bitcoin and issues rBTC 1:1 on Rootstock (peg-in), and burns rBTC to release BTC (peg-out). This page summarizes PowPeg-specific security properties. For the full Rootstock security model (SSDLC, Coinspect, bug bounty, verification), see [Security at Rootstock](/concepts/foundations/security/).

## How the PowPeg is secured

Because Bitcoin does not support Turing-complete contracts or native opcodes to validate external SPV proofs, part of the two-way peg relies on an autonomous PowPeg system:

- The **Bridge** precompiled contract controls peg operations on Rootstock.
- **Pegnatories** each run a `powpeg-node` and a **PowHSM**.
- The PowHSM stores a private key share in a secure element and signs peg-outs only when Rootstock presents sufficient cumulative proof of work.

**No single pegnatory can control locked BTC or access the multi-sig private key in the PowHSM.** Not even a majority of pegnatories can release BTC without a valid Bridge command backed by enough cumulative work. Peg-out signing requires on the order of **4000** Rootstock confirmation blocks (approximately **100** Bitcoin blocks of cumulative work). Confirm live thresholds in Bridge and PowHSM docs when you integrate.

The federation currently signs as **5-of-9**, expanding toward **20** members. See [PowPeg member updates](/concepts/foundations/powpeg/member-updates/) for composition-change phases (vote, delay, migrate).

## Defense in depth

PowPeg security is one layer of Rootstock's broader model:

| Layer | What it does |
| --- | --- |
| Merged mining | Ties Rootstock consensus to Bitcoin hashpower (85%+) |
| Bridge contract | Builds peg-out transactions and enforces rules |
| PowHSM | Signs only work-backed commands |
| SSDLC + Coinspect | Continuous review of `rskj` and `powpeg-node` |
| Bug bounty + attestation | External research and public firmware proofs |

## Read next

- [Security at Rootstock](/concepts/foundations/security/): why Rootstock is secure, how it stays secure, and how to verify
- [Security reports](/concepts/foundations/security/#security-reports): audits and Coinspect index
- [PowPeg protocol](/concepts/foundations/powpeg/): peg-in / peg-out architecture
- [HSM firmware attestation](/concepts/foundations/powpeg/hsm-firmware-attestation/)
