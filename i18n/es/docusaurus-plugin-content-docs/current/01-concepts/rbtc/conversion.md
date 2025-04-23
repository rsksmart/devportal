---
title: "Conversión RBTC: Peg in y Peg out"
sidebar_label: Entrada y salida de clavijas
tags:
  - rsk
  - portainjertos
  - rbtc
  - conversión
  - peg
  - 2 vías
  - clavija
  - peg-out
  - federación
  - powpeg
description: Converting BTC to RBTC (peg-in) and RBTC to BTC (peg-out), for both Mainnet and Testnet.
sidebar_position: 301
---

En este artículo, explicamos paso a paso cómo convertir de BTC a RBTC, y viceversa.
El proceso de conversión utiliza un mecanismo [Powpeg](/concepts/powpeg/). Por lo tanto, estas conversiones se denominan peg-ins y peg-outs.

- **Peg-in**:
  - Conversión de BTC a RBTC
  - Bloquea BTC en la dirección de la Federación BTC
  - Libera RBTC en la dirección derivada de Rootstock
- **Peg-out**:
  - Conversión de RBTC a BTC
  - Bloquea RBTC en la red Rootstock
  - Libera BTC en la red Bitcoin

## Compatibilidad

**Los tipos de direcciones que se aceptan para la Federación son**:

- Legado (P2PKH)
- Compatible con Segwit (P2SH-P2WPKH)

:::info[Note]
En las Testnets, los símbolos de los tokens van precedidos de una "t" minúscula.
Así, tenemos `BTC` y `RBTC` en las Mainnets, que corresponden a `tBTC` y `tRBTC` de las Testnets.
:::

### Verificador de direcciones

Introduzca a continuación su dirección de BTC para comprobar si puede utilizarse para pasar de BTC a RBTC.

<AddressVerifier />

## User Guide

- [Mainnet Guide](/concepts/rbtc/networks#mainnet-conversion)
- [Testnet Guide](/concepts/rbtc/networks#testnet-conversion)

You can try the conversion process using either options below;

- Using a [ledger hardware wallet](/concepts/rbtc/conversion-with-ledger)
- Using a [software](/concepts/rbtc/conversion-with-node-console)

## Video

Watch this explainer video on **How to do BTC & R-BTC Conversions using the Rootstock Powpeg**.

<iframe width="949" height="534" src="https://youtube.com/embed/XTpQW9Rw838" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### FAQs

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">How often does the Rootstock Federation address change?</Accordion.Header>
    <Accordion.Body>
      Rootstock Federation address has changed several times since Rootstock mainnet launch.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Do I lose my Bitcoin if the Rootstock Federation address change during my transfer?</Accordion.Header>
    <Accordion.Body>
      There is a grace period for the Rootstock Federation address change. You will still be able to lock Bitcoin and get RBTC during the grace period. However, any Bitcoin sent to the old Rootstock Federation address will be lost post to the grace period.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

### Feedback

Join the [Rootstock Global Discord Community](https://rootstock.io/discord), to ask questions and get answers.
