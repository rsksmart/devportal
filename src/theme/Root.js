import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { wagmiAdapter, appKitConfig } from '@site/src/config/reown';

if (ExecutionEnvironment.canUseDOM && !window.__appKitInitialized) {
  createAppKit(appKitConfig);
  window.__appKitInitialized = true;
}

const queryClient = new QueryClient();

export default function Root({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
