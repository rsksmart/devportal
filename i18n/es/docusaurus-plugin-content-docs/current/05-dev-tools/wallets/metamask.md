---
sidebar_label: MetaMask
sidebar_position: 3
title: Configuración de la billetera MetaMask para Rootstock
tags:
  - metamask
  - rootstock
  - herramientas
  - rsk
  - billeteras
  - guías
description: Aprenda cómo conectarse a Rootstock con una billetera MetaMask
---

En esta guía aprenderá cómo descargar e instalar MetaMask y a configurar redes personalizadas.

:::note[Download e instalar MetaMask]

Para descargar o instalar Metamask y añadir redes personalizadas Rootstock, acceda a la herramienta [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) o siga los pasos que se indican en el video siguiente.
:::

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/VyPewQoWhn0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Conéctese con MetaMask

1. Abra la extensión de MetaMask.
2. En el selector de red (esquina superior derecha), elija RPC personalizado.

  <div styles="text-align: center">
    <img class="metamask-screenshot" src="/img/tools/metamask/metamask.png" />
  </div>

3. Introduzca estos valores para conectarse a la Mainnet o a la Testnet de Rootstock

<table class="table">
  <thead>
    <tr>
      <th scope="col">Campo</th>
      <th scope="col">Rootstock Mainnet</th>
      <th scope="col">Rootstock Testnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nombre de la red</td>
      <td>Rootstock Mainnet</td>
      <td>Rootstock Testnet</td>
    </tr>
    <tr>
      <td>RPC URL</td>
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
      <td>URL del explorador de bloques</td>
      <td><a href="https://explorer.rootstock.io/" target="_blank">https://explorer.rootstock.io/</a></td>
      <td><a href="https://explorer.testnet.rootstock.io/" target="_blank">https://explorer.testnet.rootstock.io/</a></td>
    </tr>
  </tbody>
</table>

:::tip[Get Clave API RPC]

Acceda a [RPC API Docs](/developers/rpc-api/) para registrarse y obtener una clave API.
:::

¡Ahora MetaMask está listo para usarse con Rootstock!

## Siguientes pasos

Pruebe la Testnet de Rootstock:

- [Obtenga la prueba RBTC](https://faucet.rootstock.io)
- [Obtenga tokens RIF de prueba](https://faucet.rifos.org)

Si desea obtener más información sobre los valores utilizados en la configuración de la red personalizada mencionada anteriormente, consulte [direcciones basadas en cuentas en Rootstock](/concepts/account-based-addresses/).

### Limitaciones

MetaMask aún no cumple completamente con las especificaciones técnicas de las [direcciones basadas en cuentas en Rootstock](/concepts/account-based-addresses/). Tenga en cuenta que existen soluciones alternativas disponibles que permiten a la mayoría de los usuarios utilizar MetaMask en Rootstock con éxito.

MetaMask utiliza el valor de Ethereum para **ruta de derivación** y actualmente no permite su configuración. Esto significa que, si utiliza la misma frase semilla en MetaMask y en otras billeteras, obtendrá un conjunto diferente de direcciones. Una **solución alternativa** para esto es utilizar rutas de derivación personalizadas al utilizar otras billeteras que admitan esta función.

MetaMask actualmente no admite **sumas de comprobación** de EIP-1191. Esto significa que, si utiliza las direcciones copiadas desde MetaMask, es posible que encuentre errores de validación de suma de comprobación. Una **solución alternativa** para esto es convertir las direcciones a minúsculas después de copiarlas.

:::warning [Disclaimer]

- Es posible que la moneda se muestre erróneamente como "ETH" en algunas pantallas de MetaMask. La red Rootstock utiliza "RBTC" como su criptomoneda.
- Este tutorial utiliza la [API RPC de Rootstock](/developers/rpc-api/). Puede conectarse a otros nodos o utilizar el [Nodo Público](/node-operators/public-nodes/) cambiando la URL del RPC.
- El nodo debe habilitar CORS para que las dApp basadas en navegador funcionen.
  - Revise la [referencia del archivo de configuración](/node-operators/setup/configuration/) para la configuración de CORS.

:::

## Recursos útiles

- [Conecte Rootstock a Metamask mediante programación](/resources/tutorials/rootstock-metamask/)
