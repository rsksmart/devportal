---
sidebar_label: Automóvil
title: Ejecutar con autominer (Ganache-like)
tags:
  - rsk
  - rskj
  - rootstock
  - nodo
  - configuración
description: Aprende cómo ejecutar el nodo Rootstock con autominer - similar a la configuración predeterminada de Ganache
---

[Ganache](https://trufflesuite.com/docs/ganache/quickstart/) la red local se ejecuta como lo que Rootstock (RSK) llama `autominer mode`, él:

- Crea bloques cuando se envían nuevas transacciones al nodo
- No se crearán bloques si no se envían transacciones
- Permite minar bloques manualmente a través de RPC
- (opcionalmente) Borrar la base de datos al reiniciar

Para configurar el nodo, vamos a:

1. Ejecutarlo en modo `--regtest`
2. Usar una configuración personalizada para activar el autominer

La configuración que necesitamos utilizar es:

```
miner.client.autoMine = verdadero
```

Crea un archivo `autominer.conf` en la raíz del repositorio (u otro dir., recuerda usar la ruta correcta después)

Esta opción puede activarse cuando se utiliza el nodo en diferentes modos

### Configurar Autominer en IntelliJ

Además de la configuración predeterminada (versión Java y clase principal), necesitaremos añadir

- Argumentos del programa: `--regtest` y opcionalmente `--reset` para reiniciar la base de datos al reiniciar
- Opciones de MV: `-Drsk.conf.file=./autominer.conf` (o la ruta que elegiste)

Debería verse así:

![autominer\_inellij\_config](/img/rsk/autominer_intellij_config.png)

### Configurar Autominer en CLI

Para configurar el autominer en CLI, utilice el comando de abajo;

> Utilice esto si está corriendo con JAR.

```java
java -cp rskj-core-4.1.0-HOP-all.jar -Drsk.conf.file=./autominer.conf co.rsk.Start --regtest --reset
```

## Resultado

¡Ahora tienes un nodo Rootstock corriendo localmente! Sólo creará bloques para nuevas transacciones, o arbitrariamente usando la llamada RPC `evm_mine`.

Ver la imagen gif a continuación, por ejemplo, sobre cómo hacer esto;

![autominer\_demo](/img/rsk/autominer_demo.gif)
