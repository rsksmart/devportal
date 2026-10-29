import React, {useEffect} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/** Shared Rootstock network params for MetaMask add/switch (EIP-3085 / EIP-3326). */
export const ROOTSTOCK_NETWORK_PARAMS = {
  mainnet: {
    chainId: '0x1E',
    chainName: 'Rootstock Mainnet',
    rpcUrls: ['https://public-node.rsk.co'],
    blockExplorerUrls: ['https://explorer.rootstock.io/'],
    nativeCurrency: {
      name: 'Rootstock',
      symbol: 'RBTC',
      decimals: 18,
    },
  },
  testnet: {
    chainId: '0x1F',
    chainName: 'Rootstock Testnet',
    rpcUrls: ['https://public-node.testnet.rsk.co'],
    blockExplorerUrls: ['https://explorer.testnet.rootstock.io/'],
    nativeCurrency: {
      name: 'Testnet Rootstock',
      symbol: 'tRBTC',
      decimals: 18,
    },
  },
};

/**
 * Switch to a Rootstock network, or add it first if MetaMask does not have it yet.
 * @param {'mainnet' | 'testnet'} networkKey
 */
export async function addRootstockNetwork(networkKey) {
  if (typeof window === 'undefined' || !window.ethereum) {
    window.alert(
      'MetaMask is not installed. Please install MetaMask to use this feature.',
    );
    return;
  }

  const networkParams = ROOTSTOCK_NETWORK_PARAMS[networkKey];
  if (!networkParams) {
    throw new Error(`Unknown Rootstock network: ${networkKey}`);
  }

  try {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    if (currentChainId === networkParams.chainId.toLowerCase()) {
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: networkParams.chainId}],
      });
    } catch (switchError) {
      // 4902: chain has not been added to MetaMask yet
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkParams],
        });
      } else {
        throw switchError;
      }
    }
  } catch (error) {
    console.error(`Error adding ${networkParams.chainName} network:`, error);
    window.alert(`Failed to add ${networkParams.chainName}: ${error.message}`);
  }
}

function AddNetworkButtons() {
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    function waitForButton() {
      const mainnetButton = document.getElementById('add-network-button-mainnet');
      const testnetButton = document.getElementById('add-network-button-testnet');

      if (mainnetButton && testnetButton) {
        mainnetButton.addEventListener('click', async () => {
          await addRootstockNetwork('mainnet');
        });

        testnetButton.addEventListener('click', async () => {
          await addRootstockNetwork('testnet');
        });
      } else if (retryCount < maxRetries) {
        console.log('Buttons not found yet, retrying...');
        retryCount++;
        setTimeout(waitForButton, 500);
      } else {
        console.error('Buttons not found after maximum retries.');
      }
    }

    waitForButton();
  }, []);

  return null;
}

export default function WrappedAddNetworkButtons() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <AddNetworkButtons />}
    </BrowserOnly>
  );
}
