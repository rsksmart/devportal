---
sidebar_label: Hacktivator
sidebar_position: 2
title: 🌱 Hacktivator de Rootstock 💻
description: El Hacktivator de Rootstock les permite a los desarrolladores integrarse a Rootstock mediante la contribución de código o la creación de contenido educativo. Usted puede contribuir al desarrollo de la plataforma a su propio ritmo, y cada contribución elegible será recompensada según su impacto y valor.
tags:
  - rootstock
  - rsk
  - código
  - recursos
  - contenido
  - hacktivator
  - escritura
  - recompensas
---

¡Bienvenido al Hacktivator de Rootstock! Diseñado para desarrolladores que desean contribuir al ecosistema de Rootstock y recibir recompensas por sus valiosas contribuciones.

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">Envíe su trabajo</Button>

## 🌟 ¿Qué es?

El Hacktivator de Rootstock les permite a los desarrolladores integrarse a Rootstock mediante la contribución de código o la creación de contenido educativo. Usted puede contribuir al desarrollo de la plataforma a su propio ritmo, y cada contribución elegible será recompensada según su impacto y valor.

## ✔️ Criterios generales de contribución

- **Calidad:** Las contribuciones deben ser valiosas para el ecosistema de Rootstock, ya sea al mejorar la funcionalidad, optimizar la usabilidad o educar a desarrolladores y miembros de la comunidad.
- **Originalidad:** Todo el trabajo debe ser original y creado por usted. Las traducciones o adaptaciones deben mantenerse fieles al material original.
- **Relevancia:** Las contribuciones deben beneficiar directamente a la comunidad de desarrolladores y al ecosistema de Rootstock.
- **Precisión:** El código, los tutoriales y cualquier otro contenido técnico deben ser precisos y técnicamente correctos.

## 🎁 Recompensas por categoría

Las contribuciones elegibles serán recompensadas según lo establecido en los términos y condiciones del hacktivator, y en función del valor e impacto que aporten a la comunidad de desarrolladores de Rootstock, de acuerdo con las especificaciones que se detallan a continuación para cada categoría.

### Categoría 1: Contribuciones de código 🛠️

Se invita a los desarrolladores a aprovechar los proyectos de referencia para hacer contribuciones significativas al ecosistema de Rootstock. Vea las opciones a continuación:

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. CLI (herramientas para desarrolladores)</Accordion.Header>
    <Accordion.Body>
      La [CLI de Rootstock](https://github.com/rsksmart/rsk-cli) es una interfaz de línea de comandos diseñada para simplificar el proceso de creación en la plataforma Rootstock, dirigida tanto a desarrolladores experimentados de web3 como a aquellos en transición desde web2. En su versión inicial, la CLI ofrece funciones esenciales que agilizan el desarrollo facilitando la interacción con la red. Tanto si está creando carteras, comprobando saldos, enviando transacciones o desplegando contratos, la CLI de Rootstock simplifica estas tareas, permitiéndole centrarse más en la creación de sus aplicaciones y menos en la gestión de la infraestructura. Para más detalles, consulte la [CLI Repo](https://github.com/rsksmart/rsk-cli) y el [NPM Package](https://www.npmjs.com/package/@rsksmart/rsk-cli).

      **Ideas de Contribución:**

        * Comprobar Saldos: Implementar características para comprobar fácilmente los saldos de cualquier dirección en Rootstock.

        * Transferir Cualquier Token:  Permitir la transferencia de cualquier token en la red Rootstock, garantizando la compatibilidad con los principales estándares de token (por ejemplo, ERC-20, ERC-721) para una experiencia de usuario sin fisuras

        * Enviar transacciones: Simplifique el envío de transacciones con comandos incorporados.

        * Historial de transacciones:  Mostrar el historial de transacciones de la cartera actual

        * Libreta de direcciones: Añadir una función de libreta de direcciones para las direcciones de uso frecuente, con fácil etiquetado y cifrado opcional para un almacenamiento seguro.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Marcador de votos</Accordion.Header>
    <Accordion.Body>
      El [Voting Scoreboard](https://github.com/rsksmart/rootstock-scoreboard) es una herramienta que demuestra cómo los tokens ERC-20 pueden ser utilizados para votar, con una tabla de clasificación para realizar un seguimiento de la participación de la comunidad y los principales participantes. Aunque no es una herramienta de producción completa, sino más bien un proyecto de referencia, es ideal para desarrolladores o creadores de proyectos que deseen integrar fácilmente mecanismos de votación en sus ecosistemas y supervisar la participación, por lo que es perfecto para campañas promocionales o para medir el interés en un proyecto a través de la participación en la cadena. Para más detalles, consulte la [Voting Scoreboard Repo](https://github.com/rsksmart/rootstock-scoreboard).

      **Ideas de contribución:**

        * ERC-20 Token Voting: Configurar tokens ERC-20 para la votación, permitiendo a los usuarios votar sobre propuestas o elecciones dentro de un proyecto.

        * Visualización de la clasificación: Seguimiento de la participación de los votantes por lo que es fácil destacar los miembros de la comunidad más comprometidos.

        * Integración de identidades en la cadena: Incorpora dominios RNS u otras identidades en la cadena para tablas de clasificación personalizadas.

        * Representaciones gráficas: Añade tablas o gráficos para visualizar las posiciones de los líderes a lo largo del tiempo.

        * Cambios de posición: Muestra cómo cambian las clasificaciones de los participantes diaria o semanalmente, proporcionando transparencia en la dinámica de votación.

        * Temporizador de cuenta atrás: Incluye una cuenta atrás para indicar cuándo finaliza el periodo de votación, creando una sensación de urgencia para los participantes.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. RUNES & MEME Giveaway Engine: Una herramienta para el lanzamiento de tokens</Accordion.Header>
    <Accordion.Body>
      Giveaway Engine es un proyecto de demostración que ofrece a los desarrolladores un modelo para configurar lanzamientos aéreos y regalos de tokens en la red Rootstock. Aunque no es una herramienta lista para la producción, sirve como referencia técnica para la distribución de tokens como RUNES (una vez transferidos a Rootstock como tokens ERC-20 o ERC-1155) o cualquier token ERC-20 / ERC-1155 en general. Este motor proporciona un camino de ejemplo para involucrar a las comunidades y crear entusiasmo en torno a los proyectos a través de la distribución de tokens. Para más detalles, consulte la [Airdrop Template](https://github.com/rsksmart/airdrop-template) y la [Airdrop UI](https://github.com/rsksmart/airdrop-ui).

      **Ideas de contribución:**

        * Configurar un Token Airdrop: Implementar airdrops de tokens ERC-20 o RUNES.

        * Elegibilidad basada en estacas: Añadir reglas para recompensar a los usuarios que han apostado tokens en otro protocolo, fomentando una mayor participación en el ecosistema.

        * Actividad en la cadena: Crear reglas para distribuir tokens basadas en acciones en la cadena como interactuar con un contrato o votar una propuesta.

        * Elegibilidad basada en tenencias: Recompensar a los usuarios en función del número de tokens que posean, incentivando la lealtad y el compromiso a largo plazo.

        * Criterios de dominio RNS: Airdrop tokens a los usuarios que posean dominios RNS específicos, añadiendo una capa única a la interacción de la comunidad.

        * Añade un nuevo sistema de recompensas: Introduce un nuevo sistema de recompensas, como un sistema de recompensas aleatorio o por niveles

        * Airdrops y caducidades por tiempo limitado: Implementa sorteos por tiempo limitado en los que las recompensas no reclamadas se redistribuyan, creando urgencia y fomentando la participación inmediata.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. Meme Token Launchpad</Accordion.Header>
    <Accordion.Body>
      El [Meme Token Launchpad](https://github.com/rsksmart/meme-token-launch) es una herramienta fácil de usar que simplifica el proceso de creación y lanzamiento de sus propios tokens ERC-1155/ERC-20. Está dirigido tanto a desarrolladores experimentados como a usuarios avanzados. Está dirigida tanto a desarrolladores experimentados como a novatos, ya que permite a los usuarios definir los parámetros de los tokens, como el nombre y el ticker, e incluso almacenar imágenes a través de IPFS. Integrado con Etherspot para el despliegue sin gas, hace que la creación de tokens sea más accesible al eliminar las complejidades y los costes asociados a las comisiones. Para más detalles, consulte el [Meme Token Repo](https://github.com/rsksmart/meme-token-launch).

      **Ideas de contribución:**

        * Parámetros adicionales de acuñación: Implementar opciones de acuñación adicionales.

        * Mecanismos de quemado: Definir e implementar mecanismos de quema de tokens para aumentar la escasez o recompensar a los poseedores.

        * Plataforma de diversión: Construir una plataforma para mostrar y promocionar los nuevos tokens, creando un entorno atractivo para los degens y los creadores.

        * Token Vesting and Timelock: Permitir a los usuarios establecer calendarios de adquisición de derechos o timelocks para los tokens, lo cual es útil para los fundadores, los primeros inversores o las recompensas de la comunidad.

        * Integración de gobernanza:  Incluye opciones para crear tokens de gobernanza o añadir módulos de votación, permitiendo a los usuarios crear DAOs o proyectos impulsados por la comunidad directamente.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. Expansión del SDK multilingüe</Accordion.Header>
    <Accordion.Body>
      Esta sección introduce soporte para lenguajes de programación adicionales, mejorando la accesibilidad y facilidad de uso para los desarrolladores de diversos orígenes. Construidos sobre la blockchain Rootstock compatible con EVM, los SDK ofrecen potentes bibliotecas y servicios en lenguajes como **Rust**, **Python** y **Go**. Cada SDK específico de un idioma proporciona herramientas y utilidades esenciales para la gestión de tokens, la gestión de transacciones, las comprobaciones de elegibilidad, etc., atendiendo a diversas necesidades. Estas expansiones multilingües están diseñadas para ampliar el compromiso de los desarrolladores y simplificar las integraciones en múltiples entornos, consolidando los SDK como recursos versátiles y multiplataforma.

      <b/>
      **Ideas de contribución: Rust**

        * Biblioteca de procesamiento de transacciones:  Construir una librería en Rust para manejar transferencias de tokens, desplegar contratos y ejecutar transacciones para los estándares ERC-20 y ERC-1155, aprovechando la velocidad y seguridad de Rust.

        * Biblioteca Crypto Wallet:  Desarrollar un monedero ligero en Rust, con soporte para la gestión de claves privadas, firma y criptografía ECDSA, diseñado para la integración con aplicaciones de escritorio y servidor.

      <b/>

      **Ideas de contribución: Python**

        * Airdrop Eligibility Analyzer:  Crear una biblioteca Python que compruebe los criterios de elegibilidad (por ejemplo, dominios RNS propiedad, actividad en la cadena) para airdrops, conectando fácilmente a bases de datos o pipelines de análisis.

        * Visualización de datos para métricas de tokens:  Desarrollar una herramienta que utilice las bibliotecas de datos de Python (como Pandas y Matplotlib) para visualizar la distribución de tokens, los patrones de transferencia y los impactos de los airdrops.

        * Smart Contract Event Scraper:  Construir un script de Python para capturar y analizar eventos de contratos inteligentes de la cadena de bloques, almacenando datos relevantes para el seguimiento de la interacción del usuario o análisis.

      <b/>
      **Ideas de contribución: Go**

        * Backend para Airdrop y Giveaway Engine:  Utiliza Go para construir un backend de alto rendimiento que gestione la distribución de tokens, el registro y la comprobación de elegibilidad para el motor de regalos.

        * Microservicios de gestión de tokens:  Cree microservicios para operaciones relacionadas con tokens, como acuñación, grabación y transferencia, permitiendo a las aplicaciones llamar a funciones específicas según sea necesario.

        * Red de escucha de eventos:  Implementa un listener de eventos en Go para monitorizar contratos inteligentes para eventos relacionados con tokens, ideal para notificaciones o acciones automatizadas.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

#### 👉 Criterios para las contribuciones de código

Para una visión general completa del sistema de evaluación y recompensa para las contribuciones de código, que incluye criterios detallados sobre complejidad, impacto del proyecto, pruebas y documentación, consulte los [Criterios de evaluación para contribuciones de código](https://docs.google.com/document/d/1vWYWdWxSXUcTxNS_OlRikfEwmPSXgw3iDsQ-UAqheMw/edit) y los [términos y condiciones del hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). Estos criterios describen cómo se evaluarán y recompensarán las contribuciones, que van desde correcciones simples hasta características avanzadas o integraciones externas, asegurando un enfoque equilibrado y justo para valorar la participación e impacto de los desarrolladores. Este documento cubre todo, desde la optimización del rendimiento hasta la integración de API externas, con recompensas ajustadas según el valor y la complejidad de cada contribución.

#### 👉 Recompensas por contribuciones de código

Cada contribución de código verificada y aprobada que se convierta en una Contribución Calificada (según se define en los términos y condiciones de Hacktivator mencionados anteriormente) tendrá derecho a recibir las siguientes recompensas, conforme al mecanismo estipulado:

- **Nivel 1 -> 50 - 150 USD**
  - **Contribución básica (baja complejidad):** Corrección menor de la documentación o del estilo (por ejemplo, corrección de errores tipográficos, adición de un comentario que explique el propósito de una función).
- **Nivel 2 -> 150 - 300 USD**
  - Pequeñas mejoras (complejidad media-baja): Refactorizaciones u optimizaciones que no cambian la funcionalidad pero mejoran la eficiencia o legibilidad del código.
- **Nivel 3 -> 300 - 700 USD**
  - **Nueva función o mejora significativa (complejidad media-alta):** Implementación de una nueva función sencilla o mejora de la funcionalidad existente.
- **Nivel 4 -> 700 - 1000 USD**
  - **Contribución compleja o innovadora (alta complejidad):** Funciones a gran escala o cambios críticos que requieren la coordinación de varios componentes (por ejemplo, integración de API o cambios en la arquitectura del sistema).

> El rango de recompensas proporcionado para cada opción se utilizará en función del nivel de contribución al proyecto para calificar. Es decir, si el Contribuidor cumple solo con lo mínimo requerido para calificar, se le asignarán las recompensas mínimas para cada opción. Sin embargo, cuanto más aporte el Contribuidor a su contribución y opción elegidas, mayores serán las recompensas que podrá recibir (hasta el límite máximo establecido para cada opción).

### Categoría 2: Contenidos educativos 📝

Usted puede contribuir a la plataforma Rootstock creando uno de los siguientes tipos de contenido:

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Entradas de blog</Accordion.Header>
    <Accordion.Body>
      * Definición: Artículos atractivos que comparten noticias, puntos de vista, opiniones o experiencias relacionadas con el desarrollo de dApps en Rootstock y el ecosistema Rootstock.
      * Propósito: Informar y comprometer a la comunidad, suscitar debates y proporcionar liderazgo intelectual sobre temas relevantes.
      * Audiencia: Lectores en general, entusiastas de las criptomonedas y miembros de la comunidad interesados en los avances de Rootstock.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Guías escritas o tutoriales</Accordion.Header>
    <Accordion.Body>
      * Definición: Documentos instructivos paso a paso que ayudan a los lectores a aprender cómo realizar tareas específicas o entender conceptos relacionados con Rootstock.
      * Propósito: Educar a los usuarios y desarrolladores en el uso de las características, herramientas o aplicaciones de Rootstock.
      * Público: Desarrolladores, usuarios y cualquier persona que busque orientación práctica sobre Rootstock.
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Documentación técnica sobre Rootstock Docs</Accordion.Header>
    <Accordion.Body>
      * Definición: Documentación exhaustiva y explicaciones detalladas de la tecnología, los protocolos y la arquitectura subyacentes de Rootstock destinadas a un público técnico.
      * Propósito: Proporcionar información técnica completa, promover la transparencia y ayudar a los desarrolladores a comprender aspectos complejos de Rootstock.
      * Audiencia: Desarrolladores, ingenieros de blockchain y entusiastas técnicos interesados en los detalles técnicos de Rootstock.
    </Accordion.Body>
  </Accordion.Item>
    <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4. Video Guías o Tutoriales</Accordion.Header>
    <Accordion.Body>
      * Definición: Materiales instructivos visuales y auditivos que demuestran cómo realizar tareas o explican conceptos relacionados con Rootstock en formato de vídeo.
      * Propósito: Ofrecer una experiencia de aprendizaje visual, haciendo que la información compleja sea más accesible a través de demostraciones y guías.
      * Audiencia: Usuarios y desarrolladores que prefieren contenidos visuales para el aprendizaje y la resolución de problemas.
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

Sus contribuciones pueden cubrir cualquiera de los siguientes temas de Rootstock:

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="0">
    <Accordion.Header as="h3">1. Tutoriales de Desarrollo de Contratos Inteligentes</Accordion.Header>
    <Accordion.Body>
      Escribir, probar y desplegar contratos inteligentes en la red Rootstock.

      **Ideas de contribución:**
        * Guías paso a paso sobre la creación de varios tipos de contratos inteligentes (por ejemplo, tokens, DeFi, carteras, swaps, RWAs, NFTs, Runas, Ordinales, indexación, interoperabilidad).
        * Explicación de las características únicas de Rootstock y cómo pueden utilizarse en el desarrollo de contratos inteligentes.
        * Depuración y solución de problemas comunes en el desarrollo de contratos inteligentes.

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">2. Integración con Rootstock y soluciones del ecosistema</Accordion.Header>
    <Accordion.Body>
      Demostrando cómo utilizar e integrar herramientas compatibles con Rootstock y bibliotecas.

      **Ideas de contribución:**
        * Explicación del concepto de sidechain y cómo Rootstock lo utiliza.
        * Guías paso a paso sobre la integración de monederos, SDK o API con aplicaciones de Rootstock.
        * Guías paso a paso sobre el uso de dApps del ecosistema - consulte la serie "Building DeFi on Bitcoin" en el blog de Rootstock.

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header as="h3">3. Guías específicas de casos de uso - Estudios de casos y ejemplos del mundo real</Accordion.Header>
    <Accordion.Body>
      Compartir ejemplos del mundo real de aplicaciones y casos de uso de Rootstock.

      **Ideas de contribución:**
        * Creación de dApps multiplataforma o sin código (por ejemplo, desarrollo de aplicaciones móviles con Flutter, etc.).
        * Mostrar aplicaciones del mundo real en Rootstock.
        * Creación de aplicaciones de cadena cruzada, indexación de datos, etc., utilizando herramientas e integraciones de socios.
        * Portar dApps a Rootstock desde otros ecosistemas

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header as="h3">4.  Herramientas y bibliotecas</Accordion.Header>
    <Accordion.Body>
      Presentación y explicación de varias herramientas y bibliotecas que se pueden utilizar para el desarrollo de Rootstock.

      **Ideas de contribución:**
        * Tutoriales sobre el uso de entornos de desarrollo populares (por ejemplo, Remix, Hardhat, Slither, Viem).
        * Explicar el uso de marcos de pruebas y bibliotecas para las pruebas de contratos inteligentes.
        * Demostración de cómo utilizar las herramientas de depuración para identificar y solucionar problemas en las aplicaciones Rootstock.

    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header as="h3">5. Temas Avanzados y Mejores Prácticas</Accordion.Header>
    <Accordion.Body>
      Ampliar en aspectos más complejos de desarrollo Rootstock y compartir las mejores prácticas.

      **Ideas de contribución:**
        * Explorar conceptos complejos y cómo mejoran la escalabilidad en Rootstock.
        * Discutir las consideraciones de seguridad en el desarrollo de contratos inteligentes y las mejores prácticas para evitar vulnerabilidades.
        * Explorar temas avanzados como las finanzas descentralizadas (DeFi), Runas, Ordinales, BITVMX, y sus posibles aplicaciones en Rootstock.

    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

#### 👉 Criterios y guías de contenido educativo:

- Los blogs, tutoriales (escritos o en video) y la documentación técnica deben ser contenidos originales creados después del lanzamiento de Hacktivator el 11 de noviembre **(no publicados previamente en otro lugar)**, deben ser rigurosos y proporcionar información práctica. Comparta su contenido mediante Google Drive proporcionando la URL en el formulario de envío (enlace a continuación).
- El contenido educativo debe estar dirigido a desarrolladores que quieran construir sobre Rootstock o comprender su integración con Bitcoin.
- El contenido debe ayudar a otros desarrolladores a navegar y trabajar con Rootstock, implementar contratos inteligentes, utilizar herramientas, kits de desarrollo de software y bibliotecas compatibles, e integrar protocolos en Rootstock.
- Las contribuciones para la documentación técnica de Rootstock deben enviarse como una solicitud de incorporación de cambios (Pull Request, PR) directamente en el [repositorio de DevPortal](https://github.com/rsksmart/devportal/pulls), y el enlace de la PR debe ser enviado a través del [formulario de Google](https://forms.gle/aF9pFMfRyoygfzJWA). Asegúrese de utilizar la etiqueta **“hacktivator”** en la PR y de describir adecuadamente su PR utilizando la plantilla.
- Una vez aprobado, el colaborador deberá publicar su contenido educativo en el [blog de la Comunidad Rootstock](https://rootstock.hashnode.dev/) para poder optar a las recompensas. Para ello se les invitará como colaboradores, y la contribución solo podrá optar a recompensas una vez publicada con éxito.

:::note Más información sobre las guías

Para una visión general completa de las pautas, evaluación y sistema de recompensas para las contribuciones de contenido, que incluye criterios detallados sobre profundidad, exhaustividad, precisión técnica, valor educativo e innovación, consulte los [Criterios de evaluación y pautas para contenido educativo](https://docs.google.com/document/d/1vA3QK8ZNv5Fgegb0Jv2f03IVIREePDi4lrFE1vsfK7c/edit) y los [términos y condiciones del Hacktivator](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). Estos criterios describen cómo se evaluarán y recompensarán las contribuciones, que van desde documentación técnica hasta guías o tutoriales escritos o en video, asegurando un enfoque equilibrado y justo para valorar la calidad e impacto del contenido. Este documento cubre todo, desde la adecuación del recuento de palabras y la inclusión de ejemplos de código hasta la corrección técnica y la relevancia para el ecosistema de Rootstock, con recompensas ajustadas según el valor y la complejidad de cada contribución.

👉 Pautas a la hora de publicar:

- Siga la [Guía de estilo de Rootstock](https://github.com/rsksmart/devportal/blob/main/STYLE-GUIDE.md)
- Vea [Contribuir a la documentación de Rootstock](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING_DOCS.md) y [Pautas para los colaboradores de Rootstock](https://github.com/rsksmart/devportal/blob/main/CONTRIBUTING.md)

:::

#### 👉 Recompensas de contenido educativo:

Cada contribución de código verificada y aprobada que se convierta en una Contribución Calificada (según se define en los términos y condiciones de Hacktivator) tendrá derecho a recibir las siguientes recompensas, conforme al mecanismo estipulado:

- **Contribución de publicación en el blog:** 50 - 250 USD
- **Contribución de escritura de guías o tutoriales:** 250 - 500 USD
- **Contribución de contenido técnico:** 500 - 700 USD
- **Contribución de guías o tutoriales en video:** 700 - 1000 USD

El rango de recompensas proporcionado para cada opción se utilizará en función del nivel de contribución al proyecto a calificar. Es decir, si el Contribuidor cumple solo con lo mínimo requerido para calificar, se le asignarán las recompensas mínimas para cada opción. Sin embargo, cuanto más aporte el Contribuidor a su contribución y opción elegidas, mayores serán las recompensas que podrá recibir (hasta el límite máximo establecido para cada opción).

## 📤 Proceso de envío

Es muy fácil enviar sus contribuciones. Solo siga estos pasos:

1. Complete su trabajo: Ya sea código o contenido educativo, asegúrese de que esté completamente terminado y cumpla con los criterios de contribución.
2. Envíe su contribución a través del formulario de Google: Use este [enlace al formulario](https://forms.gle/aF9pFMfRyoygfzJWA) para enviarla. Se le pedirá que proporcione:

- Su nombre o seudónimo
- País
- Dirección de correo electrónico
- La dirección de su billetera
- El tipo de contribución y los detalles relevantes
- Una breve descripción de su trabajo.
- Un enlace a su propuesta (por ejemplo: PR, GitHub para código, o enlaces a blogs o tutoriales escritos o en video).

3. Revisión: Su propuesta será revisada por expertos. Es posible que se le pida realizar modificaciones o que proporcione más información.

Esta es su oportunidad de dejar una huella significativa en Rootstock a la vez que gana recompensas. ¿Está listo para contribuir? ¡Envíe su trabajo y forme parte de la comunidad de desarrolladores de Rootstock! 🌍

<Button size="lg" href="https://forms.gle/aF9pFMfRyoygfzJWA">Envíe su trabajo</Button>

:::success Términos y condiciones

Al participar en Hacktivator, usted reconoce que ha leído, comprendido y acepta cumplir con todos los aspectos del programa y sus [términos y condiciones](https://docs.google.com/document/d/1i95IIgBccohELezcrBraXWBtWEH1LaPLe3p_Zf1LzPQ/edit?usp=sharing). Si no está de acuerdo con alguna parte o con todos los términos del programa o sus términos y condiciones, absténgase de unirse o enviar contribuciones, ya que su participación será interpretada como una aceptación total de estos términos.

:::


