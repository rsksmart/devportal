---
title: Acceso y uso de fondos que no están en cuentas derivadas con Rootstock (RSK) dpath en Trezor T
sidebar_label: Con Trezor T
tags:
  - rsk
  - rbtc
  - conversión
  - peg
  - 2 vías
  - clavija
  - peg-out
  - federación
  - trezor
  - dpath
description: Cómo configurar un monedero hardware Trezor T para derivar con un dpath personalizado.
sidebar_position: 306
---

Cómo resolver el problema de mover sus fondos cuando están en una cuenta que necesita
ser derivada con una ruta de derivación personalizada (dpath) utilizando Trezor T.

## Contexto

Si has hecho una [conversión de BTC a RBTC](/concepts/rbtc/conversion-with-ledger#btc-to-rbtc-conversion) usando Trezor T, necesitas acceder a tu cuenta usando un dpath personalizado (`44'/0'/0'/0/0` para Mainnet). Con las últimas versiones de firmware, Trezor T está comprobando que la dpath coincide con la esperada como una característica de seguridad y esto es un bloqueador cuando se tiene la intención de utilizar una dpath diferente.
También es posible que desee acceder a su cuenta con un dpath diferente si ha cometido un error; por ejemplo, recibir RBTC en una dirección derivada utilizando el dpath de Ethereum en lugar del dpath de Rootstock.

En MyCrypto o MyEtherWallet puede haber recibido este mensaje: `"Ruta de clave prohibida"`.

## Solución

Para permitir rutas de derivación personalizadas, deberá desactivar las comprobaciones de seguridad (véase [mensaje de Pavol Rusnak](https://github.com/trezor/trezor-firmware/issues/1255#issuecomment-691463540)).

Para ello, debe instalar [python-trezor](https://github.com/trezor/python-trezor):

```shell
pip3 install --upgrade setuptools
pip3 install trezor
```

Una vez que esté listo, ejecute este comando:

```shell
trezorctl set safety-checks prompt
```

(necesitas tener tu Trezor T desbloqueado y aceptar la configuración en el dispositivo)

Después de mover tus fondos, puedes volver a activarlos:

```shell
trezorctl set safety-checks strict
```
