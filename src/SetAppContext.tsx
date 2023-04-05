import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useSession } from 'next-auth/react';
import { GET_USERS } from './utils/dGraphQueries/user';

declare let window: any;

type SetAppContextProps = {
  children: React.ReactNode;
};

const SetAppContext: React.FC<SetAppContextProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [apolloClient, setApolloClient] = useState<ApolloClient<any> | null>(null);

  const token = session?.encodedJwt;
  const productionKey = process.env.NEXT_PUBLIC_DGRAPH_HEADER_KEY;
  const stagingKey = process.env.NEXT_PUBLIC_STAGING_DGRAPH_HEADER_KEY;

  const setHeaders = (headers, token) => {
    switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
      case 'production':
        return {
          headers: {
            ...headers,
            'X-Auth-Token': token ? `bearer ${token}` : '',
            'DG-Auth': productionKey,
          },
        };
      case 'staging':
        return {
          headers: {
            ...headers,
            'X-Auth-Token': token ? `bearer ${token}` : '',
            'DG-Auth': stagingKey,
          },
        };
      default:
        return {
          headers: {
            ...headers,
            'X-Auth-Token': token ? `bearer ${token}` : '',
          },
        };
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      const asyncMiddleware = setContext((_, { headers }) => setHeaders(headers, token));
      const httpLink = createHttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        credentials: 'same-origin',
      });

      const createApolloClient = new ApolloClient({
        link: asyncMiddleware.concat(httpLink),
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
      });

      //========================
      // createApolloClient
      //   .query({
      //     query: gql`
      //       query {
      //         queryUser {
      //           id
      //           name
      //         }
      //       }
      //     `,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
      //===================

      setApolloClient(createApolloClient);
    }
  }, [status, token]);

  if (status === 'loading' || !apolloClient) {
    return <div>loading...</div>;
  }

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default SetAppContext;
