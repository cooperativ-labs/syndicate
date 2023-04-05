import EmailPasswordForm from './CreateEmailPasswordAccountForm';
import LogInWithEmailForm from './LogInWithEmail';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { ADD_USER_WITH_EMAIL } from '@src/utils/dGraphQueries/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/free-brands-svg-icons';
import { useMutation } from '@apollo/client';
import { signIn } from 'next-auth/react';

export const loginButtonClass =
  'flex my-5 items-center rounded-full bg-slate-50 border-2 border-cDarkBlue justify-center p-3 text-slate-700 font-bold w-full';

type SSOButtonProps = {
  icon: string;
  iconPrefix: IconPrefix;
  text: ReactNode;
  onClick: () => void;
};
const SSOButton: FC<SSOButtonProps> = ({ onClick, iconPrefix, icon, text }) => {
  return (
    <button className={loginButtonClass} onClick={() => onClick()}>
      <FontAwesomeIcon icon={[iconPrefix, icon as IconName]} className="text-lg text-slate-700 mr-2" /> {text}
    </button>
  );
};

const CreateAccount: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInterface, setLoginInterface] = useState<'social' | 'email' | 'magic'>('social');
  const [addUserWithEmail, { error: errorEmail }] = useMutation(ADD_USER_WITH_EMAIL);
  const [tried, setTried] = useState(false);

  if (errorEmail && !tried) {
    const error = errorEmail;
    alert(`Oops. Looks like something went wrong: ${error.message} (createAccount.tsx)`);
    setTried(true);
  }

  //===========================================================================

  const handleGoogleLogin = async () => {
    setLoading(true);
    signIn('google');
  };

  return (
    <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
      {(loginInterface === 'email' || loginInterface === 'magic') && (
        <button className="text-xs text-slate-600 font-bold uppercase" onClick={() => setLoginInterface('social')}>
          <FontAwesomeIcon icon="chevron-left" /> Other login options
        </button>
      )}
      {loading ? (
        <div className="flex justify-center items-center ">
          <img
            src="/assets/images/loading-circle.jpeg"
            aria-label="loading"
            className="h-6 mr-1 animate-spin bg-white rounded-full"
          />
          <span>Loading your account</span>
        </div>
      ) : (
        <div className="mt-5">
          {loginInterface === 'social' && (
            <>
              <SSOButton onClick={handleGoogleLogin} iconPrefix="fab" icon="google" text="Sign in with Google" />
              {/* <SSOButton onClick={handleTwitterLogin} iconPrefix="fab" icon="twitter" text="Sign in with Twitter" /> */}
              {/* <SSOButton
                onClick={() => setLoginInterface('email')}
                iconPrefix="fas"
                icon="envelope"
                text="Sign in with email address "
              /> */}
              {/* <SSOButton
                onClick={() => setLoginInterface('magic')}
                iconPrefix="fas"
                icon="envelope"
                text="Sign in with magic link"
              /> */}
            </>
          )}
          {loginInterface === 'email' && <EmailPasswordForm setLoading={setLoading} />}
          {/* {loginInterface === 'magic' && <LogInWithEmailForm setLoading={setLoading} />} */}
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
