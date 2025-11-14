import '../styles/tailwind.css';
import '../styles/main.css';

import { OrganizationsProvider } from '@contexts/OrganizationsContext';
import ErrorBoundary from '@src/components/ErrorBoundary';
import Manager from '@src/containers/Manager';
import ManagerSideBar from '@src/containers/sideBar/ManagerSideBar';
import { cn } from '@src/lib/utils';
import { getOrgsFromUser } from '@src/utils/actions/organizationActions';
import { getUserProfile } from '@src/utils/actions/userActions';
import { getWagmiConfig } from '@src/web3/wagmi';
import { createClient } from '@supabase/utils/server';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import React, { cache } from 'react';
import { cookieToInitialState } from 'wagmi';

import { UserProvider } from '@/contexts/UserContext';

import ModalsAndAlerts from './modals';
import Providers from './providers';

const getCachedUserProfile = cache(async (userId: string) => {
  return await getUserProfile(userId);
});

const getCachedOrgsFromUser = cache(async () => {
  return await getOrgsFromUser();
});

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
  const savedOrganizationId = cookieStore.get('CHOSEN_ORGANIZATION')?.value;
  const analyticsApproved = cookieStore.get('user.analytics-approved')?.value;

  const userProfile = user ? await getCachedUserProfile(user.id) : null;
  const organizations = await getCachedOrgsFromUser();
  const config = getWagmiConfig();

  const initialState = config ? cookieToInitialState(config, wagmiState) : undefined;

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
          <OrganizationsProvider
            organizations={organizations}
            savedOrganizationId={savedOrganizationId || null}
          >
            <Providers initialState={initialState} analyticsCookies={analyticsApproved}>
              <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
                <ErrorBoundary>
                  <div className="flex">
                    {user?.id && (
                      <div className="flex z-30 md:z-10 min-h-screen">
                        {/* <ManagerSideBar />{' '} */}
                      </div>
                    )}
                    <Manager>{children}</Manager>
                  </div>
                  <ModalsAndAlerts />
                </ErrorBoundary>
              </div>
            </Providers>
          </OrganizationsProvider>
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
