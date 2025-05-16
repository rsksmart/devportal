---
sidebar_label: Integration Tests
sidebar_position: 240
title: Liquidity Provider Server Integration Tests
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg, testing]
description: Learn how to run integration tests for the Liquidity Provider Server (LPS) in both test instance and running instance modes.
---

# Liquidity Provider Server Integration Test
## How to run
There are two ways of running this tests:
1. **Test instance**: to run this test you need to have the same environment variables that you have when you run the LPS. 
The test will start a LPS instance, connect to the blockchains and perform the validations, once the integration test 
are done, the instance of the LPS is terminated. This option is activated by setting `lps.useTestInstance` to true in
config file.
2. **Running instance**: this option doesn't start a LPS instance, it assumes that the url provided is a running instance 
of the LPS. This is useful to run the integration test against a deployed LPS in mainnet or testnet. This option is 
activated by setting `lps.useTestInstance` to false in config file.

Also, you need a Bitcoin node available to listen to the network and perform the transactions simulating the user and a
RSK node to do the same thing, in the case of the RSK node, it **must have enabled the websocket connections** so the 
test can listen properly for the events.

You can run the test with the following command:
```
go tool test2json -t <compiled test file> -test.v -test.paniconexit0 -test.run ^\QTestIntegrationTestSuite\E$
``` 

All the accounts and wallets that you provide to perform the integration test must have balance to do the proper transactions.

## Configuration
Some integration tests require additional configuration which needs to be set in the `integration-tests.config.json` file which is 
inside the `integration` folder, you can find the configuration structure in the `integration-tests.config.example.json` file. You 
can just replace the configs in that file and rename to `integration-tests.config.json`