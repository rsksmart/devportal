---
sidebar_position: 1.5
title: Glossary | Key Terms and Definitions
sidebar_label: Glossary
tags: [rsk, rootstock, developer tools, courses, guides, tutorials, glossary]
description: "This glossary provides essential definitions for key terms related to Rootstock and blockchain technology."
---
# Glossary | Key Terms and Definitions

This glossary contains key terms and definitions to help you better understand the technologies and concepts related to Rootstock. 

Whether you're building on the Rootstock platform or simply exploring, these definitions will provide clarity on essential terms commonly used in the Rootstock Ecosystem.

# A

## ABI (Application Binary Interface)
The Application Binary Interface (ABI) defines the interface between two binary program modules, typically between a smart contract and the external applications that interact with it. On the blockchain, an ABI specifies the functions and parameters called on a smart contract and the data exchange structure. It is essential for interacting with smart contracts programmatically.


## Accounts 

In blockchain, accounts store digital assets and are identified by addresses. 
They can be managed by individuals or programs, enabling users to send and receive assets, 
interact with applications, and participate in network activities. See [Account Based Addresses](/concepts/account-based-addresses/) for more information.

## Account Abstraction

A blockchain feature that allows user accounts to have programmable transaction validation rules, 
making them more flexible than traditional EOA (Externally Owned Accounts). 
This enables features like social recovery and batched transactions. 

<Button size="sm" href="/developers/quickstart/rootstock-etherspot/">Try Account Abstraction</Button>

<br/>
<br/>

## API (Application Programming Interface)

A set of tools and protocols that allow software applications to interact with each other. 
APIs are commonly used for enabling integrations with external systems.

# B

## Bitcoin (BTC) 

The first and most well-known cryptocurrency, created by Satoshi Nakamoto. 
It operates on a decentralized network using proof-of-work consensus.

## Bitcoin Runes

This is a protocol for creating fungible tokens directly on the blockchain. Developed by Casey Rodarmor, 
the mind behind Ordinals, Runes offers a more efficient way to issue tokens. 

<Button size="sm" href="/resources/guides/runes-rootstock/">Try Bitcoin Runes on Rootstock</Button>

<br/>
<br/>

## Blockchain

A distributed, immutable digital ledger that records transactions across a network of computers. 
Each block contains a list of transactions and is linked to the previous block, forming a chain.

## BRC20 

A token standard for Bitcoin, similar to ERC20 on Ethereum, enabling the creation of fungible tokens on the Bitcoin network.

## Bridge 

This is a protocol allowing assets to be transferred between different blockchain networks, facilitating cross-chain interoperability. 
On **Rootstock**, two primary cross-chain bridging solutions support these asset transfers. 

<Button size="sm" href="/dev-tools/cross-chain-bridges/">View Bridges on Rootstock</Button>
<br/>

# C

## CLI (Command-Line Interface)

A text-based user interface that allows developers to interact with software by typing commands. Rootstock offers CLI tools for interacting with the blockchain and managing smart contracts.

## Cucumber 

This is a software tool that supports Behavior-Driven Development (BDD), enabling developers to write automated tests in plain language.

<Button size="sm" href="/resources/tutorials/dapp-automation-cucumber/#prerequisites">Try Cucumber</Button>
<br/>
<br/>

## Cryptocurrency

A type of digital currency based on cryptography, designed to work as a medium of exchange on decentralized networks. Common cryptocurrencies like Bitcoin and Ethereum allow for secure, peer-to-peer transactions without needing intermediaries.

## Cross-chain

This technology enables interaction between different blockchain networks, allowing assets or data to move across platforms. This promotes interoperability, letting users and developers leverage the benefits of multiple blockchains in one ecosystem.

# D

## DAO (Decentralized Autonomous Organization)

This is a community-led organization operating through rules encoded in smart contracts not centralized entities. Members typically vote on decisions, giving everyone a say in governance, funding, and operations without a central authority.

## DEX (Decentralized Exchange)

This is a type of cryptocurrency exchange that operates without a central authority. Unlike traditional exchanges, DEXs allow users to trade assets directly with one another through peer-to-peer transactions, typically using smart contracts on a blockchain. This eliminates the need for intermediaries, enhancing security and privacy. Users retain control of their private keys and assets, reducing the risks associated with centralized exchanges, such as hacking or asset freezing.

## dApp (Decentralized Application)

This is an application that operates on a decentralized network, typically leveraging blockchain technology. Unlike traditional applications that rely on centralized servers, dApps use smart contracts to execute their backend logic, providing greater transparency, security, and resilience against censorship. 

# E

## ERC1155 

ERC1155 is a token standard on Ethereum that allows for both fungible and non-fungible tokens to be managed within a single contract. 

## ERC20

ERC20 is a widely-used token standard on the Ethereum blockchain that defines the basic functionalities for fungible tokens,
 including transfer and allowance mechanisms. 

## ERC721

ERC721 is a token standard for non-fungible tokens (NFTs) on Ethereum, where each token is unique. 
This standard enables the ownership and transfer of distinct digital assets, fostering a market for collectibles and digital art.

## EOA (Externally Owned Account)

This is a user-controlled blockchain account secured by private keys. 
Unlike smart contracts, which are self-operating programs, EOAs allow individuals to manage assets directly and initiate transactions.

## Ethereum

[Ethereum](https://ethereum.org/en/) is a decentralized blockchain platform that facilitates the creation and execution of smart contracts and decentralized applications (dApps). It allows developers to build applications that operate on a peer-to-peer network, enabling trustless transactions and automated processes without the need for intermediaries. 

## Etherspot

Etherspot is an Account Abstraction infrastructure designed to help developers create a seamless web3 user experience for users interacting with their dApps.

<Button size="sm" href="/developers/quickstart/rootstock-etherspot/">Try Etherspot SDK</Button>
<br/>
<br/>


## EVM (Ethereum Virtual Machine)

The [EVM](https://ethereum.org/en/) is a decentralized runtime environment that enables the execution of smart contracts on Ethereum and EVM-compatible blockchains. It provides the necessary infrastructure for developers to deploy applications, ensuring that they run consistently across different nodes in the network.

## EVM Compatible 

This term refers to blockchains designed to execute Ethereum smart contracts and adhere to the Ethereum Virtual Machine (EVM) specifications. 
EVM-compatible blockchains support the same programming interfaces, enabling developers to deploy their existing Ethereum applications without major modifications. 

## Explorer

This is a tool for viewing blockchain data such as transactions, addresses, and smart contracts on both [Mainnet](https://explorer.rootstock.io/) -
the live network with real assets and [Testnet](https://explorer.testnet.rootstock.io) - a testing network with no real monetary value. It provides transparency by letting users track the activity and status of these elements in real-time across the network.


## Exchange
This is a platform where users can trade cryptocurrencies and other digital assets. Exchanges can be centralized (run by a company) or decentralized (operating on a blockchain), providing various ways for users to buy, sell, and hold assets.

# F

## Faucet

This is a tool that distributes small amounts of cryptocurrency for testing purposes on test networks, allowing developers and users to experiment without financial risk. In the context of Rootstock, faucets can be used to obtain test RBTC (tRBTC), enabling developers to test their applications in a realistic environment. This practice is crucial for ensuring that dApps function correctly before deployment on the mainnet.

<Button size="sm" href="/dev-tools/additional-tools/#faucets">Get tRBTC</Button>

<br/>
<br/>

# G

## Gas 

This is the unit used to measure the amount of computational work needed to perform tasks on the blockchain. When users make transactions or run smart contracts, they pay gas fees in the network's currency. These fees motivate miners and validators to process the transactions. In Rootstock, understanding gas is important for managing costs and ensuring that your transactions are executed efficiently. 

# H

## Hardhat 

This is a development environment for building, testing, and deploying Ethereum smart contracts. It provides tools that simplify the development process, allowing developers to write and test their code efficiently. In the context of Rootstock, Hardhat can be used to create and manage smart contracts, making it easier to integrate with the Rootstock network.

<Button size="sm" href="/developers/smart-contracts/hardhat/write-smart-contracts/">Try Hardhat</Button>
<br/>
<br/>

## Hash rate

The measure of computational power used by miners to secure a blockchain. A higher hash rate increases network security, as more resources are required to manipulate or attack the system.

## Hashing

A process that transforms data into a unique, fixed-size code, known as a hash. It ensures data integrity by creating a unique digital “fingerprint” for any piece of information, useful for verifying transactions on blockchains.

## Interoperability

The ability of different blockchain networks to interact and share data, enabling users to perform cross-platform transactions and developers to create applications that access features from multiple chains.

# J

## JSON RPC

This is a protocol that allows for making remote procedure calls using JSON (JavaScript Object Notation). It is widely used to interact with blockchain nodes, enabling applications to send commands and receive responses over the network. This protocol facilitates communication between clients and servers in a standardized way, making it easier for developers to build applications that interact with blockchain technology. 

<Button size="sm" href="/node-operators/json-rpc/methods/">View JSON RPC Methods</Button>
<br/>
<br/>

# L

## Layer One (L1) 

This refers to the main blockchain network, such as Bitcoin or Ethereum, responsible for its own transaction validation. It is the foundational layer of the blockchain architecture, where transactions are processed and recorded.

## Layer Two (L2) 

This is a secondary framework or protocol built on top of a Layer 1 blockchain to enhance scalability and efficiency. Layer 2 solutions help reduce congestion and increase transaction throughput while maintaining security.

# M

## Mainnet

This is the primary network of a blockchain where real transactions take place with actual value. It is the live environment where users can interact with the blockchain and utilize its features.

## Merge Mining 

This allows the Rootstock blockchain to be mined simultaneously with the Bitcoin blockchain, leveraging the same proof-of-work (PoW) algorithm, double SHA-256. This process enhances security and efficiency for both networks.

## Mining

This is the process of validating transactions and creating new blocks in proof-of-work blockchains, ensuring the integrity and security of the network.

## Mnemonic

A series of random words that acts as a backup for a wallet. Mnemonics allow users to recover their accounts if they lose access, helping ensure access to digital assets.

# N

## NFT (Non-Fungible Token)

This is a unique digital asset whose ownership is recorded on the blockchain. Unlike cryptocurrencies, which are interchangeable, each NFT has unique properties and values, making it suitable for representing ownership of digital art, collectibles.

## Node Miner 

This is a computer that participates in the blockchain network by validating transactions and mining new blocks. These miners help maintain the network's integrity and security through their computational efforts.

## Name Service 

This is a tool that maps complex blockchain addresses to human-readable names, making transactions easier. It enables users to send assets using simple names instead of lengthy addresses, simplifying blockchain interactions.

## Node
A computer that participates in a blockchain network by validating, storing, and sharing data.

* **Full Node:** Stores the entire blockchain and independently verifies transactions and blocks.
* **Light Node:** Stores only partial data (e.g., block headers) and relies on full nodes for verification. Nodes are essential for maintaining the network's security and decentralization.

<Button size="sm" href="/node-operators/">Learn about Rootstock Node</Button>
<br/>
<br/>

# O

## Offchain 

This refers to operations or data storage that occur outside the blockchain but can interact with it. This approach can enhance scalability and efficiency by reducing the load on the blockchain while still allowing users to benefit from its security.

## On-chain  

These activities and data are recorded directly on the blockchain, ensuring transparency, immutability, and security. Every transaction or action taken on-chain becomes part of the blockchain's permanent ledger.

## Op Code

Short for "operation code," op codes are basic instructions processed by the blockchain’s virtual machine. They define the actions smart contracts can perform, enabling complex operations within blockchain applications.

## Oracles

These are services that fetch external data for use in smart contracts, allowing blockchain applications to respond to real-world events like weather data, prices, or sports scores, thus expanding blockchain utility beyond its closed network.

# P

## PowPeg 

This facilitates the conversion of Bitcoin (BTC) to Rootstock Bitcoin (RBTC) and vice versa. It operates under the PowPeg protocol, which secures locked bitcoins by leveraging the same Bitcoin hash rate that establishes consensus on the Bitcoin network. This unique mechanism ensures the integrity and security of asset transfers between the two currencies.

<Button size="sm" href="/resources/guides/powpeg-app/">Try PowPeg</Button>
<br/>
<br/>

## Private Key 

A unique code granting access to a blockchain account. It must remain secret, as it authorizes transactions and transfers funds. Losing a private key typically results in losing access to the account permanently.

# R

## RBTC

[RBTC](/concepts/rbtc/) is the native cryptocurrency of the Rootstock network, designed to be pegged 1:1 to Bitcoin. This ensures that RBTC maintains a value equivalent to Bitcoin, allowing seamless interactions between both networks.

## Remix IDE 

This is a browser-based integrated development environment for developing, testing, and deploying Ethereum smart contracts. It provides a user-friendly interface and powerful tools to assist developers in their smart contract development processes.

<Button size="sm" href="/developers/quickstart/remix/">Try Remix IDE on Rootstock</Button>
<br/>
<br/>

## RIF (Rootstock Infrastructure Framework)

[RIF](/concepts/rif-suite/token/) a suite of open and decentralized infrastructure protocols that facilitate the development of distributed applications (dApps) within a unified environment. RIF OS simplifies access to various blockchain services, promoting scalable and efficient development across multiple crypto-economies.

## rLogin

This is a tool that enables users to log into applications using their preferred wallets. It connects to user wallets via an API compatible with MetaMask, streamlining authentication for decentralized applications.

## RNS (Rootstock Name Service)

[RNS](/concepts/rif-suite/rns/) is a system that allows for easy-to-remember names in place of complex blockchain addresses. This simplifies transactions, making it user-friendly to send and receive assets on blockchain platforms.

## Rootstock

Rootstock is the first and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, This robust security model empowers developers to build trustless, innovative dApps within a thriving ecosystem.

<Button size="sm" href="https://rsk.thinkific.com/courses/blockchain-user">Enroll for the Rootstock User Course</Button>
<br/>
<br/>

## RVM

The runtime environment where smart contracts execute is known as the virtual machine, which processes instructions in blockchain transactions to enable automation and support decentralized applications. The Rootstock Virtual Machine (RVM) is fully compatible with the Ethereum Virtual Machine (EVM) at the opcode level, allowing Ethereum smart contracts to run seamlessly on the Rootstock network. This compatibility supports a broad range of Ethereum-based applications and tools on Rootstock, promoting interoperability and ease of migration for developers familiar with the Ethereum ecosystem. See the [Differences between Rootstock and Ethereum](/developers/blockchain-essentials/overview/#differences-with-rootstock-and-ethereum)

## RSKIP (Rootstock Improvement Proposal)

A community-driven proposal for protocol enhancements, similar to other blockchain networks. They allow users and developers to suggest new features or improvements to the network’s code. 

<Button size="sm" href="https://github.com/rsksmart/RSKIPs">View the RSKIPs</Button>
<br/>
<br/>

## RPC (Remote Procedure Call)

This enables external applications to interact with blockchain nodes, providing an interface for retrieving data, submitting transactions, and monitoring network activity. 

<Button size="sm" href="https://rpc.rootstock.io/">View the RPC API</Button>
<br/>
<br/>

# S

## Smart Contract

This is self-executing code deployed on a blockchain that automatically enforces and executes agreements based on predefined conditions. These contracts eliminate the need for intermediaries, enhancing efficiency and trust in transactions by ensuring that once conditions are met, actions are carried out automatically. 

## Starter Kit

This is a template or boilerplate project that provides developers with the basic structure and essential tools needed to begin building a dApp. It simplifies the development process by offering pre-configured settings, libraries, and examples, allowing developers to focus on their application’s unique features instead of starting from scratch.

<Button size="sm" href="/developers/quickstart/">Rootstock Starter Kit Templates</Button>
<br/>
<br/>

## Solidity 

This is the primary programming language for writing smart contracts on Ethereum and EVM-compatible blockchains. It is a statically typed, high-level language that enables developers to create complex smart contracts and dApps.

<Button size="sm" href="https://rsk.thinkific.com/courses/blockchain-developer/">Enroll for Blockchain Developer Course</Button>
<br/>
<br/>

## Stablecoin

A type of cryptocurrency that is pegged to a stable asset, like a fiat currency. Stablecoins provide consistency in value, allowing for trading and savings with minimal volatility.

## Seed phrase

This is a set of random words that acts as a backup for private keys. With a seed phrase, users can recover their account and access assets if they lose their wallet or credentials.

# T

## TBTC

This is a tokenized version of Bitcoin that allows developers to test blockchain applications without using actual Bitcoin. Designed for use on test networks, it helps simulate Bitcoin transactions in a secure environment, ideal for testing dApps or other blockchain features without financial risk. To obtain TBTC for testing, you can use a testnet faucet, which provides small amounts of test tokens. For access, refer to a Rootstock testnet faucet to request TBTC.

## Testnet

This is a version of a blockchain network specifically designed for testing purposes. In this environment, transactions do not hold any real monetary value, allowing developers to experiment with new features and smart contracts without risking actual assets. This setup helps identify bugs and optimize functionality before deploying on the mainnet.

<Button size="sm" href="https://faucet.rootstock.io/">Get tRBTC</Button>
<br/>
<br/>

## Token

This is a digital asset created and managed through smart contracts on a blockchain. It represents ownership or access to a specific asset or service, and can be fungible (like ERC20 tokens) or non-fungible (like ERC721 NFTs). 

## Transactions

These are operations that alter the state of the blockchain. This includes activities like transferring tokens, executing smart contract functions, or changing account balances. Each transaction is recorded on the blockchain, providing a transparent and immutable ledger of actions.

# W

## Wallet

This is software that manages cryptocurrency private keys, enabling users to store, send, and receive cryptocurrencies securely. It facilitates interactions with blockchain networks, allowing users to access their digital assets and execute transactions.

<Button size="sm" href="/dev-tools/wallets/">Learn about Wallets</Button>
<br/>
<br/>

## Web3.js

This is a JavaScript library that simplifies the process of interacting with Ethereum and EVM-compatible blockchain networks. It provides a range of functions to enable developers to build decentralized applications (dApps) that can communicate with the blockchain.

## Wrapped Tokens

Tokens that represent assets from one blockchain on another, such as Wrapped Bitcoin (WBTC) on Ethereum. Wrapped tokens allow users to transfer value between chains without directly moving the original asset.

