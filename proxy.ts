import { type NextRequest } from 'next/server';
import { updateSession } from '@supabase/utils/middleware';

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\..*).*)'
  ]
};
