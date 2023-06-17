import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

const getEndpoint = () => {
  if (process.env.NEXT_PUBLIC_DEPLOY_STAGE === 'production' || process.env.NEXT_PUBLIC_DEPLOY_STAGE === 'staging') {
    return process.env.NEXT_PUBLIC_DGRAPH_ENDPOINT;
  } else {
    return process.env.NEXT_PUBLIC_DGRAPH_ENDPOINT_UNSECURED;
  }
};

const publichttpLink = createHttpLink({
  uri: getEndpoint(),
  credentials: 'same-origin',
});

const publicApolloClient = new ApolloClient({
  link: publichttpLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

export function initializeApollo(initialState = null) {
  let apolloClient;

  const _apolloClient = apolloClient ?? publicApolloClient;

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

// export function useApollo(initialState) {
//   const store = useMemo(() => initializeApollo(initialState), [initialState]);
//   return store;
// }

export default initializeApollo;
