---
sidebar_label: Docker Setup
sidebar_position: 230
title: Docker Setup for Liquidity Provider Server
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg, docker]
description: Learn how to run a Liquidity Provider Server (LPS) using Docker Compose, including configuration for both regtest and testnet environments.
---


The provided docker-compose files can be used to quickly spin up an environment with the Liquidity Provider Server and its dependent services (`bitcoind` and `rskj`) for either `regtest` or `testnet`. Note that different environments require different setup files - the regtest environment requires a regtest federation and localstack, making the setup process different from testnet or mainnet.

## Deploy Locally (Regtest Environment)

* Use scripts located in the `local` directory
* If there are any changes to the Liquidity Bridge Contracts that you need to deploy locally in your environment, you'll need to:
  * Get the LiquidityBridgeContractProxy address from your deployment
  * Export it as an environment variable:
    ```bash
    export LBC_ADDR="NEW_ADDRESS"
    export LPS_STAGE=regtest
    ```
  * Make the script executable and run it:
    ```bash
    chmod +x lps-env.sh
    ./lps-env.sh up
    ```

## Deploy on Development Server with Testnet Config

For testnet or mainnet environments, use the docker-compose files directly:

```bash
docker-compose --env-file .env.testnet down &&
docker-compose --env-file .env.testnet build --no-cache &&
docker-compose --env-file .env.testnet up -d
```

:::danger[Troubleshooting]
Encountering difficulties with the Docker setup or Flyover issues? Join the [Rootstock Discord community](http://discord.gg/rootstock) for expert support and assistance. Our dedicated team is ready to help you resolve any problems you may encounter.
:::
