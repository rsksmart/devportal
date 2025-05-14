---
sidebar_label: LP Management
sidebar_position: 220
title: Liquidity Provider (LP) Management
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

# Liquidity Provider (LP) Management

The intent of this document is to explain all the points that the Liquidity Provider (LP) should know in order to operate their instance of the Liquidity Provider Server (LPS). This document contains both technical and non-technical information, so it is recommended to be reviewed by the LP themselves and the person who is in charge of setting up the environment where the LPS will be deployed.

## Overview

In the Flyover Protocol, there are two main actors: the regular user, who is interested in executing Peg-In/Peg-Out operations, and the Liquidity Provider (LP), who provides liquidity to speed up the operation for the user in exchange for a fee as a reward. To enable this, the user and the LP need to agree on the terms of the service (a Peg-In/Peg-Out *Quote*). Different LPs may offer different quotes, so the user needs to interact with each LP to receive quote details and decide which one to use for the operation.

The user interacts with the Flyover Protocol through the [Flyover SDK](https://github.com/rsksmart/unified-bridges-sdk/tree/main/packages/flyover-sdk). This SDK fetches the list of available LPs from the Liquidity Bridge Contract (LBC). This contract returns a list where each element has some information about the LP, including the URL of the Liquidity Provider Server (LPS) instance of that LP, so the user can communicate with it. This means that **the LPS has an API that every user interacts with to agree on the quote**.

The LP also needs to interact with the protocol to perform management operations related to topics such as collateral, funds, fees management, configuration, etc. The LP performs these operations through the LPS, which is why the LPS also has an API that the LP interacts with to perform various management operations.

To summarize, the LPS has two main APIs:

- **User/Public API**: This API is used by the user to interact with the LP to agree on a quote.
- **LP/Management API**: This API is used by the LP to interact with the LPS to perform management operations.

![User fetching LP list](https://raw.githubusercontent.com/rsksmart/liquidity-provider-server/refs/heads/master/docs/lp-management/img.png)

If we zoom in on one LPS:

![Internal view of LPS](https://raw.githubusercontent.com/rsksmart/liquidity-provider-server/refs/heads/master/docs/lp-management/img_1.png)

The fact that the LPS's API is divided into a public one and a private one implies that the Management API has some security requirements that need to be addressed to ensure that it will only be used by the LP. Some of these measures are provided out of the box by the LPS, but some others require additional configuration for the environment where the LPS will run.

:::note

If you are a liquidity provider and not interested in the technical details, the following sections are of your main interest:

- [Management UI Access](#management-ui-access)
- [Wallet Management](#wallet-management)

:::

## LPS Configuration

By default, the Management API is disabled and can be enabled only by setting the `ENABLE_MANAGEMENT_API` environment variable to `true`. This is a security measure to ensure that the API will only be accessible if it is explicitly enabled by the LP (or the person setting up the environment).

Once this variable is set to `true`, **it is the responsibility of the LP and the person setting up the environment to ensure that the API is properly secured**.

### Management UI Access

The LPS provides a Management UI out of the box to facilitate interaction with the Management API. To access this UI, navigate to `<LPS URL>/management` in your browser.

In order to interact with this API, the LP needs to be authenticated. The authentication mechanisms consist of a username and password credentials. There is a default credentials pair which is `admin` as username and a random password that the LPS will generate on its startup in the file `management_password.txt` inside the temporary directory of your OS. For example: `/tmp/management_password.txt`.

The first time that the LP enters the Management UI, they will be asked to provide the default credentials and set the new ones to use from that point forward. After logging in, the LP will have access to all the operations of the Management API.

> :warning: Remember that if `ENABLE_MANAGEMENT_API` is set to `false`, the Management UI won't be accessible.

## Minimum Security Requirements

The full details of the endpoints and how to call them can be found in the [OpenAPI file](https://github.com/rsksmart/liquidity-provider-server/blob/master/OpenApi.yml) of the LPS. The following list contains a short description of each endpoint and whether it should be treated as public or secured as a private endpoint.

- **PUBLIC**: Accessible by anyone
- **PRIVATE**: Only accessible by LP
- **ANY**: It is up to the administrator to set it as private or public

| **Endpoint**                  | **Method** | **Visibility** | **Description**                                      |
|:-----------------------------:|:----------:|:--------------:|:----------------------------------------------------:|
| `/health`                     | GET        | ANY            | Health check                                         |
| `/getProviders`               | GET        | PUBLIC         | Get list of registered LPs                           |
| `/providers/details`          | GET        | PUBLIC         | Get details of the LP that owns this LPS             |
| `/pegin/getQuote`             | POST       | PUBLIC         | Get pegin quote terms                                |
| `/pegin/acceptQuote`          | POST       | PUBLIC         | Accept pegin quote terms                             |
| `/pegout/getQuotes`           | POST       | PUBLIC         | Get pegout quote terms                               |
| `/pegout/acceptQuote`         | POST       | PUBLIC         | Accept pegout quote terms                            |
| `/pegin/status`               | GET        | PUBLIC         | Get details and status of an accepted pegin quote    |
| `/pegout/status`              | GET        | PUBLIC         | Get details and status of an accepted pegout quote   |
| `/providers/liquidity`        | GET        | PUBLIC         | Get liquidity available in this LPS                  |
| `/pegin/collateral`           | GET        | PRIVATE        | Get collateral locked by LP for pegin                |
| `/pegout/collateral`          | GET        | PRIVATE        | Get collateral locked by LP for pegout               |
| `/pegin/addCollateral`        | POST       | PRIVATE        | Lock collateral for pegin                            |
| `/pegout/addCollateral`       | POST       | PRIVATE        | Lock collateral for pegout                           |
| `/providers/withdrawCollateral`| POST      | PRIVATE        | Withdraw collateral locked for both pegin & pegout   |
| `/providers/changeStatus`     | POST       | PRIVATE        | Change status of the LP that owns this LPS           |
| `/providers/resignation`      | POST       | PRIVATE        | Resign as flyover liquidity provider                 |
| `/userQuotes`                 | GET        | PUBLIC         | Get list of pegout deposits made by a user           |
| `/configuration`              | GET        | PRIVATE        | Get the configuration of this LPS                    |
| `/configuration`              | POST       | PRIVATE        | Modify the general configuration of this LPS         |
| `/pegin/configuration`        | POST       | PRIVATE        | Modify the pegin related configuration of this LPS   |
| `/pegout/configuration`       | POST       | PRIVATE        | Modify the pegout related configuration of this LPS  |
| `/management/login`           | POST       | PRIVATE        | Login to the Management API                          |
| `/management/logout`          | POST       | PRIVATE        | Logout from the Management API                       |
| `/management/credentials`     | POST       | PRIVATE        | Update credentials for Management API login          |
| `/management`                 | GET        | PRIVATE        | Serve Management UI                                  |
| `/version`                    | GET        | PUBLIC         | Get server version info                              |

## Wallet Management

The LPS performs operations on behalf of the LP during the protocol process, which means it requires access to both the LP's Bitcoin and Rootstock wallets. Specifically, it requires access to the RSK wallet of the LP, and by having it, it also has access to the BTC wallet associated with that RSK wallet.

The LPS has the following options to be provided with access to that wallet, and depending on the option picked by the LP (set with the value of the `WALLET` environment variable), the LP will need to manage those wallets in a different way:

### Run LPS using local wallet integration

With this option, the LPS needs access to the [keystore file](https://ethereum.org/en/glossary/#keystore) of the wallet and the password to decrypt it. There are multiple ways to provide this information to the LPS, which can be checked in the [Secrets Management](#secrets-management) section.

With this, the LPS would keep the wallet in memory and sign the Rootstock and Bitcoin transactions with it. It's important to note that with this approach, the knowledge of the private key is inside the organization running the LPS.

Through the Management UI, the LPS allows the LP to perform all the necessary operations related to the protocol. Regarding the wallet itself, the LPS informs both RSK and BTC addresses to which the LP should send funds in order to add liquidity to the wallets.

If the LP wants to perform any additional operations **non-related to the Flyover protocol** in the RSK network, then they need to get the keystore file and password and import the account to a wallet of their choice, such as MetaMask (in the case of MetaMask by following [these steps](https://support.metamask.io/hc/en-us/articles/360015289452-Importing-an-Account)). In the case that the LP wants to perform any additional operations **non-related to the Flyover protocol** in the BTC network, then they need to export the private key of the account (in the case of MetaMask by following [these steps](https://support.metamask.io/hc/en-us/articles/360015289632-Exporting-your-Private-Key)) and convert it to Wallet Import Format (WIF). Then, import it to any wallet of their choice as explained in the [Rootstock developer portal](https://developers.rsk.co/rsk/rbtc/conversion/networks/).

### Run LPS using Fireblocks service integration

The Fireblocks integration will be included in the next release. This integration allows running the LPS without the need to have the private keys inside the organization's environment and also provides the LP with a UI to manage those wallets since it's a custodial service.

#### Technical Clarifications

Regardless of the option chosen by the LP to handle the wallet management, the LPS will need to create the following watch-only wallets in the BTC node. The LPS does this creation by itself, so we advise ensuring that the node doesn't have other wallets with the same names to avoid errors on startup:

- `rsk-wallet`: This wallet will be used to track the UTXOs available to spend with the LP wallet. It requires a rescan of the network, and it only imports the LP public key on the first start of the LPS. After that, it just validates that the wallet is created and the public key is imported.
- `pegin-watchonly-wallet`: This wallet will be used to track the deposit addresses of the accepted PegIn operations. It doesn't require a rescan, and it imports a new address every time a PegIn is accepted.

**It's important to clarify that the LPS expects that none of these wallets is encrypted. There is no security risk in this since they handle only public information.**

## Secrets Management

For every wallet management option, there will be some secrets involved, even if those secrets are not the private keys. This section explains all the ways that the LPS can be provided with those secrets.

The option to select from the following can be set through the value of the `SECRET_SRC` environment variable:

### Environment (Not Recommended)

In this option, the LPS will get the required secrets from the environment (this might include the path to existing files in the filesystem). This option is not recommended to be used in production environments as it was developed only for testing purposes. The environment variables that need to be set if this option is used are the following:

- `KEYSTORE_FILE`
- `KEYSTORE_PWD`

### AWS Secrets Manager

In this option, the LPS will get the secrets from AWS Secrets Manager service, which means that the LPS will need to be provided with the AWS keys in any of the ways that the AWS client allows (through a file in home directory, environment variables, etc). In this case, the LPS should receive the name of the secrets to use through the environment variables (listed below). This is the recommended option for production environments.

- `KEY_SECRET`
- `PASSWORD_SECRET`

:::danger[Troubleshooting]
Encountering difficulties with the SDK setup, LPS configuration, or specific Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.
:::

---
