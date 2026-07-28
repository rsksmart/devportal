---
sidebar_position: 1
title: Security at Rootstock
sidebar_label: Security Model
tags: [rootstock, security, powpeg, audit, bug bounty]
description: "Why Rootstock is secure, how it stays secure, and how you can verify the security model yourself."
---

Institutions, developers, and investors rely on Rootstock as Bitcoin's financial infrastructure. Rootstock has operated on Bitcoin since 2018. It remains open source, independently audited, and continuously hardened. This page answers three questions: why Rootstock is secure, how it stays secure, and how you can verify that for yourself.

<div class="d-flex flex-wrap align-items-center mb-3">
  <Button size="sm" className="me-3" href="/concepts/foundations/security/#security-reports">View security reports</Button>
  &nbsp;
  <Button size="sm" href="https://immunefi.com/bug-bounty/rootstocklabs/information/">Bug bounty</Button>
</div>

:::tip[Protocol Information]

For protocol mechanics of peg-in and peg-out, see [PowPeg](/concepts/foundations/powpeg/). For merge-mining difficulty outcomes, see [Merged mining](/concepts/foundations/merged-mining/). For the platform layer and architecture map, see the [Rootstock Stack](/concepts/foundations/stack/).

:::

## Why is Rootstock secure?

Rootstock inherits its base security from Bitcoin while relying on multiple independent safeguards to secure its own protocol. Those safeguards reduce the chance that a failure in any one Rootstock component becomes a single point of compromise. An attacker targeting the peg or related components would have to defeat several of those controls together, not one at a time.

### Bitcoin-backed security

Through [merged mining](/concepts/foundations/merged-mining/), blocks are produced by the same miners that secure Bitcoin, at no extra cost to them. Over **85%** of Bitcoin's hash power currently secures Rootstock. This ties Rootstock block production, and bridge enforcement that depends on Rootstock confirmations, to Bitcoin's proof of work.

### Layered PowPeg architecture

The two-way peg between Bitcoin and Rootstock, the [PowPeg](/concepts/foundations/powpeg/), is a federated system rather than a single custodian:

- The native **Bridge** precompiled contract controls operations.
- Independent third parties (**pegnatories**) each run a `powpeg-node` and a **PowHSM**.
- The PowHSM is a tamper-resistant hardware device that holds a private key in the bridge multi-signature.
- It signs a peg-out only after the Rootstock chain presents sufficient cumulative proof of work.

BTC releases are authorized by Bitcoin's mining, not by the discretion of any operator. **No single pegnatory can control locked BTC or extract the multi-sig private key from the PowHSM.** Not even a majority of pegnatories can release BTC without a valid Bridge command backed by enough cumulative work.

The federation currently signs as **5-of-9**, with a roadmap to expand toward **20** members after upcoming network upgrades. Composition changes follow an on-chain process described in [PowPeg member updates](/concepts/foundations/powpeg/member-updates/).

Peg-out signing requires Bridge commands backed by on the order of **4000** Rootstock confirmation blocks, with cumulative proof of work currently equivalent to approximately **100** Bitcoin blocks. Exact thresholds are enforced by consensus and PowHSM firmware. Confirm current values in the Bridge and PowHSM documentation when you integrate.

### Defense in depth

No single safeguard is load-bearing. Independent layers reinforce one another:

| Layer | Role |
| --- | --- |
| Bitcoin hashpower | Secures Rootstock consensus via merged mining |
| Multi-signature bridge | Distributes key shares across pegnatories |
| PowHSM hardware | Holds keys in a secure element; signs only valid commands |
| Bridge contract logic | Builds peg-out transactions and enforces rules on-chain |
| Monitoring | Detects anomalies such as attempts to revert transactions |

## How does Rootstock stay secure?

Those security properties are the output. What sustains them is the system that produces and maintains the code: security embedded across the development lifecycle, validated by an independent partner, and reinforced continuously after code ships.

### Secure development lifecycle

Rootstock follows a secure software development lifecycle (SSDLC). Security is integrated into every phase of development rather than treated as a checkpoint before release. This maps to frameworks such as NIST SSDF (SP 800-218), OWASP SAMM, and the Microsoft Security Development Lifecycle. Vulnerabilities are surfaced early, when they are cheaper and safer to fix, and fewer latent risks reach production.

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">Security by design</Accordion.Header>
    <Accordion.Body>

Security involvement begins before production code exists. When the RootstockLabs Research and Incubation team builds a proof of concept or MVP that may land on the Rootstock blockchain, the security team reviews it while the design is still evolving. When that work is handed to development, security reviews the final proposal. Protocol-level changes proposed as RSKIPs are reviewed as part of the proposal process. By the time a change reaches the development pipeline, security has already weighed in on both the concept and the proposal.

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">Code reviews</Accordion.Header>
    <Accordion.Body>

Every pull request merged into a release-candidate or default branch of the core codebases passes at least three independent reviews:

- at least one developer peer
- the RootstockLabs security team
- Coinspect, an independent external security firm

This applies to `rskj` (the node implementation) and `powpeg-node` (the bridge software run by pegnatories). It applies uniformly to features, bug fixes, minor improvements, and technical-debt paydown. Reviewing every change as it lands is stronger than relying only on periodic point-in-time audits: nothing merges unreviewed, feedback arrives while the author still has full context, and remediation stays at its lowest cost.

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Supply-chain integrity</Accordion.Header>
    <Accordion.Body>

All projects run the [OpenSSF Scorecard](https://securityscorecards.dev/), an open-source tool, maintained by the Open Source Security Foundation, that grades a repository against security best practices, including, among other checks, whether code review is required before merge, whether branch protections are enforced, and whether CI workflows follow least-privilege and dependency-pinning practices. The check runs on a schedule and whenever a branch-protection rule changes, and each repository publishes its current score as a Scorecard badge in its README, so a third party can independently confirm that the review controls described above are actually enforced.

The repositories also run CodeQL static analysis and automated dependency review on incoming changes. Both repositories produce reproducible builds so a released binary can be checked against its source.

    </Accordion.Body>
  </Accordion.Item>
</Accordion>

### Independent validation

Independent external review is a permanent part of the model, not an occasional engagement.

#### Coinspect

[Coinspect](https://www.coinspect.com/), an independent blockchain security company, has worked with RootstockLabs since 2017. Early on they helped establish the security function. As the internal team matured, Coinspect became an organizationally independent partner integrated into day-to-day work. Their responsibilities include:

- co-review and approval of every PR merged to release-candidate and default branches of `rskj` and `powpeg-node`
- security design reviews and feature proposal assessment
- collaboration on bug bounty triage
- independent quarterly security reports published in the [security repository](https://github.com/rsksmart/security)

#### PowHSM

PowHSM firmware follows a more conservative process. Each release candidate is reviewed by the RootstockLabs security team. Every major release additionally receives a dedicated external audit. Between major releases, changes are typically bug fixes and maintenance that do not touch the critical components that guard bridge funds. Those parts change rarely and deliberately, so external scrutiny concentrates on full audits of major releases.

#### External audits

Independent audits by specialist firms assess Rootstock infrastructure over time. These sit on top of the continuous review gate. Published reports are listed in [Security reports](#security-reports) and in the [security repository](https://github.com/rsksmart/security).

### Continuous security

Shipping code is the start of the security lifecycle, not the end.

#### Bug bounty

RootstockLabs has run a public bug bounty program since 2018, currently on [Immunefi](https://immunefi.com/bug-bounty/rootstocklabs/information/). To date the program has paid out more than US$150,000 in rewards.

| Asset class | Top reward (Critical) |
| --- | --- |
| Blockchain/DLT: PowHSM firmware | up to US$200,000 |
| Blockchain/DLT: `powpeg-node` / `rskj` | up to US$50,000 |
| Smart contracts | up to US$100,000 |
| Websites and applications | up to US$10,000 |

The program is triaged by Immunefi, requires a working proof of concept for every submission, requires KYC for payout, and pays rewards in USDC. The highest tier is reserved for PowHSM firmware. Full scope and rules are on the Immunefi program page.

#### Continuous improvement

Beyond the bounty, the security team hardens the chain, the bridge, and user funds: participating in feature design and integrating security tooling where the return justifies it. Security is an ongoing engineering investment.

## Verification

Security claims should be independently verifiable. Use the resources below to check open source code, Scorecard badges, bug bounty scope, and PowHSM firmware attestation.

<br />

<CardsGrid>
  <CardsGridItem
    title="Security repository"
    subtitle="audits"
    color="orange"
    description="Security docs, disclosure policy, audit reports, and quarterly Coinspect reports."
    linkHref="/concepts/foundations/security/#security-reports"
    linkTitle="View reports"
  />
  <CardsGridItem
    title="Immunefi bug bounty"
    subtitle="rewards"
    color="pink"
    description="Program scope, rules, and critical reward tiers for RootstockLabs assets."
    linkHref="https://immunefi.com/bug-bounty/rootstocklabs/information/"
    linkTitle="View bounty"
  />
  <CardsGridItem
    title="rskj Scorecard"
    subtitle="OpenSSF"
    color="green"
    description="Open source node implementation with OpenSSF Scorecard badge and review controls."
    linkHref="https://github.com/rsksmart/rskj"
    linkTitle="View rskj"
  />
  <CardsGridItem
    title="powpeg-node Scorecard"
    subtitle="OpenSSF"
    color="cyan"
    description="Bridge software run by pegnatories, with Scorecard badge and reproducible builds."
    linkHref="https://github.com/rsksmart/powpeg-node"
    linkTitle="View powpeg-node"
  />
  <CardsGridItem
    title="PowHSM attestation"
    subtitle="firmware"
    color="purple"
    description="Public firmware attestation for PowHSM devices used in the PowPeg."
    linkHref="/concepts/foundations/powpeg/hsm-firmware-attestation/"
    linkTitle="Read attestation"
  />
  <CardsGridItem
    title="PowPeg protocol"
    subtitle="bridge"
    color="green"
    description="Peg-in and peg-out architecture, federation mechanics, and defense in depth."
    linkHref="/concepts/foundations/powpeg/"
    linkTitle="Read PowPeg"
  />
</CardsGrid>

### Security reports

Published audits, Coinspect quarterly reports, and disclosure records live in the official security repository. Portal pages for individual Coinspect quarterly reports will be added here when Marketing and Security hand over the packages.

:::note[Source of truth]

Until those portal pages ship, treat [github.com/rsksmart/security](https://github.com/rsksmart/security) as the source of truth for audits, disclosures, and Coinspect reports.

:::

<Button size="sm" href="https://github.com/rsksmart/security" align="left">Browse security reports</Button>

## Related reading

- [PowPeg protocol](/concepts/foundations/powpeg/)
- [Merged mining](/concepts/foundations/merged-mining/)
- [Rootstock Stack](/concepts/foundations/stack/)
- [Technology overview](https://rootstock.io/technology/)
