---
sidebar_label: MacOS
sidebar_position: 400
title: Cómo compilar y ejecutar un nodo RSKj en Mac OS
tags:
  - rsk
  - rskj
  - nodo
  - contribuir
  - mac
  - osx
description: Cómo compilar y ejecutar un nodo RSKj en Mac OSX. Instalar pre-requisites. Obtener código fuente. Asegurar la cadena de seguridad. Obtener dependencias externas. Compilar y ejecutar. Configurando su IDE.
---

Aquí tiene los pasos para compilar y ejecutar un nodo Rootstock en Mac.

## Requisitos previos

En primer lugar, necesitará instalar:

| Dependencia                                                                                       | Detalles                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Git para Mac](https://git-scm.com/download/mac)                                                  | Descargar esta herramienta de línea de comandos de Git                                                                                                                                          |
| [Java 8 JDK](http://www.oracle.com/Technetwork/java/javase/downloads/jdk8-downloads-2133151.html) | Siga los pasos para instalar Java. Para comprobar si la instalación ha ido correctamente, compruebe la versión con el comando: `java -version`. |

IDs recomendados:

- [Comunidad IDEA de IntelliJ](https://www.jetbrains.com/idea/download/#section=linux)
- [Codigo Visual Studio](https://code.visualstudio.com/)

Para completar la instalación de Java necesitas configurar la variable de entorno `JAVA_HOME`.
Tienes que ejecutar los siguientes comandos en la terminal:

```bash
./usr/libexec/java_home

.export JAVA_HOME=`/usr/libexec/java_home`

.launchctl setenv JAVA_HOME `/usr/libexec/java_home`

```

## Obtener el código fuente

Usando la herramienta Git de línea de comandos instalada, necesita recuperar (o clonar) el código fuente de RSKj Github de [here](https://github.com/rsksmart/rskj).

Ejecutar estos comandos en la línea de comandos de Git:

```shell
git clone --recursive https://github.com/rsksmart/rskj.git
cd rskj
git checkout tags/ARROWHEAD-6.0.0 -b ARROWHEAD-6.0.0
```

_Nota:_ Es mejor descargar el código en una ruta corta.

## Asegurar la cadena de seguridad

[Asegurar la cadena de seguridad](/node-operators/setup/security-chain/) del código fuente descargado.

## Obtener dependencias externas

Antes de lanzar IntelliJ IDEA, hay un paso importante.
Navega en tu directorio clonado de RSKj y luego inicia `configure.sh` con el siguiente comando de terminal:

```shell
./configure.sh
```

Esto descargará y establecerá componentes importantes (p.e. Envoltura de gradle).

## Configuración IDEA de IntelliJ

### Compilando el nodo

Ahora, puedes lanzar IntelliJ IDEA.
Cuando se inicia IntelliJ IDEA, deberías tener una ventana con diferentes opciones.

- Elegir _Importar proyecto_.
- Navega en el RskJ descargado código del archivo `rskj\build.gradle` y selecciónalo. Haz clic en _NEXT_.
- Dentro del cuadro de diálogo, seleccione _Usar envoltorio de gradle predeterminado_ y luego haga clic en _Finalizar_.
  _Mantener IntelliJ IDEA abierto_.

![img](/img/rsk/howToInstallAndRun/IdeaRskJWelcome.png)

#### Configuración de compilación/ejecución de IDEA

We need to create a new configuration profile to run the node from IDEA.
That can be done by clicking on _Run_ -> _Edit Configurations_ or as shown in the following picture:

![img](/img/rsk/howToInstallAndRun/EditConfigs.png)

A continuación, establezca las opciones como se muestra a continuación:

![img](/img/rsk/howToInstallAndRun/AddNewConfig.png)

- Clase principal: `co.rsk.Start`
- Directorio de trabajo: `/path-to-code/rskJ`
- Usa classpath del módulo: `rskj-core_main`
- El JRE necesita ser definido como: `Default (1.8 - SDK del módulo 'rsk-core_main')`

#### Ejecutar el nodo

Estamos listos para ejecutar el nodo usando IDEA, simplemente pulse el botón _Start_ (flecha verde) a la derecha de la configuración que acaba de crear.

![img](/img/rsk/howToInstallAndRun/Run.png)

Si todo está bien debería ver la información de depuración como esa:

![img](/img/rsk/howToInstallAndRun/Running.png)

¡Y sí! ¡Felicidades! Ahora estás ejecutando un nodo local Rootstock :)

Te has unido a Mainnet por defecto.

Si desea cambiar la red, agregar:

- Para Testnet: `--testnet`
- Para lamentar: `--regtest`

Dentro del campo `Argumentos del programa` en la configuración de ejecución.

## Configuración del código Visual Studio

### Plugins recomendados

- [Pack de extensión para Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack).
- [Plugin de Gradle](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle)

#### Archivos de configuración de Visual Studio:

Para configurar la configuración de JDK, usamos `.vscode/settings.json`. Aquí podemos configurar la última versión de JDK para [Pack de extensiones para Java](https://marketplace. isualstudio.com/items?itemName=vscjava.vscode-java-pack), luego use la versión recomendada para RSKj, por ejemplo:

**.vscode/settings.json**

```text
{
   "java.jdt.ls.java.home": "/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home",
   "java.configuration. untimes": [
      {
        "name": "JavaSE-1. ",
        "ruta": "/Library/Internet Plug-Ins/JavaAppletPlugin. lugin/Contents/Home",
        "default": true
      },
      {
        "name": "JavaSE-17",
        "ruta": "/Library/Java/JavaVirtualMachines/temurin-17. dk/Contenidos/Inicio",
      },
    ]
}
```

En este ejemplo, hemos configurado `Java 17` para [Pack de extensiones para Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack) para funcionar como se esperaba y el compilador de Java predeterminado es `Java 1.8`.

Para listar estas rutas se puede ejecutar:

```bash
/usr/libexec/java_home -V
```

o

```bash
whereis java
```

Tenga en cuenta que la ruta puede variar dependiendo de cómo la instaló.

Para construir, ejecutar o depurar RSKj, usamos `.vscode/launch.json`. Aquí podemos configurar los comandos que se usarán para ejecutar nuestra aplicación, por ejemplo:

**.vscode/launch.json**

```text
{
    // Utilice IntelliSense para aprender sobre posibles atributos.
    // Aplique para ver las descripciones de los atributos existentes.
    // Para más información, visite: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2. ",
    "configurations": [
        {
            "type": "java",
            "nombre": "Ejecutar RSK Start",
            "solicitud": "lanzar",
            "mainClass": "co. sk.Start",
            "args" : "--testnet -Xkeyvalue. atasource=leveldb"
        }
    ]
}
```

En este ejemplo vamos a ejecutar la aplicación con los siguientes argumentos: `--testnet -Xkeyvalue.datasource=leveldb`.

#### Ejecutar el proyecto

Estamos listos para ejecutar el nodo usando Visual Studio Code, seleccione su configuración desde `launch.json` dentro de `Ejecutar y Debug`.

![img](/img/rsk/howToInstallAndRun/VSCode_Launch.png)

Haga clic en `start (icono de reproducción verde a la izquierda de su nombre de configuración)`.

![img](/img/rsk/howToInstallAndRun/VSCode_Run.png)

Un menú de herramientas de depuración aparece en la parte superior de la ventana IDE, ¡si pudiera ejecutar el nodo paso a paso!

#### Construyendo el proyecto con Gradle en Visual Studio Code

Para construir el proyecto usando `Gradle`, podemos simplemente ir a la pestaña correspondiente. En la pestaña, deberíamos ser capaces de ver todas las configuraciones disponibles de `Gradle` desde la aplicación. Seleccione el proyecto a construir y haga doble clic en el `Gradle Task` deseado.

![img](/img/rsk/howToInstallAndRun/VSCode_Gradle.png)

#### Pruebas en Visual Studio Code

Para ejecutar las pruebas, podemos simplemente ir a la pestaña `Testing` donde puedes ver todas las pruebas. También podemos ir directamente al archivo de prueba y hacer clic derecho en el icono a la izquierda de una declaración de una prueba y luego decidir ejecutar o depurar la prueba.

![img](/img/rsk/howToInstallAndRun/VSCode_Test_Debug.png)

## ¿Algún problema?

Échale un vistazo a la [sección de solución de problemas](/node-operators/troubleshooting/), ¡espero que ayude!
