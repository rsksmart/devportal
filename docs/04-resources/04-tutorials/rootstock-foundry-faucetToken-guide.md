# Build an ERC‑20 Faucet on Rootstock with Foundry

**Sidebar Label:** ERC‑20 Faucet with Foundry  
**Description:** Complete guide to deploy a claim‑based ERC‑20 token on Rootstock using Rootstock Foundry Kit  
**Tags:** `foundry` `erc20` `faucet` `rootstock`

---

## What you’ll build

Create a custom ERC‑20 faucet token on Rootstock using the [Rootstock Foundry starter kit](https://github.com/rsksmart/rootstock-foundry-starterkit). Users can claim a fixed amount of token every 24 hours.

| Item | Value |
|------|-------|
| **Token name** | **Root Token** |
| **Symbol** | **ROOT** |
| **Faucet rule** | 100 ROOT per address every 24 h |

---

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| Blockchain basics | Tx, gas, EVM, Solidity |
| Tools | `git`, `curl`, `node`, code editor (e.g., VS Code) |
| Wallet | MetaMask (or any Rootstock‑compatible wallet) |
| Add Rootstock RPC | [MetaMask Setup Guide](https://dev.rootstock.io/dev-tools/wallets/metamask/) |
| Testnet RBTC | [Get from Faucet](https://faucet.testnet.rsk.co/) |

---

## 🛠️ Setting Up Your Development Environment

This section walks you through installing Foundry, setting up the Rootstock development kit, configuring RPCs, and funding your wallet to begin deploying smart contracts.

### Step 1 — Install Foundry

Foundry is a fast, modular toolkit for EVM smart‑contract development.

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

*This installs **forge** (build/test), **cast** (CLI), **anvil** (local node), and **chisel** (REPL).*  
**Windows users:** use **Git BASH** or **WSL**. PowerShell is not supported.

---

### Step 2 — Clone the Rootstock Foundry Kit

```bash
git clone https://github.com/rsksmart/rootstock-foundry-starterkit.git
cd rootstock-foundry-starterkit
```

---

### Step 3 — Install Dependencies

This project uses OpenZeppelin’s ERC‑20 implementation:

```bash
forge install openzeppelin-contracts-08=OpenZeppelin/openzeppelin-contracts@v4.8.3 --no-commit
```

*The starter kit supports other versions too, if needed.*

---

### 📁 Project Structure

```text
.
├── lib/            # Installed dependencies (e.g., OpenZeppelin)
├── script/         # Deployment & utility scripts
│   └── ERC20Token.s.sol
├── src/            # Smart contracts
│   └── ERC20Token.sol
├── test/           # Foundry test files
│   └── ERC20Token.t.sol
└── .env            # Environment variables (⚠️ never commit this)
```

---

### Step 4 — Configure RPC & Fund Your Wallet

#### Option 1 — Use Public RPC

* Testnet  `https://public-node.testnet.rsk.co`  
* Mainnet  `https://public-node.rsk.co`

Add these networks in MetaMask via the official [MetaMask setup guide](https://dev.rootstock.io/dev-tools/wallets/metamask/).

#### Option 2 — Use a Personal RPC

Create a custom endpoint via the [Rootstock RPC Dashboard](https://developers.rsk.co/rpc/) and copy your API key.

#### How to Get Testnet RBTC

1. Visit the [Rootstock Testnet Faucet](https://faucet.testnet.rsk.co/) and paste your wallet address.  
2. You’ll receive a small amount of **tRBTC** to use for contract deployments.

---

### Step 5 — Set Up Environment Variables

Inside the project root, create a `.env` file:

```bash
touch .env
```

```dotenv
PRIVATE_KEY=0xyour_testnet_private_key
```

*The private key **must** start with `0x…`.*  
Ensure `.env` is listed in `.gitignore` to prevent accidental commits.

---

## Compile, Test & Deploy **ERC20Token**

Now that your environment is ready, let’s build, test, and deploy your ERC‑20 faucet contract.

### Step 6 — Compile the Contracts

```bash
forge build
```

Successful compilation will output artifacts in `out/`.

---

### Step 7 — Run the Tests

```bash
forge test -vv
```

* `-vv` provides verbose logs to help debug.  
* Tests live in `test/` (e.g., `ERC20Token.t.sol`).  
Make sure **all tests pass** before deploying.

---

✅ You are now fully set up to build, test, and deploy dApps on Rootstock!

---

### Step 8 — Deploy the ERC20Token to Rootstock Testnet

```bash
forge script script/Deploy.s.sol   --rpc-url https://public-node.testnet.rsk.co   --broadcast   --legacy   --evm-version london
```

* `--broadcast` — sends the deployment  
* `--legacy` — Rootstock doesn’t support EIP‑1559  
* `--evm-version london` — matches Rootstock’s EVM fork

**Dry‑run:** omit `--broadcast` to simulate the deployment.

You can inspect `broadcast/Deploy.s.sol/run-latest.json` for the deployed address and receipt.

---

## Let’s Get Started: RootToken Contract, Testing & Deployment

Complete GitHub code: <https://github.com/ishitarastogi/rootstock-example-foundr>

### 📄 1. Write the Contract

Create `src/RootToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title RootToken
/// @notice A simple ERC‑20 faucet where anyone can claim a fixed amount once per 24 h.
contract RootToken is ERC20 {
    uint256 public constant CLAIM_AMOUNT = 100 * 10 ** 18;
    uint256 public constant COOLDOWN = 1 days;
    mapping(address => uint256) public lastClaimed;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function claimTo(address recipient) external {
        require(
            block.timestamp >= lastClaimed[recipient] + COOLDOWN,
            "Faucet: cooldown not passed"
        );
        lastClaimed[recipient] = block.timestamp;
        _mint(recipient, CLAIM_AMOUNT);
    }
}
```

---

### 2. Update the Deployment Script

Create `script/DeployRootToken.s.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RootToken.sol";

contract DeployRootToken is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new RootToken("Root Token", "ROOT");

        vm.stopBroadcast();
    }
}
```

---

### 3. Write the Test File

Create `test/RootToken.t.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/RootToken.sol";

contract RootTokenTest is Test {
    RootToken token;
    address alice = address(0xA1CE);
    address bob   = address(0xB0B);
    uint256 constant CLAIM_AMOUNT = 100 * 10 ** 18;
    uint256 constant COOLDOWN = 1 days;

    function setUp() public {
        token = new RootToken("Root Token", "ROOT");
    }

    function testMetadata() public {
        assertEq(token.name(), "Root Token");
        assertEq(token.symbol(), "ROOT");
        assertEq(token.decimals(), 18);
    }

    function testClaimToMintsTokens() public {
        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(alice);
        token.claimTo(alice);
        assertEq(token.balanceOf(alice), CLAIM_AMOUNT);
    }

    function testCannotClaimBeforeCooldown() public {
        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(alice);
        token.claimTo(alice);

        vm.prank(alice);
        vm.expectRevert("Faucet: cooldown not passed");
        token.claimTo(alice);
    }

    function testClaimAfterCooldown() public {
        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(bob);
        token.claimTo(bob);

        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(bob);
        token.claimTo(bob);

        assertEq(token.balanceOf(bob), CLAIM_AMOUNT * 2);
    }

    function testIndependentCooldowns() public {
        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(alice);
        token.claimTo(alice);

        vm.prank(bob);
        token.claimTo(bob);

        assertEq(token.balanceOf(alice), CLAIM_AMOUNT);
        assertEq(token.balanceOf(bob), CLAIM_AMOUNT);
    }
}
```

---

### 4. Compile the Contracts

```bash
forge build
```

You should see a successful output in **green** ✅.

---

### 5. Run the Tests

```bash
forge test -vv
```

All test cases should pass.

![Forge tests](https://github.com/user-attachments/assets/57563a2f-c46e-4ec3-a43a-8cf1effe993b)

---

### 6. Deploy to Rootstock Testnet

```bash
forge script script/DeployRootToken.s.sol   --rpc-url https://public-node.testnet.rsk.co   --broadcast   --legacy   --evm-version london
```

![Deployment](https://github.com/user-attachments/assets/76f66b37-e498-4f24-96e8-b60b902063aa)

✅ Your RootToken faucet contract is live on Rootstock!

---

## 🔍 Step 9 — Verify Your Contract on Rootstock Explorer

After deploying, verify it on the [Rootstock Testnet Explorer](https://explorer.testnet.rootstock.io/).

1. Copy your contract address.  
2. Go to the explorer, search the address, open the **Code** tab and click **Verify Contract**.

| Field | Value |
|-------|-------|
| Contract Name | `RootToken` |
| Compiler Version | Match `pragma` (e.g., `0.8.20`) |
| Optimization | Yes |
| EVM Version | London |
| Constructor Arguments | `Root Token,ROOT` |
| ABI‑encoded Args? | No |
| Contract Libraries | *(blank)* |
| Source File | Paste flattened contract |

### Flatten the Contract

**Option A — Foundry**

```bash
forge flatten src/RootToken.sol > RootToken.flat.sol
```

**Option B — Remix**

1. Open <https://remix.ethereum.org/>  
2. Paste contract with imports, right‑click → **Flatten**.  
3. Copy the output.

Click **Verify**. If everything is correct, verification succeeds in seconds.

---

## ✅ Interact With Your Verified Contract

Try calling `claimTo(address)` using MetaMask.

![Write Contract](https://github.com/user-attachments/assets/e0776e4b-931b-4d6f-b572-4dd2ec9a3e75)

After confirmation, check `balanceOf`:

![Read Contract](https://github.com/user-attachments/assets/cf8f0b72-e1c1-4698-b3cc-7c548b0b7c1e)

---

## Step 10 — Interact Using **cast** (Terminal)

### 📖 Read: Check Token Balance

```bash
cast call <contract_address> "balanceOf(address)(uint256)"   <wallet_address>   --rpc-url https://public-node.testnet.rsk.co
```

### ✍️ Write: Claim Tokens

```bash
cast send <contract_address> "claimTo(address)" <recipient_address>   --rpc-url https://public-node.testnet.rsk.co   --private-key $PRIVATE_KEY   --legacy
```

Example output:

```
transactionHash:      0x87d6207e822d3eef500058d7359fa66b729c045f6061eacc0aa65242dbc7fa0e
blockNumber:          6303222
from:                 0x302fE507615F9fB25Ab842D66015c138DB5F8377
to:                   0x9Ad8A78833921EBc0bB4eB79C420020D212c8efF
gasUsed:              70402
status:               1 (success)
logs:
  Transfer from 0x0 to 0x3e718... for 100 ROOT
```

**Tips**

* `cast call` for **view/pure** functions  
* `cast send` for **state‑changing** functions (needs tRBTC)  
* Fund your testnet wallet before sending transactions.

---

## 🌱 Bonus: TapRoot dApp Built on Rootstock

- **Live Demo:** <https://rootstock-foundry-example.vercel.app/>  
- **Complete Source:** <https://github.com/ishitarastogi/rootstock-fullstack-dapp>

### TapRoot: Root Yourself Onchain

**TapRoot 🌱** is a playful dApp that lets users “root” themselves—or friends—onchain with a single tap.

![TapRoot UI](https://github.com/user-attachments/assets/81227633-278d-4683-9911-d2abc0b4cdd5)

#### How It Works

- Users call `root()` via the frontend.  
- Contract increments their personal and global counters.  
- A `Rooted` event logs the address, personal total, and global total.

*Root yourself. Root your friends. Grow the global counter—together.*

---

### ✅ That’s a Wrap

By the end of this guide you have:

- Set up a modern EVM development environment with Foundry on Rootstock.  
- Created, tested, and deployed a custom ERC‑20 faucet token.  
- Verified it on-chain and interacted via explorer and CLI.  
- Explored a full‑stack dApp example on Rootstock.

Rootstock combines Bitcoin’s merge‑mined security with EVM flexibility—ready for your next dApp!
