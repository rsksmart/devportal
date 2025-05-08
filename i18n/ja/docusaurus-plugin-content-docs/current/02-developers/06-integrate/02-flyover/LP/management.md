---
sidebar_label: LP Management
sidebar_position: 220
title: Liquidity Provider (LP) Management
tags:
  - rsk
  - rootstock
  - rif
  - flyover
  - integrate
  - integration guide
  - rbtc
  - powpeg
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

The LP Management UI offers a user-friendly interface for Liquidity Providers to efficiently manage their Liquidity Provider Server (LPS) instances.

Key operations include:

- Depositing funds: To deposit funds into your LPS instance, simply transfer the desired amount of Bitcoin (BTC) or Rootstock Bitcoin (RBTC) to the designated wallet address associated with your LPS. The server will automatically process the deposit.
- Managing collaterals: The Management UI enables LPs to view and increase the amount of RBTC collateral locked in the smart contract.
- Fee adjustments: To adjust the fees earned for peg-in or peg-out transactions, navigate to the "Peg in" or "Peg out" tab within the LP Management UI. Modify the `callFee` field to set your desired fee rate. All subsequent quotes will reflect the updated fee.
- Terms of the quote negotiation: The LP Management UI provides a way for LPs to modify various parameters that influence quote terms, including required confirmations, expiration time, and other relevant factors.

:::info[Info]
Withdrawals via the Management UI are currently unavailable. LPs can only withdraw funds by interacting directly with the smart contract.
:::

## LPS Architecture

The Flyover Protocol involves two primary parties: Users and Liquidity Providers (LPs). Users seek to perform Peg-In or Peg-out operations, while LPs offer liquidity to facilitate these transactions in exchange for fees. To initiate a transaction, users request quotes from multiple LPs, each proposing different terms and fees. Users then select the most favorable quote and proceed with the chosen LP.

![LPS Architecture](/img/developers/flyover/lps-architecture.png)

- Users interact with the Flyover Protocol through the Flyover SDK.
- The SDK retrieves a list of available Liquidity Providers (LPs) from the Liquidity Bridge Contract (LBC). The LBC returns a list where each element has some information about the LP, among this information will be the URL of the liquidity provider server (LPS) instance of that LP.
- Users then communicate directly with LPs through their respective LPS APIs to obtain quotes and finalize transactions.

Taking a closer look:

![LPS ZOOM](/img/developers/flyover/lps_zoom.png)

:::info\[Info]

The fact that LPS API is divided in a public one and a private one implies that the Management API has some security requirements that need to be addressed in order to ensure that it will be only used by the LP. Some of these measures are provided out of the box by the LPS but some others require additional configuration for the environment where the LPS will run.

:::

:::danger\[Troubleshooting]

Encountering difficulties with the SDK setup, LPS configuration, or specific Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.

:::