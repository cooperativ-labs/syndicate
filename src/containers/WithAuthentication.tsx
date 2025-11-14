'use client';

import { useUserContext } from '@contexts/UserContext';
import React, { useEffect, useMemo, useState } from 'react';

import LoginModal from './LoginModal';

interface WithAuthenticationProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const WithAuthentication: React.FC<WithAuthenticationProps> = ({ children }) => {
  const { user } = useUserContext();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [user]);

  return (
    <>
      {showLoginModal && <LoginModal />}
      {user && children}
    </>
  );
};

export default WithAuthentication;
