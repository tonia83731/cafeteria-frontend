import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
const protectedRoutes = ["/profile", "/cart", "/wish"];
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const { pathname } = request.nextUrl;

  const pathParts = pathname.split("/").filter(Boolean);
  const locale = pathParts[0];
  // const slug = pathParts[1];
  const route = pathParts[2];

  const isProtected = protectedRoutes.includes(`/${route}`);

  if (isProtected && !authToken) {
    const loginUrl = new URL(`/${locale}/auth/signin`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(zh|en)/:path*"],
};
