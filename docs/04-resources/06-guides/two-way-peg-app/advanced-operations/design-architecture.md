---
sidebar_position: 1300
sidebar_label: Design and Architecture
title: "Design and Architecture"
description: "Two way peg design and architecture."
tags: [2 way peg app, powpeg, peg-in, peg-out, bridge, rsk, rootstock]
---

The [2 way peg app](https://app.2wp.rootstock.io/) is a protocol to convert BTC to RBTC and vice versa. It is secured by the powpeg, which is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. See the history of the [Powpeg](/concepts/powpeg/).

In this section, we will cover the design and architecture used in building the 2 way peg application. It comprises of a [web interface](#high-level) built with Vue.js, a [backend application](#components) built with Node.js, and made to run via [containers](#containers).

## High level

The solution is a web interface, which integrates with a REST API, which in turn communicates with internal services such as the blockchain node and databases. In addition, a daemon/worker will be created that will be responsible for obtaining data from the blockchain and changing the status of the transaction.

This diagram shows the architecture of the 2 way peg app, a Customer (Person) refers to someone who owns BTC or RBTC who wishes to use the 2 way peg app to send a transaction.

![High level diagram - Customer](/img/resources/two-way-peg-app/57-high-level-diagram.png)

## Components

The front-end application of the 2 way peg app is developed using Vue.js. The backend application is developed using Nodejs containing a restful API Service and a Daemon service. The API is responsible to serve the data to the front-end, and the Daemon service is responsible for listening for transactions on-chain and updates the database.

![Frontend Application - 2 way peg](/img/resources/two-way-peg-app/58-frontend-application-diagram.png)

## Containers

All applications are available to run using [Docker](https://www.docker.com/) and are built using a Dockerfile. The front-end application will start a node environment with nginx to serve the Vuejs application, and the back-end will start nodejs and start the daemon and api listening by default on port `3000`.

![Containers Diagram](/img/resources/two-way-peg-app/59-containers-diagram.png)