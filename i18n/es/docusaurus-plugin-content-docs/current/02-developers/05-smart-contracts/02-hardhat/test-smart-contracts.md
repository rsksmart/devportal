---
sidebar_label: Probar contratos inteligentes
sidebar_position: 104
title: Probar contratos inteligentes
description: Aprenda a probar su contrato inteligente Rootstock
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

En esta sección, configurarás una prueba de contrato inteligente y probarás tu contrato utilizando los marcos de pruebas Mocha y Chai. Ver Automatización de DApps usando [Cucumber y Playwright](/resources/tutorials/dapp-automation-cucumber/).

Siga estos pasos para probar el contrato inteligente.

### Paso 1: Instalar dependencias

Instalaremos las dependencias de pruebas de Mocha y Chai.

Mocha es un marco de pruebas de JavaScript que se ejecuta en Node.js. Chai es una biblioteca de aserciones para el navegador y Node que puede emparejarse con cualquier framework de pruebas JavaScript.

- Antes de escribir pruebas para su contrato de token, asegúrese de que Mocha y Chai están instalados. Para instalar las dependencias de pruebas necesarias:

```shell
  npm install --save-dev mocha@10.2.0 chai@4.2.0 @nomiclabs/hardhat-ethers@2.2.3
```

### Paso 2: Crear pruebas

1. Navegue hasta el directorio `test` en el directorio raíz de su proyecto, este es el recomendado para almacenar todos los archivos de prueba:

```shell
  prueba de cd
```

2. En el directorio de pruebas, abre el archivo `MyToken.test.js`, escribiremos pruebas para el contrato token usando Mocha y Chai:

Copia el siguiente fragmento de código y pégalo en tu archivo de prueba o consulta el archivo [`MyToken.test.js`](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/test/MyToken.test.js) en GitHub.

```js
  const { expect } = require("chai");
  const { ethers } = require("hardhat");

  describe("MyToken", function () {
  it("Debería desplegar MyToken y asignar el suministro total al propietario", async function () {
    const [propietario] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(1000);
    await myToken.deployed();

    expect((await myToken.totalSupply()).toString()).to.equal('1000');
    expect((await myToken.balanceOf(owner.address)).toString()).to.equal('1000');
      });
});
```

### Paso 3: Ejecutar las pruebas

Para ejecutar las pruebas, ejecute el siguiente comando en el directorio raíz de su proyecto. Esto ejecutará las pruebas escritas, confirmando que el contrato funciona como se esperaba.

```shell
prueba del casco npx
```

Debería obtener una respuesta como la siguiente
Éxito de la prueba](/img/guides/quickstart/hardhat/test-success.png)

Siguiendo estos pasos, tendrás instalados los marcos de pruebas necesarios y estarás bien preparado para escribir pruebas eficaces para tu contrato inteligente.

## Enfoques y marcos de pruebas alternativos

Además de Mocha y Chai, puede utilizar varios otros marcos y enfoques en su proyecto Hardhat. Cada uno tiene sus propias características y ventajas.

- Jest - Marco de pruebas de JavaScript
  - [Jest](https://jestjs.io/) es popular por su agradable sintaxis y su enfoque en la simplicidad. Funciona bien para probar aplicaciones JavaScript tanto frontend como backend.
- Waffle - Biblioteca de pruebas de contratos inteligentes de Ethereum
  - [Waffle](https://getwaffle.io/) es una biblioteca para escribir y probar contratos inteligentes. Se utiliza a menudo con ethers.js y es conocida por su sintaxis fluida.
- Automatización de DApps Cucumber
  - [Automatización de aplicaciones con Cucumber](/resources/tutorials/dapp-automation-cucumber/)
