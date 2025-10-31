import { ApolloClient, HttpLink } from "@apollo/client";
import { InMemoryCache, SSRMultipartLink } from "@apollo/client-integration-nextjs";
import { getGraphQLEndpoint } from "@src/utils/apolloConfig";

type CreateServerApolloClientOptions = {
  accessToken?: string | null;
};

export function createServerApolloClient(options: CreateServerApolloClientOptions = {}) {
  const { accessToken } = options;

  const httpLink = new HttpLink({
    uri: getGraphQLEndpoint(),
    fetch: (uri, init) =>
      fetch(uri, {
        ...init,
        headers: {
          ...init?.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
        }
      })
  });

  const link = new SSRMultipartLink({ stripDefer: true }).concat(httpLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
}
