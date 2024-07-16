---
title: RIF Wallet Libraries
tags: [rif-wallet, rif, rootstock, wallet, libraries]
sidebar_label: RIF Wallet Libraries
sidebar_position: 200
description: "RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets."
---

RIF Wallet Libraries contain a set of packages that is used by the RIF Wallet. You can install the RIF Wallet Libraries directly from inside the app. For more information, visit the [RIF Wallet Lib Repo](https://github.com/orgs/rsksmart/packages?repo_name=rif-wallet-libs).

## Packages

### RIF Wallet Core

The [RIF Wallet Core](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-core) is the wallet library that connects the UI with the RIF Relay SDK. This class accepts an Ethers Signer that handles the majority of crypto methods, such as creating a Wallet, sign tx or message, estimate gas, send transactions and deploy the smart wallets.

The `onRequest` function is where the UX handles the transaction or interaction. A transaction is sent to the RIFWallet then passed to the onRequest method. At this point, the UX can prompt the user to click 'accept' or 'deny'. This means that the wallet can be injected into WalletConnect, and injectedBrowser or used via the UX and when a transaction comes in, it will always prompt the user to accept or deny the action.

See the [README](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-core) for more information.

### RIF Wallet Types

The [RIF Wallet Types](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-types) common types package.

See how to run for development and tests in the [README](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-types).

### RIF Wallet ABI Enhancer

The [ABI Enhancer](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-abi-enhancer) package attempts to decode a transaction into a human readable format. There are different strategies for decoding:
* rBTC Transaction - where the data is 0x and the transaction is sending gas from one account to another.
* ERC20 (and variants) Transaction - sending a token from one user to another. In this case the recipient and amount is located in the data field.
* Other Transaction - A contract call interaction. In this case, it queries the publicly available list of known method types and attempts to decode it. In this case, the transaction details are not transformed.

See more information in the [README](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-abi-enhancer).

### Key Management System

The [RIF Wallet Key Management System](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-kms) library. 

### Bitcoin Library 

The RIF Wallet [Bitcoin Library](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-bitcoin) is a library to handle receiving and sending bitcoin in React Native.
See Basic Setup and How to Use in the [RIF Wallet Bitcoin README](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-bitcoin).

### RIF Relay Client SDK

This `rif-relay-light-sdk` is a [light implementation](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-relay-light-sdk) of the client RIF Relay SDK built using ethers and used in the RIF Wallet.

See Basic setup, how to deploy the smart wallet, and how to estimate and relay a transaction in the [README](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-relay-light-sdk).

### RIF Wallet Token

The [RIF Wallet Token](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-token) package contains simple classes for ERC20, ERC677, and rBTC assets/tokens. It includes the ABI for ERC20 and ERC677.

### RIF Wallet EIP681

The [RIF Wallet EIP681](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-eip681)  is a basic and incomplete implementation of [EIP681, URL Format for Transaction Requests](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-681.md). 

See the [README](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-eip681) for more information.

### RIF Wallet Services

This [RIF Wallet Services](https://github.com/rsksmart/rif-wallet-libs/pkgs/npm/rif-wallet-services) library is responsible for mapping all the endpoints available and making the socket connection in rif-wallet-services (backend).