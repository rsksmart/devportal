---
sidebar_position: 4
sidebar_label: Puente de Token
title: Puente de ficha Rootstock
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

Mueva de forma segura sus fichas ERC20 entre Rootstock y Ethereum con la aplicación Tokenbridge. Esta interfaz fácil de usar le permite interactuar directamente con los contratos de Token Bridge. Está disponible en [Mainnet](https://dapp.tokenbridge.rootstock.io/) o [Testnet](https://dapp.testnet.bridges.rootstock.io/).

## Racionale

Los eventos de la cadena transversal son muy importantes en el futuro de las criptomonedas. El intercambio de tokens entre redes permite a los poseedores de tokens usarlos en su cadena favorita sin estar restringidos a la elección de red del propietario del contrato. Además, esto también permite que las soluciones de capa 2 utilicen las mismas fichas en diferentes cadenas. La combinación de puentes simbólicos y monedas estables crea una gran forma de pago con baja volatilidad entre redes.

## Resumen

Tenemos un contrato inteligente de puente en cada red, el puente en una cadena recibirá y bloqueará los tokens ERC20, entonces emitirá un evento que será servido al puente de la otra cadena. Hay una Federación a cargo de enviar el evento de un contrato a otro. Una vez que el puente de la otra cadena recibe el evento de la Federación, minta las fichas del contrato ERC20 espejo.
¡Mira la [FAQs](/resources/guides/tokenbridge/faq/) para aprender más sobre cómo funciona!

<img src="/img/resources/tokenbridge/token-bridge-diagram.jpg"/>

The bridge contracts are upgradeable, this enables a smoother move to a more decentralized bridge in the future. This is the
[token bridge repository](https://github.com/rsksmart/unified-bridges-ui)

## Uso

Puedes usar el ['Token Bridge dApp'](https://dapp.tokenbridge.rootstock.io/) junto con [Metamask con red personalizada](/dev-tools/wallets/metamask/) para mover tokens entre redes.

Sigue la [guía dApp](/resources/guides/tokenbridge/dappguide/) para más detalles sobre cómo usar el puente de token.

Alternativamente, puede utilizar una cartera o web3js con el ABI de los contratos. Vea ['Guía de interacción usando MyCrypto'](/resources/guides/tokenbridge/usingmycrypto/) para más información sobre cómo usar el puente.

## Desarrolladores

### Contratos

Aquí están las ['direcciones'](/resources/guides/tokenbridge/contractaddresses/) de los contratos desplegados en las diferentes redes.

Los contratos inteligentes utilizados por el puente y las instrucciones de despliegue están en el repositorio del puente de tokens en la ['carpeta de puente'](https://github.com/rsksmart/unified-bridges-ui).

La ABI para interactuar con los contratos está en la ['abis folder'](https://github.com/rsksmart/unified-bridges-sdk/blob/main/packages/tokenbridge-sdk/src/blockchain/tokenbridge/abi.ts)

### Federación

Hay una federación a cargo de notificar los acontecimientos que han ocurrido en el puente entre una cadena y la otra. La federación se compone de los creadores de los contratos simbólicos que quieren permitir su ficha para el cruce.
Vea en el ['repositorio federador de token bridge'](https://github.com/rsksmart/unified-bridges-sdk/tree/main/packages/tokenbridge-sdk/src/blockchain/federation) para más información.
