---
sidebar_label: Referencia
title: Referencia de minería combinada
tags:
  - rsk
  - minando
  - bitcoin
description: La manera en que Rootstock aprovecha el mecanismo de consenso de la red Bitcoin para su propia secruidad, y añade características adicionales para prevenir el doble gasto
---

Satoshi consensus, basado en la prueba de trabajo (PoW), es el único sistema de consenso que previene la reescritura de la historia del blockchain a un bajo costo. La comunidad académica está impulsando el conocimiento y el estudio de la prueba de juego (PoS) como una alternativa, pero actualmente PoW proporciona la más alta seguridad probada. La minería combinada es una técnica que permite a los mineros de bitcoin extraer otras criptomonedas simultáneamente con un costo marginal casi nulo. La misma infraestructura minera y configuración que utilizan para minar Bitcoins se reutiliza para minar Rootstock (RSK) simultáneamente. Esto significa que, a medida que Rootstock premia a los mineros con tarifas de transacción adicionales, el incentivo para la minería fusionada se vuelve alto.

Hemos identificado tres fases para el crecimiento de la fusión de Rootstock:

- Fase de Bootstrap: La fusión de minería es inferior al 30% del hashrate de Bitcoin.
- Fase estable: La minería combinada está entre el 30% y el 60% del hashrate de Bitcoin.
- Fase madura: La minería combinada es superior al 60% del hashrate de Bitcoin.

Rootstock ha dejado atrás su fase de arranque, cuando los mineros de fusiones deshonestos podrían teóricamente revertir el blockchain de Rootstock a un bajo costo. A partir de diciembre de 2021, más del 50% de los mineros de Bitcoin se dedican a la fusión de RootStore. Pero como los costos de Rootstock siguen siendo bajos en comparación con la recompensa de bloque de Bitcoin, el costo de atacar a Rootstock a través del doble gasto es menor que el de Bitcoin.
Rootstock tiene algunas propiedades para reducir el riesgo de ataques de doble gasto, como la madurez de las recompensas de los mineros. El equipo de investigación de RootstockLabs ha desarrollado varias protecciones para prevenir ataques durante las fases estables y maduras del proyecto:

- _**Notificaciones firmadas:**_ Los clientes Rootstock pueden hacer uso de notificaciones firmadas por notarios. Los nodos pueden usar estas notificaciones para detectar ataques de Sybil e informar al usuario.
- _**Trails transparentes de doble gasto:**_ este es un método donde todas las etiquetas de Rootstock se combinan con la información adicional que se puede utilizar para detectar bifurcaciones de Rootstock egoístas que son públicas en la blockchain de Bitcoin. Las pruebas de bifurcación se construyen automáticamente y estas pruebas se presentan a los nodos Rootstock que las propagan por la red. Las pruebas obligan a los nodos a entrar en un “modo seguro” donde no se anuncia ninguna transacción como confirmada. El modo seguro evita que los comerciantes y los intercambios acepten pagos que podrían ser de doble gasto. Una vez que el auto-fork probado es superado por el mainchain Rootstock en PoW acumulado, la red se revierte a su estado normal. Este método es un elemento disuasorio para cualquier intento de doble gasto de Rootstock en el que el minero malicioso todavía intente recoger recompensas de Bitcoin cuando extraiga el tenedor egoísta.

Una vez que la plataforma entre en la fase de madurez, estimamos que la seguridad de Rootstock será suficiente para apoyar la economía de la inclusión financiera mundial.

## Características principales:

- [Protocolo de consenso REMASC](/node-operators/merged-mining/remasc/)
- Un día de madurez para la recompensa de extracción
- No hay pérdida de eficiencia en la minería de bitcoins que se espera de la minería de fusiones (para cambiar de estado medio tardío)
