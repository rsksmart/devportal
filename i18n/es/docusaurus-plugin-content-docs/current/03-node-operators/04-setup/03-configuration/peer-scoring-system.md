---
title: Sistema de puntuación de pares
sidebar_label: Sistema de puntuación de pares
sidebar_position: 600
tags:
  - rsk
  - rskj
  - nodo
  - configuración
  - par
  - puntuación
description: " El sistema de puntuación de pares protege los recursos del nodo RSKj de pares abusivos o maliciosos"
---

El principal objetivo del **Sistema de Puntuación Pare** es proteger los recursos de [Rootstock node's](/node-operators/setup/) de pares abusivos o maliciosos.
por esto, el nodo Rootstock mantiene un seguimiento de
una reputación por cada par que se conecta a
y desconecta aquellos cuya reputación actual
cae por debajo de los niveles aceptables.

## Acciones

Hay tres posibles acciones que el sistema de puntuación de pares puede realizar:

- Grabar un evento
- Penalización automática de nodos de pares
- Prohibir y desbanear manualmente los nodos de pares

### Grabando un evento

Todos los escenarios de disparo de eventos comenzarán por el nodo recibiendo un mensaje de un compañero.

Todos los mensajes se registran automáticamente como eventos.
Sin embargo, para la versión actual,
solo algunos de ellos tienen un impacto negativo
en la reputación del compañero.
Estos eventos son:

- **`INVALID_NETWORK`**: Esto ocurre cuando el ID de red recibido es diferente del ID de red del nodo.
- **`INVALID_BLOCK`**: Esto sucede cuando el bloque recibido no es válido según los requerimientos de validación de bloques RSK.
- **`INVALID_MESSAGE`**: Esto sucede cuando el mensaje recibido no es válido según los requerimientos de validación de mensajes RSK.

If one of these events is recorded,
the peer’s reputation will be marked accordingly,
and the penalisation process will start automatically.
This occurs only in nodes where the peer scoring feature is enabled.

### Penalización automática de nodos pares

Un par con mala reputación será castigado,
lo que significa que cuando el nodo recibe un mensaje de él,
el par será automáticamente desconectado
y el mensaje recibido será descartado.
Los Penitenciarios se aplican en dos niveles:

- La `dirección` del par, y
- el `nodeID` del peer.

La duración por defecto para el primer castigo es de 10 minutos.
Esto se puede cambiar mediante la configuración del nodo RSK:

- `scoring.addresses.duration` para el nivel `address`
- `scoring.nodes.duration` para el nivel `nodeID`

Estos valores se especifican en minutos.

It is worth mentioning that penalty duration
will be incremented by a percentage value
each time a penalty is applied to a peer.
The default increase rate is 10%.
This can be changed via the RSK node configuration:

- `scoring.addresses.increment` para el nivel `address`
- `scoring.nodes.increment` para el nivel `nodeID`

Es posible definir un tiempo máximo para que un nodo permanezca en un estado penalizado,
que el valor por defecto es 7 días para el nivel de `dirección` y 0 (ilimitado) para el nivel de `nodeID`.
Esto se puede cambiar mediante la configuración del nodo RSK:

- `scoring.addresses.maximum` para el nivel `address`
- `scoring.nodes.maximum` para el nivel `nodeID`

Estos valores se especifican en minutos.

### Prohibición manual de nodos pares

A banned peer is considered as a peer with a bad reputation.
Therefore, it will be disconnected the next time a message is received,
and its messages will be discarded.
However, the action of banning a peer,
unlike the Rootstock nodes’s automatic reputation tracking,
is a manual action.

Para banear o desbanear manualmente a un peer, esto puede hacerse por dirección,
deben utilizarse los siguientes [métodos RPC](/node-operators/json-rpc/methods/):

- `sco_banAddress(String address)`:
    - Elimina una dirección o bloque a la lista de direcciones prohibidas.
- `sco_unbanAddress(String address)`:
    - Elimina una dirección o bloque de direcciones de la lista de direcciones prohibidas.

Para comprobar qué direcciones están prohibidas, utilice el siguiente método:

- `sco_bannedAddresses()`:
    - Devuelve la lista de direcciones y bloques bloqueados

> Advertencia: Estos métodos deben ser utilizados con precaución.

### Configuración de funcionalidad

Esto se puede cambiar mediante la configuración del nodo RSK:

- `scoring.penishmentEnabled`

Este valor se especifica como un booleano.

> Advertencia: La recomendación es mantener los valores predeterminados, esta es una característica compleja y poderosa que debe ser usada con precaución.

### Métodos RPC

Los siguientes métodos de RPC relacionados están disponibles.

- `sco_banAddress(String address)`: see [Manualmente banning of peer nodes](#manual-banning-of-peer-nodes).
- `sco_unbanAddress(String address)`: see [Manualmente banning of peer nodes](#manual-banning-of-peer-nodes).
- `sco_bannedAddresses()`: see [Bloqueo manual de nodos pares](#manual-banning-of-peer-nodes).
- `sco_peerList()`: Devuelve la información de puntuación de pares recolectada
- `sco_reputationSummary()`: Devuelve el resumen de reputación de todos los pares conectados
- `sco_clearPeerScoring(String id)`: Limpieza de puntaje para la id recibida (en primer lugar intentada como una dirección, usada como un nodeID de otra manera).

**Tenga en cuenta que la configuración por defecto y recomendada NO es exponer estos métodos públicamente**.
