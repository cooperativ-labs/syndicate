import NeedAccount from './ModalNeedAccount';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';

interface WithAuthenticationProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const WithAuthentication: React.FC<WithAuthenticationProps> = ({ children, redirectTo }) => {
  const { data: session, status } = useSession();
  const noSession = status === undefined;
  const sessionLoading = status === 'loading';
  // const {
  //   data,
  //   error,
  //   loading: userLoading,
  // } = useQuery(GET_USER, {
  //   variables: { id: session.user.id },
  // });

  const isLoading = sessionLoading;
  const isNotLoggedIn = !session?.user && !isLoading;

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (isNotLoggedIn && !isLoading) {
      setShowLoginModal(true);
    }
  }, [isNotLoggedIn, isLoading]);

  return (
    <>
      {showLoginModal && <NeedAccount />}
      {!isNotLoggedIn && children}
    </>
  );
};

export default WithAuthentication;
