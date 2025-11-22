---
sidebar_label: Zero-Knowledge Proofs with Noir
sidebar_position: 4
title: Zero-Knowledge Proofs on Rootstock with Noir
description: "Building private decentralized applications (dApps) on Rootstock is key to ensuring user confidentiality and security. Zero-Knowledge Proofs (ZK proofs) and Noir form a powerful combination, blending advanced cryptography with a developer-friendly language to create privacy-focused solutions."
tags: [zk, noir, zero-knowledge, privacy, tutorial, solidity, dapp, rootstock]
---

# Zero-Knowledge Proofs on Rootstock with Noir

Zero-knowledge proofs let a user prove they know something (a secret code, a credential, ownership) without ever revealing the secret itself. On Rootstock — the Bitcoin-secured, EVM-compatible smart contract chain — this unlocks real privacy while keeping Bitcoin-level security.

This hands-on tutorial teaches you how to use **Noir** (the most developer-friendly ZK DSL today) to build a **Secret NFT Club**: users mint an exclusive membership NFT only by proving they know the secret password — the password never appears on-chain or in the browser console.

## Prerequisites

- Node.js ≥ 18
- Rust & Cargo (for Noir)
- MetaMask with RBTC on Rootstock Testnet
- Basic knowledge of Solidity and React/Next.js

## Getting Started

### 1. Install Noir (Nargo CLI)

```bash
curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
noirup
```

Check version (≥ 0.34.0 recommended):

```bash
nargo --version
```

### 2. Create the ZK Circuit – Prove Knowledge of Secret

```bash
nargo new secret-club
cd secret-club
```

Replace `src/main.nr` with this circuit (uses Pedersen commitment, ZK-friendly):

```rust
use dep::std;

fn main(secret: Field, public_hash: pub Field) {
    let hash = std::hash::pedersen_commitment([secret], 0)[0];
    assert(hash == public_hash);
}
```

Compile:

```bash
nargo compile
```

### 3. Generate the On-Chain Verifier

```bash
nargo codegen-verifier
```

This creates `contract/plonk_vk.sol` → rename to `UltraVerifier.sol` (Noir’s current verifier name).

### 4. Solidity Contract – Secret NFT Club

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./UltraVerifier.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SecretNFTClub is ERC721 {
    UltraVerifier public immutable verifier;
    bytes32 public immutable secretHash; // Pedersen hash of the real secret
    mapping(address => bool) public hasJoined;

    constructor(bytes32 _secretHash, address _verifier)
        ERC721("Secret Club", "SCLUB")
    {
        secretHash = _secretHash;
        verifier = UltraVerifier(_verifier);
    }

    function join(bytes calldata proof) external {
        require(!hasJoined[msg.sender], "Already a member");

        bytes32[] memory publicInputs = new bytes32[](1);
        publicInputs[0] = secretHash;

        require(verifier.verify(proof, publicInputs), "Invalid proof");

        hasJoined[msg.sender] = true;
        _safeMint(msg.sender, totalSupply());
    }
}
```

### 5. Pre-compute the Secret Hash (Important!)

The circuit uses Pedersen, not keccak256. Compute the correct hash once:

```bash
# In the secret-club directory
echo 'secret: "supersecret2025"' > Prover.toml
echo 'public_hash: 0' >> Prover.toml   # dummy
nargo execute witness
```

Then extract the computed hash from the generated witness or use a small JS helper (see next step). Hardcode it when deploying.

### 6. Deploy to Rootstock Testnet

**Network details:**

- RPC: `https://public-node.testnet.rsk.co`
- Chain ID: 31
- Faucet: https://faucet.rootstock.io

Hardhat example (`scripts/deploy.ts`):

```ts
const verifier = await ethers.deployContract("UltraVerifier");
await verifier.waitForDeployment();

const SECRET = "supersecret2025";
const secretHash = "0x0c1a..."; // ← put the Pedersen hash here

const club = await ethers.deployContract("SecretNFTClub", [
  secretHash,
  verifier.target,
]);
```

### 7. Frontend – Generate Proof in Browser (Next.js / React)

Install:

```bash
npm install @noir-lang/noir_js @noir-lang/backend_barretenberg
```

Component:

```tsx
import { Noir } from "@noir-lang/noir_js";
import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import circuit from "../../secret-club/target/secret-club.json";

async function joinClub() {
  const backend = new BarretenbergBackend(circuit, {
    threads: navigator.hardwareConcurrency,
  });
  const noir = new Noir(circuit, backend);

  await backend.instantiate(); // ~10–15s first time (downloads keys)

  const secret = prompt("Enter the secret password");
  if (!secret) return;

  const input = {
    secret: BigInt(ethers.keccak256(ethers.toUtf8Bytes(secret))), // adjust if you hash client-side
    public_hash: "0x0c1a...", // same as deployed secretHash
  };

  const { proof } = await noir.generateFinalProof(input);

  // Send to contract
  await writeContract({
    address: CLUB_ADDRESS,
    abi: clubAbi,
    functionName: "join",
    args: [proof],
  });
}
```

**Performance**

- First proof (key download): 10–20 seconds
- Subsequent proofs: 3–7 seconds (modern laptop)
- On-chain verification: ~320k gas (≈ 0.0006 RBTC on testnet)

### 8. Run It Locally First

Use Hardhat node forked from Rootstock testnet:

```bash
npx hardhat node --fork https://public-node.testnet.rsk.co
```

## Limitations & Production Tips

- Audit your circuit — a bug leaks the secret forever
- Use Web Workers to avoid freezing the UI
- Cache Barretenberg WASM/keys for faster repeat proofs
- For mainnet: use a ceremony with contribution (or wait for trusted-setup-free backends)

## Useful Links

- Noir Docs: https://noir-lang.org
- Rootstock Testnet Explorer: https://explorer.testnet.rootstock.io
- Rootstock Discord (ask in #dev-zk): https://discord.gg/rootstock

You now have a fully functional private membership system running on Bitcoin’s most secure smart-contract chain.

Happy hacking!
