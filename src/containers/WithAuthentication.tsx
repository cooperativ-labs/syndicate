'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

import LoginModal from './LoginModal';

interface WithAuthenticationProps {
  redirectTo?: string;
  children?: React.ReactNode;
}

const WithAuthentication: React.FC<WithAuthenticationProps> = ({ children }) => {
  const { user, loading } = useSupabaseAuth();

  const isNotLoggedIn = useMemo(() => !user && !loading, [user, loading]);

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (isNotLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [isNotLoggedIn]);

  return (
    <>
      {showLoginModal && <LoginModal />}
      {!isNotLoggedIn && children}
    </>
  );
};

export default WithAuthentication;
