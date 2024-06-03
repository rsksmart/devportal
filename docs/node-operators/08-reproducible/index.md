---
layout: rsk
title: Reproducible Build
sidebar_label: Reproducible Build
tags: [rsk, node, compile, reproducible, checksum, rootstock]
description: "A deterministic build process used to build Rootstock node JAR file. Provides a way to be reasonable sure that the JAR is built from GitHub RSKj repository. Makes sure that the same tested dependencies are used and statically built into the executable."
menu_order: 7
permalink: /rsk/node/reproducible/
render_features: 'custom-terminals'
---

Gradle building
===============

*Setup instructions for gradle build in docker container.*

This is a deterministic build process used to build Rootstock node JAR file. It provides a way to be reasonable sure that the JAR is built from GitHub RSKj repository. It also makes sure that the same tested dependencies are used and statically built into the executable.

It's strongly suggested to follow the steps by yourself to avoid any kind of contamination in the process.

Table of Contents
-----------------
- [Install Docker](#install-docker)
- [Build the environment docker container](#build-container)
- [Run Build](#run-build)
- [Check Results](#check-results)

Install Docker
--------------
Depending on your OS, you can install Docker following the official Docker guide:

- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/)
- [CentOS](https://docs.docker.com/engine/installation/linux/centos/)
- [Fedora](https://docs.docker.com/engine/installation/linux/fedora/)
- [Debian](https://docs.docker.com/engine/installation/linux/debian/)
- [Others](https://docs.docker.com/engine/installation/#platform-support-matrix)

Build Container
---------------
Create a ```Dockerfile``` to setup the build environment

[](#top "multiple-terminals")
- Linux
  ```shell
  FROM ubuntu:16.04
  RUN apt-get update -y && \
      apt-get install -y git curl gnupg-curl openjdk-8-jdk && \
      rm -rf /var/lib/apt/lists/* && \
      apt-get autoremove -y && \
      apt-get clean
  RUN gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4
  RUN gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4
  RUN git clone --single-branch --depth 1 --branch ARROWHEAD-6.0.0 https://github.com/rsksmart/rskj.git /code/rskj
   RUN git clone https://github.com/rsksmart/reproducible-builds 
  RUN CP /Users/{$USER}/reproducible-builds/rskj/6.0.0-arrowhead/Dockerfile  /Users/{$USER}/code/rskj
  WORKDIR /code/rskj
  RUN gpg --verify SHA256SUMS.asc
  RUN sha256sum --check SHA256SUMS.asc
  RUN ./configure.sh
  RUN ./gradlew clean build -x test
  ```
- Mac OSX
  ```terminal
  brew update && \
  brew install git gnupg openjdk@8 && \
      rm -rf /var/lib/apt/lists/* && \
      brew autoremove && \
      brew cleanup
  RUN gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4
  RUN gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4
  RUN git clone --single-branch --depth 1 --branch ARROWHEAD-6.0.0 https://github.com/rsksmart/rskj.git ./code/rskj
  RUN git clone https://github.com/rsksmart/reproducible-builds 
  RUN CP /Users/{$USER}/reproducible-builds/rskj/6.0.0-arrowhead/Dockerfile  /Users/{$USER}/code/rskj
  RUN CD /code/rskj
  RUN gpg --verify SHA256SUMS.asc
  RUN sha256sum --check SHA256SUMS.asc
  RUN ./configure.sh
  RUN ./gradlew clean build -x test   
  ```

**Response:**

You should get the following as the final response, 
after running the above steps:

```bash
BUILD SUCCESSFUL in 55s
14 actionable tasks: 13 executed, 1 up-to-date
```

If you are not familiar with Docker or the ```Dockerfile``` format: what this does is use the Ubuntu 16.04 base image and install ```git```, ```curl```, ```gnupg-curl``` and ```openjdk-8-jdk```, required for building the Rootstock node.


Run build
---------

To create a reproducible build, run the command below in the same directory:

```bash
$ docker build -t rskj/6.0.0-arrowhead .     
```

> if you run into any problems, ensure you're running the commands on the right folder and also ensure docker daemon is running is updated to the recent version.

This may take several minutes to complete. What is done is:
- Place in the RSKj repository root because we need Gradle and the project.
- Runs the [secure chain verification process](/rsk/node/security-chain/).
- Compile a reproducible RSKj node.
- `./gradlew clean build -x test` builds without running tests.


Verify Build
------------

The last step of the build prints the `sha256sum` of the files, to obtain `SHA-256` checksums, run the following command in the same directory as shown above:

```bash
$ docker run --rm rskj/6.0.0-arrowhead sh -c 'sha256sum * | grep -v javadoc.jar'
```

Check Results
-------------
After running the build process, a JAR file will be created in ```/rskj/rskj-core/build/libs/```, into the docker container.

You can check the SHA256 sum of the result file and compare it to the one published by Rootstock for that version.

```bash
d3026daa1c4aa56741b4e45bb429d8d16d9bda664ebe3aa4394fe1fa13371769  rskj-core-6.0.0-ARROWHEAD-all.jar
2510c8b2cc99300d2c3ca9765bd60847aca8b14da57a51c3eb080ab448f1db30  rskj-core-6.0.0-ARROWHEAD-sources.jar
7012f7e29bf60bf6bcc072154978c58dbed07a043ce3218fd97035476151e717  rskj-core-6.0.0-ARROWHEAD.jar
4b04ecb033c633c912ed5222e82f20c88d2593abc2fdf585771a818eb63c685d  rskj-core-6.0.0-ARROWHEAD.module
984dc3bc3596623b74f457f96617765c685567cdde3c7f4a7279f0177ff5d978  rskj-core-6.0.0-ARROWHEAD.pom
```

For SHA256 sum of older versions check the [releases page](https://github.com/rsksmart/rskj/releases).

If you check inside the JAR file, you will find that the dates of the files are the same as the version commit you are using.

More Resources
==============

* [Install Rootstock Node](/rsk/node/install/)
* See [Reproducible builds](https://github.com/rsksmart/reproducible-builds/tree/master/rskj)
* Check out the [latest rskj releases](https://github.com/rsksmart/rskj/releases)