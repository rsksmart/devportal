---
sidebar_label: Desarrollo Requisitos previos
sidebar_position: 2
title: Requisitos previos
tags:
  - rsk
  - portainjertos
  - requisitos previos
  - configuración
  - requisitos
description: Requisitos mínimos de hardware para Rootstock.
---

Esta guía proporciona instrucciones claras a los desarrolladores sobre las versiones de Solidity compatibles y las configuraciones necesarias para garantizar que sus contratos inteligentes se implementen en la red Rootstock. Consulte la sección [herramientas para desarrolladores](/dev-tools/) para obtener una lista de herramientas para construir en Rootstock.

## Versión sólida

- Versión solc compatible: `0.8.19`.

## Nodo RPC

- Interactúe con Rootstock mediante la [API RPC](https://rpc.rootstock.io/)

:::tip[Get una clave API]
Vea cómo configurar la API RPC y obtener una [Clave API](/developers/rpc-api/setup).
:::

## Configuración de la red

Rellene estos valores para conectarse a la Rootstock Mainnet o Testnet.

<table class="table">
  <thead>
    <tr>
      <th scope="col">Campo</th>
      <th scope="col">Red principal de portainjertos</th>
      <th scope="col">Red de prueba de portainjertos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nombre de la red</td>
      <td>Red principal de portainjertos</td>
      <td>Red de prueba de portainjertos</td>
    </tr>
    <tr>
      <td>URL RPC</td>
      <td>https://rpc.mainnet.rootstock.io/{YOUR_APIKEY}</td>
      <td>https://rpc.testnet.rootstock.io/{YOUR_APIKEY}</td>
    </tr>
    <tr>
      <td>ChainID</td>
      <td>30</td>
      <td>31</td>
    </tr>
    <tr>
      <td>Símbolo</td>
      <td>RBTC</td>
      <td>tRBTC</td>
    </tr>
    <tr>
      <td>Bloquear URL del explorador</td>
      <td><a href="https://explorer.rootstock.io/" target="_blank">https://explorer.rootstock.io/</a></td>
      <td><a href="https://explorer.testnet.rootstock.io/" target="_blank">https://explorer.testnet.rootstock.io/</a></td>
    </tr>
  </tbody>
</table>

## Direcciones contractuales

- Consulte la lista de [Direcciones de contrato en Rootstock](/developers/smart-contracts/contract-addresses)

### Vía de derivación

Cuando utilice [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki "Jerarquía multicuenta para monederos deterministas") compatible con el software de monedero
, deberá especificar una ruta de derivación.

```text
Mainnet: m/44'/137'/0'/0/N
Testnet: m/44'/37310'/0'/0/N
```

:::info[Info]
Consulte la sección [Direcciones basadas en cuentas](/conceptos/direcciones basadas en cuentas/) para obtener más información o [cómo verificar la titularidad de la dirección](/desarrolladores/contratos-inteligentes/verificar-la-titularidad-de-la-dirección/).
:::

## Instalar casco

```bash
npm install --save-dev hardhat
```

:::tip\[Recommended]

- Instale `hh` autocompletar para utilizar `hh` taquigrafía a nivel mundial.

```bash
npm i -g hardhat-shorthand
```

- Utilice el [Kit de iniciación al casco](/developers/quickstart/hardhat)

- Aprenda a escribir, interactuar, desplegar y probar contratos inteligentes en Rootstock utilizando [Hardhat](/developers/smart-contracts/hardhat) o [Foundry](/developers/smart-contracts/foundry/).

:::

## Herramientas de línea de comandos

### Shell compatible con POSIX

```mdx-code-block
<Tabs>
  <TabItem value="windows" label="Windows">
    Los terminales estándar como `cmd` o PowerShell pueden no soportar algunos comandos. Recomendamos instalar [Git para Windows](https://gitforwindows.org/) para Git Bash, que proporciona una experiencia más parecida a UNIX. Aquí tienes un [tutorial sobre Git Bash](https://www.atlassian.com/git/tutorials/git-bash).
  </TabItem>
  <TabItem value="macos" label="MacOS/Linux">
    Terminal estándar.
  </TabItem>
</Tabs>
```

### Instalación de Node.js y NPM

````mdx-code-block
<Tabs>
  <TabItem value="nvm" label="NVM" default>
    - Node v18 o posterior.
        - Para la instalación, utilice [NVM install script](https://github.com/nvm-sh/nvm#install--update-script).
  </TabItem>
  <TabItem value="windows" label="Windows">
    1. Descargue el instalador de Node.js desde [Descargas de Node.js](https://nodejs.org/en/download).
    2. Ejecuta el instalador y sigue las instrucciones en pantalla.
    3. Abra Command Prompt o PowerShell y compruebe las versiones con `node -v` y `npm -v`.
        - Véase Shell compatible con Posix.
  </TabItem>
  <TabItem value="macos" label="MacOS">
    1. Instala Homebrew (si no está instalado):
        ```bash
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
        ```
    2. Instala Homebrew. Instala Node.js y npm con `brew install node`
    3. Comprueba las versiones en el Terminal con `node -v` y `npm -v`
  </TabItem>
  <TabItem value="linux" label="Linux">
      1. 1. Abre un terminal.
      2. Actualiza el gestor de paquetes con sudo apt update
      3. Instala Node.js y npm con sudo apt install nodejs npm
      4. Comprueba las versiones en el terminal con `node -v` y `npm -v`
  </TabItem>
</Tabs>
````

## Configuración opcional

- [Foundry](/desarrolladores/contratos inteligentes/foundry)
- [Remix](https://remix.ethereum.org/)
