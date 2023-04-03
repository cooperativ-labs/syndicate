import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
  getAuth,
  GoogleAuthProvider,
  TwitterAuthProvider,
  linkWithPopup,
  sendSignInLinkToEmail,
  signInWithCustomToken,
  signInWithPopup,
  AuthCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfigStaging = {
  apiKey: process.env.NEXT_PUBLIC_STAGING_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_STAGING_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STAGING_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_APP_ID,
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const getEndpoint = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
    case 'production':
      return 'https://syndicate.cooperativ.io/app';
    case 'staging':
      return 'https://staging.syndicate.cooperativ.io/app';
    default:
      return 'http://localhost:3000/app';
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

export const CustomTokenService = async (signer, walletAddress) => {
  const functions = getFunctions(fireApp);
  const getWalletNonce = httpsCallable(functions, 'getWalletNonce');
  const verifySignedMessage = httpsCallable(functions, 'verifySignedMessage');

  const walletUserDataResponse = async () => {
    try {
      const result = await getWalletNonce({
        address: walletAddress,
      });
      //@ts-ignore
      return result.data.nonce;
    } catch (err) {
      console.log(err);
    }
  };
  try {
    const walletUserData = await walletUserDataResponse();
    const sig = await signer.signMessage(walletUserData);
    //@ts-ignore
    const getCustomToken = await (await verifySignedMessage({ address: walletAddress, signature: sig })).data.token;
    try {
      const response = await signInWithCustomToken(auth, getCustomToken);
      return response.user;
    } catch (err) {}
  } catch (err) {
    console.log(err);
  }
};

export const createAccountWithPassword = async (email: string, password: string): Promise<any> => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(
        errorCode === 'auth/email-already-in-use'
          ? 'That email address is already associated with an account.'
          : errorMessage
      );
    });
};

export const signInWithPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

export const setAccountInWithEmailLink = async (email: string): Promise<any> => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: AuthURL + '/auth/',
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Please check your email for your login link');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
};

export const signInWithGoogle = async (): Promise<any> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signInWithTwitter = async (): Promise<any> => {
  const provider = new TwitterAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;
      const user = result.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = TwitterAuthProvider.credentialFromError(error);
      // ...
    });
};

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

export const handleAddGoogleAccount = () => {
  const GoogleProvider = new GoogleAuthProvider();
  linkWithPopup(auth.currentUser, GoogleProvider)
    .then((result) => {
      // Accounts successfully linked.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user, credential);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // ...dd
    });
};

export default fireApp;
