import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@supabase/utils/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";
  if (code) {
    const supabase = createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // if (user) {
    //   //This checks to see if there is a pending invitation and applies if so
    //   try {
    //     await applyUserRole({ userId: user.id, email: user.email });
    //   } catch (error) {
    //     console.error('Failed to apply user role', error);
    //   }
    // }
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${siteUrl}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${siteUrl}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${siteUrl}/auth/auth-code-error`);
}
