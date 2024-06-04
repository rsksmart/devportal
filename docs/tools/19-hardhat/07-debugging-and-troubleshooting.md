---
sidebar_label: Debugging and Troubleshooting
layout: rsk
title: 'Common Errors and Tips'
description: 'Learn about some potential issues you can run into and tips on how to resolve them'
tags: [quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain]
render_features: 'collapsible'
---

This section provides help on some potential issues you may run into and tips on how to resolve them. 

## Errors

[](#top "collapsible")
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
  - Check that all the steps in [interacting with frontend](/guides/quickstart/hardhat/interact-with-frontend/) were followed sequentially.
- Error: HH601: Script scripts/deploy.js doesn't exist.
  - Ensure that you're running the `npx hardhat run --network hardhat scripts/deploy.js` command from the root directory.

## Tips

<table>
    <tr>
   <td> 
    <b>Issue</b>

   </td>
   <td> 
    <b>Solution</b>

   </td>
  </tr>
  <tr>
   <td>
    Setup and Configuration Issues

   </td>
   <td>
    Double-check environment variables and configuration files for correctness.

   </td>
  </tr>
  <tr>
   <td>
    Compilation Errors

   </td>
   <td>
    Review Solidity code for syntax errors. Verify the correct Solidity version in the configuration file.

   </td>
  </tr>
  <tr>
   <td>
    Connection Issues

   </td>
   <td>
    Ensure correct network URL and settings. Maintain a stable internet connection.

   </td>
  </tr>
  <tr>
   <td>
    Deployment Failures

   </td>
   <td>
    Verify deployment script configuration, account, gas price, and funds.

   </td>
  </tr>
  <tr>
   <td>
    Truffle Compatibility Issues

   </td>
   <td>
    Adjust Hardhat configurations when migrating from Truffle.

   </td>
  </tr>
  <tr>
   <td>
    Testing Issues

   </td>
   <td>
    Review test scripts for logical errors. Ensure the right testing libraries and versions.

   </td>
  </tr>
  <tr>
   <td>
    Debugging Smart Contracts

   </td>
   <td>
    Use Hardhat's debugging tools. Utilize external tools like etherscan.

   </td>
  </tr>
  <tr>
   <td>
    Gas Estimation Errors

   </td>
   <td>
    Be cautious with gas-intensive operations. Adjust the gas limit or optimize code when needed.

   </td>
  </tr>
  <tr>

   <td>
    Version Compatibility

   </td>
   <td>
    Keep dependencies up-to-date and compatible.

   </td>
  </tr>
  <tr>
   <td>
    Community Resources

   </td>
   <td>
    Seek help from online forums, developer communities, and social media platforms like Reddit and GitHub.

   </td>
  </tr>
</table>
