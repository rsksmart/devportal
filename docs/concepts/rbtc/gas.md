---
layout: rsk
title: "RBTC Gas Fees: Optimizing Transaction Costs | Rootstock (RSK)"
sidebar_label: Gas
tags: [gas, transactions, rbtc, mainnet, smart-contracts, rsk, conversion, bitcoin, price, gas-price, cost]
sidebar_position: 3
---

Gas is the internal pricing for running a transaction or contract.
When you send tokens, interact with a contract, send RBTC, or do anything else on the blockchain, you must **pay for that computation**. That payment is calculated as **gas**. In RSK this is paid in [RBTC](/rsk/rbtc).

- [What is gas?](#what-is-gas)
- [How do I choose an appropriate gas price and limit?](#how-do-i-choose-an-appropriate-gas-price-and-limit)
- [What happens if my transaction fails?](#what-happen-if-my-transaction-fails)
- [What happens if I run out of gas?](#what-happen-if-i-run-out-of-gas)
- [Gas in smart contracts](#gas-in-smart-contracts)

## What is gas?

There are four important concepts:

- **Gas price**: The cost of the operation.
- **Gas limit**: The maximum gas the operation can afford. It's an upper limit the user sets to prevent losing gas.
- **Total gas**: The gas the operation consumed. Also referred to as **gas used**.
- **Unit**: Gas is paid in **RBTC**.

Let's start with a simple analogy: A car.

To drive a car you need gas. Gas price is the money you pay for each gallon. Gas limit is the max amount of gas you accept to consume, the gas you _charge_. The total gas is the amount you've spent at the end of the trip.
You can calculate the total gas and set an appropriate gas limit so that your trip does not expend more than expected.

Transactions are quite similar:

Gas price is the price you set for operations. The gas limit is the maximum price you are going to pay for the transaction when operated. Then, when transaction is executed, the total gas is the price you finally pay.

Gas is the _fee_ collected by the miner who mines the block that includes the transaction.

The resulting fee is:

```
fee = totalGas * gasPrice
```

## How do I choose an appropriate gas price and limit?

If you want to spend less on a transaction, you can do so by lowering the amount you pay per unit of gas (gas price). Similar to Bitcoin, the price you pay for each unit increases or decreases how **quickly your transaction will be mined.**

### Appropriate gas price

Gas price changes with time. To choose an appropriate gas price you should consider 2 concepts:

- What is _minimum gas price_ and how it changes
- How to get that _minimum gas price_

### Minimum Gas Price

The `minimumGasPrice` is written in the block header by miners and establishes the minimum gas price a transaction should have in order to be included in that block. It can change with time, by up to 1% of the `minimumGasPrice` of the previous block. The latest block's minimum gas price can be obtained using this Web3 method:

The means by which minimum gas price is negotiated by miners is described in [RSKIP09](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP09.md).

```javascript
web3.eth.getBlock('latest').minimumGasPrice
```

Here are some practical approaches to this subject:

1. Optimistic approach (not recommended):
You can set `minimumGasPrice` as gas price parameter for the transaction **but if minimum gas price is under negotiation and it gets higher, your transaction could be rejected**.

2. Sensible approach:
Instead of using `minimumGasPrice` as it is, you may [add 10% to its value](#how-does-gas-price-change-over-time).

3. Network average approach:
You can obtain the average gas price that is being paid in the network:

```javascript
web3.eth.gasPrice()
```

Even though this value is greater than or equal to minimum gas price. (`gasPrice >= minimumGasPrice`), it is recommended to add a small percentage to increase the priority of your transaction.


### Appropriate gas limit

Total gas can be estimated using this Web3 method:

```javascript
myContract.methods.myMethod(param1, param2, ...).estimateGas(options, callback)
```

> Go [here](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-estimategas) for Web3 documentation.

### More information

#### How does gas price change over time?

Each miner can vote to increase or decrease the `minimumGasPrice` up to 1%. This allows miners to increase the `minimumGasPrice` 100% in approximately 50 minutes, assuming a block every 30 seconds.
Nodes that forward transactions could check that the advertised **gas price in a transaction is at least 10% higher than the minimum**. This assures the transaction a lifetime of 10 blocks assuming a constantly increasing block `minimumGasPrice`.
Negotiated minimum gas price is described in [RSKIP09](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP09.md).

## What happen if my transaction fails?

**You are paying for the computation, regardless of whether your transaction succeeds or fails.** Even if it fails, the miners must validate and execute your transaction (computation request) and therefore you must pay for that computation just like you would pay for a successful transaction.

## What happen if I run out of gas?

If a transaction reaches the gas limit, all changes will be reverted but **the fee is still paid**.

## Gas in smart contracts

When you compile smart contracts (commonly written in [Solidity](https://solidity.readthedocs.io/en/latest/)), they get converted to operation codes, known as 'opcodes'.
These codes (opcodes) are shown with mnemotechnic names as `ADD` (addition) or `MUL `(multiplication). [Here](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/org/ethereum/vm/GasCost.java) you can see the price of each opcode.
As you can guess, it is important to write smart contracts using the best (cheaper) combination of opcodes.
Examples of good practices to write smart contracts:

### Avoid declaring variables as `var`

```javascript
function payBonus() {
    for (uint i = 0; i < employees.length; i++) {
      address employee = employees[i];
      uint bonus = calculateBonus(employee);
      employee.send(bonus);
    }
  }
```

In the code above, the problem is that if the type of `i` was declared as `var`, it would be taken as `uint8` because this is the smallest type that is required to hold the value 0. If the array has more than 255 elements, the loop will not finish successfully, resulting in wasted gas. You'd better use the explicit type `uint` for no surprises and higher limits. **Avoid declaring variables using `var` if possible.**

### Looping large arrays

```javascript
function soDifficultLooper() {
    for (uint i = 0; i < largeArray.length; i++) {
      address person = largeArray[i];
      uint payment = difficultOperation(largeArray);
      person.send(payment);
    }
  }
```

Every function call that modifies state of the smart contract has a gas cost. A loop could spend a lot of gas, which could easily reach the gas limit of a transaction or block. If a transaction reaches the gas limit, all changes will be reverted but the fee is still paid. **Be aware of variable gas costs when using loops.**
