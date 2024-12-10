---
sidebar_label: Referencia
sidebar_position: 300
title: Rootstock Node Configuration Reference
tags:
  - rsk
  - rskj
  - nodo
  - configuración
  - rpc api
  - operadores de nodos
  - rootstock
description: Configuration reference for RSKj
render_features: tables-with-borders
---

See [CLI flags](/node-operators/setup/configuration/cli/) for command line flag options.

:::info[Important Aviso]
From [RSKj HOP v4.2.0](https://github.com/rsksmart/rskj/releases/), RocksDB is no longer experimental. See guide on [using RocksDB](/node-operators/merged-mining/configure-mining#using-rocksdb)
:::

## Configuración avanzada

For advanced configuration requirements, please refer to this
[expected configuration file](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/resources/expected.conf).
This contains all possible configuration fields parsed by RSKj.

The default values for the config file are defined in this
[reference config file](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/resources/reference.conf);
and are "inherited" and varied based on the
[selected network](https://github.com/rsksmart/rskj/tree/master/rskj-core/src/main/resources/config).

## Guia

The following detail the most commonly used configuration fields parsed by RSKj.

- [`peer`](#peer)
- [`database`](#database)
- [`database.import`](#databaseimport)
- [`vm`](#vm)
- [`sync`](#sync)
- [`rpc`](#rpc)
- [`wallet`](#wallet)
- [`scoring`](#scoring)
- [`miner`](#miner)
- [`blockchain.config.name`](#blockchainconfigname)
- [`bind_address`](#bind_address)
- [`public.ip`](#publicip)
- [`genesis`](#genesis)
- [`transaction.outdated`](#transactionoutdated)
- [`transaction.gasPriceCalculatorType`](#transactiongaspricecalculatortype)
- [`play.vm`](#playvm)
- [`hello.phrase`](#hellophrase)
- [`details.inmemory.storage.limit`](#detailsinmemorystoragelimit)
- [`solc.path`](#solcpath)

## par

Describes how your node peers with other nodes.

- `peer.discovery.enabled = [true/false]`
  enables the possibility of being discovered by new peers.
- `peer.discovery.ip.list = []`
  is a list of the peers to start the discovering.
  These peers must have the `discovery.enabled` option set to true.
  These are the list of some of RSK bootstrap nodes:

  |         | `ip.list`                                                                                                                                                                                                                                                                                                                                                                                                                         |
  | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Regtest | No aplicable                                                                                                                                                                                                                                                                                                                                                                                                                      |
  | Testnet | `"bootstrap02.testnet.rsk.co:50505","bootstrap03.testnet.rsk.co:50505","bootstrap04.testnet.rsk.co:50505","bootstrap05.testnet.rsk.co:50505"`                                                                                                                                                                                                                                                                                     |
  | Mainnet | `"bootstrap01.rsk.co:5050","bootstrap02.rsk.co:5050","bootstrap03.rsk.co:5050","bootstrap04.rsk.co:5050","bootstrap05.rsk.co:5050","bootstrap06.rsk.co:5050","bootstrap07.rsk.co:5050","bootstrap08.rsk.co:5050","bootstrap09.rsk.co:5050","bootstrap10.rsk.co:5050","bootstrap11.rsk.co:5050","bootstrap12.rsk.co:5050","bootstrap13.rsk.co:5050","bootstrap14.rsk.co:5050","bootstrap15.rsk.co:5050","bootstrap16.rsk.co:5050"` |
- `peer.active = []`
  is used to connect to specific nodes.
  It can be empty.
- `peer.trusted = []`
  is a list of peers whose incoming connections are always accepted from.
  It can be empty.
- `peer.port` is the port used to listen to incoming connections.
  Default port by each RSK network:

  |         | `peer.port` |
  | ------- | ----------- |
  | Regtest | 30305       |
  | Testnet | 50505       |
  | Mainnet | 5050        |
- `peer.connection.timeout = number (seconds)`
  especifica _en segundos_ el tiempo de espera para intentar conectarse a un peer.
  Valor sugerido: `2`.
- `channel.read.timeout = number (seconds)`
  especifica _en segundos_ cuánto tiempo esperará a que llegue un mensaje antes de cerrar el canal.
  Valor sugerido: `30`.

* `peer.privateKey = hash`
  es una clave privada generada de forma segura y única para tu nodo que **debe** estar configurada.

- `peer.networkId = int`
  es el número de la red a la que conectarse.
  Es importante mantener estos números.
  Identifica la red a la que se va a conectar.
  Para una red privada Regtest, siempre debe utilizar el mismo
  (no necesariamente 34567).
  IDs de redes RSK:

  |         | `peer.networkId` |
  | ------- | ---------------- |
  | Regtest | 34567            |
  | Testnet | 779              |
  | Mainnet | 775              |
- peer.maxActivePeers = int`  es el número máximo de peers activos que mantendrá tu nodo.
    Valor sugerido:`30\`.
- `peer.p2p.eip8 = bool`
  obliga al peer a enviar el mensaje handshake en el formato definido por
  [EIP-8](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8.md).

## base de datos

Describe dónde se guarda la base de datos del blockchain.

- `database.dir = path`
  es el lugar donde se guardan los archivos de almacenamiento físico.
- `database.reset = [true/false]`
  reinicia la base de datos cuando se inicia la aplicación cuando se establece en _true_.

## database.import

Opciones relacionadas con la sincronización experimental de importaciones v0.1.

- `database.import.url = URL`
  es la URL del bucket de S3 que aloja la base de datos.
- `database.import.trusted-keys = []`
  lista de claves públicas de confianza para validar fuente legítima.
- `database.import.enabled = [true/false]`
  habilita la sincronización de importación.

## keyvalue.datasource (experimental)

Selecciona la base de datos que se utilizará para almacenar la información.
Las opciones posibles son:

- `leveldb`
- `rocksdb` (default)

Si desea cambiar entre las distintas opciones de almacenamiento,
por ejemplo de `leveldb` a `rocksdb` o viceversa,
deberá **reiniciar** el nodo con la opción de importación cada vez que lo haga.

## vm

Enabling the `vm.structured` will log all the calls to the VM in the local database.
This includes all the contract executions (opcodes).
When testing, using this module is the only way to see exceptions.

- `trace = [true/false]`
  enables the `vm.structured`.
- `dir = foldername`
  the directory where calls are saved.
- `compressed = [true/false]`
  compress data when enabled.
- `initStorageLimit = int`
  the storage limit.

Un ejemplo:

```
vm.structured {
    trace = false
    dir = vmtrace
    compressed = true
    initStorageLimit = 10000
}
```

## sincronizar

Opciones relacionadas con la sincronización del blockchain:

- `sync.enabled = [true/false]`
  activa la sincronización del blockchain.
  Debe establecerse en `true` para mantener el nodo actualizado.
- `sync.max.hashes.ask = int`
  determines the max amount of blocks to sync in a same batch.
  The synchronization is done in batches of blocks.
  Suggested value: `10000`.
- `sync.peer.count = int`
  minimum peers count used in syncing.
  Sync may use more peers than this value but always trying to get at least this number from discovery.
  However, it will continue syncing if it's not reached.
- `sync.timeoutWaitingPeers = int (seconds)`
  timeout to start to wait for syncing requests.
- `sync.timeoutWaitingRequests = int (seconds)`
  expiration time in minutes for peer status.
- `sync.maxSkeletonChunks = int`
  maximum amount of chunks included in a skeleton message.
- `sync.chunkSize = int`
  amount of blocks contained in a chunk,
  **must be** 192 or a divisor of 192:
  - 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 192

Un ejemplo:

```
sync {
    enabled = true
    max.hashes.ask = 10000
    peer.count = 10
    expectedPeers = 5
    timeoutWaitingPeers = 1
    timeoutWaitingRequest = 30
    expirationTimePeerStatus = 10
    maxSkeletonChunks = 20
    chunkSize = 192
}
```

## rpc

Describes the configuration for the RPC protocol.

- `rpc.providers = []`
  lists the different providers (up to this moment, just `web`).
  `rpc.providers.web` has a global setting for every web provider,
  `cors`.
  - `rpc.providers.web.cors = domain`
    restricts the RPC calls from other domains.
    Default value is `localhost`.
- `rpc.providers.web` options:
  - `rpc.providers.web.http`
    defines HTTP configuration:
    - `rpc.providers.web.http.enabled = [true/false]`
      enables this web provider. Default value is `true`.
    - `rpc.providers.web.http.port = port`
      is the HTTP-RPC server listening port.
      By default RSK uses `4444`.
    - `rpc.providers.web.http.bind_address = address`
      is the HTTP-RPC server listening interface.
      By default RSK uses `localhost`.
    - `rpc.providers.web.http.hosts = []`
      is the list of node's domain names or IPs.
      Check [restrictions on valid host names](https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names).
    - **NOTE**: For details on how to connect over HTTP,
      see [HTTP Transport Protocol](/node-operators/json-rpc/transport-protocols#http-transport-protocol "Rootstock JSON-RPC - HTTP").
  - `rpc.providers.web.ws`
    defines WebSocket configuration:
    - `rpc.providers.web.ws.enabled = [true/false]`
      enables this web provider.
      Default value is `true`.
    - `rpc.providers.web.ws.port = port`
      is the WS-RPC server listening port.
      By default RSK uses `4445`.
    - `rpc.providers.web.ws.bind_address = address`
      is the WS-RPC server listening interface.
      By default RSK uses `localhost`.
    - **NOTE**: For details on how to connect over WebSockets,
      see [Websockets Transport Protocol](/node-operators/json-rpc/transport-protocols#websockets-transport-protocol "Rootstock JSON-RPC - WebSockets").
- `rpc.modules` lists of different RPC modules.
  If a module is not in the list and enabled,
  its RPC calls are discarded.

Ejemplos:

```json
modules = [
    { name: "eth", version: "1.0", enabled: "true" },
    { name: "net", version: "1.0", enabled: "true" },
    { name: "rpc", version: "1.0", enabled: "true" },
    { name: "web3", version: "1.0", enabled: "true" },
    { name: "evm", version: "1.0", enabled: "true" },
    { name: "sco", version: "1.0", enabled: "true" },
    { name: "txpool", version: "1.0", enabled: "true" },
    { name: "personal", version: "1.0", enabled: "true" }
]
```

It is possible to enable/ disable particular methods in a module.

```shell
{
    name: "evm",
    version: "1.0",
    enabled: "true",
    methods: {
        enabled: ["evm_snapshot", "evm_revert"],
        disabled: [ "evm_reset", "evm_increaseTime"]
    }
}
```

To use the [RPC miner module](/node-operators/json-rpc/methods/)
you must include:

```
{ name: "mnr", version: "1.0", enabled: "true" }
```

> Important Info:

- RPC methods for each module can be found in the [JSON-RPC documentation](/node-operators/json-rpc/).
- See the [JSON-RPC Configurable limits](/node-operators/json-rpc/configuration-limits/)

## wallet

You can store your accounts on the node to use them to sign transactions. However, it is **not secure** to use a wallet in a public node.

```shell
wallet {
    enabled = true
    accounts = [
        {
            "publicKey" : "<PUBLIC_KEY>"
            "privateKey" : "<PRIVATE_KEY>"
        }
    ]
}
```

## puntuación

Scoring is the way the node 'punishes' other nodes when bad responses are sent. Punishment can be done by node ID or address.

- `scoring.nodes.number = int`
  number of nodes to keep scoring.
- `scoring.nodes.duration` and `scoring.addresses.duration`
  initial punishment duration (in minutes).
  Default is `10`.
- `scoring.nodes.increment` and `scoring.addresses.increment`
  punishment duration increment (in percentage).
  Default is `10`.
- `scoring.nodes.maximum`
  maximum punishment duration (in minutes).
  Default is `0`.
- `scoring.addresses.maximum`
  maximum punishment duration (in minutes).
  Default is `1 week`.

Un ejemplo:

```shell
scoring {
    nodes {
        number: 100
        duration: 12
        increment: 10
        maximum: 0
    }
    addresses {
        duration: 12
        increment: 10
        maximum: 6000
    }
}
```

## miner

Check out [Configure RSKj node for mining](/node-operators/merged-mining/configure-mining)
for detailed information about the `miner` configuration.

## blockchain.config.name

A string that describe the name of the configuration.
We use:

|         | `blockchain.config.name` |
| ------- | ------------------------ |
| Regtest | regtest                  |
| Testnet | testnet                  |
| Mainnet | main                     |

## bind_address

The network interface with _wire protocol_ and _peer discovery_.

This is the last resort for public IP address when it cannot be obtained by other ways.

## public.ip

The node's public IP address.

If it is not configured, defaults to the IPv4 returned
by `http://checkip.amazonaws.com`.

## genesis

It is the path to the genesis file.
The folder _resources/genesis_ contains several versions of genesis
configuration according to the network the peer will run on. Either one of these,
or an absolute path to a file within the filesystem may be used.

|         | `genesis`                                                                    |
| ------- | ---------------------------------------------------------------------------- |
| Regtest | rsk-dev.json                                                 |
| Testnet | bamboo-testnet.json                                          |
| Mainnet | rsk-mainnet.json                                             |
| Custom  | /home/username/rskj_config/genesis.json |

## transaction.outdated

It defines when a transaction is outdated:

- `transaction.outdated.threshold = int`
  is the number of blocks that should pass before pending transaction is removed.
  Suggested value: `10`.
- `transaction.outdated.timeout = int`
  is the number of seconds that should pass before pending transaction is removed.
  Suggested value: `100` (10 blocks \* 10 seconds per block).

## transaction.gasPriceCalculatorType

It defines the type of gas price calculator being used.

Possible Values: `WEIGHTED_PERCENTILE`, `PLAIN_PERCENTILE` (default)

Setting this value to `WEIGHTED_PERCENTILE` allows for the gas used by the tx to
be taken into account.

## play.vm

A boolean that invokes VM program on message received.
If the VM is not invoked, the balance transfer occurs anyway.
Suggested value: `true`.

## hello.phrase

A string that will be included in the hello message of the peer.

## details.inmemory.storage.limit

Specifies when exactly to switch managing storage of the account
on autonomous DB.
Suggested value: `1`.

If the in-memory storage of the contract exceeds the limit,
only deltas are saved.

## solc.path

The path to the [Solidity](http://solidity.readthedocs.io) compiler.
This is set when you may want to use the node to compile your smart contracts.
If you don't have Solidity installed, you can use `/bin/false` as value.
