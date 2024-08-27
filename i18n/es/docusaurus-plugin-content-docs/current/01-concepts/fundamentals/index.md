---
sidebar_label: Fundamentos de los portainjertos
sidebar_position: 2
title: Fundamentos de los portainjertos
tags:
  - rsk
  - portainjertos
  - principiante
  - conceptos
description: Rootstock es la primera y más duradera cadena lateral de Bitcoin. Es la única solución de capa 2 que combina la seguridad de la prueba de trabajo de Bitcoin con las capacidades de contrato inteligente de Ethereum.
---

## ¿Qué es el portainjertos?

Rootstock es la primera y más duradera cadena lateral de Bitcoin. Es la única solución de capa 2 que combina la seguridad de la prueba de trabajo de Bitcoin con las capacidades de contrato inteligente de Ethereum. La plataforma es de código abierto, compatible con EVM y asegurada por más del 60% de la potencia de hashing de Bitcoin, lo que la convierte en la puerta de entrada a un vibrante ecosistema de dApps que sigue evolucionando para convertirse en totalmente fiable.

Véase la [Pila de rizomas](/conceptos/fundamentos/pila/).

## ¿Qué relación tiene Rootstock con bitcoin?

### Minería fusionada con Bitcoin

El primer punto de contacto es la minería.

Los mineros de bitcoin hacen lo que se conoce como
[merged mining](/node-operators/merged-mining/),
asegurando ambas redes con la misma infraestructura y consumo energético.

Crean bloques en la red bitcoin cada 10 minutos,
incluida la transferencia de bitcoin desde diferentes direcciones
y en el proceso crean nuevos bitcoins.

En Rootstock, los bloques se crean cada 30 segundos,
para asegurar la ejecución de contratos inteligentes.
Esto no acuña nuevas monedas en el proceso,
pero sí obtiene una recompensa de la minería fusionada.

> Consulte [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/) para obtener más información sobre la minería.

### Powpeg con Bitcoin

El segundo punto de contacto es el
[Powpeg](/conceptos/powpeg/),
también conocido como el puente.

Este componente conecta ambas redes para permitir a
la transferencia de bitcoins a Rootstock,
permitiendo así a los desarrolladores interactuar con contratos inteligentes.
Pagan el gas utilizando el mismo bitcoin, el bitcoin inteligente.

Para ello, se envían bitcoin a una dirección especial,
, donde quedan bloqueados en la red bitcoin.
A continuación, en la misma dirección de la red Rootstock,
, se libera ese mismo bitcoin al usuario
para que lo utilice en la red Rootstock.
Esto se denomina "peg-in".

Puedes hacer la operación inversa llamada peg-out,
enviando tu bitcoin a una dirección especial en la red Rootstock,
y recibiendo tu bitcoin de vuelta en la red bitcoin.
