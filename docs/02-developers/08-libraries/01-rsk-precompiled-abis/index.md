---
title: Pre-compiled ABIs
tags: [libraries, abi, pre-compiled]
sidebar_label: Pre-compiled ABIs
sidebar_position: 100
description: "Rootstock Pre-compiled ABIs."
---

Here you will find the ABIs for the existing precompiled contracts in Rootstock. You will also get their addresses and a builder to use it with web3.js.

## Versions

Different versions of the package mentioned are required for different Rootstock releases.

The semantic versioning of this package doesn’t correlate to the semantic versioning of Rootstock. For each named release of the RSKj node, there will be a corresponding name version in npm.

This package's support starts with `ORCHID`.

## Usage

For the installation of these package you must execute in a terminal window:

```shell
npm install @rsksmart/rsk-precompiled-abis@<version>
```

As an example to define and use it:

1. Include the Web3 package.

```javascript
const Web3 = require('web3');
```

2. Include the `rsk-precompiled-abis` package.

```javascript
const precompiled = require('@rsksmart/rsk-precompiled-abis');
```

3. Create an instance of the contract using package build method and Web3 as a parameter.

(i.e.: using the Bridge)

```shell
var bridge = precompiled.bridge.build(new Web3('http://localhost:4444'));
```

4. Use a contract's method. For example, here we call `getFederationAddress`, and displays its result in the console.

```shell
bridge.methods.getFederationAddress().call().then(console.log);
```

:::note[Important]
If the version to be installed is not defined in the command line, the version will correspond to the latest version in [rskj releases page](https://github.com/rsksmart/reproducible-builds/tree/master/rskj).
:::

## Versioning table

| Package Version  | Rootstock version |
|------------------|-------------------|
| 1.0.0-ORCHID     | ORCHID-0.6.2      |
| 2.0.0-WASABI     | WASABI-1.0.0      |
| 2.0.1-WASABI     | WASABI-1.0.0      |
| 3.0.0-PAPYRUS    | PAPYRUS-2.0.0     |
| 3.0.0-PAPYRUS    | PAPYRUS-2.2.0     |
| 3.0.0-IRIS       | IRIS-3.0.0        |
| 3.1.0-IRIS       | IRIS-3.1.0        |
| 3.2.0-IRIS       | IRIS-3.2.0        |
| 3.3.0-IRIS       | IRIS-3.3.0        |
| 4.0.0-HOP        | HOP-4.0.0         |
| 4.1.0-HOP        | HOP-4.1.0         |
| 4.1.1-HOP        | HOP-4.1.1         |
| 4.2.0-HOP        | HOP-4.2.0         |
| 4.3.0-HOP        | HOP-4.3.0         |
| 4.4.0-HOP        | HOP-4.4.0         |
| 5.0.0-fingerroot | FINGERROOT-5.0.0  |
| 5.1.0-fingerroot | FINGERROOT-5.1.0  |
| 5.2.0-fingerroot | FINGERROOT-5.2.0  |
| 5.3.0-fingerroot | FINGERROOT-5.3.0  |
| 5.4.0-fingerroot | FINGERROOT-5.4.0  |
| 6.0.0-ARROWHEAD  | ARROWHEAD-6.0.0   |
| 6.3.0-ARROWHEAD  | ARROWHEAD-6.3.0   |
| 6.3.1-ARROWHEAD  | ARROWHEAD-6.3.1   |
| 6.4.0-ARROWHEAD  | ARROWHEAD-6.4.0   |
| 6.5.0-ARROWHEAD  | ARROWHEAD-6.5.0   |
| 6.5.1-ARROWHEAD  | ARROWHEAD-6.5.1   |
| 7.0.0-LOVELL     | LOVELL-7.0.0      |
