---
sidebar_label: Autominer
title: Run with autominer (Ganache-like)
tags:
  - rsk
  - rskj
  - rootstock
  - node
  - config
description: Learn how to run the Rootstock node with autominer - similar to Ganache default config
---

[Ganache](https://trufflesuite.com/docs/ganache/quickstart/) local network runs like what Rootstock (RSK) calls `autominer mode`, it:

- Creates blocks when new transactions are sent to the node
- Will not create blocks if no transactions are sent
- Allows to mine blocks manually via RPC
- (optionally) Delete the database on restart

To configure the node, we are going to:

1. Run it in `--regtest` mode
2. Use a custom config to activate the autominer

The configuration we need to use is:

```
miner.client.autoMine = true
```

Create a `autominer.conf` file in the root of the repo (or other dir., remember to use the correct path afterwards)

This option can be activated when using the node in different modes

### Setup Autominer on IntelliJ

On top of the default configuration (Java version and main class), we will need to add

- Program arguments: `--regtest` and optionally `--reset` for database reset on restart
- VM options: `-Drsk.conf.file=./autominer.conf` (or the path you chose)

It should look like this:

![autominer_inellij_config](/img/rsk/autominer_intellij_config.png)

### Setup Autominer on CLI

To setup autominer on CLI, use the command below;

> Use this if you are running with JAR.

```java
java -cp rskj-core-4.1.0-HOP-all.jar -Drsk.conf.file=./autominer.conf co.rsk.Start --regtest --reset
```

## Result

Now you have an Rootstock node running locally! It will create blocks only for new transactions, or arbitrarily by using the `evm_mine` RPC call.

See gif image below for example on how to do this;

![autominer_demo](/img/rsk/autominer_demo.gif)
