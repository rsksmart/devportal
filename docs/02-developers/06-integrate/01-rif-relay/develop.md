---
sidebar_label: Develop
sidebar_position: 600
title: RIF Relay Develop
description: RIF Relay deployment process.
tags: [rif, envelope, relay, user, guide]
---


## Initializing the project

To use RIF Relay, follow these steps to build the project.

## Project structure

The project is divided into multiple modules that interact with each other.
Each project has its own documentation in its repository.

1. [RIF Relay Contracts](https://github.com/rsksmart/rif-relay-contracts)
2. [RIF Relay Client](https://github.com/rsksmart/rif-relay-client)
3. [RIF Relay Server](https://github.com/rsksmart/rif-relay-server)
4. [RIF Relay Sample dApp](https://github.com/rsksmart/rif-relay-sample-dapp)

## Committing changes

To contribute to the project, create a branch with the name of the new feature you are implementing (e.g. `gas-optimization`). When you commit to git, a hook is executed. The hook executes a linter and all the tests.