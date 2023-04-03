import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { auth } from 'firebaseConfig/firebaseConfig';
import { setContext } from '@apollo/client/link/context';
import { setHeaders } from './utils/apolloClient';

declare let window: any;

export const UserAccountContext = React.createContext<{
  uuid: string | undefined;
  name: string | undefined;
  email: string | undefined;
  photo: string | undefined;
}>({
  uuid: undefined,
  name: undefined,
  email: undefined,
  photo: undefined,
});

type SetAppContextProps = {
  children: React.ReactNode;
};

const SetAppContext: React.FC<SetAppContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setUserLoading(false);
      return;
    });
  }, [currentUser]);

  if (userLoading) {
    return <></>;
  }

  const getToken = async (): Promise<any> => {
    if (currentUser) {
      const token = await currentUser.getIdToken(true);
      return token;
    }
    return Promise.resolve();
  };

  const asyncMiddleware = setContext((_, { headers }) => getToken().then((token) => setHeaders(headers, token)));

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
  });

  const createApolloClient = new ApolloClient({
    link: asyncMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
  });

  return (
    <ApolloProvider client={createApolloClient}>
      <UserAccountContext.Provider
        value={{
          uuid: currentUser?.uid,
          name: currentUser?.displayName,
          email: currentUser?.email,
          photo: currentUser?.photoURL,
        }}
      >
        {children}{' '}
      </UserAccountContext.Provider>
    </ApolloProvider>
  );
};

export default SetAppContext;
