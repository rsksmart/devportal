---
title: Actualizando el nodo
sidebar_label: Actualizando el nodo
sidebar_position: 200
tags:
  - rsk
  - rskj
  - nodo
  - actualizar
  - versión
  - rootstock
description: Cómo introducir reglas de consenso cambia usando actualizaciones de red en un nodo RSK. Qué hacer.Añadiendo una nueva regla. Ejecutando pruebas con nuevas reglas.
---

## 1. Descargar rskj

Descarga la última versión del [repositorio de Github](https://github.com/rsksmart/rskj/releases).

## 2. Actualizar archivo jar

Ten en cuenta que `PREVIOUS` y `NEW` se refieren a números de versión.

```bash
cd /usr/share/rsk
sudo servicio rsk stop
sudo mv rsk.jar rsk-PREVIOUS.jar
sudo mv rskj-core-NEW-all.jar rsk.jar
```

## 3. Limpiar directorio de log

Este paso es opcional.

```bash
sudo mkdir /var/log/rsk/PREVIOUS/
sudo mv /var/log/rsk/rsk* /var/log/rsk/PREVIOUS/
sudo servicio rsk start
```

## 4. Validar el servicio se ejecuta normalmente

Comprobar registros:

```bash
tail -f /var/log/rsk/rsk.log
```

Compruebe que Blockchain se está moviendo hacia adelante, y añadiendo bloques:

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber", "params": {}, "id":123}' http://127. .0.1:4444 | jq .result | tr -d '"' | awk '{print "printf \"%d\\n\" "$0}' | sh
```

Si ejecutas este comando un par de veces y el número de bloque aumenta,
significa que también está sincronizando correctamente.