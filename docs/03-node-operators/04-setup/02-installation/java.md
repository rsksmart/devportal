---
sidebar_label: Setup node using Java
sidebar_position: 300
title: Setup node using Java
tags: [java, install, rootstock, rskj, node, how-to, network, requirements, mainnet, jar]
description: "Install RSKj using Java."
---

To setup a Rootstock node using Java, you need to:

- Ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) for installing the Rootstock node.
- Install [Java 8 JDK](https://www.java.com/download/).

**For Mac M1 / M2 (Apple Chips) using x86 based software**:
- Ensure you have `Rosetta` installed. This is typically pre-installed on recent macOS versions.
- Download an x86 JDK build, such as [Azul Zulu 11 (x86)](https://www.azul.com/downloads/?version=java-11-lts&os=macos&package=jdk), to ensure compatibility with x86 based software.

## Video walkthrough

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/TxpS6WhxUiU?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Install the node using a JAR file

- Download and Setup
    1. **Download the JAR**: Download the Fat JAR or Uber JAR from [RSKj releases](https://github.com/rsksmart/rskj/releases), or compile it [reproducibly](https://github.com/rsksmart/rskj/wiki/Reproducible-Build) or [otherwise](/rsk/node/contribute).
    1. **Create Directory**: Create a directory for the node.
        ```jsx
        mkdir rskj-node-jar
        cd ~/rskj-node-jar
        ```
    1. **Move the JAR**: Move or copy the just downloaded jar file to your directory.
        ```jsx
        mv ~/Downloads/rskj-core-5.4.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
        ```
- Configuration
    1. **Create Config Directory**: Create another directory inside `~/rskj-node-jar/config`
        ```jsx
        mkdir config
        ```
    1. **Download Config File**: Get `node.conf` from [here](https://github.com/rsksmart/rif-relay/blob/main/docker/node.conf).
    1. **Move Config File**: Move the `node.conf` file to the `config` directory.
- Run the Node
    - Linux, Mac OSX
        ```shell
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
        ```
    - Windows
        ```windows-command-prompt
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
        ```
        > Replace `<PATH-TO-THE-RSKJ-JAR>` with the actual path to your JAR file. For example, `C:/RskjCode/rskj-core-6.0.0-ARROWHEAD-all.jar`.

## Using Import Sync


Instead of the default synchronization, you can use import sync to import a pre-synchronized database from a trusted origin, which is significantly faster.

[](#top "collapsible")
- Running node with Import Sync
    - Linux, Mac OSX
        ```shell
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
        ```
    - Windows
        ```windows-command-prompt
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
        ```
- Resolving memory issues
    - **Memory Issues?** If you encounter memory errors and meet the [minimum hardware requirements](/rsk/node/install/requirements/), consider using `-Xmx4G` flag to allocate more memory as shown below:
    - Linux, Mac OSX
        ```shell
        $ java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
        ```
    - Windows
        ```windows-command-prompt
        C:\> java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
        ```
        > Replace `<PATH-TO-THE-RSKJ-JAR>` with your JAR file path. For configuration details, see [`database.import` setting](/rsk/node/configure/reference/#databaseimport).

## Check the RPC

> After starting the node, if there's no output, it's running correctly. 

1. To confirm, open a new console tab (it is important you do not close this tab or interrupt the process) and test the node's RPC server. A sample cURL request:

    [](#top "multiple-terminals")
    - Linux, Mac OSX
        ```shell
        curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```
    - Windows
        ```windows-command-prompt
        curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```

        Expect a response like:
        ```shell
        {"jsonrpc":"2.0","id":67,"result":"RskJ/5.3.0/Mac OS X/Java1.8/ARROWHEAD-202f1c5"}
        ```

1. To check the block number:

- Linux, Mac OSX
    ```shell
        curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
    ```
- Windows
    ```windows-command-prompt
        curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
    ```

Output:
    ```jsx
        {"jsonrpc":"2.0","id":1,"result":"0x0"}
    ```

Now, you have successfully setup a Rootstock node using the jar file.
The `result` property represents the latest synced block in hexadecimal.

## Switching networks

To change networks on the RSKj node, use the following commands:

- Mainnet
    ```bash
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start
    ```
- Testnet
    ```bash
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --testnet
    ```
- Regtest
    ```bash
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --regtest
    ```

> Replace `<PATH-TO-THE-RSKJ-FATJAR>` with the actual path to your jar file. For example: `C:/RskjCode/rskj-core-6.0.0-ARROWHEAD-all.jar`.