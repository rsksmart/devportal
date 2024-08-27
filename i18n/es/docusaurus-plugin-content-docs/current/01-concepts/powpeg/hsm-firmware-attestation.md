---
title: Certificación del firmware del HSM de Powpeg
sidebar_position: 250
sidebar_label: Verificar los nodos Powpeg
tags:
  - rsk
  - portainjertos
  - rbtc
  - btc
  - peg
  - powpeg
  - hsm
description: Aprenda a verificar los nodos Powpeg utilizando el HSM Firmware Attestation.
render_features: powpeg-hsm-attestation-frame
---

Para verificar los nodos Powpeg, siga el proceso de atestación del firmware del HSM siguiendo los pasos que se indican a continuación. Consulte el [LÉAME de atestación](https://github.com/rsksmart/rsk-powhsm/blob/2.3.5/docs/attestation.md).

### Certificación del firmware de Powpeg HSM - Sovryn

<iframe class="w-100 rounded-4" src="/img/rsk/architecture/powpeg-hsm-attestation/sovryn.html" title="Sovryn" height="400"></iframe>

### Certificación del firmware HSM de Powpeg - pNetwork

<iframe class="w-100 rounded-4" src="/img/rsk/architecture/powpeg-hsm-attestation/pnetwork.html" title="pNetwork" height="400"></iframe>

### Preguntas frecuentes

```mdx-code-block
<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">¿Cuál es el esquema multisig para el powHSM? Es un multisig M de N.
¿Qué es M y qué es N?</Accordion.Header>
    <Accordion.Body>
        > - R: La mejor forma de obtener esta información es consultando directamente al Bridge, ya que el número de miembros del PowPeg puede cambiar tras un cambio de composición del PowPeg.
        > - Puede utilizar los siguientes métodos para consultar el puente: `getFederationSize`, `getFederationThreshold`.
        > - Por consenso, el número necesario de firmantes (M) será siempre la mitad más uno del número total de pegnatarios `M = N / 2 + 1`. Consulte la información sobre firmantes y atestación en [PowPeg HSM Firmware Attestation](#powpeg-hsm-firmware-attestation---sovryn).
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```
