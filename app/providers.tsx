'use client';

import AnalyticsContextProvider from '@contexts/AnalyticsContext';
import WalletContextProvider from '@contexts/WalletContext';
import { getWagmiConfig } from '@src/web3/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { State, WagmiProvider } from 'wagmi';

import { StateProvider } from '@/contexts/store';

type ProvidersProps = {
  children: React.ReactNode;
  initialState: State | undefined;
  analyticsCookies: string | undefined;
};

const Providers: React.FC<ProvidersProps> = ({ children, initialState, analyticsCookies }) => {
  const [config] = useState(() => getWagmiConfig());
  const [queryClient] = useState(() => new QueryClient()); // This is required for Wagmi

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <WalletContextProvider>
          <StateProvider>
            <AnalyticsContextProvider analyticsCookies={analyticsCookies}>
              {children}
            </AnalyticsContextProvider>
          </StateProvider>
        </WalletContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
