---
sidebar_label: Hackathons 
sidebar_position: 7
title: Hackathon and Workshop Resources
tags: [hackathons, rsk, workshop, resources, rootstock]
description: "Hackathon resources and tools"
---

This guide details the necessary hardware and software requirements for developing on the Rootstock blockchain. 

It includes setup instructions for essential tools such as Java, Node.js, Hardhat, and RSKj, ensuring developers have a clear path to prepare their environment for Rootstock projects, whether for local development, testing, or deployment. 

For IRL hackathons and events, use the [Developer Cheatsheet](/cheatsheet/) (network setup, starter kits, and QR-friendly quick reference). Check compiler and opcode support in the [EVM Compatibility Explorer](https://rskj-evm-compatibility.rsk.co/) before workshops.

## Prerequisites

This guide is designed to help both beginners and experienced developers get started with building on Rootstock. Pick the section that matches your skill level.

### Beginners

If you are new to blockchain development, start here. These are the skills and tools you need to begin.

1. **Basic Programming Knowledge**  
   Familiarity with programming languages like **JavaScript** or **Python** will be helpful, even if you are new to blockchain development.
2. **Understanding Blockchain Basics**  
   Learn about **blockchain technology**, **smart contracts**, and **dApps** before diving in. Start with [blockchain essentials](/developers/blockchain-essentials/overview/).
3. **Intro to Web3 Development Tools**  
   A basic understanding of tools like **Remix IDE** for smart contract development will make the rest of this path easier. See the [Remix quickstart](/developers/quickstart/remix/).
4. **Version Control with Git** *(Optional)*  
   Basic **Git** and **GitHub** skills help you manage projects and collaborate.

Start building your first dApp with the [Hardhat Quickstart](/developers/quickstart/hardhat/).

### Experienced Developers

If you already have a background in blockchain or Web3 development, skip ahead to advanced topics and the tools available on Rootstock.

1. **Knowledge of Blockchain and Smart Contracts**  
   You should be comfortable with [blockchain principles](https://rootstock.thinkific.com/courses/blockchain-dev-course/) and **decentralized networks**.
2. **Experience with Web3 Development Tools**  
   Tools like **Hardhat**, **Web3.js**, and **Remix IDE** should be part of your existing toolkit.
3. **Basic Programming Skills**  
   Proficiency in **Solidity** and other Web3-related languages (like **JavaScript/React** or **Python/Web3.py**) will be beneficial.
4. **Familiarity with ERC Standards**  
   Understanding **ERC20**, **ERC721**, and **ERC1155** standards for token contracts will be valuable.
5. **Advanced Topics** *(Optional)*  
   Knowledge of **account abstraction**, automation frameworks like **Cucumber**, and other advanced Web3 concepts can help you explore more sophisticated solutions.

Access the [Guide for Experienced Developers](/developers/quickstart/) to get started.


## Tools to Speed Up Your Development

These tools will make it easy for you to build on Rootstock:

- **[Remix IDE](/developers/quickstart/remix/)**: An integrated development environment tailored for smart contract development.
- **[Hardhat](/developers/quickstart/hardhat/)**: A flexible development environment for building and deploying smart contracts.
- **[Web3.py](/developers/quickstart/web3-python/)**: JavaScript and Python libraries for interacting with the Ethereum blockchain.
- **[Rootstock Explorer](https://explorer.testnet.rootstock.io/)**: A blockchain explorer to view transaction details on the Rootstock network.
- **[RPC API](/developers/rpc-api/)**: The RPC API provides a seamless and intuitive web interface for developers to interact with Rootstock nodes via JSON-RPC methods.
- **[Faucets](/dev-tools/additional-tools/#faucets)**: Get test RBTC tokens for development and testing.

Explore the [full list of tools and libraries](/dev-tools/) available on Rootstock.

:::tip[Prerequisites page]

For more information on specific requirements for developing on Rootstock, Visit the [Prerequisites page](/developers/requirements/) page.

:::


<Card
  title="Rootstock Hackathon Cheatsheet"
  description="The Rootstock Hackathon Cheatsheet is a concise reference guide for developers aiming to deploy decentralized applications (dApps) on the Rootstock network."
  link="/cheatsheet/"
/>

<br></br>

## Starter Kits

| Quickstart Kits/Sections                                      | Description                                                                                             | Prerequisites                                                      | Action                     |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|----------------------------|
| **Wagmi Starter Kit**                                          | This starter kit provides a foundation for building decentralized applications (dApps) on the Rootstock blockchain using React, Wagmi, and Shadcn libraries. | Basic understanding of React and Web3.js.                           | [Use the Kit](/developers/quickstart/wagmi/)               |
| **Dynamic Starter Kit**                                          | The Rootstock Dynamic Starter Kit uses the wagmi library for faster integration of Web3 features into a Next.js application. It uses Wagmi hooks, ability to connect to wallets, retrieve balances, transfer tokens, and sign messages.|    Basic understanding of React, Web3.js and Next.js.                           | [Use the Kit](/developers/quickstart/dynamic/)               |
| **Hardhat Starter Kit**                                        | Smart Contract examples, Tests, Deployments, and Tasks for Common ERC Standards (ERC20, ERC721, ERC1155).| Familiarity with Hardhat, Solidity, and ERC standards              | [Use the Kit](/developers/quickstart/hardhat/)                |
| **Account Abstraction Kit**                                    | Account Abstraction Starter dApp using Etherspot.                                                        | Knowledge of account abstraction and Etherspot                     | [Use the Kit](/developers/quickstart/rootstock-etherspot/)                |
| **Reown Starter Kit**                                    | Basic Understanding of React and Solidity                                                       |          Handle wallet management, Wagmi, a React Hooks library, to simplify smart contracts and blockchain network interactions, and Shadcn libraries, a set of customizable and accessible UI components for React, designed to streamline frontend development.            | [Use the Kit](/developers/quickstart/privy/)                |
| **Privy Starter Kit**                                    | Basic Understanding of React and Solidity                                                        |          Onboard users with social logins and self custodial wallets while preserving control, privacy, and flexibility for dApps when building on Rootstock.            | [Use the Kit](/developers/quickstart/privy/)                |
| **dApp Automation with Cucumber**                              | Learn how to automate dApps using Cucumber Agile Automation Framework.                                   | Basic understanding of automation frameworks like Cucumber         | [Automate dApps](/resources/tutorials/dapp-automation-cucumber/)             |
| **RIF Relay Starter Kit**                                      | Starter kit to develop on RIF Relay.                                                                     | Understanding of RIF Relay and smart contracts                     | [Use the Kit](/developers/integrate/rif-relay/sample-dapp/)                    |
| **Get Started with The Graph**                                 | Easily query on-chain data through a decentralized network of indexers.                                  | Familiarity with querying on-chain data and The Graph protocol      | [Get Started](/dev-tools/data/thegraph/)                |
| **Get Started with Web3.py**                                   | Get started with deploying and interacting with smart contracts on Rootstock using Web3.py.              | Knowledge of Python and Web3.py                                    | [Get Started](/developers/quickstart/web3-python/)               |
| **Port an Ethereum dApp to Rootstock**                         | Learn how to port an Ethereum dApp to Rootstock.                                                         | Experience with Ethereum dApp development                          | [Get Started](/resources/port-to-rootstock/ethereum-dapp/)               |
| **Deploy, Interact and Verify Smart Contracts using Remix and Rootstock Explorer** | In this guide, we will use the Remix IDE to write, compile, deploy, interact, and verify a smart contract on the Rootstock Explorer. | Familiarity with Remix IDE and smart contract basics               | [Use Remix](/developers/quickstart/remix/)                  |
