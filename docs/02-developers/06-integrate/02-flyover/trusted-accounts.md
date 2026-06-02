---
sidebar_label: Trusted Accounts feature
sidebar_position: 240
title: Flyover SDK - Trusted Accounts
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg, automation]
description: Trusted accounts allowed to perform automated PegIn and PegOut operations.
---

:::info[Note]
If you wish to suggest changes on this document, please open a PR on the [Liquidity Provider Server Repository](https://github.com/rsksmart/liquidity-provider-server.git)
:::


## Summary
The **Liquidity Provider Trusted Accounts** feature extends the existing **Liquidity Provider Server (LPS)** and **FlyoverSDK** to allow Liquidity Providers (LPs) to configure a set of trusted Rootstock accounts that can bypass certain validation checks — such as the **reCAPTCHA** verification — during **PegIn** or **PegOut** operations.

This functionality is part of the **Flyover Protocol**, aimed at enabling automated integrations for partners and liquidity providers who operate frequently.

## Architecture and Design

### Components
This feature adds functionality to two existing components:
1. **Liquidity Provider Server (LPS)** – Enables LPs to configure and manage trusted accounts with BTC/RBTC locking caps.
2. **FlyoverSDK** – Provides new methods that allow integrators to sign and submit quotes authenticated by trusted accounts.

### Design Notes
- Backward compatible with existing FlyoverSDK versions `>= v1.7.0` and LPS versions `>= v2.3.0`.
- The account paying for the operation doesn’t need to be the same as the whitelisted account, but a valid signature of the quote hash from the trusted account must be provided.

## Setup and Configuration

### Environment Requirements
- **FlyoverSDK:** `>= v1.70`
- **LPS:** `>= v2.3.0`

### Configuration
- The LP must configure authorized trusted accounts in their **LPS instance**.
- No additional `.env` variables or feature flags are required.

## API / Interface Details

### FlyoverSDK Methods

- `async acceptAuthenticatedQuote(quote: Quote, signature: string): Promise<AcceptedQuote>`: Accepts a PegIn quote authenticated by a trusted account’s signature.
- `async acceptAuthenticatedPegoutQuote(quote: PegoutQuote, signature: string): Promise<AcceptedPegoutQuote>`: Accepts a PegOut quote authenticated by a trusted account’s signature.
- `async signQuote(quote: Quote | PegoutQuote): Promise<string>`: Generates a valid signature for a given quote using the whitelisted Rootstock account.

### Input / Output
Same input and output as `acceptQuote` and `acceptPegoutQuote`.
The difference is that these methods require a **`signature`** parameter, obtained via:
- The `signQuote()` SDK method, or
- A manually created signature by the SDK integrator.

### Possible errors
Both error types are raised as **`FlyoverError`** instances:
| Error Scenario | Description |
|----------------|--------------|
| Invalid Signature | The provided signature does not match a whitelisted account. |
| Locking Cap Exceeded | The account exceeded its assigned BTC/RBTC locking cap. |

## Integration Guide

To integrate this feature:

1. Ensure you are using **FlyoverSDK >= v1.70**.
2. Obtain a whitelisted Rootstock account from your Liquidity Provider.
3. Use the SDK’s `signQuote` method to sign your quote hash.
4. Use the authenticated accept method (`acceptAuthenticatedQuote` or `acceptAuthenticatedPegoutQuote`) with the quote and signature.
5. The LP’s LPS instance will validate the signature against its trusted accounts configuration.

> 🔐 Only accounts whitelisted by an LP will be accepted.
> Each account has a configured BTC/RBTC locking cap that restricts usage volume.

### Authentication
Trust is based solely on account whitelisting and signature verification.

### Integration Entry Points
- Primary integration via **FlyoverSDK**
- No direct API calls required

## Testing

### Local Testing Setup
- Deploy a **local LPS instance**.
- Configure one or more trusted accounts.
- Test using the new SDK methods with valid and invalid signatures to validate expected behavior.

### Test Utilities
Example tests and automation demos can be found in:
🔗 [Flyover SDK Automation Demo](https://github.com/rsksmart/flyover-sdk/tree/main/utilities/pegin-pegout-automation-demo)

### Notes
Follow the documentation in the above repository for commands and setup steps.

## 🧾 Changelog
| Component | Version | Release Link |
|------------|----------|---------------|
| FlyoverSDK | v1.7.0 | [GitHub Release](https://github.com/rsksmart/flyover-sdk/releases/tag/v1.7.0) |
| LPS | v2.3.0 | [GitHub Release](https://github.com/rsksmart/liquidity-provider-server/releases/tag/v2.3.0) |


## 📦 Related Resources
- **Flyover SDK (npm):** [@rsksmart/flyover-sdk](https://www.npmjs.com/package/@rsksmart/flyover-sdk)
- **GitHub Repo:** [Flyover SDK](https://github.com/rsksmart/flyover-sdk)
