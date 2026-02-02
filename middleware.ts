import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES, PUBLIC_ROUTES } from './config/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the current route is public
  const isPublicRoute = PUBLIC_ROUTES.some((route) => {
    // Exact match or sub-path match (e.g., /login matches, but /dashboard should not match /)
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });

  // 2. Get token from cookies (assuming auth store also syncs to cookies or we use localStorage only)
  // NOTE: Middleware run on Edge, so it can't access localStorage.
  // For a robust system, we typically store a reference cookie or just check existence.
  // Since we are using Zustand (client-side) for the main token, Middleware here can strictly
  // enforce protected routes if we sync token to a cookie calling 'auth_token'.
  // If you strictly only use localStorage, Middleware cannot "read" it directly.
  // STRATEGY: For this starter, we will implement the scaffolding.
  // To make this fully functional, the Login Flow needs to set a cookie named 'auth_token'.

  const token = request.cookies.get('auth_token')?.value;

  // 3. Logic: If route is NOT public and NO token exists -> Redirect to Login
  if (!isPublicRoute && !token) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    // Add ?callbackUrl=... to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Logic: If route IS Login/Register and Token EXISTS -> Redirect to Dashboard
  if ((pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

// Configure which paths the Middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};

export default middleware;
