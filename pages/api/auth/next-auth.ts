import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { DgraphAdapter } from '@next-auth/dgraph-adapter';
import { AuthOptions, Session, User } from 'next-auth';
import * as jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

// const firebaseConfigStaging = {
//   credential: firebaseAdmin.credential.cert({
//     projectId: process.env.NEXT_PUBLIC_STAGING_FIREBASE_PROJECT_ID,
//     clientEmail: process.env.NEXT_PUBLIC_STAGING_FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.NEXT_PUBLIC_STAGING_FIREBASE_PRIVATE_KEY,
//   }),
//   storageBucket: process.env.NEXT_PUBLIC_STAGING_FIREBASE_STORAGE_BUCKET,
// };

const getEndpoint = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
    case 'production':
      return process.env.NEXT_PUBLIC_DGRAPH_ENDPOINT;
    // case 'staging':
    //   return 'https://blue-surf-591466.us-east-1.aws.cloud.dgraph.io/graphql';
    default:
      // return 'http://localhost:8080/graphql';
      return 'http://172.27.0.38080/graphql';
  }
};

export const getKey = () => {
  switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
    case 'production':
      return process.env.NEXT_PUBLIC_DGRAPH_HEADER_KEY;
    case 'staging':
      return process.env.NEXT_PUBLIC_STAGING_DGRAPH_HEADER_KEY;
    default:
      return 'nothing';
  }
};

// const getFirebaseConfig = () => {
//   switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
//     case 'production':
//     // return firebaseConfig;
//     case 'staging':
//       return firebaseConfigStaging;
//     default:
//       return firebaseConfigStaging;
//   }
// };

// if (!firebaseAdmin.apps.length) {
//   firebaseAdmin.initializeApp(getFirebaseConfig());
// }

// async function generateFirebaseToken(userId) {
//   try {
//     const uid = userId; // You can use email as the unique identifier (uid) for Firebase
//     const customToken = await firebaseAdmin.auth().createCustomToken(uid);
//     return customToken;
//   } catch (error) {
//     console.error('Error generating Firebase token:', error);
//     return null;
//   }
// }

const options: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_SECRET,
    encode: async ({ secret, token }) => {
      const jwtPayload = {
        ...token,
        id: token.sub || token.sub, // Use 'sub' value as 'id'
        userId: token.sub,
      };
      return jwt.sign(jwtPayload, secret, {
        algorithm: 'HS256',
      });
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token, secret, { algorithms: ['HS256'] });
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  adapter: DgraphAdapter({
    endpoint: getEndpoint(),
    authToken: getKey(),
    authHeader: process.env.NEXT_PUBLIC_AUTH_HEADER,
    jwtSecret: process.env.NEXT_PUBLIC_SECRET,
  }),
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error',
  //   verifyRequest: '/auth/verify-request',
  //   newUser: null,
  // },

  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user: User;
      account: any;
      profile: any;
      isNewUser: boolean;
    }) {
      if (user) {
        token.id = user.id;
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = 60 * 60; // 1 hour
        token.exp = now + expiresIn;
      }
      return token;
    },
    async session({ session, user, token }: { session: any; user: User; token: JWT }): Promise<Session> {
      session.user.id = token.id;
      session.encodedJwt = jwt.sign(token, process.env.NEXT_PUBLIC_SECRET, {
        algorithm: 'HS256',
      });
      return session;
    },
  },
};

export default options;

//https://learn.microsoft.com/en-us/azure/active-directory/develop/web-app-quickstart?pivots=devlang-nodejs-msal&tabs=windows
// https://github.com/nextauthjs/next-auth/discussions/1326
//https://next-auth.js.org/providers/azure-ad-b2c
