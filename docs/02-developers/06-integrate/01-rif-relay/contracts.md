---
sidebar_label: Develop
sidebar_position: 600
title: RIF Relay Develop >> transformed/develop.md
echo description: RIF Relay deployment process. >> transformed/develop.md
echo tags: [rif, envelope, relay, user, guide] >> transformed/develop.md
echo --- >> transformed/develop.md
echo  >> transformed/develop.md
cat temp_develop.md >> transformed/develop.md
# Clean up temporary file
rm temp_develop.md
cp transformed/develop.md devportal/docs/02-developers/06-integrate/01-rif-relay/develop.md

# Process contracts section
TEMP_FILE=temp_contracts.md
TRANSFORMED_FILE=transformed/contracts.md
# Remove the unwanted first lines from section (title)
tail -n +1 docs/contracts.md > temp_develop.md
echo --- > transformed/develop.md
echo sidebar_label: Contracts >> transformed/develop.md
echo sidebar_position: 700 >> transformed/develop.md
echo title: RIF Relay - Contracts
description: 'RIF Relay Contracts.'
tags: [rif, envelope, relay, integrate]
---

# RIF Relay Develop

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