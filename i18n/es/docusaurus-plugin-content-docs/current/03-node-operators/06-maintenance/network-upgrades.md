---
title: Actualizaciones de red
sidebar_label: Actualizaciones de red
sidebar_position: 100
tags:
  - rsk
  - rskj
  - nodo
  - contribuir
  - mejorar
  - protocol
  - consenso
  - rskip
description: Cómo introducir reglas de consenso cambia usando actualizaciones de red en un nodo RSK. Qué hacer.Añadiendo una nueva regla. Ejecutando pruebas con nuevas reglas.
---

## ¿Qué es una actualización de red?

Una actualización de red es un cambio o un grupo de cambios a las reglas de consenso de protocolo, las cuales se activan en un número de bloque definido.

## Qué considerar cuando se introduce un cambio de regla de consenso en el código

Cada cambio de regla de consenso debe estar asociado con una propuesta de mejora específica de RSKIP (RSK en el [repositorio github.](https://github.com/rsksmart/RSKIPs)

Los cambios en las reglas de consenso se introducen como parte de un grupo de cambios llamados Actualización de Red. Las actualizaciones de red se liberan al público en general como parte de una versión específica del nodo RSK (definida por el nombre del código de liberación y el número de versión. Por ejemplo: RSK Wasabi 1.0.0), y los cambios de regla de consenso introducidos son seleccionados por la comunidad.

## ¿Cómo añadir una nueva regla de consenso?

1. Establece la versión de lanzamiento (si aún no está definida en el código). Defina la nueva etiqueta en el archivo de enum `NetworkUpgrade`.
   ```java
   public enum NetworkUpgrade {
       WASABI_100("wasabi100"),
   }
   ```

2. Establece la altura del bloque de activación de actualización de red en archivos `[main||testnet||regtest||devnet].conf`

   ```conf
   # IE for main.conf

   blockchain.config {
       name = main
       hardforkActivationHeights = {
           wasabi100 = 1591000,
       }
   }
   ```

   > Para el desarrollo local sólo debes editar `regtest.conf`.

   > `[main||testnet||devnet].conf` sólo necesitará ser editado antes de un despliegue de NetworkUpdate, cuando la altura de activación de bloque ya es conocida.

3. Define la regla de consenso RSKIP en el archivo `ConsensusRule`.
   ```java
   public enum ConsensusRule {
       RSKIP106("rskip106"),
   }
   ```

4. Asocia el RSKIP anterior con una versión específica de actualización de red en el archivo `reference.conf`.
   ```conf
   blockchain = {
       config = {
           consensusRules = {
               rskip106 = wasabi100,
           }
       }
   }
   ```

## Codificando un cambio de regla de consenso para una actualización de red RSK

Al implementar una actualización de red deberás comprobar si ese cambio está activo:

```java
if (activations.isActive(ConsensusRule.RSKIP106) && address.equals(HD_WALLET_UTILS_ADDR_DW)) {
    return new HDWalletUtils(config.getActivationConfig(), HD_WALLET_UTILS_ADDR);
}
```

## Pruebas

Para ejecutar pruebas con cambios específicos de reglas de consenso, necesitará combinar métodos descritos previamente en `ActivationConfigTest.BASE_CONFIG`

```java
public class ActivationConfigTest {
    private static final Config BASE_CONFIG = ConfigFactory
        .parseString(String.join("\n",
            "hardforkActivationHeights: {",
            "    wasabi100: 0",
            "},",
            "consensusRules: {",
            "    rskip106: wasabi100,",
            "}"
    ));
}
```
