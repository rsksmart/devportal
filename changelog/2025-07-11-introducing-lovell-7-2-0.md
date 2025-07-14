---
title: "Introducing Lovell 7.2.0"
author: Rootstock
tags: [release, lovell]
url: https://rootstock.io/blog/introducing-rskj-lovell-7-2-0/
---

## Summary

The latest version of the [RSKj client - Lovell 7.2.0](https://github.com/rsksmart/rskj/releases/tag/LOVELL-7.2.0) includes improvements to Ethereum compatibility, specifically in how the RSKj node handles the logIndex field, which indicates the position of a log entry within a transaction receipt’s list of logs. It also introduces the state override feature, enabling developers to simulate transactions with custom account code, storage, or balances during an eth_call, without altering the actual blockchain state.

:::tip[Tip]

⚠️ Although this upgrade is optional, we strongly recommend updating your node to take advantage of the latest performance and security improvements.

:::

## What changes are included in Lovell 7.2.0?

Here’s a summary of the most notable changes in this version:

- **LogIndex compatibility enhancement:** Aligned logIndex handling with Ethereum clients by making it block-relative.
- **State override feature:** introduced the state override feature, enabling developers to simulate transactions with custom account code, storage, or balances during an eth_call, without altering the actual blockchain state.