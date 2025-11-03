import { ApolloClient, HttpLink } from "@apollo/client";
import {
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/client-integration-nextjs";
import { getGraphQLEndpoint } from "@src/utils/apolloConfig";
import { createClient } from "@supabase/utils/server";

export async function createServerApolloClient() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token ?? null;

  const httpLink = new HttpLink({
    uri: getGraphQLEndpoint(),
    fetch: (uri, init) =>
      fetch(uri, {
        ...init,
        headers: {
          ...init?.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
        },
      }),
  });

  const link = new SSRMultipartLink({ stripDefer: true }).concat(httpLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}
