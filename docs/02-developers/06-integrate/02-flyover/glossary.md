---
sidebar_label: Glossary
sidebar_position: 300
title: Glossary
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The PowPeg is a user-friendly interface for the conversion of BTC to RBTC and vice versa. It is secured by the powpeg protocol, which is a unique 2-way peg system that allows users to natively transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice versa, creating a token called RBTC that is pegged to the value of Bitcoin.
---

See a list of terms about/related to the Flyover and their meanings.

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">RBTC</Accordion.Header>
    <Accordion.Body>
       - RBTC is the token used to pay for the execution of transactions in Rootstock. You can convert BTC into RBTC by sending BTC through the Powpeg (both in Testnet and Mainnet), or by using the faucet in Testnet, or via decentralized exchanges.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">PowPeg</Accordion.Header>
    <Accordion.Body>
      - The Rootstock powpeg is a a user-friendly interface developed by Rootstock that allows users to interact with both the traditional PowPeg and the faster Flyover system for Bitcoin-Rootstock transfers. It uses the traditional powpeg protocol that allows users to natively transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice versa, creating a token called RBTC that is pegged to the value of Bitcoin. The Rootstock PowPeg works by locking bitcoins in a multi-signature address on the Bitcoin side and releasing an equivalent amount of RBTC on the Rootstock side. The reverse process is also possible by burning RBTC on the Rootstock side and unlocking bitcoins on the Bitcoin side, Therefore, native peg-in and native peg-out transactions require a high number of block confirmations. Peg-ins require 100 Bitcoin blocks (approximately 16 hours), and peg-outs require 4000 Rootstock blocks (approximately 33 hours).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Liquidity Providers (LP)</Accordion.Header>
    <Accordion.Body>
      - Also known as LPs, these are entities that supply both Bitcoin (BTC) and Rootstock Bitcoin (RBTC) to the Flyover protocol to facilitate fast and secure transfers between the two networks.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">Flyover SDK</Accordion.Header>
    <Accordion.Body>
      -  A set of tools and code libraries provided by Flyover to facilitate the integration of Flyover functionalities into decentralized applications.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">Peg-in</Accordion.Header>
    <Accordion.Body>
      - A conversion from BTC to RBTC is known as a peg-in. In this process, the user sends Bitcoin (BTC) to a designated address and receives an equivalent amount of Rootstock Bitcoin (RBTC) within the Rootstock blockchain network. **The peg-in process is irreversible**. When using the **Faster Option (Flyover)**, this process typically requires 2 Bitcoin block confirmations, which is approximately 20 minutes.
      - Note that Bitcoin block confirmation times can vary, particularly during periods of network congestion. This may result in delays for transactions to be included in the first block.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">Peg-out</Accordion.Header>
    <Accordion.Body>
      - A conversion from RBTC to BTC involves locking RBTC on the Rootstock network and releasing BTC on the Bitcoin network. When using the **Faster Option (Flyover)**, this process typically requires 10 Rootstock block confirmations (approximately 5 minutes) for users to receive their funds.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">Quote</Accordion.Header>
    <Accordion.Body>
      - A quote defines the terms of the service that the Liquidity Provider will provide to a given user, each quote is unique and contains several parameters,  so if the same request is done multiple times it will result in different quotes.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">Liquidity Provider Server</Accordion.Header>
    <Accordion.Body>
      - A Liquidity Provider Server (LPS) acts as a key component of the Flyover protocol by managing liquidity between the Bitcoin and Rootstock networks. Interacting directly with the [Liquidity Bridge Contract (LBC)](https://github.com/rsksmart/liquidity-bridge-contract), the LP server fulfills requests for token swaps by holding reserves of both BTC and RBTC. It executes complex operations such as collateral management, fund transfers, and fee adjustments.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>