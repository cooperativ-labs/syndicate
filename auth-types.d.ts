import types from './types';
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    encodedJwt?: string;
    user: { id: string; email: string; name: string; image: string };
  }
}
