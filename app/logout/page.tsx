"use client";

import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDisconnect } from 'wagmi';

const SignOut = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
    signOut({ callbackUrl: '/' })
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        throw new Error(`Error signing out: ${error}`);
      });
  }, [router, disconnect]);

  return (
    <div>
      <h1>Signing out...</h1>
    </div>
  );
};

export default SignOut;

