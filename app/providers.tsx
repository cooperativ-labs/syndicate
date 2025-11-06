'use client';

import SetCookieContext from '@contexts/SetCookieContext';
import CookieBanner from '@src/CookieBanner';
import { getWagmiConfig } from '@src/web3/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { State, WagmiProvider } from 'wagmi';

import { StateProvider } from '@/contexts/store';

import WalletContextProvider from '@contexts/WalletContext';
import { WalletChooserModal } from '@src/containers/wallet/WalletChooserModel';

type ProvidersProps = {
  children: React.ReactNode;
  initialState: State | undefined;
};

const Providers: React.FC<ProvidersProps> = ({ children, initialState }) => {
  const [cookiesApproved, setCookiesApproved] = useState<string | null>(null);
  const [config] = useState(() => getWagmiConfig());
  const [queryClient] = useState(() => new QueryClient()); // This is required for Wagmi

  useEffect(() => {
    const result = window.localStorage?.getItem('COOKIE_APPROVED');
    setCookiesApproved(result);
  }, []);

  const withCookies = (
    <SetCookieContext>
      <div id="outer-container" className="bg-gray-100 flex flex-col">
        <main id="page-wrap flex-grow h-full">{children}</main>
      </div>
    </SetCookieContext>
  );

  const withoutCookies = (
    <div id="outer-container" className="bg-gray-100 flex flex-col">
      <main id="page-wrap flex-grow h-full">
        {children}
        <CookieBanner />
      </main>
    </div>
  );

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <WalletContextProvider>
          <StateProvider>
            {cookiesApproved === 'approved' ? withCookies : withoutCookies}
            <WalletChooserModal />
          </StateProvider>
        </WalletContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
