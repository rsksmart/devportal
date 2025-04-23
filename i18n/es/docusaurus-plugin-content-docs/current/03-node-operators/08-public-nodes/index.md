---
sidebar_label: Nodos públicos
sidebar_position: 9
title: Uso de nodos públicos Rootstock (Mainnet & Testnet)
tags:
  - rsk
  - redes
  - nodo rskj
  - rpc json
  - red principal
  - testnet
  - cURl
description: Nodos públicos Rootstock (Mainnet, Testnet), Métodos RPC.
---

[RootstockLabs](https://www.rootstocklabs.com/) actualmente proporciona dos nodos públicos que puede usar
para pruebas y encontrará esa información a continuación.

Alternativamente, sigue las [instrucciones de instalación](/node-operators/setup/installation/),
para ejecutar tu propio nodo Rootstock o usar un proveedor alternativo de nodos.
Esto es altamente recomendado para entornos de producción,
y de acuerdo con el máximo de bitcoiners: **No confíes. Verifique.**

:::info[RPC Proveedores de nodos]
The Rootstock public nodes do not expose WebSockets, they are `HTTP` only.
To work around this, you may either [run your own Rootstock node](/node-operators/setup/node-runner/), or use the [Rootstock RPC API](/developers/rpc-api/rootstock/setup/) or use a third-party node provider, such as [Getblock](https://getblock.io/nodes/rsk/), [NowNodes](https://nownodes.io/nodes/rsk), dRPC or Blast API.
:::

## Testnet

```text
https://public-node.testnet.rsk.co
```

## Mainnet

```text
https://public-node.rsk.co
```

## Métodos RPC JSON soportados

Lista de métodos JSON-RPC soportados para cada módulo se puede encontrar en la [documentación JSON-RPC](/node-operators/json-rpc/methods/).

### Usando cURL

Aquí hay una solicitud de ejemplo usando `cURL` para obtener el número de bloque Mainnet:

> `"Tipo de contenido: aplicación/json"`

```bash
curl https://public-node.rsk.co \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```