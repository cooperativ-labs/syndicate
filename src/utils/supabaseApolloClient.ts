import { ApolloClient, defaultDataIdFromObject, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { relayStylePagination } from '@apollo/client/utilities';
import { createClient } from '../../supabase/utils/client';

const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    if ('nodeId' in responseObject) {
      return `${responseObject.nodeId}`;
    }
    return defaultDataIdFromObject(responseObject);
  },
  possibleTypes: { Node: [] }, // Add your types here as you define them
  typePolicies: {
    Query: {
      fields: {
        // Add pagination for your collections here
        // Example: todosCollection: relayStylePagination(),
        node: {
          read(_, { args, toReference }) {
            const ref = toReference({
              nodeId: args?.nodeId
            });
            return ref;
          }
        }
      }
    }
  }
});

const getGraphQLEndpoint = () => {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`;
  }
  return 'http://localhost:54321/graphql/v1';
};

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
        Authorization: token ? `Bearer ${token}` : '',
        apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
      }
    });
  }
});

const supabaseApolloClient = new ApolloClient({
  link: httpLink,
  cache,
  ssrMode: typeof window === 'undefined'
});

export function initializeApollo(initialState = null) {
  let apolloClient;

  const _apolloClient = apolloClient ?? supabaseApolloClient;

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    //@ts-ignore
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export default supabaseApolloClient;
