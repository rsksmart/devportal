---
sidebar_label: Verificación de contratos inteligentes con el complemento Hardhat Verify
sidebar_position: 400
title: Verificación de un contrato inteligente mediante el complemento de verificación Hardhat
description: Configuración del complemento de verificación Hardhat para Rootstock
tags:
  - casco
  - tutorial
  - desarrolladores
  - inicios rápidos
  - rsk
  - portainjertos
---

Los contratos inteligentes son la columna vertebral de las aplicaciones descentralizadas (dApps). Automatizan acuerdos y procesos, pero su código puede ser complejo y propenso a errores. Verificar tus contratos inteligentes es crucial para garantizar que funcionan según lo previsto.

Este tutorial le guiará a través de la verificación de sus contratos utilizando el Plugin de Verificación Hardhat en el Explorador Blockscout de Rootstock. Este complemento simplifica la verificación de los contratos inteligentes Solidity desplegados en la red Rootstock. Al verificar los contratos, permite a Blockscout, un explorador de bloques de código abierto, vincular el código fuente de su contrato con su bytecode desplegado en la blockchain, lo que permite una interacción más fiable con el código.

En este tutorial, realizaremos los siguientes pasos:

- Configure su entorno hardhat config en su proyecto
- Utilice el complemento `hardhat-verify` para verificar la dirección de un contrato.

## Requisitos previos

Para seguir este tutorial, debes tener conocimientos de lo siguiente:

- Casco
- Conocimientos básicos de contratos inteligentes

:::note[Hardhat Starter dApp]

Se ha creado una [Hardhat Starter dApp](https://github.com/rsksmart/rootstock-hardhat-starterkit) con una configuración preestablecida para la red Rootstock. Clona y sigue las instrucciones del README para configurar el proyecto. Nota: Establecer las variables `.env` para que coincidan con el archivo `hardhat.config.ts`, si se utiliza la dApp de inicio para este tutorial.

:::

## ¿Qué es hardhat-verify?

[Hardhat](https://hardhat.org/) es un entorno de desarrollo completo para la compilación, despliegue y verificación de contratos.
El [hardhat-verify plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify) soporta la verificación de contratos en el [Rootstock Blockscout Explorer](https://rootstock.blockscout.com/).

> Nota: El plugin `hardhat-verify` estará disponible próximamente en el [Rootstock Explorer](https://explorer.rootstock.io/).

### Instalación

```bash
npm install --save-dev @nomicfoundation/hardhat-verify
```

Y añade el siguiente código a tu archivo `hardhat.config.ts`:

```bash
require("@nomicfoundation/hardhat-verify");
```

O, si estás usando TypeScript, añade esto a tu hardhat.config.ts:

```bash
importar "@nomicfoundation/hardhat-verify";
```

### Utilización

Necesitas añadir la siguiente configuración de Etherscan a tu archivo `hardhat.config.ts`:

```bash
// Configuración de Hardhat
const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // Si quieres hacer alguna bifurcación, descomenta esto
            // bifurcación: {
            // url: MAINNET_RPC_URL
            // }
        },
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        rskMainnet: {
            url: RSK_MAINNET_RPC_URL,
            chainId: 30,
            gasPrice: 60000000,
			accounts:[PRIVATE_KEY]
        },
        rskTestnet: {
            url: RSK_TESTNET_RPC_URL, 
            chainId: 31,
            gasPrice: 60000000,
			accounts:[PRIVATE_KEY]
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // Por defecto es la primera cuenta
            mainnet: 0,
        },
        owner: {
            default: 0,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.24",
            },
        ],
    },
    sourcify: {
        enabled: false
      },      
    etherscan: {    
        apiKey: {
          // No es requerido por blockscout. Puede ser cualquier cadena no vacía
          rskTestnet: 'RSK_TESTNET_RPC_URL',
          rskMainnet: 'RSK_MAINNET_RPC_URL'
        },
        customChains: [
          {
            network: "rskTestnet",
            chainId: 31,
            urls: {
              apiURL: "https://rootstock-testnet.blockscout.com/api/",
              browserURL: "https://rootstock-testnet.blockscout.com/",
            }
          },
          {
            network: "rskMainnet",
            chainId: 30,
            urls: {
              apiURL: "https://rootstock.blockscout.com/api/",
              browserURL: "https://rootstock.blockscout.com/",
            }
          },

        ]
      },
};

export default config;
```

Ahora, ejecute la tarea de verificación, pasando la dirección del contrato,
la red donde está desplegado, y cualquier otro argumento que se utilizó para desplegar el contrato:

```bash
npx hardhat verify --network rskTestnet DEPLOYED_CONTRACT_ADDRESS
```

o

```bash
npx hardhat verify --network rskMainnet DEPLOYED_CONTRACT_ADDRESS
```

:::tip\[Tip]

- Sustituya `DEPLOYED_CONTRACT_ADDRESS` por la dirección del contrato.
- Esto puede obtenerse del archivo `MockERC721.json` que contiene las direcciones y abi en la carpeta `deployments/network`.

:::

**La respuesta debería ser así:**

```bash
npx hardhat verify --network rskTestnet 0x33aC0cc41B11282085ff6db7E1F3C3c757143722 
Enviado con éxito el código fuente del contrato
contracts/ERC721.sol:MockERC721 en 0x33aC0cc41B11282085ff6db7E1F3C3c757143722
para su verificación en el explorador de bloques. Esperando el resultado de la verificación...
Verificado con éxito el contrato MockERC721 en el explorador de bloques.
https://rootstock-testnet.blockscout.com/address/0x33aC0cc41B11282085ff6db7E1F3C3c757143722#code
```

## Recursos

- Visite [hardhat-verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify)
- Visite [blockscout](https://docs.blockscout.com/for-users/verifying-a-smart-contract/hardhat-verification-plugin)
- [Kit de iniciación al casco para portainjertos](https://github.com/rsksmart/rootstock-hardhat-starterkit)
