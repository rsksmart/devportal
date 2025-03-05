---
sidebar_position: 100
title: Blocknative Gas Price API
sidebar_label: Blocknative Gas Price API
description: "The Gas Price API gives you the gas price needed to have a certain probability to qualify for inclusion in the next block."
tags: [rsk, rootstock, developer tools, dev tools, blocknative, gas]
---

Blocknative is providing accurate next block gas price estimation for 20+ chains including Rootstock. Use blocknative gas infrastructure to estimate, predict, optimize, and make decisions onchain. 

Supported on: <Shield title="mainnet" tooltip="Available on Mainnet" color="orange" />.

## Key Features

Accurate Gas Price Predictions: Harness Blocknative’s real-time global mempool data and advanced statistical models to deliver precise gas estimates for next-block or next-ten-second confirmations.

> Need a high probability of being confirmed at the expense of spending extra gas? Use the 99% probability prediction. Don't mind if the transaction takes longer to confirm? Use the 50% probability prediction.

## Getting Started

### How to Sign Up
[Request an API key](https://www.blocknative.com/request-api-key) by filling in the form. A valid Blocknative API key is `OPTIONAL` in the Authorization Header of every request.

### Set Up the Application

Send a `GET` request which returns a range of confidence intervals for gas prices needed to qualify a transaction for inclusion in the next block or next ∼10 seconds, depending on the chain. The order of confidence intervals is subject to change.

#### Example cURL Requests (if applicable)

```bash
curl -H 'Authorization: optional-apikey-here' 'https://api.blocknative.com/gasprices/blockprices?chainid=30'
```

You should get the following response:

```bash
{"system":"rootstock","network":"mainnet","unit":"gwei","maxPrice":0.1,"currentBlockNumber":7309086,"msSinceLastBlock":20466,"blockPrices":[{"blockNumber":7309087,"estimatedTransactionCount":6,"baseFeePerGas":0.0,"estimatedPrices":[{"confidence":99,"price":0.083,"maxPriorityFeePerGas":0.085,"maxFeePerGas":0.085},{"confidence":95,"price":0.066,"maxPriorityFeePerGas":0.066,"maxFeePerGas":0.066},{"confidence":90,"price":0.066,"maxPriorityFeePerGas":0.066,"maxFeePerGas":0.066},{"confidence":80,"price":0.066,"maxPriorityFeePerGas":0.066,"maxFeePerGas":0.066},{"confidence":70,"price":0.032,"maxPriorityFeePerGas":0.032,"maxFeePerGas":0.032}]}]}%   
```

## Integration process on Rootstock network

To integrate the gas network API in your application, view example cURL requests below:

**Example request:**

```bash
curl -H 'Authorization: optional-apikey-here' 'https://api.blocknative.com/gasprices/blockprices'
```

**Or without the optional apikey;*

`curl 'https://api.blocknative.com/gasprices/blockprices'`

**Example non-default chain request:**

```bash
curl -H 'Authorization: optional-apikey-here' 'https://api.blocknative.com/gasprices/blockprices?chainid=30'
```

**Example custom confidence level request**

```bash
curl -H 'Authorization: optional-apikey-here' 'https://api.blocknative.com/gasprices/blockprices?chainid=1&confidenceLevels=50&confidenceLevels=70&confidenceLevels=80&confidenceLevels=90&confidenceLevels=99'
```

**An alternative format for confidence levels is:**

```bash
curl -H 'Authorization: optional-apikey-here' 'https://api.blocknative.com/gasprices/blockprices?chainid=1&confidenceLevels=50,70,80,90,99'
```

**Example Response Payload:**

```bash
{
  "system": "rootstock",
  "network": "mainnet",
  "unit": "gwei",
  "maxPrice": 0,
  "currentBlockNumber": 7256776,
  "msSinceLastBlock": 37390,
  "blockPrices": [
    {
      "blockNumber": 7256777,
      "estimatedTransactionCount": 1,
      "baseFeePerGas": 0,
      "estimatedPrices": [
        {
          "confidence": 99,
          "price": 0.083,
          "maxPriorityFeePerGas": 0.084,
          "maxFeePerGas": 0.084
        },
        {
          "confidence": 95,
          "price": 0.066,
          "maxPriorityFeePerGas": 0.066,
          "maxFeePerGas": 0.066
        },
        {
          "confidence": 90,
          "price": 0.066,
          "maxPriorityFeePerGas": 0.066,
          "maxFeePerGas": 0.066
        },
        {
          "confidence": 80,
          "price": 0.038,
          "maxPriorityFeePerGas": 0.037,
          "maxFeePerGas": 0.037
        },
        {
          "confidence": 70,
          "price": 0.033,
          "maxPriorityFeePerGas": 0.033,
          "maxFeePerGas": 0.033
        }
      ]
    }
  ]
}
```

## Developer Resources
- [Gas Network Docs](https://docs.blocknative.com/gas-prediction/gas-platform)
- [Join the blocknative Discord](https://discord.gg/XtaWuPAFPv)
- [GitHub](https://github.com/blocknative)
- [Gas network website](https://gas.network/)



