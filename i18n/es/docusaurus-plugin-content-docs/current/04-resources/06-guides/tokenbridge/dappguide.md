---
sidebar_position: 301
sidebar_label: Guía de Token Bridge dApp
title: Guía de Token Bridge dApp - Transacciones multicadena
tags:
  - recursos
  - tokenbridge
  - cadena de bloques
  - puentes
  - fichas
  - ethereum
  - rootstock
  - rsk
---

Esta guía describe los pasos para transferir tokens usando la interfaz web para [Rootstock Token Bridge dApp](https://dapp. okenbridge.rootstock.io/). Por favor, consulte la documentación del proyecto, si desea saber más sobre cómo funciona este puente. Es posible probar la transferencia de tokens entre las redes Rootstock Testnet y Sepolia o redes de Rootstock Mainnet y Ethereum usando la interfaz web de Rootstock Tokenbridge.

## Prerrequisitos

Esto requerirá el uso del navegador web Chrome o Chromium, con una de las siguientes extensiones de navegadores:

- [Metamask](https://metamask.io/download.html) usando una [red personalizada](/dev-tools/wallets/metamask/) para añadir la red Rootstock.
- Obtén tokens de prueba del [Rootstock Token Faucet](https://rsksmart.github.io/rsk-token-faucet/)
- Obtén [Test Sepolia ETH](https://www.alchemy.com/faucets/ethereum-sepolia)

:::tip\[Tip]

- Vea la sección Herramientas para una lista de [carteras compatibles con Rootstock](/dev-tools/)
- Ver la sección [Direcciones del contrato](/resources/guides/tokenbridge/contractaddresses/) para una lista de direcciones del contrato.
  :::

## Empezar

Comience conectando su cartera y seleccione la red de su elección, en este caso usaremos la red [Rootstock Testnet](https://dapp.testnet.bridges.rootstock.io/).

<img src="/img/resources/tokenbridge/dapp-image1-1.png" alt="tokenbridge connect"/>

Elija de la lista de tipos de cartera disponibles, para esta guía, nos conectaremos a una cartera de Metamask:

<img src="/img/resources/tokenbridge/dapp-image1-1a.png" alt="token bridge wallet connected" />

Deberías ver la siguiente pantalla:

<img src="/img/resources/tokenbridge/dapp-image1-2.png" alt="token bridge token bridge connected" />

A continuación, elija el token de red original que desea transferir, introduzca la cantidad y la dirección del receptor.

<img src="/img/resources/tokenbridge/dapp-image2.png" alt="token bridge approve" />

Haz clic en el botón 'Continuar'.

:::info\[Info]

- Por ejemplo, el token tRUSDT, RDAI, RUSDC o RLINK, etc se puede obtener del [Rootstock Token](https://rsksmart.github. o/rsk-token-faucet/) Faucet.
  Necesitará aprobar el contrato de puente para usar el token, esto sucederá sólo una vez.

- La transferencia mínima es 1RUSDT y la transferencia máxima es 250.000RUSDT

:::

Confirma la transacción, las comisiones y el tiempo de confirmación y haz clic en **Transferir fichas de Rootstock Testnet**.

<img src="/img/resources/tokenbridge/dapp-image3.png" />

:::warning\[Important]

No utilices el puente para enviar tokens a tu dirección de intercambio, no podrás reclamarlo

:::

Tan pronto como comience el proceso, verá un cargador y una ventana emergente de Metamask pidiendo aprobación y confirmación de la transacción.

<img src="/img/resources/tokenbridge/dapp-image4.png" alt="token bridge wait for transaction" />

Una vez que los tokens han cruzado, **necesitas reclamarlos en la red de Sepolia**. se le pedirá que cambie de red a Sepola. Haga clic en **cambiar de red a Sepola** y apruebe en MetaMask.

> Cambiar a la red opuesta es importante para reclamar sus tokens.

<img src="/img/resources/tokenbridge/dapp-image5.png"  alt="switch network to Sepolia" />

Si todo funcionó correctamente, deberías ver un mensaje para **Tokens de reclamación**. Haz clic en el botón reclamar.

<img src="/img/resources/tokenbridge/dapp-image6.png" />

Una ventana emergente de confirmación aparecerá para enviar la transacción de reclamación a la red, enviarla. Deberías ver una pantalla de confirmación.

<img src="/img/resources/tokenbridge/dapp-image7.png" alt="token bridge claim button" />

Después de que la transacción sea minada, usted puede ver su transacción como reclamada comprobando su lista de reclamos.

<img src="/img/resources/tokenbridge/dapp-image8.png" alt="token bridge claimed transaction"/>

:::success\[Success]

- You can check the token contract on the other network by clicking on the transaction hash (in this case RUSDT).
  You can also confirm the funds in your wallet. To do this add a custom token on the network where the token crossed using the address mentioned before.

- También puedes transferir fichas en la otra dirección, usando el mismo método.

:::
