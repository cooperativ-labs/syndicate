'use client';

import { signOut } from '@src/utils/actions/userActions';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDisconnect } from 'wagmi';

const SignOut = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
    signOut();
    router.replace('/');
  }, [router, disconnect]);

  return (
    <div>
      <h1>Signing out...</h1>
    </div>
  );
};

export default SignOut;
