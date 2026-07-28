---
sidebar_label: Overview
sidebar_position: 1
title: Fundamentos de Rootstock
tags:
  - rsk
  - rootstock
  - principiante
  - conceptos
description: "La infraestructura financiera de Bitcoin: una sidechain de Bitcoin compatible con EVM, asegurada por más del 85% del hashrate de Bitcoin para lending, payments, yield y treasury."
---

## ¿Qué es Rootstock?

Rootstock es la infraestructura financiera de Bitcoin. Es una sidechain de Bitcoin de código abierto y compatible con EVM, asegurada por más del 85% del poder de hash de Bitcoin mediante merge mining. Empresas, instituciones financieras y builders la usan para lanzar productos de lending, payments, yield y treasury asegurados por Bitcoin con tooling de Ethereum.

Vea la [Stack de Rootstock](/concepts/foundations/stack/) y el hub de [Seguridad en Rootstock](/concepts/foundations/security/).

## ¿Cómo se conecta Rootstock a bitcoin?

### Minería fusionada con Bitcoin

El primer punto de contacto es la minería.

Los mineros de Bitcoin hacen lo que se conoce como [minería fusionada](/node-operators/merged-mining/), asegurando ambas redes con la misma infraestructura y consumo de energía.

Crean bloques en la red de bitcoin cada 10 minutos, incluyendo la transferencia de bitcoins entre diferentes direcciones, generando nuevos bitcoins en el proceso.

En Rootstock, los bloques se crean cada 30 segundos para asegurar la ejecución de los contratos inteligentes. Esto no genera nuevas monedas en el proceso, pero sí obtiene una recompensa de la minería fusionada.

> Consulte [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) para obtener más información sobre la minería.

### Powpeg con Bitcoin

El segundo punto de contacto es el [Powpeg](/concepts/foundations/powpeg/), también conocido como bridge.

Este componente conecta ambas redes para permitir la transferencia de bitcoins a Rootstock, lo que a su vez permite a los desarrolladores interactuar con contratos inteligentes. Ellos pagan el gas en rBTC, que está anclado 1:1 con BTC.

Para ello, usted envía bitcoins a una dirección especial donde quedan bloqueados en la red de Bitcoin. A continuación, en la misma dirección en la red de Rootstock, esos mismos bitcoins son liberados al usuario para su uso en la red de Rootstock. Esto se llama peg-in.

Puede realizar la operación inversa, llamada peg-out, enviando sus bitcoins a una dirección especial en la red de Rootstock y recibiendo sus bitcoins de vuelta en la red de Bitcoin.
