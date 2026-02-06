---

## sidebar_label: Glossary

sidebar_position: 245  
title: Glossary  
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]  
description: Glossary of terms for the rBTC Flyover protocol

See a list of terms about the Flyover and their meanings.

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="flyover">
    <Accordion.Header as="h3">rBTC Flyover</Accordion.Header>
    <Accordion.Body>
      The rBTC Flyover is a protocol built on the Rootstock PowPeg that speeds up BTC–rBTC transfers by using a pool of Liquidity Providers (LPs) while preserving trust. In a peg-in, user funds go to the PowPeg federation (a decentralized multi-signature entity). In a peg-out, user funds go to the Liquidity Bridge Contract (LBC), a smart contract. The Liquidity Provider never receives or holds custody of user funds. Flyover inherits the same security guarantees as the PowPeg.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">rBTC</Accordion.Header>
    <Accordion.Body>
       - rBTC is the token used to pay for the execution of transactions in Rootstock. You can convert BTC into rBTC by sending BTC through the Powpeg (both in Testnet and Mainnet), or by using the faucet in Testnet, or via decentralized exchanges.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">PowPeg App</Accordion.Header>
    <Accordion.Body>
      - The PowPeg App is a user-friendly interface developed by Rootstock that allows users to interact with both the traditional PowPeg protocol and the faster Flyover system for Bitcoin-Rootstock transfers. It uses the traditional powpeg protocol that allows users to natively transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice versa, creating a token called rBTC that is pegged to the value of Bitcoin.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">PowPeg Protocol</Accordion.Header>
    <Accordion.Body>
      - The PowPeg protocol works by locking bitcoins in a multi-signature address on the Bitcoin side and releasing an equivalent amount of rBTC on the Rootstock side. The reverse process is also possible by burning rBTC on the Rootstock side and unlocking bitcoins on the Bitcoin side, Therefore, native peg-in and native peg-out transactions require a high number of block confirmations. Peg-ins require 100 Bitcoin blocks (approximately 16 hours), and peg-outs require 4000 Rootstock blocks (approximately 33 hours). Read more about [how the PowPeg Protocol works](/concepts/powpeg/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Liquidity Providers (LP)</Accordion.Header>
    <Accordion.Body>
      LPs are entities that supply BTC and rBTC liquidity so the Flyover can offer faster transfers. They do not receive or custody user funds. On peg-in, the federation receives the user's BTC. On peg-out, the Liquidity Bridge Contract holds and releases funds. LPs are repaid by the protocol after fulfilling a transfer and can earn configurable fees.
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
      A peg-in is a conversion from BTC to rBTC. The user sends BTC to a designated address and receives rBTC on Rootstock. In Flyover, the recipient of the user's BTC is the PowPeg federation (a decentralized multi-signature entity), not the Liquidity Provider. The peg-in process is irreversible. With Flyover, the process typically requires about 2 Bitcoin block confirmations (around 20 minutes). Bitcoin block confirmation times can vary during network congestion.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">Peg-out</Accordion.Header>
    <Accordion.Body>
      A peg-out is a conversion from rBTC to BTC. rBTC is locked on Rootstock and BTC is released on Bitcoin. In Flyover, the user's rBTC is locked in the Liquidity Bridge Contract (smart contract). The LP never receives or holds custody of the user's funds. With Flyover, users typically receive BTC after about 10 Rootstock block confirmations (around 5 minutes).
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
      The Liquidity Provider Server (LPS) manages an LP's liquidity and interacts with the [Liquidity Bridge Contract (LBC)](https://github.com/rsksmart/liquidity-bridge-contract). The LPS fulfills swap requests using the LP's reserves. User funds in Flyover always go to the federation (peg-in) or the LBC (peg-out), not to the LPS or LP wallets.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

