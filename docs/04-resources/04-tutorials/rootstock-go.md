---
title: Interact with Rootstock using Go
sidebar_label: Interact with Rootstock using Go
sidebar_position: 2
tags: [rsk, rootstock, go, golang, go-ethereum, tutorials, resources, smart contracts]
description: "Go is an easy to learn language which combines speed and concurrency. It is widely used in web3 development, especially in the ethereum ecosystem. This guide will help developers read from and write to the Rootstock blockchain using Go."
---

Go is a fast language with a comparatively simple syntax and is especially popular in backend and DevOps operations.
<br/>This guide will walk you through reading data from and writing data to the Rootstock blockchain with Go, taking advantage of Rootstock's Ethereum compatibility using the [`go-ethereum`](https://geth.ethereum.org) package.


## Prerequisites
- Go
    - Install the latest version of Go from [the official website](https://go.dev/).
    To confirm it is installed, run the following command on your terminal. It should provide a valid output with your current go version. The version used in this tutorial is `1.24.1`.
    ```bash
    go version
    ```
- Valid Rootstock wallet (with test RBTC from a [faucet](https://dev.rootstock.io/dev-tools/additional-tools/#faucets)) and [API key](https://dev.rootstock.io/developers/rpc-api/rootstock/setup/)



## Getting Started
Create a new folder for the project, Rootstock-go. Enter that folder and initialize the project from the command line.
```bash
go mod init Rootstock-go
```
This creates a `go.mod` file in the root directory, which holds your project's dependencies.

Install the [`go-ethereum`](https://geth.ethereum.org/) package.
<br/>Go-ethereum is a library that contains useful helpers for interacting with evm-compatible blockchains such as Rootstock.
```bash
go get github.com/ethereum/go-ethereum
```
This adds the go-ethereum package to your `go.mod` file and automatically generates a `go.sum` file to the same directory, which stores extra data about your project's dependencies.

```go
// go.mod
module Rootstock-go

go 1.24.1

require github.com/ethereum/go-ethereum v1.15.5
```

:::info[Info]
Observe the changing imports as you paste the code.
:::

## Connect to a Rootstock node
To confirm that we are actually connected to the Rootstock network, we can write code to retrieve data from the blockchain, in this case, get the latest block.
Create a `main.go` file in the same directory and paste this code inside it.
<br/>Replace `YOUR-RPC-API-KEY` with your actual Testnet RPC API key.

```go
//main.go
package main

import (
	"context"
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	rpcURL := "https://rpc.testnet.rootstock.io/YOUR-RPC-API-KEY"

	// Set up the RPC connection
	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatal("Failed to connect to Ethereum node:", err)
	}
	defer client.Close()

	// Fetch the latest block number
	blockNumber, err := client.BlockNumber(context.Background())
	if err != nil {
		log.Fatal("Failed to get block number:", err)
	}

	fmt.Println("Latest block number:", blockNumber)
}
```
Open a terminal in your current folder and run the code. This displays the latest block in the Rootstock Testnet.
<br/>Run it again after a few seconds to confirm that the block number increases as expected.
```bash
go run main.go
```
Response:
```bash
Latest block number: 6200751
```

:::info[Info]
In case of an error related to a missing package (`Error: Missing go.sum entry for module...`), see [troubleshooting section](#troubleshooting).
:::

## Get RBTC balance
Confirm the balance from other sources such as your Metamask wallet to ensure accuracy. Replace `0xMY-WALLET-ADDRESS` with your wallet address.
It is important that your account has some RBTC on it in case you would like to [write to the blockchain](#interacting-with-smart-contracts).


Replace the code in `main.go` with the following.
```go
package main

import (
	"context"
	"fmt"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	rpcURL := "https://rpc.testnet.rootstock.io/YOUR-RPC-API-KEY"

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatal("Failed to connect to Ethereum node:", err)
	}
	defer client.Close()

	myWallet := common.HexToAddress("0xMY-WALLET-ADDRESS")

	rbtcBalance, err := client.BalanceAt(context.Background(), myWallet, nil)
	if err != nil {
		log.Fatal("Failed to get RBTC balance:", err)
	}

    // Convert from big Int to a float with 6 decimal places
	f := new(big.Float).SetInt(rbtcBalance)
	formattedBalance := new(big.Float).Quo(f, big.NewFloat(1e18)).Text('f', 6)
	fmt.Println("My RBTC Balance:", formattedBalance)
}
```
Run the code to view your wallet balance on the terminal.
```bash
go run main.go
```
Response:
```bash
My RBTC Balance: 0.000718
```

## Interacting With Smart Contracts
Smart contrats generally have two kinds of functions, those which modify the blockchain and those which do not. For both cases, the contract ABI still needs to be provided.
- If a function does not modify the state of the blockchain but only reads from it, there is no need to provide your wallet address because no transaction is involved. <br/>This includes cases such as reading data from an erc20 token contract to check your token balance or checking if a certain account owns a specified NFT.
- If a function changes the data in the blockchain, a transaction is involved to execute the function, and miners need to be compensated for the process by paying gas fees in RBTC. Your wallet address is needed for this so that the gas fees can be paid from your balance.
<br/>Operations that change the state of the blockchain include sending some of your erc20 tokens to another user or minting an NFT.

<br/>Here is the simple smart contract which will be used for the operations below.

You can use the deployed contract address provided in the code. It is currently deployed on the Rootstock Testnet.
You can also deploy your own smart contract using various [smart contract development guides](https://dev.rootstock.io/developers/smart-contracts/) with tools like [foundry](https://dev.rootstock.io/developers/smart-contracts/foundry/deploy-smart-contracts/), [hardhat](https://dev.rootstock.io/developers/smart-contracts/hardhat/deploy-smart-contracts/), [Rootstock CLI](https://dev.rootstock.io/developers/smart-contracts/rsk-cli/deploy-with-cli/), among others.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Storage {
    uint256 number;

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256){
        return number;
    }
}
```
There are two functions in the contract, one to store a number on the blockchain, `function store` (changes state, involves a transaction), another to retrieve the stored number `function retrieve`(no transaction).
The ABI is provided below.
```javascript
[
  {
    "type": "function",
    "name": "retrieve",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "store",
    "inputs": [
      {
        "name": "num",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]
```

### Read from the Contract
Paste the code below into `main.go`.
```go
package main

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

const storageABI = `[
  {
    "type": "function",
    "name": "retrieve",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "store",
    "inputs": [
      {
        "name": "num",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]`

func main() {
	rpcURL := "https://rpc.testnet.rootstock.io/YOUR-API-KEY"

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatal("Failed to connect to Ethereum node:", err)
	}
	defer client.Close()

	contractAddress := common.HexToAddress("0x8b1Fc84e39B396528431FF97010bF51e458E202d")

	parsedABI, err := abi.JSON(strings.NewReader(storageABI))
	if err != nil {
		log.Fatal("Failed to parse ABI:", err)
	}

	callData, err := parsedABI.Pack("retrieve")
	if err != nil {
		log.Fatal("Failed to pack retrieve call:", err)
	}

	msg := ethereum.CallMsg{
		To:   &contractAddress,
		Data: callData,
	}
	result, err := client.CallContract(context.Background(), msg, nil)
	if err != nil {
		log.Fatal("Failed to call contract:", err)
	}

	output, err := parsedABI.Unpack("retrieve", result)
	if err != nil {
		log.Fatal("Failed to unpack result:", err)
	}

	storedNumber := output[0].(*big.Int)
	fmt.Println("Stored Number:", storedNumber)
}
```
```bash
go run main.go
```
Response:
```bash
Stored Number: 3
```

### Send data to the contract
This is a bit more complex than reading from a contract because [it involves a transaction](#interacting-with-smart-contracts) for which gas fees must be paid.
<br/>Your wallet's private key will be needed for the next step.

Replace the code in your `main.go` with the following.
```go
package main

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

const storageABI = `[
  {
    "type": "function",
    "name": "retrieve",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "store",
    "inputs": [
      {
        "name": "num",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
]`

func main() {
	rpcURL := "https://rpc.testnet.rootstock.io/YOUR-RPC-API-KEY"

	client, err := ethclient.Dial(rpcURL)
	if err != nil {
		log.Fatal("Failed to connect to Ethereum node:", err)
	}
	defer client.Close()

	contractAddress := common.HexToAddress("0x8b1Fc84e39B396528431FF97010bF51e458E202d")

	parsedABI, err := abi.JSON(strings.NewReader(storageABI))
	if err != nil {
		log.Fatal("Failed to parse ABI:", err)
	}

    // Without 0x prefix
	privateKey, err := crypto.HexToECDSA("YOUR-PRIVATE-KEY")
	if err != nil {
		log.Fatal("Failed to load private key:", err)
	}

	senderAddress := crypto.PubkeyToAddress(privateKey.PublicKey)

	nonce, err := client.PendingNonceAt(context.Background(), senderAddress)
	if err != nil {
		log.Fatal("Failed to get nonce:", err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, big.NewInt(31))
	if err != nil {
		log.Fatal("Failed to create authorized transactor:", err)
	}

	storeData, err := parsedABI.Pack("store", big.NewInt(3))
	if err != nil {
		log.Fatal("Failed to pack store call:", err)
	}

	// Estimate gas.
	gasLimit, err := client.EstimateGas(context.Background(), ethereum.CallMsg{
		To:   &contractAddress,
		Data: storeData,
	})
	if err != nil {
		log.Fatal("Failed to estimate gas:", err)
	}

	// Get current gas price
	gasPrice, err := client.SuggestGasPrice(context.Background())
	if err != nil {
		log.Fatal("Failed to fetch gas price:", err)
	}

	// Create and send transaction
	tx := types.NewTransaction(
		nonce, contractAddress, big.NewInt(0), gasLimit, gasPrice, storeData,
	)

	signedTx, err := auth.Signer(auth.From, tx)
	if err != nil {
		log.Fatal("Failed to sign transaction:", err)
	}

	err = client.SendTransaction(context.Background(), signedTx)
	if err != nil {
		log.Fatal("Failed to send transaction:", err)
	}

	fmt.Println("Transaction sent! Hash:", signedTx.Hash().Hex())
}
```
Run the code.
```bash
go run main.go
```

:::warning[Warning]
Gas estimation may fail and show an error similar to the one below.

Response:
```bash
Failed to estimate gas:VM Exception while processing transaction: transaction reverted
exit status 1
```
In case that happens, you need to manually set a higher estimated gas price in the code above. Unused gas is refunded.
<br/>Comment out this part of the code.
```go
// Estimate gas.
	gasLimit, err := client.EstimateGas(context.Background(), ethereum.CallMsg{
		To:   &contractAddress,
		Data: storeData,
	})
	if err != nil {
		log.Fatal("Failed to estimate gas:", err)
	}
```
Replace it with a hardcoded value such as the one below
```go
// Estimate gas
 	gasLimit := uint64(100000)
```
:::

If you get a transaction hash as the output, that means the transaction went through.

Response:
```bash
Transaction sent! Hash: 0x5658d438fb900b070df70f7298ab2d666926d051a38ec4bb16a89e3915bd1b1f
```
Search the transaction hash in the respective [block explorer](https://dev.rootstock.io/dev-tools/explorers/rootstock/) for a more detailed result of the execution.


## Troubleshooting
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">missing go.sum entry for module providing package...</Accordion.Header>
    <Accordion.Body>
    ../../../go/pkg/mod/github.com/ethereum/go-ethereum@v1.15.5/rpc/websocket.go:30:2: missing go.sum entry for module providing package github.com/deckarep/golang-set/v2 (imported by github.com/ethereum/go-ethereum/rpc);
    
    run the following :
	```bash
	go mod tidy
	``` 
	then
	```bash
	go run main.go
	```
    </Accordion.Body>
  </Accordion.Item>
</Accordion>






