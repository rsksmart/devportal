---
sidebar_position: 5
title: "Pruebas Virtuales: Utilice Tenderly para bifurcar la red principal Rootstock para el desarrollo"
sidebar_label: Crear redes virtuales en Rootstock usando Tenderly
tags:
  - rsk
  - rootstock
  - tierno
  - tutoriales
  - recursos
  - contratos inteligentes
  - red de pruebas virtual
  - red principal
description: El entorno de pruebas virtuales de Tenderly permite la creación de redes simuladas, gestionando saldos de cuentas, y manipular el almacenamiento de contratos – todo sin necesidad de interactuar con el mainnet Rootstock o red de pruebas.
---

¿Necesitas una forma segura y eficiente de probar tus características de dApp antes de desplegarlas en el mainnet Rootstock? ¡No busques más que redes de pruebas virtuales! Estos entornos simulados de blockchain, ofrecidos por plataformas como [Tenderly](https://tenderly. o/), proporciona un campo de pruebas perfecto para desarrolladores.

Imagina un clon del mainnet Rootstock donde puedes experimentar libremente sin usar fichas reales. Las redes virtuales imitan el comportamiento de un blockchain real, permitiéndote desplegar sus dApps, interactuar con contratos inteligentes y transacciones de depuración – todo dentro de un ajuste controlado.

:::note[Tenderly Redes de pruebas virtuales]

[Prueba virtual de Tenderly](https://tenderly. el entorno o/virtual-testnets) permite la creación de redes simuladas, gestionando saldos de cuentas, y manipular el almacenamiento de contratos – todo sin necesidad de interactuar con el mainnet Rootstock o red de pruebas.

:::

En este tutorial, haremos lo siguiente:

- Configurar una cuenta de Tenderly
- Configurar una red de prueba virtual
- Fork de Rootstock Mainnet: Crea una red simulada que replica el estado actual de Rootstock mainnet.
- Integrar un proyecto
- Revertir fácilmente a un estado de red anterior para probar escenarios más controlados usando instantáneas.
- Establecer saldos de cuenta (token nativo y ERC20).
- Anular almacenamiento por contrato

## Prerrequisitos

- Una cuenta anterior: Regístrate a una [cuenta Tenderly gratuita (https://tenderly.co/) para acceder a las características de Virtual Testnet
- Familiaridad básica con Contratos Inteligentes.

## Comenzando

### Creando un proyecto:

- [Regístrate o inicia sesión](https://tenderly.co/virtual-testnets) en tu cuenta de Tenderly y crea un nuevo proyecto específicamente para Rootstock.

![Rootstock - Tenderly Dashboard](/img/resources/tenderly/01-tenderly-dashboard.png)

### Configurando una red virtual

En la navegación de la izquierda, elija las redes virtuales y haga clic en el botón “Crear red virtual de pruebas”.

Utilice la configuración de abajo para configurar una red de pruebas virtual:

- Red padre: **RSK**
- Nombre de red: Cualquier nombre de elección
- Chain ID: **Default**
- Explorador público: Desactivado, selecciona **usar el último bloque**.

Su configuración debería verse como la de la imagen de abajo; haga clic en Crear.

![Rootstock - Tenderly Dashboard](/img/resources/tenderly/02-tenderly-dashboard-setup.png)

:::note[RPC Configuración]

En Tenderly, hay dos configuraciones RPC: **RPC público** y **RPC de administración**.

- La CPR pública permite interacciones RCP estándar con la cadena de bloques,
   como desplegar contratos e interactuar con contratos inteligentes.
- The Admin RPC enables you to modify the Testnet network state, including account balances,
   block numbers, and storage, to support your development requirements.

:::

![Rootstock - Tenderly Dashboard](/img/resources/tenderly/03-tenderly-rpc-setup.png)

## Integrar un proyecto

En el menú de la izquierda, seleccione Integrate para aprender cómo agregar la TestNet que acaba de crear a su proyecto.
Ejemplos están disponibles para Hardhat, Foundry, y otros frameworks. Además de configurar ejemplos,
encontrarás instrucciones sobre cómo enviar transacciones y agregar cuentas.

Para interactuar con Tenderly en tu proyecto Hardhat, necesitarás el paquete `hardhat-tenderly`,
que puedes instalar ejecutando el siguiente comando:

```bash
npm i @tenderly/hardhat-tenderly
```

A continuación, importa y configura Tenderly en tu archivo `hardhat.config`:

```js
import * as tdly from "@tenderly/hardhat-tenderly";
require("dotenv").config();
```

> Esto habilitará las características de Tenderly en su proyecto Hardhat.

## Usando Snapshots para pruebas confiables

Usando el RPC administrador de Tenderly, puede capturar instantáneas del estado actual de su red de pruebas y revertir a estas instantáneas según sea necesario. Esta característica es particularmente útil cuando se ejecutan múltiples pruebas que modifican el estado de testnet. Tomando una instantánea antes de ejecutar una prueba, haciendo cambios durante la prueba, y luego revertir a la instantánea posteriori, usted se asegura de que cada prueba comience con un estado de red limpio y consistente. Este enfoque mejora la fiabilidad y repetibilidad de sus pruebas.

#### Tomar instantánea

Para tomar una instantánea, añade el código de abajo;

```bash
const TENDERLY_RCP = 'https://virtual.rsk.rpc.tenderly. o/{id}

export async function takeSnapshot() {
   const requestOptions = {
       method: 'POST',
       cabeceras: {
           'Content-Type': 'application/json'
       },
       cuerpo: JSON. tringify({
           jsonrpc: '2.0',
           method: 'evm_snapshot'
       })
   };
   const response = await fetch(TENDERLY_RCP, requestOptions);
   const snapshotId = (espera la respuesta. son()).result;
   return snapshotId;
}
```

:::info\[Info]

La función `takeSnapshot` crea una instantánea en una red EVM usando un punto final Tenderly RPC.
Envía una solicitud `POST` con datos RPC JSON y devuelve el `snapshot ID`.

:::

#### Revertir a la instantánea

Para revertir a instantánea, añade el código de abajo;

```bash
export async function revertToSnapshot(snapshotId: string) {
   const requestOptions = {
       method: 'POST',
       cabeceras: {
           'Content-Type': 'application/json'
       },
       cuerpo: JSON. tringify({
           jsonrpc: '2. ',
           método: 'evm_revert',
           parámetros: [snapshotId]
       })
   };
   await fetch(TENDERLY_RCP, requestOptions);
}
```

:::info\[Info]

Esto toma un 'snapshotId' como parámetro y lo usa para revertir el estado EVM al snapshot especificado. Construye una solicitud `POST` con los datos JSON-RPC necesarios, la envía al extremo Tenderly RPC y espera la respuesta. Esencialmente, esta función hace retroceder la EVM a un estado anterior capturado en la instantánea.

:::

#### Establecer saldos de cuenta (token nativo y ERC20)

Usando tiderly admin rpc, puedes establecer tanto token nativo como cualquier saldo ERC20 para cualquier cuenta en la TestNet. Esto te permite crear los escenarios de prueba que necesitas.

#### Establecer saldo de tokens nativos

```bash
export async function setNativeBalance(walletAddress: string, amount: BigInt) {
   const amountHex = ethers.toQuantity(amount.toString());
   await ethers.provider.send("tenderly_setBalance", [
       walletAddress,
       amountHex,
   ]);
}
```

#### Establecer saldo ERC20

Para establecer un saldo de cuenta, copie y pegue el código de abajo;

```bash
export async function setErc20Balance(erc20Address: string, walletAddress: string, amount: BigInt) {
   const amountHex = ethers.toQuantity(amount.toString());
   await ethers. rovider. end("tenderly_setErc20Balance", [
       erc20Address,
       dirección de cartera,
       montoHex,
   ]);
}
```

#### Anular el almacenamiento del contrato

Con anterioridad te permite anular el almacenamiento inteligente de contratos en la TestNet, pero necesitamos conocer la ranura para memoria de la variable de almacenamiento que queremos modificar. Para [variables de tipo de valor](https://docs.soliditylang.org/en/latest/types.html#value-types) como dirección o entero, podemos contar la posición de la variable en el contrato.

```bash
Solidez pragmática ^0.8. ;
contract SimpleStorage {
   uint256 public value1; // Stored at slot 0
   uint256 public value2; // Almacenado en la ranura 1


   function setValues(uint256 _value1, uint256 _value2) public {
       value1 = _value1;
       valor 2 = _valor2;
   }
}
```

Una vez que hayas identificado la ranura que necesitas modificar, puedes establecer un nuevo valor para esa ranura. Recuerde convertir el valor a 32 bytes, ya que este es el tamaño de memoria de una ranura de almacenamiento.

```bash
async function overrideContractStorage() {
   // where to override
   let storageSlot = 4;
   const abiCoder = new ethers.AbiCoder();
   const storageSlot32Bytes = abiCoder.encode(["uint256"], [storageSlot]);


   // what to override
   const newValue = 2;
   const newValue32Bytes = abiCoder.encode(["uint256"], [newValue]);


   // override
   await ethers.provider.send("tenderly_setStorageAt", [
       addresses.oldMultisig,
       storageSlot32Bytes,
       newValue32Bytes,
   ]);
}
```

:::info\[Info]

Para tipos de referencia como arrays dinámicos, necesitamos seguir los principios esbozados en ["Layout of State Variables in Storage"](https://docs. oliditylang.org/es/latest/internals/layout_in_storage.html) para encontrar el espacio de almacenamiento. Otro enfoque más empírico es leer la ranura de almacenamiento de tu contrato por ranura para identificar las variables almacenadas en cada ranura, utilizando por ejemplo el método de ethers [getStorageAt](https://docs. thers.org/v5/api/providers/#Provider-getStorageAt).

:::

...y eso, en esta guía, hemos creado con éxito un proyecto, configurando una red virtual, bifurcó el Rootstock Mainnet creando una red simulada que replica el estado actual de Rootstock mainnet. Aprendí cómo integrar un proyecto existente, apalancar Instantáneas, tomar instantáneas, revertir instantáneas, establecer saldos de cuenta (token nativo y ERC20) y anular el almacenamiento del contrato.