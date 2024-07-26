---
sidebar_label: Remasc
title: REMASC
tags: [rsk, rootstock, mining, bitcoin, remasc]
---

Reward Manager Smart Contract (REMASC) is a pre-compiled smart-contract that is executed on every block and has the responsibility to fairly distribute rewards collected from transaction fees into several participants of the network. However the distribution of rewards of a block is only performed once the block reaches a certain maturity. In other words, the rewards are paid only after a  fixed number of blocks have confirmed a block. With the exception of the first blocks in the blockchain after genesis, every time a block is added to the blockchain, another previous block reaches maturity and its rewards are paid.

REMASC is an implementation of [DECOR+](https://scalingbitcoin.org/papers/DECOR-LAMI.pdf).

## How it Works

The REMASC contract maintains different internal accounts. One of these internal accounts is called Reward Balance. The Reward Balance always exists and its value can change when a new block is processed because of any of the following reasons:

* The block was accepted on the mainchain and all its transaction fees are added to the Reward balance.
* Miners and other rewarded parties get paid their reward and the rewarded value is subtracted from the Reward balance.

As an example, let’s assume that a block has 2 transactions: One paying 100000 gas at 2 smart weis and the other paying 25000 gas at 3 smart weis. Let’s also assume that prior processing of the block, the Reward Balance was 1000000 smart weis. After processing the block the Reward Balance will be updated to 1000000 + 200000 + 75000 = 1275000 smart weis.

From this Reward Balance, the 10% (127500 in the example) will be subtracted to pay the miners having mined at the corresponding height. This creates a synthetic reward, that is equivalent to applying a low-pass filter to the received fees, and so this method has also been called [fee smoothing](https://lists.linuxfoundation.org/pipermail/bitcoin-dev/2016-January/012297.html). The 10% amount extracted from the Reward Balance, is called the **Full Block Reward** and will be referred to as **F** from now on.

The amount of fees in F will be affected by the following variables:

* The number of siblings mined at the same processing height
* The fact that the [Selection Rule](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP15.md) was respected or broken

Some additional definitions will be introduced before we formalize how the payment is calculated for each miner.

One and only one block is mined at a height **N**. This block is the **main block** at height **N**. Blocks that share a parent with a main block are called **siblings**. These blocks can be added to the blockchain by **publishers**, which are always miners mining following blocks.

The payment for the miners of the main block, the siblings and the publishers will occur on the block N + 4000. The payment occurs as specified by the following rules:

* [](#top "tex-render FullBlock_{rwd}") *is the 100% of the block reward*

* Rootstock will receive a fee of ~20% of the full block reward:

  [](#top "tex-render Rsk_{rwd}=\frac{FullBlock_{rwd}}{5}")

* Rootstock Federation will receive a fee of ~0.8% of the full block reward:

  [](#top "tex-render Fed_{rwd}=\frac{FullBlock_{rwd}-Rsk_{rwd}}{100}")

* Miners will receive a payment of ~79.2% of the full block reward:

  [](#top "tex-render Miners_{rwd}=FullBlock_{rwd}-Rsk_{rwd}-Fed_{rwd}")

<br/>

*It’s important to notice that these are integer divisions where results are rounded down. That’s why:*

[](#top "tex-render \frac{4}{5}*FullBlock_{rwd} \neq FullBlock_{rwd}-\frac{FullBlock_{rwd}}{5}")

<br/>

Now we present several different scenarios:

1. There are **no** siblings at height N
    * **No Rule was broken**
    The miner of the block at height N is paid
    [](#top "tex-render Miners_{rwd}")

    * **Rule was broken**
    The miner is paid 90% of the
    [](#top "tex-render Miners_{rwd}")

    which is defined as
    [](#top "tex-render  Miners_{rwdBroken}=Miners_{rwd}-\frac{Miners_{rwd}}{10} %22")

2. There are siblings at height N.
   Each sibling will have a respective publisher and miner, so we define:
   * **Publisher Fee** (~10% of [](#top "tex-render Miners_{rwd}") )

     [](#top "tex-render PubFee_{rwd}=\frac{Miners_{rwd}}{10}")

   * **Miner Fee** (~90% of [](#top "tex-render Miners_{rwd}") )

     [](#top "tex-render MinersFee_{rwd}=Miners_{rwd}-PubFee_{rwd}")

     If we S is the number of siblings, we define:
    * **Individual Publisher Fee**

      [](#top "tex-render IndPubFee_{rwd}=\frac{PubFee_{rwd}}{S}")

   * **Individual Mining Fee**
     To simplify we define

     [](#top "tex-render Mining_{rwd}=\frac{MiningFees_{rwd}}{S+1}"),

     is given by the Mining Fee over all mined blocks referenced on the blockchain (which is siblings + the main block), then individual mining fee is:
     * No Rule was broken

       [](#top "tex-render IndMiningFee_{rwd}=Mining_{rwd}")

     * Rule was broken

       [](#top "tex-render IndMiningFee_{rwdBroken}=Mining_{rwd}-\frac{Mining_{rwd}}{10}-L")

Finally, with all the previous variables computed, the payments will be performed as follows:

Each **publisher** receives
[](#top "tex-render PubFee_{rwd}")

The **miner of the main block** receives
[](#top "tex-render IndMiningFee_{rwd}")

Also, for **each sibling**, a new amount needs to be calculated. This is, for each late block that the sibling published, it receives a punishment of ~5% of the
[](#top "tex-render IndMiningFee_{rwd}").

The sibling is added on the block N+D for some positive value of D. A punishment for late publication is calculated for each as
[](#top "tex-render L= \frac{(D-1) * IndMiningFee_{Rwd}}{20}")

Then the respective miners are paid
[](#top "tex-render IndMiningFeeLate_{rwd}= IndMiningFee_{Rwd} - L")

The remaining amount of [](#top "tex-render Miners_{rwd}") is added to a balance called **Burned Balance**. As of this writing, burned money is lost but changes may apply. The Burned Balance is given by rounding errors or punishments.

## Example

Suppose the Reward Balance is 90000 smart weis and the payment for this N is 10000 smart weis. Then the reward balance is updated to 100000 smart weis. From this, the 10% will be distributed, which is 10000 smart weis.

![](https://i.imgur.com/FgA02Rl.png)

A, B and C share the parent P. B is the main block at height N and A and C are siblings. D is publisher of C and E is publisher of A.

This way, we compute:

* **Rootstock** receives

  [](#top "tex-render Rsk_{rwd}= \frac{FullBlock_{rwd}}{5} \implies \frac{10000}{5} \implies Rsk_{rwd} = 2000")

* **RSK Federation** receives

  [](#top "tex-render Fed_{rwd}= \frac{FullBlock_{rwd}-Rsk_{rwd}}{100} \implies \frac{10000-2000}{100} \implies Fed_{rwd} = 80")

* **Miners** receive a total of
  [](#top "tex-render MinerFee_{rwd}= Miner_{rwd}-PubFee_{rwd} \implies 7920-792 \implies MinerFee_{rwd} = 7128")
    * **B** and **C** blocks receive Individual Mining Fee

      [](#top "tex-render IndMiningFee_{rwd}= \frac{MinerFee_{rwd}}{S+1} \implies \frac{7128}{3} \implies IndMiningFee_{rwd} = 2376")

      *In this case blocks are not published late so L is 0, that is why*
      [](#top "tex-render IndMiningFee_{rwd}")
      *is used in the calculation instead of*
      [](#top "tex-render IndMiningFeeLate_{rwd}")

    * **A** receives

      [](#top "tex-render IndMiningFeeLate_{rwd}=IndMiningFee_{rwd} - L")

      [](#top "tex-render IndMiningFeeLate_{rwd}=IndMiningFee_{rwd} - \frac{(D-1) * IndMiningFee_{Rwd}}{20}")

      [](#top "tex-render IndMiningFeeLate_{rwd}= 2376 = IndMiningFee_{rwd} - \frac{(2-1) * 2376}{20}")

      [](#top "tex-render IndMiningFeeLate_{rwd}= 2257")

      *In this case A was published late so L is not 0, that is why*
      [](#top "tex-render IndMiningFeeLate_{rwd}")
      *is used in the calculation instead of*
      [](#top "tex-render IndMiningFee_{rwd}")

For this example, an assumption that there wasn’t a broken rule for any block was made. Otherwise, fees paid should have been calculated using [](#top "tex-render IndMiningFeeLate_{rwdBroken}").

## References

- [DECOR+](https://scalingbitcoin.org/papers/DECOR-LAMI.pdf)
- [RSKIP-15](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP15.md)
