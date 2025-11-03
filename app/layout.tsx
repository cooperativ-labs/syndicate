import '../styles/tailwind.css';
import '../styles/main.css';

import { createServerApolloClient } from '@src/lib/apolloServer';
import { GET_USER_PROFILE } from '@src/utils/graphQueries/user';
import { getWagmiConfig } from '@src/web3/wagmi';
import { createClient } from '@supabase/utils/server';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import React from 'react';
import { cookieToInitialState } from 'wagmi';
import { Toaster } from '@src/components/ui/sonner';

import { UserProvider } from '@/contexts/UserContext';

import Providers from './providers';
export const metadata: Metadata = {
  title: 'Cooperativ',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/site-icon.png']
  },
  manifest: '/site.webmanifest'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const config = getWagmiConfig() || { chains: [], connectors: [] };

  const initialState = cookieToInitialState(config, (await headers()).get('cookie'));

  let userProfile: any = null;
  if (user?.id) {
    const apollo = await createServerApolloClient();
    const { data } = await apollo.query<any>({
      query: GET_USER_PROFILE,
      variables: { id: user.id },
      fetchPolicy: 'no-cache'
    });
    userProfile = data?.profileCollection?.edges?.[0]?.node ?? null;
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="/dist/output.css" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Ubuntu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserProvider userProfile={userProfile} user={user}>
          <Providers initialState={initialState}>
            {children} <Toaster />
          </Providers>
        </UserProvider>
        {/* <Script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        /> */}
      </body>
    </html>
  );
}
