---
sidebar_label: Oracle Money on Chain
title: 'Oracle Money on Chain Solutions | Rootstock (RSK)'
description: 'Oracle Money On Chain - DeFi for Bitcoin'
tags: [OMOC, rsk-solutions, rsk, stablecoin, bitcoin, defi, MOC, rootstock]
layout: 'rsk'
---

![oracle-money-on-chain-banner-image](/img/solutions/oraclemoneyonchain/dev_omoc_og-100.jpg)

The Oracle Money on Chain (oMoC) protocol queries price pairs data from crypto exchanges and sends them into a smart contract on the blockchain. This way, the reported prices becomes available for other smart contracts. Normally, Oracles are centralized services causing the risks of any centralized architecture, i.e. being prone to single point of failure and to malicious behaviour. The Money on Chain (MOC) approach circumvents these problems through a decentralized price calculation by opening the possibility to any player to run an Oracle and participate in a consensus protocol for price feed publication. 

**How Oracle Money on Chain integrates with Rootstock**

The entire architecture is composed of three components:

1. **Smart Contracts (Oracle System):** The onchain Oracle system consists of the smart contracts with their functionalities as described above. Smart contracts interact amongst themselves and can be manipulated from the Oracle server and the DApp. 
2. **Oracle Server and Oracle Network:** The oracle server has an address in the Rootstock network and an HTTP address. The server communicates with the other Oracles to achieve consensus off-chain in the Oracle network and sends the price feed to the blockchain. 
3. **DApp:** This is the website which allows users to interact with the blockchain. Namely, Supporters and Oracles can register using this tool and can stake their MoC tokens.

![oracle-money-on-chain-rsk-integration-diagram](/img/solutions/oraclemoneyonchain/omoc_model-100.jpg)

### Oracle Money on Chain's Goal

Centralized Oracle services involve the risk to be prone to system faults and malicious agents. The Oracle system is an essential part of the Money on Chain platform, and hence must have a very robust architecture. Therefore, the Oracle system contemplates the following aspects:

1. **Decentralized:** The Oracle network has enough redundancy and provides a fallback mechanism to guarantee that price feeds are always available. It also protects against malicious behaviour of a minority group. 
2. **Offchain Consensus:** Although the validation of the price feed is onchain, the consensus amongst the Oracles is achieved offchain. This greatly reduces costs and allows a high frequency of publishing price feeds.
3. **Economic Incentives:** Running and publishing price feeds brings a profit to the Oracle owner. Oracles must compete among each other and check price publications of the others forcing them to provide accurate data. This establishes a network of Oracles providing high-quality price feeds. 

## Functionality

**Rounds & Scheduler**

The system works in periods of one month (n blocks), called rounds. During these rounds the surplus of the MOC system for the Supporter reward gets accumulated. The implementation of this concept is a tool called scheduler, which starts a new round and sets the reward counter to zero at the beginning of a new round. 

**Incentives**

The incentive to hold MOCs locked is either for the reason to become an Oracle, to participate in the Governance module, or, simply, in order to receive a percentage of the income from the MOC system as a reward in return. The MOC system generates a surplus from the system fees and from selling data provided by the Oracles to other third parties. This income stream is accumulated in one round and part (a certain percentage of the entire surplus) of it is used to pay rewards to Supporters. 

Reward Distribution: MOC holders receive rewards in proportion to the time and their amount of locked MOCs in the current round the corresponding percentage of the system’s income of the previous month. 

**Oracle Component**

Oracles report the current RBTC/USD and RIF/BTC price taken from various cryptocurrency exchanges, whereby the same infrastructure can be easily extended to other price pairs. Everyone can become an Oracle if the user has locked enough of MOCs (there is a minimum amount), and receives, as the Supporters, a revenue for their locked MOCs. In addition to this, they also get a reward for publishing price pairs. This compensates their expenses for running an Oracle and pays an additional income.

**Registration**

Oracles must register as such by publishing their public address on the Rootstock network. Moreover, in order to be considered as an Oracle, the user must lock a minimum amount of stake. Oracles also must subscribe for each coin pair, e.g. RBTC/USD or RIF/BTC, separately to be considered in the selection for the next publishing round of these price pairs.
Oracles who want to withdraw their locked stake, must first be inactive for one round by unsubscribing from all coin pairs. Once successfully unsubscribed, the same withdrawal rules  as for Supporters apply to them.

**Rounds & Scheduler**

The Oracle system works in 30 day periods -- also called rounds --  in which the accounting for the Oracle rewards are determined. It requires an external agent, called scheduler, to effectively switch these rounds, whereby each coin pair has its own scheduler which works independently of the other coin pair price modules, and which are neither synchronized with the Supporter round. 
When the scheduler is run for the previous round, it sets the global reward counter to zero, and from that point onwards the produced rewards are going to be used for the current round. Moreover, each round accounts for the locked stake and the activities in the current month, i.e. in each round, the following data are saved: locked stake, the list of participating oracles, and rewards won.

Rounds can be in three different states, namely Pending, when Oracles can add more stake, Current, when Oracles publish the coin pair prices, and Finished, when the scheduler closes the round and the rewards are transferred to all participating Oracles. The following table summarizes the different states and the actions which may take place:

![oracle-money-on-chain-rounds](/img/solutions/oraclemoneyonchain/omoc_rounds-100.jpg)

**Consensus for Published Price Feed**

Oracles have to find consensus about the correct price feeds, i.e. the RBTC/USD or RIF/USD price pairs. This is achieved by an offchain consensus in which the ten (or more generally N) Oracles participate, which have locked the most stake during the pending state of that round. Oracles’ stake count for all price pairs, but Oracles must subscribe for each price pair in order to participate in the next round. Then, during “current” state of the round, proposer election and consensus works as follows: 

1. **Election:** Price pair proposals are published by one oracle at the time. The election of the oracle is random using as a “random seed” the block hash of the block containing the last price pair publication. The probability of being selected as the publisher is weighted by the amount of stake the Oracle has locked. 
2. **Consensus:** The price pair not only has to be published by the chosen publisher,  but the published data must be co-signed by 5 (i.e. N/2) other participating Oracles of this round. This “consensus” happens offchain by sending the price data to other Oracles for signing, and then publishing it to the smart contract on the blockchain. The contract verifies that it has the necessary quorum from the remaining Oracles and is signed by the Oracle whose turn it is to publish.

For each publication, only one Oracle can succeed: Only one transaction is accepted by the blockchain. After a successful publication, the block hash for the last publication changes and a new consensus is started.
The Oracle system does have further important properties reflected: 

- **Frequency:** Selected Oracles can send the price at any time. The reference implementation does it only when the price change is bigger than a δ which can be configured in the Oracle server. In the next evolution of the system, this parameter will be moved onto the blockchain. 
- **Fallback Mechanism:** If an oracle is offline and does not appear, there is a fallback mechanism in order to replace it. Fallback Oracles are elected the same way as the publishing Oracle. The election process sorts the list of selected oracles: selected, fallback1, fallback2, etc. Fallback Oracles are authorized to send a number of blocks M after the price change is bigger than δ.
- Currently fallbacks participate one by one: fallback1 M blocks after the price change, fallback2 M+M blocks, etc. In a future evolution fallback Oracles will try to publish their price pairs at the same time (M blocks after the price change) so the system reacts even better to a failure. 

## Documentation

**Tutorials**

- [Getting Started with Oracle Money on Chain](https://api.moneyonchain.com/docs/oracles)
- [Python API to Money On Chain projects](https://api.moneyonchain.com/web/python)

**User Guides**

- [Reference Guide](https://api.moneyonchain.com/docs/guide)

### Conceptual Docs

- The operation described above is in the process of implementation which will be concluded in November 2020.
- Until then, a simultaneous record process of several independent feeders is running, which is described below:

**Price Feeds**

- Independent price feed operators constantly monitor the reference price across a number of external sources and will submit updates to the blockchain.
- Price updates are written to the blockchain via price feed contracts which are deployed and owned by feed operators. Price feed contracts which have been whitelisted by the medianizer are able to forward their prices for inclusion in the medianized price.

**The Medianizer**

- The medianizer is the smart contract which provides MoC trusted reference price.
- It maintains a whitelist of price feed contracts which are allowed to post price updates and a record of recent prices supplied by each address. Every time a new price update is received the median of all feed prices is re-computed and the medianized value is updated.

**Permissions**

- The adding and removal of whitelisted price feed addresses is controlled via governance, as is the setting of the min parameter - the minimum number of valid feeds required in order for the medianized value to be considered valid.

## API Docs

- [Oracle Money on Chain](https://github.com/money-on-chain/Amphiraos-Oracle/blob/master/README.md)

## Get in touch

- [Website](https://moneyonchain.com/)
- [Github](https://github.com/money-on-chain/)
- [Support](https://forum.moneyonchain.com/)
- [Blog](https://medium.com/@moneyonchain)
- [Meetup](https://www.meetup.com/Money-On-Chain-Meetup/)

### Social Media

- [Telegram](https://t.me/MoneyOnChainCommunity)
- [Twitter](https://twitter.com/moneyonchainok)
- [Facebook](https://www.facebook.com/moneyonchain/)
- [LinkedIn](https://www.linkedin.com/company/moneyonchain/)
- [Reddit](https://www.reddit.com/r/MoneyOnChain/)
- [Instagram](https://www.instagram.com/moneyonchainok/)
