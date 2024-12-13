---
sidebar_position: 1500
sidebar_label: Glossary
title: "Glossary"
description: "Welcome to the glossary section for the PowPeg App documentation."
tags: [powpeg app, peg-in, peg-out, bridge, rsk, rootstock]
---

See a list of terms about/related to the PowPeg App and their meanings.

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">What is the PowPeg App?</Accordion.Header>
    <Accordion.Body>
       - The [PowPeg](https://powpeg.rootstock.io/) App is a web application that fosters the interaction between the bitcoin blockchain and the Rootstock network for faster exchange of BTC and RBTC. See the [github repo](https://github.com/rsksmart/2wp-app).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">Amount in BTC</Accordion.Header>
    <Accordion.Body>
      - The amount a user is sending. Not less than `0.005 BTC`.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Device account address</Accordion.Header>
    <Accordion.Body>
      - The account address the user is sending from in BTC.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">Destination Rootstock address</Accordion.Header>
    <Accordion.Body>
      - The account address to receive the RBTC.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">Hardware Wallet</Accordion.Header>
    <Accordion.Body>
      - A hardware wallet is a special-purpose device configured to accept supported cryptocurrencies and tokens. Hardware wallets usually take the form of a physical device. Examples of hardware wallets are [Ledger](https://shop.ledger.com/products/ledger-nano-s-plus) and [Trezor](https://shop.trezor.io/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">Legacy address</Accordion.Header>
    <Accordion.Body>
      - Legacy address is the original BTC address. It is the most expensive address type because it uses the most amount of space inside a transaction.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">Mainnet</Accordion.Header>
    <Accordion.Body>
      - Assets on mainnet have real value and should be used only in Production.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">Native SegWit address</Accordion.Header>
    <Accordion.Body>
      - The SegWit native transaction is `Bech32`, and crypto wallets that support SegWit generally incur lower fees.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">Network Fee</Accordion.Header>
    <Accordion.Body>
      - A Network Fee, as the name implies, is a fee you pay to a blockchain network for transferring a digital asset on that network.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">Peg-ins</Accordion.Header>
    <Accordion.Body>
      - A conversion from BTC to RBTC. In the peg-in process, the customer sends some BTC and gets the equivalent amount in RBTC inside the Rootstock Blockchain network. The peg-in process is **final and cannot be reverted**, it requires **100** Bitcoin block confirmation which is approximately 200 Rootstock Blocks.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">Peg-outs</Accordion.Header>
    <Accordion.Body>
      - A conversion from RBTC to BTC. This locks RBTC on the Rootstock network and releases BTC on the Bitcoin network. 
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="11">
    <Accordion.Header as="h3">Refund Bitcoin address</Accordion.Header>
    <Accordion.Body>
      - The bitcoin address to be refunded.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="12">
    <Accordion.Header as="h3">What's the PowPeg Protocol?</Accordion.Header>
    <Accordion.Body>
      - The powpeg protocol is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. Read more about the [Powpeg](/concepts/powpeg/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="13">
    <Accordion.Header as="h3">SegWit address</Accordion.Header>
    <Accordion.Body>
      - Segwit, short for Segregated Witness, is an upgrade to the Bitcoin protocol, it separates the digital signature (also known as “the witness”) from the transaction, it is a newer address format with lower fees. It makes Bitcoin transaction sizes smaller, which allows Bitcoin to handle more transactions at once (scalability). Watch the video: [What is Segwit? Explained](https://youtu.be/f3CFUbeehc8).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="14">
    <Accordion.Header as="h3">Software Wallet</Accordion.Header>
    <Accordion.Body>
      - A software wallet is an application that is installed on a computer or smartphone. The private keys are stored on the computer or smartphone.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="15">
    <Accordion.Header as="h3">Testnet</Accordion.Header>
    <Accordion.Body>
      - This is a testing network used for testing and development purposes, assets on the Testnet have zero value, funds used in this network are called Test tokens (tRBTC), they can be gotten through a faucet that dispenses tokens. These tokens are utility tokens that are required to operate certain dApps. Developers of those dApps also need to test them on the Testnet, and hence these are provided as a convenience for them. The Rootstock network provides a cryptocurrency faucet. The tRBTC faucet provides the cryptocurrency required to pay for gas fees on the Rootstock Testnet. See how to get tRBTC using the [Rootstock Faucet](https://faucet.rootstock.io/). Additional faucet options include; [Thirdweb](https://thirdweb.com/rootstock-testnet) and [Blast](https://blastapi.io/faucets/rootstock-testnet) Faucets.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="16">
    <Accordion.Header as="h3">Transaction fee</Accordion.Header>
    <Accordion.Body>
      - The transaction fee, its equivalent, is specified in BTC and USD.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="17">
    <Accordion.Header as="h3">Transaction total</Accordion.Header>
    <Accordion.Body>
      - This comprises of the BTC amount + transaction fee selected.
    </Accordion.Body>
  </Accordion.Item>
     <Accordion.Item eventKey="18">
    <Accordion.Header as="h3">Flyover transactions</Accordion.Header>
    <Accordion.Body>
      - Click [here](/developers/integrate/flyover/) to know more about flyover transactions.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="19">
    <Accordion.Header as="h3">What is the PowPeg App testnet</Accordion.Header>
    <Accordion.Body>
      - Click [here to open PowPeg](https://powpeg.testnet.rootstock.io/) on Testnet.
    </Accordion.Body>
  </Accordion.Item>

</Accordion>