---
sidebar_label: Environment Variables
sidebar_position: 230
title: Setting Environment Variables
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover SDK streamlines integration between client applications and the Flyover Protocol. This easy-to-use JavaScript/TypeScript toolkit provides configuration options for Liquidity Providers (LPs) and custom network setups for connecting to Rootstock.
---

In this section, we will cover how to setup environment variables for the Liquidity Provider Server (LPS), [AWS](#aws-variables), and [other variables configurations](#other-variables).

## LPS Environment Variables

These are the environment variables required by the liquidity provider server (LPS). The following table lists the environment variables and their descriptions and whether it's mandatory or not.

| Name | Description | Example | Mandatory |
| --- | --- | --- | --- |
| `LPS_STAGE` | The network where LPS will be running on. | One of the following: `regtest`, `testnet`, `mainnet` | YES |
| `PORT` | The port number to run the http server of the LPS. | `8080` | YES |
| `LOG_LEVEL` | Level for the application logs. | One of the following: `panic`, `fatal`, `error`, `warn`, `info`, `debug`, `trace` | YES |
| `LOG_FILE` | File to send the logs to. If not provided logs will be sent to standard output | `/home/lps.log` | NO |
| `ENABLE_MANAGEMENT_API` | Whether to enable the management API endpoints or not. To know more read the [LP Management Documentation](https://github.com/rsksmart/liquidity-provider-server/blob/master/docs/LP-Management.md#context) file. If not provided, the default value will be `false`. | `true` or `false` | NO |
| `AWS_LOCAL_ENDPOINT` | Endpoint for the AWS local instance (localstack). Only required if LPS is running in regtest mode. | `http://localhost:4444` | NO |
| `WALLET` | Type of the wallet management implementation. To know more read the wallet management section of the [LP Management file](https://github.com/rsksmart/liquidity-provider-server/blob/master/docs/LP-Management.md#context). | One of the following: `native` | YES |
| `SECRET_SRC` | Source of the secrets required for the wallet management. To know more read the secrets management section of the [LP Management file](https://github.com/rsksmart/liquidity-provider-server/blob/master/docs/LP-Management.md#context). | One of the following: `aws env` | YES |
| `MONGODB_USER` | User to connect to MongoDB. | `root` | YES |
| `MONGODB_PASSWORD` | Password to connect to MongoDB. | `<any password>` | YES |
| `MONGODB_HOST` | Host to connect to MongoDB. | `localhost` | YES |
| `MONGODB_PORT` | Port to connect to MongoDB. | `27017` | YES |
| `RSK_ENDPOINT` | URL to connect to the Rootstock node. Must be an http endpoint. | `http://rskj:4444` | YES |
| `CHAIN_ID` | RSK chain id. | `33` | YES |
| `LBC_ADDR` | Address of the Liquidity Bridge Contract (LBC). | `0x8901a2Bbf639bFD21A97004BA4D7aE2BD00B8DA8` | YES |
| `RSK_BRIDGE_ADDR` | Address of the Rootstock bridge. | `0x0000000000000000000000000000000001000006` | YES |
| `RSK_REQUIRED_BRIDGE_CONFIRMATIONS` | The number of confirmations that need to pass before being able to register a pegin, it changes depending on the network. | `100` | YES |
| `IRIS_ACTIVATION_HEIGHT` | Block number where the iris update is activated, depends on the network. | `1500000` | YES |
| `ERP_KEYS` | Keys that are used as a secondary multisig that would be allowed to spend UTXOs after a year they were created. |`0216c23b2ea8e4f11c3f9e22711addb1d16a93964796913830856b568cc3ea21d3`,`0275562901dd8faae20de0a4166362a4f82188db77dbed4ca887422ea1ec185f14`,`034db69f2112f4fb1bb6141bf6e2bd6631f0484d0bd95b16767902c9fe219d4a6f` | YES |
| `ACCOUNT_NUM` | The keystore account number to use. If not provided default value will be 0. | `0` | NO |
| `DAO_FEE_COLLECTOR_ADDRESS` | Address of the DAO fee collector. | `0x86B6534687A176A476C16083a373fB9Fe4FAb449` | YES |
| `KEY_SECRET` | Name of the secret of AWS secrets manager that contains the encrypted json of the liquidity provider RSK account. Only required if `SECRET_SRC` is `aws`. | `FlyoverTestEnv/LPS-KEY` | NO |
| `PASSWORD_SECRET` | Name of the secret of AWS secrets manager that contains the password of the encrypted json of the liquidity provider RSK account. Only required if `SECRET_SRC` is `aws`. | `FlyoverTestEnv/LPS-PASSWORD` | NO |
| `KEYSTORE_FILE` | Name of the file that contains the encrypted json of the liquidity provider RSK account. Only required if `SECRET_SRC` is `env`. | `geth_keystore/UTC--2024-01-29T16-36-09.688642000Z--9d93929a9099be4355fc2389fbf253982f9df47c` | NO |
| `KEYSTORE_PWD` | The password of the encrypted json of the liquidity provider RSK account. Only required if `SECRET_SRC` is `env`. | `<any password>` | NO |
| `BTC_NETWORK` | Network to use when connecting to the Bitcoin node. | One of the following: `regtest`, `testnet`, `mainnet` | YES |
| `BTC_USERNAME` | Username for the bitcoind rpc server. | `user` | YES |
| `BTC_PASSWORD` | Password for the bitcoind rpc server. | `password` | YES |
| `BTC_ENDPOINT` | Endpoint of the bitcoind rpc server. | `localhost:5555` | YES |
| `ALERT_SENDER_EMAIL` | The email that will be used to send alerts. | `no-reply@mail.flyover.rifcomputing.net` | YES |
| `ALERT_RECIPIENT_EMAIL` | The email that will receive the alerts. | `test@iovlabs.org` | YES |
| `PROVIDER_NAME` | The liquidity provider name to be registered in the liquidity bridge contract. | `Default provider` | YES |
| `BASE_URL` | URL of the LPS to register in the liquidity bridge contract. | `http://localhost:8080` | YES |
| `PROVIDER_TYPE` | Whether the liquidity provider will provide for pegin, pegout or both operations. | One of the following: `pegin`, `pegout`, `both` | YES |
| `PEGOUT_DEPOSIT_CACHE_START_BLOCK` | If provided, the LPS will upsert into the database all the pegout deposits that were done from this block to the current one. | `500` | NO |
| `CAPTCHA_SECRET_KEY` | Captcha key used in the server to validate client requests. | `<a captcha secret>` | NO |
| `CAPTCHA_SITE_KEY` | Captcha key used by the client to perform the challenge. | `<a captcha site key>` | NO |
| `CAPTCHA_THRESHOLD` | Threshold from zero to one to consider requests as valid when using recaptcha v3 (right now we're using v2). | `0.8` | NO |
| `DISABLE_CAPTCHA` | Whether to disable captcha validation or not. It's a boolean value. | `true` | NO |
| `CAPTCHA_URL` | URL to make the captcha verification. | `https://www.google.com/recaptcha/api/siteverify` | NO |
| `MANAGEMENT_AUTH_KEY` | Authentication key for the Management API session. Is mandatory if the Management API is enabled. Must be a 32 bytes hex string. | `a2fbac02d66202e8468d2a4f1deba4fa5c2491f592e0e22e32fe1e6acac25923` | NO |
| `MANAGEMENT_ENCRYPTION_KEY` | Encryption key for the Management API session. Is mandatory if the Management API is enabled. Must be a 32 bytes hex string. | `9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08` | NO |
| `MANAGEMENT_TOKEN_AUTH_KEY` | Authentication key for the CSRF cookies. Is mandatory if the Management API is enabled. Must be a 32 bytes hex string. | `c5ff177a86e82441f93e3772da700d5f6838157fa1bfdc0bb689d7f7e55e7aba` | NO |
| `MANAGEMENT_USE_HTTPS` | Whether the session cookies generated by the Management API should use HTTPS or not | `false` | NO |
| `ENABLE_SECURITY_HEADERS` | Whether to enable the security headers of the Management UI or not | `true` | YES |
| `BOOTSTRAP_TIMEOUT` | The time in seconds that the LPS will wait for the bootstrap process to finish. If not provided default value will be the one defined in timeout.go. | `240` | NO |
| `WATCHER_PREPARATION_TIMEOUT` | The time in seconds that the LPS will wait for the watcher preparation process to finish. If not provided default value will be the one defined in timeout.go. | `15` | NO |
| `WATCHER_VALIDATION_TIMEOUT` | The time in seconds that the penalization and liquidity check watchers will use for their validations. If not provided default value will be the one defined in timeout.go. | `15` | NO |
| `DATABASE_INTERACTION_TIMEOUT` | The time in seconds that the LPS will wait in any database interaction. If not provided default value will be the one defined in timeout.go. | `3` | NO |
| `MINING_WAIT_TIMEOUT` | The time in seconds that the LPS will wait for a broadcasted transaction to be mined. If not provided default value will be the one defined in timeout.go. | `300` | NO |
| `DATABASE_CONNECTION_TIMEOUT` | The time in seconds that the LPS will wait for the database connection to be established. If not provided default value will be the one defined in timeout.go. | `10` | NO |
| `SERVER_READ_HEADER_TIMEOUT` | The time in seconds that the http server will wait for the request headers to be read. If not provided default value will be the one defined in timeout.go. | `5` | NO |
| `SERVER_WRITE_TIMEOUT` | The time in seconds that the http server will wait for the response to be written. If not provided default value will be the one defined in timeout.go. | `60` | NO |
| `SERVER_IDLE_TIMEOUT` | The time in seconds that the http server will wait for the next request when keep-alives are enabled. If not provided default value will be the one defined in timeout.go. | `10` | NO |
| `PEGOUT_DEPOSIT_CHECK_TIMEOUT` | The time in seconds that the LPS will wait for every pegout deposit check repetition. If not provided default value will be the one defined in timeout.go. | `10` | NO |

## AWS variables
You may notice that in [`sample-config.env`](https://github.com/rsksmart/liquidity-provider-server/blob/master/sample-config.env) there are some environment variables that are related to AWS. These variables are required to use AWS services, however, they are not listed in the table as the AWS SDK has the functionality to load them from multiple sources. For that reason, they are not accessed directly from the code and are not listed in the table above.

## Other variables
You may notice that in [`sample-config.env`](https://github.com/rsksmart/liquidity-provider-server/blob/master/sample-config.env) there are variables that aren't in the table and don't belong to AWS. Those variables are used to run scripts or to set up the local environment, they should not be present in a productive environment for this application.
