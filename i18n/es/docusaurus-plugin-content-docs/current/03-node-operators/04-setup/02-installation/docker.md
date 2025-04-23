---
sidebar_label: Configurar nodo en Docker
sidebar_position: 200
title: Configurar nodo en Docker
tags:
  - acoplador
  - rootstock
  - escritorio
  - macOS
  - rskj
  - ventanas
  - instalar
  - rsk
  - nodo
  - cómo
  - red
  - requisitos
  - red principal
  - testnet
  - regtest
description: Instalar RSKj usando Docker.
---

Before installing Docker, ensure your system meets the [minimum requirements](/node-operators/setup/requirements/) before installing the Rootstock node (RSKj).
If you already have docker installed. See how to [Install the RSKj node using Docker](#install-rskj-using-docker).

## Instalar cliente Docker Desktop

[Docker Desktop](https://www.docker.com/products/docker-desktop/) proporciona una forma fácil y rápida para ejecutar aplicaciones contenedoras en varios sistemas operativos.

```mdx-code-block
<Tabs>
  <TabItem value="mac" label="Mac OSX, Windows" default>
    - [Download](https://www.docker.com/products/docker-desktop) and install
    - Start the Docker Desktop client
    - Login with a Docker Hub free account
  </TabItem>
  <TabItem value="linux" label="Linux">
   - Install [Docker Engine Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
   - Note that you will need to use `sudo` for all docker commands, by default. To avoid this [additional steps](https://docs.docker.com/install/linux/linux-postinstall/) are required.
  </TabItem>
</Tabs>
```

:::tip[For Mac M1 / M2 Chips planos plegables) usando software basado en x86]

- Asegúrate de que tienes instalado `Rosetta`. Esto normalmente está preinstalado en las versiones recientes de macOS.
- Download an x86 JDK build, such as Azul Zulu 17 (x86), to ensure compatibility with x86 based software.

:::

Asegúrese de que docker se está ejecutando ejecutando el siguiente comando - debería ejecutarse sin errores.

```shell
acopladores ps
```

Deberías ver la siguiente respuesta:

```text
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
```

Más información sobre Docker install [here](https://docs.docker.com/install/).

## Instalar RSKj usando Docker

Para instalar un nodo RSKj usando Docker, visita [Docker Hub](https://hub.docker.com/r/rsksmart/rskj) para obtener instrucciones de instalación o usa el [Reproducible Build](/node-operators/setup/reproducible-build).

## Logging in RSKj

Por defecto, los registros se dirigen exclusivamente a un solo archivo. Sin embargo, si desea habilitar la salida de registro a STDOUT, puede especificar esta propiedad del sistema mediante la línea de comandos usando `-Dlogging. tdout=<LOG_LEVEL>`. Ese comando debería verse algo así:

```java
java -Dlogging.stdout=INFO -cp <classpath> co.rsk.Start --reset --<RSK network>
```

En cuanto a los contenedores RSKj Docker, los registros se imprimen en STDOUT de forma predeterminada, haciendo más fácil ver los registros mientras el contenedor se está ejecutando. Para modificar esto, puede ejecutar el contenedor Docker con la variable de entorno configurada a un LOG_LEVEL diferente (por ejemplo, nivel de registro DEBUG). Ese comando debe seguir esta estructura:

```bash
docker run -e RSKJ_LOG_PROPS=DEBUG <container-name>
```
