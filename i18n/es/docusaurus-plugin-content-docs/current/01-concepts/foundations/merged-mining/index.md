---
sidebar_position: 7
title: ¿Qué es la Minería Fusionada?
sidebar_label: Minería Fusionada
tags:
  - rsk
  - rootstock
  - conceptos
  - minería fusionada
description: Cómo funciona la minería fusionada de Rootstock con Bitcoin y sus beneficios.
---

La [minería fusionada](https://rootstock.io/mine-btc-with-rootstock/) es el proceso que permite que la blockchain de Rootstock se mine simultáneamente con la blockchain de Bitcoin. Esto es posible porque ambas cadenas utilizan el mismo algoritmo de prueba de trabajo (PoW) con doble SHA-256.

<Button href="/node-operators/merged-mining/getting-started/">Comencemos</Button>

## ¿Cómo funciona?

Los pools de minado de Bitcoin incluyen una referencia al bloque de Rootstock en cada tarea de minería que entregan a los mineros.
Cada vez que los mineros encuentran una solución, esta se compara con las dificultades de ambas redes (Bitcoin y Rootstock), lo que arroja tres posibles resultados:

- La solución satisface la dificultad de la red de Bitcoin. Por lo tanto, se ensambla un bloque y se envía a la red. La referencia de minería fusionada de Rootstock se incluirá, pero será ignorada por la red de Bitcoin. Dado que la dificultad de la red de Rootstock es menor que la de Bitcoin, esta solución también funcionará para Rootstock y puede ser enviada a la red.
- La solución no satisface la dificultad de la red de Bitcoin, pero sí la de la red de Rootstock. Como consecuencia, la solución se enviará a la red de Rootstock, pero no a la red de Bitcoin.
- La solución solo satisface la dificultad del pool, que es muchas veces menor que la dificultad de las redes de Bitcoin o Rootstock, y no se envía a ninguna red.

La solución enviada a la red permite que el nodo construya una prueba SPV. Si la prueba es válida, se incluye como parte del bloque que será enviado a la red.

<div class="video-container">
  <iframe width="949" height="534" src="https://youtube.com/embed/l3DkV2tkjU0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## ¿Cuáles son las ventajas?

Los mineros obtienen un alto porcentaje de las comisiones de transacción del bloque de Rootstock que minan. Este proceso de minería se realiza con la misma potencia de hash utilizada en la minería de Bitcoin, y no tiene ningún costo o impacto adicional.

## ¿Cuál es la potencia de hash actual de la red Rootstock?

Puede ver la potencia de hash de la red Rootstock en el [sitio web de estadísticas de Rootstock](https://stats.rootstock.io).

## Detalles de implementación de los pools de software de minería

Consulte la [Guía de implementación para comenzar](/node-operators/merged-mining/getting-started/).
