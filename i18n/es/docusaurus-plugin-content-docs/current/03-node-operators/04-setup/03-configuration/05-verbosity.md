---
title: Configurar Verbosidad
sidebar_position: 500
sidebar_label: Configurar Verbosidad
tags:
  - rsk
  - rskj
  - nodo
  - configuración
  - operadores de nodos
  - rootstock
  - logs
description: Configurar RSKj para la verbosidad deseada del registro, encontrar archivos de registro y usar logback.
---

Puede configurar la verbosidad de registro deseada para su instalación del nodo Rootstock en función de sus necesidades.
Puede encontrar más información en: [Proyecto Logback](https://logback.qos.ch/index.html).

## Requisitos

- Nodo RSK instalado
- Acceso SSH
- Acceso de superusuario (`sudo`)

### Dónde encontrar los archivos de registro RSK

Registro en tiempo real:

```shell
/var/log/rsk/rsk.log
```

Registros comprimidos:

```shell
/var/log/rsk/rskj-AAAA-MM-DD.N.log.gz
```

## Opciones de nivel de log

Al configurar el nivel de registro, todos los elementos de registro de ese nivel e inferiores se escriben en el archivo de registro. En la siguiente tabla, la columna de la izquierda representa los posibles valores que puede establecer en su configuración.

![Nivel de registro](https://i.stack.imgur.com/7o9Kk.png)

<!-- TODO fix this image, perhaps convert to a table -->

## Establecer la configuración de verbosidad deseada

Es necesario editar el archivo `logback.xml` para establecer el nivel de verbosidad deseado.

```bash
sudo vi /etc/rsk/logback.xml
```

Este archivo le permite configurar diferentes niveles de registro para diferentes partes de la aplicación.

```xml
    <logger name="execute" level="INFO"/>
    <logger name="blockvalidator" level="INFO"/>
    <logger name="blocksyncservice" level="TRACE"/>
    <logger name="blockexecutor" level="INFO"/>
    <logger name="general" level="DEBUG"/>
    <logger name="gaspricetracker" level="ERROR"/>
    <logger name="web3" level="INFO"/>
    <logger name="repository" level="ERROR"/>
    <logger name="VM" level="ERROR"/>
    <logger name="blockqueue" level="ERROR"/>
    <logger name="io.netty" level="ERROR"/>
    <logger name="block" level="ERROR"/>
    <logger name="minerserver" level="INFO"/>
    <logger name="txbuilderex" level="ERROR"/>
    <logger name="pendingstate" level="INFO"/>
    <logger name="hsqldb.db" level="ERROR"/>
    <logger name="TCK-Test" level="ERROR"/>
    <logger name="db" level="ERROR"/>
    <logger name="net" level="ERROR"/>
    <logger name="start" level="ERROR"/>
    <logger name="cli" level="ERROR"/>
    <logger name="txs" level="ERROR"/>
    <logger name="gas" level="ERROR"/>
    <logger name="main" level="ERROR"/>
    <logger name="trie" level="ERROR"/>
    <logger name="org.hibernate" level="ERROR"/>
    <logger name="peermonitor" level="ERROR"/>
    <logger name="bridge" level="ERROR"/>
    <logger name="org.springframework" level="ERROR"/>
    <logger name="rlp" level="ERROR"/>
    <logger name="messagehandler" level="ERROR"/>
    <logger name="syncprocessor" level="TRACE"/>
    <logger name="sync" level="ERROR"/>
    <logger name="BtcToRskClient" level="ERROR"/>
    <logger name="ui" level="ERROR"/>
    <logger name="java.nio" level="ERROR"/>
    <logger name="org.eclipse.jetty" level="ERROR"/>
    <logger name="wire" level="ERROR"/>
    <logger name="BridgeSupport" level="ERROR"/>
    <logger name="jsonrpc" level="ERROR"/>
    <logger name="wallet" level="ERROR"/>
    <logger name="blockchain" level="INFO"/>
    <logger name="blockprocessor" level="ERROR"/>
    <logger name="state" level="INFO"/>
    <logger name="messageProcess" level="INFO"/>

    <root level="DEBUG">
        <appender-ref ref="stdout"/>
        <appender-ref ref="FILE-AUDIT"/>
    </root>
```

- Guarda tus cambios
- RSK `logback.xml` config observará y aplicará los cambios sin reiniciar el Nodo RSK.
  (El observador puede tardar hasta 1 hora en notar los cambios y recargar la configuración de registro)
- Los registros de RSK con la instalación por defecto rotarán diariamente y/o cuando el archivo de registro alcance los 100MB

Usando esta configuración:

- La mayoría de las áreas de la aplicación **sólo** registrarán eventos `FATAL` y `ERROR` para la mayoría de las áreas de la aplicación.
- Las áreas `execute`, `blockvalidator`, `blockexecutor`, `web3`, `minerserver`, `pendingstate`, `blockchain`, `messageProcess`, especifican `INFO`, por lo que **sólo** registrarán eventos `FATAL`, `ERROR`, `WARN`, e `INFO`.
- No habrá registros `DEBUG`, `INFO` y `TRACE`.

## Usando el archivo de configuración de logback

Puede descargar un ejemplo de configuración de logback [aquí](https://github.com/rsksmart/artifacts/blob/master/rskj-ubuntu-installer/config/logback.xml).

#### Usando logback con un nodo instalado

Si está ejecutando un nodo [utilizando el release jar file](/node-operators/setup/installation/java) utilice el siguiente comando:

```bash
java -cp rskj-core-6.0.0-ARROWHEAD-all.jar -Dlogback.configurationFile=/full/path/to/logback.xml co.rsk.Start
```

#### Uso de logback con un nodo compilado

Si estás ejecutando un nodo [compilando el código](/node-operators/setup/installation/java) en Opciones de VM _add_:

```shell
-Dlogback.configurationFile=/full/path/to/logback.xml
```

> Nota: la ruta debe escribirse sin abreviaturas (ruta completa)
