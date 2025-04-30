# Build an ERC‑20 Faucet on Rootstock with Foundry

**Sidebar Label:** ERC‑20 Faucet with Foundry  
**Description:** Complete guide to deploy a claim‑based ERC‑20 token on Rootstock using Rootstock Foundry Kit
**Tags:** `foundry`, `erc20`, `faucet`, `rootstock`

---

## What you’ll build

Create a custom ERC-20 faucet token on Rootstock using the [Rootstock Foundry starter kit](https://github.com/rsksmart/rootstock-foundry-starterkit) where users can claim a fixed amount of token every 24 hours.

| Item        | Value                           |
| ----------- | ------------------------------- |
| Token name  | **Root Token**                  |
| Symbol      | **ROOT**                        |
| Faucet rule | 100 ROOT per address every 24 h |

---

## Prerequisites

| Requirement       | Notes                                                                        |
| ----------------- | ---------------------------------------------------------------------------- |
| Blockchain basics | Tx, gas, EVM, Solidity                                                       |
| Tools             | `git`, `curl`, `node`, code editor (e.g., VS Code)                           |
| Wallet            | MetaMask (or any Rootstock-compatible wallet)                                |
| Add Rootstock RPC | [MetaMask Setup Guide](https://dev.rootstock.io/dev-tools/wallets/metamask/) |
| Testnet RBTC      | [Get from Faucet](https://faucet.testnet.rsk.co/)                            |

---

<h2>🛠️ Setting Up Your Development Environment</h2>

<p>This section walks you through installing Foundry, setting up the Rootstock development kit, configuring RPCs, and funding your wallet to begin deploying smart contracts.</p>

<h3>Step 1: Install Foundry</h3>

<p>Foundry is a fast, modular toolkit for EVM smart contract development.</p>

<pre><code>curl -L https://foundry.paradigm.xyz | bash
foundryup
</code></pre>

<ul>
  <li>This installs <code>forge</code> (build/test), <code>cast</code> (CLI), <code>anvil</code> (local node), and <code>chisel</code> (REPL).</li>
  <li><strong>Windows users</strong>: Use <em>Git BASH</em> or <em>WSL</em>. PowerShell is not supported.</li>
</ul>

<hr>

<h3>Step 2: Clone the Rootstock Foundry Kit</h3>

<pre><code>git clone https://github.com/rsksmart/rootstock-foundry-starterkit.git
cd rootstock-foundry-starterkit
</code></pre>

<hr>

<h3>Step 3: Install Dependencies</h3>

<p>This project uses OpenZeppelin's ERC20 implementation. Install it using:</p>

<pre><code>forge install openzeppelin-contracts-08=OpenZeppelin/openzeppelin-contracts@v4.8.3 --no-commit
</code></pre>

<p><strong>Note:</strong> The starter kit supports other versions too, if needed.</p>

<hr>

<h3>📁 Project Structure</h3>

<p>Once set up, your folder structure will look like this:</p>

<pre><code>.
├── lib/            # Installed dependencies (e.g., OpenZeppelin)
├── script/         # Deployment & utility scripts
│   └── ERC20Token.s.sol
├── src/            # Your smart contracts
│   └── ERC20Token.sol
├── test/           # Foundry test files
│   └── ERC20Token.t.sol
└── .env            # Environment variables (⚠️ never commit this)
</code></pre>

<hr>

<h3>Step 4: Configure Rootstock RPC & Fund Your Wallet</h3>

<p><strong>Option 1: Use Public RPC</strong></p>
<ul>
  <li><strong>Testnet:</strong> <code>https://public-node.testnet.rsk.co</code></li>
  <li><strong>Mainnet:</strong> <code>https://public-node.rsk.co</code></li>
</ul>
<p>
  To manually add Rootstock networks in MetaMask, refer to the official 
  <a href="https://dev.rootstock.io/dev-tools/wallets/metamask/" target="_blank">MetaMask Setup Guide</a>.
</p>

<p><strong>Option 2: Use a Personal RPC</strong></p>
<p>
  You can also create a custom RPC endpoint via the 
  <a href="https://developers.rsk.co/rpc/" target="_blank">Rootstock RPC Dashboard</a>. After creating an account, generate and copy your API key from the dashboard.
</p>

<p><strong>How to Get Testnet RBTC</strong></p>
<ol>
  <li>
    Visit the 
    <a href="https://faucet.testnet.rsk.co/" target="_blank">Rootstock Testnet Faucet</a> 
    and paste your wallet address.
  </li>
  <li>
    You’ll receive a small amount of <strong>tRBTC</strong> to use for contract deployments.
  </li>
</ol>

<hr>
<h3> Step 5: Set Up Environment Variables</h4>

<p>Inside your project's root directory, create a <code>.env</code> file to securely store Private Key.</p>

<pre><code>touch .env
</code></pre>

<p>And your wallet's private key (it should hold testnet RBTC):</p>

<pre><code>PRIVATE_KEY=0xyour_testnet_private_key
</code></pre>

<p><strong> Tip:</strong> Ensure the private key copied starts with <code>0x...</code>.</p>
<p>Also, make sure your <code>.env</code> file is listed in <code>.gitignore</code> to prevent accidental commits.</p>


<hr>
<h2>Compile, Test & Deploy ERC20Token</h2>

<p>Now that your environment is set up and the dependencies are installed, let’s walk through building, testing, and deploying your ERC-20 faucet contract.</p>

<h3> Step 6: Compile the Contracts</h3>

<p>This ensures your contracts are valid and bytecode is generated in the <code>out/</code> directory.</p>

<pre><code>forge build
</code></pre>

<p>If everything works, you’ll see output confirming successful compilation.</p>

<hr>

<h3> Step 7: Run the Tests</h3>

<p>Test the functionality of your <code>ERC20Token</code> contract by executing:</p>

<pre><code>forge test -vv
</code></pre>

<ul>
  <li><code>-vv</code> provides verbose logs to help debug test failures (if any).</li>
  <li>Tests are located in the <code>test/</code> folder (e.g., <code>ERC20Token.t.sol</code>).</li>
</ul>

<p>Ensure that all tests pass before proceeding to deployment.</p>

<hr>
<p>✅ You are now fully set up to build, test, and deploy dApps on Rootstock!</p>

<h3> Step 8: Deploy the ERC20Token to Rootstock Testnet</h3>

<p>Your ERC-20 faucet contract (<code>ERC20Token.sol</code>) will be deployed using the script at <code>script/Deploy.s.sol</code>.</p>

<h4>Command</h4>

<pre><code>forge script script/Deploy.s.sol --rpc-url https://public-node.testnet.rsk.co --broadcast --legacy --evm-version london</code></pre>

<ul>
  <li><strong>--broadcast</strong>: Sends the deployment to the network</li>
  <li><strong>--legacy</strong>: Required since Rootstock doesn’t support EIP-1559</li>
  <li><strong>--evm-version london</strong>: Matches Rootstock’s EVM fork</li>
</ul>

<div>
  <strong>ℹ️ Info:</strong> Rootstock doesn’t support EIP-1559. Use <code>--legacy</code> for compatibility and <code>--evm-version london</code> to match its EVM version. 
  
  <br>You can also inspect <code>broadcast/Deploy.s.sol/run-latest.json</code> for the deployed contract address and receipt.
</div>

<h4> Simulate Deployment (Optional)</h4>

<br>To dry-run the script without sending it, if you remove <code>--broadcast</code>, Foundry will simulate the deployment without actually submitting it.

<pre><code>forge script script/Deploy.s.sol --rpc-url https://public-node.testnet.rsk.co --legacy --evm-version london</code></pre>

<hr>

<h2> Let’s Get Started: RootToken Contract, Testing & Deployment</h2>

<p>Now that the environment is ready, let’s create, test, and deploy the <code>RootToken</code> — a simple ERC-20 faucet token with cooldown logic built on OpenZeppelin’s implementation.</p>
<strong>Complete github code:</strong> <a href="https://github.com/ishitarastogi/rootstock-example-foundr" target="_blank">https://rootstock-foundry-example.vercel.app/</a>

<hr>

<h3>📄 1. Write the Contract</h3>

<p>Create the following file inside <code>src/RootToken.sol</code> and paste in this logic:</p>

<pre><code class="language-solidity">// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title RootToken
/// @notice A simple ERC‑20 “faucet” where anyone can claim a fixed amount once per 24h.
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
</code></pre>

---

<h3> 2. Update the Deployment Script</h3>

<p>Edit <code>script/Deploy.s.sol</code> or create a new file named <code>DeployRootToken.s.sol</code>:</p>

<pre><code class="language-solidity">// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RootToken.sol";

contract DeployRootToken is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy with custom name and symbol
        new RootToken("Root Token", "ROOT");

        vm.stopBroadcast();
    }
}
</code></pre>

> 📌 This script passes the constructor arguments — `"Root Token"` and `"ROOT"` — during deployment.

---

<h3> 3. Write the Test File</h3>

<p>Create <code>test/RootToken.t.sol</code> and paste this test suite:</p>

<pre><code class="language-solidity">// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/RootToken.sol";

contract RootTokenTest is Test {
    RootToken token;
    address alice = address(0xA1CE);
    address bob = address(0xB0B);
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

    function testDifferentUsersHaveIndependentCooldowns() public {
        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(alice);
        token.claimTo(alice);

        vm.prank(bob);
        token.claimTo(bob);

        assertEq(token.balanceOf(alice), CLAIM_AMOUNT);
        assertEq(token.balanceOf(bob), CLAIM_AMOUNT);
    }
}
</code></pre>

---

<h3> 4. Compile the Contracts</h3>

<pre><code>forge build</code></pre>

You should see a successful compiler output. Artifacts will be created inside the `out/` folder.

---

<h3> 5. Run the Tests</h3>

<pre><code>forge test -vv</code></pre>

- `-vv` shows full logs including emitted events and debug output.
- All test cases should pass — check your terminal for green ✅.
  <img width="1118" alt="Screenshot 2025-04-22 at 12 46 19 AM" src="https://github.com/user-attachments/assets/57563a2f-c46e-4ec3-a43a-8cf1effe993b" />

---

<h3> 6. Deploy to Rootstock Testnet</h3>

Use your deploy script with the following command:

<pre><code>forge script script/DeployRootToken.s.sol \
  --rpc-url https://public-node.testnet.rsk.co \
  --broadcast \
  --legacy \
  --evm-version london
</code></pre>

<p>
  📌 This deploys your contract using your testnet wallet (loaded from <code>.env</code> as <code>PRIVATE_KEY</code>) and confirms compatibility with Rootstock by using <code>--legacy</code> and <code>--evm-version london</code>.
</p>
<img width="1027" alt="435534742-e280286e-9fa8-4b9b-9107-6cb93023aa29" src="https://github.com/user-attachments/assets/76f66b37-e498-4f24-96e8-b60b902063aa" />

---

<p>✅ That’s it — your RootToken faucet contract is live on Rootstock!</p>

<p>Next steps: verify it on the block explorer, interact with it via cast, or build a frontend UI for public claim access.</p>

<h2>🔍 Step 9: Verify Your Contract on Rootstock Explorer</h2>

<p>After deploying your <code>RootToken</code>, you should verify it on the 
<a href="https://explorer.testnet.rootstock.io/" target="_blank">Rootstock Testnet Explorer</a> 
for transparency and easy interaction.</p>

<hr>

<p><strong>1. Copy Your Contract Address</strong></p>

<p><strong>2. Open the Explorer</strong></p>
<ol>
  <li>Go to <a href="https://explorer.testnet.rootstock.io/" target="_blank">explorer.testnet.rootstock.io</a></li>
  <li>Paste your contract address and open the contract page</li>
  <li>Click the <strong>Code</strong> tab → then <strong>Verify Contract</strong></li>
</ol>

<hr>

<p><strong>3. Fill the Verification Form</strong></p>

<p>Here’s what each field means and how to fill it:</p>

<table>
  <tr>
    <th>Field</th>
    <th>Value/Instructions</th>
  </tr>
  <tr>
    <td><strong>Contract Name</strong></td>
    <td><code>RootToken</code> (no <code>.sol</code> extension)</td>
  </tr>
  <tr>
    <td><strong>Compiler Version</strong></td>
    <td>Match the version in <code>pragma solidity</code> (e.g., <code>0.8.20</code>)</td>
  </tr>
  <tr>
    <td><strong>Optimization</strong></td>
    <td>Yes</td>
  </tr>
  <tr>
    <td><strong>EVM Version</strong></td>
    <td>London</td>
  </tr>
  <tr>
    <td><strong>Constructor Arguments</strong></td>
    <td><code>Root Token,ROOT</code> <em>(no quotes)</em></td>
  </tr>
  <tr>
    <td><strong>ABI-encoded Args?</strong></td>
    <td>No</td>
  </tr>
  <tr>
    <td><strong>Contract Libraries</strong></td>
    <td>Leave blank unless you're linking manually</td>
  </tr>
  <tr>
    <td><strong>Source File</strong></td>
    <td><strong>Paste your flattened contract here</strong> (see below 👇)</td>
  </tr>
</table>

<hr>

<p><strong>4. Flatten the Contract (for Source File)</strong></p>

<p>If you imported from OpenZeppelin or any other libraries, you need to flatten your contract. Use one of the following methods:</p>

<p><strong>✔️ Option A: Using Foundry</strong></p>
<pre><code>forge flatten src/RootToken.sol > RootToken.flat.sol</code></pre>
<p>Then copy-paste the contents of <code>RootToken.flat.sol</code> into the Source File field.</p>

<p><strong>✔️ Option B: Using Remix</strong></p>
<ol>
  <li>Go to <a href="https://remix.ethereum.org/" target="_blank">Remix IDE</a></li>
  <li>Create a new file and paste the full contract with imports</li>
  <li>Right Click the file tab → choose “Flatten”</li>
  <li>Paste the output into the Source File field in the verification form</li>
</ol>

<hr>

<p><strong>5. Submit</strong></p>

<p>Click <strong>Verify</strong>. If all fields are correctly filled and your contract is properly flattened, the verification should succeed in seconds.</p>

---

<h3>✅ Done — Interact With Your Verified Contract</h3>

<p>You can now interact with the faucet directly via the explorer’s UI. Try calling <code>claimTo(address)</code> using MetaMask.</p>

<p>Here’s an example verified contract page:  
<a href="https://explorer.testnet.rootstock.io/address/0x9ad8a78833921ebc0bb4eb79c420020d212c8eff?__ctab=Contract%20Interaction" target="_blank">
https://explorer.testnet.rootstock.io/address/0x9ad8a78833921ebc0bb4eb79c420020d212c8eff?__ctab=Contract%20Interaction
</a></p>

<p><strong>Step-by-step to interact:</strong></p>

<ol>
  <li>Go to the <strong>Contract Interaction</strong> tab</li>
  <li>Click on <strong>Write Contract</strong></li>
  <li>Connect your MetaMask wallet by clicking "Connect to Web3"</li>
  <li>Scroll down to the <code>claimTo</code> function</li>
  <li>Enter any recipient address (it can be your own address)</li>
  <li>Click <strong>Write</strong> and confirm the transaction in MetaMask</li>
</ol>

<img width="1239" alt="Screenshot of Write Contract section" src="https://github.com/user-attachments/assets/e0776e4b-931b-4d6f-b572-4dd2ec9a3e75" />

<p><strong>✅ After the transaction confirms:</strong></p>

<ol>
  <li>Go to the <strong>Read Contract</strong> tab</li>
  <li>Find the <code>balanceOf</code> function</li>
  <li>Enter the same address used in <code>claimTo</code></li>
  <li>You should see the result: <strong>100 * 10^18</strong> = 100 ROOT tokens</li>
</ol>

<img width="1234" alt="Screenshot of Read Contract balanceOf" src="https://github.com/user-attachments/assets/cf8f0b72-e1c1-4698-b3cc-7c548b0b7c1e" />

<p>🎉 You’ve successfully verified and interacted with your ERC-20 faucet contract live on Rootstock Testnet!</p>

<h2> Step 10: Interact with RootToken Using Cast (Terminal)</h2>

<p>You can interact with your contract directly from the terminal using <code>cast</code> — a CLI tool from Foundry.</p>

<hr>

<strong>📖 Read: Check Token Balance</strong>

<p>Use the <code>balanceOf</code> function to check how many tokens a wallet holds:</p>

<pre><code>cast call &lt;contract_address&gt; "balanceOf(address)(uint256)" &lt;wallet_address&gt; --rpc-url &lt;rpc_url&gt;</code></pre>

<p><strong>Example:</strong></p>

<pre><code>cast call 0x9Ad8A78833921EBc0bB4eB79C420020D212c8efF \
  "balanceOf(address)(uint256)" \
  0x302fE507615F9fB25Ab842D66015c138DB5F8377 \
  --rpc-url https://public-node.testnet.rsk.co
</code></pre>

<p><strong>Output:</strong></p>

<pre><code>100000000000000000000
# → 100 ROOT (with 18 decimals)
</code></pre>

<hr>

<strong>✍ Write: Claim Tokens Using <code>claimTo</code></strong>

<p>This function writes to the blockchain (requires gas). It allows any user to claim 100 ROOT tokens if their cooldown has expired.</p>

<pre><code>cast send &lt;contract_address&gt; "claimTo(address)" &lt;recipient_address&gt; \
  --rpc-url &lt;rpc_url&gt; \
  --private-key $PRIVATE_KEY \
  --legacy
</code></pre>

<p><strong>Example:</strong></p>

<pre><code>cast send 0x9Ad8A78833921EBc0bB4eB79C420020D212c8efF \
  "claimTo(address)" 0x3e718E2D07D8aee0446E1c1188ed21094712Db57 \
  --rpc-url https://public-node.testnet.rsk.co \
  --private-key $PRIVATE_KEY \
  --legacy
</code></pre>

<p><strong>Output:</strong></p>

<pre><code>transactionHash:      0x87d6207e822d3eef500058d7359fa66b729c045f6061eacc0aa65242dbc7fa0e
blockNumber:          6303222
from:                 0x302fE507615F9fB25Ab842D66015c138DB5F8377
to:                   0x9Ad8A78833921EBc0bB4eB79C420020D212c8efF
gasUsed:              70402
status:               1 (success)
logs:
  Transfer from 0x0 to 0x3e718... for 100 ROOT
</code></pre>

<hr>

<strong>💡 Tips</strong>

<ul>
  <li>You can call any <code>view</code> or <code>pure</code> function (e.g., <code>totalSupply()</code>, <code>cooldown()</code>) using <code>cast call</code>.</li>
  <li>Use <code>cast send</code> for writing to the blockchain (token transfers, claims, etc.).</li>
  <li>Make sure to fund your testnet wallet with tRBTC before calling <code>cast send</code>.</li>
</ul>

<p>✅ This gives you full control to test your contract on Rootstock directly from the command line.</p>

---

## 🌱 Bonus: TapRoot dApp Built on Rootstock

<strong>Live Demo:</strong> <a href="https://rootstock-foundry-example.vercel.app/" target="_blank">https://rootstock-foundry-example.vercel.app/</a>
<strong>Complete github code:</strong> <a href="https://github.com/ishitarastogi/rootstock-fullstack-dapp" target="_blank">https://rootstock-foundry-example.vercel.app/</a>

Built a fullstack dApp on the Rootstock blockchain using the Foundry kit, Solidity, and ReactJS.

### TapRoot: Root Yourself Onchain

**TapRoot 🌱** is a playful, minimalist dApp built on Rootstock that lets users _"root"_ themselves—or their friends—onchain with a single tap.
<img width="1650" alt="Screenshot 2025-04-21 at 5 28 38 PM" src="https://github.com/user-attachments/assets/81227633-278d-4683-9911-d2abc0b4cdd5" />

### How It Works

- Users call the `root()` function via the frontend.
- The smart contract increments:
  - their personal root count (`mapping(address => uint256)`)
  - the global root count (`uint256`)
- It emits a `Rooted` event containing:
  - the user's address
  - their personal total
  - the global total

### Why TapRoot?

It’s a simple, feel-good way to leave your mark **onchain**:  
Root yourself. Root your friends.  
Grow the global counter—together.

<h3> ✅ That’s a Wrap: What You’ve Built </h3>
By the end of this guide, you’ve successfully:
- Set up a modern EVM development environment using Rootstock Foundry Kit
- Created a custom ERC-20 token contract with faucet logic
- Tested it thoroughly using Forge’s powerful test suite
- Deployed the contract to the Rootstock Testnet
- Verified the contract on the Rootstock Explorer
- Interacted with it both via explorer UI and Cast CLI

All of this on Rootstock, an EVM-compatible chain secured by Bitcoin.
