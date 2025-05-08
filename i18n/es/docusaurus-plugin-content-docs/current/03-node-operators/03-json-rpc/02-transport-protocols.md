---
title: Transport Protocols
sidebar_label: Transport Protocol
sidebar_position: 200
tags:
  - rsk
  - rskj
  - node
  - rpc
  - rootstock
description: The JSON-RPC methods supported by Rootstock nodes.
---

The following transport protocols are available on Rootstock:

- [HTTP Transport Protocol](#http-transport-protocol)
- [Websockets Transport Protocol](#websockets-transport-protocol)

## HTTP transport protocol

HTTP requests should be made:

- to the port number specified in the config for `rpc.providers.web.http.port`
  - this is `4444` by default
  - for [public nodes](/node-operators/public-nodes/), omit the port number
- to the "root" route (`/`)
- using the HTTP verb `POST`
- specifying a `Content-Type` header of `application/json`
- with a request body specified as stringified JSON

For example, a `curl` command to a `localhost` Rootstock node
would look similar to this:

```shell
curl http://localhost:4444/ \ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"RPC_METHOD_NAME","params":[RPC_REQUEST_PARAMETERS],"id":1}'
```

## WebSockets transport protocol

WebSockets connections should be established:

- to the port number specified in the config for `rpc.providers.web.ws.port`
  - this is `4445` by default
  - [public nodes](/node-operators/public-nodes/) do **not** have the WebSockets transport protocol enabled
- to the WebSockets route (`/websocket`)

Once connected:

- Send a request body specified as stringified JSON
- No "verb" or "headers" are necessary, as these are specific to the HTTP transport protocol

For example, a `wscat` command to connect to a `localhost` Rootstock node
would look similar to this:

```shell
wscat -c ws://localhost:4445/websocket
```

After the connection has been established using `wscat`,
you may send multiple RPC requests within the same session.
(Note that `> ` marks requests to be input,
and that `< ` marks responses that will be printed.)

```json
    {"jsonrpc":"2.0","method":"RPC_METHOD_NAME","params":[RPC_REQUEST_PARAMETERS],"id":1}
    {"jsonrpc":"2.0","id":1,"result":"RPC_RESPONSE"}
    {"jsonrpc":"2.0","method":"RPC_METHOD_NAME","params":[RPC_REQUEST_PARAMETERS],"id":2}
    {"jsonrpc":"2.0","id":2,"result":"RPC_RESPONSE"}
```