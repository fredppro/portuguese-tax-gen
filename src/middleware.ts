import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n-routing";

// Locale-aware i18n middleware from next-intl
const handleI18nRouting = createMiddleware(routing);

// Sign-in route (locale-aware)
const publicPaths = ["/sign-in", "sign-up"];

// Helper: checks if the request is for a public path like /sign-in or /fr/sign-in
function isPublicPath(pathname: string): boolean {
  const locale = extractLocale(pathname);
  const strippedPath = locale ? pathname.replace(`/${locale}`, "") : pathname;
  return publicPaths.includes(strippedPath);
}

// Extracts the locale prefix (if any)
function extractLocale(pathname: string): string | null {
  const match = pathname.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\b/);
  const locale = match?.[1];
  return routing.locales.includes(locale || "") ? locale! : null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    // Allow unauthenticated access to public routes (like sign-in)
    return handleI18nRouting(request);
  }

  const session = getSessionCookie(request);
  if (!session) {
    const locale = extractLocale(pathname);
    const redirectTo = locale ? `/${locale}/sign-in` : "/sign-in";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
