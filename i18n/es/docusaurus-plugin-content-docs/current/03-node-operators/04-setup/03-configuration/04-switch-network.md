---
title: Cambiar red
sidebar_position: 400
sidebar_label: Cambiar red
tags:
  - rsk
  - rskj
  - nodo
  - configuración
  - red
  - red principal
  - testnet
  - regtest
description: Cómo cambiar el nodo RSK entre las redes Mainnet, Testnet y RegTest
---

Si desea cambiar su nodo a redes Mainnet, Testnet, o RegTest:

1\. Si su nodo no está en `localhost`, conecte su computadora al nodo a través de `ssh`.

```shell
usuario@servidor ssh
```

2\. Elige una red a la que quieras conectarte.

#### Regtest

Para cambiar de otra red a Regtest:

```bash
sudo servicio rsk stop
cd /rsk
sudo rm -f node.conf
sudo ln -s regtest.conf node.conf
sudo servicio rsk start
```

Usando esta red, le permite comenzar con algunas carteras (cuentas) en su nodo. Estas carteras tienen fondos.

#### Testnet

Para cambiar de otra red a Testnet:

```bash
sudo servicio rsk stop
cd /rsk
sudo rm -f node.conf
sudo ln -s testnet.conf node.conf
sudo servicio rsk start
```

#### Para Mainnet

Para cambiar de otra red a Mainnet:

```bash
sudo servicio rsk stop
cd /rsk
sudo rm -f node.conf
sudo ln -s mainnet.conf node.conf
sudo servicio rsk start
```

Ejecutando estas instrucciones en su shell, es:

- Detener el servicio RSK en ejecución.
- Moviendo a la carpeta de configuración de RSK (`cd`).
- Quitando `node.conf`, ese es un enlace simbólico a la configuración que estás usando (`rm` lo elimina).
- Vinculando `node.conf` con el archivo de configuración que decidas (`ls` con la opción `-s`, hace enlaces simbólicos - o _soft_ - ). El nodo está configurado para leer directamente desde el enlace `node.conf`.
- Reiniciando el servicio RSK.
