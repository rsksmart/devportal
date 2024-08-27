---
sidebar_position: 1300
sidebar_label: FAQs
title: "Frequently Asked Questions (FAQs)"
description: "Frequently asked questions."
tags: [2 way peg app, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

Here, you can find a list of frequently asked questions (FAQs) about the 2 way peg application.

````mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. What are the requirements to use 2wp-app?</Accordion.Header>
    <Accordion.Body>
      - To know more about the requirements, see [prerequisites](/resources/guides/two-way-peg-app/prerequisites/)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. What are the common errors in peg-out transactions?</Accordion.Header>
    <Accordion.Body>
      - To know more about the common errors, see [common errors](/resources/guides/two-way-peg-app/pegout/pegout-common-errors).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. How do I derive a BTC private key after sending RBTC through the PowPeg?</Accordion.Header>
    <Accordion.Body>
      - See section on [deriving electrum](/resources/guides/two-way-peg-app/pegout/deriving-electrum#getting-a-wallet-private-key) for how to export a private key.
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. What is the difference between SegWit and Legacy addresses?</Accordion.Header>
    <Accordion.Body>
      - Legacy address is the original BTC address while SegWit is the newer address format with lower fees. SegWit means Segregated Witness, where Segregated is to separate and Witness is the transaction signatures involved with a specific transaction.
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. What type of addresses do I need to perform a peg in?</Accordion.Header>
    <Accordion.Body>
      > - For information on the type of addresses to use when performing a peg-in transaction
      > - See the [supported addresses](/resources/guides/two-way-peg-app/advanced-operations/supported-addresses/) page.
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="5">
    <Accordion.Header as="h3">6. Why use the 2 way peg instead of the PowPeg directly? </Accordion.Header>
    <Accordion.Body>
        > - The 2 way peg app has a lot of benefits including enabling easier and simplified peg-in transactions.
        > - See [why use the 2 way peg app?](/resources/guides/two-way-peg-app/overview#why-use-the-2-way-peg-app) for a list of benefits when you use the application.
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="6">
    <Accordion.Header as="h3">7. What are the supported browsers to use 2wp-app?</Accordion.Header>
    <Accordion.Body>
        > - To know more about the supported browsers
        > - See the [supported browsers](/resources/guides/two-way-peg-app/advanced-operations/supported-browsers/).
    </Accordion.Body>
  </Accordion.Item>
<Accordion.Item eventKey="7">
    <Accordion.Header as="h3">8. What are the supported wallets to use 2wp-app?</Accordion.Header>
    <Accordion.Body>
       > - To know more about the requirements;
       > - See [supported wallets](/resources/guides/two-way-peg-app/advanced-operations/supported-wallets/).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">9. How long does it take for a native pegin transaction to complete?</Accordion.Header>
    <Accordion.Body>
        > - native pegin needs 17 hours to be completed
        > - ![Read popup info](/img/resources/two-way-peg-app/pegin-popup.png)
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">10. How long does it take for a native pegout transaction to complete?</Accordion.Header>
    <Accordion.Body>
        > - native pegin needs 34 hours to be completed
        > - ![Read popup info](/img/resources/two-way-peg-app/pegin-popup.png)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">11. What are the min and max for pegin transaction?</Accordion.Header>
    <Accordion.Body>
        > -   The minimum values allowed when creating a peg-in transaction is 0.005 BTC.
        > -   The maximum values allowed when creating a peg-in transaction is 10 BTC.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="11">
    <Accordion.Header as="h3">12. What are the min and max for pegout transaction?</Accordion.Header>
    <Accordion.Body>
        > -   The minimum values allowed when creating a peg-in transaction is 0.004 RBTC.
        > -   The maximum values allowed when creating a peg-in transaction is 10 RBTC.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="12">
    <Accordion.Header as="h3">13.After making a native pegout, to which address will I receive my BTCs?</Accordion.Header>
    <Accordion.Body>
        > - During the pegout process, the destination address of your BTC is derived from your signature, this enables one to know which address will receive the BTCs.
        > - See the [Derivation details page](/resources/guides/two-way-peg-app/pegout/deriving-electrum/)
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="13">
    <Accordion.Header as="h3">14.When using **Trezor** i'm receiving the error **Forbidden key path** ?</Accordion.Header>
    <Accordion.Body>
        > - The latest versions of Trezor Suite have implemented a security rule to disable its use with non-standard key paths. Therefore, the user must explicitly set **Perform Safety Checks** to **PROMPT** option in **Trezor Suite** in order to use the **Trezor wallet** in the 2wp-app application.
        > - If is not enabled you will receive this error ![Trezor Error Key Path](/img/resources/two-way-peg-app/trezor-error.png)
        > - This video explains how to enable **Perform Safety Checks** to **PROMPT** on **Trezor Suite** [Enabling Prompt for Key Path](/img/resources/two-way-peg-app/trezor-error-fixed.mp4)
        <Video url="/img/resources/two-way-peg-app/trezor-error-fixed.mp4" thumbnail="/img/resources/two-way-peg-app/trezor-error.png" />

    </Accordion.Body>
  </Accordion.Item>
</Accordion>
````


----

## Next

See [Glossary](/resources/guides/two-way-peg-app/glossary/) section for explanation of terms.
