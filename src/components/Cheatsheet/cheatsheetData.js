import evmCompatibility from '@site/data/evm-compatibility-summary.json';

const {recommended, explorerUrl, requirementsPath, sourceRepoUrl} = evmCompatibility;

export const EVM_COMPILER = {
  solidityVersion: recommended.solidityVersion,
  solidityVersionDisplay: recommended.solidityVersionDisplay,
  evmVersion: recommended.evmVersion,
  evmVersionDisplay: recommended.evmVersionDisplay,
  explorerUrl,
  requirementsPath,
  sourceRepoUrl,
  rskjVersion: recommended.rskjVersion,
};

export const NETWORKS = {
  testnet: {
    label: 'Testnet',
    name: 'Rootstock Testnet',
    rpcUrl: 'https://public-node.testnet.rsk.co',
    chainId: '31',
    chainIdHex: '0x1f',
    symbol: 'tRBTC',
    explorer: 'https://explorer.testnet.rootstock.io',
    nativeCurrency: {
      name: 'Testnet Rootstock',
      symbol: 'tRBTC',
      decimals: 18,
    },
  },
  mainnet: {
    label: 'Mainnet',
    name: 'Rootstock Mainnet',
    rpcUrl: 'https://public-node.rsk.co',
    chainId: '30',
    chainIdHex: '0x1e',
    symbol: 'rBTC',
    explorer: 'https://explorer.rootstock.io',
    nativeCurrency: {
      name: 'Rootstock',
      symbol: 'rBTC',
      decimals: 18,
    },
  },
};

export const REFERENCE_GUIDES = [
  {
    label: 'MetaMask setup',
    href: '/dev-tools/wallets/metamask/',
    internal: true,
  },
  {
    label: 'RPC API setup',
    href: '/developers/rpc-api/rootstock/setup/',
    internal: true,
  },
];

export const START_HERE_STEPS = [
  {
    step: '1',
    label: 'Add Rootstock Testnet to your wallet',
    hint: 'Use MetaMask or the Rootstock Explorer add-network flow below.',
  },
  {
    step: '2',
    label: 'Get testnet tRBTC',
    href: 'https://faucet.rootstock.io',
    hint: 'faucet.rootstock.io. Event promo codes are posted on the faucet site.',
  },
  {
    step: '3',
    label: 'Deploy your first contract',
    links: [
      {
        label: 'Remix quickstart',
        href: '/developers/quickstart/remix/',
        internal: true,
      },
      {
        label: 'Hardhat quickstart',
        href: '/developers/quickstart/hardhat/',
        internal: true,
      },
    ],
    hint: 'Pick Remix for browser-only setup or Hardhat for a local project.',
  },
];

export const EXPLORER_NETWORK_LINKS = [
  {
    label: 'Add via Explorer (Testnet)',
    href: 'https://explorer.testnet.rootstock.io',
  },
  {
    label: 'Add via Explorer (Mainnet)',
    href: 'https://explorer.rootstock.io',
  },
  {
    label: 'Add-network guide',
    href: '/dev-tools/explorers/rootstock-explorer/add-rootstock-network-to-metamask/',
    internal: true,
  },
];

export const STARTER_KITS = [
  {
    title: 'Wagmi Starter Kit',
    description: 'React Hooks for EVM. TypeScript-first.',
    href: 'https://github.com/rsksmart/rsk-wagmi-starter-kit',
  },
  {
    title: 'Foundry Starter Kit',
    description: 'Fast Solidity testing with Forge.',
    href: 'https://github.com/rsksmart/rootstock-foundry-starterkit',
  },
  {
    title: 'Hardhat Starter Kit',
    description: 'JS/TypeScript with plugins and tasks.',
    href: 'https://github.com/rsksmart/rootstock-hardhat-starterkit',
  },
  {
    title: 'Quickstart hub',
    description: 'All starter kits and deploy guides.',
    href: '/developers/quickstart/',
    internal: true,
  },
];

export const VERIFY_LINKS = [
  {
    title: 'Testnet Explorer',
    description: 'Browse blocks, addresses, and transactions on testnet.',
    href: 'https://explorer.testnet.rootstock.io',
    external: true,
  },
  {
    title: 'Verify smart contracts',
    description: 'Hardhat verify plugin and explorer submission guide.',
    href: '/developers/smart-contracts/hardhat/verify-smart-contracts/',
    internal: true,
  },
  {
    title: 'Deploy and verify with Remix',
    description: 'Write, compile, deploy, and verify in Remix IDE.',
    href: '/developers/quickstart/remix/',
    internal: true,
  },
];

export const AI_TOOLS = [
  {
    title: 'MCP Server',
    description: 'Connect your AI agent to Rootstock via MCP.',
    links: [
      { label: 'Quickstart', href: '/developers/quickstart/mcp/', internal: true },
      { label: 'GitHub', href: 'https://github.com/rsksmart/rsk-mcp-server' },
      { label: 'NPM', href: 'https://www.npmjs.com/package/@rsksmart/rsk-mcp-server' },
    ],
    snippet: `{
  "mcpServers": {
    "rootstock": {
      "command": "npx",
      "args": ["-y", "@rsksmart/rsk-mcp-server"]
    }
  }
}`,
  },
  {
    title: 'Rootstock Skills',
    description: 'Install agent skills for Claude Code and Cursor.',
    links: [
      { label: 'GitHub', href: 'https://github.com/rootstock/skills' },
    ],
    snippet: 'npx skills add rootstock/skills',
  },
  {
    title: 'Rootstock AI Assistant',
    description:
      'In-docs AI assistant trained on Rootstock documentation. Open it with the Ask Rootstock AI button in the portal.',
    links: [
      {
        label: 'Open docs (Ask Rootstock AI)',
        href: '/',
        internal: true,
      },
    ],
  },
];

export const INSTITUTIONAL = [
  {
    product: 'Atlas Bridge',
    description: 'Permissionless Bitcoin bridge to Rootstock',
    href: '/resources/guides/atlas/',
    internal: true,
  },
  {
    product: 'PowPeg',
    description: 'Two-way Bitcoin peg secured by merged mining',
    href: '/concepts/powpeg/',
    internal: true,
  },
];

export const SUPPORT_LINKS = [
  { label: 'Developer Docs', href: 'https://dev.rootstock.io' },
  { label: 'Discord', href: 'https://rootstock.io/discord' },
  { label: 'GitHub', href: 'https://github.com/rsksmart' },
  { label: 'Support', href: 'https://support.rootstock.io' },
];

export const QUICK_REFERENCE = [
  { param: 'Chain ID', testnet: '31', mainnet: '30' },
  {
    param: 'RPC URL',
    testnet: 'https://public-node.testnet.rsk.co',
    mainnet: 'https://public-node.rsk.co',
  },
  { param: 'Currency', testnet: 'tRBTC', mainnet: 'rBTC' },
  {
    param: 'Explorer',
    testnet: 'https://explorer.testnet.rootstock.io',
    mainnet: 'https://explorer.rootstock.io',
  },
  { param: 'Faucet', testnet: 'https://faucet.rootstock.io', mainnet: 'N/A' },
  {
    param: 'RPC Service',
    testnet: 'https://rpc.rootstock.io',
    mainnet: 'https://rpc.rootstock.io',
  },
  {
    param: 'Solidity',
    testnet: recommended.solidityVersionDisplay,
    mainnet: recommended.solidityVersionDisplay,
  },
  {
    param: 'EVM',
    testnet: recommended.evmVersionDisplay,
    mainnet: recommended.evmVersionDisplay,
  },
];
