---
layout: preso
permalink: "/webinars/202007-005/slides/"
title: Testing Smart Contracts with Truffle
tags: rsk, solidity, truffle, test, mocha, slides
description: "RSK - Testing Smart Contracts with Truffle"
backgroundImage: "/assets/img/preso/preso-rsk-slide-body.png"
---

<!-- .slide: data-background="/assets/img/preso/preso-rsk-slide-title.png" -->

---

# Testing Smart Contracts with Truffle

[Brendan Graetz](http://bguiz.com/)

[Dulce Villarreal](https://twitter.com/Dulce_vird)

2020/07/08

[developers.rsk.co/webinars/202007-005/slides](/webinars/202007-005/slides/)

NOTE:

`Brendan`

---

This works best as a hands-on session.

(so get your computers ready!)

NOTE:

`Brendan`

Please note that this webinar has been designed primarily as a hands on session.
You may choose to simply watch or observe,
but you will probably get the most out of this if
you follow along!

---

<!-- .slide: data-background="/assets/img/preso/webinars-page-screenshot.png" -->

<!-- .element: style="background-color: #ffffffb0;" -->
### [developers.rsk.co/webinars](/webinars/)
[60+ past events](/webinars/#calendar-past)

NOTE:

`Brendan`

For those of you joining us in this webinar for the first time, we would like to highlight that this is just one of a very large series of webinars,
that is over 50 and counting at the moment.

Lots of great educational material out there already,
so check out developers.rsk.co for all the details.

---

## IOV Labs


![RSK Taringa RIF logo](/assets/img/logos/rsk-taringa-rif.png)

NOTE:

`Dulce`

- We both work in IOV Labs, the umbrella organization for RSK, Taringa, and RIF.
- RSK is the smart contract platform secured by the bitcoin mining hash power, and therefore the most secure one.
- Taringa is a social media platform, and
- RIF offers a suite of services for the decentralised Internet: name service, payments, communications, storage, and  marketplaces... all decentralised.
- IOV is building a fully decentralized internet for Financial Inclusion.

---

## Us

- Dulce
- Brendan

NOTE:

`Dulce`

----

### Dulce Villarreal

- Dev 🥑 IOVlabs: RSK + RIF
- México 🇲🇽 - San Francisco 🌁
- Economist & data scientist 🧮
- Foodie & mezcal sommelier 🌮 🍛 🍣
- Roller skater ⛸️
- @Dulce_vird

NOTE:

`Dulce`
Now, let me introduce myself. I'm Dulce. I'm Mexican. I'm an economist and data scientist. I worked in banking and fintech startups. I love food and fresh veggies. You can find me on twitter.

----

### Brendan

- Dev 🥑
- Singapore 🇸🇬
- Granjero de mariposas
  🥚→🌿→🐛→💤→🦋
- Compostador urbano
  🍜→♻️→🌱
- Estudiante español

NOTE:

`Brendan`

- Ya he estado aprendiendo por más de doscientos días en Dúolingo
- Estoy practicando mi español ahora mismo 😃 but that's all the Spanish you're going to get from me today!

---

## Pre-requisites

[developers.rsk.co/tutorials/workshop-prereqs](/tutorials/workshop-prereqs/)

[POSIX compliant shell](/tutorials/workshop-prereqs/#posix-compliant-shell) /
[curl](/tutorials/workshop-prereqs/#curl) /
[NodeJs](/tutorials/workshop-prereqs/#nodejs) /
[Code editor](/tutorials/workshop-prereqs/#code-editor) /
[Truffle](/tutorials/workshop-prereqs/#truffle) /
[Java](/tutorials/workshop-prereqs/#java) /
[RSKj](/tutorials/workshop-prereqs/#rskj)

NOTE:

- Please make sure you have all of these things installed and working on your system

---

## Testing JS

- **None** of these:
  - Smart contracts, Solidity, DApps
- **Instead**:
  - Only Javascript

NOTE:

`Brendan`

The title of this webinar is testing smart contracts with Truffle.
But we will not start with any of those things at all.
Instead we'll focus solely on Javascript.
After we have done out first hands on,
you will see why!

---

## Testing JS: Objectives

- What is testing?
- Software engineering principles - Why test?
- Writing tests in JS using Mocha

NOTE:

`Brendan`

We have a few learning objectives here today.
We'll start with what testing is, and why we need to do it.
Subsequently, we will write tests in Mocha using Javascript.

---

## Mocha

- A test runner for JS
- Can execute "spec" files either in browser, or in NodeJs
- Executes tests, outputs reports

NOTE:

`Dulce`

- Mocha is a test runner (or test framework) for Javascript that can run either in the browser or in NodeJs
- Today, we'll only be using NodeJs
- The main task of a test runner is to execute tests and generate a report
- But before we get there, we first need to understand some terms: Implementation, specification, and then, we can loop back to the test runner

---

### Implementation

- Code that you write
- Executes when the program is being used
- You are *implementing* the *features* of your software
- `impl`

NOTE:

`Dulce`

- Implementations form the actual parts of the code that perform the functionality of your program or application

---

### Specification

- **Also** code that you write
- Does **not** execute when the program is being used
- Instead it executes the implementation
- You are *specifying* the *features* of your software
- `spec`

NOTE:

`Dulce`

- Specifications are similar to implementation because they are also code
- However they are not executed by the user of your program or application, instead the specifications run the implementations in certain pre-defined ways.

---

### Test runner

- A developer **tool**
- **runner** `═exec⟹` **specification** `═exec⟹` **implementation**
- **runner** `═observes⟹` **behaviour** `═produces⟹` **report**
- Mocha

NOTE:

`Brendan`

- a test runner is sometimes also referred to as a test framework
- mocha is the test runner which we will be using today
- what it does its it executes your specs, which in turn execute your impls, while it watches the execution, recording which specs pass and which ones fail, outputting a report at the end.

----

### More theory

- [Unit](https://en.wikipedia.org/wiki/Unit_testing)/
  [Integration](https://en.wikipedia.org/wiki/Integration_testing)/
  [Acceptance](https://en.wikipedia.org/wiki/Acceptance_testing)
- [Black box](https://en.wikipedia.org/wiki/Black-box_testing)/
  [White box](https://en.wikipedia.org/wiki/White-box_testing)
- [Code coverage](https://en.wikipedia.org/wiki/Code_coverage)

NOTE:

`Brendan`

- there is a lot more to testing than what we have just covered
- so that we don't go over time, here we simply have links to a lot of material on wikipedia,
  which define various testing related terminology
  which you're encouraged to read after this webinar
- for now, we have covered the basics required to do our hands on with pure javascript, and then move on to testing solidity

---

## Testing JS: Hands-on

[developers.rsk.co/tutorials/workshop-js-testing](https://developers.rsk.co/tutorials/workshop-js-testing/)

NOTE:

`Brendan`

(pre-reqs next slide)

---

### Pre-requisites

[developers.rsk.co/tutorials/workshop-prereqs/](/tutorials/workshop-prereqs/)

[POSIX compliant shell](/tutorials/workshop-prereqs/#posix-compliant-shell) /
[NodeJs](/tutorials/workshop-prereqs/#nodejs)

NOTE:

- To follow along in this hands-on section of the workshop, you will need to have these things on your system
- For those of you who have just joined us,
  please check out the pre-requisites section that we covered at the beginning of the webinar,
  this is merely a quick recap

---

## Testing JS: Hands-on

[developers.rsk.co/tutorials/workshop-js-testing/](/tutorials/workshop-js-testing/)

NOTE:

`Brendan` + `Dulce`

- Alright, now we're going to do a Javascript testing hands-on.
- Please follow the link above and it will take you to a workshop from DApps Dev Club created for a session which I ran last year.
- Instead of me presenting and doing the demo at the same time, I'm going to ask Dulce to do this,
- (swap over screen share)
- We won't be doing this entire exercise, when we get to the "version control with git" section, we'll skip right down to about the halfway mark, all the way to the heading "write some code"

`Dulce`

- (follow the instructions)
- (swap screenshare back)

---

## Right/wrong impl/spec

![DApps Dev Club - Implementation Specification Correctness Quadrants](/webinars/202007-005/dapps-dev-club-implementation-specification-correctness-quadrants.png) <!-- .element: style="max-width: 50%; max-height: 50%;" -->

NOTE:

`Brendan`

- Now that we have executed `npm run test`,
  we have completed writing a correct implementation,
  and a correct specification
- That's the best combination to have, but you cannot know that for sure
- The remainder of this hands-on exercise will take you through various commbinations of right and wrong impls, and right and wrong specs,
  which result in false positives, et cetera
- However, we won't be doing this in today's session in light of time - you are of course encouraged to do this in your own time!

---

## Testing Solidity

|  | Impl | Spec | Test Runner |
| --- | --- | --- | --- |
| Javascript | `*.js` | `*.spec.js` | `mocha` |
| Smart contract | `*.sol` | `*.spec.js` | `truffle test` |

NOTE:

`Brendan`

- As promised earlier, we're going to switch gears from testing pure Javascript to testing smart contracts
- This means that we're going to switch from using mocha as the test runner to using truffle as the test runner
- Why did we spend all that time earlier learning about mocha? I have a gut feel that some of you are thinking this.
- Truffle test is based on Mocha - it is just a wrapper around it, which changes about 1%, and the other 99% of it is the same, from a test writer's point of view.

---

### `mocha` vs `truffle test`

| `mocha` | `truffle test` |
| --- | --- |
| `require()` | `artifacts.require()` |
| `describe()` | `contract()` ⃰ |
| `describe(() => {...})` | `contract((accounts) => {...})` |


NOTE:

`Brendan`

---

### State machines

- Finite State Automata

NOTE:

`Brendan`

- Before we start the hands-on section,
  let's talk about some computer science,
  very briefly, so that we have a better
  understanding of our approach towards testing.
- "State machines" is a term that derives from Mathematics about finite state automata
- Smart contracts have properties of state machines, let's get into some specifics

----

### State

- Smart contracts are stateful systems.
- This means that a smart contract can be
  said to be in a particular "state",
  at any point of time.
- This "state" is a set of variables,
  including their current values,
  stored by the smart contract.

NOTE:

`Brendan`

----

### State transitions

- A state transition is a function that allows
  users to change the state of the smart contract.
- When the values of one or more variables
  in the smart contract is updated,
  that is a state change.
- A transaction added to to the ledger is the
  vehicle for a smart contract state change.

---

## Testing Solidity: Hands-on

- State
- State transitions
- Events
- ~~Mocked functions~~

NOTE:

`Brendan`

- Here are a few common categories of things to do while testing
- We will **not** be doing any mocking in this session in light of time constraints. Instead, we'll give ourselves more time to focus on testing state, state transitions, and events

---

### Pre-requisites:

[developers.rsk.co/tutorials/workshop-prereqs](/tutorials/workshop-prereqs/)

[POSIX compliant shell](/tutorials/workshop-prereqs/#posix-compliant-shell)
[NodeJs](/tutorials/workshop-prereqs/#nodejs)
[Truffle](/tutorials/workshop-prereqs/#truffle) /
[RSKj](/tutorials/workshop-prereqs/#rskj)

NOTE:

- To follow along in this hands-on section of the workshop, you will need to have these things on your system
- For those of you who have just joined us,
  please check out the prerequisites section that we covered at the beginning of the webinar,
  this is merely a quick recap
- In this hands-on session, we are going to make use of a demo truffle project which has all of the stuff mostly in place, and you just to `git clone` the starting point
- You will also need to install truffle via NodeJs
- And finally you will need to have the RSK node, called RSKj, installed on your system and running on the Regtest network
  - If you do not have this on your system already, please check out our previous webinars in which we go through the steps for this in great detail

---

## Testing Solidity: Hands-on

[developers.rsk.co/tutorials/workshop-smart-contract-testing-truffle](/tutorials/workshop-smart-contract-testing-truffle/)

NOTE:

`Brendan`

- Please go ahead and open up the link to that article which is essentially the written form of this tutorial
- One of the first few steps will be to git clone the repo at the github link above
- Now I'm going to swap over the screenshare to Dulce, who will demo this while I narrate,
  just like we did in the previous hands-on
- (swap screen share)

`Dulce`

- (does demo)
- (swap back screen share)

---

## Summary

- Testing
- Smart contracts as state machines
- Testing Javascript: **Impl** and **spec** were both JS
- Testing Solidity: **Impl** was Solidity, **spec** was JS
  - RSK Regtest

NOTE:

`Dulce`

- While this webinar has been primarily intended as a hands-on workshop, we have covered some theory too, to do with softwate engineering principles around testing, and thinkign about smart contracts in terms of state and state transitions.
- And in the hands on section we created a Javascript application and tested it with Javascript, and followed that up with creating a smart contract in Solidity and testing that with Javascript.
- You will have noticed that we have used the RSK regtest network for our smart contracts, which runs locally, on your computer only. This is intentional: For these kinds of tests where you're doing active development, and needs faster iterations, a localhost-only blockchain is the right choice.
- However, note that you always have the option of running tests against your smart contracts deployed on a real peer-to-peer decentralised blockchain network, such as the RSK Testnet, or even the RSK Mainnet - but usually one would reserve this for a later stage in the project where you have considerations such as economic incentive based attacks or networks congestions or gas price hikes.

---

## Fin

Thank you!

[developers.rsk.co/webinars](/webinars/)

[https://rootstock.io/discord](https://rootstock.io/discord)

NOTE:

`Dulce`

Thanks to everyone for attending!

Be sure to check out developers.rsk.co/webinars for more sessions on RSK and RIF!

If you have any questions, please reach out to us at developers [at] iovlabs.org or the [Discord link](https://rootstock.io/discord) here.

Thank you!

---

<!-- .slide: data-background="/assets/img/preso/preso-rsk-slide-fin.png" -->
