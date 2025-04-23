---
sidebar_label: Límite de tasa de transacción
sidebar_position: 700
title: Límite de tasa de transacción
description: Límite de tasa de transacción en la red Rootstock. Las características, su importancia, cómo usarlas y configurarlas.
tags:
  - operadores de nodos
  - rocksdb
  - nodo
  - rskj
  - tasa
  - límite
---

Echemos un vistazo a lo que es un limitador de tasas, la importancia de usar un limitador de tasas, sus características, y cómo configurar el limitador de velocidad en nodos RSKj usando claves de configuración.

> También conocido como: Limitador de gas virtual

## ¿Qué es un límite de tasas?

El Rate-Limiter disuade a las cuentas de emitir transacciones problemáticas, evitando que dichas transacciones se añadan a la reserva de transacciones y se transmiten a otros pares. Está diseñado para no afectar al uso normal, sino para limitar las transacciones intensivas en recursos que agotan la capacidad de la red. Una cuenta puede realizar cualquier transacción, incluso las transacciones más caras (128KB de tamaño) después de unos 32 minutos de inactividad.

Ahora RSKj evita estos ataques, esto lo hace posible el Rate-Limiter, impidiendo que las cuentas de las fuentes transmitan transacciones que consumen grandes cantidades de recursos. Cuanto más alto sea el límite de gas, más se limitará la cuenta de fuente. El límite de tasa también tiene en cuenta factores adicionales como:

- tamaño
- precio del gas comparado con el promedio
- nonce comparado con el esperado
- valor de nonce
- porcentaje del precio del gas

El Rate-Limiter lo hace otorgando una Cuota Virtual de Gas que se consumirá cada vez que se reciba una transacción. Esto le permite reponer lentamente, mientras que la cuenta está inactiva.

Si ha interactuado con los nodos públicos de Rootstock, puede que ya haya encontrado una limitación de tasa en acción. Tenga en cuenta que los límites de velocidad en los nodos públicos se implementan usando un servicio de terceros, y no dentro del propio nodo RSKj. Otra diferencia notable es que los límites de las tarifas están basados en la dirección IP; y no en la cuenta.

## Cómo funciona

La función funciona de la siguiente forma:

1. El nodo recibe una transacción
2. El Rate-Limiter calcula el gas virtual consumido por la transacción teniendo en cuenta varios factores de transacción, como se explicó anteriormente
3. El Rate-Limiter actualiza la cuota de gas virtual del remitente teniendo en cuenta el tiempo transcurrido desde su última transacción (hasta un máximo) o establece un valor predefinido si esta es su primera transacción
4. El Rate-Limiter compara los valores consumidos y de cuotas y entonces:
 1. si cuota >= consumida:
  1. el valor consumido será restado de la cuota del remitente
  2. la transacción se añadirá al pool
  3. la transacción se retransmitirá a los pares
 2. si cuota < consumida:
  1. la transacción será rechazada y no será añadida al pool
  2. la transacción no se retransmitirá a los pares

La implementación del algoritmo de limitación de tasa se puede encontrar en RSKj. Vea [TxQuotaChecker](https://github.com/rsksmart/rskj/blob/10fcc4f/rskj-core/src/main/java/co/rsk/net/handler/quota/TxQuotaChecker.java) para la implementación.

## ¿Por qué usar el limitador de tasas?

El limitador de velocidad está destinado a prevenir dos variantes del ataque de Denegación de Servicio de Red (DoS) contra redes Rootstock:

- Atacar sólo a la CPU: Esto sucede cuando los nodos se ven obligados a consumir un alto porcentaje de CPU en la verificación de firmas, evitando que las transacciones normales sean verificadas y reenviadas a tiempo.
- Ataque de CPU + ancho de banda: Además de la anterior, la red se congestiona con transacciones reincidentes. Además, la CPU está sobrecargada mientras se comprimen, se descomprimen y se hacen hashing. Esto evita que las transacciones normales sean transmitidas.

Ambas variantes afectan las redes congestionadas más que las cadenas de bloques vacías. Todas las variantes son muy prácticas en redes con tarifas de gas baratas, pero pueden ser poco prácticas en redes con tarifas caras.

Esta característica tiene algunas consecuencias inherentes:

1. Accounts gain trust over time.\
 When an account sends multiple transactions, and these do not go over the allowed limits, the RSKj node implementation remembers it as being more trustworthy for future transactions.
2. Accounts replenish virtual gas over time.\
 When an account does not send any transactions for a period of time, it gains the ability to send more frequent and larger future transactions.

## Cómo configurar el limitador de velocidad

La característica puede configurarse en nodos RSKj mediante las siguientes claves de configuración:

Abra el archivo de configuración. Vea [el archivo de configuración esperado](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/resources/expected.conf) para más información. Añada las siguientes claves al archivo de configuración.

`transaction.accountTxRateLimit.enabled:<boolean>`

- Esto habilita o desactiva la función de limitación de velocidad.
- El valor por defecto es `true`.
- Nota: Deshabilitar esta característica está muy desaconsejado.

`transaction.accountTxRateLimit.cleanerPeriod:<int>`

- Esto establece con qué frecuencia, en minutos, limpiar la recogida de las cuotas, con la cuota máxima concedida.
- La colección se implementa con un tamaño máximo y automáticamente descartará las entradas menos relevantes a favor de las más relevantes.
- El valor predeterminado es `30` minutos.
- Nota: A menos que el host tenga restricciones de memoria pesada, mantenga el valor predeterminado.
