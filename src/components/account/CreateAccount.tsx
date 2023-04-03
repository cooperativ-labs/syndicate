import EmailPasswordForm from './CreateEmailPasswordAccountForm';
import LogInWithEmailForm from './LogInWithEmail';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { ADD_USER_WITH_EMAIL, ADD_USER_WITH_TWITTER } from '@src/utils/dGraphQueries/user';
import { ApplicationStoreProps, store } from '@context/store';
import { auth, signInWithGoogle, signInWithTwitter } from 'firebaseConfig/firebaseConfig';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/free-brands-svg-icons';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginInterface, setLoginInterface] = useState<'social' | 'email' | 'magic'>('social');
  const [addUserWithEmail, { error: errorEmail }] = useMutation(ADD_USER_WITH_EMAIL);
  const [addUserWithTwitter, { error: errorTwitter }] = useMutation(ADD_USER_WITH_TWITTER);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [tried, setTried] = useState(false);
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchPageIsLoading } = applicationStore;

  if (errorEmail || errorTwitter) {
    const error = errorEmail || errorTwitter;
    alert(`Oops. Looks like something went wrong: ${error.message} (createAccount.tsx)`);
    setTried(true);
  }

  //===== This crazy shit is necessary because of NextJS
  //===== DB queries don't have the token when it's initially requested from Firebase

  const addUserToDB = async () => {
    if (currentUser && !tried) {
      try {
        dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_ON' });
        setTried(true);
        if (currentUser.providerData[0].providerId === 'twitter.com') {
          await addUserWithTwitter({
            variables: {
              currentDate: currentDate,
              uuid: currentUser.uid,
              displayName: currentUser.displayName,
              fullName: currentUser.displayName,
              twitterId: currentUser.providerData[0].uid,
              twitterUsername: currentUser.reloadUserInfo.screenName,
              twitterURL: `https://twitter.com/${currentUser.reloadUserInfo.screenName}`,
              profilePhoto: currentUser.photoURL,
            },
          });
        } else {
          await addUserWithEmail({
            variables: {
              currentDate: currentDate,
              uuid: currentUser.uid,
              displayName: currentUser.displayName ?? currentUser.email,
              fullName: currentUser.displayName ?? currentUser.email,
              emailAddress: currentUser.email,
              profilePhoto: currentUser.photoURL,
            },
          });
        }
        router.reload();
      } catch (e) {
        router.reload();
      }
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        addUserToDB();
      }
      return;
    });
  }, [currentUser]);

  //===========================================================================

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithGoogle();
  };

  const handleTwitterLogin = async () => {
    setLoading(true);
    await signInWithTwitter();
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
              <SSOButton
                onClick={() => setLoginInterface('email')}
                iconPrefix="fas"
                icon="envelope"
                text="Sign in with email address "
              />
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
