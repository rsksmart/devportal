---
sidebar_position: 6
title: Blast API
sidebar_label: Blast API
tags: [rsk, rootstock, resources, tutorials,  setup, dApps, protocol, Blast API]
description: "Remote Procedure Call (RPC) is a protocol that allows a program to execute procedures (functions) on a remote server as if they were local calls."
---  

Blast API is a Blockchain-optimized cloud infrastructure for low-latency, cost-effective RPC services on Rootstock.

## **Getting Started with Blast API**  

<Steps>
  <Step title="Sign Up and Get an API Key">
   - Create an account on [Blast API](https://blastapi.io/login).  
   - Generate your API key from the dashboard.  

  </Step>
<Step title="Make Example cURL Request to get eth_blockNumber">
   Here’s a sample request to get eth_blockNumber:  
    ```curl
    curl -X POST https://rootstock-mainnet.public.blastapi.io -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":0,"method":"eth_blockNumber"}'
    ```  

    Response:
    ```curl
    {
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x6b04c8"
    }
    ```
  </Step>
</Steps>

<Button href="https://blastapi.io/chains/rootstock">Get Free API</Button>