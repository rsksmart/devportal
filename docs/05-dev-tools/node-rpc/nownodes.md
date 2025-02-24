---
sidebar_position: 4
title: NowNodes
sidebar_label: NowNodes
tags: [rsk, rootstock, resources, tutorials,  setup, dApps, BaaS, API, Nodes, NowNodes]
description: "
NowNodes is a Blockchain-as-a-Service (BaaS) platform offering API access to over 50 blockchain networks. It allows developers to connect to full nodes and explore blockchains with minimal setup. "
---

NowNodes is a Blockchain-as-a-Service (BaaS) platform offering API access to over 50 blockchain networks. It allows developers to connect to full nodes and explore blockchains with minimal setup.  

## Why Choose NowNodes?  
- **Wide Blockchain Support:** Access popular blockchains like Bitcoin, Ethereum, Binance Smart Chain, and more.  
- **Free Tier Available:** Start for free with limited API requests.  
- **Reliable Infrastructure:** High uptime and fast response times.  


## Supported Blockchains  
NowNodes supports over 50 blockchains, including:  
- **Bitcoin (BTC)**  
- **Ethereum (ETH)**  
- **Binance Smart Chain (BSC)**  
- **Polygon (MATIC)**  
- **Dogecoin (DOGE)**  

## Supported Protocols  
- **JSON-RPC**: For comprehensive blockchain interaction.  
- **REST**: Simplified HTTP-based requests.  
- **WebSocket**: For real-time blockchain event subscriptions.  



## **Getting Started with NowNodes API**  

### 1. Sign Up and Get an API Key  
- Register at [NowNodes.io](https://nownodes.io).  
- Select the plan that fits your needs
- Generate an API key.  

### 2. Configure Your Endpoint  
Use the following base URLs for API requests:  
- **Bitcoin Mainnet:**  
  ```
  https://btc.nownodes.io/YOUR_API_KEY
  ```  
- **Ethereum Mainnet:**  
  ```
  https://eth.nownodes.io/YOUR_API_KEY
  ```  

### 3. Example API Calls  
#### JSON-RPC: Fetch the latest block number on Ethereum  
```json
{
  "jsonrpc": "2.0",
  "method": "eth_blockNumber",
  "params": [],
  "id": 1
}
```  

:::note[Info]

 To learn more about the NowNodes connection with Rootstock  click the button below:
 
<Button href="https://nownodes.io/nodes/rsk" align="left">Rootstock NOWNode Website</Button>

:::

#### REST: Retrieve account balance on Bitcoin  
```bash
GET https://btc.nownodes.io/v1/balance/your-address?api_key=YOUR_API_KEY
```  



## **Make Your First Call**  

### Step-by-Step Guide  
1. Open a terminal or API client (e.g., Postman, curl).  
2. Use the Bitcoin Mainnet endpoint as an example:  
   ```bash
   https://btc.nownodes.io/v1/YOUR_API_KEY
   ```  
3. Send a request to fetch the latest block hash:  
   ```json
   {
     "jsonrpc": "1.0",
     "method": "getbestblockhash",
     "params": [],
     "id": "1"
   }
   ```  
4. You’ll receive a response like this:  
   ```json
   {
     "result": "0000000000000000000b1c5e6b6e7bcd9fa47b6d13a20b6eac03c76a66b4f3ad",
     "id": "1"
   }
   ```  