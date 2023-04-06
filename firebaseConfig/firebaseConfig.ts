import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithCustomToken,
  AuthCredential,
  connectAuthEmulator,
} from 'firebase/auth';

const firebaseConfigStaging = {
  apiKey: process.env.NEXT_PUBLIC_STAGING_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_STAGING_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STAGING_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_APP_ID,
  // credential: refreshToken(serviceAccount),
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
  // credential: refreshToken(serviceAccount),
};

const getEndpoint = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
    case 'production':
      return 'https://jupiter.cooperativ.io';
    case 'staging':
      return 'https://staging.jupiter.cooperativ.io';
    default:
      return 'http://localhost:3000';
  }
};

const getConfig = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
    case 'production':
      return firebaseConfig;
    case 'staging':
      return firebaseConfigStaging;
    default:
      return firebaseConfigStaging;
  }
};

const fireApp = initializeApp(getConfig());
// initializeApp({ projectId: "permissioned-exchange" });

// process.env.NODE_ENV === 'production' &&
//   fireApp &&
//   initializeAppCheck(fireApp, {
//     provider: new ReCaptchaV3Provider('6Ld0rkIhAAAAAIaN5a-i1zMHRlsdMzQkjckBBERc'),
//     isTokenAutoRefreshEnabled: true,
//   });

export const auth = getAuth();

// Turns out Firebase Emulator does not give a real JWK, so it can't work with Dgraph
// connectAuthEmulator(auth, 'http://localhost:9099');

const AuthURL = getEndpoint();

export const handleAddEmailAddress = async (address: string, completionURL: string) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: AuthURL + completionURL,
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, address, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', address);
      alert('Check your inbox for an email confirmation');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export default fireApp;
