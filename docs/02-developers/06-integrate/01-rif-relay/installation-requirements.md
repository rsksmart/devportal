---
sidebar_label: Setup
sidebar_position: 300
title: RIF Relay Installation Requirements
description: Requirements for installing RIF Relay.
tags: [rif, envelope, relay, user, guide]
---


To set up the RIF Relay system running locally there are some tools that are required. All of these tools are open source and have their own support page. The functionality of RIF Relay does not depend on these technologies and could be updated or replaced, if necessary.

## Hardware Requirements
    - **A Computer Running x86_64 architecture or Apple Silicon Mac:** A Mac or PC with an Intel x64 architecture or Apple M1 chip (or later models) is required.
## Software Requirements
    -	**macOS, Windows or Linux:** For macOS, you'll need a recent version that supports Apple Silicon (ARM architecture) and Rosetta 2 translation for running x86_64 applications.
    Similarly, for Windows or Linux, any recent distribution that suits your preferences or requirements will work.
    -	**Rosetta 2:** This translation layer enables x86_64 applications to run on Apple Silicon. It's crucial for running software that is yet to be optimized for ARM architecture.
    -	**Homebrew:** This is a package manager for macOS used for installing various software, including the x86_64 version of Java. Depending on the software requirements, you might need both the ARM and x86_64 versions of Homebrew.
    -  **Chocolatey:** This is a Windows equivalent of Homebrew that allows you to install various software, including Java JDK.
    -	**Java Development Kit (JDK):** An ARM-compatible version of Java JDK (like OpenJDK for ARM).
    -	**x86_64 JDK:** For compatibility with specific libraries or applications not yet available for ARM, an x86_64 version of Java is also needed. This can be installed using Homebrew under Rosetta 2.
    -	**Docker:** You need to have `docker` and `docker-compose` installed locally. If you don't have these installed, we recommend following the guidelines in the official [Docker documentation](https://docs.docker.com/get-docker/) for installation and updates.
    -	**Node & NPM:** We use Node version `v18`. It's recommended to manage Node versions with [`nvm`](https://github.com/nvm-sh/nvm). After installing nvm, run these commands to install and switch to Node version 18:
        ```bash
        nvm install 18
        nvm use 18
        ```
        To use Node without `nvm`, follow the installation instructions on Node's [official website](https://nodejs.org/en/). After installation, verify it by executing `node -v` in your command line, which will display the installed Node version. This step ensures Node is correctly installed on your system.
    - **Ethers:** The interaction with the blockchain is done using [Ethers v5](https://docs.ethers.org/v5/).

## Getting Started with RIF Relay

For a detailed step-by-step guide on getting started with RIF Relay, refer to the [Sample dApp](/developers/integrate/rif-relay/sample-dapp/).


## RIF Relay Contract Deployment Requirements

### Hardhat
- We use `Hardhat` version `v2.10.2` for blockchain interactions. For details on how to install Hardhat, follow the instructions on the [Hardhat website](https://hardhat.org/hardhat-runner/docs/getting-started#installation). Use the `npx` prefix for Hardhat commands to ensure the use of the project-specific version. Verify the installation with `npx hardhat version`. For configuration, refer to `hardhat.config.ts`. Detailed usage and configuration instructions are available in [Hardhat's documentation](https://hardhat.org/docs).

### Using Docker

- RIF Relay components can be deployed using Docker or locally using [Hardhat](#hardhat). A guide for the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server#execute-as-a-docker-container) can be found in the repository.