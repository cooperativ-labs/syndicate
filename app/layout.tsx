import '../styles/tailwind.css';
import '../styles/main.css';

import ErrorBoundary from '@src/components/ErrorBoundary';
import { cn } from '@src/lib/utils';
import { getWagmiConfig } from '@src/web3/wagmi';
import { createClient } from '@supabase/utils/server';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';
import React from 'react';
import { cookieToInitialState } from 'wagmi';

import ModalsAndAlerts from './modals';
import Providers from './providers';

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

const BackgroundGradient = 'bg-white';
// const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const wagmiState = cookieStore.get('wagmi.store')?.value;

  const analyticsApproved = cookieStore.get('user.analytics-approved')?.value;

  const config = getWagmiConfig();

  const initialState = config ? cookieToInitialState(config, wagmiState) : undefined;

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='/dist/output.css' rel='stylesheet' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter&family=Ubuntu:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <Providers initialState={initialState} analyticsCookies={analyticsApproved}>
          <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
            <ErrorBoundary>
              <>
                {children}
                <ModalsAndAlerts />
              </>
            </ErrorBoundary>
          </div>
        </Providers>

        {/* <Script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`}
          strategy='afterInteractive'
        /> */}
      </body>
    </html>
  );
}
