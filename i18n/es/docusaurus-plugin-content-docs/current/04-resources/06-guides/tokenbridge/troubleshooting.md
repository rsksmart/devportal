---
sidebar_label: Solución de problemas del puente de Token
title: Guía de solución de problemas del Puente Rootstock
description: ¿Tienes problemas cruzando tus tokens en el puente de token? Consulta la guía de solución de problemas para obtener ayuda.
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

Mira las [Preguntas frecuentes sobre el puente Token (Token Bridge](https://dev.rootstock.io/resources/guides/tokenbridge/faq/)

Visita el [Token Bridge](https://dapp.tokenbridge.rootstock.io/) o el [Testnet Token Bridge](https://dapp.testnet.bridges.rootstock.io/)

<!-- <div class="rsk-token-bridge-support">
  <div class="rsk-token-bridge-support-input-area">
    <div>
      <label>Transaction Hash</label>
      <br />
      <input name="txHash" id="rsk-token-bridge-support-txHash" type="text" />
    </div>
    <div>
      <label>Crossing from</label>
      <br />
      <select name="fromNetwork" id="rsk-token-bridge-support-fromNetwork">
        <option value="ethereum-mainnet">Ethereum to Rootstock</option>
        <option value="rsk-mainnet">Rootstock to Ethereum</option>
      </select>
    </div>
    <div>
      <label>Wallet</label>
      <br />
      <select name="walletName" id="rsk-token-bridge-support-walletName">
        <option value="metamask">MetaMask</option>
        <option value="liquality">Liquality</option>
      </select>
    </div>
    <div>
      <button id="rsk-token-bridge-support-check-button">Check &hellip;</button>
    </div>
  </div>
  <div class="rsk-token-bridge-support-output-area">
  </div>
</div>

> Note that what follows below are generic troubleshooting queries.
> To see more specific information, use the form above. -->

## Tokens transferidos desde Ethereum, y después de 24 horas no han recibido tokens en Rootstock

**Red:** ETH a Rootstock

**Cuándo:** Bloque Actual - Número de Bloque de Transacción < 5760

**Respuesta:** 24 horas es una aproximación, no es fija. Espere hasta que 5760 bloques hayan pasado desde el número de bloque de transacción, más 5 minutos.

## Tokens transferidos desde Ethereum, y después de 24 horas no han recibido tokens en Rootstock

**Red:** ETH a Rootstock

**Cuándo:** Bloque Actual - Número de Bloque de Transacción > 5760

**Respuesta:** Busca en el [Explorador de Rootstock](https://explorer.rootstock.io/) en la SAME ADDRESS en Rootstock. Si no ves el balance correcto en la pestaña de tokens, por favor comparte tu Hash de Transacción en el canal **#token-bridge** en Rootstock Discord (ve a [Comunidad de Discord](https://rootstock. o/discord) a unirse.

## Tokens transferidos de Rootstock, y después de 24 horas no han recibido tokens en Ethereum

**Red:** Rootstock para ETH

**Cuándo:** Bloque Actual - Número de Bloque de Transacción < 2880

**Respuesta:** 24 horas es una aproximación, no es fija. Espere hasta que 5760 bloques hayan pasado desde el número de bloque de transacción, más 5 minutos.

## Tokens transferidos de Rootstock, y después de 24 horas no han recibido tokens en Ethereum

**Red:** Rootstock para ETH

**Cuándo:** Bloque Actual - Número de Bloque de Transacción > 2880

**Respuesta:** Mira en [Etherscan](https://etherscan.io/) en la SAME ADDRESS en Rootstock. Si no ves el balance correcto en la pestaña de tokens, por favor comparte tu Hash de Transacciones en el canal **#token-bridge** en Rootstock Discord (ve a [ Comunidad de Discord](https://rootstock. o/discord) para unirse).

## Tokens transferidos de Ethereum a Rootstock, pero no los ven en mi cartera

**Red:** ETH a Rootstock

**Cuándo:** siempre

**Respuesta:** Rootstock tiene una ruta de derivación diferente (m/44’/137’/0’/0) de Ethereum (m/44’/60’/0’/0). Copie su clave mnemonic o privada y utilice Metamask y añada Rootstock como red personalizada, para obtener la misma dirección que ethereum.

## Tokens transferidos de Rootstock a Ethereum, pero no los ven en mi cartera

**Red:** Rootstock para ETH

**Cuándo:** siempre

**Respuesta:** Rootstock tiene una ruta de derivación diferente (m/44’/137’/0’/0) de Ethereum (m/44’/60’/0’/0). Copie su clave mnemónica o privada y utilice MyEtherwallet o My Crypto con la ruta de derivación de Rootstock m/44’/137’/0’/0 para obtener la misma dirección que Rootstock.

## ¿Por qué tarda 24 horas? ¿Puede ser más rápido?

**Red:** Ambas

**Cuándo:** siempre

**Respuesta:** Esto es para medidas de seguridad. 24 horas es aproximación, no es exacta. Estamos trabajando para reducir este tiempo en la próxima versión.

## ¿Por qué no puedo elegir la dirección?

**Red:** Ambas

**Cuándo:** siempre

**Respuesta:** Actualmente, utiliza el puente de tokens siempre envía tokens a la misma dirección en la otra red de blockchain, y así el remitente y el receptor siempre tendrán la misma dirección. Tendrá la opción de enviar a otra dirección en la próxima versión.

## Metamask lanzó un error

**Network:** ETH

**Cuándo:** siempre

**Respuesta:** Esto suele ser un tiempo de espera ya que la transacción no fue minada en el tiempo esperado por Metamask. Esto no significa que la transacción no haya sido minada. Por favor comparte tu Hash de Transacciones en el canal **#token-bridge** en Rootstock Discord (ve a [Comunidad de Discord](https://rootstock.io/discord) para unirte).

## No veo mi transacción en la lista de token Bridge

**Red:** N/A

**Cuándo:** siempre

**Respuesta:** La lista se almacena en la caché local, por lo que no se comparte entre dispositivos, y se borrará si borra las cookies de su navegador y los archivos temporales. Puede estar seguro de que si la transacción es minada, los tokens cruzarán sin importar lo que diga la lista. Si esta no es la razón por la que no está ahí, por favor háganosla saber en el canal `#token-bridge` en Rootstock Discord (ve a [Comunidad de Discord](https://rootstock. o/discord) para unirse).

## He usado el Sovryn Token Bridge

**Red:** N/A

**Cuándo:** siempre

If you have used `bridge.sovryn.app`,
note that this is **not** the same as the Rootstock Token Bridge.
To get support, please ask on the
[Sovryn discord group](https://discord.com/channels/729675474665603133/813119624098611260).

## Envié tokens Rootstock a una dirección de Ethereum

**Red:** N/A

**Cuándo:** siempre

Note that if you have tokens on the Rootstock network, such as RIF or USDRIF,
including "crossed" tokens such as rUSDT or rDAI,
you **should not** send them to an Ethereum address in a regular transaction.
This **does not** work!
Instead, you should use the Rootstock Token Bridge to cross the tokens
from one blockchain to the other.

If you have done this already,
and sent the tokens to an address that **is not** under your control -
where you **do not have** the private key or the seed phrase -
then you have **burnt** the tokens, and they are not recoverable.
If you have done this already,
and sent the tokens to an address that **is** not under your control -
where you **do have** the private key or the seed phrase -
then it may be possible to recover your tokens.

## Tengo varias carteras instaladas, pero solo tengo una opción

**Red:** N/A

**Cuándo:** siempre

Decentralised apps on websites, such as the Rootstock Token Bridge,
interact with the blockchain network through a standard interface
known as a **web3 provider**.
Each browser wallet attempts to "inject" a web3 provider as soon as it is loaded.
This means that if you have multiple browser extensions doing the same thing,
one of them will override the other(s).

In order to avoid this problem, and if you already have multiple wallets installed,
is to choose which wallet you wish to use, and disable the other ones.
To do this in in Chrome, enter `chrome://extensions/` in your address bar,
which brings you to a settings screen that lists all of
the browser extensions that you have installed.
Click on the toggle button to disable all of the browser extensions
that inject **web3 providers**, except for the one that you wish to use.
After this go to the Rootstock token bridge again, and refresh.
