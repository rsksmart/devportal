---
sidebar_position: 3
sidebar_label: Router Protocol
title: Router Protocol
description: "Router Protocol enables developers to seamlessly interact with multiple blockchain networks, facilitating cross-chain transactions and decentralized finance (DeFi) solutions. " 
tags: [cross chain, bridges, developer tools, rsk, testnet, rootstock, ethereum, dApps, smart contracts]
---

Router Protocol enables developers to seamlessly interact with multiple blockchain networks, facilitating cross-chain transactions and decentralized finance (DeFi) solutions. To begin working with Router Protocol, you’ll need to understand some basic concepts and set up your development environment.

## Key Concepts  

This section introduces the foundational elements and architecture of the **Crosstalk Framework**, providing insights into its structure and critical features.  

### **1. High-Level Architecture**  
The **Crosstalk Framework** enables easy cross-chain communication and interoperability across multiple blockchain networks. Its architecture consists of the following core components:  
- **Message Relayers**: Facilitate secure data and transaction transfers between different blockchain ecosystems.  
- **Smart Contracts**: Handle cross-chain logic, including state synchronization and the execution of NFT transfers.  
- **Router Infrastructure**: Serves as the central hub for communication, transaction routing, and data relaying across networks.  

### **2. Fee Management**  
Effective fee management is a critical feature of the Crosstalk Framework, ensuring transparent and efficient handling of transaction costs:  
- **Fee Payer Account**: Each dApp integrates a designated fee payer account on the Router Chain to handle fees for cross-chain requests. This account, configurable per chain, can be updated at any time to adapt to changes.  
- **Gas Considerations**:  
  - Developers must provide **gasPrice** and **gasLimit** in the metadata of their CrossTalk requests to ensure successful execution on the destination chain.  
  - If **gasPrice** is omitted, the Router Chain's gas price oracle automatically estimates it.  
- **Prepaid Fee Model**:  
  - Fees are calculated upfront in ROUTE tokens when a CrossTalk request is initiated.  
  - This ensures the transaction on the destination chain has adequate funds for successful execution.  


### **3. Additional Security Modules (ASM)**  
To ensure robust security, the Crosstalk Framework incorporates Additional Security Modules (ASM), offering:  
- **Fraud Detection**: Proactively detects and mitigates suspicious activities to protect the integrity of cross-chain interactions.  
- **Fail-Safe Mechanisms**: Automatically pauses or cancels operations when potential security threats are identified, safeguarding user transactions.  


## Build your first iDapp
Creating your first interoperable decentralized application (iDapp) with Router Protocol is a straightforward two-step process:

- [Create Your Cross-Chain NFT Contract](https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/evm-guides/your-first-crosschain-nft-contract/creating-your-nft-contract/)
- [Deploy and Test Your NFT Contract](https://docs.routerprotocol.com/develop/message-transfer-via-crosstalk/evm-guides/your-first-crosschain-nft-contract/deploying-your-nft-contract/)


<Button size="sm" href="https://docs.routerprotocol.com/">Try Router Protocol</Button>