---
sidebar_label: Configurar Hardhat para Rootstock
sidebar_position: 102
title: Configurar Hardhat para Rootstock
description: Aprenda a configurar su proyecto Hardhat para su desarrollo en la red de pruebas y la red principal de Rootstock.
tags:
  - guías
  - desarrolladores
  - contratos inteligentes
  - rsk
  - portainjertos
  - casco
  - dApps
  - éteres
---

## Requisitos previos

1. Cuentas/direcciones compatibles con Rootstock.

- Puede utilizar cuentas existentes o crear cuentas nuevas. Véase [Direcciones basadas en cuentas](/concepts/account-based-addresses/).

2. Cartera

- Configure un [monedero Metamask](/dev-tools/wallets/metamask/) y obtenga una [clave privada](/developers/blockchain-essentials/browser#private-keys-and-public-keys).

## Primeros pasos

### Paso 1: Configurar el entorno del casco

- Instale dotenv
  Para gestionar las variables de entorno, instale `dotenv` utilizando el siguiente comando:

```shell
  npm install dotenv
```

- Crear un archivo \`.env
  - En la raíz del proyecto `rootstock-quick-start-guide`, crea un archivo `.env` y añade tus claves privadas (no compartas este archivo):

```shell
  ROOTSTOCK_MAINNET_PRIVATE_KEY="tu_clave_privada_mainnet"
  ROOTSTOCK_TESTNET_PRIVATE_KEY="tu_clave_privada_testnet"
```

:::info[Note]
Dependiendo de la red que desee, el uso de una clave privada Testnet y Mainnet es opcional, ya que no es necesario que tenga claves privadas separadas en su variable de entorno.
:::

### Paso 2: Configurar claves privadas

Para configurar tus claves privadas `rskMainnet` y `rskTestnet`, necesitarás actualizar tu archivo `hardhat.config.js` en el directorio raíz con tus claves privadas.

- Copie el siguiente fragmento de código y reemplace el código existente en su archivo `hardhat.config.js`. Ver [archivo diff](https://github.com/rsksmart/rootstock-quick-start-guide/blob/d018514628c4888cdba8bcdcf307cc5a2077e496/hardhat.config.js#L1) para el código inicial.

```js
  require("@nomiclabs/hardhat-ethers");
  require('dotenv').config();

<!-- Hardhat configuration -->
  module.exports = {
    solidity: "0.8.20",
    networks: {
      rskMainnet: {
        url: "https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}",
        chainId: 30,
        gasPrice: 60000000,
        accounts: [process.env.ROOTSTOCK_MAINNET_PRIVATE_KEY]
      },
      rskTestnet: {
        url: "https://rpc.testnet.rootstock.io/{YOUR_APIKEY}",
        chainId: 31,
        gasPrice: 60000000,
        accounts: [process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY]
      }
    }
  };
```

> Vea cómo [Obtener una clave API de la API RPC](/developers/rpc-api/setup/)

> Sustituye `"tu_clave_privada_mainnet"` y `"tu_clave_privada_testnet"` por tus claves privadas. Para obtener información sobre cómo recuperar sus claves privadas, consulte [Cómo exportar la clave privada de una cuenta](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

### Paso 3: Financiar sus cuentas

- Mainnet
  - Necesitarás RBTC, que puedes obtener de un intercambio. Consulte [Obtener RBTC mediante intercambios](https://rootstock.io/rbtc/).
- Testnet
  - Puedes obtener tRBTC en el [Grifo de portainjertos](https://faucet.rootstock.io/).
