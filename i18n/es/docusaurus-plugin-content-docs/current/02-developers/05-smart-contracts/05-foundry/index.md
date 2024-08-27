---
section_position: 200
sidebar_label: Primeros pasos con Foundry
title: Primeros pasos con Foundry
description: Cómo escribir, probar y desplegar contratos inteligentes con Foundry
tags:
  - rsk
  - fundición
  - desarrolladores
  - herramientas para desarrolladores
  - portainjertos
  - pruebas
  - dApps
  - contratos inteligentes
---

En esta guía, aprenderemos sobre Foundry y sus beneficios para el desarrollo de contratos inteligentes, cómo configurar tu entorno, crear un proyecto Foundry y ejecutar un script de despliegue.

## Requisitos previos

Para empezar a utilizar Foundry, asegúrese de que están instaladas las siguientes herramientas:

- El compilador [Rust](https://rust-lang.org/)
- Gestor de paquetes de carga

> Para una instalación sencilla de las herramientas anteriores, utilice el [rustup installer](https://rustup.rs).

## Instalación

Para instalar, utilice Foundryup. Foundryup es el instalador de la cadena de herramientas de Foundry. Puedes encontrar más información en [Foundry README](https://github.com/foundry-rs/foundry/blob/master/foundryup/README.md).

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Ejecutar foundryup por sí mismo instalará los últimos binarios precompilados (nightly): `forge`, `cast`, `anvil`, y `chisel`.

> Visite las [guías de instalación](https://book.getfoundry.sh/getting-started/installation) para obtener más información.

## Crear un proyecto de fundición

Para iniciar un nuevo proyecto con Foundry, utilice [forge init](https://book.getfoundry.sh/reference/forge/forge-init.html).

```bash
forge init hello_foundry
```

> Consulte más detalles sobre cómo [crear un nuevo proyecto](https://book.getfoundry.sh/projects/creating-a-new-project) en la guía de Foundry.

## Redacte su primer contrato

Veamos la estructura de archivos de un proyecto de fundición por defecto:

```bash
$ cd hello_foundry
$ tree . -d -L 1
.
├── lib
├── script
├── src
└── test

4 directorios.
```

El directorio `src` contiene el contador del contrato inteligente con la prueba escrita en el directorio `test`. Ahora, vamos a construir el proyecto de fundición.

```bash
construcción de forja
```

Y luego haz pruebas.

```bash
prueba de forja
```

## Despliegue del contrato en el patrón

Para implementar el contrato de contador en la red principal o de prueba de Rootstock, configure Foundry estableciendo una url RPC de Rootstock y una clave privada de una cuenta financiada con tRBTC.

### Configuración del entorno

Una vez que tengas una cuenta con una clave privada, crea un archivo `.env` en la raíz del proyecto de foundry y añade las variables.

Foundry carga automáticamente un archivo `.env` presente en el directorio del proyecto.

El archivo `.env` debe seguir este formato:

```bash
ROOTSTOCK_RPC_URL=https://rpc.testnet.rootstock.io/{YOUR_APIKEY}
PRIVATE_KEY=0x...
```

En la raíz del proyecto, ejecute:

```bash
# Para cargar las variables en el archivo .env
source .env
```

### Modificar el script de implantación

Modifique el script de despliegue del contador de despliegue en el directorio `scripts` para utilizar la clave privada modificando el método de ejecución, vea el siguiente ejemplo:

```solidity
// SPDX-Licencia-Identificador: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/Counter.sol";


contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        new Counter();

        vm.stopBroadcast();

    }
}

```

Por defecto, los scripts se ejecutan llamando a la función llamada `run` en el punto de entrada.

```solidity
uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
```

> - PRECAUCIÓN: Ten cuidado cuando expongas claves privadas en un archivo `.env` y las cargues en programas.
> - Esto sólo se recomienda para su uso con desplegadores sin privilegios o para configuraciones locales / de prueba.

Al llamar a `vm.startBroadcast()`, la creación del contrato será registrada por Forge, y podemos difundir la transacción para desplegar el contrato en la cadena.

### Ejecutar el script de despliegue

Utilizaremos Forge para ejecutar nuestro script y emitir las transacciones - esto puede tardar un poco, ya que Forge también espera los recibos de las transacciones.

```bash
forge script script/Contador.s.sol --rpc-url $ROOTSTOCK_RPC_URL --broadcast --legacy
```

:::info\[Info]

- [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) no es compatible o no está activado en la url RPC de Rootstock.
- La bandera `--legacy` se pasa para usar transacciones legacy en lugar de `EIP-1559`.

:::

El resultado debería ser el siguiente:

```bash
[⠰] Compilando...
No hay archivos modificados, la compilación se ha omitido
El script se ha ejecutado correctamente.

== Logs ==
  Contador: 

## Configurando 1 EVM.

==========================

Cadena 31

Precio estimado del gas: 0.065164 gwei

Gas total estimado usado para el script: 138734

Cantidad estimada requerida: 0.000009040462376 ETH

==========================
##
Enviando transacciones [0 - 0].
⠁ [00:00:00] [###############################################################################################################################################] 1/1 txes (0.0s)##
Esperando recibos.
⠉ [00:00:25] [###########################################################################################################################################] 1/1 recibos (0.0s)
##### 31
✅ [Éxito]Hash: 0x015de35ffae94f491d4630f2aec84c49ae8170d5ecf3f4c1cdc8718bc4a00052
Dirección del contrato: 0x64B24E046259042e16a337Be4648CeAAF8Eb72C6
Bloque: 5071408
Gas utilizado: 106719

==========================

EJECUCIÓN ONCHAIN COMPLETA Y CON ÉXITO.
Total pagado: 0. ETH (106719 gas * avg 0 gwei)

Transacciones guardadas en: /hello_foundry/broadcast/Counter.s.sol/31/run-latest.json

Valores sensibles guardados en: /hello_foundry/cache/Counter.s.sol/31/run-latest.json
```

> El directorio de difusión se actualizará automáticamente con el último resultado de la implantación.

> Consulte la [documentación de implantación de la fundición](https://book.getfoundry.sh/tutorials/solidity-scripting#deploying-our-contract).
