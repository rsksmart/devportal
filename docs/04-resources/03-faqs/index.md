---
sidebar_label: FAQs
sidebar_position: 8
title: Frequently Asked Questions
tags: [resources, rsk, faqs, help, support, rootstock]
description: "Explore frequently asked questions about Rootstock and RIF"
---

Here are some frequently asked questions about the Rootstock and RIF Platforms.

## About Rootstock

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">What is Rootstock?</Accordion.Header>
    <Accordion.Body>
      Rootstock is the first and longest-lasting Bitcoin sidechain. It is the only layer 2 solution that combines the security of Bitcoin's proof of work with Ethereum's smart contract capabilities. The platform is open-source, EVM-compatible, and secured by over 60% of Bitcoin’s hashing power, making it the gateway to a vibrant ecosystem of dApps that continues to evolve to become fully trustless.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is a smart contract?</Accordion.Header>
    <Accordion.Body>
      Smart contracts are digital agreements stored on a blockchain network such as Rootstock and executed automatically without intermediaries. A smart contract allows digital assets to be controlled, exchanged, and transferred. Smart contracts have numerous use cases, such as lending, voting, decentralized payments and exchanges, asset tokenization, etc.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">What is the purpose of Rootstock?</Accordion.Header>
    <Accordion.Body>
      Rootstock's primary purpose is to enable Bitcoin users to create and execute smart contracts, thereby extending the functionality and use cases of the Bitcoin network. Rootstock achieves this by using a 2 way peg system that allows users to send Bitcoin directly to the Rootstock chain, where they become convertible to Rootstock's native cryptocurrency, RBTC. This RBTC can then be used within the Rootstock network to interact with smart contracts and dApps.
      - In addition to smart contract functionality, Rootstock also focuses on providing solutions for faster transactions and higher scalability, two of the main challenges in the Bitcoin network. It also supports merged mining, allowing Bitcoin miners to mine both Bitcoin and RBTC simultaneously without additional computational resources.
      - Furthermore, Rootstock is also home to the RIF (Rootstock Infrastructure Framework) which makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on [RootstockCollective DAO](https://rootstockcollective.xyz/).
      - Finally, the purpose of Rootstock is to enhance the Bitcoin ecosystem by adding smart contract functionality and more without compromising the features that make Bitcoin unique such as security and decentralization.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">Is the Rootstock network compatible with the Ethereum network?</Accordion.Header>
    <Accordion.Body>
      - Rootstock is [compatible with the Ethereum blockchain](https://medium.com/iovlabs-innovation-stories/similarities-and-differences-between-rsk-and-ethereum-e480655eff37) at the following layers:
        - EVM compatibility
        - Interprocess connectivity in JSON-RPC
        - Smart contract programming in Solidity
        - JavaScript interface with web3.js
      - The Rootstock virtual machine (RVM) is highly compatible with the Ethereum Virtual Machine (EVM). Approximately annually, the Ethereum community performs a hard fork to add new functionalities to the blockchain. When these new functionalities align with Rootstock's vision, the community performs a corresponding hard fork to maintain compatibility with the EVM.
      - Additionally, the RVM offers improved features over EVM, such as bridging with Bitcoin and querying the Bitcoin blockchain.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">Do you plan to add support for smart contract programming languages other than Solidity?</Accordion.Header>
    <Accordion.Body>
      Rootstock aims to support all Ethereum's contracts; therefore, it can generally support any language that compiles to the EVM. This includes Solidity, Julia, Rust and new or experimental programming languages like Vyper.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">What is the current state of the Rootstock project?</Accordion.Header>
    <Accordion.Body>
      - As of February 2025, the latest released version of Rootstock is the [Lovell v7.0.0](https://github.com/rsksmart/rskj/releases), an update that is mainly focused on bringing Ethereum compatibility enhancements to the Rootstock virtual machine, along with notable improvements and performance optimization in the PowPeg protocol. Read more [Introducing Lovell 7.0.0: What You Need To Know About Rootstock’s Upcoming Network Upgrade](https://blog.rootstock.io/noticia/introducing-lovell-7-0-0/)
      - Live statistics about the entire Rootstock network are available at Rootstock Stats, and all the necessary source codes can be found at the Rootstock GitHub organization: [github.com/rsksmart](https://github.com/rsksmart).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">How does Rootstock plan to be a reference in terms of smart contracts?</Accordion.Header>
    <Accordion.Body>
      - Since its inception security and scalability have been, and will continue to be Rootstock's key competitive advantages. With a deep understanding of scalability as a significant challenge in driving blockchain adoption, the Rootstock community continuously works to enable higher transaction throughput and reduce transactional costs.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3"> How is Rootstock approaching node diversity?</Accordion.Header>
    <Accordion.Body>
      - How many nodes does a healthy protocol need?
      - The Rootstock community values node diversity and independence more than node quantity. Even though a few hundred Rootstock nodes can support a global cryptocurrency network now, Rootstock prioritizes more variety and autonomy among node operators. That's what decentralization means: don't trust, verify yourself. Rootstock nodes were designed to be lightweight and run to improve decentralization.  There are community proposals for light clients to enable mobile nodes. The goal is to ensure Rootstock remains secure and scalable in the long run with sufficient quality and quantity of nodes.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## Rootstock vs Other Platforms

<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">How is Rootstock different from Stacks?</Accordion.Header>
    <Accordion.Body>
      > - **Philosophy:** Rootstock is a Bitcoin sidechain highly incentive-aligned with the Bitcoin ecosystem participants. It allows  Bitcoin miners to earn additional transaction fees and allows Bitcoiners to transact in Bitcoin cheaply. The fact that Rootstock's native currency is RBTC also reinforces this alliance. Stacks has its token (STX) to pay transaction fees, and as of February 2024, it doesn’t have any mechanism for transactions in Bitcoin. Therefore, Stacks is not a Bitcoin sidechain but a separate blockchain (or “altcoin”) using Bitcoin to achieve consensus.
      > - **Consensus Mechanism:** Rootstock uses merge-mining with Bitcoin, which means that Rootstock blocks are secured by the same miners that secure Bitcoin. Currently, more than 50% of Bitcoin’s hash rate is securing Rootstock. The core idea of merge-mining dates back to 2010 and was proposed by Satoshi Nakamoto  It was first put into production by Namecoin in 2011. Merged mining has been battle-tested in many blockchains, such as Litecoin, for almost a decade. Rootstock uses a variant of merged mining called DECOR, which is specifically designed for Rootstock's needs. Instead of relying on proven consensus protocols, Stacks was launched with a new consensus protocol called proof-or-burn but changed its consensus several times, the last time to PoX. Soon, it will switch again to the upgrade, as the previous consensus protocols were complex and presented flaws. These unexpected incentives allowed some Bitcoin miners to get an unfair share of Stacks subsidy and had hard scalability limitations regarding block time. Making things worse, the soundness of the new protocol is not proven, and it will be tested in production.
      > - **Smart Contract Capabilities:** The Rootstock VM is highly compatible with the EVM (Ethereum virtual machine) and with the Ethereum web3 standard. Most Ethereum applications can be ported to Roostock with a few configuration changes. Solidity is the main language used to program the EVM. It compiles a high-level language that [resembles C++ or Java](https://docs.soliditylang.org/en/latest/language-influences.html) into EVM opcodes.  Over the years, Solidity became a de-facto standard for contract development, providing a rich toolchain that includes compilation, testing, and security analysis tools. There are also thousands of online tutorials, libraries, and examples. Almost on the opposite side of the design decision spectrum, Stacks uses the Clarity programming language to code smart contracts. Clarity is a new LISP-like language that is only used by Stacks. Clarity is interpreted on-chain and not compiled, slows execution and limits scalability while providing more transparency. While interesting in theory, the transparency argument was rendered moot in practice as users of rootstock and Ethereum have gotten used to checking the availability and correctness of source code using automated tools that check its matching with the deployed code. A new ClarityWASM was announced in a planned upgrade to cope with the scalability problem of Stacks, but this upgrade still doesn’t provide direct  EVM compatibility.
      > - Peg mechanism: Rootstock 2 way peg is based on a federation of functionaries, each running a hardware security module (the PowHSM) that participates in a multi-sig that protects the locked funds. Hundreds of millions of USD in bitcoins are currently secured by Rootstock peg. Stacks doesn’t have a peg to Bitcoin that allows it to transfer bitcoins back and forth. A planned upgrade is supposed to add a collateralized 2 way peg to Bitcoin.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">How is Rootstock different from Liquid?</Accordion.Header>
    <Accordion.Body>
      - While Rootstock and Liquid are Bitcoin sidechains, they have different goals and features. Rootstock is a smart contract platform highly compatible with Ethereum, while Liquid is a federated sidechain that aims to provide fast and secure inter-exchange settlement.
      - Some of the main differences are:
      > - **Consensus mechanism:** Rootstock uses merge-mining with Bitcoin, which means that Rootstock blocks are secured by the same miners that secure Bitcoin. Currently, more than 50% of Bitcoin hashrate is securing Rootstock. Liquid uses a federation of trusted functionaries that validate and sign blocks. Rootstock’s merge-mining is more decentralized than Liquid’s federation and provides the thermodynamic security of PoW, which Liquid does not.
      > - **Smart contract capabilities:** Rootstock supports Turing-complete smart contracts and has a virtual machine almost identical to Ethereum’s. This allows developers to use the same tools, libraries, and languages as Ethereum and port existing applications to Rootstock. Liquid has a simpler scripting system that is not Turing-complete (within a single transaction) and only supports a limited set of use cases, such as atomic swaps and multi-sig transactions.
      > - **Peg mechanism:** Both Rootstock’s and Liquid’s 2 way pegs are based on a federation of functionaries, each running a hardware security module (HSM) that participates in a multisig that protects the locked funds. Both also have emergency recovery systems. However, every Liquid withdrawal is advanced by one functionary to a user, and then the Liquid blockchain reimburses the functionary. This is known as a repayment protocol. Some or all functionaries require KYC checks. Rootstock system performs peg-outs directly to the user's Bitcoin wallet and currently does not impose KYC on peg-outs but forces the same user to be on both sides of the transfer. [Rootstock Flyover](/developers/integrate/) system provides faster peg-outs, also using a repayment system.
      > - **Scalability:** Rootstock can achieve a higher transaction throughput than Liquid because Rootstock’s transactions are smaller, its blocks can contain more transactions, and the Rootstock blockchain has a lower average block interval. Rootstock also has several scalability proposals close to being finalized, such as parallel transaction processing.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">How is Rootstock different from drivechains?</Accordion.Header>
    <Accordion.Body>
      - A drivechain is a special sidechain with a specific type of 2 way peg called “hashrate escrow.” This peg mechanism gives most Bitcoin miners control of sidechain withdrawals but incentivizes miners to be honest and not abuse their powers. To achieve this, miners publicly confirm or reject withdrawals during a long period that can last 3 months. During this period, the community can detect cheaters that confirm invalid withdrawals. The peg is secure as long as there are strong long-term incentives for the honest majority of miners not to cheat. Rootstock, on the contrary, does not rely on monetary incentives. It uses a federation of PowHSM devices, and the tamper-proof devices vote on withdrawals. At the same time, each device enforces the same type of “hashrate escrow” but with a much-reduced timeframe of days. Therefore both Drivechains and Rootstock require the miner hashrate to support every withdrawal.
      - Drivechains are promising but not currently available as they require a soft-fork in Bitcoin, which has been historically considered controversial and may never be performed. While drivechains may provide greater decentralization, the drivechain peg mechanism has never been tested, so the drivechain peg security is still uncertain.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">How is Rootstock different from Lightning?</Accordion.Header>
    <Accordion.Body>
      - Rootstock and Lightning are both layer-2 solutions that aim to improve the scalability and functionality of Bitcoin, but they have different approaches and trade-offs. Some of the main differences are:
      > - **Architecture:** Rootstock is a sidechain connected to the Bitcoin mainchain through a 2 way peg mechanism, allowing users to lock and unlock bitcoins on both chains. Lightning is a network of payment channels built on the Bitcoin mainchain, allowing users to send and receive bitcoins off-chain.
      > - **Smart contracts:** Rootstock supports Turing-complete smart contracts and is compatible with the Ethereum Virtual Machine, which enables a wide range of decentralized applications and use cases on the Bitcoin network. Lightning only supports simple scripts, and transactions mainly focus on fast and cheap payments.
      > - **Security and Liveness:** Rootstock is secured by merge-mining with Bitcoin, which means that Rootstock blocks are validated by the same miners and hash power as Bitcoin. The Bitcoin mainchain, the ultimate arbiter and enforcer of the payment channel, secures Lightning. Rootstock has greater liveness guarantees than Lightning. Lightning requires the cooperation of the parties sharing the payment channels and the existence of channel paths to destination addresses for payments to succeed. Rootstock blocks are always being produced, and as long as the Rootstock gas price specified in a transaction is adequate, transactions always get confirmed. Lightning security relies on parties checking their channels occasionally to avoid malicious closures. Rootstock security does not require the users to be active online or monitor their wallets continuously.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="11">
    <Accordion.Header as="h3">How does Rootstock compare with Ethereum?</Accordion.Header>
    <Accordion.Body>
      How does Rootstock compare with Ethereum?
      > - Does the Rootstock node require the same resources as an Ethereum geth node?
      - Rootstock requires much fewer resources than Ethereum regarding blockchain size and state size. This is due to less on-chain activity and the fact that Rootstock uses more efficient data structures to manage the state, such as the Unitrie, to achieve potentially higher transaction throughput.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>


## Rootstock and RIF Token

<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is the RBTC token, and what is its purpose?</Accordion.Header>
    <Accordion.Body>
      - Smart Bitcoin (RBTC) is the native token of the Rootstock network. RBTC is pegged 1:1 to BTC, enabling Bitcoin transactions on the Rootstock and networks. It can be converted to and from BTC through the PowPeg protocol.
      - RBTC is used as gas to pay for executing transactions and smart contracts on the Rootstock network, rewarding miners and nodes, enabling interoperability among Bitcoin-based applications, and supporting the development of new solutions such as RIF Products.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">What is the RIF token, and what is its purpose?</Accordion.Header>
    <Accordion.Body>
      - The RIF (Rootstock Infrastructure Framework) token makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on [RootstockCollective DAO](https://rootstockcollective.xyz/). By staking RIF, users can mint stRIF; the governance token of the RootstockCollective used for voting, proposal creation, and rewards allocation. For more information, read the [Rootstock Collective Whitepaper](https://wiki.rootstockcollective.xyz/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">What is the Rootstock Collective?</Accordion.Header>
    <Accordion.Body>
      - [Rootstock Collective](https://rootstockcollective.xyz/), or The Collective, is a DAO (Decentralized Autonomous Organization) designed to develop the Rootstock ecosystem by empowering and rewarding builders and users of Rootstock, and RIF token holders. As a merged-mined Bitcoin sidechain, Rootstock’s heartbeat is inextricably linked to Bitcoin. With blocks separated by seconds, instead of minutes, the Rootstock network ‘beats’ a lot faster, and serves as a scaling solution for Bitcoin. On Rootstock, developers are able to build rich, EVM-compatible, web3 apps – and they can do this using Bitcoin as the native currency, in the form of RBTC.
      - View the [Rootstock Collective Whitepaper](https://wiki.rootstockcollective.xyz/2c6e3b87b49f4c1e9225b713e1b49538?v=819168fca4964319896c19e8299a8ea0) or read the [Rootstock Collective Whitepaper FAQs](https://wiki.rootstockcollective.xyz/RootstockCollective-FAQ-1031ca6b0b02808c95d3dcb5a0074f4b).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">What can I join the Rootstock Collective?</Accordion.Header>
    <Accordion.Body>
      To join Rootstock Collective, you will need to have RIF tokens, and then stake them into stRIF governance tokens. These stRIF tokens give you voting rights and participation in the DAO’s governance and decision-making process. You can become part of the Rootstock Collective in three steps:
        * Install [MetaMask and add Rootstock](/dev-tools/wallets/metamask/)
        * Get RBTC
        * Get RIF
        * Connect wallet to [http://app.rootstockcollective.xyz/](http://app.rootstockcollective.xyz/) and stake RIF.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">How is the RIF token different from RBTC?</Accordion.Header>
    <Accordion.Body>
      - The RIF token is different from RBTC in the following ways:
      > - **Purpose:** RBTC is the native token of the Rootstock network used to maintain a one-to-one relationship with Bitcoin. It is also used as gas to pay for smart contract execution and transaction fees on the network. RIF is a utility token used to access the services of the RIF  protocols.
      > - **Portability:** RBTC is pegged 1:1 to BTC and can be converted to and from BTC using the 2 Way Peg mechanism. RIF is an ERC20-compatible token that can be transferred across smart contract platforms.
      > - **Supply:** RBTC has the same supply as BTC, which is capped at 21 million. RIF has a fixed supply of 1 billion tokens, which were pre-mined and distributed according to a token sale and an allocation plan.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">How can I obtain RBTC and RIF tokens?</Accordion.Header>
    <Accordion.Body>
      - You can obtain RBTC and RIF tokens through various exchanges like Money on Chain and Oku Trade.
      - For an updated list, see [Get RBTC](https://rootstock.io/rbtc/).
      - For [RIF tokens](/concepts/rif-suite/token/), you can use exchanges like Sovryn, Binance, Gate.io, Lbank, MEXC, Coinex, and Hotbit. Please note that you should always use the right wallet and connect to the right network. RBTC can only be sent to and from Rootstock addresses on the network. Similarly, RIF tokens can only be sent to and from addresses that support the ERC677 token standard.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">What wallets support Rootstock and RIF tokens?</Accordion.Header>
    <Accordion.Body>
      - Rootstock is currently supported in several different software and hardware wallets. See [Wallets on Rootstock](/dev-tools/wallets/) pages for more information.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## Rootstock Features and Functionality

<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is merged mining, and how does it secure the Rootstock network?</Accordion.Header>
    <Accordion.Body>
      - Merged mining is a technique that allows miners to mine two or more blockchains simultaneously, using the same hash power and without compromising the security of either chain. The Rootstock network is merge-mined with the Bitcoin network and designed such that merge-mining with Bitcoin does not pose any performance penalty to Bitcoin miners. Therefore, merge miners can earn rewards on both Rootstock and Bitcoin simultaneously.
      - The merge-mining process secures the Rootstock network by leveraging the hash power of the Bitcoin network, the largest and most secure blockchain in the world. By doing so, Rootstock achieves high decentralization, reliability, and immutability for its smart contracts and transactions.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">What consensus protocol does Rootstock use, and how does it prevent attacks?</Accordion.Header>
    <Accordion.Body>
      - Rootstock uses DECOR+, a unique variant of Nakamoto Consensus, with the capability to merge mine with Bitcoin or any other blockchain, sharing the Bitcoin block format and proof-of-work.
      - The proof-of-work (PoW) consensus mechanism requires miners to solve a cryptographic puzzle to create new blocks and validate transactions. This prevents attacks by making it costly and difficult for malicious actors to alter the blockchain or create fraudulent transactions. PoW also ensures that the longest and most secure chain is always valid.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">What is the Rootstock Transactional throughput?</Accordion.Header>
    <Accordion.Body>
      - The block gas limit and the average block rate determine the number of transactions per second executable on the Rootstock platform. The current average block rate is one block every 30 seconds. The miner can vote to increase the block gas limit at each mined block. Currently, the block gas limit is 6.8M gas units per block. A simple RBTC transaction consumes 21K gas, so the Rootstock platform can execute 11 transactions per second today. This limit could increase by activating one of several improvement proposals, such as the parallel transaction proposal specified in RSKIP-144.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">What is the average transaction confirmation time of Rootstock?</Accordion.Header>
    <Accordion.Body>
      > - How many confirmations are required?
      - On average, the network currently generates a block every 30 seconds. Miners can reduce the average block time to 15 seconds by optimizing their merge-mining operations. Systems that receive payments over Rootstock in exchange for a good or service outside the Rootstock blockchain should wait a variable number of confirmation blocks, depending on the amount involved in the payments. A minimum of 12 confirmations is recommended, corresponding to an average delay of 6 minutes.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">How many transactions per second will the Rootstock network withstand?</Accordion.Header>
    <Accordion.Body>
      - Beta releases of improved Rootstock nodes have been tested to accommodate 100 tx/s without incident. As the technology improves, transactions per second may similarly increase.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">How does Rootstock protect its network from resource exhaustion attacks?</Accordion.Header>
    <Accordion.Body>
      - The Rootstock “gas system” prevents attackers from creating, spreading, and including resource-intensive transactions in blocks without paying the associated fees. Every resource, including CPU, bandwidth, and storage, is accounted for by the consumption of an amount of gas. Every block has a gas limit, so the resources a block can consume are limited, making a resource exhaustion attack ineffective Additionally, Rootstock nodes have an intelligent transaction rate limiter that protects the network from DoS attacks before transactions are included in blocks.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">Is Rootstock secure from miners abusing the gas system to acquire resources cheaply, as in Ethereum?</Accordion.Header>
    <Accordion.Body>
      - On Rootstock, there is a  minimum gas price, and therefore, miners cannot include transactions that pay zero fees. The block's miner only gets 10% of the fees paid, and the rest is distributed to future miners. Therefore, rogue miners cannot get platform resources at no cost. After Ethereum activated EIP-1559, Ethereum adopted a similar protection called the base fee.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">What is the address format of Rootstock, and how is it different from Bitcoin?</Accordion.Header>
    <Accordion.Body>
      - A Rootstock address is an identifier of 40 hexadecimal characters, while a Bitcoin address is an identifier of 26-35 alphanumeric characters. Rootstock addresses use uppercase and lowercase letters as a checksum mechanism.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">Is there a correlation between BTC and Rootstock addresses despite looking like ETH addresses?</Accordion.Header>
    <Accordion.Body>
      - Rootstock addresses are similar to Ethereum addresses. To avoid situations where users mistakenly send funds to Ethereum addresses or vice versa, Rootstock uses an address checksum mechanism that distinguishes between chains. This is currently in use in almost all Ethereum-like networks. Although this is not enforced in the node itself, it’s important to consider it at the client level (e.g., wallets). The checksum mechanism is described in the [RSKIP-60](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md) Rootstock Improvement Proposal.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>


## Rootstock and RIF Services

<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is RIF, and what are its goals?</Accordion.Header>
    <Accordion.Body>
      - [Rootstock Infrastructure Framework](/concepts/rif-suite/) (RIF) is a suite of open and decentralized infrastructure protocols that enable faster, easier, and more scalable distributed application development (dApps) within a unified environment. RIF  is built on the Rootstock smart contract network, the first general-purpose smart contract secured by the Bitcoin network. RIF  includes support for decentralized, third-party, off-chain payment networks; and easy-to-use interfaces for developers.
      - RIF aims to bridge the gap between blockchain technologies and their mass-market adoption by providing developers and users access to various services across multiple crypto-economies.
      -  The RIF (Rootstock Infrastructure Framework) token makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on [RootstockCollective DAO](https://rootstockcollective.xyz/). By staking RIF, users can mint stRIF; the governance token of the RootstockCollective used for voting, proposal creation, and rewards allocation. For more information, read the [Rootstock Collective Whitepaper](https://wiki.rootstockcollective.xyz/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">What exactly is the value proposition of RIF?</Accordion.Header>
    <Accordion.Body>
      - RIF is a service layer built on the Rootstock blockchain, offering open, decentralized tools and technologies. With RIF, developers can create scalable DeFi products quickly and easily.
      - The RIF (Rootstock Infrastructure Framework) token makes it easier, faster and more rewarding to build on Bitcoin. It also enables governance on [RootstockCollective DAO](https://rootstockcollective.xyz/). By staking RIF, users can mint stRIF; the governance token of the RootstockCollective used for voting, proposal creation, and rewards allocation. For more information, read the [Rootstock Collective Whitepaper](https://wiki.rootstockcollective.xyz/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">What is RIF Name Service?</Accordion.Header>
    <Accordion.Body>
      - [RIF Name Service](/concepts/rif-suite/) (RNS) is a protocol that enables the identification of blockchain addresses by human-readable names or aliases. It can identify other personal resources, such as payment or communication addresses, smart contracts, and Non-Fungible Tokens (NFTs).
      - RNS makes interacting with blockchain resources easier, more user-friendly and enhances interoperability across different platforms.
      > You can learn more about RNS by visiting the [RIF website](https://rif.technology) or reading the [RIF White Paper](https://rif.technology/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">Can I register a domain in RNS and then sell it in a secondary market?</Accordion.Header>
    <Accordion.Body>
      - Anyone registering a domain in RNS can sell the domain directly or using a third-party secondary market.
    </Accordion.Body>
  </Accordion.Item>
  <!-- <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">What is RIF Rollup? How does RIF Rollup L2 Solution scale Payments on Rootstock?</Accordion.Header>
    <Accordion.Body>
      - RIF Rollup is a trustless protocol for fast, scalable, low-cost payments on Rootstock. ZkRollup Technology powers it and is a fork of the Zero Knowledge zkSync Lite (v1) developed by Matter Labs. Its current functionality and scope include low gas transfers of RBTC and ERC20 tokens on the Rootstock network.
      - RIF Rollup is a layer 2 scaling solution that operates on top of the Rootstock mainnet (layer 1) to increase transaction processing capacity, reduce latency, and lower transaction costs. It uses zk-SNARKs (Succinct Non-Interactive ARgument of Knowledge) to prove the correctness of batches of transactions. It uses on-chain data availability to keep users’ funds safe while maintaining the security of layer-1 (Rootstock).
      - Here's how it works:
      > A group of layer 2 transactions are included in a Rollup block. State changes associated with all layer 2 transactions are communicated to layer 1 using transaction call data. In case of some irrecoverable failure of the rollup system, data availability permits users to reconstruct the layer 2 state and recover locked assets from the rollup contract. For each Rollup block, a SNARK (a family of cryptographic proof systems) is generated to prove the validity of every single transaction in the Rollup block. Once the proof is generated, it can be verified using the Rollup contract on layer 1.
    </Accordion.Body>
  </Accordion.Item> -->
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">What is RBTC Flyover?</Accordion.Header>
    <Accordion.Body>
      - The [RBTC Flyover](/developers/integrate/flyover/) is an innovative protocol built on top of the Rootstock network that significantly speeds up the process of transferring Bitcoin (BTC) to Rootstock Bitcoin (RBTC). It achieves this by leveraging a pool of liquidity providers who hold both BTC and RBTC, enabling near-instantaneous transfers with minimal confirmations.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">What is RIF Wallet?</Accordion.Header>
    <Accordion.Body>
      - RIF Wallet is an open-source wallet framework that allows businesses and developers to quickly build a unique wallet experience, giving users full control of their assets.
      - Its smart contract technology enables functionalities that enhance security, usability, and adoption. RIF Wallet is an open-source wallet framework that allows businesses and developers to quickly build a wallet experience, giving users full control of their assets.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>


## Rootstock Security and Scalability

<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is the PowPeg Federation, and what is its role in the PowPeg?</Accordion.Header>
    <Accordion.Body>
      - The PowPeg Federation is a group of functionaries that run specialized hardware called PowHSMs to facilitate the transfer of bitcoins between the main chain and the side chain and protect the bitcoins locked in the 2 way peg between Rootstock and Bitcoin. The PowPeg Federation does not directly control the private keys of the Bitcoin multisig but only signs transactions that are proven valid by enough cumulative work. The PowPeg Federation also provides a watch tower service to inform the Rootstock Bridge smart contract about peg-in transactions. The PowPeg Federation's role is to keep their hardware and nodes connected and alive at all times and to audit the changes in the PowHSM, the PowPeg node, and the communication between them.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">How does the PowPeg work?</Accordion.Header>
    <Accordion.Body>
      - The Rootstock peg has several modes to accomplish transfers: version 1, version 2, and the RBTC flyover. The version 1 protocol is quite simple. When a Bitcoin user wants to use the PowPeg, he sends a peg-in transaction to a multisig wallet whose funds are secured by the PowPeg. The same public key associated with Bitcoin addresses related to the source bitcoins in a peg-in transaction is used on the Rootstock chain to obtain the destination address where the Smart Bitcoins are received. Although both Bitcoin and Rootstock's public and private keys are similar, each blockchain encodes the address in a different format. This means that the addresses on both blockchains are different but can be proven to belong to the same person.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">What is the Armadillo monitoring system?</Accordion.Header>
    <Accordion.Body>
      > - How does it protect the Rootstock network from malicious miners?
      - The Armadillo monitoring system is a tool that detects and alerts about potential attacks on the Rootstock network. It uses the Rootstock network's block headers and the Bitcoin network's coinbase information to measure the percentage of honest merge-mining. If the percentage drops below 50%, most miners could be trying to attack the Rootstock network by creating a hidden chain or censoring transactions.
      - The Armadillo system protects the Rootstock network from malicious miners by providing timely and accurate information to the nodes and the community. The Rootstock nodes can use the Armadillo data to adjust their security parameters and reject blocks that are not sufficiently visible. The community can use the Armadillo data to monitor the network's health and take actions to mitigate the risk of an attack.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">What is the Rootstock virtual machine, and how is it compatible with Ethereum?</Accordion.Header>
    <Accordion.Body>
      - The Rootstock virtual machine (RVM) is the core of the Rootstock smart contract platform. The RVM is a forked version of the Ethereum virtual machine (EVM), meaning it can execute the same bytecode and opcodes as the EVM. The RVM is compatible with Ethereum smart contracts and the tools used to deploy and interact with them, such as Solidity, Hardhat, Foundry, Remix, etc. The RVM also has features such as native support for Bitcoin opcodes, precompiled contracts for elliptic curve cryptography, and a performance improvement pipeline.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">What is the Rootstock PowPeg, and how does it work?</Accordion.Header>
    <Accordion.Body>
      - The Rootstock 2 way peg is a protocol that allows users to transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and back, creating a token called RBTC that is pegged to the value of Bitcoin. The Rootstock 2 way peg works by locking bitcoins in a multi-signature address on the Bitcoin side and releasing an equivalent amount of RBTC on the Rootstock side. The reverse process is also possible by burning RBTC on the Rootstock side and unlocking bitcoins on the Bitcoin side. A group of reputable organizations controls the multi-signature address called the PowPeg Federation, which uses special hardware devices called PowHSMs to protect private keys and validate transactions. The PowHSMs only sign transactions approved by both the Rootstock and Bitcoin networks using a proof-of-work mechanism. This way, the Rootstock 2 way peg ensures high security and decentralization for the peg-in and peg-out transactions.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
