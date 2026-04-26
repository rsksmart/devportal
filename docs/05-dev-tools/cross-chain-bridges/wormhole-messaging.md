---
title: Cross-Chain Messaging with Wormhole
description: Step-by-step guide for integrating Wormhole's arbitrary message passing natively on Rootstock.
sidebar_label: Wormhole Messaging
sidebar_position: 2
---

This guide shows you how to integrate Wormhole's arbitrary message passing on Rootstock. By the end, you will have a Solidity receiver contract that parses and verifies Verified Action Approvals (VAAs) using the Wormhole Core Contract on Rootstock. You will also have a TypeScript snippet to fetch and decode VAA payloads using the Wormhole SDK.

Wormhole supports general-purpose cross-chain communication, not just token transfers. You can send arbitrary byte payloads between any two Wormhole-supported networks, which makes it suitable for cross-chain governance, data synchronization, and multi-chain application logic on Rootstock.

## Architecture Overview

The Wormhole protocol uses three components: Emitters, Guardians, and Receivers. Each component plays a specific role in the cross-chain message lifecycle as it applies to Rootstock.

### Emitter

An Emitter is a smart contract on the source chain. You call `publishMessage` on the source chain's Wormhole Core Contract and pass your payload as raw bytes. The core contract emits an on-chain log that the Guardian network monitors.

### Guardian Network

The Guardian Network is a set of 19 independent validators. Each Guardian runs a full node for every Wormhole-supported chain. When a Guardian observes an emitted log, it produces a cryptographic signature over the message contents. After at least 13 of the 19 Guardians sign the message (a two-thirds supermajority), the completed bundle becomes available as a VAA.

A VAA packages the original payload with Guardian signatures and key metadata: the source chain ID, the emitter address, a sequence number, and a unique hash. Your Receiver contract uses this hash for replay protection.

The Guardian Network now also uses Zero-Knowledge (ZK) proofs to validate message inclusion. This reduces VAA availability latency on high-throughput source chains.

### Receiver

A Receiver is a contract on the destination chain. On Rootstock, you pass the VAA bytes to `parseAndVerifyVM` on the Wormhole Core Contract. The core contract verifies the Guardian signatures and returns a parsed `VM` struct. Because Rootstock is an EVM-compatible chain, all standard Wormhole EVM interfaces work without modification.

The table below lists the deployed Wormhole Core Contract addresses for Rootstock. Pass the address that matches your target network to the constructor of your Receiver contract.

| Network | Core Contract Address |
|---|---|
| Rootstock Mainnet | `0xbebdb6C8ddC678FfA9f8748f85C815C556Dd8ac6` |

**Note on testnet:** Wormhole does not currently have a public Core Contract deployment on Rootstock Testnet. Use Rootstock Mainnet for testing inbound messages, or check the [official Wormhole contract addresses page](https://wormhole.com/docs/build/reference/contract-addresses/) for future updates.

### Message Lifecycle

A cross-chain message passes through four stages before your Receiver processes it on Rootstock.

1. Your source-chain contract calls `publishMessage` with your payload bytes.
2. The Guardian Network observes and co-signs the emitted log, producing a VAA.
3. Your relayer or backend fetches the signed VAA from the Guardian REST API.
4. You submit the VAA bytes to your Receiver contract on Rootstock.

## Smart Contract Implementation

The following Solidity contracts form a complete, deployable receiver for Rootstock. You will define the `IWormhole` interface first, then deploy the `WormholeReceiver` contract that depends on it. Extend `_handlePayload` to implement your application-specific logic.

### IWormhole Interface

You need a minimal interface for the Wormhole Core Contract. Copy the snippet below into your project, or install the [Wormhole Solidity SDK](https://github.com/wormhole-foundation/wormhole-solidity-sdk) for the full set of types.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IWormhole {
    struct Signature {
        bytes32 r;
        bytes32 s;
        uint8 v;
        uint8 guardianIndex;
    }

    struct VM {
        uint8 version;
        uint32 timestamp;
        uint32 nonce;
        uint16 emitterChainId;
        bytes32 emitterAddress;
        uint64 sequence;
        uint8 consistencyLevel;
        bytes payload;
        uint32 guardianSetIndex;
        Signature[] signatures;
        bytes32 hash;
    }

    function parseAndVerifyVM(bytes calldata encodedVM)
        external
        view
        returns (VM memory vm, bool valid, string memory reason);
}
```

### WormholeReceiver Contract

The contract below demonstrates a production-ready receiver pattern. Deploy it by passing the Wormhole Core Contract address for Rootstock Mainnet to the constructor.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IWormhole.sol";

contract WormholeReceiver {
    // Reference to the Wormhole Core Contract on Rootstock
    IWormhole public immutable wormhole;

    // Contract owner for administrative actions such as registering emitters
    address public owner;

    // Tracks processed VAA hashes to block replay attacks
    mapping(bytes32 => bool) public processedVaas;

    // Approved emitters keyed by source chain ID and 32-byte emitter address
    // Wormhole normalizes all addresses to 32 bytes regardless of the source chain
    mapping(uint16 => mapping(bytes32 => bool)) public trustedEmitters;

    event MessageReceived(
        uint16 indexed emitterChainId,
        bytes32 indexed emitterAddress,
        uint64 sequence,
        bytes payload
    );

    event EmitterUpdated(uint16 chainId, bytes32 emitterAddress, bool trusted);

    error InvalidVAA(string reason);
    error ReplayDetected(bytes32 vaaHash);
    error UntrustedEmitter(uint16 chainId, bytes32 emitterAddress);
    error Unauthorized();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    // wormhole_ is the address of the Wormhole Core Contract on Rootstock
    constructor(address wormhole_) {
        wormhole = IWormhole(wormhole_);
        owner = msg.sender;
    }

    // Add or remove a trusted emitter from a specific source chain
    function setTrustedEmitter(
        uint16 chainId,
        bytes32 emitterAddress,
        bool trusted
    ) external onlyOwner {
        trustedEmitters[chainId][emitterAddress] = trusted;
        emit EmitterUpdated(chainId, emitterAddress, trusted);
    }

    // Convert a standard EVM address to the 32-byte format Wormhole uses
    function toWormholeAddress(address addr) public pure returns (bytes32) {
        return bytes32(uint256(uint160(addr)));
    }

    // Accept, verify, and process an incoming VAA from any supported source chain
    function receiveMessage(bytes calldata encodedVaa) external {
        // Delegate Guardian signature verification to the Wormhole Core Contract
        (IWormhole.VM memory vm, bool valid, string memory reason) =
            wormhole.parseAndVerifyVM(encodedVaa);

        // Reject the VAA if the Guardian quorum was not met or the format is invalid
        if (!valid) revert InvalidVAA(reason);

        // Reject any VAA whose hash was already recorded in the replay protection map
        if (processedVaas[vm.hash]) revert ReplayDetected(vm.hash);

        // Reject VAAs from emitters that are not on the approved list
        if (!trustedEmitters[vm.emitterChainId][vm.emitterAddress]) {
            revert UntrustedEmitter(vm.emitterChainId, vm.emitterAddress);
        }

        // Record the hash before any external calls to prevent reentrancy
        processedVaas[vm.hash] = true;

        // Dispatch the verified payload to the application-specific handler
        _handlePayload(
            vm.emitterChainId,
            vm.emitterAddress,
            vm.sequence,
            vm.payload
        );

        emit MessageReceived(
            vm.emitterChainId,
            vm.emitterAddress,
            vm.sequence,
            vm.payload
        );
    }

    // Override this function in your subcontract to implement cross-chain message handling
    function _handlePayload(
        uint16 emitterChainId,
        bytes32 emitterAddress,
        uint64 sequence,
        bytes memory payload
    ) internal virtual {
        // Add your application-specific logic here
    }
}
```

## Security Best Practices

Every Wormhole Receiver you deploy on Rootstock needs the three controls described in this section. Missing any single one of them creates an exploitable vulnerability.

### Replay Protection

The `vm.hash` field in the parsed VAA is unique across every message in the Wormhole protocol. You must record processed hashes in a mapping and revert if you encounter the same hash twice. The `WormholeReceiver` contract above uses the `processedVaas` mapping for this purpose.

Without replay protection, an attacker can resubmit a valid VAA multiple times and trigger your handler on each submission. An alternative approach is to record the sequence number per emitter instead of the full hash. Both strategies are valid. The hash approach requires only a single mapping, which simplifies implementation.

### Trusted Emitter Validation

The Guardian Network validates the VAA format and the Guardian signatures. It does not validate whether the emitter contract is one you trust. After `parseAndVerifyVM` returns `valid = true`, you must check that `vm.emitterChainId` and `vm.emitterAddress` match your approved list.

If you skip this check, any contract on any Wormhole-supported chain can send messages to your Receiver and trigger your business logic. You register trusted emitters by calling `setTrustedEmitter(chainId, emitterAddress, true)`. To compute the 32-byte Wormhole representation of an EVM address, call `toWormholeAddress(addr)` from the contract or compute `bytes32(uint256(uint160(addr)))` off-chain.

### Checks-Effects-Interactions Order

The `receiveMessage` function follows the checks-effects-interactions pattern. It writes `processedVaas[vm.hash] = true` before it calls `_handlePayload`. This ordering prevents a reentrancy attack where a malicious payload re-enters `receiveMessage` with the same VAA before the hash is recorded. Always place the replay protection write before any external calls or state changes that depend on the payload.

### Consistency Level on Rootstock

Rootstock has a longer average block time than chains like Arbitrum or Base. When you publish a message from a source chain targeting Rootstock, set a `consistencyLevel` that gives the Guardian Network enough block confirmations to treat the source transaction as final.

A higher `consistencyLevel` causes Guardians to wait for more source-chain confirmations before co-signing the VAA. This prevents your Receiver from processing a message that gets orphaned in a source-chain reorg. Check the [Wormhole documentation](https://wormhole.com/docs/build/start-building/supported-networks/evm/#rootstock) for the recommended `consistencyLevel` per source chain when Rootstock is your destination.

## Integration Quick Start

This section shows you how to fetch a signed VAA from the Guardian network and submit it to your deployed `WormholeReceiver` contract on Rootstock using TypeScript.

### Install Dependencies

Run the following command to add the required packages to your project.

```bash
npm install @wormhole-foundation/sdk @wormhole-foundation/sdk-evm ethers
```

### Fetch, Decode, and Submit a VAA

The script below connects to Rootstock mainnet, fetches a VAA by emitter chain, emitter address, and sequence number, then submits the raw bytes to your deployed Receiver contract.

```typescript
import wormhole from "@wormhole-foundation/sdk";
import evm from "@wormhole-foundation/sdk-evm";
import { ethers } from "ethers";

// Initialize the Wormhole SDK with the EVM platform adapter
const wh = await wormhole("Mainnet", [evm]);

// Connect to Rootstock mainnet using a public JSON-RPC endpoint
const provider = new ethers.JsonRpcProvider("https://public-node.rsk.co");

// Fetch a signed VAA from the Guardian network by emitter chain, address, and sequence
async function fetchSignedVaa(
  emitterChain: string,
  emitterAddress: string,
  sequence: bigint
): Promise<Uint8Array> {
  // Resolve the chain context to get the normalized chain identifier
  const chainContext = wh.getChain(emitterChain as Parameters<typeof wh.getChain>[0]);

  // Convert the emitter address to a UniversalAddress for consistent cross-chain formatting
  const msgId = {
    chain: chainContext.chain,
    address: wormhole.nativeChainAddress(chainContext.chain, emitterAddress).address.toUniversalAddress(),
    sequence,
  };

  // Poll the Guardian network until the signed VAA is available or the timeout expires
  const vaaBytes = await wh.getVaa(msgId, "Uint8Array", 60_000);
  if (!vaaBytes) throw new Error("VAA not available within the timeout period");
  return vaaBytes;
}

// Submit raw VAA bytes to the WormholeReceiver contract deployed on Rootstock
async function submitVaa(
  receiverAddress: string,
  vaaBytes: Uint8Array,
  signer: ethers.Signer
): Promise<ethers.TransactionReceipt | null> {
  const abi = ["function receiveMessage(bytes calldata encodedVaa) external"];
  const receiver = new ethers.Contract(receiverAddress, abi, signer);

  // Convert the VAA Uint8Array to a hex string that ethers.js accepts
  const vaaHex = "0x" + Buffer.from(vaaBytes).toString("hex");

  const tx = await receiver.receiveMessage(vaaHex);
  return tx.wait();
}

// Process a cross-chain message emitted from Ethereum to your Rootstock Receiver
async function processMessage() {
  const RECEIVER_ADDRESS = "0xYourWormholeReceiverContractAddress";
  const EMITTER_ADDRESS = "0xYourEmitterContractOnSourceChain";

  // Use an environment variable or a hardware wallet for the private key in production
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  // Fetch the VAA for sequence number 1 emitted from the Ethereum source contract
  const vaaBytes = await fetchSignedVaa("Ethereum", EMITTER_ADDRESS, 1n);

  const receipt = await submitVaa(RECEIVER_ADDRESS, vaaBytes, wallet);
  console.log("Message processed. Transaction hash:", receipt?.hash);
}

processMessage().catch(console.error);
```

Replace `0xYourWormholeReceiverContractAddress` with the address of your deployed `WormholeReceiver` on Rootstock. Replace `0xYourEmitterContractOnSourceChain` with the address of the contract that published the original message on the source chain.

Wormhole does not currently have a public Core Contract deployment on Rootstock Testnet. All live testing targets Rootstock Mainnet.
