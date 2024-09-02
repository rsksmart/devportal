---
sidebar_label: Getting Started
sidebar_position: 210
title: Getting Started as a Liquidity Provider
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

Liquidity Providers (LPs) interact with the protocol through a Liquidity Provider Server (LPS). The LPS interacts with the Flyover protocol via an API to handle operations such as collateral management, fund deposits and withdrawals, fee adjustments, and configuration changes.

The LPS has two main APIs:
* User/Public API: This API is used by the user to interact with the LP to agree on a quote, the API can be accessed via the Flyover dApp.
* LP/Management API: This API is used by the LP to interact with the LPS to perform management operations. It can be accessed via `<LPS URL>/management`.

:::note

The Management UI and Public API share the same server, accessible through the same URL. However, the Management API requires authentication for access, while the Public API does not. While authentication is a security measure, it's still recommended to deploy the Management API behind a [Web Application Firewall (WAF)](https://en.wikipedia.org/wiki/Web_application_firewall) or Virtual Private Network (VPN) for added protection.

:::

:::info[Info]

API limitations can vary based on the specific infrastructure of each Liquidity Provider Server (LPS). 
The current implementation does not impose explicit rate limits.

:::

## Configuring the Liquidity Provider Server
A Liquidity Provider Server (LPS) acts as a crucial component of the Flyover protocol by managing liquidity between the Bitcoin and Rootstock networks. Interacting directly with the [Liquidity Bridge Contract (LBC)](https://github.com/rsksmart/liquidity-bridge-contract), the LP server fulfills requests for token swaps by holding reserves of both BTC and RBTC. It executes complex operations such as collateral management, fund transfers, and fee adjustments.

By default, the Management API is disabled, and it can be enabled only by setting the `ENABLE_MANAGEMENT_API` environment variable to `true`. This is a security measure to ensure that the API will only be accessible if it is explicitly enabled by the LP (or the person setting up the environment). 

:::warning[Warning]

If the `ENABLE_MANAGEMENT_API` environment variable is set to `true`, it is the responsibility of the LP and the individual setting up the environment to ensure that the API is properly secured.

:::

See [How to Configure the LPS](https://github.com/rsksmart/liquidity-provider-server/tree/master?tab=readme-ov-file#liquidity-provider-server).

### Using the Public API

Parameters:
* PUBLIC: accessible by anyone 
* PRIVATE: only accessible by LP 
* ANY: is up to the administrator to set it as private or public

See the [full details of the endpoints](https://github.com/rsksmart/liquidity-provider-server/blob/QA-Test/OpenApi.yml) and how to call them.

### Accessing the Management UI
The LPS provides a Management UI out of the box to facilitate the interaction with the Management API. To go to that UI you just need to go to `<LPS URL>/management` page in your browser.


In order to interact with this API, the LP needs to be authenticated. The authentication mechanism consists in user/password credentials. There is a default credentials pair which is admin as username and a random password that the LPS will generate on its startup in the file management_password.txt inside the temporal directory of your OS. E.g.: `/tmp/management_password.txt`.


The first time that the LP enters the Management UI he will be asked to provide the default credentials and set the new ones to use from that point to the future. After logging in, the LP will have access to all the operations of the Management API.

:::info[Info]

⚠️ Remember that if `ENABLE_MANAGEMENT_API` is set to `false`, the Management UI won't be accessible.

:::

## Wallet Management
To manage wallets effectively, the LPS requires secure access to the LP's Rootstock wallet. This Rootstock wallet is inherently linked to a Bitcoin (BTC) wallet.
The LPS currently offers the following options for managing access to the Rootstock wallet; the preferred integration method is determined by the WALLET environment variable setting.

* Local Wallet Integration: With this option, the LPS needs access to the wallet's [keystore file](https://ethereum.org/en/glossary/#keystore) and the password to decrypt it. There are multiple ways to provide this information to the LPS, which can be checked in the [secret management section](https://github.com/rsksmart/liquidity-provider-server/blob/master/docs/LP-Management.md#secrets-management). With this, the LPS would keep the wallet in memory (with the proper security considerations to prevent the exposure of sensitive data stored in memory) and sign the Rootstock and Bitcoin transactions. It's important to note that with this approach, the knowledge of the private key is inside the organization running the LPS. Please see [how to run the LPS using local wallet integration](https://github.com/rsksmart/liquidity-provider-server/blob/QA-Test/docs/LP-Management.md#run-lps-using-local-wallet-integration).

> Note: The LPS does not have direct access to the BTC wallet; it relies on the Rootstock wallet's connection to its associated BTC address.

### Technical clarifications
Regardless of the option chosen by the LP to handle the wallet management, the LPS will need to create the following watch-only wallets in the BTC node. The LPS does this creation by itself, so we advise ensuring that the node doesn't have other wallets with the same names to avoid errors on the startup:
* rsk-wallet: this wallet will be used to track the UTXOs available to spend with the LP wallet. It requires a rescan of the network, and it only imports the LP public key on the first start of the LPS, after that, it just validates that the wallet is created and the public key is imported
* pegin-watchonly-wallet: this wallet will be used to track the deposit addresses of the accepted PegIn operations. It doesn't require rescan, and it imports a new address every time a PegIn is accepted.

> The LPS expects this watch-only wallets to be unencrypted, there aren't any security implications in this since they handle public information only. 
> Regarding the secrets themselves, it is up to the LP to decide the way how those secrets will be fetched for the wallet integration. See [how to manage secrets](https://github.com/rsksmart/liquidity-provider-server/blob/QA-Test/docs/LP-Management.md#secrets-management).

:::danger[Troubleshooting]

Encountering difficulties with the SDK setup, LPS configuration, or specific Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.

:::