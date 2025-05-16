---
sidebar_label: Protocol Design
sidebar_position: 220
title: Flyover Protocol Design
tags: [rsk, rootstock, rif, flyover, integrate, integration guide, rbtc, powpeg]
description: The Flyover protocol allows fast Bitcoin to Rootstock transfers without giving custody of funds to third parties. Learn about the system design and workflow.
---

# Flyover Protocol Design

The Flyover system allows a user to transfer BTC from Bitcoin to Rootstock and vice versa in a fast way, where a third party 
takes the risk to advance the payment for the user. Flyover also provides the new feature to transfer BTC from Bitcoin
directly to a smart contract in Rootstock.

The outstanding feature of the Flyover system is that it accomplishes the above without giving any third party custody
of the transferred funds. This is an outstanding security guarantee to the user. The system comprises one or more
liquidity providers (LPs) that store their BTC on Rootstock and Bitcoin. The first version of the Flyover protocol supports only the
peg-in process (BTC to RBTC). Later versions will also support the peg-out process (RBTC to BTC).


## Workflow

The following diagram shows the interaction of the different components during the peg-in process. Note that the call
to isOperational could be performed at a different time:

![Flyover Sequence Diagram](https://raw.githubusercontent.com/rsksmart/liquidity-provider-server/refs/heads/master/docs/diagrams/flyover-sd.png)


The following diagrams show the interactions between Liquidity Provider, Liquidity Bridge Contract and Rootstock Bridge Contract in three different scenarios: 
1. Basic fast bridge workflow (happy path)
2. Unsuccessful call on behalf of a user
3. Liquidity Provider fails to deliver funds to LBC

![Flyover Sequence Diagram](https://raw.githubusercontent.com/rsksmart/liquidity-provider-server/master/docs/diagrams/flyover-ad-basic.png)

_Figure 1 - Basic fast bridge workflow. Note that step (3) `registerPegin` can be called by the LP or any other entity._


![Flyover Sequence Diagram](https://raw.githubusercontent.com/rsksmart/liquidity-provider-server/master/docs/diagrams/flyover-ad-unsuccessful-call.png)

_Figure 2 - Fast bridge interactions when the call on behalf of the user is unsuccessful. The LP keeps the call fee and the rest is refunded to the refund RSK address._


![Flyover Sequence Diagram](https://raw.githubusercontent.com/rsksmart/liquidity-provider-server/master/docs/diagrams/flyover-ad-no-call.png)

_Figure 3 - Fast bridge interactions when the LP fails to call the LBC on behalf of the user. The LBC slashes the LP's collateral and refunds the user on the refund RSK address._
