---
title: "PowPeg HSM Firmware Attestation"
sidebar_position: 250
sidebar_label: Verify PowPeg Nodes
tags: [rsk, rootstock, rbtc, btc, peg, powpeg, hsm]
description: "Learn how to verify Powpeg nodes using the HSM Firmware Attestation."
render_features: 'powpeg-hsm-attestation-frame'
---

To verify the PowPeg protocol  nodes, follow the HSM firmware attestation process using the steps below. See the [Attestation README](https://github.com/rsksmart/rsk-powhsm/blob/2.3.5/docs/attestation.md).

<Tabs>
  <TabItem value="sovryn" label="Sovryn" default>
    <iframe class="w-100 rounded-4" src="/img/rsk/architecture/powpeg-hsm-attestation/sovryn.html" title="Sovryn" height="400"></iframe>
  </TabItem>
  <TabItem value="pNetwork" label="pNetwork">
   <iframe class="w-100 rounded-4" src="/img/rsk/architecture/powpeg-hsm-attestation/pnetwork.html" title="pNetwork" height="400"></iframe>
  </TabItem>
</Tabs>

### Frequently Asked Questions

<Accordion>
  <Accordion.Item eventKey="1">
    <Accordion.Header as="h3">What is the multisig scheme for the powHSM? It is a M of N multisig.
What is M and what is N?</Accordion.Header>
    <Accordion.Body>
        > - A: The best way to get this information is by querying the Bridge directly, since the number of members of the PowPeg may change after a PowPeg composition change.
        > - You can use the following methods to query the bridge: `getFederationSize`, `getFederationThreshold`.
        > - By consensus the required amount of signers (M) will always be half plus one the total amount of pegnatories  `M = N / 2 + 1`. See the signatories and attestation information in [PowPeg HSM Firmware Attestation](#powpeg-hsm-firmware-attestation---sovryn).
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
