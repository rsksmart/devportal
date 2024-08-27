---
sidebar_label: Uso del patrón en el navegador
sidebar_position: 300
title: Uso de Rootstock con una extensión del navegador
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

Como Rootstock es una cadena de bloques con capacidades de contrato inteligente, es posible crear aplicaciones descentralizadas (dApps) con ella.
La mayoría de las dApps son aplicaciones web a las que se accede con un navegador de Internet normal, como Chrome.
Sin embargo, las interacciones blockchain requieren algún software adicional, que viene en forma de extensiones del navegador.
Estas extensiones de navegador insertan un objeto **web3 provider**, con las partes Javascript de la aplicación web utilizadas para interactuar con la blockchain, formando parte integral de la arquitectura de la dApp.

> Ten en cuenta que estas extensiones de navegador almacenan tus claves privadas,
> y las utilizan para firmar transacciones. Así que manténgalas seguras.

:::note[Rootstock Carteras]
Hay varias extensiones de navegador que puede utilizar para interactuar con la blockchain Rootstock, esto incluye: [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn). Para obtener una lista completa de monederos, consulte la sección [Dev Tools](/dev-tools/).
:::

Dado que este es un comienzo rápido, no vamos a ir a través de todos ellos - sólo MetaMask.

Hay algunas complejidades ocultas que hemos pasado por alto en el contenido anterior para que
pueda configurarse y ponerse en marcha lo antes posible.
Si quieres profundizar más, aquí tienes algunos recursos que te recomendamos.

## Instalar Metamask

MetaMask es la extensión de navegador más popular con capacidades de proveedor web3.
Permite a los usuarios comprar, almacenar, enviar e intercambiar tokens.

Metamask también le proporciona un depósito de claves, un inicio de sesión seguro, un monedero de tokens y un intercambio de tokens: todo lo que necesita para gestionar sus activos digitales.

Abra el navegador Chrome e instale la extensión desde [Chrome store](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn).

Este breve vídeo muestra cómo descargar e instalar MetaMask en tu navegador, y también cómo crear una cartera para almacenar tus criptoactivos.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/VlyqXD1TjJk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Criptografía

## Claves privadas y claves públicas

En el software de monedero, generalmente se ven "cuentas" representadas por direcciones en la red blockchain.
En el caso de Rootstock, es `0x` seguido de una serie de caracteres hexadecimales, por ejemplo, `0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`.
Hay cierta complejidad oculta detrás de esto, relacionada con la criptografía, que es necesaria para asegurar la cuenta y todas las transacciones de blockchain que realiza.

- Empiezas con una clave privada, que es esencialmente un número extremadamente grande, y debe ser generado aleatoriamente.
  Debes mantener la clave privada en secreto, porque es la que se utiliza para firmar las transacciones.
- A partir de la clave privada se genera una clave pública, que también es un número muy grande.
  No es necesario mantenerla en secreto, porque otros miembros de la red blockchain la utilizan para verificar las transacciones.
- Una dirección se genera a partir de la clave pública, y es la cadena hexadecimal que ves en el software de tu monedero.

### Frases semilla

Cuando abras MetaMask por primera vez después de instalarlo, se te pedirá que lo inicialices utilizando una frase semilla.
Si ya lo has hecho antes, puedes utilizar tu propia frase semilla. Si no, ¡vamos a generar una nueva!

> Para generar una nueva frase semilla, deberá crear un nuevo monedero.
> Consulte los pasos anteriores para crear un nuevo monedero.

La mayoría de los usuarios de blockchain manejan una o más cuentas, y puede ser bastante difícil recordar el valor de las claves criptográficas - esos números tan grandes - ¡necesitarás una memoria sobrehumana!
La **frase semilla** es actualmente el método más popular utilizado para generar, almacenar, recordar y recuperar claves para criptocarteras, y es algo accesible para el usuario medio.

También es el método por defecto utilizado por MetaMask (y muchos otros monederos).
En pocas palabras, toma una secuencia generada aleatoriamente de palabras del diccionario.
El monedero utiliza esta secuencia de palabras para generar no uno, sino múltiples conjuntos de claves criptográficas.
Así es como MetaMask es capaz de soportar múltiples cuentas utilizando una única frase semilla.

Este proceso se describe detalladamente en la norma técnica BIP-44.
Esto garantiza que el funcionamiento de las frases semilla sea el mismo entre múltiples criptocarteras, lo que permite que la misma frase sea portátil.

## Configurar una red personalizada para Rootstock Testnet

MetaMask viene preconfigurado con conexiones para redes Ethereum.
Vamos a utilizar su función de redes personalizadas para añadir una conexión a una red Rootstock.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/VyPewQoWhn0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Después de crear la red personalizada para la Testnet de Rootstock, debería poder interactuar con los contratos inteligentes desplegados en la Testnet de Rootstock.
También debería ver sus saldos en tRBTC (Testnet RBTC).
Actualmente es cero, lo que significa que no podemos enviar ninguna transacción a la blockchain, así que vamos a conseguir algunas usando el grifo RBTC.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/twfK8Rd5hak" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Ahora debería tener un saldo de tRBTC, ¡y podrá enviar transacciones en la Testnet de Rootstock!

## Configurar token personalizado para tRIF

El Marco de Infraestructura del Rootstock (RIF) incluye múltiples servicios para aplicaciones descentralizadas.
Estos servicios pueden pagarse utilizando el token RIF.
Vamos a configurar MetaMask para que conozca el token RIF.
Utilizaremos tRIF como símbolo del token, ya que estamos en la Testnet de Rootstock.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/QCabRPfr2Zs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Ahora que MetaMask tiene el token RIF configurado, vamos a obtener algunos tokens de prueba utilizando el grifo RIF.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/ttb8EOTWey8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Ahora deberías tener un saldo de tRIF, ¡y podrás utilizar los servicios de RIF en la Rootstock Testnet!

### Lecturas complementarias

- [Cómo configurar Metamask](/dev-tools/wallets/metamask/)
- [Direcciones basadas en cuentas en Rootstock](/concepts/account-based-addresses/)
- [Acerca del token RIF](/concepts/rif-suite/token/)
- [Acerca de la criptomoneda RBTC](/conceptos/rbtc/)
- [Acerca del gas](/concepts/rbtc/gas/)
- [Acerca de los servicios RIF](https://www.rifos.org/)
- [Sobre BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
- [Acerca de EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
- [Generación de claves asimétricas](https://en.wikipedia.org/wiki/Public-key_cryptography)
