---
title: Configuración de límites para la interfaz JSON-RPC
sidebar_label: Límites de configuración
sidebar_position: 400
tags:
  - rsk
  - rskj
  - nodo
  - rpc
  - rootstock
description: Los métodos JSON-RPC soportados por nodos Rootstock.
---

A continuación se muestran los límites de configuración para los siguientes métodos JSON-RPC:

> Nota: Estos límites están disponibles en [Fingerroot v5.1.0](https://github.com/rsksmart/rskj/releases/).

## Límites del método JSON-RPC eth_getLogs

La configuración añadida en los archivos de configuración del cliente RSKj permite el control de dos límites relacionados con la llamada JSON-RPC `eth_getLogs`, que se utiliza para recuperar registros de eventos de contratos inteligentes en el blockchain de Rootstock.

### Máximo de bloques a consultar

El `maxBlocksToQuery` se refiere al número máximo de bloques a consultar.

Este parámetro determina el número máximo de bloques que el cliente RSKj consultará en el blockchain cuando ejecute una llamada `eth_getLogs`. Por defecto, este valor está desactivado, lo que significa que si no se especifica ningún valor, el cliente RSKj consultará registros de eventos de todos los bloques especificados en los parámetros de la llamada eth_getLogs. Si un límite es definido y la llamada eth_getLogs excede este límite, la ejecución de la consulta será terminada, y se retornará un código de error.

### Registros máximos a devolver

El `maxLogsToReturn` se refiere al número máximo de registros a regresar.

Este parámetro determina el número máximo de registros de eventos que el cliente RSKj retornará en respuesta a una llamada `eth_getLogs`. De forma predeterminada, este valor está desactivado (i. , en 0), indicando que el cliente RSKj devolverá todos los registros de eventos que coincidan con los criterios de búsqueda. Si el límite está definido y la llamada excede este límite, la ejecución de la consulta terminará devolviendo un código de error.

:::warning\[Warning]

Deshabilitar el límite (`maxLogsToReturn = 0`) podría llevar a la inclusión de un gran número de registros en la respuesta. Sin embargo, permitir el límite ayuda a proteger los recursos del nodo y evita el uso malicioso.

:::

## Límite de interfaz JSON-RPC

El cliente RSKj introduce ahora una nueva opción de configuración para limitar el tamaño máximo de las respuestas devueltas por la interfaz JSON-RPC.

### Tamaño máximo de respuesta JSON-RPC

El `maxResponseSize` se refiere al tamaño máximo de respuesta JSON-RPC.

Este parámetro le permite establecer un límite en el tamaño máximo de las respuestas devueltas por la interfaz JSON-RPC. El tamaño de la respuesta se mide en bytes. Por defecto, este valor está deshabilitado con `maxResponseSize = 0`, lo que significa que no hay límite impuesto al tamaño de las respuestas JSON-RPC.

:::info\[Info]

Cuando `maxResponseSize` está habilitado y establecido en un valor específico, la interfaz JSON-RPC truncará o rechazará las respuestas que excedan el límite de tamaño especificado.

:::

## Uso de configuración

Al añadir estas configuraciones a los archivos de configuración del cliente RSKJ, puede gestionar los límites de acuerdo a sus necesidades y requerimientos específicos. Con la funcionalidad añadida de limitar el tamaño de respuesta JSON-RPC, puede controlar la cantidad de datos devueltos por la interfaz para evitar un consumo excesivo de recursos.

Se recomienda establecer valores razonables para estos límites, teniendo en cuenta la carga de la red y los recursos disponibles para el cliente RSKj.

:::info\[Info]

La configuración puede variar según la versión del cliente RSKj que está utilizando y cómo se integra con otros componentes de su sistema. Consulte siempre la documentación oficial de RSKj y las especificaciones relevantes para obtener detalles más precisos sobre la configuración.

:::