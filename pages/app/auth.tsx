import LoadingModal from '@src/components/loading/ModalLoading';
import React, { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { ADD_USER_WITH_EMAIL } from '@src/utils/dGraphQueries/user';
import { auth } from 'firebaseConfig/firebaseConfig';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useMutation } from '@apollo/client';

const AuthPage: FC = () => {
  const [addUserWithEmail, { data, error: errorEmail }] = useMutation(ADD_USER_WITH_EMAIL);
  const [tried, setTried] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  if (errorEmail && !alerted) {
    const error = errorEmail;
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  const addUserToDB = async () => {
    if (currentUser) {
      try {
        await addUserWithEmail({
          variables: {
            currentDate: currentDate,
            uuid: currentUser.uid,
            displayName: currentUser.email,
            fullName: currentUser.email,
            emailAddress: currentUser.email,
            profilePhoto: currentUser.photoURL,
          },
        });
        router.push('/app');
      } catch (e) {
        router.push('/app');
      }
    }
  };

  useEffect(() => {
    addUserToDB();
  }, [currentUser]);

  const getAccount = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      // alert('proceed to sign in');
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');

          setTried(true);
          auth.onAuthStateChanged(async (user) => {
            if (user) {
              setCurrentUser(user);
            }
            return;
          });
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  };

  useEffect(() => {
    if (!tried) {
      getAccount();
    }
  }, [getAccount, tried]);

  return <LoadingModal />;
};

export default AuthPage;
