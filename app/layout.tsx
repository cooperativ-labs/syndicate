import '../styles/tailwind.css';
import '../styles/main.css';

import ErrorBoundary from '@src/components/ErrorBoundary';
import { cn } from '@src/lib/utils';
import { getWagmiConfig } from '@src/web3/wagmi';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';
import { cookieToInitialState } from 'wagmi';

import ModalsAndAlerts from './modals';
import Providers from './providers';
import { conditionalMetadata } from './metadata';

export const metadata: Metadata = conditionalMetadata;

const BackgroundGradient = 'bg-white';
// const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
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
