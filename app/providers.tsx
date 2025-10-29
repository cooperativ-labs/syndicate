"use client";

import CookieBanner from '@src/CookieBanner';
import SetCookieContext from '@src/SetCookieContext';
import supabaseApolloClient from '@src/utils/supabaseApolloClient';
import { wagmiConfig } from '@src/web3/connectors';
import { ApolloProvider } from '@apollo/react-ssr';
import { StateProvider } from '@context/store';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig } from 'wagmi';

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

  return (
    <ApolloProvider client={supabaseApolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <Toaster />
        <StateProvider>{cookiesApproved === 'approved' ? withCookies : withoutCookies}</StateProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
};

export default Providers;

