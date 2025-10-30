'use client';

import { HttpLink } from '@apollo/client';
import { ApolloClient, ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { createApolloCache, getGraphQLEndpoint } from '@src/utils/apolloConfig';
import { createClient } from '@supabase/utils/client';
import type { ReactNode } from 'react';

function makeClient() {
  const supabase = createClient();

  const httpLink = new HttpLink({
    uri: getGraphQLEndpoint(),
    fetch: async (uri, options) => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      return fetch(uri, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''
        }
      });
    }
  });

  return new ApolloClient({
    cache: createApolloCache(),
    link: httpLink
  });
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
