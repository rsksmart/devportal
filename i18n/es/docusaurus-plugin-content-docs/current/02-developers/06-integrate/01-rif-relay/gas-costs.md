---
sidebar_label: Costes del gas
sidebar_position: 950
title: Relé RIF - Gastos de gas
tags:
  - rif
  - sobre
  - relé
  - integrar
description: Costes de gas del relé RIF
---

El coste adicional del gas es la cantidad extra de gas necesaria para procesar la llamada de retransmisión solicitada por el usuario. Llamemos **X** al gas consumido por la llamada al método del contrato de destino, y **Y** al gas total consumido por la llamada de retransmisión, entonces el coste de la llamada de retransmisión (es decir, el coste del gas de sobrecarga) es: **Z = Y - X**.

## Plantillas SmartWallet

RIF Relay V0.1 sólo tiene una [plantilla] SmartWallet (https://github.com/rsksmart/rif-relay/blob/master/contracts/smartwallet/SmartWallet.sol), que se puede utilizar tal cual o inyectarle lógica adicional durante la creación de la instancia SmartWallet.

V0.2 introduce una plantilla más barata ([SmartWallet](https://github.com/rsksmart/rif-relay/blob/master/contracts/smartwallet/SmartWallet.sol)), para ser utilizada cuando no hay necesidad de lógica personalizada extra en las carteras inteligentes. El comportamiento es el mismo que el de la [plantilla] CustomSmartWallet(https://github.com/rsksmart/rif-relay/blob/master/contracts/smartwallet/SmartWallet.sol) de la V0.2, pero sin esta capacidad.

### Coste de gas del despliegue de cada plantilla.

| Versión RIF         | Plantilla SW                      | Gas general medio |
| ------------------- | --------------------------------- | ----------------- |
| 0.1 | SmartWallet                       | 172400            |
| 0.2 | Cartera inteligente personalizada | 98070             |
| 0.2 | SmartWallet                       | 97695             |
| 1                   | CustomSmartWallet                 | TBD               |
| 1                   | SmartWallet                       | TBD               |

:::tip[Note]
La instancia de CustomSmartWallet utilizada no apuntaba a ninguna lógica personalizada adicional.
:::
