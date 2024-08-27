---
sidebar_label: Visión general
sidebar_position: 100
title: RIF Relay - Visión general
tags:
  - rif
  - sobre
  - relé
  - integrar
  - guía de integración
description: Visión general del relé RIF
---

La mayoría de las cadenas de bloques tienen criptomoneda nativa para pagar las tasas de transacción y el consumo de gas; este sencillo diseño tiene muchas ventajas. En primer lugar, para poner en marcha una economía, el modelo de criptomoneda nativa crea una demanda inicial. En segundo lugar, simplifica la interacción entre usuarios y mineros porque les obliga a utilizar el mismo medio de pago. En tercer lugar, reduce la complejidad de las reglas de consenso. Por último, proporciona protección contra la denegación de servicio (DoS) a la red, ya que los nodos llenos pueden pagar lo que los mineros esperan incluir en una transacción recibida. De este modo, los nodos pueden decidir propagar o no una transacción, evitando el consumo gratuito del ancho de banda de la red, y detener las transacciones spam.

Las criptomonedas tienden a asociarse con la volatilidad y, para contrarrestar este hecho, se introdujeron las Stablecoins. Las stablecoins tienden un puente entre el mundo de las criptomonedas y el de la moneda fiduciaria, ya que sus precios están vinculados a un activo de reserva como el dólar estadounidense o el oro.

Pero con la llegada de las Finanzas Descentralizadas (DeFi), varias monedas estables se han convertido en el medio preferido de pago y ahorro tanto para usuarios como para mineros, por lo que se han creado sistemas independientes para facilitar mecanismos de pago alternativos. Las transacciones que permiten pagar operaciones con cualquier moneda que no sea la nativa se denominan meta-transacciones porque en algunos sistemas la transacción del usuario está incrustada en una transacción de nivel superior (o meta) creada por un tercero. Un término más accesible para estas transacciones es "sobres" o, para el conjunto del sistema, un sistema de relés. Una metatransacción/sistema de retransmisión puede servir al menos para dos casos de uso diferentes: 1) pagar las tasas de transacción con tokens, donde una nueva parte recibe los tokens (del usuario) y paga las tasas en nombre del usuario, y 2) permitir a los desarrolladores de contratos inteligentes subvencionar el gas utilizado para interactuar con sus contratos.

Teniendo esto en cuenta, el objetivo principal del proyecto RIF Relay es **proporcionar al ecosistema Rootstock (RSK) los medios para permitir que las aplicaciones de blockchain y los usuarios finales (wallet-apps) realicen transacciones sin necesidad de RBTC**. El sistema debe permitir a los usuarios de Rootstock (RSK) pagar las tasas de transacción con métodos de pago (es decir, tokens) distintos de RBTC, manteniendo al mismo tiempo sus cuentas como remitentes de transacciones.

RIF Relay se inspira en el proyecto [Gas Station Network (GSN)](https://github.com/opengsn/gsn). GSN es un sistema descentralizado que mejora la usabilidad de la dApp sin sacrificar la seguridad. En pocas palabras, GSN se abstrae del gas (utilizado para pagar las tasas de transacción) para minimizar las fricciones en la integración y la experiencia de usuario de las aplicaciones digitales. Con GSN, los "clientes sin gas" pueden interactuar con contratos inteligentes pagando por el gas con tokens en lugar de moneda nativa.
