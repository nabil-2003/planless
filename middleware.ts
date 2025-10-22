import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";








export  function middleware(req: NextRequest) {
  // Disabled: auth is client-side via sessionStorage. Avoid server redirects to prevent loops.
  return NextResponse.next();
  const token = req.cookies.get("token")?.value; 
        
  // token from cookie (adjust name if your cookie differs)
  const cookieToken = token;
  console.log('Middleware running. token present:', Boolean(cookieToken));

  // or check your auth cookie/localStorage logic
  const { pathname: rawPathname } = req.nextUrl;
  // Normalize pathname to avoid trailing-slash mismatches
  const pathname = rawPathname.replace(/\/+$|^\s+|\s+$/g, '') || '/';
  console.log('Middleware running for path:', pathname);
  // Otherwise continue normally
  // Skip internal next paths and api routes to avoid breaking static assets or server internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico' || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  if (!cookieToken && pathname.startsWith("/admin-panel")) {
    const loginUrl = new URL("/auth/login", req.url);
    // prevent loop: only redirect if not already at destination
    if (loginUrl.pathname !== pathname) return NextResponse.redirect(loginUrl);
    return NextResponse.next();
  }

  // If user is logged in and trying to access auth routes -> redirect to dashboard
  if (cookieToken && pathname.startsWith("/auth")) {
    const dashboardUrl = new URL("/admin-panel/dashboard", req.url);
    if (dashboardUrl.pathname !== pathname) return NextResponse.redirect(dashboardUrl);
    return NextResponse.next();
  }

  // Redirect root path based on auth state
  // NOTE: root (/) redirect removed because sessionStorage is client-only.
  // Client-side `AuthRedirect` handles navigation based on sessionStorage.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-panel/:path*", // protected routes
    "/auth/:path*",        // auth routes
  ],
};