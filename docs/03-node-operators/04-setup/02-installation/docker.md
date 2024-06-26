---
sidebar_label: Setup node on Docker
sidebar_position: 100
title: Setup node on Docker
tags: [docker, rootstock, desktop, macOS, rskj, windows, install, rsk, node, how-to, network, requirements, mainnet, testnet, regtest]
description: "Install RSKj using Docker."
---

Before installing Docker, ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) before installing the Rootstock node. If you already have docker installed. See [Install RSKj using Docker](#install-rskj-using-docker).

## Install Docker Desktop Client

[Docker Desktop](https://www.docker.com/products/docker-desktop/) provides an easy and fast way for running containerized applications on various operating systems.

For Mac OSX and Windows:

- [Download](https://www.docker.com/products/docker-desktop) and install
- Start the Docker Desktop client
- Login with a Docker Hub free account

For Linux:

- Install [Docker Engine Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- Note that you will need to use `sudo` for all docker commands, by default. To avoid this [additional steps](https://docs.docker.com/install/linux/linux-postinstall/) are required.

Ensure that docker is running by running the following command - it should run without any errors.

```shell
docker ps
```

More information about Docker install [here](https://docs.docker.com/install/).

## Install RSKj Using Docker

To install a Rootstock node using Docker, visit the [Docker Hub](https://hub.docker.com/r/rsksmart/rskj) for installation instructions.

## Logging in RSKj

By default, logs are exclusively directed to a single file. However, if you wish to enable the logging output to STDOUT, you can specify this system property via the command line using `-Dlogging.stdout=<LOG_LEVEL>`. That command should look something like this:
```
java -Dlogging.stdout=INFO -cp <classpath> co.rsk.Start --reset --<RSK network>
```

Regarding the RSKj Docker containers, logs are printed to STDOUT by default, making it easy to view the logs while the container is running. In order to modify this, you can run the Docker container with the environment variable set to a different LOG_LEVEL (For example, DEBUG log level). That command should follow this structure:
```
docker run -e RSKJ_LOG_PROPS=DEBUG <container-name>
```