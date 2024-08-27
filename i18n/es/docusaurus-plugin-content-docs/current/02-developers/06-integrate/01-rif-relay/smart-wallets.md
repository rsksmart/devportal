---
sidebar_label: Billeteras inteligentes
sidebar_position: 700
title: Billeteros inteligentes RIF Relé
tags:
  - rif
  - sobre
  - relé
  - usuario
  - guía
description: Billetera inteligente RIF Relay
---

Esta guía pretende explicar más sobre la interacción y despliegue de las Carteras Inteligentes. Utilizaremos contratos de prueba adicionales que se incluyeron en el proyecto, como el `UtilToken(ERC20)`. Todos los scripts utils se ejecutan desde la cuenta[0] de la red regtest.

## Requisitos previos

- Siga el proceso de despliegue de la [Guía de despliegue](/developers/integrate/rif-relay/deployment).
- La definición del monedero inteligente puede encontrarse en [Arquitectura](/developers/integrate/rif-relay/architecture/)

## Formas de crear carteras inteligentes

Hay **dos maneras** de crear una Cartera Inteligente:

1. **Transacción regular:** El Solicitante (u otra cuenta en nombre del Solicitante) llama a la Fábrica de Proxy pidiendo obtener una nueva Cartera Inteligente. Por lo tanto, la Fábrica de Proxy crea un proxy para el código SmartWallet, delegando la propiedad al Solicitante.
2. **Patrocinado:** Necesita pasar por el proceso de Relevo RIF, que se describe en detalle más adelante. El solicitante pide a un tercero que pague por el despliegue de la Cartera Inteligente, y el solicitante paga en tokens por ello (o gratis si está subvencionado por el tercero, también conocido como Patrocinador).

## Enviar fondos

En el [RIF Relay Contracts](https://github.com/rsksmart/rif-relay-contracts) hay un script que nos ayudaría a acuñar tokens ERC20.

Necesitamos ejecutar el siguiente script:

```shell
npx hardhat mint --token-dirección <0xabc123> --importe <amount_in_wei> --receptor <0xabc123> --red regtest
```

> El contrato de tokens debe tener una función de acuñación.

## Implantar un monedero inteligente

Para desplegar un monedero inteligente necesitamos seguir algunos pasos que se describirán a continuación:

1. Necesitamos generar la dirección del monedero inteligente. Como hemos mencionado antes, el monedero inteligente es una cuenta basada en contratos, por lo tanto, podemos generar tantas direcciones de monedero inteligente como queramos sin gastar gasolina llamando a `getSmartWalletAddress` desde la librería del cliente relé.

> Un monedero inteligente sólo necesita desplegarse cuando necesitamos ejecutar una transacción. El proceso de despliegue utiliza gas, así que, a menos que esté subvencionado, tenemos que pagarlo.

En este punto deberíamos tener el objeto Relay Client creado.

```typescript
    import type {
      getSmartWalletAddress,
      UserDefinedDeployRequest,
    } from '@rsksmart/rif-relay-client';

    const smartWalletAddress = await getSmartWalletAddress(<EOA>, <INDEX>);

    const relayTransactionOpts: UserDefinedDeployRequest = {
      request: {
        from: <EOA>,
        tokenContract: <TOKEN_ADDRESS>,
        tokenAmount: <AMOUNT_OF_TOKENS_IN_WEI>,
        index: <INDEX>,
      },
    };

    const transaction = await relayClient.relayTransaction(
      relayTransactionOpts
    );

```

> Ten en cuenta que para pagar cualquier cantidad de tokens durante el despliegue, el monedero inteligente debe recibir fondos primero.

Dónde están las variables:

- **EOA**: Cuenta de propiedad externa, el propietario del monedero inteligente.
- **INDEX**: El índice que queremos utilizar para generar el monedero inteligente.
- **DIRECCIÓN_TOKEN**: La dirección del contrato token que queremos utilizar para pagar la tasa.
- **CANTIDAD_DE_TOKENS_EN_WEI**: La cantidad que queremos pagar por la tasa en wei.
