---
sidebar_label: Direcciones basadas en cuentas
title: Cuentas de portainjertos
sidebar_position: 6
tags:
  - rsk
  - portainjertos
  - arquitectura
  - suma de comprobación
  - ruta de derivación
  - direcciones de los contratos
  - contratos inteligentes
description: EIP-1191 chainId se utiliza en las direcciones Rootstock como suma de comprobación. m/44'/137'/0'/0 es la ruta de derivación utilizada para los monederos compatibles con BIP-44.
---

Las direcciones de Rootstock incorporan un identificador de blockchain opcional (también conocido como `chainId`). Si el `chainId` no está presente, se asume que la dirección se refiere a la red principal de Rootstock.

:::info[Info]
Consulte [direcciones de contrato](/desarrolladores/contratos-inteligentes/direcciones-de-contrato) para ver la lista de direcciones de contrato en Rootstock o [cómo verificar la propiedad de la dirección](/desarrolladores/contratos-inteligentes/verificar-la-propiedad-de-la-dirección/).
:::

## Cómo obtener una dirección

Echa un vistazo a las ya [billeteras integradas](/dev-tools/wallets/) en Rootstock.

## Información sobre la ruta de derivación

Si utiliza un software de monedero
compatible con
[BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki "Jerarquía multicuenta para monederos deterministas"), deberá especificar una ruta de derivación.

```text
Mainnet: m/44'/137'/0'/0/N
Testnet: m/44'/37310'/0'/0/N
```

- El primer nivel de la jerarquía corresponde al _propósito_.
  Siempre es "44", según la especificación BIP44.
- El segundo nivel de la jerarquía corresponde al _tipo de moneda registrada_.
  - Para Rootstock Mainnet, debería ser `137'`, según la especificación
    [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md "Registered coin types for BIP-0044")
    .
  - Para Rootstock Testnet, debe ser `37310'`, según la especificación
    [RSKIP-57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md "Derivation Path for Hierarchical Deterministic Wallets")
    .
- El último nivel de la jerarquía es para _índice_: Las direcciones se numeran a partir del índice 0 de forma secuencialmente creciente. Este número se utiliza como índice hijo en [BIP32 derivation](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#specification-key-derivation "Hierarchical Deterministic Wallets - Key Derivation"). En este nivel se utiliza la derivación pública.

## Suma de comprobación

Rootstock implementa [EIP-1191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1191.md) para proteger a los usuarios de la pérdida de fondos por mezclar direcciones de diferentes redes basadas en Ethereum.

[En este documento](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1191.md), se explica cómo aplicar la suma de comprobación y validar una dirección. Este EIP también es compatible con Web3 y los monederos físicos.

## ChainId

Para evitar un ataque de repetición mediante el uso de una transacción ya firmada, originalmente emitida en la "red A", y posteriormente reproducida en la "red B", las redes basadas en EVM utilizan `chainId` como parte de las propiedades de la transacción.
Todos los `chainId` pueden encontrarse en [chainid.network](https://chainid.network/).

```
Red principal de portainjertos: 30
Rootstock Testnet: 31
```

Para más información, véase [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#user-content-list-of-chain-ids).

Recomendamos encarecidamente lo siguiente:

1. Añada el `chainId` en la integración de Rootstock (y cada vez que integre blockchains basados en EVM)
2. Utilice una cuenta diferente para guardar el valor de cada blockchain (no comparta la misma cuenta entre Rootstock, ETH y otros).
