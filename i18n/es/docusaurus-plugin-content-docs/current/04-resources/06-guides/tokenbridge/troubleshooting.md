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

## Crossing Tokens on Mainnet

View the [Token Bridge FAQs](https://dev.rootstock.io/resources/guides/tokenbridge/faq/)

Find the min/max values for [crossing tokens on Mainnet](https://dapp.tokenbridge.rootstock.io/) using the Tokenbridge.

| Cross Token  | Network  | Amount                                         | \# of Block Confirmations           | Min Amount | Max Amount     |
| :----------- | :------- | :--------------------------------------------- | :----------------------------------- | :--------- | :------------- |
| LINK → rLINK | ETHEREUM | 0 <br/> 100 LINK <br/> 1000 LINK <br/>         | 120 <br/> 240 <br/> 5,760            | 0 LINK     | 25000 LINK     |
| DAI → rDAI   | ETHEREUM | 0  <br/> 10000 DAI <br/> 100000 DAI <br/>      | 120 <br/> 240 <br/> 5760             | 10 DAI     | 2500000 DAI    |
| USDT → rUSDT | ETHEREUM | 0 <br/> 1000000 USDT <br/> 10000000 USDT <br/> | 120 <br/> <br/> 240 <br/> <br/> 5760 | 1000 USDT  | 250000000 USDT |
| USDC → rUSDC | ETHEREUM | 0 <br/> 1000000 <br/> 10000000                 | 120 <br/> <br/> 240 <br/> <br/> 5760 | 1000 USDC  | 250000000 USDC |

## Crossing Tokens on Testnet

Find the min/max values for [crossing tokens on Testnet](https://dapp.testnet.bridges.rootstock.io/) using the Tokenbridge.

| Cross Token  | Network | Amount                                       | \# of Block Confirmations            | Min Amount | Max Amount       |
| :----------- | :------ | :------------------------------------------- | :------------------------------------ | :--------- | :--------------- |
| LINK → rLINK | Sepolia | 0 <br/> 100 LINK <br/> 1000 LINK             | 120 <br/> 240 <br/> 5,760             | 0 LINK     | 2,5000 LINK      |
| DAI → rDAI   | Sepolia | 0 <br/> 10,000 DAI <br/> 100,000 DAI         | 120 <br/> 240 <br/> 5,760             | 10 DAI     | 2,500,000 DAI    |
| USDT → rUSDT | Sepolia | 0 <br/> 1,000,000 USDT <br/> 10,000,000 USDT | 120 <br/> <br/> 240 <br/> <br/> 5,760 | 1000 USDT  | 250,000,000 USDT |
| USDC → rUSDC | Sepolia | 0 <br/> 1,000,000 USDC <br/> 10,000,000 USDC | 120 <br/> <br/> 240 <br/> <br/> 5,760 | 1000 USDC  | 250,000,000 USDC |

## Tokens transferidos desde Ethereum, y después de 24 horas no han recibido tokens en Rootstock

**Red:** ETH a Rootstock

**Cuándo:** Bloque Actual - Número de Bloque de Transacción < 5760

**Respuesta:** 24 horas es una aproximación, no es fija. Espere hasta que 5760 bloques hayan pasado desde el número de bloque de transacción, más 5 minutos.

## Tokens transferidos desde Ethereum, y después de 24 horas no han recibido tokens en Rootstock

**Red:** ETH a Rootstock

**Cuándo:** Bloque Actual - Número de Bloque de Transacción > 5760

**Answer:**  Look in the [Rootstock Explorer](https://explorer.rootstock.io/) at the SAME ADDRESS on Rootstock. If you do not see the correct balance in the tokens tab, please share your Transaction Hash in the **#token-bridge** channel on Rootstock Discord, visit the [Discord Community](https://rootstock.io/discord) to join.

## Tokens transferidos de Rootstock, y después de 24 horas no han recibido tokens en Ethereum

**Red:** Rootstock para ETH

**Cuándo:** Bloque Actual - Número de Bloque de Transacción < 2880

**Respuesta:** 24 horas es una aproximación, no es fija. Espere hasta que 5760 bloques hayan pasado desde el número de bloque de transacción, más 5 minutos.

## Tokens transferidos de Rootstock, y después de 24 horas no han recibido tokens en Ethereum

**Red:** Rootstock para ETH

**Cuándo:** Bloque Actual - Número de Bloque de Transacción > 2880

**Answer:**  Look in [Etherscan](https://etherscan.io/) at the SAME ADDRESS on Rootstock. If you do not see the correct balance in the tokens tab, please share your Transaction Hash in the **#token-bridge** channel on Rootstock Discord, visit the [ Discord Community](https://rootstock.io/discord) to join.

## Tokens transferidos de Ethereum a Rootstock, pero no los ven en mi cartera

**Red:** ETH a Rootstock

**Cuándo:** siempre

**Answer:**  Rootstock has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Software wallets respects this convention. Copy your mnemonic or private key and use Metamask and add Rootstock as custom network, to get the same address as ethereum.

## Tokens transferidos de Rootstock a Ethereum, pero no los ven en mi cartera

**Red:** Rootstock para ETH

**Cuándo:** siempre

**Respuesta:** Rootstock tiene una ruta de derivación diferente (m/44’/137’/0’/0) de Ethereum (m/44’/60’/0’/0). Copie su clave mnemónica o privada y utilice MyEtherwallet o My Crypto con la ruta de derivación de Rootstock m/44’/137’/0’/0 para obtener la misma dirección que Rootstock.

## ¿Por qué tarda 24 horas? ¿Puede ser más rápido?

**Red:** Ambas

**Cuándo:** siempre

**Respuesta:** Esto es para medidas de seguridad. 24 horas es aproximación, no es exacta. Estamos trabajando para reducir este tiempo en la próxima versión.

## ¿Por qué no puedo elegir la dirección?

**Answer:** The current version of the token bridge allows for choosing the delivery address on the [Token Bridge UI](https://dapp.tokenbridge.rootstock.io/).

## Metamask lanzó un error

**Network:** ETH

**Cuándo:** siempre

**Respuesta:** Esto suele ser un tiempo de espera ya que la transacción no fue minada en el tiempo esperado por Metamask. Esto no significa que la transacción no haya sido minada. Por favor comparte tu Hash de Transacciones en el canal **#token-bridge** en Rootstock Discord (ve a [Comunidad de Discord](https://rootstock.io/discord) para unirte).

## No veo mi transacción en la lista de token Bridge

**Answer:** In the current Token Bridge version, transaction lists are fetched directly from an API. If a transaction is missing from the list, it's likely due to a synchronization issue on our end.. If this is not the reason why it is not there please let us know in the #token-bridge channel on Rootstock Discord (go to Discord Community to join). If this is not the reason why it is not there please let us know in the `#token-bridge` channel on Rootstock Discord (go to [Discord Community](https://rootstock.io/discord) to join).

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
