---
sidebar_label: Getting Started
sidebar_position: 210
title: Getting Started as a Liquidity Provider
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

Liquidity Providers (LPs) interacts with the protocol to perform some management operations related to topics such as collateral, funds, fees management, configuration, etc through a Liquidity Provider Server (LPS). The LP does this operation through the Liquidity Provider Server (LPS), that's the reason why the LPS also has an API that the LP interacts with to perform various management operations.

In the Flyover Protocol, there are two three main Actors: 
1. The regular user (user), who is party interested in executing Peg-In/Peg-Out operations 
2. The Liquidity Provider (LP), who provides liquidity to speed up the operation for the user in exchange for a fee as a reward
3. The integrator who integrates the flyover SDK into their dapp/protocol. In order to do this, the user and the LP need to agree on the terms of the service (a Peg-In/Peg-Out Quote). This implies that the different LPs may offer different quotes, so the user needs to be able to interact with each LP to receive quote details and decide which one is going to be used for the operation.

> The user interacts with the Flyover Protocol through the Flyover SDK. This SDK fetches the list of the available LP from the liquidity bridge contract (LBC), this contract returns a list where each element has some information about the LP, among this information will be the URL of the liquidity provider server (LPS) instance of that LP so the user can communicate with it. This means that the LPS has an API that every user interacts with to do the quote agreement.

The LPS has two main APIs:
* User/Public API: This API is used by the user to interact with the LP to agree on a quote, the API can be accessed via the Flyover dApp. See [Using the Public API](#using-the-public-api)
* LP/Management API: This API is used by the LP to interact with the LPS to perform management operations. It can be accessed via `<LPS URL>/management`. See [LP Management](./management.md) Section

:::note

The Management UI and Public API share the same server, accessible through the same URL. However, the Management API requires authentication for access, while the Public API does not. While authentication is a security measure, it's still recommended to deploy the Management API behind a [Web Application Firewall (WAF)](https://en.wikipedia.org/wiki/Web_application_firewall) or Virtual Private Network (VPN) for added protection.

:::

:::info[Info]

API limitations can vary based on the specific infrastructure of each Liquidity Provider Server (LPS). 
The current implementation does not impose explicit rate limits.

:::

## Configuring the Liquidity Provider Server

A [Liquidity Provider Server (LPS)](https://github.com/rsksmart/liquidity-provider-server?tab=readme-ov-file) acts as a crucial component of the Flyover protocol by managing liquidity between the Bitcoin and Rootstock networks. Interacting directly with the [Liquidity Bridge Contract (LBC)](https://github.com/rsksmart/liquidity-bridge-contract), the LP server fulfills requests for token swaps by holding reserves of both BTC and RBTC. It executes complex operations such as collateral management, fund transfers, and fee adjustments.

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
The LPS performs operations on behalf of the LP during the process of the protocol, which means that it requires access to both LP's Bitcoin and Rootstock wallets. To be more specific, it requires access to the Rootstock wallet of the LP and by having it, it also has access to the BTC wallet associated with that Rootstock wallet.

### Initial Bitcoin wallet funding recommendation
The number of UTXOs available in the Bitcoin wallet of the LP is directly related with the number of PegOuts that the LP can perform in the same block. This is why it is recommended to make the initial funding of the Bitcoin wallet with multiple transactions so there are many UTXOs available for the server to operate. This only applies to the initial funding, because the refunds after every PegOut will generate more UTXOs for the server to use.  

### LP Refunds
Since the Flyover Protocol is a repayment protocol, after spending the funds on behalf of the user, the LP receives a refund for the money spent plus a fee for the service. However, there are some specific conditions in order to ensure the correct behavior of all the involved parties, these conditions are:

1. Pegin: The user needs to wait for N Bitcoin blocks before the LP spends the agreed RBTC where N is defined during the quote terms negotiation based on the value of the quote. The LP needs to wait 100 Bitcoin blocks after the user's BTC transaction to the Powpeg before being able to claim the refund.
2. Pegout: The user needs to wait for N Rootstock blocks before the LP spends the agreed BTC where N is defined during the quote terms negotiation based on the value of the quote. The LP needs to wait for N Bitcoin blocks after making the transaction to the user before being able to claim the refund from the Liquidity Bridge Contract. Where N is defined during the quote terms negotiation based on the value of the quote.

### Wallet Integration
To manage wallets effectively, the LPS requires secure access to the LP's Rootstock wallet. This Rootstock wallet is inherently linked to a Bitcoin (BTC) wallet.
The LPS currently offers the following options for managing access to the Rootstock wallet; the preferred integration method is determined by the `WALLET` environment variable setting.

#### Run LPS using local wallet integration
With this option, the LPS needs access to the wallet's [keystore file](https://ethereum.org/en/glossary/#keystore) and the password to decrypt it. There are multiple ways to provide this information to the LPS, which can be checked in the [secret management section](#secrets-management). With this, the LPS would keep the wallet in memory (with the proper security considerations to prevent the exposure of sensitive data stored in memory) and sign the Rootstock and Bitcoin transactions. It's important to note that with this approach, the knowledge of the private key is inside the organization running the LPS. 

Regarding the LP, through the Management UI the LPS allows the LP to perform all the necessary operations related to the protocol, and regarding the wallet itself, the LPS informs both RSK and BTC addresses to which the LP should send funds in order to add liquidity to the wallets.

If the LP wants to perform any additional operations non-related to Flyover protocol in the Rootstock network, then he needs to get the keystore file and password and import the account to a wallet of its choice such as MetaMask (in the case of MetaMask by [following these steps](https://support.metamask.io/managing-my-wallet/accounts-and-addresses/how-to-import-an-account/)). In the case that the LP wants to perform any additional operations non-related to Flyover protocol in the BTC network then he needs to export the private key of the account (in the case of MetaMask by [following these steps](https://support.metamask.io/managing-my-wallet/secret-recovery-phrase-and-private-keys/how-to-export-an-accounts-private-key/)) and convert it to wallet import format (WIF) and then import it to any wallet of its choice as explained in [Rootstock developer portal](https://dev.rootstock.io/rsk/rbtc/conversion/networks/).

See more information in [how to run the LPS using local wallet integration](https://github.com/rsksmart/liquidity-provider-server/blob/QA-Test/docs/LP-Management.md#run-lps-using-local-wallet-integration).

> Note: The LPS does not have direct access to the BTC wallet; it relies on the Rootstock wallet's connection to its associated BTC address.

## Secrets Management

Using the wallet management option involves working with [secrets](https://github.com/rsksmart/liquidity-provider-server/blob/master/docs/LP-Management.md#secrets-management), even if those secrets are the private keys or not. This section explains all the ways that the LPS has to be provided with those secrets.
The option to select of the following can be set through the value of the `SECRET_SRC` environment variable:

### AWS Secrets Manager
In this option the LPS will get the secrets from [AWS secrets manager service](https://aws.amazon.com/secrets-manager/), this means that the LPS will need to be provided with the AWS keys in any of the ways that the AWS client allows (through a file in home directory, environment variables, etc). In this case, the LPS should receive the name of the secrets to use through the environment variables (that are listed below). This is the recommended option for production environments. 
1. KEY_SECRET
2. PASSWORD_SECRET

### Environment (Not recommended)
In this option the LPS will get the required secrets from the environment (this might include the path to existing files in the filesystem). This option is not recommended to be used in production environments as it was developed only for testing purposes. The env vars that need to be set if this option is used are the following:
1. KEYSTORE_FILE
2. KEYSTORE_PWD

### Technical clarifications
Regardless of the option chosen by the LP to handle the wallet management, the LPS will need to create the following watch-only wallets in the BTC node. The LPS does this creation by itself, so we advise ensuring that the node doesn't have other wallets with the same names to avoid errors on the startup:
* `rsk-wallet`: this wallet will be used to track the UTXOs available to spend with the LP wallet. It requires a rescan of the network, and it only imports the LP public key on the first start of the LPS, after that, it just validates that the wallet is created and the public key is imported
* `pegin-watchonly-wallet`: this wallet will be used to track the deposit addresses of the accepted PegIn operations. It doesn't require rescan, and it imports a new address every time a PegIn is accepted.

> The LPS expects this watch-only wallets to be unencrypted, there aren't any security implications in this since they handle public information only. 
> Regarding the secrets themselves, it is up to the LP to decide the way how those secrets will be fetched for the wallet integration. See [how to manage secrets](https://github.com/rsksmart/liquidity-provider-server/blob/QA-Test/docs/LP-Management.md#secrets-management).

:::danger[Troubleshooting]

Encountering difficulties with the SDK setup, LPS configuration, or specific Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.

:::