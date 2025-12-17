---
sidebar_position: 100
title: Institutional Integrations
sidebar_label: Institutional Integrations
tags: [rsk, rootstock, solutions, guides, tutorials, institutions]
description: "White-label infrastructure for partners to integrate Bitcoin yield products."
---

This section provides the architectural blueprints for **Distribution Partners** (Wallets, Exchanges, Custodians) looking to integrate Bitcoin yield products into their user interface.

Rootstock offers a **White-Label Vault Infrastructure**. As a partner, you integrate the technology, while a dedicated Fund Manager handles the operational complexity (KYC, Compliance, and Asset Management).

## Integration Model

We offer a streamlined path for partners to "switch on" yield for their users.

<CardsGrid>
  <CardsGridItem
    title="Distribution Partners"
    subtitle="Wallets & Custodians"
    color="green"
    description="Integrate the Vault SDK directly into your UI to offer white-labeled yield products to your customers."
    linkHref="/cookbook/institutions/integrate-vault/"
    linkTitle="View Integration Playbook"
  />
</CardsGrid>

## The Yield Vaults

Our infrastructure supports two primary engines. These are designed as white-label products that partners can surface to their end-users.

### 1. rBTC Yield Vault
A secure yield engine for Bitcoin holders.
* **Strategy:** Generates organic yield through protocol-native lending and borrowing demand.
* **Infrastructure:** The Vault smart contracts handle the accounting and yield distribution.
* **Compliance:** Managed by the Fund Manager (middleman) who oversees KYC and regulatory requirements.

### 2. USDRIF Yield Vault
A stablecoin yield engine for dollar-denominated returns.
* **Strategy:** Captures yield from the demand for USDRIF borrowing and ecosystem utility.
* **Assets:** Powered by **USDRIF** (RIF-backed stablecoin).

## Partner Resources

Technical guides for integrating the white-label infrastructure.

* [**Partner Integration Playbook**](/cookbook/institutions/integrate-vault/) - *Best practices for Wallets and Custodians integrating the SDK.*
* [**Vaults SDK Reference**](/cookbook/developers/vaults-sdk/) - *Full technical documentation (Developer Hub).*

## Security & Infrastructure

* [**The PowPeg Security Model**](/concepts/powpeg/) - *Secured by over 60% of Bitcoin's hashrate.*
* [**Audits & Bug Bounties**](/resources/security/audits/) - *Comprehensive reports for the core protocols.*

:::info Partner Onboarding
Access to the production Vault Infrastructure requires onboarding with the Fund Manager for compliance purposes.
[**Contact Solutions Team**](https://rootstock.io/contact/) to begin the process.
:::