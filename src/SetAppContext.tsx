import LoadingModal from './components/loading/ModalLoading';
import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { GET_USERS } from './utils/dGraphQueries/user';
import { setContext } from '@apollo/client/link/context';
import { useSession } from 'next-auth/react';

declare let window: any;

type SetAppContextProps = {
  children: React.ReactNode;
};

const SetAppContext: React.FC<SetAppContextProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [apolloClient, setApolloClient] = useState<ApolloClient<any> | null>(null);

  const token = session?.encodedJwt;
  const key = process.env.NEXT_PUBLIC_DGRAPH_HEADER_KEY;

  useEffect(() => {
    const setHeaders = (headers: string[], token: string | undefined) => {
      if (process.env.NEXT_PUBLIC_DEPLOY_STAGE === 'production' || process.env.NEXT_PUBLIC_DEPLOY_STAGE === 'staging') {
        return {
          headers: {
            ...headers,
            'Db-Auth-Token': token ? `bearer ${token}` : '',
            'DG-Auth': key,
          },
        };
      } else {
        return {
          headers: {
            ...headers,
            'Db-Auth-Token': token ? `bearer ${token}` : '',
          },
        };
      }
    };
    if (status !== 'loading') {
      const asyncMiddleware = setContext((_, { headers }) => setHeaders(headers, token));
      const httpLink = createHttpLink({
        //from next.config.js, not env
        uri: process.env.NEXT_PUBLIC_DGRAPH_ENDPOINT,
        credentials: 'same-origin',
      });

      const createApolloClient = new ApolloClient({
        link: asyncMiddleware.concat(httpLink),
        cache: new InMemoryCache(),
        ssrMode: typeof window === 'undefined',
      });

      setApolloClient(createApolloClient);
    }
  }, [status, token, key]);

  if (status === 'loading' || !apolloClient) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default SetAppContext;
