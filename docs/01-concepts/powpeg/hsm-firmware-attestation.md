---
title: "Powpeg HSM Firmware Attestation"
sidebar_position: 250
sidebar_label: Verify Powpeg Nodes
tags: [rsk, rootstock, rbtc, btc, peg, powpeg, hsm]
description: "Learn how to verify Powpeg nodes using the HSM Firmware Attestation."
render_features: 'powpeg-hsm-attestation-frame'
---

To verify the Powpeg nodes, follow the HSM firmware attestation process using the steps below:

### Powpeg HSM Firmware Attestation - Sovryn

<iframe class="w-100 rounded-4" src="https://dev.rootstock.io/assets/rsk/architecture/powpeg-hsm-attestation/sovryn.html" title="Sovryn" height="400"></iframe>

### Powpeg HSM Firmware Attestation - pNetwork

<iframe class="w-100 rounded-4" src="https://dev.rootstock.io/assets/rsk/architecture/powpeg-hsm-attestation/pnetwork.html" title="pNetwork" height="400"></iframe>

### Frequently Asked Questions

**Q: What is the multisig scheme for the powHSM? It is a M of N multisig. 
What is M and what is N?**

> - A: The best way to get this information is by querying the Bridge directly, since the number of members of the PowPeg may change after a PowPeg composition change. 
> - You can use the following methods to query the bridge: `getFederationSize`, `getFederationThreshold`. 
> - Note: By consensus the required amount of signers (M) will always be half plus one the total amount of pegnatories  `M = N / 2 + 1`. See the signatories and attestation information in [PowPeg HSM Firmware Attestation](#powpeg-hsm-firmware-attestation---sovryn).