---
sidebar_label: Registro de interfaces
sidebar_position: 300
title: Registro universal de interfaces de contratos inteligentes
description: Consulte la interfaz estándar ERC1820, el soporte de direcciones y la implementación de contratos inteligentes.
tags:
  - contratos inteligentes
  - rsk
  - portainjertos
  - desarrolladores
  - registro de interfaces
---

El estándar ERC1820 define un contrato inteligente de registro universal en el que cualquier dirección (contrato o cuenta normal) puede registrar qué interfaz admite y qué contrato inteligente es responsable de su implementación.

## Descripción

Este estándar define un registro donde los contratos inteligentes y las cuentas regulares pueden publicar qué funcionalidad implementan, ya sea directamente o a través de un contrato proxy.

Cualquiera puede consultar este registro para saber si una dirección específica implementa una interfaz determinada y qué contrato inteligente se encarga de su implementación.

Este registro puede desplegarse en cualquier cadena y comparte la misma dirección en todas las cadenas.

Las interfaces con ceros (0) como últimos 28 bytes se consideran interfaces ERC165, y este registro REENVIARÁ la llamada al contrato para comprobar si implementa la interfaz.

Este contrato también actúa como caché del ERC165 para reducir el consumo de gas.

## Motivación

[EIP1820](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1820.md)
permite a los contratos registrar la interfaz y consultar el registro, evitando errores de comunicación que pueden dar lugar a la pérdida de fondos.

Por ejemplo, con un contrato inteligente ERC20, un error puede provocar la quema de tokens.
Aunque el estándar de tokens ERC20 está bien documentado y bien implementado en general, contiene un error. Este fallo ha provocado pérdidas de tokens por valor de millones de dólares estadounidenses. Con la función `transfer`, sólo puedes enviar tokens a una cuenta externa. Si utilizas la función `transfer` para enviar tokens a un contrato inteligente (que no es una cuenta externa), verás una transacción exitosa, pero el contrato nunca recibirá los tokens. Esto destruye los tokens para siempre, ya que no se pueden recuperar. Al utilizar la función incorrecta, ¡varios usuarios han perdido sus tokens para siempre!

El estándar de token ERC777 resuelve este problema utilizando el registro de interfaz EIP1820, y es compatible con el estándar de token ECR20.

Con el fin de permitir implementaciones basadas en el estándar de tokens ERC777,
así como cualquier otro contrato inteligente que se beneficie del uso de
un registro de interfaz de contrato inteligente universal,
Rootstock ha desplegado una implementación del registro EIP1820 tanto en su
[Mainnet](https://explorer.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24),
y [Testnet](https://explorer.testnet.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24).

## Enlaces e información

Original:

- [EIP1820](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1820.md)
- Comparación entre [ERC777 y ERC20](https://hackernoon.com/erc777-is-the-new-token-standard-replacing-the-erc20-fd6319c3b13)
- Comparación de [ERC777 y ERC223 con ERC20](https://101blockchains.com/erc20-vs-erc223-vs-erc777/)

Portainjerto:

- [Contrato inteligente EIP1820 desplegado en la red principal Rootstock](https://explorer.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24)
- [Rootstock Testnet desplegado EIP1820 smartcontract](https://explorer.testnet.rootstock.io/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24)
- Propuesta de mejora de portainjertos correspondiente: [RSKIP148](https://github.com/rsksmart/RSKIPs/blob/e0ac990679a2e6f476e41db0c1050132cd2b1bfc/IPs/RSKIP148.md)
