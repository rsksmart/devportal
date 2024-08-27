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
description: Conversión de RBTC a BTC (peg-in) y de BTC a RBTC (peg-out), tanto para Mainnet como para Testnet.
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

## Guía del usuario

- [Guía Mainnet](/concepts/rbtc/networks#mainnet-conversion)
- [Guía Testnet](/concepts/rbtc/networks#testnet-conversion)

Puede probar el proceso de conversión utilizando cualquiera de las opciones siguientes;

- Utilizar una [cartera hardware ledger](/concepts/rbtc/conversion-with-ledger)
- Utilizando un [software](/conceptos/rbtc/conversion-con-nodo-consola)

## Vídeo

Vea este vídeo explicativo sobre **Cómo realizar conversiones BTC y R-BTC utilizando el Powpeg de Rootstock**.

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/XTpQW9Rw838" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Preguntas frecuentes

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">¿Con qué frecuencia cambia la dirección de la Federación de Rootstock?</Accordion.Header>
    <Accordion.Body>
      La dirección de la Federación de Rootstock ha cambiado varias veces desde el lanzamiento de la red principal de Rootstock.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">¿Pierdo mi Bitcoin si la dirección de la Federación Rootstock cambia durante mi transferencia?</Accordion.Header>
    <Accordion.Body>
      Hay un periodo de gracia para el cambio de dirección de la Federación de Rootstock. Aún podrá bloquear Bitcoin y obtener RBTC durante el periodo de gracia. Sin embargo, cualquier Bitcoin enviado a la antigua dirección de la Rootstock Federation se perderá después del periodo de gracia.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

### Comentarios

Únase a la [Rootstock Global Discord Community](https://rootstock.io/discord), para hacer preguntas y obtener respuestas.
