import { NextRequest, NextResponse } from "next/server";
import { AppConfig } from "./utils/app-config";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect / → defaultLocale/dashboard
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${AppConfig.defaultLocale}/dashboard`, request.url)
    );
  }

  // Protect /dashboard route
  if (
    pathname.startsWith(`/${AppConfig.defaultLocale}/dashboard`) ||
    pathname.startsWith(`/fr/dashboard`)
  ) {
    const cookies = getSessionCookie(request);
    if (!cookies) {
      // Not authenticated → redirect to home (or sign-in)
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  // Continue with request
  return NextResponse.next({ headers });
}

// Apply middleware to / and /dashboard routes (adjust matcher as needed)
export const config = {
  matcher: [
    "/",
    `/${AppConfig.defaultLocale}/dashboard/:path*`,
    `/fr/dashboard/:path*`,
  ],
};
