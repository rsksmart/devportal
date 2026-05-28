import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { defineChain } from '@reown/appkit/networks';

export const projectId = 'ed3688f7bd05f1a25b8af0c5d697ddeb';

export const rootstockMainnet = defineChain({
  id: 30,
  caipNetworkId: 'eip155:30',
  chainNamespace: 'eip155',
  name: 'Rootstock Mainnet',
  nativeCurrency: { name: 'RBTC', symbol: 'RBTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://public-node.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'Rootstock Explorer', url: 'https://explorer.rootstock.io' },
  },
});

export const rootstockTestnet = defineChain({
  id: 31,
  caipNetworkId: 'eip155:31',
  chainNamespace: 'eip155',
  name: 'Rootstock Testnet',
  nativeCurrency: { name: 'tRBTC', symbol: 'tRBTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'Rootstock Testnet Explorer', url: 'https://explorer.testnet.rootstock.io' },
  },
  testnet: true,
});

export const networks = [rootstockMainnet, rootstockTestnet];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

export const appKitConfig = {
  adapters: [wagmiAdapter],
  networks,
  projectId,
  defaultNetwork: rootstockTestnet,
  metadata: {
    name: 'Rootstock Developer Portal',
    description: 'Build on Bitcoin with Rootstock',
    url: 'https://dev.rootstock.io',
    icons: ['https://dev.rootstock.io/img/logo.svg'],
  },
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook'],
    emailShowWallets: true,
  },  
  includeWalletIds: [    
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // Metamask
    '18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1', // Rabby
    '0b415a746fb9ee99cce155c2ceca0c6f6061b1dbca2d722b3ba16381d0562150', // SafePal
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662', // Bitget
    '9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a', // SubWallet
    '0cb0c532b518aa842786d5167e13df22046bc9301b6677808d7134c3d7366a9d', // WigWam
    'fb6ed96272ec885008e896c6146002048d8dc88c0b7e0e6fa42bcadf052a1569', // Enkrypt    
  ],
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FF9100',
    '--w3m-border-radius-master': '4px',
  },
};
