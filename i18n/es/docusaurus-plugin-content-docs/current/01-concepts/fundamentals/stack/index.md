---
section_label: La pila
title: Pila de portainjertos
sidebar_label: La pila
sidebar_position: 200
tags:
  - rsk
  - portainjertos
  - pila
  - arquitectura
description: Descubra cómo Rootstock combina la seguridad de Bitcoin PoW con la funcionalidad de contratos inteligentes de Ethereum para crear dApps en Bitcoin y también cómo las herramientas y tecnologías de código abierto de RIF están diseñadas para agilizar e incentivar el desarrollo en Bitcoin.
---

La máquina virtual Rootstock (RVM) es el núcleo de la plataforma de Contratos Inteligentes. Todos los nodos completos de la red ejecutan contratos inteligentes. El resultado de la ejecución de un contrato inteligente puede ser el procesamiento de mensajes entre contratos, la creación de transacciones monetarias y el cambio del estado de la memoria persistente del contrato. El RVM es compatible con EVM a nivel de op-code, permitiendo que los contratos de Ethereum se ejecuten sin problemas en Rootstock.

Actualmente, la VM se ejecuta mediante interpretación. En una futura actualización de la red, la comunidad Rootstock pretende mejorar sustancialmente el rendimiento de la máquina virtual. Una propuesta es emular la EVM reorientando dinámicamente los opcodes de la EVM a un subconjunto de bytecode similar a Java, y una VM similar a Java reforzada en seguridad y restringida en memoria se convertirá en la nueva VM (RVM2). Esto puede llevar la ejecución de código Rootstock a un rendimiento cercano al del código nativo.

## Características principales:

- Máquina virtual independiente, altamente compatible con EVM a nivel de opcode.
- Ejecute DApps de Ethereum con la seguridad de la red Bitcoin
- Canal de mejora del rendimiento documentado en numerosos RSKIP creados por la comunidad Rootstock
  - Véanse las [Propuestas de mejora de portainjertos](https://github.com/rsksmart/RSKIPs).

Pila tecnológica del patrón - Alto nivel](/img/concepts/rootstock-tech-stack.svg)

<section>
<div class="row">
  <div class="col two-x-card">
  <div class="header-div">
      <h2 class="zg-text-bg fs-28">Bitcoin</h2><h3 class="fp-title-color fp-title-color-sm"><span class="ml-1 zg-label">BTC</span></h3>
  </div>
    <p> Es un almacén y transferencia de valor.
La blockchain es segura porque los mineros
con elevados costes de infraestructura y energía
crean los nuevos bloques que se añaden a la blockchain cada 10 minutos.
Cuanta más potencia de hashing proporcionen, más segura será la red.</p>
  </div>
    <div class="col two-x-card">
        <div class="header-div"><h2 class="zg-text-bg fs-28">Portainjerto</h2><h3 class="fp-title-color fp-title-color-sm"><span class="ml-1 zg-label">RBTC</span></h3></div>
            <p> Es la primera plataforma de contratos inteligentes de código abierto
        impulsada por la red bitcoin.
        El objetivo de Rootstock es añadir valor y funcionalidad al ecosistema bitcoin de
        permitiendo contratos inteligentes,
        pagos casi instantáneos y una mayor escalabilidad.</p>
        <p>El [Smart Bitcoin (RBTC)](/concepts/rbtc/) es la moneda nativa de Rootstock y se utiliza para pagar el gas necesario para la ejecución de las transacciones. Está vinculado 1:1 con Bitcoin, lo que significa que en Rootstock hay exactamente 21M de RBTC. Un [Powpeg](/conceptos/powpeg/) permite la [transferencia de bitcoins](/conceptos/rbtc/conversión/) de la blockchain de Bitcoin a la blockchain de Rootstock y viceversa.</p>
    </div>
</div>
</section>
