---
sidebar_label: FAQs
sidebar_position: 310
title: Frequently Asked Questions
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The PowPeg is a user-friendly interface for the conversion of BTC to RBTC and vice versa. It is secured by the powpeg protocol, which is a unique 2-way peg system that allows users to natively transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and vice versa, creating a token called RBTC that is pegged to the value of Bitcoin.
---

Here, you can find a list of frequently asked questions (FAQs) about the RBTC Flyover.

## General 

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. What is RBTC Flyover?</Accordion.Header>
    <Accordion.Body>
      - RBTC Flyover is an innovative protocol built on top of the Rootstock network that significantly speeds up the process of transferring Bitcoin (BTC) to Rootstock Bitcoin (RBTC). It achieves this by leveraging a pool of liquidity providers who hold both BTC and RBTC, enabling near-instantaneous transfers with minimal confirmations.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. How does Flyover compare to the traditional PowPeg?</Accordion.Header>
    <Accordion.Body>
      - The PowPeg requires a lengthy 100-block confirmation period for security, resulting in transfer times of around 16 hours. Flyover, on the other hand, can be configured by the Liquidity Provider to be as low as 2 block confirmations (depending on the liquidity provider), reducing transfer times significantly to as low as 10-20 minutes.
      - Note: For peg outs, LPs will need to wait for 2 Bitcoin block confirmations before receiving a refund.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Is Flyover secure?</Accordion.Header>
    <Accordion.Body>
      - Yes, Flyover is built on top of the proven security of the PowPeg. It inherits the same security guarantees while offering significantly faster transfer speeds.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## For Developers

<Accordion>
<Accordion.Item eventKey="0">
    <Accordion.Header as="h3">4. How can I integrate Flyover in my dApp? </Accordion.Header>
    <Accordion.Body>
      - Integrating Flyover into your application is straightforward using the Flyover SDK. This developer-friendly toolkit provides the necessary tools and code samples needed to easily integrate Flyover features and functionalities. See [how to get started with the SDK integration](/developers/integrate/flyover/sdk/).
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="1">
    <Accordion.Header as="h3">5. What are the benefits of using Flyover in my dApp?</Accordion.Header>
    <Accordion.Body>
      - By integrating Flyover, you offer your users an enhanced user experience with significantly faster Bitcoin-Rootstock transfers. This can attract more users and increase engagement with your platform.
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="5">
    <Accordion.Header as="h3">6. Is the Flyover SDK Customizable? </Accordion.Header>
    <Accordion.Body>
        - Yes, the Flyover SDK provides customization options to tailor the integration to your specific application requirements. You can configure various parameters to fit your user needs.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## For Liquidity Providers

<Accordion>
<Accordion.Item eventKey="0">
    <Accordion.Header as="h3">7. How do I become a Liquidity Provider?</Accordion.Header>
    <Accordion.Body>
        - To become a Liquidity Provider (LP), you'll need to set up and run the Liquidity Provider Service (LPS). Once the LPS is operational, it will automatically register itself with the configured wallet address. See [how to get started as an LP](/developers/integrate/flyover/LP/get-started/).
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="1">
    <Accordion.Header as="h3">8. What’s the minimum recommended amount of Liquidity?</Accordion.Header>
    <Accordion.Body>
       - The minimum required collateral is **0.06 RBTC**, regardless of the total liquidity provided. This collateral is paid upon transaction registration. The recommended amount of liquidity depends on the anticipated volume of concurrent operations the LP wishes to support. A higher liquidity level enables the LP to handle more transactions simultaneously.
       - Note: For peg outs, LPs will need to wait for 2 Bitcoin block confirmations before receiving a refund.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">9. Can I become both an integrator and a Liquidity Provider?</Accordion.Header>
    <Accordion.Body>
        - Yes, you can integrate Flyover into your platform and simultaneously act as a Liquidity Provider. This allows you to benefit from both sides of the system by maintaining control over liquidity management, potentially reducing costs, and creating synergies within your platform. To achieve this, integrate the Flyover SDK, configure your own LPS, and direct user transactions to your LPS within your platform's code.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">10. What are the benefits of being a Liquidity Provider?</Accordion.Header>
    <Accordion.Body>
        - As a liquidity provider, you contribute to the growth of the Rootstock ecosystem while earning fees on every transfer facilitated through your liquidity. You also gain exposure to a wider user base.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">11. Are there any risks associated with being a Liquidity Provider?</Accordion.Header>
    <Accordion.Body>
        - To safeguard against financial loss, Liquidity Providers are responsible for the security of their wallets and private keys. For detailed guidelines, refer to the sections on [Wallet Management](/developers/integrate/flyover/LP/management/) and the Security Requirements.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

## For Users - Converting BTC to RBTC and vice versa

<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">11. How can I use Flyover to transfer BTC to RBTC?</Accordion.Header>
    <Accordion.Body>
        - The easiest way to use Flyover is through the PowPeg. This user-friendly interface guides you through the transfer process, allowing you to quickly and securely convert your BTC to RBTC.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">12. Does it cost money to use the PowPeg? </Accordion.Header>
    <Accordion.Body>
        - The Flyover protocol maintains consistent fees across all integrated applications including the [PowPeg](/developers/integrate/flyover/powpeg/). Fee variations arise primarily from the specific Liquidity Provider (LP) chosen and the network transaction fees.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="12">
    <Accordion.Header as="h3">13. Why is Flyover improving the user experience for the PowPeg?</Accordion.Header>
    <Accordion.Body>
        - Flyover significantly enhances the user experience by reducing the wait times for Bitcoin-Rootstock transfers from hours to minutes. This makes interacting with the Rootstock ecosystem much more convenient and efficient.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>