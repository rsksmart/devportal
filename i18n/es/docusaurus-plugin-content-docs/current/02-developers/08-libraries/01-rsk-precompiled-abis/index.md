---
title: ABI precompiladas
tags:
  - bibliotecas
  - abi
  - precompilado
sidebar_label: ABI precompiladas
sidebar_position: 100
description: ABI precompiladas.
---

Aquí encontrarás las ABIs para los contratos precompilados existentes en Rootstock. También obtendrás sus direcciones y un constructor para utilizarlo con web3.js.

## Versiones

Para las distintas versiones de Rootstock se necesitan versiones diferentes del paquete mencionado.

El versionado semántico de este paquete no se correlaciona con el versionado semántico de Rootstock. Para cada versión con nombre del nodo RSKj, habrá una versión con nombre correspondiente en npm.

El soporte de este paquete comienza con `ORCHID`.

## Utilización

Para la instalación de estos paquetes debe ejecutar en una ventana de terminal:

```shell
npm install @rsksmart/rsk-precompiled-abis@<version>
```

Como ejemplo para definirlo y utilizarlo:

1. Incluye el paquete Web3.

```javascript
const Web3 = require('web3');
```

2. Incluye el paquete `rsk-precompiled-abis`.

```javascript
const precompiled = require('@rsksmart/rsk-precompiled-abis');
```

3. Crea una instancia del contrato utilizando el método build del paquete y Web3 como parámetro.

(es decir: utilizando el Puente)

```shell
var bridge = precompiled.bridge.build(new Web3('http://localhost:4444'));
```

4. Utiliza un método del contrato. Por ejemplo, aquí llamamos a `getFederationAddress`, y muestra su resultado en la consola.

```shell
bridge.methods.getFederationAddress().call().then(console.log);
```

:::note[Important]
Si la versión a instalar no está definida en la línea de comandos, la versión corresponderá a la última versión en [rskj releases page](https://github.com/rsksmart/reproducible-builds/tree/master/rskj).
:::

## Tabla de versiones

| Versión del paquete                                    | Versión portainjertos                            |
| ------------------------------------------------------ | ------------------------------------------------ |
| 1.0.0-ORCHID           | ORCHID-0.6.2     |
| 2.0.0-WASABI           | WASABI-1.0.0     |
| 2.0.1-WASABI           | WASABI-1.0.0     |
| 3.0.0-PAPYRUS          | PAPYRUS-2.0.0    |
| 3.0.0-PAPYRUS          | PAPYRUS-2.2.0    |
| 3.0.0-IRIS             | IRIS-3.0.0       |
| 3.1.0-IRIS             | IRIS-3.1.0       |
| 3.2.0-IRIS             | IRIS-3.2.0       |
| 3.3.0-IRIS             | IRIS-3.3.0       |
| 4.0.0-HOP              | HOP-4.0.0        |
| 4.1.0-HOP              | HOP-4.1.0        |
| 4.1.1-HOP              | HOP-4.1.1        |
| 4.2.0-HOP              | HOP-4.2.0        |
| 4.3.0-HOP              | HOP-4.3.0        |
| 4.4.0-HOP              | HOP-4.4.0        |
| 5.0.0-fingerroot       | FINGERROOT-5.0.0 |
| 5.1.0-fingerroot       | FINGERROOT-5.1.0 |
| 5.2.0-fingerroot       | FINGERROOT-5.2.0 |
| 5.3.0-fingerroot       | FINGERROOT-5.3.0 |
| 5.4.0-fingerroot       | FINGERROOT-5.4.0 |
| 6.0.0-CABEZA DE FLECHA | FLECHA-6.0.0     |
