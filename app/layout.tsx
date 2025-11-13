import '../styles/tailwind.css';
import '../styles/main.css';

import { Toaster } from '@src/components/ui/sonner';
import { getUserProfile } from '@src/utils/actions/userActions';
import { getWagmiConfig } from '@src/web3/wagmi';
import { createClient } from '@supabase/utils/server';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';
import { cookieToInitialState } from 'wagmi';
import { UserProvider } from '@/contexts/UserContext';
import Providers from './providers';
import { OrganizationsProvider } from '@contexts/OrganizationsContext';
import { getOrgsFromUser } from '@src/utils/actions/organizationActions';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const wagmiState = cookieStore.get('wagmi.store')?.value;
  const savedOrganizationId = cookieStore.get('CHOSEN_ORGANIZATION')?.value;
  const analyticsApproved = cookieStore.get('COOKIE_APPROVED')?.value;

  const userProfile = user ? await getUserProfile(user.id) : null;
  const organizations = await getOrgsFromUser();
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
              {children} <Toaster />
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
