import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import AzureADB2CProvider from 'next-auth/providers/azure-ad-b2c';
import GoogleProvider from 'next-auth/providers/google';
import { DgraphAdapter } from '@next-auth/dgraph-adapter';
import { AuthOptions, Session, User } from 'next-auth';
import * as jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

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
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_SECRET,
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: { params: { scope: 'offline_access openid' } },
    }),
    EmailProvider({
      server: process.env.NEXT_PUBLIC_EMAIL_SERVER,
      from: process.env.NEXT_PUBLIC_SMTP_FROM,

      // sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
      //   if (!email) {
      //     throw new Error(`Invalid email address: ${email}`);
      //   }
      //   if (email.split('@').length > 2) {
      //     throw new Error('Only one email allowed');
      //   }
      //   const result = postmarkClient.sendEmail({
      //     To: email,
      //     From: from,
      //     MessageStream: 'magic-link-stream',
      //     Subject: 'Sign in to your account',
      //     TextBody: `Sign in to your account: ${url}`,
      //     HtmlBody: `<html><body><p>Sign in to your account:</p><p><a href="${url}">${url}</a></p></body></html>`,
      //   });

      //   if (result.ErrorCode) {
      //     throw new Error('here', result.Message);
      //   }
      // },
    }),
  ],
  adapter: DgraphAdapter({
    endpoint: process.env.NEXT_PUBLIC_DGRAPH_ENDPOINT,
    authToken: process.env.NEXT_PUBLIC_DGRAPH_HEADER_KEY,
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
        const expiresIn = 60 * 60 * 160; // 1 hour
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

// CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: 'Credentials',
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials, req) {
//         try {
//           const data = await apolloClient.query({
//             query: GET_USER_FROM_EMAIL,
//             variables: { email: credentials.email },
//           });

//           const user = data.data.queryUser[0];
//           if (user) {
//             // Any object returned will be saved in `user` property of the JWT
//             return user;
//           } else {
//             // If you return null then an error will be displayed advising the user to check their details.
//             return null;

//             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//           }
//         } catch (error) {
//           throw new Error('Error getting user from email');
//         }
//       },
//     }),
