import 'server-only';

import { HttpLink } from '@apollo/client';
import { ApolloClient, registerApolloClient } from '@apollo/client-integration-nextjs';

import { createApolloCache, getGraphQLEndpoint } from './apolloConfig';

type SupabaseServerClient = Awaited<
  ReturnType<typeof import('@supabase/utils/server')['createClient']>
>;

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  let supabaseClientPromise: Promise<SupabaseServerClient> | null = null;

  const getSupabaseClient = async () => {
    if (!supabaseClientPromise) {
      supabaseClientPromise = import('@supabase/utils/server').then(({ createClient }) => createClient());
    }

    return supabaseClientPromise;
  };

  const httpLink = new HttpLink({
    uri: getGraphQLEndpoint(),
    fetch: async (uri, options) => {
      const supabase = await getSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      return fetch(uri, {
        ...options,
        headers: {
          ...options?.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '',
        },
      });
    },
  });

  return new ApolloClient({
    cache: createApolloCache(),
    link: httpLink,
  });
});

export const initializeApollo = () => getClient();
