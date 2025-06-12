---
title: Construcción del Peg de Bitcoin más seguro, sin permisos y no censurable
sidebar_position: 4
sidebar_label: Protocolo PowPeg
tags:
  - rsk
  - rootstock
  - rbtc
  - btc
  - arquitectura
  - protocolo powpeg
  - aplicación powpeg
description: Transferencia de BTC a RBTC, y RBTC a BTC a través del protocolo PowPeg.
render_features: powpeg-hsm-attestation-frame
---

El protocolo **PowPeg** de Rootstock ha madurado desde su creación en 2018 como una federación hasta incluir ahora muchas cualidades descentralizadas. El protocolo protege las claves privadas almacenadas en PowHSM de propósito especial basadas en elementos seguros (SE) a prueba de manipulaciones. Cada PowHSM ejecuta un nodo de Rootstock en modo SPV, por lo que las firmas solo pueden ser ordenadas mediante la prueba acumulativa de trabajo de la cadena. La seguridad en PowPeg se establece a través de la simplicidad de un diseño en capas que denominamos defensa en profundidad.

:::note Información

- La aplicación PowPeg está disponible en [Testnet](https://powpeg.testnet.rootstock.io/) y en [Mainnet](https://powpeg.rootstock.io/).
- Para obtener información general sobre el diseño y la arquitectura, cómo realizar una transacción peg-in utilizando Ledger y Trezor, preguntas frecuentes y operaciones avanzadas que puede realizar en el PowPeg, consulte la [Guía del usuario de PowPeg](/resources/guides/powpeg-app/).
- Obtenga información sobre los signatarios y la atestación en la sección de [Atestación del firmware HSM de PowPeg](/concepts/powpeg/hsm-firmware-attestation).
- Lea [Introducción al Modo Rápido: Obtenga RBTC a través de PowPeg, pero más rápido](https://blog.rootstock.io/noticia/get-rbtc-fast-mode/) para conocer la diferencia entre los Modos Nativo y Rápido al utilizar el PowPeg.
  :::

## La historia del protocolo PowPeg

Dos blockchains con formatos de bloque distintos pueden comunicarse de forma completamente descentralizada si cada una puede evaluar las reglas de consenso de la otra blockchain y si los mensajes entre cadenas no son censurados durante largos períodos de tiempo. Actualmente, solo las plataformas con contratos inteligentes con "completitud de Turing" pueden evaluar las reglas de consenso de otras blockchains. Bitcoin, para bien o para mal, carece de la capacidad de desbloquear monedas bajo predicados arbitrarios. Por lo tanto, cuando se creó Rootstock, tuvo que usar la única tecnología existente en Bitcoin para distribuir la confianza entre las partes: las firmas múltiples. Con una firma múltiple es posible asignar a un grupo de notarios la tarea de proteger los bitcoins bloqueados, tolerando una cierta cantidad de partes maliciosas, hackeadas o no disponibles.

Cuando se minó el bloque de la génesis de Rootstock, nació la Federación Rootstock, un conjunto autónomo de funcionarios destinados a proteger la firma múltiple. La federación estaba controlada por el Rootstock Bridge, un contrato inteligente imparable que se ejecuta en Rootstock y ha funcionado con éxito desde su creación. En 2020, la comunidad de Rootstock decidió que era hora de que el peg de Rootstock creciera, tanto en seguridad como en resistencia a la censura, evolucionando de un sistema federado al PowPeg. El PowPeg es un sistema único de peg bidireccional que asegura los bitcoins bloqueados con la misma tasa de hash de Bitcoin que establece el consenso. El conjunto de funcionarios todavía existe, pero su rol se limita principalmente a mantener su hardware y nodos conectados y funcionando en todo momento; no controlan directamente las claves privadas de la firma múltiple de Bitcoin. Consulte [Atestación del firmware HSM de PowPeg](/concepts/powpeg/hsm-firmware-attestation)

## El protocolo PowPeg en Rootstock

La estrategia de los investigadores y desarrolladores de Rootstock al diseñar el PowPeg difiere de la adoptada por otros equipos que han creado protocolos peg bidireccionales. El PowPeg de Rootstock se basa en un modelo de seguridad en capas, una práctica que denominamos "**defensa en profundidad**". La mayoría de los otros peg dependen de un único protocolo criptográfico abarcador que resuelve un problema de custodia multipartita de una manera intrincada. Estos protocolos criptográficos complejos son delicados y muy pocas entidades pueden auditarlos a fondo. A menudo, estos tipos de protocolos se ven vulnerados, lo que resulta en una pérdida repentina de seguridad para los usuarios.

Otros diseños recientes de peg bidireccionales se centran en incentivos criptoeconómicos que aprovechan la alta colateralización en un nuevo token. Sin embargo, usar un token diferente para la funcionalidad principal de la cadena lateral no está alineado con los valores de Bitcoin. El bridge PowPeg de Rootstock, en cambio, se basa en múltiples defensas o capas, siendo cada capa relativamente fácil de entender y probar. Este enfoque de defensa en profundidad es lo que ha permitido a Rootstock crecer desde su génesis hasta el estado actual sin problemas importantes y sin tiempos de inactividad. Dado que no hay garantías, los miembros del PowPeg de Rootstock están incentivados a participar recibiendo una pequeña porción de las comisiones de transacción de Rootstock que se canaliza automáticamente hacia ellos. Como se ha visto en el ecosistema de Ethereum, las comisiones de transacción pueden eventualmente proporcionar ingresos sostenibles para los mineros y, a veces, ser [incluso mayores](https://coinmetrics.io/ethereums-defi-evolution-how-defi-is-fueling-ethereums-growth/) que el subsidio de la blockchain.

## Funcionarios del protocolo PowPeg

Los funcionarios que participan en el PowPeg de Rootstock mantienen activo un hardware especializado llamado **PowHSM** conectado a tipos especiales de nodos completos de Rootstock (el "Nodo PowPeg"). Un PowHSM es un dispositivo externo a prueba de manipulaciones que crea y protege una de las claves privadas requeridas para el protocolo de firma múltiple de Bitcoin, firmando solo las transacciones que han sido validadas por suficiente trabajo acumulado. El nodo PowPeg está diseñado para tener la máxima conectividad y para comunicar información sobre la blockchain de Rootstock, específicamente el trabajo acumulado, al PowHSM.

El rol del funcionario es garantizar que el PowHSM firme solo las transacciones válidas de firma múltiple mediante la auditoría de los cambios en el PowHSM, el nodo PowPeg y la comunicación entre ellos. Los funcionarios propiamente dichos no participan activamente en la firma de las transacciones de ninguna manera, ni tampoco en la producción de bloques en la blockchain de Rootstock.

## Mineros fusionados y el Monitor Armadillo

Una gran parte de los mineros de Bitcoin participa en la minería fusionada de Rootstock, aportando las propiedades de persistencia y vitalidad de la blockchain necesarias para asegurar eficazmente la red de Rootstock. El rol de los mineros fusionados en el protocolo PowPeg es la capa más grande y crucial del enfoque de defensa en profundidad de Rootstock para asegurar el bridge entre Rootstock y Bitcoin. Los funcionarios dependen de la estabilidad de la minería fusionada para garantizar que las transacciones válidas de firma múltiple sean firmadas y validadas de manera segura y oportuna.

## Actores económicos y el contrato Bridge

Los actores económicos, como los comerciantes y las plataformas de intercambio, interactúan con el PowPeg de Rootstock enviando y recibiendo transacciones peg-in y peg-out (descritas con más detalle a continuación) al contrato inteligente del Bridge a través de la red Rootstock. El Bridge es un contrato inteligente precompilado que reside en la blockchain de Rootstock. El rol del Bridge es mantener una vista actualizada de la blockchain de Bitcoin, verificar las solicitudes peg-in y ordenar los peg-out. Para lograr esta funcionalidad, el contrato de Bridge gestiona una cartera de Bitcoin en modo SPV ([Verificación Simple de Pagos](https://en.bitcoinwiki.org/wiki/Simplified_Payment_Verification)). En este modo, las transacciones se confirman mediante los encabezados de bloque y estos a su vez se validan de forma mínima, pero la validación incluye la prueba de trabajo esperada. Estas validaciones aseguran que la cartera del Bridge siga la cadena de Bitcoin que tiene el mayor trabajo de cadena, pero no comprueba que la cadena sea válida.



## Peg-in/Peg-out y otras propiedades del protocolo PowPeg de Rootstock

Utilizamos los términos peg-in ya estandarizados para el proceso que transfiere bitcoins a la sidechain y peg-out para el proceso que los devuelve a Bitcoin. Realizar un peg-in es tan fácil como enviar los bitcoins a la dirección PowPeg e informar al Bridge sobre la transacción de Bitcoin. Los funcionarios del PowPeg proporcionan un servicio de "torre de vigilancia" en nombre de los usuarios y también informan al Bridge sobre cualquier peg-in.

El PowPeg de Rootstock es un protocolo de migración de activos y no puede abortar un peg-in en caso de retrasos en la red. La incapacidad de abortar un peg-in durante los retrasos en la red es lo que generalmente distingue los protocolos de migración de activos de los protocolos de intercambio. En los protocolos de intercambio, siempre existe el riesgo de que la contraparte no logre desbloquear los fondos y el usuario se vea obligado a informar de esta falla dentro de un plazo limitado. Solo en un caso especial, Rootstock reembolsa los bitcoins de una operación de peg-in, y esto ocurre cuando se supera un límite que aumenta gradualmente con el tiempo.

Técnicamente, el PowPeg de Rootstock es un peg híbrido. Los peg-in funcionan de manera completamente descentralizada utilizando pruebas SPV, con los miembros de PowPeg actuando solo como torres de vigilancia para garantizar que los depósitos de bitcoin se informen correctamente a Rootstock. El usuario que emite la transacción peg-in puede informar a Rootstock si los miembros de PowPeg no lo hacen, suponiendo que en el peor de los casos el usuario esté eventualmente en línea para informar a Rootstock sobre la transacción. Dado que Rootstock asume que el usuario es el emisor y el receptor de una transacción peg bidireccional, se recomienda encarecidamente que los usuarios informen a la red de Rootstock.

Para realizar los peg-out, el Bridge acepta solicitudes de cuentas de Rootstock. Después de miles de bloques de confirmación, el Bridge construye una transacción peg-out de Bitcoin ordenando a los PowHSM que firmen esta transacción. El Bridge selecciona las entradas de la transacción (o UTXO) a incluir en las transacciones peg-out, evitando la censura selectiva de los UTXO de cualquier tipo. El Bridge también coordina y aplica retrasos forzados a todas las operaciones de tesorería requeridas cuando cambia la composición de PowPeg. Por último, el Bridge actúa como un Oracle para exponer la blockchain de Bitcoin a los contratos inteligentes de Rootstock. Los peg-out de Rootstock dependen de la participación de los PowHSM y la colaboración de la mayoría de los miembros de PowPeg, ya que los PowHSM deben firmar cada transacción peg-out. Asumiendo la seguridad práctica proporcionada por los PowHSM, los peg-out de PowPeg tampoco necesitan intermediarios de confianza.

## Seguridad del PowPeg de Rootstock

El peg de Rootstock se está convirtiendo en uno de los sistemas de firma múltiple más seguros que existen. Técnicamente, la seguridad del PowPeg depende de varias estrategias concurrentes: defensa en profundidad, transparencia en la coordinación y atestación pública. Pero la seguridad de un peg no depende solo de sus características técnicas. La seguridad en el mundo real debe analizarse desde varios puntos de vista: técnico, operativo y reputacional. A continuación, nos centraremos en las decisiones de diseño técnico del PowPeg.

## Defensa en profundidad

La defensa en profundidad se logra mediante una cuidadosa separación de responsabilidades, de modo que vulnerar el sistema requiera algo más que solo vulnerar un elemento o un actor. Los mineros por sí solos no pueden robar los fondos del peg, ni los funcionarios, ni el fabricante de los PowHSM, ni los desarrolladores. El proceso de peg está gobernado por reglas de consenso aplicadas en el software y el firmware, cada una protegiendo a la otra de errores y vulnerabilidades. Además, la comunidad de Rootstock protege el código de errores. El objetivo de la comunidad es mejorar el PowPeg añadiendo más capas de protección, cada capa añadiendo más seguridad.

Como se ha descrito anteriormente, cada funcionario no solo ejecuta un nodo PowPeg, sino también un PowHSM. En los próximos meses, todos los miembros de PowPeg habrán terminado de actualizar a la versión 2.0 de PowHSM. Como se explicó antes, cada PowHSM ejecuta un nodo de consenso en modo SPV, por lo que los comandos deben estar respaldados por una verdadera tasa de hash. Engañar al PowHSM se vuelve demasiado difícil, si no imposible, sin hackear varios grupos de minería de Bitcoin.

El término "vetocracia" es muy útil en este contexto. Una vetocracia es un sistema de gobernanza en el que ninguna entidad única puede adquirir suficiente poder para tomar decisiones y asumir el control de manera efectiva. El enfoque de defensa en profundidad de Rootstock para la seguridad del PowPeg sigue tal ideología, haciendo que los ataques sean ineficaces. Una buena pregunta que se debe hacer al diseñar un sistema de peg bidireccional sería: "¿cuánto se asemeja el protocolo a una vetocracia?", lo que evitaría muchos debates interminables sobre sistemas federados vs. descentralizados.

## Transparencia en la coordinación

Todas las comunicaciones entre los funcionarios se efectúan a través de la blockchain de Rootstock. No hay mensajes ocultos entre los funcionarios ni un subsistema preestablecido que les permita comunicarse de forma secreta. Todos los mensajes intercambiados son públicos. Aunque no podemos evitar la comunicación oculta por parte de atacantes hipotéticos que tengan control total sobre el código ejecutable del nodo PowPeg, sí prevenimos la colusión oculta durante largos períodos. Dado que la coordinación se lleva a cabo a través de la red pública, el sistema obliga a los PowHSM a estar expuestos a la mejor cadena honesta de blockchain, y permite que todos los participantes de la red conozcan periódicamente el estado interno de los PowHSM. En cuanto a los hackers externos, la existencia de un sistema preestablecido para la coordinación oculta sería una herramienta poderosa para la escalada de privilegios, ya que podría usarse para obtener las IP de los funcionarios e intentar ataques dirigidos. Los funcionarios de PowPeg podrían conectarse a la red a través de Tor, o cambiar sus IP diariamente sin problema.

Por último, el contrato inteligente del bridge construye la transacción peg-out y no permite que ninguno de los PowHSM elija nada relacionado con la transacción a firmar. Todo el contenido de la transacción es decidido por consenso en Rootstock.

## Atestación del Firmware

Los firmwares PowHSM de Rootstock, así como los nodos completos y los nodos PowPeg, se generan utilizando compilaciones deterministas; sin embargo, actualmente la instalación del firmware en los PowHSM no puede estar totalmente sin intermediarios de confianza. Un grupo de auditoría debe atestiguar la corrección del proceso de instalación del firmware en cada nuevo dispositivo o lote de dispositivos. Pero estamos mejorando esta área con una nueva defensa: la próxima iteración del firmware de PowHSM (versión 2.1) será capaz de proporcionar una atestación del firmware utilizando las características de seguridad proporcionadas por el dispositivo. Por lo tanto, el siguiente objetivo es incluir la atestación del firmware como parte de los procedimientos de implementación de Rootstock, o incluso periódicamente como mensajes notificadores de actividad (_keepalive_). Pronto, los mensajes de atestación se almacenarán en la blockchain y cada miembro de la comunidad podrá validar los firmwares de los PowHSM.

## Prueba de Trabajo es Prueba de Tiempo

El trabajo acumulado requerido por el PowHSM también funciona como un limitador de velocidad o un retraso de **tiempo forzado** para cualquier ataque: dado que Rootstock tiene una gran parte de la tasa de hash de Bitcoin a través de la minería fusionada, la cantidad de dificultad acumulada necesaria para "engañar" al PowHSM y que confirme un peg-out sobre una bifurcación maliciosa implica una colusión a gran escala de algunos de los principales pools de minería de Bitcoin durante varios días. Tal ataque sería transparente y visible tanto para la comunidad de Bitcoin como para la de Rootstock. Al igual que en los [procedimientos de apertura](https://www.law.cornell.edu/cfr/text/12/208.61) de bóvedas bancarias, el PowHSM en realidad impone un [retraso de tiempo](https://en.wikipedia.org/wiki/Time_lock) que permite la intervención humana si se sospecha un ataque.

## Finalidad de Peg-in y Peg-out

Dado que la blockchain de Bitcoin y la cadena lateral de Rootstock no están entrelazadas en una única blockchain ni en una relación padre-hijo como en una [syncchain](https://blog.rootstock.io/noticia/syncchain-synchronized-sidechains-for-improved-security-and-usability/), las transferencias de bitcoins entre ellas deben considerarse definitivas en algún momento. De lo contrario, los bitcoins bloqueados en un lado nunca podrían desbloquearse de manera segura en el otro. **Por lo tanto, las transacciones peg-in y peg-out requieren un alto número de confirmaciones de bloque. Los peg-in requieren 100 bloques de Bitcoin (aproximadamente 2000 bloques RSK) y los peg-out requieren 4000 bloques de Rootstock (aproximadamente 200 bloques de Bitcoin)**. Las transacciones firmadas por los nodos de la federación se consideran definitivas para Rootstock: estas transacciones se transmiten y se asume que serán incluidas tarde o temprano en la blockchain de Bitcoin. Debido a la necesidad de finalidad, el consenso de Rootstock no intenta recuperarse de un ataque que logre revertir la blockchain lo suficientemente profundo como para anular una transacción peg-in o peg-out final. Si ocurre una reversión masiva, los nodos PowPeg detienen cualquier peg-out futuro, y los actores maliciosos no deberían poder duplicar el gasto del peg.

:::note IRIS 3.0.0
Desde la actualización a IRIS 3.0.0, los valores mínimos requeridos para peg-in y peg-out se han reducido a la mitad, el mínimo de peg-in (BTC) ahora es 0.005 y el de peg-out (RBTC) 0.004. Aparte de este mínimo, el Bridge estimará las comisiones necesarias para pagar el peg-out. Si el saldo restante después de pagar las comisiones es demasiado bajo (no suficiente para ser gastado en BTC), el peg-out será rechazado. Los fondos serán reembolsados si el peg-out es rechazado por cualquiera de las condiciones descritas anteriormente.
:::

## Descentralización - Construcción de una vetocracia

El uso de PowHSMs en una federación es un paso adelante en la descentralización, porque un funcionario comprometido remotamente no compromete el elemento principal para la seguridad de la clavija: una clave privada multisig. Dado que Rootstock tiene una gran parte del hashrate minado por fusión de Bitcoin, que actualmente supera el 51%, parece extremadamente improbable que un nuevo grupo de mineros por fusión pueda secuestrar el consenso el tiempo suficiente para forzar a los PowHSM a realizar un peg-out malicioso. Pero la comunidad Rootstock no debería dormirse en los laureles.  En su lugar, la comunidad Rootstock planea aplicar una vez más un enfoque por capas que conduzca a una mayor "seguridad aditiva".

## La resistencia a la censura de PowPeg

El PowPeg de Rootstock también es único en el conjunto limitado de responsabilidades delegadas a cada nodo del PowPeg. En particular, los funcionarios del PowPeg no pueden aplicar una censura selectiva a las transacciones peg-in y peg-out. Si un funcionario del PowPeg intenta aplicar una censura a una transacción en particular, los demás funcionarios firman y ejecutan la transacción de peg-out, lo que provoca el fracaso de la censura. Si todos los funcionarios intentan censurar una transacción, entonces los funcionarios no podrán continuar realizando otros peg-outs, ya que los peg-outs están vinculados a los UTXO, y los funcionarios no pueden elegir los UTXO para las transacciones de peg-out. Los UTXO de peg-out, incluidos los UTXO de "cambio", son seleccionados por el contrato Bridge, formando una cadena impuesta por consenso. Por lo tanto, prohibir selectivamente una transacción lleva eventualmente a una detención completa del PowPeg, y por eso la censura selectiva no es posible.

En cuanto al cierre completo del PowPeg por parte de un solo gobierno, sería muy difícil de llevar a cabo, ya que los funcionarios están distribuidos geográficamente por todo el mundo. Para protegerse de ataques coordinados poderosos a nivel mundial o de ataques provenientes de agencias gubernamentales, Rootstock planea agregar una firma múltiple de recuperación de emergencia con un bloqueo temporal que se activará un año después de que se demuestre que el PowPeg ha sido desmantelado. Un intento de cierre solo haría que Rootstock fuera más fuerte y más resistente a ataques posteriores, ya que un nuevo PowPeg de Rootstock se expandiría rápidamente y se descentralizaría en cientos de usuarios individuales alrededor del mundo, cada uno ejecutando un dispositivo PowHSM y un nodo PowPeg a través de Tor.

## Conclusión

El peg de Rootstock ha pasado de ser una federación a un PowPeg. A medida que el peg crece con el tiempo, se están moviendo más bitcoins hacia Rootstock. Los desarrolladores pueden encontrar una oportunidad única para construir sus dApp sobre nuestra segura y eficiente bóveda de dinero. En comparación con otras alternativas, el PowPeg combina una fuerte seguridad basada en protecciones por capas, con la máxima descentralización dentro de las limitaciones establecidas por el sistema de scripting de Bitcoin.
