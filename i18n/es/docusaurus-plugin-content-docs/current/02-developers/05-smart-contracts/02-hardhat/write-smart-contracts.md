---
sidebar_label: Escribir un contrato inteligente
sidebar_position: 103
title: Escribir un contrato inteligente
description: Aprende a escribir un contrato inteligente utilizando Solidity y OpenZeppellin
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

En esta sección, aprenderemos a escribir un contrato inteligente utilizando la [biblioteca OpenZeppelin](https://www.openzeppelin.com/contracts) y Solidity. OpenZeppelin es ampliamente utilizado por su código base seguro, estandarizado y validado por la comunidad, que simplifica el desarrollo de contratos inteligentes robustos y seguros.

## Crear un contrato inteligente

### Paso 1: Instalar los contratos OpenZeppelin

Ejecute el siguiente comando para instalar la biblioteca de contratos inteligentes reutilizables de OpenZeppelin.

```shell
    npm install @openzeppelin/contratos
```

#### Paso 2: Crear un contrato de token

- Navegue hasta el directorio `contracts` en el directorio raíz del proyecto de inicio rápido:

```shell
    contratos cd
```

- En el directorio de contratos, abra el archivo `MyToken.sol` para su contrato de token:

Para configurar un token ERC20, copie el siguiente fragmento de código y péguelo en su archivo de token o consulte el archivo completo [`MyToken.sol`](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/contracts/MyToken.sol) en GitHub.

```shell
    // SPDX-Licencia-Identificador: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract MyToken is ERC20 {
        constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
            _mint(msg.sender, initialSupply);
        }
    }
```

Este contrato define un token `ERC20` llamado `MyToken` con el símbolo `MTK`, utilizando la implementación estándar ERC20 de OpenZeppelin.

## Redactar el contrato

Para construir el contrato, ejecute el siguiente comando en el directorio raíz del proyecto.

```shell
npx hardhat compile
```

Esto compilará tus contratos inteligentes y generará artefactos:

```shell
% npx hardhat compile
Descargando compilador 0.8.20
Compilado 6 archivos Solidity con éxito (objetivo evm: paris).
```

---

## Siguiente

- [Pruebe su Contrato Inteligente](/developers/smart-contracts/hardhat/test-smart-contracts/) para asegurarse de que funciona como se espera.
