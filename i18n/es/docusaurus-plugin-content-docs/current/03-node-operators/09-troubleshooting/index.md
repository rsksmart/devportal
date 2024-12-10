---
title: Solución de problemas
sidebar_label: Solución de problemas
sidebar_position: 11
tags:
  - rsk
  - rskj
  - rootstock
  - nodo
  - faq
  - solución de problemas
description: Cómo resolver algunos problemas conocidos o encontrados con frecuencia al trabajar con RSKj
---

Esta sección explica cómo resolver algunos problemas conocidos o encontrados con frecuencia.

Si lo que necesitas no está en esta sección, **contáctanos** sin dudarlo a través de la [Comunidad de Rootstock en Discord](https://rootstock. o/discord). ¡Estaremos encantados de ayudarle!

````mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">Discovery no se puede iniciar</Accordion.Header>
    <Accordion.Body>
        - En Windows, si arrancas el nodo y no hace nada, es muy probable que tengas un problema con el puerto UDP del nodo.
        - El puerto UDP se configura en el fichero de configuración del nodo, concretamente con el valor `peer.port`. Por defecto este puerto está configurado a `5050`.
        - Para comprobar si ese puerto ya está ocupado por otra aplicación puedes seguir estos pasos:
        - Abra una consola `cmd` y ejecute `netstat -ano -p UDP | findstr :5050` (o sustituya `5050` por el puerto de su preferencia).
        - Obtendrás un resultado con el ID del proceso (si lo hay) que ya está usando ese puerto para UDP.
        - Con el ID del proceso (el valor en el extremo derecho), ejecute este comando `tasklist /FI "PID eq processId-you-got"`.
        - Esto le permitirá saber qué aplicación/servicio está utilizando este puerto.
        - Por favor, asegúrese de que el puerto de su preferencia no está ocupado por otra aplicación. Si es así, necesita cambiar la [configuración del nodo](/node-operators/setup/configuration/preferences), sobrescribiendo el [peer](/node-operators/setup/configuration/preferences).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">No veo los logs</Accordion.Header>
    <Accordion.Body>
       - Puedes configurar tu propio nivel de log, siguiendo estas [instrucciones](/node-operators/setup/configuration/verbosity).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">Plugin con id testigo no encontrado</Accordion.Header>
    <Accordion.Body>
        - Si tienes este error es posible que hayas omitido ejecutar las dependencias de rskj.
        - Así que, por favor, sigue las instrucciones dependiendo de tu sistema operativo:
        - [En Windows](/node-operators/setup/node-runner/windows)
        - [En Linux](/node-operators/setup/node-runner/linux)
        - [En Mac](/node-operators/setup/node-runner/macos)
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">Trufa no parece funcionar conectado a Rootstock</Accordion.Header>
    <Accordion.Body>
       - Si usted no puede conseguir `truffle migrate` completa, verá algo como:
        ``javascript
            Escribiendo artefactos a ./build/contracts
            Usando la red 'development'.
            Ejecutando migración: 1_initial_migration.js
            Desplegando migraciones...
            0xc82d661d579e40d22c732b2162734f97aeb13fa095946927cbb8cd896b26a7a3
        ```
        - Asegúrate de que estás usando la configuración correcta en los ficheros `truffle.js` y `truffle-config.js`.
        - Recuerda que necesitas: **node host**, **node port**, **network_id** y en algunos casos el **from** (por defecto Truffle usa la primera cuenta del nodo). Esta última debe ser una cuenta con saldo positivo (porque es la que utiliza Truffle para desplegar contrato y ejecutar transacciones) y debe estar presente entre las cuentas del nodo (puedes saberlo ejecutando el comando `web3.eth.accounts`).
        - Por lo tanto, su archivo de configuración debe ser así
        ``` javascript
        module.exports = {
        networks : {
            rsk: {
                from : "0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826",
                host : "localhost",
                port : 4444,
                network_id : "*" // Coincide con cualquier id de red
                }
            }
        };
        ```
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">No se puede obtener la IP pública</Accordion.Header>
    <Accordion.Body>
        - Si obtienes el error:
        - `Can't get public IP` cuando estás intentando ejecutar tu nodo rskj, la razón es que rskj utiliza el servicio Amazon Check IP para establecer el parámetro [`public.ip`](/node-operators/setup/configuration/reference/).
        - Para solucionarlo, necesitas cambiar la clave `public.ip` en el archivo config con tu dirección IP (si no conoces tu IP, simplemente [búscala](https://www.google.com/search?q=what's+my+IP+address)).
        - Visita la página [Config](/node-operators/setup/configuration/) para cambiar el archivo de configuración de un nodo.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">Rebobinar bloques</Accordion.Header>
    <Accordion.Body>
        - Esta herramienta debería utilizarse en un escenario en el que un nodo RSK procesa bloques que están corruptos o no son válidos, por ejemplo después de una bifurcación dura. Permite eliminar dichos bloques y comenzar desde un estado previamente conocido. Para ello, elimina los bloques con un número de bloque superior al argumento de línea de comandos del parámetro de número de bloque.
        - Nota: El nodo debe estar apagado antes del rebobinado, y reiniciado después.
        - Ejemplo:
        `java -cp rsk-core-<VERSION>.jar co.rsk.cli.tools.RewindBlocks 1000000`
        - El comando anterior elimina los bloques con número 1000001 o superior.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">DbMigrate: Migrar entre bases de datos</Accordion.Header>
    <Accordion.Body>
       - Esta herramienta permite al usuario migrar entre diferentes bases de datos soportadas como `rocksdb` y `leveldb`.
        - Como usar
           - Para usar la herramienta `DbMigrate` para migrar entre bases de datos, necesitaremos una clase de herramienta y argumentos CLI.
        - La clase de la herramienta es: `co.rsk.cli.tools.DbMigrate`
        - Argumentos CLI necesarios:
            - `args[0]` - base de datos destino donde vamos a insertar la información de la base de datos seleccionada actualmente.
            - Nota: No se puede migrar a la misma base de datos o se lanzará un error. Es muy recomendable apagar el nodo para realizar la migración ya que se podrían perder los últimos datos.> > - Ejemplo migrando de `leveldb` a `rocksdb`:
            - `java -cp rsk-core-<VERSION>.jar co.rsk.cli.tools.DbMigrate rocksdb`
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3"> ERROR: failed to solve: fallo al leer dockerfile</Accordion.Header>
    <Accordion.Body>
        - El primer error indica que Docker no pudo encontrar el `Dockerfile` en tu directorio actual. Asegúrate de que estás en el directorio correcto o especifica la ruta al `Dockerfile`
        - Si tu Dockerfile está en txt, mueve el Dockerfile.txt a Dockerfile: `mv /ruta/a/Dockerfile.txt /ruta/a/Dockerfile`
        - Procede con el comando `Docker Build`: `docker build -t regtest /ruta/a/rskj-node-jar`
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">ADVERTENCIA: La plataforma de la imagen solicitada (linux/amd64) no coincide</Accordion.Header>
    <Accordion.Body>
       - Esta advertencia indica que la plataforma de la imagen no coincide con la plataforma de su máquina anfitriona. La imagen está construida para la arquitectura linux/amd64, pero su máquina anfitriona es de arquitectura linux/arm64/v8.
        - Utilice una imagen compatible: `docker run -d --name rsk-node -p 4444:4444 -p 50505:50505 rsksmart/rskj:arm64v8-latest node --regtest`
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
````
