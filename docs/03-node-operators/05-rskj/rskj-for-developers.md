---
sidebar_label: RSKj for Developers
title: 'RSKj for Developers'
description: 'Setup your dev environment and build dApps faster using this quick start guide'
tags: [knowledge-base, rskj, rsk, node, blockchain, developers, wallets]
layout: 'rsk'
---

## Who needs to develop using RSKj?

If you are developing smart contracts, developing DApps, or participating in a hackathon, you are likely to want to iterate fast, and therefore need quicker feedback loops.

Running RSKj in `Regtest` mode is the best fit for these needs.

## Steps

### Install Java

- The RSKj executable is a JAR file, and requires Java to run.
- Install the [Java 8 JDK](https://www.java.com/download/).

> See how to [Install a Rootstock Node](/rsk/node/install/operating-systems/)
  
### Download RSKj JAR

- Navigate to [RSKj's releases page](https://github.com/rsksmart/rskj/releases)
- From the **latest** release, download a file whose name looks like
  `rskj-core-*.jar`, where `*` is replaced by the release tag name, for example `4.1.0-HOP`.
  
### Run RSKj

```shell
java \
  -Drpc.providers.web.cors='*' \
  -Dminer.client.autoMine=true \
  -cp rskj-core-6.0.0-ARROWHEAD-all.jar \
  co.rsk.Start \
  --regtest \
  --reset
```

- The above command runs RSKj connected to Regtest, which is a `localhost`-only network, clears the database each time the node is started,
and enables both CORS and `autoMine` (which makes it behave similar to ganache).
- These are the most useful and commonly used flags and options for when you are developing or testing smart contracts and DApps.

### Import

Using `--import` indicates that the block database should be imported from an external source. This is typically expected to be used when connecting to RSK Testnet or RSK Mainnet, and when a reduction in “initial sync time” is desired.

```shell
java -cp ${JAR} co.rsk.Start \
  --import \
  --testnet
```

> Note that the `--import` feature is to be used ONLY for testing and development purposes and not in production.

## Advanced

### Developer Tools

- [Quick Start Guide](/guides/quickstart/)
- [Configuring Hardhat for Rootstock](/kb/hardhat-setup-on-rsk/)
- [More tools](/tools/)

## Debugging

- [How to debug transactions in the Rootstock network?](https://stackoverflow.com/q/66144175/194982)

## Crashes

If the RSKj process starts but then stops after a few seconds,
there is likely an error during startup.
Likewise, if the RSKj process crashes unexpectedly,
there is also an error.
However, there is no output in the terminal/shell from RSKj.
You need to view the log files, which are (by default)
located in a `logs` directory in the same folder as the JAR file.
Use the following command to see all of its output as it runs.

```shell
tail -f ./logs/rsk.log
```

Common errors encountered during start up of the RSKj node:

**Not connected to internet**

To resolve this, ensure that the internet connection is live,
and that you can `ping` external domains/ IP addresses successfully.

**Another application already listening to this address**

If you see the following output within the logs shortly prior to
the RSKj node exiting:

```
ERROR [start] [main]  The RSK node main thread failed, closing program
java.net.BindException: Address already in use
```

... that means that another process is probably already bound to that port.
You can check this using `lsof` on Linux and Mac OSX (El Capitan and later).

```shell
lsof -P -i tcp:4444
```

If you see output similar to this:

```shell
COMMAND   PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    67228 bguiz  190u  IPv6 0x365a69c9fe805921      0t0  TCP localhost:4444 (LISTEN)
```

... it means that another process is already bound to port `4444`,
which is the default for RSKj running in Regtest modes.
Your options are to:

- (1) terminate that other process, or
- (2) to configure your RSKj node to run using a different port number.

## Database corruption

RSKj stores all data in a directory on disk.
This defaults to `${HOME}/.rsk/${NETWORK}`.

For example, on Linux, if your username is `joe` and Rootstock is running in `regtest`,
the database directory default is `/home/joe/.rsk/regtest`.

The data stored in this directory can get corrupted for several reasons,
such as improperly shutting down the node.
If this has happened, and you cannot recover by other means,
you have several options:

- (1) Start RSKj using `--reset`. This will wipe the database directory.
- (2) Use `rm` to delete the database directory manually, before running RSKj again.
- (3) Start RSKj by specifying a different path for the database directory.
  This keeps your original database directory intact, but does not use it.

### RPC

[Remote procedure calls (JSON-RPC)](/rsk/node/architecture/json-rpc/) are the primary interface through which Rootstock nodes communicate over the network.

JSON-RPC is available over two network transport protocols: **HTTP** and **WebSockets**

- [Configuring and using RPC over HTTP](/rsk/node/architecture/json-rpc/transport-protocols#http-transport-protocol)
- [Configuring and using RPC over WebSockets](/rsk/node/architecture/json-rpc/transport-protocols#websockets-transport-protocol)

> Note that [Rootstock public nodes](/rsk/node/architecture/json-rpc/)
> do not expose WebSockets, they are HTTP only.
> To work around this, you may either run your own Rootstock node,
> or use a third-party node provider, such as [Getblock](/solutions/getblock/) or [NowNodes](/solutions/nownodes/).