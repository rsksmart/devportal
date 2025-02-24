---
sidebar_position: 2
title: dRPC
sidebar_label: dRPC
tags: [rsk, rootstock, resources, tutorials,  setup, dRPC, dApps, BaaS, RPC, API]
description: "dRPC is a next-generation RPC platform that simplifies and optimizes communication with blockchain nodes. Built for Web3, dRPC provides low-latency, high-reliability access to blockchain data and operations."
---

[dRPC](https://www.drpc.org) is a next-generation RPC platform that simplifies and optimizes communication with blockchain nodes. Built for Web3, dRPC provides low-latency, high-reliability access to blockchain data and operations.  

### Why Choose dRPC?  
- **High Performance:** Optimized for speed and low latency.  
- **Decentralized:** Built for scalability and resilience.  
- **Cross-Blockchain Support:** Interact with multiple blockchain ecosystems.  
  

## Supported Blockchains  
dRPC supports various blockchain networks, including:  
- Ethereum  
- Binance Smart Chain  
- Polygon  
- Solana  
- Avalanche  

## Protocols  
- **JSON-RPC**  
- **REST**  
- **WebSocket**  


## **Getting Started with dRPC API**  

<Steps>
  <Step title="Sign Up and Get an API Key">
   - Create an account on [dRPC Website](https://www.drpc.org).  
   - Generate your API key from the dashboard.  

  </Step>
  <Step title="Configure Your Endpoint">
   Use the base URL for the desired blockchain network:  
   - **Ethereum Mainnet:**  
  ```
  https://eth-mainnet.drpc.org/YOUR_API_KEY
  ```  
   - **Binance Smart Chain Testnet:**  
  ```
  https://bsc-testnet.drpc.org/YOUR_API_KEY
  ```  
  </Step>
  <Step title="Example API Call">
   Here’s a sample request to fetch the latest block number on Ethereum:  
```json
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```  
  </Step>
</Steps>


## **Make Your First Call**  
 
<Steps>
  <Step title="Open an API client like Postman or curl">
  This will enable you test your API
  </Step>
  <Step title="Use the Ethereum Mainnet endpoint as an example: ">
     ```bash
   https://eth-mainnet.drpc.org/YOUR_API_KEY
   ```  
  </Step>
  <Step title="Send the following JSON-RPC request:">
    ```json
   {
     "jsonrpc": "2.0",
     "method": "eth_getBalance",
     "params": ["0xYourEthereumAddress", "latest"],
     "id": 1
   }
   ```  
  </Step>
  <Step title="You’ll receive a response like this:">
     ```json
   {
     "jsonrpc": "2.0",
     "result": "0x0234c8a3397aab58",
     "id": 1
   }
   ```  
   
The `result` field contains the balance in Wei (smallest Ether unit).  
:::note[Info]

 To learn more about the dRPC connection with Rootstock, including code snippets, RPC endpoints, and a step-by-step guide on adding Rootstock Mainnet to MetaMask using dRPC,  click the button below:

<Button href="https://drpc.org/chainlist/rootstock?utm_source=docs&utm_medium=rootstock" align="left">dRPC Website</Button>

:::

  </Step>
</Steps>


## **Advanced Features**  

### Batch Requests  
Efficiently send multiple queries in a single request:  
```json
[
  { "jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1 },
  { "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xYourAddress", "latest"], "id": 2 }
]
```  

### WebSocket Subscriptions  
Subscribe to live events like new blocks or logs:  
```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscribe",
  "params": ["newHeads"],
  "id": 1
}
```  

### REST Endpoints  
For developers preferring REST over JSON-RPC, dRPC offers RESTful APIs for common operations:  
```
GET https://eth-mainnet.drpc.org/v1/account/0xYourEthereumAddress/balance
```  
