---
sidebar_position: 7
title: ¿Qué es la minería combinada?
sidebar_label: Minería fusionada
tags:
  - rsk
  - portainjertos
  - conceptos
  - minería fusionada
description: Cómo funciona la minería de fusión Rootstock con Bitcoin, y sus beneficios.
---

La [minería fusionada](https://rootstock.io/mine-btc-with-rootstock/) es el proceso que permite minar la blockchain de Rootstock simultáneamente con la blockchain de Bitcoin. Esto puede hacerse porque ambas cadenas utilizan el mismo algoritmo de prueba de trabajo (PoW), doble SHA-256.

[Comenzar](/node-operators/merged-mining/getting-started/)

## Cómo funciona

Los pools de minería de Bitcoin incluyen una referencia al bloque de Rootstock en cada trabajo de minería que entregan a los mineros.
Cada vez que los mineros encuentran una solución, se compara con las dificultades de ambas redes (Bitcoin y Rootstock), lo que arroja tres posibles resultados:

- La solución satisface la dificultad de la red Bitcoin. Por lo tanto, un bloque es ensamblado y enviado a la red. La referencia de minería combinada de Rootstock será incluida e ignorada por la red Bitcoin. Dado que la dificultad de red de Rootstock es menor que la de Bitcoin, esta solución también funcionará para Rootstock y podrá ser enviada a la red.
- La solución no satisface la dificultad de la red Bitcoin, pero sí la de la red Rootstock. En consecuencia, la solución se enviará a la red Rootstock, pero no a la red Bitcoin.
- La solución sólo satisface la dificultad del pool, que es muchas veces inferior a la dificultad de red de Bitcoin o Rootstock, y no se somete a ninguna red.

La solución enviada a la red permite al nodo construir una prueba SPV. Si la prueba es válida, se incluye como parte del bloque que se enviará a la red.

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/l3DkV2tkjU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## ¿Cuáles son las ventajas?

Los mineros obtienen un alto porcentaje de las comisiones por transacción del bloque de Rootstock que minan. Este proceso de minería se realiza con la misma potencia de hashing utilizada en la minería de Bitcoin, y no tiene ningún coste o impacto adicional.

## ¿Cuál es la potencia de hashing de la red Rootstock actual?

Puede ver la potencia de hashing de la red Rootstock en el [Sitio web de estadísticas de Rootstock](https://stats.rootstock.io).

## Detalles de implantación de los grupos de software de minería

Consulte la [Guía de implantación inicial] (/node-operators/merged-mining/getting-started/).
