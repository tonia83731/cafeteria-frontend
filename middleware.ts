import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const userRestrictsRoutes = ["/cart", "/profile", "/wish"];
const adminRestrictsRoutes = "/staff/dashboard/";
// [
//   "/staff/dashboard/coupons",
//   "/staff/dashboard/orders",
//   "/staff/dashboard/products",
// ];

export async function middleware(req: NextRequest) {
  const { pathname, search, locale } = req.nextUrl;
  // adjust locale ---> 'zh' or 'en'
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  )
    return;

  if (locale === "default") {
    const locale = req.cookies.get("NEXT_LOCALE")?.value || "zh";

    return NextResponse.redirect(
      new URL(`/${locale}${pathname}${search}`, req.url)
    );
  }

  const isUserLogin = req.cookies.get("authToken")?.value;
  const isAdminLogin = req.cookies.get("adminToken")?.value;

  const role = isUserLogin ? "user" : isAdminLogin ? "admin" : null;

  if (!role) {
    if (userRestrictsRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith(adminRestrictsRoutes)) {
      return NextResponse.redirect(new URL("/staff", req.url));
    }
  }

  if (role === "user") {
    if (pathname.startsWith(adminRestrictsRoutes)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (role === "admin") {
    if (userRestrictsRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/staff", req.url));
    }
  }

  return NextResponse.next();
}
