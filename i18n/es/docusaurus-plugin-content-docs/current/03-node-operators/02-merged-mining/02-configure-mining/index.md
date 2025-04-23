---
title: Configurar
sidebar_label: Configurar nodo para la minería
tags:
  - rsk
  - rootstock
  - rskj
  - nodo
  - operadores de nodos
  - configuración
description: Configurar sus propias preferencias de configuración, al usar el comando Java, Ubuntu, Azure, AWS o Docker
---

## Interfaz de línea de comandos

El nodo Rootstock puede iniciarse con diferentes
[banderas CLI](/node-operators/setup/configuration/cli/).

## Configurando preferencias de configuración

Ver cómo configurar tu configuración:

- [Usando Ubuntu o Docker](#using-ubuntu-or-docker)
- [Usando el comando `java`](#using-java-command)

&hellip; para ejecutar el nodo.

:::tip[Tip]
Necesita **reiniciar** el nodo si ha cambiado alguna opción de configuración.
:::

### Usando Ubuntu o Docker

El archivo de configuración de tu nodo se encuentra en `is/rsk`.
Las configuraciones predeterminadas se definen allí y son las mismas que [estas](https://github.com/rsksmart/artifacts/tree/master/rskj-ubuntu-installer/config).

Deberías editar la configuración relacionada con la red que estás usando (`mainnet.conf`, `testnet.conf`, `regtest.conf`).
Compruebe [here](/node-operators/setup/configuration/reference) todas las opciones de configuración que podría cambiar.

### Usando Windows

Para otros sistemas operativos, incluyendo Windows, por favor utilice la opción `-Drsk.conf.file` como se especifica a continuación.

### Usando el comando `java`

#### 1. Crea un archivo `.conf`

Puedes crear un archivo con las opciones de configuración que quieras reemplazar del predeterminado.
Las configuraciones predeterminadas están definidas [here](https://github.com/rsksmart/rskj/tree/master/rskj-core/src/main/resources/config).

La extensión del archivo debe ser `.conf`.
Revise [/node-operators/setup/configuration/reference/](/node-operators/setup/configuration/reference/) para toda la opción de configuración.

Como ejemplo, si quieres cambiar el directorio predeterminado de la base de datos, el archivo de configuración solo debería contener:

```conf
base de datos {
    dir = /new/path/for/database
    reset = false
}
```

#### 2. Especifique la ruta del archivo de configuración

Para aplicar las opciones de configuración, necesita establecer la ruta de su propio archivo de configuración cuando ejecute su nodo.

Esto puede hacerse de dos maneras:

- Ejecutar el nodo con el comando `java`, añade `-Drsk.conf.file=path/to/your/file.conf`
- Compilando el nodo con IntelliJ, agrega a las opciones de VM: `-Drsk.conf.file=path/to/your/file.conf`

### Usando RocksDB

:::note[Important Aviso]

- A partir de [RSKj HOP v4.2.0](https://github.com/rsksmart/rskj/releases/tag/HOP-4.2.0), RocksDB ya no es experimental. A partir de la versión más reciente, RocksDB se ha convertido en la biblioteca de almacenamiento por defecto, reemplazando LevelDB. Este cambio se hizo para abordar las cuestiones de mantenimiento y rendimiento del LevelDB.
- Anteriormente, RSKj ejecutó usando [LevelDB](https://dbdb.io/db/leveldb) por defecto, con la opción de cambiar a [RocksDB](http://rocksdb. rg/). Ahora, RocksDB es la opción de almacenamiento predeterminada, buscando habilitar un mayor rendimiento dentro de los nodos RSKj.
  :::

#### Empezar

Los nodos RSKj se ejecutan usando RocksDB por defecto (Ver sección de información importante). Para volver a LevelDB, modifique el archivo de configuración RSKj relevante (`*.conf`) y establezca la configuración: `keyvalue.datasource=leveldb`.

La propiedad `keyvalue.datasource` en la configuración
sólo puede ser `rocksdb` o `leveldb`.

> If you wish to switch between the different storage options,
> for example from `leveldb` to `rocksdb` or vice versa,
> you must **restart** the node with the import option.

El siguiente comando de ejemplo muestra cómo hacer esto cuando
el nodo RSKj estaba ejecutando previamente el predeterminado (`leveldb`),
y quiere correr con `rocksdb` siguiente.

> Tenga en cuenta el uso de la bandera `--import`, que restablece y reimporta la base de datos.

```java
java -Dkeyvalue.datasource=rocksdb -jar ./rskj-core/build/libs/rskj-core-*-all.jar --testnet --import
```

#### Ventajas:

- RocksDB utiliza un motor de base de datos estructurado de registros, escrito enteramente en C++, para el máximo rendimiento. Las claves y valores son sólo flujos de bytes de tamaño arbitrario.
- RocksDB está optimizado para almacenamiento rápido y de baja latencia, como unidades flash y unidades de disco de alta velocidad. RocksDB aprovecha todo el potencial de las altas tasas de lectura/escritura ofrecidas por flash o RAM.
- RocksDB es adaptable a diferentes cargas de trabajo. Desde motores de almacenamiento de bases de datos como [MyRocks](https://github.com/facebook/(0)[video] ql-5.6) hasta [caché de datos de aplicación](http://techblog. etflix.com/2016/05/application-data-caching-using-ssds.html) para cargas de trabajo embebidas, RocksDB puede usarse para una variedad de necesidades de datos.
- RocksDB proporciona operaciones básicas tales como abrir y cerrar una base de datos, leer y escribir en operaciones más avanzadas como filtros de fusión y compactación.

### Cambiando entre DB Kinds\*\*

Cambiar entre diferentes tipos de bases de datos en su sistema requiere modificar los archivos de configuración. elimina la base de datos existente y reinicia el nodo para que el nodo comience a sincronizar desde cero usando el nuevo tipo db.

:::info\[Info]

Los nodos que ya se estaban ejecutando en LevelDB seguirán usando LevelDB, y lo mismo se aplica a RocksDB. Sin embargo, todos los nodos configurados desde cero usarán RocksDB por defecto.
:::

### Precio de gas ajustado

El valor devuelto por `eth_gasPrice` puede ser modificado estableciendo un multiplicador a
para ser utilizado mientras se calcula el precio de gas más importante.

Esto puede hacerse estableciendo un valor numérico en `rpc.gasPriceMultiplier` en el archivo de configuración
. El valor predeterminado es `1.1`.

### Solución de problemas

#### Puerto UDP ya en uso

If you see the following error message,
it means that RSKj is unable to bind to a particular port number,
because prior to this, another process has already bound to the same port number.

```text
Excepción en el hilo "UDPServer" co.rsk.net.discovery.PeerDiscoveryException: Discovery cannot be started.
        at co.rsk.net.discoveryunque DPServer$1.run(UDPServer.java:65)
Cálido por: java.net.BindException: Dirección ya en uso: bind
```

Para rectificar esto,
cambia el valor de `peer. ort` en el archivo de configuración,
o añadir una bandera `peer.port` al comando cuando inicies RSKj.

````mdx-code-block
<Tabs>
  <TabItem value="code" label="Linux, Mac OSX" default>
     ```shell
      $ java -Dpeer.port=50505 -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
    ```
  </TabItem>
  <TabItem value="windows" label="Windows">
    ```shell
    C:\> java -Dpeer.port=50505 -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
    ```
  </TabItem>
</Tabs>
````
