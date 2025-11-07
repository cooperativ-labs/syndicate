import '../styles/tailwind.css';
import '../styles/main.css';

import { Toaster } from '@src/components/ui/sonner';
import { getWagmiConfig } from '@src/web3/wagmi';
import { createClient } from '@supabase/utils/server';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';
import { cookieToInitialState } from 'wagmi';
import { UserProvider } from '@/contexts/UserContext';
import Providers from './providers';
import { getUserProfile } from '@src/utils/actions/userActions';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
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

//Doing this to avoid error where cookiesToInitialState is called with non-json string
const configCookies = (cookies: string) => {
  const allCookies = cookies.split(';');
  const wagmiStore = allCookies.find(cookie => cookie.includes('wagmi.store')) ?? '';
  try {
    const cookieValue = wagmiStore?.split('=')[1];
    if (!cookieValue) return null;
    JSON.parse(cookieValue);
    return wagmiStore;
  } catch (error) {
    console.error('Error parsing wagmi store', error);
    return null;
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const headersObj = await headers();
  const wagmiCookie = configCookies(headersObj.get('cookie') || '');

  const userProfile = user ? await getUserProfile(user.id) : null;

  const config = getWagmiConfig();

  const initialState = config ? cookieToInitialState(config, wagmiCookie) : undefined;

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
