---
sidebar_position: 2
title: Puerto un Ethereum dApp a Rootstock
sidebar_label: Puerto un Ethereum dApp a Rootstock
tags:
  - rsk
  - rootstock
  - recursos
  - tutoriales
  - puerto a stock raíz
  - Ethereum
  - dApps
  - contratos inteligentes
description: La portación de una aplicación descentralizada de Ethereum (dApp) a Rootstock (RSK) ofrece una emocionante oportunidad para aprovechar los beneficios de la red Rootstock un Bitcoin L2 compatible con Ethereum. Esta guía le guiará a través del transporte de un dApp Ethereum a la red Rootstock utilizando la herramienta de despliegue de Hardhat Ignition y aprovechando la compatibilidad entre Solididad (usada para Rootstock) y Ethereum.
---

La portación de una aplicación descentralizada de Ethereum (dApp) a Rootstock ofrece una emocionante oportunidad para aprovechar los beneficios de la red Rootstock que es una plataforma de contrato inteligente asegurada por la red Bitcoin.

Rootstock combina la flexibilidad de Ethereum con la escalabilidad y seguridad de Bitcoin, ofreciendo un entorno convincente para el desarrollo de dApp.

Con Rootstock, usted puede salvar la brecha entre Ethereum y Bitcoin, llevando su Ethereum dApps existente a la plataforma Rootstock.

Esta guía le guiará a través del transporte de su dApp Ethereum a la red Rootstock utilizando la herramienta de despliegue de Hardhat Ignition y apalancando la compatibilidad entre Solididad (usada para Rootstock) y Ethereum.

## Ventajas de portar tu dApp a Rootstock

**1. Velocidad de transacción más rápida**

Rootstock realiza transacciones por [fusionar minería con Bitcoin](/concepts/merged-mining/). Esto significa que las transacciones de Rootstock se benefician de la seguridad de la red Bitcoin mientras se obtienen tiempos de confirmación más rápidos en comparación con Ethereum.

**2. Bajar tasas de gas**

Las tarifas de gas de Rootstock son típicamente inferiores a Ethereum, promediando alrededor de `$0.052`. Esta rentabilidad puede ser especialmente atractiva para dApps que requieren interacciones frecuentes con la cadena de bloques.

**3. Aprovechando Bitcoin Security**

Rootstock es una capa 2 en Bitcoin, lo que significa que hereda la seguridad de la red Bitcoin. Este modelo de seguridad proporciona confianza a los constructores y usuarios.

## similitudes entre Ethereum y Rootstock

**1. Solidez como Lenguaje de Programación**

Tanto Ethereum como Rootstock utilizan Solididad como su principal lenguaje de programación de contratos inteligentes. Si ya estás familiarizado con la Solidez, la transición a Rootstock debería ser relativamente sencilla.

**2. Compatibilidad con EVM**

Rootstock es compatible con la máquina virtual de Ethereum (EVM). Esta compatibilidad permite a los desarrolladores reutilizar contratos inteligentes de Ethereum existentes en Rootstock con modificaciones mínimas.

## Diferencias clave entre Ethereum y Rootstock

**1. Mecanismos de consenso**

Ethereum utiliza actualmente un mecanismo de consenso Proof of Stake (PoS), mientras que Rootstock emplea un consenso híbrido PoW/PoS (Prueba de toma). El componente PoS de Rootstock mejora la escalabilidad y la eficiencia energética.

\*\*2. Estándares de Token \*\*

Mientras que Ethereum introdujo estándares populares de tokens como ERC20 (fichas fungibles) y ERC721 (fichas no fungibles), Rootstock tiene su propio estándar de tokens llamado RRC20. Entender las diferencias entre estas normas es crucial a la hora de transportar tokens.

**3. Tarifas de red**

Como se mencionó anteriormente, Rootstock generalmente ofrece tarifas de gas más bajas. Los desarrolladores pueden aprovechar este ahorro de costes al implementar e interactuar con contratos inteligentes.

## Comenzando

### Prerrequisitos

Antes de comenzar, asegúrese de tener lo siguiente:

- Node.js:
  - Asegúrese de que tiene instalado Node.js. Si no, puede seguir las instrucciones de instalación para Windows o MacOS.
- Hardhat:
  - Instala Hardhat globalmente usando npm: `npm i -g hardhat`
- Un conocimiento básico de los contratos inteligentes y la solidez

### Pasos para configurar un proyecto Hardhat para Rootstock

1. **Crear un nuevo proyecto**: Crea una carpeta para tu proyecto y navega en él:
   ```sh
   ejemplo de mkdir rsk-hardhat-example
   cd rsk-hardhat-example
   ```

2. **Inicializa Hardhat**: Inicializa tu proyecto Hardhat ejecutando este comando:
   ```sh
   npx hardhat init
   ```

3. **Seleccione el marco del proyecto:** Elija **Crear un proyecto TypeScript** cuando se le pida como se muestra a continuación. Luego pulse entrar.

   ```
   888    888                      888 888               888
   888    888                      888 888               888
   888    888                      888 888               888
   8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
   888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
   888    888 .d888888 888    888  888 888  888 .d888888 888
   888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
   888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

   👷 Welcome to Hardhat v2.22.5 👷‍

   ? What do you want to do? …
   ❯ Create a TypeScript project
   ```

4. **Selecciona la raíz del proyecto** (presiona entrar)
   ```sh
   ✔️ ¿Qué quieres hacer? · Crear un proyecto TypeScript
   ? Raíz del proyecto Hardhat: › /path/to/tu/proyecto/rsk-hardhat-example
   ```

5. **Agrega un archivo .gitignore**: Si necesitas un archivo .gitignore (recomendado), crea uno en la raíz de tu proyecto. Puedes saltarte este paso si no quieres usar Git.
   ```sh
   ? ¿Quieres añadir un .gitignore? (S/n) ›
   ```

6. **Instalar dependencias con npm**:
   ```sh
   ? ¿Quieres instalar las dependencias de este proyecto de ejemplo con npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) › y
   ```

7. **Configura las redes Rootstock**: Hasta ahora, tu proyecto hardhat debería tener cuatro artefactos principales además de la configuración básica del nodo:
   - `contracts/`
   - `ignition/modules/`
   - `test/`
   - `hardhat.config.js`

> Esta guía utiliza la versión 2.22.5 de Hardhat. Para esta versión, la herramienta predeterminada para gestionar implementaciones es [Hardhat Ignition](https://hardhat.org/ignition/docs/getting-started).

8. **Instalar Ignición de Hardhat y TypeScript**

```sh
  npm install --save-dev @nomicfoundation/hardhat-ignition-ethers typescript
```

En este punto, tu `hardhat.config.ts` debería verse así:

```typescript
  import { HardhatUserConfig } from "hardhat/config";
  import "@nomicfoundation/hardhat-toolbox";
  import "@nomicfoundation/hardhat-ignition-ethers";

  const config: HardhatUserConfig = {
    solidity: "0.8.24",
};

export default config;
```

### Configurar Redes Rootstock

Para configurar las redes Rootstock necesitará una URL RPC tanto para el mainnet como para testnet y una Clave Privada de la cuenta que desplegará los contratos.

Para obtener los RPCs, vaya al [Panel de control de API RPC de Rootstock LATIS](https://dashboard.rpc.rootstock. o/dashboard) crea una cuenta si no la tienes, y obtén una clave API para Rootstock testnet o Rootstock mainnet.

````mdx-code-block
<Tabs>
  <TabItem value="contribute" label="Mainnet RPC URL should look similar to this:" default>
    ```
https://rpc.mainnet.rootstock.io/<API-KEY>
```
  </TabItem>
  <TabItem value="contest" label="Testnet RPC URL should look similar to this:">
 ```
https://rpc.testnet.rootstock.io/<API-KEY>
```
  </TabItem>

</Tabs>
````

El siguiente paso es recuperar su clave privada. Si no sabes cómo llevar la clave privada a tu monedero, aquí tienes una [tutorial](https://support. etamask.io/managing-my-wallet/secret-recovery-phrase-and-private-keys/how-to-export-an-accounts-private-key/) en [Metamask](https://metamask.io/).

También, si no has añadido Rootstock mainnet o testnet a tu Metamask Wallet, puedes hacerlo haciendo clic en los botones Añadir Rootstock o Añadir Rootstock Testnet en el pie de [mainnet explorer](https://rootstock. lockscout.com/) o [explorador de testnet](https://rootstock-testnet.blockscout.com/).

#### Guardar las URLs RPC y la Clave Privada

Para almacenar de forma segura las URLs RPC, puede utilizar un archivo `.env` o las variables de configuración de Hardhat. Para este ejemplo, usará la segunda opción.

Para almacenar esto, escriba en el terminal en la carpeta raíz del proyecto:

```sh
npx hardhat vars establece TESTNET_RPC_URL
```

Y introduzca el valor después de pulsar intro.

:::note

Asegúrese de que su valor TESTNET_RPC_URL está en este formato: `https://rpc.testnet.rootstock.io/API-KEY`

Por ejemplo, `https://rpc.testnet.rootstock.io/eOQAoxAI7Bt6zZ6blwOdMjQQIzKwSW-W` (Donde `eOQAoxAI7Bt6zZ6blwOdMjQQIzKwSW-W` es tu API-KEY)

:::

```sh
npx hardhat vars set TESTNET_RPC_URL
✔️ Enter value: · ********************************************************************************
```

Ahora repita este paso para su MAINNET_RPC_URL.

Verás una salida similar a esta:

```
La variable de configuración ha sido almacenada en /Users/wisdomnwokocha/Library/Preferences/hardhat-nodejs/vars.json
```

Para la tecla Privada:
Cuando se solicite que ingrese su clave privada, presione introducirla.

```sh
npx hardhat vars set PRIVATE_KEY
✔️ Enter value: · ********************************************************************************
```

Verás una salida similar a esta:

```
La variable de configuración ha sido almacenada en /Users/wisdomnwokocha/Library/Preferences/hardhat-nodejs/vars.json
```

Ahora, actualiza tu archivo `hardhat.config.ts` para incluir configuraciones de red Rootstock. Aquí hay un ejemplo de cómo debería lucir:

```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition-ethers";

const config: HardhatUserConfig = {
  solidity: "0. .24", // Establecer la versión deseada de Solidity

  redes: {
    // Configuración de Mainnet
    mainnet: {
      url: "https://rpc. ainnet.rootstock. o/<API-KEY>",
      cuentas: [process.env.PRIVATE_KEY],
    },

    // Configuración de Testnet
    testnet: {
      url: "https://rpc. estnet.rootstock. o/<API-KEY>",
      cuentas: [process.env.PRIVATE_KEY],
    },
  },
};

exportar configuración predeterminada;
```

Reemplaza `<API-KEY>` con tus claves API reales obtenidas del panel de control de Rootstock Labs. Además, almacena tu clave privada de forma segura (por ejemplo, en un archivo `.env`).

### Copiar Código de Contrato y Pruebas Ethereum

Copia este contrato de Ethereum y sus pruebas a tu proyecto Rootstock Hardhat. Colócalo dentro de la carpeta `contracts` para que la ruta sea `contracts/SimpleStorage.sol`.

#### `SimpleStorage.sol`

```solidity
// SPDX-License-Identifier: MIT
solidez pragmática ^0.8. 4;

contrato SimpleStorage {
    uint256 public favoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }
}
```

Copia este código de prueba y crea un nuevo archivo llamado `SimpleStorage.ts` dentro de la carpeta `test`. La ruta será `test/SimpleStorage.ts`.

#### Actualizar SimpleStorage.ts

```typescript
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("SimpleStorage", function () {
  async function deploySimpleStorageFixture() {
    const [owner] = await hre.ethers.getSigners();

    const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();

    return { simpleStorage, owner };
  }

  describe("Deployment", function () {
    it("Should deploy and initialize favoriteNumber to 0", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

      expect(await simpleStorage.favoriteNumber()).to.equal(0);
    });
  });

  describe("Store", function () {
    it("Should store the value 42 and retrieve it", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

      const storeTx = await simpleStorage.store(42);
      await storeTx.wait();

      expect(await simpleStorage.favoriteNumber()).to.equal(42);
    });

    it("Should store a different value and retrieve it", async function () {
      const { simpleStorage } = await loadFixture(deploySimpleStorageFixture);

      const storeTx = await simpleStorage.store(123);
      await storeTx.wait();

      expect(await simpleStorage.favoriteNumber()).to.equal(123);
    });
  });
});
```

### Compilar tu contrato

Para compilar su contrato, ejecute este comando en su terminal:

```bash
npx hardhat compile
```

Después de la compilación, verás una salida similar a esta:

```
Generar tipos para: 1 artefactos en dir: tipo-tipo para el objetivo: ethers-v6
¡Genera correctamente 6 tipos!
Compilado 1 archivo de solidez correctamente (evm target: paris).
```

### Prueba tu contrato

Para probar la funcionalidad de su contrato, ejecute este comando en su terminal:

```bash
prueba de sombrero duro npx
```

Los resultados de la prueba mostrarán si el contrato se comporta como se esperaba. Deberías ver algo así:

```s
SimpleStorage
    Despliegue
      ✔️ Debería desplegar e inicializar favoriteNumber a 0
    Store
      ✔️ Debe almacenar el valor 42 y recuperarlo
      ✔️ Debe guardar un valor diferente y recuperarlo

  3 pasando (286ms)
```

### Desplegando tu contrato en Rootstock Testnet

**1. Asegúrate de saldo suficiente**

Antes de desplegar, asegúrate de tener suficientes tokens de red de pruebas (RBTC) en tu billetera. Si no es así, obtén alguno de [Rootstock faucet](https://faucet.rootstock.io/).

**2. Crear el script de despliegue**

Crea un archivo llamado `SimpleStorage.ts` dentro de la carpeta `ignition/modules`. Pega el siguiente código de TypeScript en ese archivo:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {
  const simpleStorage = m. ontract("SimpleStorage");

  return { simpleStorage };
});

exportar por defecto SimpleStorageModule;
```

**3. Desplegar el contrato**

En tu terminal, ejecuta el comando de implementación:

```bash
npx ignition hardhat deploy ignition/modules/SimpleStorage.ts --network rskTestnet
```

Este script de TypeScript utiliza Hardhat Ignition para desplegar el contrato `SimpleStorage` de forma declarativa.

**4. Confirmación y Desplegamiento**

- Confirme el despliegue en la red de pruebas Rootstock escribiendo "sí".
- Hardhat Ignition reanudará el despliegue existente (si existe) y ejecutará el proceso de despliegue.
- Verá un mensaje de éxito indicando que el contrato fue desplegado.

```bash
✔️ ¿Confirmar despliegue en la red rskTestnet (31)? … sí
Hardhat Ignition 🚀

Reanudando despliegue existente de . ignition/deployments/chain-31

Desplegar [ SimpleStorageModule ]

Lote #1
  Ejecutado SimpleStorageModule#SimpleStorage

[ SimpleStorageModule ] desplegado con éxito 🚀

Direcciones desplegadas

SimpleStorageModule#SimpleStorage - 0x3570c42943697702bA582B1ae3093A15D8bc2115
```

:::info\[Info]

Si obtiene un error como `IgnitionError: IGN401`, intente ejecutar el comando de nuevo.

:::

> Si desea desplegar su contrato en mainnet, cambia `rskTestnet` a `rskMainnet` en el último comando y asegúrate de que tienes RBTC disponible en tu cartera.

#### Verificar despliegue

Visita [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/). Pega tu dirección de contrato (`0x3570c42943697702bA582B1ae3093A15D8bc2115`) en la barra de búsqueda para verificar el despliegue exitoso.

> Si implementaste tu contrato en [Mainnet Explorer](https://explorer.rootstock.io/).
