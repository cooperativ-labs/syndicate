import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignOut: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    signOut({ callbackUrl: '/' })
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }, [router]);

  return (
    <div>
      <h1>Signing out...</h1>
    </div>
  );
};

export default SignOut;
