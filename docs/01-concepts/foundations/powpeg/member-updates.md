---
sidebar_position: 100
title: PowPeg member updates
sidebar_label: Member updates
tags: [rootstock, powpeg, federation, pegnatory]
description: "How PowPeg composition changes work: voting, delay, and funds migration."
---

The PowPeg is governed by a written protocol that establishes when it is possible or required to add or remove a member. For the full Rootstock security model, see [Security at Rootstock](/concepts/foundations/security/).

## Current composition

The federation currently operates as a **5-of-9** multi-signature (five signatures required). Public operators include independent entities across mining, custody, DeFi, and infrastructure. The roadmap expands toward **20** members after upcoming network upgrades, with longer-term plans for a larger set. Confirm the live signer set on the [PowPeg product page](https://rootstock.io/powpeg/) and via [HSM firmware attestation](/concepts/foundations/powpeg/hsm-firmware-attestation/).

Pegnatories are awarded a portion of Rootstock transaction fees to cover hardware and maintenance costs. Their operational duty is to keep the PowHSM and PowPeg node online with high uptime. They do not extract multi-sig private keys from the PowHSM.

## Composition change phases

If the conditions to change composition are met, a pegnatory can send a message to the Bridge contract to begin a PowPeg composition change. The change has three phases. All phases are automated and coordinated by the Bridge contract, so the process is open, public, and leaves a cryptographic audit trail.

1. **Voting period.** Each pegnatory can accept or reject the composition change. Only if the majority accepts does the next phase begin.
2. **Delay period.** A consensus-enforced delay of one week. The delay lets users peg out to Bitcoin if they do not trust the new composition.
3. **Funds migration.** The composition change activates and funds migrate from the old PowPeg multi-sig to the new one.

## Related

- [PowPeg protocol](/concepts/foundations/powpeg/)
- [Security at Rootstock](/concepts/foundations/security/)
- [HSM firmware attestation](/concepts/foundations/powpeg/hsm-firmware-attestation/)
