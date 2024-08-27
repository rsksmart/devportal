---
title: Construir la clavija Bitcoin más segura, sin permisos y sin censura
sidebar_position: 4
sidebar_label: Powpeg
tags:
  - rsk
  - portainjertos
  - rbtc
  - btc
  - arquitectura
  - powpeg
  - Clavija de 2 vías
description: Transfiera BTC a RBTC, y RBTC a BTC a través del Powpeg.
render_features: powpeg-hsm-attestation-frame
---

El protocolo peg bidireccional de Rootstock, llamado "el **Powpeg**", ha madurado desde sus inicios en 2018 como federación hasta incluir ahora muchas cualidades descentralizadas. El nuevo Powpeg de Rootstock protege las claves privadas almacenadas en PowHSM de propósito especial basadas en elementos seguros (SE) a prueba de manipulaciones. Cada PowHSM ejecuta un nodo Rootstock en modo SPV, por lo que las firmas sólo pueden comandarse mediante pruebas de trabajo acumulativas en cadena. La seguridad se establece en el Powpeg mediante la simplicidad de un diseño en capas que denominamos defensa en profundidad.

:::note\[Info]

- La aplicación 2 Way Peg está disponible en [Testnet](https://app.2wp.testnet.rootstock.io/) y [Mainnet](https://app.2wp.rootstock.io/).
- Para obtener información general sobre el diseño y la arquitectura, cómo realizar una transacción peg-in utilizando Ledger y Trezor, preguntas frecuentes y operaciones avanzadas que puede realizar en la aplicación 2 way peg, consulte la [Guía del usuario de la aplicación 2 way peg](/resources/guides/two-way-peg-app/).
- Obtenga información sobre los firmantes y la atestación en la sección [Powpeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation).

:::

## Historia del Powpeg

Dos cadenas de bloques con formatos de bloque distintos pueden comunicarse de forma totalmente descentralizada si cada una puede evaluar las reglas de consenso de la otra cadena y si los mensajes entre cadenas no se censuran durante largos periodos de tiempo. Actualmente, sólo las plataformas con contratos inteligentes "Turing-completos" pueden evaluar las reglas de consenso de otras cadenas de bloques. Bitcoin, para bien o para mal, carece de la capacidad de desbloquear monedas sobre predicados arbitrarios. Por lo tanto, cuando se creó Rootstock, tuvo que utilizar la única tecnología existente en Bitcoin para distribuir confianza entre las partes: las multifirmas. Con una multi-firma es posible dar a un grupo de notarios la tarea de proteger bitcoins bloqueados, tolerando una cierta cantidad de partes maliciosas, hackeadas o no disponibles.

Cuando se minó el bloque génesis de Rootstock, nació la Federación Rootstock, un conjunto autónomo de funcionarios cuyo objetivo es proteger la multifirma. La federación estaba controlada por el Puente Rootstock, un contrato inteligente imparable que se ejecuta en Rootstock, y ha funcionado con éxito desde su creación. En 2020 la comunidad Rootstock decidió que era hora de que la clavija Rootstock creciera, tanto en seguridad como en resistencia a la censura, evolucionando de un sistema federado al Powpeg. El Powpeg es un sistema peg único de 2 vías que asegura los bitcoins bloqueados con el mismo hashrate de Bitcoin que establece el consenso. El conjunto de funcionarios sigue existiendo, pero su papel consiste principalmente en mantener su hardware y nodos conectados y vivos en todo momento; no controlan directamente las claves privadas multisig de Bitcoin. Véase [PowPeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation)

## El Powpeg en Rootstock

La estrategia de los investigadores y desarrolladores de Rootstock a la hora de diseñar el Powpeg difiere de la adoptada por otros equipos que han construido protocolos peg bidireccionales. El Powpeg de Rootstock se basa en un modelo de seguridad por capas, una práctica que denominamos "**defensa en profundidad**". La mayoría de las demás clavijas se basan en un único protocolo criptográfico global que resuelve de forma intrincada un problema de custodia multipartita. Estos complejos protocolos criptográficos son delicados y muy pocas entidades pueden auditarlos a fondo. A menudo, este tipo de protocolos se ven comprometidos, lo que provoca una pérdida repentina de seguridad para los usuarios.

Otros diseños recientes de pegs de 2 vías se centran en incentivos criptoeconómicos que aprovechan la alta colateralización en un nuevo token. Sin embargo, utilizar un token diferente para la funcionalidad central de la cadena lateral no está alineado con los valores de Bitcoin. El puente Powpeg de Rootstock, en cambio, se basa en múltiples defensas, o capas, con cada capa relativamente sencilla de entender y probar. Este enfoque de defensa en profundidad es lo que ha permitido a Rootstock crecer desde su génesis hasta el estado actual sin mayores problemas y sin tiempos de inactividad. Dado que no hay garantías, los miembros del Powpeg de Rootstock están incentivados a participar recibiendo una pequeña parte de las comisiones por transacciones de Rootstock que se les canaliza automáticamente. Como se ha visto en el ecosistema Ethereum, las tasas de transacción pueden llegar a proporcionar unos ingresos sostenidos a los mineros y, en ocasiones, [incluso superiores](https://coinmetrics.io/ethereums-defi-evolution-how-defi-is-fueling-ethereums-growth/) a la subvención del blockchain.

## Funcionarios de Powpeg

Los funcionarios que participan en el PowPeg de Rootstock mantienen activo un hardware especializado denominado **PowHSM** y conectado a tipos especiales de nodos completos de Rootstock (el "Nodo Powpeg"). Un PowHSM es un dispositivo externo a prueba de manipulaciones que crea y protege una de las claves privadas necesarias para el protocolo multifirma de Bitcoin, firmando únicamente transacciones cuya validez ha sido probada por suficiente trabajo acumulado. El nodo Powpeg está diseñado para tener la máxima conectividad y comunicar información sobre la blockchain del Rootstock, en concreto el trabajo acumulado, al PowHSM.

El papel del funcionario es garantizar que el PowHSM firme únicamente transacciones válidas con varias firmas, auditando los cambios en el PowHSM, el nodo Powpeg y la comunicación entre ellos. Los propios funcionarios no participan activamente en la firma de las transacciones en modo alguno, y no participan en la producción de bloques en la blockchain de Rootstock.

## Mineros fusionados y el Monitor Armadillo

Una gran parte de los mineros de Bitcoin participan en la minería fusionada de Rootstock, proporcionando las propiedades de persistencia y liveness blockchain necesarias para asegurar eficazmente la red Rootstock. El papel de los mineros fusionados en el protocolo Powpeg es la capa más grande y crucial del enfoque de defensa en profundidad de Rootstock para asegurar el puente entre Rootstock y Bitcoin. Los funcionarios confían en la estabilidad de los mineros fusionados para garantizar que las transacciones válidas con múltiples firmas se firmen y validen de forma segura y oportuna.

## Los agentes económicos y el contrato puente

Los agentes económicos, como los comerciantes y las bolsas, interactúan con el sistema Rootstock 2-way peg enviando y recibiendo transacciones peg-in y peg-out (descritas con más detalle a continuación) al contrato inteligente Bridge a través de la red Rootstock. El Bridge es un contrato inteligente precompilado que vive en la blockchain de Rootstock. La función del Bridge es mantener una vista actualizada del blockchain de Bitcoin, verificar las solicitudes de peg-in y ordenar los peg-outs. Para conseguir esta funcionalidad, el contrato Bridge gestiona un monedero Bitcoin en modo SPV ([Simple Payment Verification](https://en.bitcoinwiki.org/wiki/Simplified_Payment_Verification)). En este modo, las transacciones se confirman mediante cabeceras de bloque y las cabeceras de bloque se validan mínimamente, pero la validación incluye la prueba de trabajo esperada. Estas validaciones aseguran que el monedero Bridge sigue la cadena Bitcoin que tiene el mayor trabajo en cadena, pero no comprueba que la cadena sea válida.

Normalmente la cadena con mayor trabajo en cadena es la mejor cadena de la red. En la historia de Bitcoin sólo hubo una [bifurcación no intencionada de la red](https://bitcoinmagazine.com/articles/bitcoin-network-shaken-by-blockchain-fork-1363144448) en la que una rama no era válida según las reglas de consenso preestablecidas. La longitud de la bifurcación fue de 24 bloques. Por lo tanto, para prevenir bifurcaciones inválidas intencionadas o no, el Puente está diseñado para esperar 100 confirmaciones antes de confirmar una transacción peg-in.

## Peg-in/Peg-out y otras propiedades del portainjertos Powpeg

Utilizamos los términos ya estandarizados peg-in para el proceso que transfiere bitcoins a la cadena lateral, y peg-out para el proceso que los devuelve a Bitcoin. Realizar un peg-in es tan fácil como enviar los bitcoins a la dirección de Powpeg e informar a Bridge de la transacción de Bitcoin. Los funcionarios de Powpeg prestan un servicio de "torre de vigilancia" en nombre de los usuarios e informan a Bridge de cualquier "peg-in".

El Rootstock Powpeg es un protocolo de migración de activos y no puede abortar un peg-in en caso de retrasos en la red. La imposibilidad de abortar un peg-in en caso de retrasos en la red es lo que generalmente distingue a los protocolos de migración de activos de los protocolos de intercambio. En los protocolos de intercambio, siempre existe el riesgo de que la contraparte no desbloquee los fondos, y el usuario se ve obligado a informar de este fallo en un plazo limitado. Sólo en un caso especial Rootstock reembolsa los bitcoins de una operación de peg-in, y es cuando se supera un límite, que aumenta gradualmente con el tiempo.

Técnicamente, el Powpeg de Rootstock es un peg híbrido. Los peg-ins funcionan de forma totalmente descentralizada utilizando pruebas SPV y los miembros del Powpeg actúan únicamente como torres de vigilancia para garantizar que los depósitos de bitcoins se comunican correctamente a Rootstock. El usuario que emite la transacción puede informar a Rootstock si los miembros del Powpeg no lo hacen, suponiendo que, en el peor de los casos, el usuario esté finalmente en línea para informar a Rootstock de la transacción. Dado que Rootstock asume que un usuario es el emisor y el receptor de una transacción de clavija bidireccional, se recomienda encarecidamente que los usuarios informen a la red Rootstock.

Para realizar peg-outs, el Puente acepta solicitudes de cuentas Rootstock y, tras miles de bloques de confirmación, el Puente construye una transacción de peg-out de Bitcoin ordenando a los PowHSM que firmen esta transacción. El puente selecciona las entradas de transacción (o UTXOs) que se incluirán en las transacciones de peg-out, evitando la censura selectiva de UTXOs de cualquier tipo. El puente también coordina y aplica retrasos forzados a todas las operaciones de tesorería necesarias cuando cambia la composición del Powpeg. Por último, el Puente sirve de Oráculo para exponer la blockchain de Bitcoin a los contratos inteligentes de Rootstock. Los peg-outs de Rootstock dependen de la participación de los PowHSM y de la colaboración de la mayoría de los miembros del Powpeg, ya que los PowHSM deben firmar cada transacción de peg-out. Asumiendo la seguridad práctica proporcionada por las PowHSM, los acuerdos de devolución de Powpeg tampoco son fiables.

## Raíz Powpeg Seguridad

El Powpeg se está convirtiendo en uno de los sistemas multifirma más seguros que existen. Técnicamente, la seguridad del Powpeg se basa en varias estrategias concurrentes: Defensa en profundidad, transparencia de la coordinación y atestación pública, pero la seguridad de una clavija no sólo depende de sus características técnicas. La seguridad en el mundo real debe analizarse desde varios puntos de vista: técnico, operativo y de reputación. A continuación nos centraremos en las decisiones de diseño técnico de Powpeg.

## Defensa en profundidad

La defensa en profundidad se realiza mediante una cuidadosa separación de responsabilidades, de modo que comprometer el sistema requiera algo más que comprometer un elemento o un actor. Los mineros por sí solos no pueden robar los fondos de la clavija, ni los funcionarios, ni el fabricante de PowHSM, ni los desarrolladores. El proceso de la clavija se rige por reglas de consenso aplicadas en software y firmware, cada uno de los cuales protege al otro de fallos y vulnerabilidades. Además, la comunidad Rootstock protege el código de los errores. El objetivo de la comunidad es mejorar el Powpeg añadiendo más capas protectoras, cada capa añadiendo más seguridad.

Como se ha descrito anteriormente, cada funcionario no sólo gestiona un nodo Powpeg, sino también un PowHSM. En los próximos meses, todos los miembros actuales del Powpeg habrán terminado de actualizarse a la versión 2.0 del PowHSM. Como ya se ha explicado, cada PowHSM ejecuta un nodo de consenso en modo SPV, por lo que los comandos deben estar respaldados por hashrate real. Engañar al PowHSM se hace muy difícil, si no imposible, sin piratear varios pools de minería de Bitcoin.

El término "vetocracia" es muy útil en este contexto. Una vetocracia es un sistema de gobierno en el que ninguna entidad puede adquirir por sí sola el poder suficiente para tomar decisiones y hacerse cargo de forma efectiva. El enfoque de defensa en profundidad de Rootstock para la seguridad del Powpeg sigue una ideología de este tipo, que hace que los ataques sean ineficaces. Una buena pregunta a la hora de diseñar un sistema peg bidireccional debería ser: "¿en qué medida se parece el protocolo a una vetocracia?", ahorrando a muchos interminables debates religiosos sobre sistemas federados frente a descentralizados.

## Coordinación Transparencia

Todas las comunicaciones entre funcionarios se producen a través de la blockchain de Rootstock. No hay mensajes ocultos entre funcionarios y no existe ningún subsistema preestablecido que les permita comunicarse en secreto. Todos los mensajes intercambiados son públicos. Aunque no podemos impedir la comunicación oculta por parte de hipotéticos atacantes con pleno control del código ejecutable del nodo Powpeg, sí evitamos la colusión oculta durante largos periodos. Como la coordinación se lleva a cabo a través de la red pública, el sistema obliga a las PowHSM a estar expuestas a la mejor cadena honesta de blockchain, y permite que todos los participantes de la red conozcan periódicamente el estado interno de las PowHSM. En cuanto a los hackers externos, la existencia de un sistema preestablecido de coordinación oculta sería una poderosa herramienta para la escalada de privilegios, ya que puede utilizarse para obtener las IP de los funcionarios e intentar ataques selectivos. Los funcionarios de Powpeg podrían conectarse a la red a través de Tor, o cambiar sus IP diariamente sin problema.

Por último, el contrato inteligente puente construye la transacción peg-out y no deja que ninguno de los PowHSM elija nada relacionado con la transacción para firmar. Todo el contenido de la transacción se decide por consenso en Rootstock.

## Certificación de firmware

Los firmwares de Rootstock PowHSM, así como el nodo completo y los nodos Powpeg, se generan utilizando compilaciones deterministas, aunque actualmente la instalación del firmware en los PowHSM no puede ser totalmente libre de confianza. Un grupo de auditoría debe dar fe de la corrección del proceso de instalación del firmware en cada nuevo dispositivo o lote de dispositivos. Pero estamos mejorando esta área con una nueva defensa: la próxima iteración del firmware PowHSM (versión 2.1) es capaz de proporcionar atestación de firmware utilizando características de seguridad proporcionadas por el dispositivo. Por lo tanto, el próximo objetivo es incluir la atestación del firmware como parte de los procedimientos de despliegue de Rootstock, o incluso periódicamente como mensajes _keepalive_. Pronto, los mensajes de atestación se almacenarán en la cadena de bloques y todos los miembros de la comunidad podrán validar los firmwares PowHSM.

## La prueba del trabajo es la prueba del tiempo

El trabajo acumulativo requerido por el PowHSM también funciona como un limitador de tasa o **retraso de tiempo forzado** para cualquier ataque: Dado el hecho de que Rootstock tiene una gran parte del hashrate de Bitcoin a través de la minería merge, la cantidad de dificultad acumulada necesaria para "engañar" al PowHSM para que confirme un peg-out sobre una rama bifurcada maliciosa implica una colusión a gran escala por parte de algunos de los principales pools de minería de Bitcoin durante varios días. Un ataque de este tipo sería transparente y visible para las comunidades Bitcoin y Rootstock. Al igual que en los [procedimientos de apertura] de las cámaras acorazadas bancarias (https://www.law.cornell.edu/cfr/text/12/208.61), el PowHSM está aplicando en realidad un [tiempo de retardo] (https://en.wikipedia.org/wiki/Time_lock) que permite a los humanos entrar en el bucle si se sospecha de un ataque.

## Peg-in y Peg-out Finalidad

Dado que la blockchain de Bitcoin y la sidechain de Rootstock no están entrelazadas en una única blockchain o en una relación padre-hijo como en una [syncchain](https://blog.rootstock.io/noticia/syncchain-synchronized-sidechains-for-improved-security-and-usability/), las transferencias de bitcoins entre ellas deben considerarse definitivas en algún momento. De lo contrario, los bitcoins bloqueados en un lado nunca podrían desbloquearse con seguridad en el otro. **Por lo tanto, las transacciones "peg-in" y "peg-out" requieren un gran número de confirmaciones de bloque. Las peg-ins requieren 100 bloques Bitcoin (aproximadamente 2000 bloques RSK), y las peg-outs requieren 4000 bloques Rootstock (aproximadamente 200 bloques Bitcoin)**. Las transacciones firmadas por los nodos de la federación son consideradas definitivas por Rootstock: estas transacciones se difunden y se asume que se incluirán tarde o temprano en el blockchain de Bitcoin. Debido a la necesidad de finalidad, el consenso de Rootstock no intenta recuperarse de un ataque que consiga revertir la blockchain lo suficientemente profundo como para revertir una transacción final peg-in o peg-out. Si se produce una gran reversión, los nodos Powpeg detienen cualquier peg-out futuro, y los actores maliciosos no deberían ser capaces de duplicar el peg.

:::note[IRIS 3.0.0]
Desde la actualización de IRIS 3.0.0, los valores mínimos requeridos para peg-in y peg-out se han reducido a la mitad, Peg-in (BTC) mínimo es ahora 0,005 y Peg-out (RBTC) mínimo es ahora 0,004. Además de este mínimo, el Bridge estimará las tasas necesarias para pagar el pegout, si el remanente después de pagar las tasas es demasiado bajo (no es suficiente para ser gastado en BTC) el pegout será rechazado. Los fondos serán reembolsados si el pegout es rechazado por cualquiera de las condiciones descritas anteriormente.
:::

## Descentralización - Construir una vetocracia

El uso de PowHSMs en una federación es un paso adelante en la descentralización, porque un funcionario comprometido remotamente no compromete el elemento principal para la seguridad de la clavija: una clave privada multisig. Dado que Rootstock tiene una gran parte del hashrate minado por fusión de Bitcoin, que actualmente supera el 51%, parece extremadamente improbable que un nuevo grupo de mineros por fusión pueda secuestrar el consenso el tiempo suficiente para forzar a los PowHSM a realizar un peg-out malicioso. Pero la comunidad Rootstock no debería dormirse en los laureles.  En su lugar, la comunidad Rootstock planea aplicar una vez más un enfoque por capas que conduzca a una mayor "seguridad aditiva".

## La resistencia a la censura de Powpeg

El Powpeg de Rootstock también es único por el limitado conjunto de responsabilidades delegadas a cada nodo del Powpeg. En particular, los funcionarios del Powpeg no pueden aplicar una censura selectiva a las transacciones de entrada y salida. Si un funcionario del Powpeg intenta censurar una operación concreta, los demás funcionarios firman y ejecutan la operación de "peg-out", con lo que la censura fracasa. Si todos los funcionarios intentan censurar una transacción, los funcionarios no pueden seguir realizando otras operaciones de "peg-out", ya que las operaciones de "peg-out" están vinculadas a UTXOs, y los funcionarios no pueden elegir los UTXOs para las transacciones de "peg-out". Los UTXOs de peg-out, incluidos los UTXOs de "cambio", son seleccionados por el contrato Bridge, formando una cadena reforzada por consenso. Por lo tanto, prohibir selectivamente una transacción conduce finalmente a la paralización completa del Powpeg, y por eso la censura selectiva no es posible.

En cuanto al cierre completo del Powpeg por un solo gobierno, sería muy difícil de llevar a cabo, ya que los funcionarios están distribuidos geográficamente por todo el mundo. Para protegerse de poderosos ataques coordinados en todo el mundo o de ataques procedentes de agencias de tres letras, Rootstock planea añadir un bloqueo temporal multisig de recuperación de emergencia que se activará un año después de que se demuestre el desmantelamiento del Powpeg. Un intento de cierre sólo haría a Rootstock más fuerte y resistente a ataques posteriores, ya que un nuevo Powpeg de Rootstock se expandiría rápidamente y se descentralizaría en un centenar de usuarios individuales de todo el mundo, cada uno ejecutando un dispositivo PowHSM y un nodo Powpeg sobre Tor.

## Conclusión

La paridad Rootstock ha pasado de ser una federación a ser un Powpeg. A medida que la clavija crece con el tiempo, más bitcoins se trasladan a Rootstock. Los desarrolladores pueden encontrar una oportunidad única para construir sus dApps en nuestra bóveda monetaria segura y eficiente. En comparación con otras alternativas, el Powpeg combina una fuerte seguridad basada en protecciones por capas, con la máxima descentralización dentro de las limitaciones establecidas por el sistema de scripting de Bitcoin.
