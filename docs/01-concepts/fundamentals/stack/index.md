---
section_label: The Stack
title: Rootstock Stack
sidebar_label: The Stack
sidebar_position: 200
tags: [rsk, rootstock, stack, architecture]
description: "Learn about how Rootstock combines the security of Bitcoin PoW with Ethereum's smart contract functionality to build dApps on Bitcoin and also how RIF's Open-source tools and technologies designed to streamline and incentivize development on Bitcoin."
---

Rootstock virtual machine (RVM) is the core of the Smart Contract platform. Smart Contracts are executed by all network full nodes. The result of the execution of a Smart Contract can be the processing of inter-contract messages, creating monetary transactions and changing the state of contract-persistent memory. The RVM is compatible with EVM at the op-code level, allowing Ethereum contracts to run flawlessly on Rootstock.

Currently, the VM is executed by interpretation. In a future network upgrade, the Rootstock community is aiming to improve the VM performance substantially. One proposal is to emulate the EVM by dynamically retargeting EVM opcodes to a subset of Java-like bytecode, and a security-hardened and memory restricted Java-like VM will become the new VM (RVM2). This may bring Rootstock code execution to a performance close to native code.

## Main features:
* Independent virtual machine, that is highly compatible with EVM at the opcode level
* Run Ethereum dApps with the security of the Bitcoin network
* Performance improvement pipeline documented in numerous RSKIPs created by the Rootstock community
    * See the [Rootstock Improvement Proposals](https://github.com/rsksmart/RSKIPs).

<!-- ![Rootstock Technology Stack - High Level](/img/concepts/rootstock-tech-stack.svg) -->

<section>
<div class="row">
  <div class="col two-x-card">
  <div class="header-div">
      <h2 class="zg-text-bg fs-28">Bitcoin</h2><h3 class="fp-title-color fp-title-color-sm"><span class="ml-1 zg-label">BTC</span></h3>
  </div>
    <p> Is a store and transfer of value.
The blockchain is secure because miners
with high infrastructure and energy costs
create the new blocks to be added to the blockchain every 10 minutes.
The more hashing power they provide, the more secure the network is.</p>
  </div>
    <div class="col two-x-card">
        <div class="header-div"><h2 class="zg-text-bg fs-28">Rootstock</h2><h3 class="fp-title-color fp-title-color-sm"><span class="ml-1 zg-label">RBTC</span></h3></div>
            <p> Is the first open source smart contract platform that is
        powered by the bitcoin network.
        Rootstock's goal is to add value and functionality to the
        bitcoin ecosystem by enabling smart-contracts,
        near instant payments, and higher-scalability.</p>
        <p>The [Smart Bitcoin (RBTC)](/concepts/rbtc/) is the native currency in Rootstock and it is used to pay for the gas required for the execution of transactions. It is pegged 1:1 with Bitcoin, which means in Rootstock there are exactly 21M RBTC. A [Powpeg](/concepts/powpeg/) allows the [transfer of bitcoins](/concepts/rbtc/conversion/) from the Bitcoin blockchain to the Rootstock blockchain and vice-versa.</p>
    </div>
</div>
</section>

## The Stack

When building BTCFi dApps, you interact with the **Rootstock Virtual Machine (RVM)**.Because the RVM is fully EVM-compatible, you can use industry-standard tools like **Remix, Hardhat, and Foundry** to manage Bitcoin-native assets.

<div className="rootstock-stack-container">
    {/* Application Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF71E1' }}>APPLICATIONS</div>
        <div className="layer-content bg-pink">
            <div className="sub-module">YIELD VAULTS</div>
            <div className="sub-module">STAKING</div>
            <div className="sub-module">AI AGENTS</div>
        </div>
    </div>
    {/* Tooling Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#9E76FF' }}>DEVTOOL</div> 
        <div className="layer-content bg-purple" style={{ gridTemplateColumns: '1fr', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', letterSpacing: '2px' }}>
            REMIX • HARDHAT • FOUNDRY • OPENZEPPELIN • DAO SDK
        </div>
    </div>
    {/* Infrastructure Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#08FFD0' }}>RIF SERVICES</div>
        <div className="layer-content bg-cyan">
            <div className="sub-module">RIF RELAY</div>
            <div className="sub-module">RNS</div>
            <div className="sub-module">FLYOVER</div>
            <div className="sub-module">COLLECTIVE DAO</div>
        </div>
    </div>
    {/* Execution Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#79C600' }}>EXECUTION</div>
        <div className="layer-content bg-green" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">ROOTSTOCK VIRTUAL MACHINE (EVM-COMPATIBLE)</div>
        </div>
    </div>
    {/* Security Layer */}
    <div className="stack-layer">
        <div className="layer-label" style={{ backgroundColor: '#FF9100' }}>SECURITY</div>
        <div className="layer-content bg-orange" style={{ gridTemplateColumns: '1fr' }}>
            <div className="sub-module">BITCOIN: MERGED MINING</div>
        </div>
    </div>
</div>