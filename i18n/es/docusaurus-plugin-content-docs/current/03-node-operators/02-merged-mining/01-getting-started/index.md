---
sidebar_label: Guía de implementación
title: Guía de implementación
tags:
  - rsk
  - minando
  - bitcoin
  - piscina
description: Cómo fusionar Rootstock usando el software de minería de Bitcoin.
---

Aquí están los pasos necesarios para añadir las capacidades mineras fusionadas de Rootstock (RSK) al software minero de la piscina.

## Qué necesitas hacer

Añade la información de minería combinada de Rootstock en el bloque Bitcoin como un compromiso, los pasos completos son los siguientes:

### 1. Obtener el trabajo del nodo Rootstock

Utilice el método [`mnr_getWork`](/node-operators/json-rpc/methods/) del nodo Rootstock JSON-RPC API. Este método devuelve la información del bloque actual para la minería fusionada, la condición límite a cumplir ("objetivo"), y algunos otros datos.

### 2. Pon la información para la minería combinada en el bloque Bitcoin

#### Formatear

`OP_RETURN` + `Longitud` + `RSKBLOCK:` + `RskBlockInfo`

- `OP_RETURN:` es`0x6a`
- `Length` es `0x29` y representa la longitud de la información incluida después del opcode `OP_RETURN`
- `RSKBLOCK:` es la cadena ASCII para `0x52534b424c4f434b3a`
- `RskBlockInfo` es la información del bloque en formato binario.

Por ejemplo, si `RskBlockInfo` es `e5aad3b6b9dc71a3eb98a069bd29ca32211aee8b03fd462f4ffbbe97cc75a174`
la información minera fusionada es `6a2952534b424c4f434b3ae5aad3b6b9dc71a3eb98a069bd29ca32211aee8b03fd462f4ffbbe97cc75a174`

#### Posición

Incluye como la última salida de la transacción Bitcoin coinbase.

#### Restricciones

- El número de bytes inmediatamente después de `RskBlockInfo`, hasta el final de la transacción de coinbase debe ser menor o igual a 128 bytes.
- Los bytes crudos finales no deben contener la cadena binaria `RSKBLOCK:`
- La probabilidad de que la etiqueta `RSK` aparezca por casualidad es negligible, pero los servidores de pool no deben descartar la posibilidad de que una dirección de Bitcoin pícaro incluida en la transacción de coinbase tenga este patrón, y siendo usado como ataque para romper la validez de la cabecera minera fusionada.
- La etiqueta `RSKBLOCK:` puede aparecer por casualidad o maliciosamente en el campo de datos `ExtraNonce2` proporcionado por los mineros como parte del protocolo. Esto no es un problema mientras el servidor poolserver agregue la etiqueta `RSKBLOCK:` después del fragmento `ExtraNonce2`.

### 3. Notificar a los mineros a un ritmo más rápido

El tiempo promedio de bloque de Rootstock es de 30 segundos, lo que es más rápido que los 10 minutos de Bitcoin. Este hecho activa los siguientes cambios de implementación:

- Recuperar trabajo desde el nodo Rootstock cada **2 segundos**, para que siempre esté minando en el último trabajo Rootstock.
- Enviado a los mineros un mensaje `mining.notify`, desde el protocolo estratum, cada vez que se recibe el nuevo trabajo de Rootstock.

### 4. Mina hasta que el trabajo sea suficiente para cumplir con el objetivo recibido en la información de trabajo

### 5. Enviar solución al nodo Rootstock

Utilice el método [`mnr_submitBitcoinBlockPartialMerkle`](/node-operators/json-rpc/methods) del API JSON-RPC de Rootstock. Ese método tiene un rendimiento óptimo, y es preferido entre otros métodos disponibles.
Otros métodos de envío e información sobre los pros y los contras entre ellos se pueden encontrar en la [documentación de API de la Minería JSON-RPC](/node-operators/json-rpc).

## Influencia en Bitcoin

Como resultado de la implementación de Rootstock de la minería fusionada, la red Bitcoin no se llena con información minera fusionada. Sólo se almacena una cantidad mínima de información: Una salida extra en la transacción de la base de monedas.

Además, no se requieren cambios en el nodo Bitcoin para apoyar la minería combinada con Rootstock.
