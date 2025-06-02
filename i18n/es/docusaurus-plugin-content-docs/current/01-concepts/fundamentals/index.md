---
sidebar_label: Fundamentos de Rootstock
sidebar_position: 2
title: Fundamentos de Rootstock
tags:
  - rsk
  - rootstock
  - principiante
  - conceptos
description: Rootstock es la primera cadena lateral de Bitcoin y la más duradera. Es la única solución de layer 2 que combina la seguridad de la prueba de trabajo de Bitcoin con las capacidades de contratos inteligentes de Ethereum.
---

## ¿Qué es Rootstock?

Rootstock es la primera cadena lateral de Bitcoin y la más duradera. Es la única solución de layer 2 que combina la seguridad de la prueba de trabajo de Bitcoin con las capacidades de contratos inteligentes de Ethereum. La plataforma es de código abierto, compatible con la máquina virtual de Ethereum y asegurada por más del 60 % del poder de hashing de Bitcoin, lo que la convierte en la puerta de entrada a un floreciente ecosistema de dApp que continúa evolucionando para convertirse en una plataforma sin necesidad de intermediarios de confianza.

Vea la [Pila de Rootstock](/concepts/fundamentals/stack/).

## ¿Cómo se conecta Rootstock a bitcoin?

### Minería fusionada con Bitcoin

El primer punto de contacto es la minería.

Los mineros de Bitcoin hacen lo que se conoce como [minería fusionada](/node-operators/merged-mining/), asegurando ambas redes con la misma infraestructura y consumo de energía.

Crean bloques en la red de bitcoin cada 10 minutos, incluyendo la transferencia de bitcoins entre diferentes direcciones, generando nuevos bitcoins en el proceso.

En Rootstock, los bloques se crean cada 30 segundos para asegurar la ejecución de los contratos inteligentes. Esto no genera nuevas monedas en el proceso, pero sí obtiene una recompensa de la minería fusionada.

> Consulte [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) para obtener más información sobre la minería.

### Powpeg con Bitcoin

El segundo punto de contacto es el [Powpeg](/concepts/powpeg/), también conocido como bridge.

Este componente conecta ambas redes para permitir la transferencia de bitcoins a Rootstock, lo que a su vez permite a los desarrolladores interactuar con contratos inteligentes. Ellos pagan el gas utilizando el mismo bitcoin, el smart bitcoin.

Para ello, usted envía bitcoins a una dirección especial donde quedan bloqueados en la red de Bitcoin. A continuación, en la misma dirección en la red de Rootstock, esos mismos bitcoins son liberados al usuario para su uso en la red de Rootstock. Esto se llama peg-in.

Puede realizar la operación inversa, llamada peg-out, enviando sus bitcoins a una dirección especial en la red de Rootstock y recibiendo sus bitcoins de vuelta en la red de Bitcoin.
