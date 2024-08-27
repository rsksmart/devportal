---
sidebar_label: Uso del casco
sidebar_position: 400
title: Rizoma Casco DApp
description: Tanto si eres un desarrollador experimentado como si acabas de iniciar tu andadura en el desarrollo de contratos inteligentes, el kit de inicio hardhat proporciona una base sólida para crear aplicaciones descentralizadas (dApps) en la red Rootstock.
tags:
  - rsk
  - portainjertos
  - tutoriales
  - desarrolladores
  - casco
  - inicios rápidos
  - dApps
  - contratos inteligentes
---

Tanto si eres un desarrollador experimentado como si acabas de iniciar tu andadura en el desarrollo de contratos inteligentes, el kit de inicio hardhat proporciona una base sólida para crear aplicaciones descentralizadas (dApps) en la red Rootstock.

Rootstock es totalmente compatible con Ethereum. Aporta la potencia de los contratos inteligentes a Bitcoin, lo que permite a los desarrolladores aprovechar la seguridad de Bitcoin al tiempo que se benefician del ecosistema de Ethereum.

## Requisitos previos

Antes de iniciar la dApp, asegúrese de tener los siguientes requisitos previos:

1. **Familiaridad con contratos inteligentes:**
   - Si es nuevo en el mundo de los contratos inteligentes, considere la posibilidad de aprender los conceptos básicos. Entender cómo funcionan los contratos inteligentes mejorará su experiencia con el desarrollo de Rootstock.

2. **Node.js y Hardhat Instalado:**
   - Asegúrese de que tiene Node.js instalado en su sistema. Consulte la sección [prerequisites](/developers/requirements/#installing-nodejs-and-npm).

3. **Instalar la taquigrafía del casco:**

- Recomendamos instalar la función de autocompletar `hh` para utilizar la abreviatura `hh` de forma global.

  ```bash
  npm i -g hardhat-shorthand
  ```
- Para más detalles, consulte su [guía oficial](https://hardhat.org/guides/shorthand.html).

4. **Configuración de Metamask con portainjertos:**

- Instale la extensión de navegador Metamask si aún no lo ha hecho.
- Configure Metamask para conectarse a la red Rootstock. Visite [MetaMask Integration on the Rootstock Dev Portal] (/dev-tools/wallets/metamask/).

5. **Conocimientos básicos de Hardhat:**

- Se recomienda estar familiarizado con los conceptos básicos y las funcionalidades de Hardhat. Si no conoce Hardhat, consulte la [Guía de Hardhat del Rootstock](/desarrolladores/contratos-inteligentes/hardhat/).

:::tip[Rootstock Curso para desarrolladores de Blockchain].

Aprenda a escribir, probar, asegurar, desplegar y verificar contratos inteligentes en la red blockchain de Rootstock. Inscríbase en el [Rootstock Blockchain Developer Course](/resources/courses/).
:::

## Configuración de la dApp de ejemplo

### Clonar el repositorio

Abre tu terminal o símbolo del sistema y ejecuta el siguiente comando para clonar el repositorio de GitHub:

```bash
git clone https://github.com/rsksmart/rootstock-hardhat-starterkit.git
```

### Instalar dependencias

Navegue hasta la carpeta del repositorio clonado:

```bash
cd portainjertos-hardhat-starterkit
```

Instale todas las dependencias necesarias utilizando npm:

```bash
npm instalar
```

### Obtención de las URL RPC de Rootstock Testnet y Mainnet

Esta sección le guiará a través de la adición de Rootstock Testnet y Mainnet RPC URLs a su entorno de desarrollo. Estas URL son esenciales para conectar su aplicación a la red Rootstock e interactuar con contratos inteligentes.

Hay dos formas de obtener URLs RPC:

#### Uso de URL RPC públicas

- Visite [Integración de MetaMask en el portal de desarrollo de Rootstock] (/dev-tools/wallets/metamask/). Esta guía proporciona instrucciones para configurar MetaMask para Rootstock. Mientras sigue estos pasos, preste especial atención a las secciones sobre la adición de redes personalizadas. Encontrará las URL RPC para Rootstock Testnet y Mainnet.

#### Uso de la API RPC

- Cree una cuenta en [Rootstock RPC API](https://rpc.rootstock.io/). Una vez iniciada la sesión, vaya a su panel de control y copie la clave de API.

### Añadir las URL a su proyecto

Después de obtener las URLs RPC, crea un archivo llamado `.env` en el directorio raíz de tu proyecto (importante: este archivo no debe ser enviado al control de versiones). Añade las variables de entorno necesarias al archivo `.env`:

```
PRIVATE_KEY: Su clave privada (por ejemplo, de los detalles de su cuenta de Metamask).
RSK_MAINNET_RPC_URL: La URL RPC para la red principal de Rootstock.
RSK_TESTNET_RPC_URL: La URL RPC para la red de prueba de Rootstock.
```

## Despliegue de un contrato de token ERC721

Esta sección utiliza el marco de desarrollo Hardhat para desplegar un token ERC721 (un token no fungible) en la red Rootstock.

Ejecute el siguiente comando, sustituyendo `<network>` por `rskTestnet` o `rskMainnet` en función del entorno de despliegue que desee:

```bash
hh deploy --red <network> --etiquetas 721
```

Ejemplo de comando:

```bash
hh deploy --network rskTestnet --tags 721
```

Este comando compilará sus contratos Solidity, generará información de tipo y desplegará su contrato ERC721 en la red Rootstock especificada. La salida mostrará la dirección del contrato desplegado y la cantidad de gas utilizado.

El comando anterior devolverá una salida similar a la siguiente:

```bash
Generando tipados para: 36 artefactos en dir: typechain-types para objetivo: ethers-v6
¡Generados 106 tipos con éxito!
Compilados 34 archivos Solidity con éxito (objetivo evm: paris).
desplegando "MockERC721" (tx: 0x9ad1dbc047b78594cf2cad105ded54c851fc0895ae69e4381908fecedd0ee3fc)...: desplegado en 0x2E027a3a05f3de6777B23397a50a60ecd04fe34C con 2849621 gas
```

## Interactuar con el contrato - Acuñar un token

En el despliegue del contrato, puedes interactuar con él utilizando el comando `erc721-mint` de Hardhat. Este comando te permite acuñar (crear) nuevos tokens ERC721.

### Acuñación de una ficha:

En su terminal, ejecute el siguiente comando, sustituyendo los marcadores de posición por valores reales:

```bash
hh erc721-mint \
  --contract <ContractAddress> \
  --recipient <RecipientAddress> \
  --network rskTestnet
```

Ejemplo de comando:

```bash
hh erc721-mint --contract 0x2E027a3a05f3de6777B23397a50a60ecd04fe34C --recipient 0xB0f22816750851D18aD9bd54c32C5e09D1940F7d --network rskTestnet
```

- `<ContractAddress>`: Sustitúyalo por la dirección de su contrato ERC721 desplegado obtenida en el paso anterior.
- `<RecipientAddress>`: Sustitúyelo por la dirección del monedero para recibir el token recién acuñado.
- `<network>`: Sustitúyalo por `rskTestnet` o `rskMainnet`, dependiendo de la red en la que esté desplegado su contrato.

Este comando iniciará una transacción para acuñar un nuevo token ERC721 y enviarlo a la dirección del destinatario especificada.

La salida mostrará los detalles de la transacción:

```bash
Hash de la transacción: 0xa127ff008e20d8b3944cecb374f28535cd84555881cde157708ec5545603a4e4
Transacción confirmada
```
