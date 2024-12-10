---
sidebar_label: Configurar nodo usando Java
sidebar_position: 100
title: Configurar nodo usando Java
tags:
  - java
  - instalar
  - rootstock
  - rskj
  - nodo
  - cómo
  - red
  - requisitos
  - red principal
  - tarro
description: Instalar RSKj usando Java.
---

Para configurar un nodo Rootstock usando Java, necesita:

- Asegúrese de que su sistema cumpla con los [requisitos mínimos](/node-operators/setup/requirements/) para instalar el nodo Rootstock.
- Instalar [Java 8 JDK](https://www.java.com/download/).

:::tip[For Mac M1 / M2 Chips planos plegables) usando software basado en x86]

- Asegúrate de que tienes instalado `Rosetta`. Esto normalmente está preinstalado en las versiones recientes de macOS.
- Descargue una compilación JDK de x86, como [Azul Zulu 11 (x86)](https://www.azul.com/downloads/?version=java-11-lts\&os=macos\&package=jdk), para asegurar la compatibilidad con software basado en x86.

:::

## Recorrido por vídeo

<Video url="https://www.youtube-nocookie.com/embed/TxpS6WhxUiU?cc_load_policy=1" thumbnail="/img/thumbnails/install-node-java-thumbnail.png" />

## Instalar el nodo usando un archivo JAR

### Descargar y configurar

1. **Descarga el JAR**: descarga el Fat JAR o Uber JAR desde [RSKj releases](https://github.com/rsksmart/rskj/releases), o compilarlo [reproducibly](https://github.com/rsksmart/rskj/wiki/Reproducible-Build).

2. **Crear Directorio**: Crear un directorio para el nodo.

```jsx
mkdir rskj-node-jar
cd ~/rskj-node-jar
```

3. **Mueve el JAR**: Mueve o copia el archivo jar recién descargado a tu directorio.

```jsx
mv ~/Downloads/rskj-core-6.3.1-ARROWHEAD-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
```

### Configuración

1. **Crear directorio de configuración**: Crea otro directorio dentro de `~/rskj-node-jar/config`

```jsx
  configuración de mkdir
```

2. **Descargar archivo de configuración**: Obtenga `node.conf` de [here](https://github.com/rsksmart/rif-relay/blob/main/docker/node.conf).
3. **Mover archivo de configuración**: Mueve el archivo `node.conf` al directorio `config`.

### Ejecutar el Nodo

````mdx-code-block
<Tabs>
  <TabItem value="1" label="Linux, Mac OSX" default>
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co. sk. tart
    ```
  </TabItem>
  <TabItem value="2" label="Windows">
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co. sk.Start
    ```
  </TabItem>
</Tabs>
````

:::tip\[Tip]

Reemplaza `<PATH-TO-THE-RSKJ-JAR>` con la ruta real a tu archivo JAR. Por ejemplo, `C:/RskjCode/rskj-core-6.3.1-ARROWHEAD-all.jar`.
:::

## Usando Sync de importación

En lugar de la sincronización predeterminada, puede utilizar la sincronización de importación para importar una base de datos presincronizada desde un origen confiable, que es significativamente más rápido.

````mdx-code-block
<Tabs>
  <TabItem value="3" label="Linux, Mac OSX" default>
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co. sk. tart --import
    ```
  </TabItem>
  <TabItem value="4" label="Windows">
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co. sk.Start --import
    ```
  </TabItem>
</Tabs>
````

### Resolviendo problemas de memoria

**¿Problemas de memoria?** Si encuentras errores de memoria y cumples con los [requisitos de hardware mínimos](/node-operators/setup/requirements/), considera usar la bandera `-Xmx4G` para asignar más memoria como se muestra a continuación:

````mdx-code-block
<Tabs>
  <TabItem value="5" label="Linux, Mac OSX" default>
    ```shell
    java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co. sk. tart --import
    ```
  </TabItem>
  <TabItem value="6" label="Windows">
    ```shell
    C:\> java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co. sk.Start --import
    ```
  </TabItem>
</Tabs>
````

:::tip\[Tip]

Reemplazar `<PATH-TO-THE-RSKJ-JAR>` con tu ruta de archivo JAR. Para detalles de configuración, consulta [`database.import`](/node-operators/setup/configuration/reference#databaseimport).
:::

## Compruebe el RPC

:::info\[Info]

Después de iniciar el nodo, si no hay salida, esto significa que se está ejecutando correctamente.
:::

1. Para confirmar, abre una nueva pestaña de consola (es importante no cerrar esta pestaña o interrumpir el proceso) y probar el servidor RPC del nodo. Solicitud de cURL de ejemplo:

````mdx-code-block
<Tabs>
  <TabItem value="7" label="Linux, Mac OSX" default>
    ```shell
    curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2. ","method":"web3_clientVersion","params":[], id":67}'
    ```
  </TabItem>
  <TabItem value="8" label="Windows">
    ```shell
    curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2. ","method":"web3_clientVersion","params":[],"id":67}'
    ```
  </TabItem>
</Tabs>
````

Salida:

```shell
{"jsonrpc":"2.0","id":67,"result":"RskJ/6.3.1/Mac OS X/Java1.8/ARROWHEAD-202f1c5"}
```

2. Para comprobar el número de bloque:

````mdx-code-block
<Tabs>
  <TabItem value="9" label="Linux, Mac OSX" default>
     ```shell
    curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2. ", "method":"eth_blockNumber","params":[], id":1}'
    ```
  </TabItem>
  <TabItem value="10" label="Windows">
    ```windows-command-prompt
    curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2. ", "method":"eth_blockNumber","params":[],"id":1}'
    ```
  </TabItem>
</Tabs>
````

Salida:

```jsx
{"jsonrpc":"2.0","id":1,"result":"0x0"}
```

:::success[Success]
Ahora, ha configurado con éxito un nodo Rootstock usando el archivo jar.
La propiedad `result` representa el último bloque sincronizado en hexadecimal.
:::

## Cambiando redes

Para cambiar las redes en el nodo RSKj, utilice los siguientes comandos:

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

:::tip[Tip]
Reemplaza `<PATH-TO-THE-RSKJ-FATJAR>` con la ruta real a tu archivo jar Por ejemplo: `C:/RskjCode/rskj-core-6.3.1-ARROWHEAD-all.jar`.
:::
