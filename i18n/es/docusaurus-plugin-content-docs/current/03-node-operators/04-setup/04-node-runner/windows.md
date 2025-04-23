---
sidebar_label: Ventanas
sidebar_position: 600
title: Cómo compilar y ejecutar un nodo RSKj en Windows
tags:
  - rsk
  - rskj
  - nodo
  - contribuir
  - operadores de nodos
  - ventanas
description: Cómo compilar y ejecutar un nodo RSKj en Windows. Instalar pre-requisites. Obtener código fuente. Asegurar la cadena de seguridad. Obtener dependencias externas. Compilar y ejecutar. Configurando su IDE.
---

Aquí tiene los pasos para compilar y ejecutar un nodo Rootstock en Windows.

## Configuración IDEA de IntelliJ

### Compilando el nodo

Después de abrir IDEA, necesitamos cargar el proyecto RSKj, esto se puede hacer usando la opción _Importar proyecto_ en IDEA.

Para hacerlo sigue los siguientes pasos:

- Ve a _Archivo_ -> _Nuevo_ -> _Proyecto de fuentes existentes..._
- Navega en el código descargado de RSKj el archivo `rskj\build.gradle` y selecciónalo.
- Dentro del cuadro de diálogo, seleccione _Usar envoltorio de gradle predeterminado_ y luego pulse _Finalizar_.

![img](/img/rsk/howToInstallAndRun/IdeaRskJWelcome.png)

#### Configuración de compilación/ejecución de IDEA

We need to create a new configuration profile to run the node from IDEA.
That can be done by clicking on _Run_ -> _Edit Configurations_ or as shown in the following picture:

![img](/img/rsk/howToInstallAndRun/EditConfigs.png)

A continuación, establezca las opciones como se muestra a continuación:

![img](/img/rsk/howToInstallAndRun/AddNewConfig.png)

- Clase principal: `co.rsk.Start`
- Directorio de trabajo: `/path/to/code/rskJ`
- Usa classpath del módulo: `rskj-core_main`
- JRE need to be set as: `Default (17 - SDK of 'rsk-core_main' module)`

:::info\[Info]

- Si no está configurado el JDK por defecto, tiene que establecerlo en: _Archivo -> Estructura del proyecto_.
- Si el IDE no reconoce las opciones de configuración, abre `rskj/rskj-core/build.gradle` y sincroniza desde la pestaña `Gradle`.
   :::

#### Ejecutar el nodo

Estamos listos para ejecutar el nodo usando IDEA, simplemente pulse el botón _Inicio_ a la derecha de la configuración que acabamos de crear.

![img](/img/rsk/howToInstallAndRun/Run.png)

Si todo está bien, debería ver la información de depuración así:

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

```
{
   "java.jdt.ls.java.home": "C:\\jdk-17",
   "java.configuration. untimes": [
      {
        "name": "JavaSE-1. ",
        "ruta": "C:\\jdk-1. ",
        "default": true
      },
      {
        "name": "JavaSE-17",
        "ruta": "C:\\jdk-17",
      },
    ]
}
```

En este ejemplo, hemos configurado `Java 17` para [Pack de extensiones para Java](https://marketplace.visualstudio.com/items?itemName=vscjava. scode-java-pack) para funcionar como se esperaba y el compilador de Java predeterminado es `Java 1.8`. Estas rutas deberían apuntar a tu casa java.

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