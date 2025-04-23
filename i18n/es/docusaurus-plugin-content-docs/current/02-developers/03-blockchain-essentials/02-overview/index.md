---
sidebar_label: Visión general de Blockchain
sidebar_position: 200
title: Primeros pasos en el desarrollo de portainjertos (RSK)
description: Aprenda a interactuar con Rootstock en su navegador web, a consultar las transacciones de Rootstock y a desarrollar e implementar su primer contrato inteligente en la red Rootstock.
tags:
  - arranques rápidos
  - rsk
  - portainjertos
  - blockchain
  - monederos de navegador
  - desarrolladores
  - principiantes
---

Conozca Rootstock, cómo permite contratos inteligentes en Bitcoin y su compatibilidad con Ethereum y otras plataformas.

## ¿Qué es el portainjertos?

La pila tecnológica completa de Rootstock está construida sobre Bitcoin:
Desde los contratos inteligentes de Rootstock hasta el marco de infraestructura de Rootstock.
La pila está diseñada para crear un sistema financiero más justo e inclusivo.

> Véase [La pila](/conceptos/fundamentos/pila/)

Bitcoin, is a store and transfer of value.
The blockchain is secure because miners with high infrastructure and energy costs create new blocks to be added to the blockchain every 10 minutes.
The more hashing power they provide, the more secure the network is.
Rootstock is the first open source smart contract platform that is powered by the bitcoin network.
Rootstock’s goal is to add value and functionality to the bitcoin ecosystem by enabling smart-contracts,
near instant payments, and higher-scalability.
RIF is an all-in-one suite of open and decentralized infrastructure applications and services that enable faster,
easier and scalable development of distributed applications (dApps) within a unified blockchain environment.

Rootstock está conectado a Bitcoin en términos de cómo se minan sus bloques,
y también en términos de una moneda común.
Rootstock también es compatible con Ethereum en términos de su máquina virtual (que ejecuta contratos inteligentes),
así como la RPC (API externa) que expone.
Veamos brevemente cada una de estas áreas.

## Powpeg

El segundo punto de contacto es el [Powpeg](/conceptos/powpeg/).
Este componente conecta ambas redes para permitir la transferencia de bitcoins a Rootstock,
permitiendo así a los desarrolladores interactuar con contratos inteligentes.
Pagan el gas utilizando el mismo bitcoin, el bitcoin inteligente.

<div class="sprite-transform-animation-wrapper rsk-peg">
  <div class="sprite-transform-animation rsk-peg"></div>
</div>

Para ello, se envían bitcoin a una dirección especial,
, donde quedan bloqueados en la red bitcoin.
A continuación, en la misma dirección de la red Rootstock,
, se libera ese mismo bitcoin para que el usuario lo utilice en la red Rootstock.
Esto se denomina peg-in.
Puede realizar la operación inversa, denominada peg-out,
enviando su bitcoin a una dirección especial de la red Rootstock,
y recibiendo su bitcoin de vuelta en la red bitcoin.

## Diferencias con Rootstock y Ethereum

Rootstock no es 100% compatible con Ethereum: Tiene diferencias en la forma en que se calculan las sumas de comprobación,
la ruta de derivación que utiliza, y cómo se calcula el gas.

### Diferencias de suma de comprobación

- Las distintas redes compatibles con Ethereum se diferencian entre sí mediante "identificadores de cadena".
- Cada red blockchain tiene su propio ID de cadena único.
- Rootstock utiliza el ID de la cadena al calcular las sumas de comprobación de sus direcciones, mientras que Ethereum no lo tiene en cuenta.
- Las sumas de comprobación en ambas redes se representan utilizando mayúsculas (mayúsculas y minúsculas), por lo que la "misma" dirección no pasará las validaciones de sumas de comprobación tanto en Rootstock como en Ethereum.

### Diferencias en la vía de derivación

Recordar o almacenar claves privadas para sus monederos criptográficos puede ser un gran reto, incluso para los técnicos.
Esto se debe a que estas claves son esencialmente números extremadamente grandes.
Así que para facilitar las cosas, la comunidad criptográfica ha ideado una técnica llamada "monederos HD", en la que se utiliza una frase semilla (un conjunto de palabras de diccionario elegidas al azar), más una "ruta de derivación". Rootstock y Ethereum tienen diferentes rutas de derivación, por lo tanto, la misma frase semilla resulta en un conjunto diferente de claves y direcciones entre Rootstock y Ethereum.

### Diferencias de gas

El EVM y el RVM son compatibles en el sentido de que admiten los mismos op-codes y, por tanto, pueden ejecutar los mismos contratos inteligentes.
Sin embargo, el precio de cada op-code (medido en unidades conocidas como gas) es diferente entre EVM y RVM, por lo que el gas total consumido en varias transacciones es diferente.
Además, las unidades de gas se multiplican por el precio del gas para calcular el coste de la transacción.
Dado que el precio del gas de Rootstock está denominado en RBTC y el precio del gas de Ethereum está denominado en Ether, existe otra diferencia entre los precios del gas en Rootstock y Ethereum.

:::info[Update on Gas Cost Differences]

We have identified that the opcodes with significant variations are `SLOAD` and `SSTORE`.
Additionally, certain calls (such as `DELEGATECALL` and `STATICCALL`) that utilize these opcodes during an internal call will result in differences in the overall gas cost calculation for the transaction.

These discrepancies are primarily due to [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) that has been implemented in Ethereum but not yet in Rootstock. The team is aware of this difference and intend to implement this in future releases.

:::

#### Eth Estimate Gas Behaviour on Rootstock

When `eth_estimateGas` is called, the node simulates the transaction execution without broadcasting it to the network.
The simulation runs through the entire transaction process as if it were being executed, including checking for sufficient balance, contract code execution, etc.
During the simulation, the method calculates the exact amount of gas that would be consumed by the transaction if it were to be executed on the blockchain. The estimated gas amount is returned, helping users set an appropriate gas limit for the actual transaction.

:::info[Starting with Arrowhead 6.5.0]

**Prior to Arrowhead 6.5.0**, there was a difference in Rootstock compared to Ethereum:

- If one of the steps of the simulated transaction fails, the node would return the gas estimation needed for the transaction
- On Ethereum, the node would return an error instead of the gas estimation.

**Starting with Arrowhead 6.5.0:**

- Rootstock will behave same way as Ethereum's behavior for simulated transaction failures.
- If a simulated transaction step fails, the node will now return an error, mirroring Ethereum's response.

:::

This behavior can be seen in the following example, where a call for `eth_estimateGas` on a transaction that would be executed from an address without enough balance.

Example:

```js
{
    "jsonrpc":"2.0",
    "method":"eth_estimateGas",
    "params":[
        {"from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "gas": "0x76c0",
        "gasPrice": "0x9184e72a000",
        "value": "0x9184e72a",
        "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"},
        "latest"
    ],
    "id":0
}
```

Response on Rootstock:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": "0x5498"
}
```

Response on Ethereum:

```js
{
    "jsonrpc": "2.0",
    "id": 0,
    "error": {
        "code": -32000,
        "message": "insufficient funds for transfer"
    }
}
```

## Contratos inteligentes compatibles con EVM

Si está familiarizado con el desarrollo de contratos inteligentes o el desarrollo de dApps utilizando solidity, web3 y otras tecnologías compatibles, le encantará saber que la máquina virtual de Rootstock (RVM) es compatible con la máquina virtual de Ethereum (EVM).
Así que usted puede utilizar el mismo código, herramientas y bibliotecas cuando se desarrolla con Rootstock también.
Por lo tanto, las habilidades de desarrollo de contratos inteligentes y aplicaciones a las que está acostumbrado se transferirán muy bien.

> Consulte la versión de Solidity compatible en [requisitos](/developers/requirements/)

### Herramientas

- [Hardhat](https://hardhat.org/docs) is an Ethereum development environment designed for professionals. It's primarily used in the development of smart contracts for the Ethereum blockchain.
  Refer to the [Hardhat Guides](/dev-tools/dev-environments/hardhat/) for guides on how to use Hardhat on Rootstock.

- [Metamask](https://metamask.io/) es un monedero de criptomoneda con extensión de navegador o aplicación móvil,
  que permite a los usuarios interactuar con la blockchain de Rootstock,
  incluido el envío de RBTC, el envío de tokens basados en Rootstock como RIF,
  e interactuar con contratos inteligentes desplegados en la red Rootstock.
  Consulte cómo [configurar MetaMask para conectarse a Rootstock](/dev-tools/wallets/metamask/).

- [Mocha](https://mochajs.org/) es un popular marco de pruebas de JavaScript que se ejecuta en Node.js.
  Consulte [Testing Smart Contracts](/developers/smart-contracts/hardhat/test-smart-contracts/) para ver cómo usarlo para probar sus contratos inteligentes en Rootstock.

- [Solidity](https://docs.soliditylang.org/) es el lenguaje de programación más popular para implementar contratos inteligentes.
  El bytecode y la ABI que genera el compilador de Solidity, `solc`, se pueden utilizar para implementar e interactuar con contratos inteligentes en Rootstock, gracias a la compatibilidad entre RVM y EVM.

> Para obtener una lista completa de herramientas, consulte la sección [Dev Tools](/dev-tools/).

## RPC JSON compatible con Ethereum

El conjunto de llamadas a procedimientos remotos (RPC) que soporta Rootstock es en gran medida el mismo que las RPC soportadas por Ethereum.
Se trata de otra capa de compatibilidad, además de la implementación de la máquina virtual, que permite utilizar las mismas herramientas y bibliotecas.

## Minería fusionada

Los mineros de bitcoin realizan lo que se conoce como [minería fusionada](/concepts/merged-mining/),
asegurando ambas redes con la misma infraestructura y consumo energético.

<div class="sprite-transform-animation-wrapper rsk-mining">
  <div class="sprite-transform-animation rsk-mining"></div>
</div>

Crean bloques en la red bitcoin cada 10 minutos, incluyendo la transferencia de bitcoin desde diferentes direcciones, y en el proceso crean nuevos bitcoins.
En Rootstock, los bloques se crean cada 30 segundos, para asegurar la ejecución de contratos inteligentes.
En el proceso no se acuñan nuevas monedas, pero sí se obtiene una recompensa de la minería fusionada.
Echa un vistazo a [rootstock.io/mine-btc-with-rootstock](https://rootstock.io/mine-btc-with-rootstock/) para obtener más información sobre la minería.

:::info[Note]
El tiempo entre bloques en cada red indicado anteriormente son valores aproximados.
:::
