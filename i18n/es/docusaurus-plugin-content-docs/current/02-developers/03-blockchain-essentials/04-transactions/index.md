---
title: Explorar las transacciones de portainjertos
sidebar_position: 400
sidebar_label: Transacciones de portainjertos
description: Aprenda a interactuar con Rootstock en su navegador web, a consultar las transacciones de Rootstock y a desarrollar e implementar su primer contrato inteligente en la red Rootstock.
tags:
  - arranques rápidos
  - rsk
  - portainjertos
  - blockchain
  - monederos de navegador
  - desarrolladores
  - principiantes
---

In the previous section on [blockchain overview](/developers/blockchain-essentials/overview/), we set up a browser extension that is a crypto wallet, MetaMask. We connected to the Rootstock Testnet, and loaded this up with Rootstock’s cryptocurrency, RBTC, and an Rootstock-based token, RIF.

:::note[Using Rootstock in the browser]

If you are yet to do the above, we encourage you to go back and complete that step first. See: [Using Rootstock in the browser](/developers/blockchain-essentials/browser/).

:::

## Explorador de bloques

Ahora que ya estamos preparados, ¡exploremos algunas transacciones!
La red Rootstock es un **libro contable público inmutable**.
Vamos a diseccionar esa frase:

- \*\*Libro de contabilidad: Una lista ordenada de transacciones registradas de alguna forma
- **Inmutable**: La forma en que este libro se registra y almacena significa que cualquier transacción existente no puede ser borrada o modificada. También se puede considerar un libro de contabilidad "sólo para añadir".
- **Público**: El contenido de este libro de contabilidad es abierto y transparente, por lo que cualquier persona conectada a esta red puede ver todas y cada una de las transacciones de la historia.

Aquí es donde entran en juego los exploradores de bloques.
Son un tipo especial de software que se conecta a una red blockchain y muestra los datos de este libro de contabilidad público inmutable.

Dado que es abierto y transparente, nada impide que varios exploradores de bloques muestren los datos en una única cadena de bloques. Este es el caso de Rootstock, y existen varios exploradores de bloques. Aquí utilizaremos el canónico, pero siéntase libre de utilizar otros exploradores de bloques.

### Ver cuenta en el explorador de bloques

Vea este breve vídeo en el que se muestra cómo ver una cuenta en el explorador de bloques.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/p-q7NBmEqBo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Para la red principal de Rootstock, iríamos a [`explorer.rootstock.io`](https://explorer.rootstock.io/).
Sin embargo, como actualmente estamos conectados a la red de pruebas de Rootstock, iremos a [`explorer.testnet.rootstock.io`](https://explorer.testnet.rootstock.io/).

## Transferencia tRBTC

Hasta ahora, no has realizado ninguna transacción desde tu dirección. Las transacciones que ves cuando ves la dirección en el explorador de bloques se hicieron desde otras direcciones (en este caso, un par de grifos de Testnet). Ahora es el momento de que inicies tus propias transacciones.

Vea este breve vídeo en el que se muestra **cómo transferir tRBTC de una cuenta a otra**.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/fMdiNeDLKo0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Empezaremos transfiriendo criptomoneda desde tu dirección a la dirección del grifo.

## Transferencia tRIF

Vea este breve vídeo en el que se muestra **cómo transferir la tRIF de una cuenta a otra**.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/ncCzQnnMVr8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Disminución del saldo de RBTC

Es posible que haya observado que al enviar tRBTC, el saldo de tRBTC disminuyó en **un poco más** que la cantidad que envió. También habrás observado que cuando enviaste tRIF, el saldo de tRBTC también disminuyó en una pequeña cantidad, aunque en esa transacción sólo se enviaron tRIF.

Lo habrá visto en las pantallas de confirmación de transacciones al confirmar cada transacción.

Esto **no es un error**, es simplemente un aspecto fundamental del funcionamiento de las redes blockchain: cada vez que añades una transacción a la blockchain, debes pagar a la red una tarifa para compensar sus costes computacionales.

## Ver transacciones

Cuando realizaste cada una de las transacciones, deberías haber recibido notificaciones en ventanas emergentes.

Sin embargo, si te has perdido esto, no te preocupes, también puedes encontrarlo en el historial de transacciones dentro de MetaMask. Para ello, dentro de la pantalla principal de MetaMask, haz clic en la pestaña "Actividad". Verás la lista de las transacciones.

A continuación, haga clic en cualquier transacción, y haga clic en el botón de flecha junto al botón de copia llamado ID de transacción, esto le lleva al [Testnet explorer](https://explorer.testnet.rootstock.io)

Si ha hecho clic en la notificación emergente, o si la encuentra dentro de la pestaña "Actividad", de cualquier forma, esto debería abrir el explorador de bloques con la transacción seleccionada.

Para la transacción de la transferencia tRBTC, debería ver esto

Observará que esta transacción tiene un importe.

Para la transacción de la transferencia tRIF, debería ver esto

Observarás que esta transacción tiene un importe cero, pero emite algunos eventos, lo cual se debe a que el contrato inteligente del token RIF se encarga de ello.

## Ver estadísticas de red

Hasta ahora hemos comprobado direcciones y transacciones individuales. Se trata de información muy detallada y específica. ¿Y si lo que busca es una visión general? ¿Una vista de pájaro de la blockchain de Rootstock en su conjunto?

For this, we will not use the Rootstock Block explorer, and instead use the [Rootstock Stats](https://stats.rootstock.io) page.

Here, we can see some very important numbers such as the average block duration, and the merged mining hash rate - and several other important technical indicators of the Rootstock network.
A key indicator to look for is the average block time, which should be approximately 33s. Another key indicator to look for is the percentage of the Bitcoin network’s hash rate that is merge mining Rootstock.