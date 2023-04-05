import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import NeedAccount from './ModalNeedAccount';

interface WithAuthenticationProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const WithAuthentication: React.FC<WithAuthenticationProps> = ({ children, redirectTo }) => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isLoggedIn = !!session?.user;
  const [showLoginModal, setShowLoginModal] = useState(false);

  console.log(session);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setShowLoginModal(true);
    }
  }, [isLoading, isLoggedIn]);

  // if (isLoading || !isLoggedIn) {
  //   console.log('loading', isLoading, 'isLoggedIn', isLoggedIn);
  //   return null;
  // }

  return (
    <>
      {showLoginModal && <NeedAccount />}
      {isLoggedIn && children}
    </>
  );
};

export default WithAuthentication;
