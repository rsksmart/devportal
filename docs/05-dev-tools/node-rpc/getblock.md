---
sidebar_position: 3
title: GetBlock
sidebar_label: GetBlock
tags: [rsk, rootstock, resources, tutorials,  setup, BaaS, API, getBlock]
description: "GetBlock is a Blockchain-as-a-Service platform providing API access to full blockchain nodes. It allows developers to interact with blockchains using JSON-RPC, REST, and WebSocket protocols. "
---

GetBlock is a Blockchain-as-a-Service platform providing API access to full blockchain nodes. It allows developers to interact with blockchains using JSON-RPC, REST, and WebSocket protocols.  

## Why Choose GetBlock?  
- **Broad Blockchain Support:** Access Ethereum, Bitcoin, Binance Smart Chain, Solana, and more.  
- **High Availability:** Enterprise-grade reliability with 99.95% uptime.  
- **Scalable Solutions:** Pay-as-you-go plans tailored to your project size.  


## Supported Protocols  
GetBlock supports these protocols for interacting with blockchain nodes:  
- **JSON-RPC**  
- **REST**  
- **WebSocket**  

## Key Blockchain Networks  
- **Ethereum** (`eth-mainnet`, `eth-goerli`)  
- **Bitcoin** (`btc-mainnet`, `btc-testnet`)  
- **Binance Smart Chain** (`bsc-mainnet`, `bsc-testnet`)  
- **Polygon** (`matic-mainnet`, `matic-testnet`)  


## **Getting Started with GetBlock API**  

### 1. Sign Up and Get an access Token  
- Create an account at [GetBlock.io](https://getblock.io).  
- Generate an [access token](https://getblock.io/docs/get-started/auth-with-access-token/) from your dashboard.  

### 2. Configure Your Endpoint  
- Base URL:  
  ```
  https://{blockchain}.getblock.io/mainnet/YOUR_API_KEY/
  ```  
  Replace `{blockchain}` with the desired blockchain name (e.g., `eth`).


## **Make Your First Call**  

1. Use a tool like Postman.  
2. Use the Ethereum endpoint as an example:  
   ```bash
   https://go.getblock.io/<ACCESS_TOKEN>/
   ```  
3. Send the following JSON request to fetch the current block number:  
   ```json
   {
     "jsonrpc": "2.0",
     "method": "eth_blockNumber",
     "params": [],
     "id": 1
   }
   ```  
4. You’ll receive a response like:  
   ```json
   {
     "jsonrpc": "2.0",
     "method": "eth_blockNumber",
     "params": [],
     "id": 1
   }
   ```  
   > The `result` field contains the current block number in hexadecimal format.  

:::note[Info]

 To learn more about the getBlock connection with Rootstock, including code snippets, RPC endpoints,  click the button below:
 
<Button href="https://getblock.io/nodes/rsk/" align="left">Rootstock GetBlock Website</Button>

:::

## **Advanced Features**  

### Batch Requests  
Send multiple requests in a single API call for efficiency:  
```json
[
  { "jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1 },
  { "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xAddress", "latest"], "id": 2 }
]
```  

### Real-Time Updates with WebSocket  
Subscribe to Ethereum new block events:  
```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newHeads"],
  "id": 1
}
```  