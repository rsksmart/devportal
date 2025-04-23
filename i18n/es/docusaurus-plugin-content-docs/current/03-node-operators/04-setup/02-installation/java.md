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
- Install [Java 17 JDK](https://www.java.com/download/).

:::warning\[Important]

Starting with [v6.4.0](/changelog/), the minimum supported Java LTS version is Java 17. Previous Java versions will no longer be supported.

:::

:::tip[For Mac M1 / M2 Chips planos plegables) usando software basado en x86]

- Asegúrate de que tienes instalado `Rosetta`. Esto normalmente está preinstalado en las versiones recientes de macOS.
- Download an x86 JDK build, such as Azul Zulu 17 (x86), to ensure compatibility with x86 based software.

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
mv ~/Downloads/rskj-core-7.0.0-LOVELL-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
```

<!-- ### Configuration
1. **Create Config Directory**: Create another directory inside `~/rskj-node-jar/config`
```jsx
  mkdir config
```
2. **Download Config File**: Get `node.conf` from [here](https://github.com/rsksmart/rif-relay/blob/main/docker/node.conf).
3. **Move Config File**: Move the `node.conf` file to the `config` directory. -->

### Ejecutar el Nodo

````mdx-code-block
<Tabs>
  <TabItem value="1" label="Linux, Mac OSX" default>
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
    ```
  </TabItem>
  <TabItem value="2" label="Windows">
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
    ```
  </TabItem>
</Tabs>
````

:::tip\[Tip]

Replace `<PATH-TO-THE-RSKJ-JAR>` with the actual path to your JAR file. For example, `C:/RskjCode/rskj-core-7.0.0-LOVELL-all.jar`.
:::

## Usando Sync de importación

En lugar de la sincronización predeterminada, puede utilizar la sincronización de importación para importar una base de datos presincronizada desde un origen confiable, que es significativamente más rápido.

````mdx-code-block
<Tabs>
  <TabItem value="3" label="Linux, Mac OSX" default>
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
  </TabItem>
  <TabItem value="4" label="Windows">
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
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
    java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
  </TabItem>
  <TabItem value="6" label="Windows">
    ```shell
    C:\> java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
  </TabItem>
</Tabs>
````

:::tip\[Tip]

Reemplazar `<PATH-TO-THE-RSKJ-JAR>` con tu ruta de archivo JAR. Para detalles de configuración, consulta [`database.import`](/node-operators/setup/configuration/reference#databaseimport).
:::

## Compruebe el RPC

:::info\[Info]

After starting the node, if there's no output, this means it's running correctly.
:::

1. Para confirmar, abre una nueva pestaña de consola (es importante no cerrar esta pestaña o interrumpir el proceso) y probar el servidor RPC del nodo. Solicitud de cURL de ejemplo:

````mdx-code-block
<Tabs>
  <TabItem value="7" label="Linux, Mac OSX" default>
    ```shell
    curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
    ```
  </TabItem>
  <TabItem value="8" label="Windows">
    ```shell
    curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
    ```
  </TabItem>
</Tabs>
````

Salida:

```shell
{"jsonrpc":"2.0","id":67,"result":"RskJ/6.6.0/Mac OS X/Java17/SNAPSHOT-95a8f1ab84"}
```

2. Para comprobar el número de bloque:

````mdx-code-block
<Tabs>
  <TabItem value="9" label="Linux, Mac OSX" default>
     ```shell
    curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
    ```
  </TabItem>
  <TabItem value="10" label="Windows">
    ```windows-command-prompt
    curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
    ```
  </TabItem>
</Tabs>
````

Output:

```jsx
{"jsonrpc":"2.0","id":1,"result":"0x3710"}
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
Replace `<PATH-TO-THE-RSKJ-FATJAR>` with the actual path to your jar file. For example: `C:/RskjCode/rskj-core-7.0.0-LOVELL-all.jar`.
:::
