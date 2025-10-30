'use client';

import CookieBanner from '@src/CookieBanner';
import SetCookieContext from '@src/SetCookieContext';
import { config as wagmiConfig } from '@src/web3/wagmi';
import { StateProvider } from '@context/store';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { WagmiProvider } from 'wagmi';
import { SupabaseAuthProvider } from '@context/SupabaseAuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloWrapper } from './ApolloWrapper';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [cookiesApproved, setCookiesApproved] = useState<string | null>(null);

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

  const [queryClient] = useState(() => new QueryClient()); // This is required for Wagmi

  return (
    <SupabaseAuthProvider>
      <ApolloWrapper>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <StateProvider>
              {cookiesApproved === 'approved' ? withCookies : withoutCookies}
            </StateProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ApolloWrapper>
    </SupabaseAuthProvider>
  );
};

export default Providers;
