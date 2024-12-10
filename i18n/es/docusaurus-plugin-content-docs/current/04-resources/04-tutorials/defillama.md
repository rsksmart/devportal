---
sidebar_position: 6
title: Añadir un protocolo a DefiLama
sidebar_label: Añadir un protocolo a DefiLama
description: DefiLlama es el mayor agregador de TVL para DeFi. Aprenda cómo listar un proyecto DeFi y escribir un adaptador SDK para agregar un Protocolo a DefiLlama.
tags:
  - base de conocimientos
  - defillama
  - protocol
  - rootstock
  - defi
---

<!-- ![DefiLlama](/img/resources/defillama-logo.png)  -->

[DefiLlama](https://defillama.com/) es el principal agregador para el valor total bloqueado (TVL) en el ecosistema de finanzas descentralizadas (DeFi). Sus datos de código abierto son mantenidos por una comunidad de colaboradores de varios protocolos. DefiLama prioriza la precisión y transparencia en su metodología.

TVL se calcula evaluando el valor de las fichas bloqueadas en los contratos de protocolos y plataformas DeFi. Mientras que los proyectos de puente están incluidos en el cálculo, su TVL no contribuye a la TVL total de ninguna cadena de bloques específica.

> Échale un vistazo al [sitio web de DefiLlama](https://defillama.com/) y a los [documentos de DefiLlama](https://docs.llama.fi/list-your-project/readme) para más detalles.

## Cómo listar un proyecto DeFi

La mayoría de los adaptadores destacados en DefiLama son proporcionados y gestionados por sus comunidades individuales, y cualquier modificación se organiza a través del repositorio de GitHub [DefiLlama/DefiLlama-Adapters](https://github.com/DefiLlama/DefiLlama-Adapters) de GitHub.

<div class="btn-container">
  <span></span>
    <a class="green" href="https://docs.llama.fi/list-your-project/submit-a-project">Cómo Enviar un proyecto</a>
</div>

## Cómo escribir un adaptador SDK

Un adaptador es una pieza de código diseñada para recibir una marca de tiempo UNIX y alturas de bloques de blockchain como entradas. Luego proporciona los saldos de activos mantenidos dentro de un protocolo, considerando los decimales asociados (es decir, cómo se almacenan en el blockchain). El SDK maneja la conversión de saldos de activos en bruto a su equivalente en USD y los agrega para calcular el total de la TVL. En consecuencia, el adaptador requiere un procesamiento mínimo, ya que la mayor parte del trabajo de conversión es realizado por el SDK.

<div class="btn-container">
  <span></span>
    <a class="green" href="https://docs.llama.fi/list-your-project/how-to-write-an-sdk-adapter">Cómo escribir un adaptador SDK</a>
</div>

## Recursos

- Visita [DeFiLama About](https://defillama.com/about) para aprender más.
