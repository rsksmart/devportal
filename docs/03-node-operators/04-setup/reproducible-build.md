---
sidebar_label: Reproducible Build
sidebar_position: 7
title: Gradle building
tags: [rsk, node, compile, reproducible, checksum, rootstock]
description: "A deterministic build process used to build Rootstock node JAR file. Provides a way to be reasonable sure that the JAR is built from GitHub RSKj repository. Makes sure that the same tested dependencies are used and statically built into the executable."
---

## Setup instructions for gradle build in docker container

This is a deterministic build process used to build Rootstock node JAR file. It provides a way to be reasonably sure that the JAR is built from the [GitHub RSKj repository](https://github.com/rsksmart/rskj/releases). It also makes sure that the same tested dependencies are used and statically built into the executable.

It's highly recommended to follow the steps by yourself to avoid contamination of the process.

:::warning[Important]

Starting with v6.4.0, the minimum supported Java LTS version is Java 17. Previous Java versions will no longer be supported. The following example for Linux OS is showing instructions for v6.3.1, and thus uses jdk 8, this must be replaced by jdk 17 for v6.4.0 and up.

:::

## Install Docker

Depending on your OS, you can install Docker following the official Docker guide:

- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/)
- [CentOS](https://docs.docker.com/engine/installation/linux/centos/)
- [Fedora](https://docs.docker.com/engine/installation/linux/fedora/)
- [Debian](https://docs.docker.com/engine/installation/linux/debian/)
- [Others](https://docs.docker.com/engine/installation/#platform-support-matrix)

:::info[Info]

See how to [Setup and Run RSKj using Java](/node-operators/setup/installation/java/).
:::

## Build Container

Create a ```Dockerfile``` to setup the build environment.

````mdx-code-block
<Tabs>
  <TabItem value="linux" label="Linux" default>
      ```bash
        // FROM ubuntu:16.04
        apt-get update -y && \
          apt-get install -y git curl gnupg-curl openjdk-8-jdk && \
          rm -rf /var/lib/apt/lists/* && \
          apt-get autoremove -y && \
          apt-get clean
        gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4
        gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4
        git clone --single-branch --depth 1 --branch ARROWHEAD-6.4.0 https://github.com/rsksmart/rskj.git /code/rskj
        git clone https://github.com/rsksmart/reproducible-builds
        CP /Users/{$USER}/reproducible-builds/rskj/6.4.0-arrowhead/Dockerfile  /Users/{$USER}/code/rskj
        WORKDIR /code/rskj
        gpg --verify SHA256SUMS.asc
        sha256sum --check SHA256SUMS.asc
        ./configure.sh
        ./gradlew clean build -x test
    ```
  </TabItem>
  <TabItem value="mac" label="Mac OSX">
      ```bash
        brew update && \
        brew install git gnupg openjdk@8 && \
          rm -rf /var/lib/apt/lists/* && \
          brew autoremove && \
          brew cleanup
        gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4
        gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4
        git clone --single-branch --depth 1 --branch ARROWHEAD-6.4.0 https://github.com/rsksmart/rskj.git ./code/rskj
        git clone https://github.com/rsksmart/reproducible-builds
        CP /Users/{$USER}/reproducible-builds/rskj/6.4.0-arrowhead/Dockerfile  /Users/{$USER}/code/rskj
        cd /code/rskj
        gpg --verify SHA256SUMS.asc
        sha256sum --check SHA256SUMS.asc
        ./configure.sh
        ./gradlew clean build -x test
      ```
  </TabItem>
</Tabs>
````

**Response:**

You should get the following as the final response,
after running the above steps:

```bash
BUILD SUCCESSFUL in 55s
14 actionable tasks: 13 executed, 1 up-to-date
```

:::tip[command not found: sha256sum]

If you get the error: zsh: command not found: sha256sum

Run the command  `brew install coreutils`
:::

If you are not familiar with Docker or the ```Dockerfile``` format: what this does is use the Ubuntu 16.04 base image and install ```git```, ```curl```, ```gnupg-curl``` and ```openjdk-8-jdk```, required for building the Rootstock node.


## Run build

To create a reproducible build, run the command below in the same directory:

```bash
docker build -t rskj/6.4.0-arrowhead .
```

:::danger[Error]

if you run into any problems, ensure you're running the commands on the right folder and also ensure docker daemon is running is updated to the recent version.  See how to [Setup node on Docker](/node-operators/setup/installation/docker/)

:::

This may take several minutes to complete. What is done is:
- Place in the RSKj repository root because we need Gradle and the project.
- Runs the [secure chain verification process](/node-operators/setup/security-chain/).
- Compile a reproducible RSKj node.
- `./gradlew clean build -x test` builds without running tests.


## Verify Build

The last step of the build prints the `sha256sum` of the files, to obtain `SHA-256` checksums, run the following command in the same directory as shown above:

```bash
docker run --rm rskj/6.4.0-arrowhead sh -c 'sha256sum * | grep -v javadoc.jar'
```

## Check Results

After running the build process, a JAR file will be created in ```/rskj/rskj-core/build/libs/```, into the docker container.

You can check the SHA256 sum of the result file and compare it to the one published by Rootstock for that version.

```bash
269c6416759ff8979e6bc6a6b1ae96ab95705f1c397df06b160a9f2070a373ce  rskj-core-6.4.0-ARROWHEAD-all.jar
cb4ecbcf4654d97177389f5505764e3cc9ef5b5f87f7aca2956151c71416d315  rskj-core-6.4.0-ARROWHEAD-sources.jar
bbc0fc1bb7e865c9e11eb78317db32592c9b7dfd8a6818890729af5827a66237  rskj-core-6.4.0-ARROWHEAD.jar
fabf8af48c167d42d290e9fa44f80b76b96cd403b56c4c87f8df23fd0ea3c9f0  rskj-core-6.4.0-ARROWHEAD.module
6dbc8153d510d4e910759e2e76cf40f9c0635185f66aa612dac4b2c8a60d0c63  rskj-core-6.4.0-ARROWHEAD.pom
```

For SHA256 sum of older versions check the [releases page](https://github.com/rsksmart/rskj/releases).

If you check inside the JAR file, you will find that the dates of the files are the same as the version commit you are using.

More Resources
==============

* [Install Rootstock Node](/node-operators/setup/installation/)
* See [Reproducible builds](https://github.com/rsksmart/reproducible-builds/tree/master/rskj)
* Check out the [latest rskj releases](https://github.com/rsksmart/rskj/releases)
