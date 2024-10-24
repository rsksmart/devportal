---
title: "Building the Most Secure, Permissionless and Uncensorable Bitcoin Peg"
sidebar_position: 4
sidebar_label: PowPeg Protocol
tags: [rsk, rootstock, rbtc, btc, architecture, powpeg protocol, powpeg app]
description: "Transfer BTC to RBTC, and RBTC to BTC through the PowPeg Protocol."
render_features: 'powpeg-hsm-attestation-frame'
---

Rootstock’s **PowPeg** protocol, has matured from its inception in 2018 as a federation to now include many decentralized qualities. The protocol protects private keys stored in special purpose PowHSMs based on tamper-proof secure elements (SE). Each PowHSM runs a Rootstock node in SPV mode, and so signatures can only be commanded by chain cumulative proof of work. Security is established in the PowPeg through the simplicity of a layered design we refer to as defence-in-depth.

:::note[Info]
- The PowPeg App is available on [Testnet](https://powpeg.testnet.rootstock.io/) and [Mainnet](https://powpeg.rootstock.io/). 
- For general information about the design and architecture, how to perform a peg-in transaction using Ledger and Trezor, Frequently asked questions and advanced operations you can perform on the PowPeg, please refer to the [PowPeg user guide](/resources/guides/powpeg-app/).
- Get information on the signatories and attestion in the [PowPeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation) section.
- Read [Introducing Fast Mode: Getting RBTC via the PowPeg, but Faster](https://blog.rootstock.io/noticia/get-rbtc-fast-mode/) to learn about the difference between Native Mode and Fast Modes when using the PowPeg.
:::

## The History of the PowPeg Protocol

Two blockchains with distinct block formats can communicate in a fully decentralized manner if each one can evaluate the other blockchain’s consensus rules, and if cross-chain messages are not censored for long periods of time. Currently, only platforms with “Turing-complete” smart contracts can evaluate other blockchain consensus rules. Bitcoin, for better or for worse, lacks the ability to unlock coins over arbitrary predicates. Therefore, when Rootstock was created, it had to use the only existing technology in Bitcoin to distribute trust among parties: multi-signatures. With a multi-signature it is possible to give a group of notaries the task to protect locked bitcoins, tolerating a certain amount of malicious, hacked or unavailable parties.

When the Rootstock genesis block was mined, the Rootstock Federation, an autonomous set of functionaries aimed at protecting the multi-signature, was born. The federation was controlled by the Rootstock Bridge, an unstoppable smart-contract running on Rootstock, and has been successfully working since its creation. In 2020 the Rootstock community decided it was time for the Rootstock peg to grow, both in security and in censorship resistance, evolving from a federated system to the PowPeg. The PowPeg is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. The set of functionaries still exists, but their role is mainly to keep their hardware and nodes connected and alive at all times; they do not directly control the Bitcoin multisig private keys. See [PowPeg HSM Firmware Attestation](/concepts/powpeg/hsm-firmware-attestation)

## The PowPeg Protocol in Rootstock

The Rootstock researchers and developers strategy when designing the PowPeg differs from the one adopted by other teams that have built 2-way peg protocols. The Rootstock PowPeg is based on a layered security model, a practice we call “**defence-in-depth**”. Most other pegs rely on a single all-encompassing cryptographic protocol that solves a multi-party custody problem in an intricate way. These complex cryptographic protocols are delicate and very few entities can audit them thoroughly. Often these types of protocols become compromised, resulting in a sudden loss of security for users.

Other recent 2-way peg designs focus on crypto-economic incentives that take advantage of high collateralization in a new token. However, using a different token for the core sidechain functionality is not aligned with Bitcoin values. The Rootstock PowPeg bridge, instead, relies on multiple defences, or layers, with each layer relatively simple to understand and test. This defence-in-depth approach is what has allowed Rootstock to grow from genesis to the current state without major problems, and without downtime. Since there is no collateral, the Rootstock PowPeg members are incentivized to participate by receiving a small portion of Rootstock transaction fees that is automatically channeled to them. As seen in the Ethereum ecosystem, transaction fees can eventually provide a sustained income for miners and sometimes [even higher](https://coinmetrics.io/ethereums-defi-evolution-how-defi-is-fueling-ethereums-growth/) than the blockchain subsidy.

## PowPeg Protocol Functionaries

Functionaries participating in the Rootstock PowPeg keep specialized hardware called **PowHSMs** active and connected to special types of Rootstock full nodes (the “PowPeg Node”). A PowHSM is an external tamper-proof device that creates and protects one of the private keys required for the Bitcoin multi-signature protocol, only signing transactions proven valid by enough cumulative work. The PowPeg node is designed to have maximal connectivity and to communicate information about the Rootstock blockchain, specifically cumulative work, to the PowHSM.

The functionary’s role is to ensure that only valid multi-signature transactions are signed by the PowHSM through auditing changes in the PowHSM, the PowPeg node and the  communication between them. Functionaries themselves are not actively involved in the signing of transactions in any way, and do not participate in the production of blocks on the Rootstock blockchain.

## Merged-miners and the Armadillo Monitor

A large portion of Bitcoin miners participate in Rootstock merge-mining, providing the persistence and liveness blockchain properties required for effectively securing the Rootstock network. The role of merged-miners in the PowPeg protocol is the largest and most crucial layer of Rootstock's defence-in-depth approach in securing the bridge between Rootstock and Bitcoin. Functionaries rely on the stability of merge-mining to ensure valid multi-signature transactions are signed and validated in a secure and timely manner.

## Economic Actors and the Bridge Contract

Economic actors such as merchants and exchanges, interact with the Rootstock PowPeg by sending and receiving peg-in and peg-out transactions (described in more detail below) to the Bridge smart contract through the Rootstock network. The Bridge is a pre-compiled smart contract living in the Rootstock blockchain. The role of the Bridge is to maintain an up-to-date view of the Bitcoin blockchain, verify peg-in requests and command peg-outs. To achieve this functionality, the Bridge contract manages a Bitcoin wallet in SPV ([Simple Payment Verification](https://en.bitcoinwiki.org/wiki/Simplified_Payment_Verification)) mode. In this mode, transactions are confirmed by block headers and block headers are minimally validated, but the validation includes the expected proof of work. These validations ensure the Bridge wallet follows the Bitcoin chain which has the highest chain work, but does not check that the chain is valid.

Normally the chain with the highest chain work is the network’s best chain. In the history of Bitcoin there was only a single [unintended network fork](https://bitcoinmagazine.com/articles/bitcoin-network-shaken-by-blockchain-fork-1363144448) where one branch was invalid according to pre-established consensus rules. The fork length was 24 blocks. Therefore, in order to prevent intended or unintended invalid forks, the Bridge is designed to wait for 100 confirmations before confirming a peg-in transaction.

## Peg-in/Peg-out and Other Properties of Rootstock PowPeg Protocol

We use the now standardized terms peg-in for the process that transfers bitcoins to the sidechain, and peg-out to the process that returns them back to Bitcoin. Performing a peg-in is as easy as sending the bitcoins to the PowPeg address and informing the Bridge about the Bitcoin transaction. The PowPeg functionaries provide a “watch tower” service on behalf of users and inform the Bridge of any peg-in as well.

The Rootstock PowPeg is an asset migration protocol and cannot abort a peg-in in case of network delays. The inability to abort a peg-in during network delays is what generally distinguishes asset migration protocols from exchange protocols. In exchange protocols, there is always a risk that the counterparty fails to unlock funds, and a user is forced to inform this failure within a bounded delay. Only in a special case does Rootstock refund the bitcoins of a peg-in operation, and this is when a cap, which gradually increases over time, is surpassed.

Technically, the Rootstock PowPeg is a hybrid peg. Peg-ins work in a fully decentralized manner using SPV proofs with the PowPeg members acting only as watchtowers to make sure bitcoin deposits are correctly informed to Rootstock. The user issuing the peg-in transaction can inform Rootstock if the PowPeg members fail to, assuming a worst-case scenario where the user is eventually online to inform Rootstock of the transaction. Since Rootstock assumes a user is the sender and receiver of a 2-way peg transaction, it is highly advised that users inform the Rootstock network.

To perform peg-outs, the Bridge accepts requests from Rootstock accounts, and after thousands of confirmation blocks, the Bridge builds a Bitcoin peg-out transaction commanding the PowHSMs to sign this transaction. The Bridge selects the transaction inputs (or UTXOs) to include in the peg-out transactions, preventing selective censorship of UTXOs of any kind. The Bridge also coordinates and applies forced-delays to all treasury operations required when the PowPeg composition changes. Finally the Bridge serves as an Oracle to expose the Bitcoin blockchain to Rootstock smart-contracts. Rootstock peg-outs rely on the participation of the PowHSMs and collaboration of the majority of PowPeg members, as the PowHSMs need to sign every peg-out transaction. Assuming the practical security provided by PowHSMs, PowPeg peg-outs are also trustless.

## Rootstock PowPeg Security

Rootstock peg is becoming one of the most secure multi-signature systems in existence. Technically, the security of the PowPeg relies on several concurrent strategies: Defence-in-depth, coordination transparency, and public attestation, but a peg’s security does not only rely on its technical features. The real-world security must be analysed from several points of view: technical, operational and reputational. In the following, we focus on the PowPeg technical design decisions.

## Defence-in-Depth

Defence-in-depth is realized by a careful separation of responsibilities so that compromising the system requires more than just compromising one element or one actor. The miners alone cannot steal the funds of the peg, neither can the functionaries, nor the PowHSM manufacturer, nor the developers. The peg process is governed by consensus rules enforced in software and firmware, each protecting the other from bugs and vulnerabilities. Furthermore, the Rootstock community protects the code from mistakes. The community goal is to improve the PowPeg by adding more protective layers, each layer adding more security.

As described above, each functionary not only runs a PowPeg node, but also a PowHSM. In the coming months, all existing PowPeg members will have finished upgrading to the PowHSM version 2.0. As explained before, each PowHSM runs a consensus node in SPV mode, so commands need to be backed-up by real hashrate. Cheating the PowHSM becomes too difficult if not impossible without hacking several Bitcoin mining pools.

The term “vetocracy” is very useful in this context. A vetocracy is a system of governance whereby no single entity can acquire enough power to make decisions and take effective charge. Rootstock's defence-in-depth approach to security of the PowPeg follows such an ideology, rendering attacks ineffective. A good question to ask when designing a 2-way peg system should be: "how closely does the protocol resemble a vetocracy", saving many from endless religious debates over federated vs. decentralized systems.

## Coordination Transparency

All communications between functionaries occur over the Rootstock blockchain. There are no hidden messages between functionaries and there is no pre-established subsystem that allows them to communicate secretly. All exchanged messages are public. While we can’t prevent hidden communication by hypothetical attackers in full control of the PowPeg node executable code, we do prevent hidden collusion for long periods. As coordination is carried out over the public network, the system forces the PowHSMs to be exposed to the blockchain honest best chain, and allows all network participants to periodically know the PowHSM internal state. As for external hackers, the existence of a pre-established system for hidden coordination would be a powerful tool for privilege escalation as it can be used to to obtain functionaries IPs and attempt targeted attacks. PowPeg functionaries could connect to the network over Tor, or change their IPs daily without problem.

Finally the bridge smart-contract builds the peg-out transaction and won’t let any of the PowHSMs pick anything related to the transaction to sign. The whole transaction content is decided by Rootstock consensus.

## Firmware Attestation

Rootstock PowHSM firmwares, as well the full node and PowPeg nodes, are generated using deterministic builds, yet currently the firmware installation on PowHSMs cannot be fully trust-free. An auditing group must attest for the correctness of the process of firmware installation on each new device or batch of devices. But we’re improving this area with a new defence: the next iteration of the PowHSM firmware (version 2.1) is capable of providing firmware attestation using security features provided by the device. Therefore, the next objective is to include firmware attestation as part of Rootstock's deployment procedures, or even periodically as *keepalive* messages. Soon attestation messages will be stored in the blockchain and every member of the community will be able to validate PowHSM firmwares.

## Proof of Work is Proof of Time

The cumulative work required by the PowHSM also works as a rate limiter or **forced time** delay for any attack: Given the fact that Rootstock has a large portion of the Bitcoin hashrate through merge-mining, the amount of cumulative difficulty required to “cheat” the PowHSM into confirming a peg-out over a malicious forked branch implies a large scale collusion by some of the major Bitcoin mining pools for a duration of multiple days. Such an attack would be transparent and visible to both the Bitcoin and Rootstock communities. As in banking vault [opening procedures](https://www.law.cornell.edu/cfr/text/12/208.61), the PowHSM is actually enforcing a [time-delay](https://en.wikipedia.org/wiki/Time_lock) that lets humans enter the loop if an attack is suspected.

## Peg-in and Peg-out Finality

Since the Bitcoin blockchain and the Rootstock sidechain are not entangled in a single blockchain or in a parent-child relation as in a [syncchain](https://blog.rootstock.io/noticia/syncchain-synchronized-sidechains-for-improved-security-and-usability/), the transfers of bitcoins between them must at some point in time be considered final. If not, bitcoins locked on one side would never be able to be safely unlocked on the other. **Therefore, peg-in and peg-out transactions require a high number of block confirmations. Peg-ins require 100 Bitcoin blocks (approximately 2000 RSK blocks), and peg-outs require 4000 Rootstock blocks (approximately 200 Bitcoin blocks)**. Transactions signed by federation nodes are considered final by Rootstock: these transactions are broadcast and assumed to be included sooner or later in the Bitcoin blockchain. Due to the need for finality, Rootstock consensus does not attempt to recover from an attack that manages to revert the blockchain deep enough to revert a final peg-in or peg-out transaction. If a huge reversal occurs, PowPeg nodes halt any future peg-out, and the malicious actors should not be able to double-spend the peg.

:::note[IRIS 3.0.0]
Since the IRIS 3.0.0 upgrade, minimum required values for peg-in and peg-out have been halved, Peg-in (BTC) minimum is now 0.005 and Peg-out (RBTC) minimum is now 0.004. Besides this minimum, the Bridge will estimate the fees required to pay for the pegout, if the remainder after paying the fees is too low (not enough to be spent in BTC) the pegout will be rejected. The funds will be reimbursed if the pegout is rejected by any of the conditions described above.
:::

## Decentralization - Building a Vetocracy

The use of PowHSMs in a federation is a step forward in decentralization, because a remotely compromised functionary does not compromise the main element for the security of the peg: a multisig private key. Since Rootstock has a large portion of the Bitcoin merge-mined hashrate, currently surpassing 51%, it seems extremely unlikely that a new group of  merge-miners can hijack consensus long enough to force PowHSMs to perform a malicious peg-out. But the Rootstock community should never rest on its laurels.  Instead, the Rootstock community is planning to apply once again a layered approach leading to more “additive security”.

## The PowPeg Censorship-Resistance

The Rootstock PowPeg is also unique in the limited set of responsibilities delegated to each PowPeg node. In particular, PowPeg functionaries cannot apply selective censorship on peg-in and peg-out transactions. If one PowPeg functionary attempts to censor a particular transaction, the others functionaries sign and execute the peg-out transaction, causing the censorship to fail. If all functionaries attempt to censor a transaction, then the functionaries cannot continue to perform other peg-outs, as peg-outs are linked with UTXOs, and functionaries cannot choose the UTXOs for the peg-out transactions. The peg-out UTXOs, including “change” UTXOs, are selected by the Bridge contract, forming a consensus-enforced chain. Therefore, selectively banning a transaction leads eventually to a complete halt of the PowPeg, and that’s why selective censorship is not possible.

Regarding the complete shutdown of the PowPeg by a single government, it would be very difficult to pull off as the functionaries are geographically distributed all over the world. To protect from powerful worldwide coordinated attacks or attacks coming from three-letter agencies,Rootstock plans to add an emergency recovery multisig time-lock to activate one year after the PowPeg is proven dismantled. A shutdown attempt would only make Rootstock stronger and more resilient to subsequent attacks, as a new Rootstock PowPeg would rapidly expand and decentralize itself into a hundred individual users around the world, each running an PowHSM device and a PowPeg node over Tor.

## Conclusion

The Rootstock peg has matured from a federation to a PowPeg. As the peg grows over time, more bitcoins are being moved into Rootstock. Developers can find a unique opportunity to build their dApps on our secure and efficient money vault. Compared to alternatives, the PowPeg combines strong security based on layered protections, with maximum decentralization within the constraints established by the Bitcoin scripting system.