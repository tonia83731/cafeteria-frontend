import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/cart", "/wish"];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  const { pathname } = request.nextUrl;

  // Check if the current pathname is a protected route
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !authToken) {
    const loginUrl = new URL("/auth/signin", request.url); // Redirect to a fixed sign-in page
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Continue the request if no redirect is needed
}

export const config = {
  matcher: ["/:path*"], // Match all paths
};
