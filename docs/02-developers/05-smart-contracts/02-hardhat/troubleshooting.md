---
sidebar_label: Debugging and Troubleshooting
sidebar_position: 106
title:  Common Errors and Tips
description: "Learn about some potential issues you can run into and tips on how to resolve them."
tags: [getting-started, guide, smart contracts, rsk, rootstock, hardhat, blockchain]
---

This section provides help on some potential issues you may run into and tips on how to resolve them. 

## Errors

- Error HH8: There's one or more errors in your config file
  ```shell
    % npx hardhat compile
    Error HH8: There's one or more errors in your config file:

    * Invalid account: #0 for network: rskMainnet - Expected string, received undefined
    * Invalid account: #0 for network: rskTestnet - Expected string, received undefined

    To learn more about Hardhat's configuration, please go to https://hardhat.org/config/

    For more info go to https://hardhat.org/HH8 or run Hardhat with --show-stack-traces
  ```
  > - FIX 1: Ensure the values in the environment variables matches with the hardhat network configuration `hardhat.config.js` file. For bash, run `source .env` in the root directory for dotenv to enable the environment variables.
- Error: Nothing to Compile 
  ```shell
  % npx hardhat compile
  Nothing to compile
  ```
  > - FIX 2: Delete artifacts folder and run the `npx hardhat compile` command to generate new artifacts.
- Error:  "GET /MyToken.json" Error (404): "Not found"
  - Check that contracts were compiled successfully, and artifacts folder was generated.
  - Check that all the steps in [interacting with frontend](/developers/smart-contracts/hardhat/interact-with-frontend/) were followed sequentially.
- Error: HH601: Script scripts/deploy.js doesn't exist.
  - Ensure that you're running the `npx hardhat run --network hardhat scripts/deploy.js` command from the root directory.