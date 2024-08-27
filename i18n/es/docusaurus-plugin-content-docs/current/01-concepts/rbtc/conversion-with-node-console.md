---
title: Conversión con nodo y consola
sidebar_label: Nodo y consola
tags:
  - rsk
  - rbtc
  - conversión
  - peg
  - 2 vías
  - clavija
  - peg-out
  - federación
  - nodo
  - cli
description: Cómo realizar el mecanismo Powpeg mediante nodo y consola.
sidebar_position: 305
---

En esta sección se explica cómo probar el mecanismo Powpeg utilizando
su nodo Rootstock y una línea de comandos.

## Requisitos generales

- Necesitas tener el control total de tu clave privada de BTC.
- Necesitas una Cartera BTC correctamente configurada utilizando dicha clave privada.
- Necesita un nodo Rootstock en funcionamiento,
  con la interfaz RPC activada y los módulos personal y eth activados.
  - Véase [¿cómo se ejecuta un nodo Rootstock?](/node-operators/setup/).

## Conversor de BTC a RBTC

Cómo realizar un clavado.

:::warning\[Warning]

Lea los [requisitos de bloqueo](/concepts/rbtc/networks#mainnet-conversion)

:::

1. Con su dirección Bitcoin,
   envía una transacción BTC a la dirección de la federación Rootstock.
2. Utilizando su explorador de bloques de BTC preferido
   (por ejemplo, [Blocktrail](https://www.blocktrail.com/BTC)),
   siga su transacción y espere el tiempo estipulado.
3. Convierte la clave privada al formato Rootstock con esta herramienta:
   [https://github.com/rsksmart/utils](https://github.com/rsksmart/utils)),
   y escriba la información de su cuenta Rootstock.
4. A continuación, utilice el [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io)
   o el [Rootstock Mainnet Explorer](https://explorer.rootstock.io)
   para ver su saldo de RBTC.
   Recuerde que las direcciones de Rootstock deben empezar por `0x`.

## Conversion RBTC a BTC

Cómo realizar un peg-out.

:::warning\[Warning]

Lea los [requisitos de publicación](/concepts/rbtc/networks#rbtc-to-btc-conversion)

:::

1. Añada su clave privada Rootstock obtenida a su nodo Rootstock.
   Sustituya `RSKConvertedPrivateKey`, `RSKNode` y `RSKNodePort`
   y ejecute este comando:
   ```shell
   $ curl -X POST --data '{"method": "personal_importRawKey", "params":["<RSKConvertedPrivateKey>", "<passPhraseToEncryptPrivKey>"], "jsonrpc": "2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
2. Desbloquea tu cuenta para transferencias.
   Sustituye `RSKAddress`, `passPhraseJustUsedToEncryptPrivKey`, `RSKNode`
   y `RSKNodePort` y ejecuta:
   ```shell
   $ curl -X POST --data '{"method": "personal_unlockAccount", "params":["<RSKAddress>", "<passPhraseJustUsedToEncryptPrivKey>", ""], "jsonrpc": "2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
3. Transfiera la cantidad que desee.
   Sustituya `RSKAddress`, `valueToReleaseInWeis`, `RSKNode` y `RSKNodePort`
   y ejecute:
   ```shell
   $ curl -X POST --data '{"method": "eth_sendTransaction", "params":[{"from": "<RSKAddress>", "to": "0x0000000000000000000000000000000001000006", "gasPrice": 59240000, "gas": 44000, "value": <valueToReleaseInWeis>}], "jsonrpc": "2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
4. Espera el tiempo estipulado y comprueba tu saldo de BTC.
