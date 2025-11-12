import { type EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@supabase/utils/server';
import { type NextRequest, NextResponse } from 'next/server';
// import { applyUserRole } from '@/lib/actions/userActions';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const token_hash = searchParams.get('token_hash');
  const token = searchParams.get('token'); // Handle both token_hash and token
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '';
  const redirectTo = request.nextUrl.clone();

  if (process.env.NEXT_PUBLIC_CONTEXT !== 'development') {
    redirectTo.port = ''; // Clearing the port might help correct the URL
  }
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('token');
  redirectTo.searchParams.delete('type');

  // Use either token_hash or token, whichever is present
  const authToken = token_hash || token;
  console.log('authToken', authToken);
  console.log('type', type);

  if (authToken && type) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash: authToken
      });

      //This checks to see if there is a pending invitation and applies if so
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();
      // if (user) {
      //   try {
      //     await applyUserRole({ userId: user.id, email: user.email });
      //   } catch (error) {
      //     console.error('Failed to apply user role', error);
      //   }
      // }

      if (!error) {
        redirectTo.searchParams.delete('next');
        if (type === 'recovery') {
          return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/password-reset`);
        }
        console.log('redirecting from auth to:', `${process.env.NEXT_PUBLIC_SITE_URL}/${next}`);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/${next}`);
      } else {
        console.error('OTP verification failed:', error);
        // Instead of redirecting to /error, redirect to login with error message
        const loginUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
        loginUrl.searchParams.set('error', error.message || 'Authentication failed');
        return NextResponse.redirect(loginUrl.href);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  }

  console.error(
    'Missing required auth parameters: token_hash/token or type',
    JSON.stringify({ token_hash, token, type, next })
  );
  const loginUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
  loginUrl.searchParams.set('error', 'Invalid authentication link');
  loginUrl.searchParams.set('next', next || '');
  // loginUrl.searchParams.set('token_hash', token_hash || '');
  // loginUrl.searchParams.set('token', token || '');
  // loginUrl.searchParams.set('type', type || '');
  return NextResponse.redirect(loginUrl.href);
}
