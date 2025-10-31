'use client';

import { useUserContext } from '@contexts/UserContext';
import React, { useEffect, useMemo, useState } from 'react';

import LoginModal from './LoginModal';

interface WithAuthenticationProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const WithAuthentication: React.FC<WithAuthenticationProps> = ({ children }) => {
  const { userId } = useUserContext();

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!userId) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [userId]);

  return (
    <>
      {showLoginModal && <LoginModal />}
      {userId && children}
    </>
  );
};

export default WithAuthentication;
