import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/confirm-your-email",
  "/check-your-email",
  "/create-organization",
  "/login/confirm" // Add your new confirmation page
] as const as string[];

const STATIC_ASSETS = [
  "/robots.txt",
  "/manifest.json",
  "/sitemap.xml",
  "/favicon.ico"
] as const as string[];

const PUBLIC_PREFIXES = ["/auth", "/_next", "/api"] as const as string[];

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next({
      headers: { "x-middleware": "api-skip" } // debug header
    });
  }

  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (
    PUBLIC_PREFIXES.some(prefix => pathname.startsWith(prefix)) ||
    STATIC_ASSETS.includes(pathname) ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // else if (
  //   user &&
  //   (request.nextUrl.pathname.startsWith('/login') ||
  //     request.nextUrl.pathname.startsWith('/check-your-email') ||
  //     request.nextUrl.pathname.startsWith('/confirm-your-email'))
  // ) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/';
  //   return NextResponse.redirect(url);
  // }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
