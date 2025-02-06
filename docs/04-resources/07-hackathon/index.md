---
sidebar_label: Hackathons 
sidebar_position: 7
title: Hackathon and Workshop Resources
tags: [hackathons, rsk, workshop, resources, rootstock]
description: "Hackathon resources and tools"
---

This guide details the necessary hardware and software requirements for developing on the Rootstock blockchain. 

It includes setup instructions for essential tools such as Java, Node.js, Hardhat, and RSKj, ensuring developers have a clear path to prepare their environment for Rootstock projects, whether for local development, testing, or deployment. 

For IRL hackathons and events, download the [Hackathon Cheatsheet PDF with QR Codes](/rootstock-cheatsheet.pdf).

## Prerequisites

This guide is designed to help both beginners and experienced developers get started with building on Rootstock. The content is organized to help you find what you need based on your skill level.

<Tabs>
  <TabItem value="beginners" label="Beginners" default>
    
    <p>If you're new to blockchain development, start here! We've outlined the essential skills and tools you'll need to begin your journey.</p>

    <ol>
      <li>
        <strong>Basic Programming Knowledge</strong><br />
        Familiarity with programming languages like <strong>JavaScript</strong> or <strong>Python</strong> will be helpful, even if you're new to blockchain development.
      </li>
      <li>
        <strong>Understanding Blockchain Basics</strong><br />
        Learn about <strong>blockchain technology</strong>, <strong>smart contracts</strong>, and <strong>dApps</strong> before diving in. We recommend starting with introductory resources on <a href="#">blockchain concepts</a>.
      </li>
      <li>
        <strong>Intro to Web3 Development Tools</strong><br />
        While not strictly necessary to start, getting a basic understanding of tools like <strong>Remix IDE</strong> for smart contract development will make your journey smoother. We have beginner-friendly tutorials available <a href="/developers/quickstart/remix/">here</a>.
      </li>
      <li>
        <strong>Version Control with Git</strong> <em>(Optional)</em><br />
        Learning basic <strong>Git</strong> and <strong>GitHub</strong> skills can help you manage projects and collaborate with others.
      </li>
    </ol>
    <p>Start building your first dApp using hardhat <a href="/developers/quickstart/hardhat/">Quickstart Guide for Beginners</a>.</p>
  </TabItem>

  <TabItem value="experienced" label="Experienced Developers">
    
    <p>If you already have a background in blockchain or Web3 development, you can dive straight into more advanced topics and leverage the tools available on Rootstock.</p>

    <ol>
      <li>
        <strong>Knowledge of Blockchain and Smart Contracts</strong><br />
        You should be comfortable with <strong>[blockchain principles](https://rsk.thinkific.com/courses/blockchain-developer)</strong> and <strong>decentralized networks</strong>.
      </li>
      <li>
        <strong>Experience with Web3 Development Tools</strong><br />
        Tools like <strong>Hardhat</strong>, <strong>Web3.js</strong>, and <strong>Remix IDE</strong> should be part of your existing toolkit.
      </li>
      <li>
        <strong>Basic Programming Skills</strong><br />
        Proficiency in <strong>Solidity</strong> and other Web3-related programming languages (like <strong>JavaScript/React</strong> or <strong>Python/Web3.py</strong>) will be beneficial.
      </li>
      <li>
        <strong>Familiarity with ERC Standards</strong><br />
        Understanding <strong>ERC20</strong>, <strong>ERC721</strong>, and <strong>ERC1155</strong> standards for token contracts will be valuable.
      </li>
      <li>
        <strong>Advanced Topics</strong> <em>(Optional)</em><br />
        Knowledge of <strong>account abstraction</strong>, <strong>automation frameworks</strong> like <strong>Cucumber</strong>, and other advanced Web3 concepts can help you explore more sophisticated solutions.
      </li>
    </ol>
   
 <p>Access our [Guide for Experienced Developers](/developers/quickstart/) to get started.</p>
  </TabItem>
</Tabs>


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
  link="https://cheatography.com/devrelrootstock/cheat-sheets/rootstock-dev/"
/>

<br></br>

## Starter Kits

| Quickstart Kits/Sections                                      | Description                                                                                             | Prerequisites                                                      | Action                     |
|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|----------------------------|
| **Wagmi Starter Kit**                                          | This starter kit provides a foundation for building decentralized applications (dApps) on the Rootstock blockchain using React, Wagmi, and Shadcn libraries. | Basic understanding of React and Web3.js.                           | [Use the Kit](/developers/quickstart/wagmi/)               |
| **Dynamic Starter Kit**                                          | The Rootstock Dynamic Starter Kit uses the wagmi library for faster integration of Web3 features into a Next.js application. It uses Wagmi hooks, ability to connect to wallets, retrieve balances, transfer tokens, and sign messages.|    Basic understanding of React, Web3.js and Next.js.                           | [Use the Kit](/developers/quickstart/dynamic/)               |
| **Hardhat Starter Kit**                                        | Smart Contract examples, Tests, Deployments, and Tasks for Common ERC Standards (ERC20, ERC721, ERC1155).| Familiarity with Hardhat, Solidity, and ERC standards              | [Use the Kit](/developers/quickstart/hardhat/)                |
| **Account Abstraction Kit**                                    | Account Abstraction Starter dApp using Etherspot.                                                        | Knowledge of account abstraction and Etherspot                     | [Use the Kit](/developers/quickstart/rootstock-etherspot/)                |
| **dApp Automation with Cucumber**                              | Learn how to automate dApps using Cucumber Agile Automation Framework.                                   | Basic understanding of automation frameworks like Cucumber         | [Automate dApps](/resources/tutorials/dapp-automation-cucumber/)             |
| **RIF Relay Starter Kit**                                      | Starter kit to develop on RIF Relay.                                                                     | Understanding of RIF Relay and smart contracts                     | [Use the Kit](/developers/integrate/rif-relay/sample-dapp/)                    |
| **Get Started with The Graph**                                 | Easily query on-chain data through a decentralized network of indexers.                                  | Familiarity with querying on-chain data and The Graph protocol      | [Get Started](/dev-tools/data/thegraph/)                |
| **Get Started with Web3.py**                                   | Get started with deploying and interacting with smart contracts on Rootstock using Web3.py.              | Knowledge of Python and Web3.py                                    | [Get Started](/developers/quickstart/web3-python/)               |
| **Port an Ethereum dApp to Rootstock**                         | Learn how to port an Ethereum dApp to Rootstock.                                                         | Experience with Ethereum dApp development                          | [Get Started](/resources/port-to-rootstock/ethereum-dapp/)               |
| **Deploy, Interact and Verify Smart Contracts using Remix and Rootstock Explorer** | In this guide, we will use the Remix IDE to write, compile, deploy, interact, and verify a smart contract on the Rootstock Explorer. | Familiarity with Remix IDE and smart contract basics               | [Use Remix](/developers/quickstart/remix/)                  |
