---
title: "Introducing Lovell 7.1.0"
author: Rootstock
tags: [release, lovell]
url: https://rootstock.io/blog/introducing-rskj-lovell-7-1-0/
---

## Summary

The latest version of the [RSKj client - Lovell 7.1.0](https://github.com/rsksmart/rskj/releases/tag/LOVELL-7.1.0) introduces several enhancements, including the experimental Snap Synchronization mode, updates to the Fiat Stable MinGasPrice feature, and improvements to JSON-RPC API compatibility.

:::tip[Tip]

⚠️ Although this upgrade is optional, we strongly recommend updating your node to take advantage of the latest performance and security improvements.

:::

## What changes are included in Lovell 7.1.0?

- [Experimental] Introduced SnapSync, a new fast synchronization mode designed to accelerate node bootstrapping.
- Enhanced Fiat Stable MinGasPrice — added support for defining a valid minimum and maximum gas price range.
- Improved upgrade awareness — added a warning message when a disabled network upgrade is detected.
- JSON-RPC compatibility — added the `mixHash` and `nonce` fields to the block DTO, defaulting to zero for compatibility with Ethereum-based tools.
- RLP validation enhancement — `RLP.getNextElementIndex` now throws an exception if an invalid pos value is provided.

> Features marked as **[Experimental]** are disabled by default. These features require further validation or security reviews and may be changed or removed in future releases. If you’re unsure about their implications, we recommend leaving them disabled. See the [full changelog](https://github.com/rsksmart/rskj/compare/LOVELL-7.0.0...LOVELL-7.1.0).