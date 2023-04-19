import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';

const SignOut: React.FC = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    disconnect();
    signOut({ callbackUrl: '/' })
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        throw new Error('Error signing out:', error);
      });
  }, [router, disconnect]);

  return (
    <div>
      <h1>Signing out...</h1>
    </div>
  );
};

export default SignOut;
