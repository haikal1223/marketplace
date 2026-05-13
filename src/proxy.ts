import { auth } from "lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_ROUTES = /^\/admin(\/.*)?$/;
const VENDOR_ROUTES = /^\/vendor(\/.*)?$/;
const CUSTOMER_ROUTES = /^\/(orders|address|profile|payment-methods|support-tickets|wish-list)(\/.*)?$/;
const CHECKOUT_ROUTES = /^\/(checkout|payment|order-confirmation)(\/.*)?$/;
const AUTH_ROUTES = /^\/(login|register|reset-password)$/;

export default auth((req: NextRequest & { auth: any }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role: string | undefined = session?.user?.role;

  // ── Already logged in → redirect away from auth pages ──────────────────
  if (AUTH_ROUTES.test(pathname) && session) {
    const dest =
      role === "ADMIN"
        ? "/admin/dashboard"
        : role === "VENDOR"
          ? "/vendor/dashboard"
          : "/";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  // ── Admin routes ────────────────────────────────────────────────────────
  if (ADMIN_ROUTES.test(pathname)) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ── Vendor routes ───────────────────────────────────────────────────────
  if (VENDOR_ROUTES.test(pathname)) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (role !== "VENDOR" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ── Customer dashboard routes ───────────────────────────────────────────
  if (CUSTOMER_ROUTES.test(pathname)) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Checkout / payment routes ───────────────────────────────────────────
  if (CHECKOUT_ROUTES.test(pathname)) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/vendor/:path*",
    "/orders/:path*",
    "/address/:path*",
    "/profile/:path*",
    "/payment-methods/:path*",
    "/support-tickets/:path*",
    "/wish-list/:path*",
    "/checkout/:path*",
    "/payment/:path*",
    "/order-confirmation/:path*",
    "/login",
    "/register",
    "/reset-password"
  ]
};
