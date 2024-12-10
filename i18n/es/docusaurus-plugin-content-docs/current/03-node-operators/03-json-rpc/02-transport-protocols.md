---
title: Protocoles de transporte
sidebar_label: Protocolo de transporte
sidebar_position: 200
tags:
  - rsk
  - rskj
  - nodo
  - rpc
  - rootstock
description: Los métodos JSON-RPC soportados por nodos Rootstock.
---

Los siguientes protocolos de transporte están disponibles en Rootstock:

- [HTTP Transport Protocol](#http-transport-protocol)
- [Protocolo de transporte de Websockets (#websockets-transport-protocol)

## Protocolo de transporte HTTP

Las peticiones HTTP deben hacerse:

- al número de puerto especificado en la configuración de `rpc.providers.web.http.port`
  - esto es `4444` por defecto
  - para [nodos públicos](/node-operators/public-nodes/), omite el número de puerto
- a la ruta "root" (`/`)
- usando el verbo HTTP `POST`
- especificando un encabezado `Content-Type` de `application/json`
- con un cuerpo de solicitud especificado como JSON en cadena

Por ejemplo, un comando `curl` a un nodo Rootstock `localhost`
se vería similar a esto:

```shell
curl http://localhost:4444/ \ \ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"RPC_METHOD_NAME","params":[RPC_REQUEST_PARAMETERS],"id":1}'
```

## Protocolo de transporte de WebSockets

Las conexiones WebSockets deben establecerse:

- al número de puerto especificado en la configuración de `rpc.providers.web.ws.port`
  - esto es `4445` por defecto
  - [nodos públicos](/node-operators/public-nodes/) **no** tienen activado el protocolo de transporte de WebSockets
- a la ruta de WebSockets (`/websocket`)

Una vez conectado:

- Enviar un cuerpo de solicitud especificado como JSON en cadena
- Ningún "verbo" o "cabeceras" son necesarios, ya que estos son específicos del protocolo de transporte HTTP

Por ejemplo, un comando `wscat` para conectarse a un nodo Rootstock `localhost`
se vería similar a esto:

```shell
wscat -c ws://localhost:4445/websocket
```

Después de que la conexión haya sido establecida usando `wscat`,
puede enviar múltiples solicitudes RPC dentro de la misma sesión.
(Nota que `> ` marca las solicitudes para ser entradas,
y que `< ` marca las respuestas que se imprimirán.)

```json
    {"jsonrpc":"2.0","method":"RPC_METHOD_NAME","params":[RPC_REQUEST_PARAMETERS],"id":1}
    {"jsonrpc":"2.0","id":1,"result":"RPC_RESPONSE"}
    {"jsonrpc":"2.0","method":"RPC_METHOD_NAME","params":[RPC_REQUEST_PARAMETERS],"id":2}
    {"jsonrpc":"2.0","id":2,"result":"RPC_RESPONSE"}
```
