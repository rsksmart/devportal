---
sidebar_label: Versiones
sidebar_position: 900
title: Versiones del relé RIF
tags:
  - rif
  - sobre
  - relé rif
  - guía de integración
description: Versiones del relé RIF
---

La primera iteración de RIF Relay se basó en el gran trabajo realizado por el [equipo de la Red de Gasolineras](https://www.opengsn.org/).

## Versión 0.1

RIF Relay V0.1 comenzó como una bifurcación de GSN con dos objetivos en mente:

- Ser compatible con los contratos inteligentes existentes y futuros sin necesidad de adaptar dichos contratos para que funcionen con RIF Relay.
- Sea lo más rentable posible.

## Versión 0.2

### Visión general

RIF Relay V0.2 es un rediseño de GSN. Reduce los costes de gas y simplifica la interacción entre los distintos contratos que forman parte del sistema. Esto se consigue mediante:

- Despliegue seguro de proxies Smart Wallet contrafactuales para cada cuenta de usuario: esto elimina la necesidad de depender de las funciones `_msgSender()` y `_msgData()`, haciendo que los contratos existentes y futuros sean compatibles con RIF Relay sin ninguna modificación.
- Permitir a los repetidores recibir fichas en una dirección de trabajador bajo su control y decidir qué hacer con los fondos posteriormente.
- Reducción de los costes de gas mediante la optimización de la arquitectura GSN.

Nuestro principal objetivo es proporcionar al ecosistema de Rootstock (RSK) los medios para permitir que las aplicaciones de blockchain y los usuarios finales (wallet-apps) paguen las tasas de transacción utilizando tokens (por ejemplo, tokens RIF), y así eliminar la necesidad de adquirir RBTC por adelantado.

Es importante recordar que, como medida de seguridad, los contratos de la V0.1 desplegados en Mainnet tienen límites en las cantidades apostadas para operar; estos límites se eliminaron en la V0.2.

### Detalles

- El contrato RelayHub ya no recibe pagos, el pago por el servicio (en tokens) se envía ahora directamente al trabajador que retransmite la transacción en nombre del usuario.
- El contrato RelayHub gestiona ahora el replanteo del gestor de relés.
- Mejoras en la estimación del gas:
  - Se ha eliminado la sobrecarga de gas de RelayHub; ya no hay validaciones contra valores codificados.
  - Los campos de gas y gas simbólico de la solicitud pueden dejarse ahora sin definir y, en ese caso, serán estimados automáticamente por el cliente de retransmisión RIF.
  - La estimación del gas máximo en el servidor de retransmisión RIF es ahora más precisa.
  - Se dispone de una nueva función de utilidad para estimar el gas máximo que consumiría una transacción de retransmisión, basada en una estimación de ajuste lineal. Esto puede utilizarse en aplicaciones que no quieren firmar una carga útil cada vez que necesitan una aproximación del coste de retransmitir la transacción.
- Las verificaciones de los pagadores se realizan fuera de la cadena para optimizar los costes de gas, por lo que los pagadores se llaman ahora Verificadores y no forman parte del flujo de retransmisión en la cadena ni gestionan pagos en absoluto.
- Optimización del coste del gas.
- Problemas de seguridad.

## Versión 1

### Visión general

La inclusión de un mecanismo de reparto de ingresos en el servicio RIF Relay no supone una penalización en el precio para los usuarios de RIF Relay. Modificamos la dirección utilizada para recibir el pago (en tokens) por una retransmisión (o despliegue) de transacción satisfactoria.

En la implementación V0.2, el RelayRequest y el DeployRequest incluyen un atributo relayWorker para identificar qué cuenta pagó el gas. El RIF Relay SmartWallet paga directamente a esta cuenta el número de tokens negociados para el servicio Relay (o Deploy). En la V1 se eliminó el atributo relayWorker de las peticiones RelayRequest y DeployRequest. Se implementó y configuró un nuevo atributo llamado feesReceiver en el RelayServer

Este cambio no alteró el actual flujo de relés, manteniendo su coste como hasta ahora, y también introdujo la flexibilidad necesaria para aplicar cualquier estrategia de reparto de ingresos.

- El feesReceiver puede ser el trabajador o el contrato MultSig.
- La SmartWallet pagará al feesReceiver. El feesReceiver guardará los fondos de cada pago del usuario.
- Tras el pago desde la SmartWallet, el feesReceiver no realizará ninguna lógica de distribución para evitar aumentar el coste del servicio de retransmisión para el usuario.
- Con este planteamiento, no es necesario modificar el flujo de retransmisión, por lo que la introducción de un mecanismo de reparto de ingresos no repercutirá en el precio del servicio de retransmisión.
- Los participantes pertinentes formarán parte del contrato MultiSig.
  - El contrato MultiSig especifica qué parte de los fondos recaudados va a cada participante (por ejemplo, el operador del servidor de retransmisión, el proveedor del monedero y el proveedor de liquidez podrían ser los participantes).
  - Posteriormente, un proceso fuera de la cadena activará el proceso de distribución desde el contrato. Este proceso puede invocar la función de distribución una vez a la semana, al mes o cuando los fondos del contrato superen un determinado umbral.
  - Los participantes pueden modificar los parámetros de reparto (por ejemplo, los porcentajes utilizados para el reparto entre los participantes) si están de acuerdo en los cambios concretos.
  - Pueden existir múltiples estrategias de reparto de ingresos, idealmente una por grupo de participantes.
