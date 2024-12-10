---
sidebar_label: Preguntas frecuentes
sidebar_position: 8
title: Preguntas frecuentes
tags:
  - recursos
  - rsk
  - preguntas frecuentes
  - ayuda
  - soporte
  - rootstock
description: Preguntas frecuentes sobre Rootstock y RIF
---

Estas son algunas preguntas frecuentes acerca de Rootstock y RIF Platforms.

## Acerca de Rootstock

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">¿Qué es Rootstock?</Accordion.Header>
    <Accordion.Body>
      Rootstock es la primera y más duradera cadena lateral de Bitcoin. Es la única solución de capa 2 que combina la seguridad de la prueba de trabajo de Bitcoin con las capacidades de contrato inteligente de Ethereum. La plataforma es de código abierto, compatible con EVM y asegurada por más del 60% de la potencia de hashing de Bitcoin, lo que la convierte en la puerta de entrada a un vibrante ecosistema de dApps que sigue evolucionando para convertirse en totalmente fiable.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿Qué es un contrato inteligente?</Accordion.Header>
    <Accordion.Body>
      Los contratos inteligentes son acuerdos digitales almacenados en una red blockchain como Rootstock y ejecutados automáticamente sin intermediarios. Un contrato inteligente permite controlar, intercambiar y transferir activos digitales. Los contratos inteligentes tienen numerosos casos de uso, como préstamos, votaciones, pagos e intercambios descentralizados, tokenización de activos, etc.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">¿Cuál es el objetivo de Rootstock?</Accordion.Header>
    <Accordion.Body>
      El objetivo principal de Rootstock es permitir a los usuarios de Bitcoin crear y ejecutar contratos inteligentes, ampliando así la funcionalidad y los casos de uso de la red Bitcoin. Rootstock logra esto mediante el uso de un sistema bidireccional que permite a los usuarios enviar Bitcoin directamente a la cadena de Rootstock, donde se convierten en convertibles a la criptomoneda nativa de Rootstock, RBTC. Este RBTC puede utilizarse en la red Rootstock para interactuar con contratos inteligentes y dApps.
      - Además de la funcionalidad de contratos inteligentes, Rootstock también se centra en proporcionar soluciones para transacciones más rápidas y mayor escalabilidad, dos de los principales retos de la red Bitcoin. También es compatible con la minería fusionada, lo que permite a los mineros de Bitcoin minar tanto Bitcoin como RBTC simultáneamente sin recursos computacionales adicionales.
      - Además, Rootstock también alberga el RIF (Rootstock Infrastructure Framework), que proporciona una serie de servicios de infraestructura abiertos y descentralizados, incluidos pagos, almacenamiento y comunicaciones, que permiten un desarrollo más rápido, sencillo y escalable de aplicaciones distribuidas (dApps).
      - Por último, el propósito de Rootstock es mejorar el ecosistema Bitcoin añadiendo funcionalidades de contratos inteligentes y más, sin comprometer las características que hacen único a Bitcoin, como la seguridad y la descentralización.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">¿Es la red Rootstock compatible con la red Ethereum?</Accordion.Header>
    <Accordion.Body>
      - Rootstock es [compatible con la blockchain de Ethereum](https://medium.com/iovlabs-innovation-stories/similarities-and-differences-between-rsk-and-ethereum-e480655eff37) en las siguientes capas:
        - Compatibilidad con EVM
        - Conectividad entre procesos en JSON-RPC
        - Programación de contratos inteligentes en Solidity
        - Interfaz JavaScript con web3.js
      - La máquina virtual de Rootstock (RVM) es altamente compatible con la máquina virtual de Ethereum (EVM). Aproximadamente una vez al año, la comunidad Ethereum realiza un hard fork para añadir nuevas funcionalidades a la blockchain. Cuando estas nuevas funcionalidades se alinean con la visión de Rootstock, la comunidad realiza el correspondiente hard fork para mantener la compatibilidad con la EVM.
      - Además, el RVM ofrece funciones mejoradas con respecto al EVM, como la conexión con Bitcoin y la consulta de la blockchain de Bitcoin.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">¿Tienen previsto añadir compatibilidad con lenguajes de programación de contratos inteligentes distintos de Solidity?</Accordion.Header>
    <Accordion.Body>
      Rootstock tiene como objetivo soportar todos los contratos de Ethereum; por lo tanto, generalmente puede soportar cualquier lenguaje que compile al EVM. Esto incluye Solidity, Julia, Rust y lenguajes de programación nuevos o experimentales como Vyper.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">¿Cuál es el estado actual del proyecto Rootstock?</Accordion.Header>
    <Accordion.Body>
      - En marzo de 2024, la última versión publicada de Rootstock es la [Arrowhead v6.0.0](https://github.com/rsksmart/rskj/releases), una actualización que se centra principalmente en aportar mejoras de compatibilidad con Ethereum a la máquina virtual Rootstock, junto con notables mejoras y optimización del rendimiento en el protocolo 2-way peg. Leer más [Arrowhead 6.0.0: Lo que necesita saber sobre la próxima actualización de la red Rootstock](https://blog.rootstock.io/noticia/arrowhead-6-0-0/)
      - Las estadísticas en directo sobre toda la red Rootstock están disponibles en Rootstock Stats, y todos los códigos fuente necesarios se pueden encontrar en la organización GitHub de Rootstock: [github.com/rsksmart](https://github.com/rsksmart).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">¿Cómo planea Rootstock ser una referencia en materia de contratos inteligentes?</Accordion.Header>
    <Accordion.Body>
      - Desde su creación, la seguridad y la escalabilidad han sido, y seguirán siendo, las principales ventajas competitivas de Rootstock. Con una profunda comprensión de la escalabilidad como un reto importante para impulsar la adopción de blockchain, la comunidad de Rootstock trabaja continuamente para permitir un mayor rendimiento de las transacciones y reducir los costes transaccionales.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3"> ¿Cómo aborda Rootstock la diversidad de nodos?</Accordion.Header>
    <Accordion.Body>
      - ¿Cuántos nodos necesita un protocolo sano?
      - La comunidad Rootstock valora más la diversidad y la independencia de los nodos que su cantidad. Aunque actualmente unos cientos de nodos Rootstock pueden dar soporte a una red global de criptomonedas, Rootstock da prioridad a una mayor variedad y autonomía entre los operadores de nodos. Eso es lo que significa descentralización: no confíes, verifícate. Los nodos de Rootstock se diseñaron para ser ligeros y funcionar para mejorar la descentralización.  Hay propuestas de la comunidad para clientes ligeros que permitan nodos móviles. El objetivo es garantizar que Rootstock siga siendo seguro y escalable a largo plazo con suficiente calidad y cantidad de nodos.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

## Rootstock vs Otras Plataformas

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿En qué se diferencia Rootstock de Stacks?</Accordion.Header>
    <Accordion.Body>
      > - **Filosofía:** Rootstock es una cadena lateral de Bitcoin altamente alineada con los participantes del ecosistema Bitcoin. Permite a los mineros de Bitcoin ganar comisiones adicionales por transacción y permite a los Bitcoiners realizar transacciones en Bitcoin a bajo coste. El hecho de que la moneda nativa de Rootstock sea RBTC también refuerza esta alianza. Stacks tiene su token (STX) para pagar las comisiones de transacción y, a partir de febrero de 2024, no tiene ningún mecanismo para realizar transacciones en Bitcoin. Por lo tanto, Stacks no es una cadena lateral de Bitcoin, sino una cadena de bloques independiente (o "altcoin") que utiliza Bitcoin para lograr el consenso.
      > - **Mecanismo de consenso:** Rootstock utiliza merge-mining con Bitcoin, lo que significa que los bloques de Rootstock están asegurados por los mismos mineros que aseguran Bitcoin. Actualmente, más del 50% de la tasa de hash de Bitcoin asegura Rootstock. La idea central de la minería fusionada se remonta a 2010 y fue propuesta por Satoshi Nakamoto. Fue puesta en producción por primera vez por Namecoin en 2011. La minería fusionada se ha probado en muchas blockchains, como Litecoin, durante casi una década. Rootstock utiliza una variante de minería fusionada llamada DECOR, diseñada específicamente para las necesidades de Rootstock. En lugar de confiar en protocolos de consenso probados, Stacks se lanzó con un nuevo protocolo de consenso llamado proof-or-burn, pero cambió su consenso varias veces, la última a PoX. Pronto volverá a cambiar a la actualización, ya que los anteriores protocolos de consenso eran complejos y presentaban fallos. Estos incentivos inesperados permitían a algunos mineros de Bitcoin obtener una parte injusta de la subvención de Stacks y tenían duras limitaciones de escalabilidad en cuanto al tiempo de bloque. Para empeorar las cosas, la solidez del nuevo protocolo no está probada, y se pondrá a prueba en producción.
      > - **Capacidades de contratos inteligentes:** La VM de Rootstock es altamente compatible con la EVM (máquina virtual de Ethereum) y con el estándar web3 de Ethereum. La mayoría de las aplicaciones Ethereum pueden ser portadas a Roostock con unos pocos cambios de configuración. Solidity es el lenguaje principal utilizado para programar la EVM. Compila un lenguaje de alto nivel que [se parece a C++ o Java](https://docs.soliditylang.org/en/latest/language-influences.html) en opcodes EVM.  Con el paso de los años, Solidity se ha convertido en un estándar de facto para el desarrollo de contratos, proporcionando una rica cadena de herramientas que incluye herramientas de compilación, prueba y análisis de seguridad. También hay miles de tutoriales, bibliotecas y ejemplos en línea. Casi en el lado opuesto del espectro de decisiones de diseño, Stacks utiliza el lenguaje de programación Clarity para codificar contratos inteligentes. Clarity es un nuevo lenguaje similar a LISP que sólo utiliza Stacks. Clarity se interpreta en la cadena y no se compila, lo que ralentiza la ejecución y limita la escalabilidad a la vez que proporciona más transparencia. Aunque interesante en teoría, el argumento de la transparencia quedó obsoleto en la práctica, ya que los usuarios de rootstock y Ethereum se han acostumbrado a comprobar la disponibilidad y corrección del código fuente mediante herramientas automatizadas que comprueban su correspondencia con el código desplegado. Se anunció una nueva ClarityWASM en una actualización prevista para hacer frente al problema de escalabilidad de Stacks, pero esta actualización sigue sin ofrecer compatibilidad directa con EVM.
      > - Mecanismo Peg: Rootstock two-way peg se basa en una federación de funcionarios, cada uno de los cuales ejecuta un módulo de seguridad de hardware (el PowHSM) que participa en un multi-sig que protege los fondos bloqueados. Cientos de millones de USD en bitcoins están actualmente asegurados por Rootstock peg. Stacks no tiene un vínculo con Bitcoin que le permita transferir bitcoins de un lado a otro. Se supone que una actualización prevista añadirá una conexión bidireccional garantizada a Bitcoin.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">¿En qué se diferencia Rootstock de Liquid?</Accordion.Header>
    <Accordion.Body>
      - Aunque Rootstock y Liquid son cadenas laterales de Bitcoin, tienen objetivos y características diferentes. Rootstock es una plataforma de contratos inteligentes altamente compatible con Ethereum, mientras que Liquid es una cadena lateral federada cuyo objetivo es proporcionar una liquidación rápida y segura entre intercambios.
      - Algunas de las principales diferencias son:
      > - **Mecanismo de consenso:** Rootstock utiliza merge-mining con Bitcoin, lo que significa que los bloques de Rootstock están asegurados por los mismos mineros que aseguran Bitcoin. Actualmente, más del 50% del hashrate de Bitcoin asegura Rootstock. Liquid utiliza una federación de funcionarios de confianza que validan y firman los bloques. El merge-mining de Rootstock está más descentralizado que la federación de Liquid y proporciona la seguridad termodinámica de PoW, que Liquid no tiene.
      > Rootstock admite contratos inteligentes completos de Turing y tiene una máquina virtual casi idéntica a la de Ethereum. Esto permite a los desarrolladores utilizar las mismas herramientas, bibliotecas y lenguajes que Ethereum y portar las aplicaciones existentes a Rootstock. Liquid tiene un sistema de scripting más simple que no es Turing-completo (dentro de una única transacción) y sólo soporta un conjunto limitado de casos de uso, como swaps atómicos y transacciones multi-sig.
      > - **Mecanismo de pegs:** Tanto los pegs bidireccionales de Rootstock como los de Liquid se basan en una federación de funcionarios, cada uno de los cuales ejecuta un módulo de seguridad de hardware (HSM) que participa en un multisig que protege los fondos bloqueados. Ambos disponen también de sistemas de recuperación de emergencia. Sin embargo, cada retirada de Liquid es adelantada por un funcionario a un usuario, y luego la blockchain de Liquid reembolsa al funcionario. Esto se conoce como protocolo de reembolso. Algunos o todos los funcionarios requieren controles KYC. El sistema Rootstock realiza peg-outs directamente a la cartera Bitcoin del usuario y actualmente no impone KYC en peg-outs pero obliga al mismo usuario a estar en ambos lados de la transferencia. El sistema [Rootstock Flyover](/developers/integrate/) proporciona peg-outs más rápidos, utilizando también un sistema de reembolso.
      > Escalabilidad:** Rootstock puede lograr un mayor rendimiento de las transacciones que Liquid porque las transacciones de Rootstock son más pequeñas, sus bloques pueden contener más transacciones y la cadena de bloques de Rootstock tiene un intervalo medio de bloques menor. Rootstock también tiene varias propuestas de escalabilidad a punto de finalizar, como el procesamiento paralelo de transacciones.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">¿En qué se diferencia Rootstock de las drivechains?</Accordion.Header>
    <Accordion.Body>
      - Una drivechain es una sidechain especial con un tipo específico de peg bidireccional llamado "hashrate escrow". Este mecanismo de "peg" da a la mayoría de los mineros de Bitcoin el control de las retiradas de la sidechain, pero incentiva a los mineros a ser honestos y no abusar de sus poderes. Para conseguirlo, los mineros confirman o rechazan públicamente las retiradas durante un largo periodo que puede durar 3 meses. Durante este periodo, la comunidad puede detectar a los tramposos que confirman retiradas no válidas. La clavija es segura mientras existan fuertes incentivos a largo plazo para que la mayoría honesta de los mineros no haga trampas. Rootstock, por el contrario, no se basa en incentivos monetarios. Utiliza una federación de dispositivos PowHSM, y los dispositivos a prueba de manipulaciones votan las retiradas. Al mismo tiempo, cada dispositivo aplica el mismo tipo de "hashrate escrow", pero con un plazo mucho más reducido de días. Por lo tanto, tanto Drivechains como Rootstock requieren que el hashrate del minero respalde cada retirada.
      - Las drivechains son prometedoras pero no están disponibles actualmente ya que requieren un soft-fork en Bitcoin, que históricamente se ha considerado controvertido y puede que nunca se lleve a cabo. Mientras que las drivechains pueden proporcionar una mayor descentralización, el mecanismo de fijación de drivechain nunca ha sido probado, por lo que la seguridad de la fijación de drivechain es aún incierta.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">¿En qué se diferencia Rootstock de Lightning?</Accordion.Header>
    <Accordion.Body>
      - Tanto Rootstock como Lightning son soluciones de capa 2 que pretenden mejorar la escalabilidad y funcionalidad de Bitcoin, pero tienen diferentes enfoques y compensaciones. Algunas de las principales diferencias son:
      > - **Arquitectura:** Rootstock es una sidechain conectada a la mainchain de Bitcoin a través de un mecanismo de peg bidireccional, que permite a los usuarios bloquear y desbloquear bitcoins en ambas cadenas. Lightning es una red de canales de pago construida sobre la cadena principal de Bitcoin, que permite a los usuarios enviar y recibir bitcoins fuera de la cadena.
      > Contratos inteligentes:** Rootstock admite contratos inteligentes Turing-completos y es compatible con la máquina virtual Ethereum, que permite una amplia gama de aplicaciones descentralizadas y casos de uso en la red Bitcoin. Lightning solo admite scripts sencillos, y las transacciones se centran principalmente en pagos rápidos y baratos.
      > - **Seguridad y Liveness:** Rootstock está asegurado por merge-mining con Bitcoin, lo que significa que los bloques de Rootstock son validados por los mismos mineros y hash power que Bitcoin. La cadena principal de Bitcoin, el árbitro y ejecutor último del canal de pagos, asegura Lightning. Rootstock tiene mayores garantías de vida que Lightning. Lightning requiere la cooperación de las partes que comparten los canales de pago y la existencia de rutas de canal a las direcciones de destino para que los pagos se realicen correctamente. Siempre se están produciendo bloques de Rootstock, y mientras el precio del gas Rootstock especificado en una transacción sea adecuado, las transacciones siempre se confirman. La seguridad de Lightning depende de que las partes comprueben sus canales ocasionalmente para evitar cierres malintencionados. La seguridad de Rootstock no requiere que los usuarios estén activos en línea ni que supervisen sus carteras continuamente.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="11">
    <Accordion.Header as="h3">¿Cómo se compara Rootstock con Ethereum?</Accordion.Header>
    <Accordion.Body>
      ¿En qué se diferencia Rootstock de Ethereum?
      > - ¿Requiere el nodo de Rootstock los mismos recursos que un nodo geth de Ethereum?
      - Rootstock requiere muchos menos recursos que Ethereum en lo que respecta al tamaño de la cadena de bloques y el tamaño del estado. Esto se debe a una menor actividad en la cadena y al hecho de que Rootstock utiliza estructuras de datos más eficientes para gestionar el estado, como Unitrie, con el fin de lograr un rendimiento potencialmente mayor de las transacciones.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

## Rootstock y RIF Token

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿Qué es el token RIF y cuál es su finalidad?</Accordion.Header>
    <Accordion.Body>
      - El token RIF es un token de utilidad que impulsa el Rootstock Infrastructure Framework (RIF), un conjunto de herramientas y tecnologías descentralizadas y de código abierto que facilitan la creación de productos y servicios DeFi accesibles en la blockchain. Está diseñado para permitir y facilitar la amplia gama de servicios descentralizados disponibles en la plataforma RIF. El token RIF es el medio de acceso para todos los protocolos RIF, como RIF Wallet, RNS y servicios de infraestructura desarrollados por terceros. Además, cualquier otra aplicación que pueda desplegarse en el marco de RIF que acepte tokens RIF como medio de acceso/consumo del servicio o aplicación, como RIF on Chain, el protocolo stablecoin que sustenta USDRIF. Para más información, consulte el [RIF Whitepaper](https://rif.technology/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf).
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">¿Qué es el token RBTC y cuál es su finalidad?</Accordion.Header>
    <Accordion.Body>
      - El token RIF es un token de utilidad que impulsa el Rootstock Infrastructure Framework (RIF), un conjunto de herramientas y tecnologías descentralizadas y de código abierto que facilitan la creación de productos y servicios DeFi accesibles en la blockchain. Está diseñado para permitir y facilitar la amplia gama de servicios descentralizados disponibles en la plataforma RIF. El token RIF es el medio de acceso para todos los protocolos RIF, como RIF Wallet, RNS y servicios de infraestructura desarrollados por terceros. Además, cualquier otra aplicación que pueda desplegarse en el marco de RIF que acepte tokens RIF como medio de acceso/consumo del servicio o aplicación, como RIF on Chain, el protocolo stablecoin que sustenta USDRIF. Para más información, consulte el [RIF Whitepaper](https://rif.technology/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf).
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">¿Qué es el token RIF y para qué sirve?</Accordion.Header>
    <Accordion.Body>
      - El token RIF es un token de utilidad que impulsa el Rootstock Infrastructure Framework (RIF), un conjunto de herramientas y tecnologías descentralizadas y de código abierto que facilitan la creación de productos y servicios DeFi accesibles en la blockchain. Está diseñado para permitir y facilitar la amplia gama de servicios descentralizados disponibles en la plataforma RIF. El token RIF es el medio de acceso para todos los protocolos RIF, como RIF Wallet, RNS y servicios de infraestructura desarrollados por terceros. Además, cualquier otra aplicación que pueda desplegarse en el marco de RIF que acepte tokens RIF como medio de acceso/consumo del servicio o aplicación, como RIF on Chain, el protocolo stablecoin que sustenta USDRIF. Para más información, consulte el [RIF Whitepaper](https://rif.technology/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf).
    </Accordion.Body>
  </Accordion.Item>
     <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">¿Qué es el token RBTC y cuál es su finalidad?</Accordion.Header>
    <Accordion.Body>
      - Smart Bitcoin (RBTC) es el token nativo de la red Rootstock. RBTC está vinculado 1:1 a BTC, permitiendo transacciones Bitcoin en Rootstock y sus redes. Se puede convertir a y desde BTC a través del PowPeg.
      - RBTC se utiliza como gas para pagar la ejecución de transacciones y contratos inteligentes en la red Rootstock, recompensando a mineros y nodos, permitiendo la interoperabilidad entre aplicaciones basadas en Bitcoin y apoyando el desarrollo de nuevas soluciones como RIF Products.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">¿En qué se diferencia el token RIF de RBTC?</Accordion.Header>
    <Accordion.Body>
      - El token RIF se diferencia de RBTC en lo siguiente:
      > - **Propósito:** RBTC es el token nativo de la red Rootstock utilizado para mantener una relación uno a uno con Bitcoin. También se utiliza como gas para pagar la ejecución de contratos inteligentes y las tasas de transacción en la red. RIF es un token de utilidad utilizado para acceder a los servicios de los protocolos RIF.
      > - **Portabilidad:** RBTC está vinculado 1:1 a BTC y se puede convertir a y desde BTC utilizando el mecanismo de vinculación de 2 vías. RIF es un token compatible con ERC20 que puede transferirse entre plataformas de contratos inteligentes.
      > Suministro:** RBTC tiene el mismo suministro que BTC, que está limitado a 21 millones. RIF tiene un suministro fijo de 1.000 millones de tokens, que fueron pre-minados y distribuidos de acuerdo con una venta de tokens y un plan de asignación.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">¿Cómo puedo obtener fichas RBTC y RIF?</Accordion.Header>
    <Accordion.Body>
      - Puede obtener tokens RBTC y RIF a través de varias bolsas como Money on Chain y Oku Trade.
      - Para obtener una lista actualizada, consulte [Obtener RBTC](https://rootstock.io/rbtc/).
      - Para [RIF tokens](/concepts/rif-suite/token/), puede utilizar bolsas como Sovryn, Binance, Gate.io, Lbank, MEXC, Coinex y Hotbit. Tenga en cuenta que siempre debe utilizar el monedero correcto y conectarse a la red correcta. RBTC sólo puede enviarse a y desde direcciones Rootstock de la red. Del mismo modo, los tokens RIF solo pueden enviarse a y desde direcciones que admitan el estándar de tokens ERC677.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">¿Cómo funciona la clavija?</Accordion.Header>
    <Accordion.Body>
      - La clavija Rootstock dispone de varios modos para realizar transferencias: versión 1, versión 2 y flyover. El protocolo de la versión 1 es bastante sencillo. Cuando un usuario de Bitcoin quiere utilizar el Peg 2-Way, envía una transacción peg-in a un monedero multisig cuyos fondos están asegurados por el PowPeg. La misma clave pública asociada a las direcciones Bitcoin relacionadas con los bitcoins de origen en una transacción peg-in se utiliza en la cadena Rootstock para obtener la dirección de destino donde se reciben los Smart Bitcoins. Aunque las claves públicas y privadas de Bitcoin y Rootstock son similares, cada cadena de bloques codifica la dirección en un formato diferente. Esto significa que las direcciones en ambas blockchains son diferentes pero se puede demostrar que pertenecen a la misma persona.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">¿Qué monederos son compatibles con los tokens Rootstock y RIF?</Accordion.Header>
    <Accordion.Body>
      - Rootstock está actualmente soportado en diferentes monederos de software y hardware. Consulte las páginas [Monederos en Rootstock](/dev-tools/wallets/) para más información.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

## Características y funcionalidad de Rootstock

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿Qué es la minería combinada y cómo protege la red Rootstock?</Accordion.Header>
    <Accordion.Body>
      - La minería combinada es una técnica que permite a los mineros minar dos o más cadenas de bloques simultáneamente, utilizando la misma potencia hash y sin comprometer la seguridad de ninguna de las cadenas. La red Rootstock se mina de forma fusionada con la red Bitcoin y está diseñada de tal forma que la minería fusionada con Bitcoin no supone ninguna penalización de rendimiento para los mineros de Bitcoin. Por lo tanto, los mineros merge pueden obtener recompensas tanto en Rootstock como en Bitcoin simultáneamente.
      - El proceso de minería merge asegura la red Rootstock aprovechando la potencia hash de la red Bitcoin, la mayor y más segura blockchain del mundo. De este modo, Rootstock consigue una alta descentralización, fiabilidad e inmutabilidad para sus contratos inteligentes y transacciones.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">¿Qué protocolo de consenso utiliza Rootstock y cómo evita los ataques?</Accordion.Header>
    <Accordion.Body>
      - Rootstock utiliza DECOR+, una variante única del Consenso Nakamoto, con la capacidad de fusionarse con Bitcoin o cualquier otra blockchain, compartiendo el formato de bloque de Bitcoin y la prueba de trabajo.
      - El mecanismo de consenso proof-of-work (PoW) requiere que los mineros resuelvan un puzzle criptográfico para crear nuevos bloques y validar las transacciones. Esto evita los ataques, ya que hace que sea costoso y difícil para los actores maliciosos alterar la cadena de bloques o crear transacciones fraudulentas. PoW también garantiza que la cadena más larga y segura sea siempre válida.
    </Accordion.Body>
  </Accordion.Item>
   <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">¿Cuál es el rendimiento transaccional de Rootstock?</Accordion.Header>
    <Accordion.Body>
      - El límite de gas de bloque y la tasa media de bloque determinan el número de transacciones por segundo ejecutables en la plataforma Rootstock. La tasa media de bloque actual es de un bloque cada 30 segundos. El minero puede votar para aumentar el límite de gas de bloque en cada bloque minado. Actualmente, el límite de gas de bloque es de 6,8 millones de unidades de gas por bloque. Una simple transacción RBTC consume 21K de gas, por lo que la plataforma Rootstock puede ejecutar 11 transacciones por segundo hoy en día. Este límite podría aumentar activando una de las diversas propuestas de mejora, como la propuesta de transacciones paralelas especificada en RSKIP-144.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">¿Cuál es el tiempo medio de confirmación de transacciones de Rootstock?</Accordion.Header>
    <Accordion.Body>
      > - ¿Cuántas confirmaciones son necesarias?
      - Por término medio, la red genera actualmente un bloque cada 30 segundos. Los mineros pueden reducir el tiempo medio de bloque a 15 segundos optimizando sus operaciones de fusión y minería. Los sistemas que reciben pagos a través de Rootstock a cambio de un bien o servicio fuera de la blockchain de Rootstock deben esperar un número variable de bloques de confirmación, dependiendo de la cantidad involucrada en los pagos. Se recomienda un mínimo de 12 confirmaciones, lo que corresponde a un retraso medio de 6 minutos.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">¿Cuántas transacciones por segundo soportará la red Rootstock?</Accordion.Header>
    <Accordion.Body>
      - Las versiones beta de los nodos Rootstock mejorados se han probado para soportar 100 tx/s sin incidentes. A medida que mejore la tecnología, las transacciones por segundo podrán aumentar de forma similar.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">¿Cómo protege Rootstock su red de los ataques por agotamiento de recursos?</Accordion.Header>
    <Accordion.Body>
      - El "sistema de gas" de Rootstock impide que los atacantes creen, difundan e incluyan en bloques transacciones que consuman muchos recursos sin pagar las tarifas asociadas. Cada recurso, incluidos la CPU, el ancho de banda y el almacenamiento, se contabiliza mediante el consumo de una cantidad de gas. Cada bloque tiene un límite de gas, por lo que los recursos que puede consumir un bloque son limitados, haciendo ineficaz un ataque por agotamiento de recursos Además, los nodos Rootstock tienen un limitador inteligente de la tasa de transacciones que protege la red de ataques DoS antes de que las transacciones se incluyan en los bloques.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">¿Es seguro Rootstock frente a mineros que abusan del sistema de gas para adquirir recursos a bajo precio, como en Ethereum?</Accordion.Header>
    <Accordion.Body>
      - En Rootstock, hay un precio mínimo del gas y, por lo tanto, los mineros no pueden incluir transacciones que paguen cero tasas. El minero del bloque sólo se lleva el 10% de las tasas pagadas, y el resto se distribuye entre futuros mineros. Por lo tanto, los mineros deshonestos no pueden obtener recursos de la plataforma sin coste alguno. Después de que Ethereum activara el EIP-1559, Ethereum adoptó una protección similar denominada tarifa base.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="8">
    <Accordion.Header as="h3">¿Cuál es el formato de dirección de Rootstock y en qué se diferencia de Bitcoin?</Accordion.Header>
    <Accordion.Body>
      - Una dirección de Rootstock es un identificador de 40 caracteres hexadecimales, mientras que una dirección de Bitcoin es un identificador de 26-35 caracteres alfanuméricos. Las direcciones de Rootstock utilizan letras mayúsculas y minúsculas como mecanismo de suma de comprobación.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="9">
    <Accordion.Header as="h3">¿Existe una correlación entre las direcciones BTC y Rootstock a pesar de parecerse a las direcciones ETH?</Accordion.Header>
    <Accordion.Body>
      - Las direcciones de Rootstock son similares a las direcciones de Ethereum. Para evitar situaciones en las que los usuarios envían fondos por error a direcciones Ethereum o viceversa, Rootstock utiliza un mecanismo de suma de comprobación de direcciones que distingue entre cadenas. Esto se utiliza actualmente en casi todas las redes similares a Ethereum. Aunque no se aplica en el propio nodo, es importante tenerlo en cuenta a nivel de cliente (por ejemplo, los monederos). El mecanismo de suma de comprobación se describe en la propuesta de mejora de la raíz [RSKIP-60](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="10">
    <Accordion.Header as="h3">¿Qué es el token RIF y cuál es su propósito?</Accordion.Header>
    <Accordion.Body>
      ...
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

## Servicios de Rootstock y RIF

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿Qué es RIF y cuáles son sus objetivos?</Accordion.Header>
    <Accordion.Body>
      - Rootstock Infratstructure Framework](/conceptos/rif-suite/) (RIF) es un conjunto de protocolos de infraestructura abiertos y descentralizados que permiten un desarrollo de aplicaciones distribuidas (dApps) más rápido, sencillo y escalable dentro de un entorno unificado. RIF se basa en la red de contratos inteligentes Rootstock, el primer contrato inteligente de propósito general asegurado por la red Bitcoin. RIF incluye soporte para redes de pago descentralizadas, de terceros y fuera de la cadena, así como interfaces fáciles de usar para los desarrolladores.
      - El objetivo de RIF es salvar la brecha existente entre las tecnologías blockchain y su adopción masiva en el mercado, proporcionando a desarrolladores y usuarios acceso a diversos servicios a través de múltiples criptoeconomías.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">¿Cuál es exactamente la propuesta de valor de RIF?</Accordion.Header>
    <Accordion.Body>
      - RIF es una capa de servicios construida sobre la blockchain Rootstock, que ofrece herramientas y tecnologías abiertas y descentralizadas. Con RIF, los desarrolladores pueden crear productos DeFi escalables de forma rápida y sencilla.
      - El token RIF es el token nativo del ecosistema RIF. Es un activo de utilidad utilizado para interactuar con los productos y servicios de RIF.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">¿Qué es RIF Name Service?</Accordion.Header>
    <Accordion.Body>
      - RIF Name Service](/conceptos/rif-suite/) (RNS) es un protocolo que permite la identificación de direcciones de blockchain mediante nombres o alias legibles por humanos. Puede identificar otros recursos personales, como direcciones de pago o comunicación, contratos inteligentes y fichas no fungibles (NFT).
      - RNS hace que la interacción con los recursos de blockchain sea más fácil, más fácil de usar y mejora la interoperabilidad entre diferentes plataformas.
      > Puede obtener más información sobre RNS visitando el [sitio web de RIF](https://rif.technology) o leyendo el [Libro Blanco de RIF](https://rif.technology/static/add903ce229a6f45a606cd78b028cf9e/RIF-whitepaper-V2.pdf).
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">¿Puedo registrar un dominio en RNS y luego venderlo en un mercado secundario?</Accordion.Header>
    <Accordion.Body>
      - Cualquiera que registre un dominio en RNS puede venderlo directamente o a través de un mercado secundario de terceros.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header as="h3">¿Qué es RIF Rollup? ¿Cómo funciona RIF Rollup L2 Solution scale Payments en Rootstock?</Accordion.Header>
    <Accordion.Body>
      - RIF Rollup es un protocolo fiable para pagos rápidos, escalables y de bajo coste en Rootstock. La tecnología ZkRollup lo impulsa y es una bifurcación de Zero Knowledge zkSync Lite (v1) desarrollado por Matter Labs. Su funcionalidad y alcance actuales incluyen transferencias a bajo gas de tokens RBTC y ERC20 en la red Rootstock.
      - RIF Rollup es una solución de escalado de capa 2 que opera sobre la red principal de Rootstock (capa 1) para aumentar la capacidad de procesamiento de transacciones, reducir la latencia y disminuir los costes de las transacciones. Utiliza zk-SNARKs (Succinct Non-Interactive ARgument of Knowledge) para demostrar la corrección de los lotes de transacciones. Utiliza la disponibilidad de datos en la cadena para mantener a salvo los fondos de los usuarios al tiempo que mantiene la seguridad de la capa 1 (Rootstock).
      - Funciona de la siguiente manera
      > Un grupo de transacciones de capa 2 se incluye en un bloque Rollup. Los cambios de estado asociados a todas las transacciones de capa 2 se comunican a la capa 1 mediante datos de llamada a transacción. En caso de algún fallo irrecuperable del sistema de rollup, la disponibilidad de los datos permite a los usuarios reconstruir el estado de la capa 2 y recuperar los activos bloqueados del contrato de rollup. Para cada bloque de rollup, se genera un SNARK (una familia de sistemas de pruebas criptográficas) para demostrar la validez de cada una de las transacciones del bloque de rollup. Una vez generada la prueba, puede verificarse utilizando el contrato Rollup en la capa 1.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header as="h3">¿Qué es RIF Flyover?</Accordion.Header>
    <Accordion.Body>
      - RIF Flyover es un protocolo que proporciona a los usuarios una forma rápida y segura de transferir Bitcoin (BTC) dentro y fuera del ecosistema del Rootstock. Una vez que el BTC está en el Ecosistema Rootstock, puede interactuar con varias aplicaciones para enviar, guardar y gastar dinero.
      - RIF Flyover permite a los usuarios ganar intereses, acceder a préstamos, protegerse contra la inflación y mucho más, todo ello de forma descentralizada y resistente a la censura. Básicamente, Bitcoin deja de ser un simple depósito de valor para convertirse en un sistema financiero totalmente descentralizado. Esto facilita la incorporación de clientes a DeFi en Bitcoin.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header as="h3">¿Qué es RIF Wallet?</Accordion.Header>
    <Accordion.Body>
      - RIF Wallet es un marco de monedero de código abierto que permite a las empresas y desarrolladores construir rápidamente una experiencia de monedero única, dando a los usuarios el control total de sus activos.
      - Su tecnología de contratos inteligentes permite funcionalidades que mejoran la seguridad, la usabilidad y la adopción. RIF Wallet es un marco de monedero de código abierto que permite a las empresas y a los desarrolladores construir rápidamente una experiencia de monedero, dando a los usuarios el control total de sus activos.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

## Seguridad y escalabilidad de Rootstock

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿Qué es la Federación del PowPeg y cuál es su papel en la vinculación bidireccional?</Accordion.Header>
    <Accordion.Body>
      - La Federación PowPeg es un grupo de funcionarios que utilizan un hardware especializado llamado PowHSM para facilitar la transferencia de bitcoins entre la cadena principal y la cadena lateral y proteger los bitcoins bloqueados en la vinculación bidireccional entre Rootstock y Bitcoin. La Federación PowPeg no controla directamente las claves privadas de la multisig de Bitcoin, sino que sólo firma las transacciones cuya validez ha sido demostrada por suficiente trabajo acumulativo. La PowPeg Federation también proporciona un servicio de torre de vigilancia para informar al contrato inteligente Rootstock Bridge sobre las transacciones de peg-in. El papel de la Federación PowPeg es mantener su hardware y nodos conectados y vivos en todo momento y auditar los cambios en el PowHSM, el nodo Powpeg y la comunicación entre ellos.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">¿Qué es el sistema de vigilancia Armadillo?</Accordion.Header>
    <Accordion.Body>
      > - ¿Cómo protege la red Rootstock de mineros malintencionados?
      - El sistema de monitorización Armadillo es una herramienta que detecta y alerta sobre posibles ataques a la red Rootstock. Utiliza las cabeceras de bloque de la red Rootstock y la información de Coinbase de la red Bitcoin para medir el porcentaje de minería merge honesta. Si el porcentaje cae por debajo del 50%, la mayoría de los mineros podrían estar intentando atacar la red Rootstock creando una cadena oculta o censurando transacciones.
      - El sistema Armadillo protege la red Rootstock de mineros maliciosos proporcionando información oportuna y precisa a los nodos y a la comunidad. Los nodos Rootstock pueden utilizar los datos de Armadillo para ajustar sus parámetros de seguridad y rechazar bloques que no sean suficientemente visibles. La comunidad puede utilizar los datos de Armadillo para supervisar la salud de la red y tomar medidas para mitigar el riesgo de un ataque.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">¿Qué es la máquina virtual Rootstock y cómo es compatible con Ethereum?</Accordion.Header>
    <Accordion.Body>
      - La máquina virtual Rootstock (RVM) es el núcleo de la plataforma de contratos inteligentes Rootstock. La RVM es una versión bifurcada de la máquina virtual de Ethereum (EVM), lo que significa que puede ejecutar el mismo código de bytes y opcodes que la EVM. La RVM es compatible con los contratos inteligentes de Ethereum y las herramientas utilizadas para desplegarlos e interactuar con ellos, como Solidity, Hardhat, Foundry, Remix, etc. El RVM también tiene características tales como soporte nativo para opcodes Bitcoin, contratos precompilados para criptografía de curva elíptica, y un pipeline de mejora de rendimiento.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">¿Qué es Rootstock two-way peg y cómo funciona?</Accordion.Header>
    <Accordion.Body>
      - El Rootstock two-way peg es un protocolo que permite a los usuarios transferir bitcoins de la blockchain de Bitcoin a la blockchain de Rootstock y viceversa, creando un token llamado RBTC que está vinculado al valor de Bitcoin. La vinculación bidireccional de Rootstock funciona bloqueando bitcoins en una dirección multi-firma en el lado de Bitcoin y liberando una cantidad equivalente de RBTC en el lado de Rootstock. El proceso inverso también es posible quemando RBTC en el lado Rootstock y desbloqueando bitcoins en el lado Bitcoin. Un grupo de organizaciones acreditadas controla la dirección multifirma denominada PowPeg Federation, que utiliza dispositivos de hardware especiales denominados PowHSM para proteger las claves privadas y validar las transacciones. Los PowHSM sólo firman transacciones aprobadas por las redes Rootstock y Bitcoin mediante un mecanismo de prueba de trabajo. De este modo, el Rootstock two-way peg garantiza una alta seguridad y descentralización para las transacciones peg-in y peg-out.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```
