import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("authToken");
  const protectedRoute = [
    "/carts",
    "/wishes",
    "/profile",
    "/profile/orders",
    "/profile/coupons",
  ];

  const url = req.nextUrl.clone();

  const isProtectedRoute = protectedRoute.some((route) =>
    url.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/carts", "/wishes", "/profile/:path*"],
};