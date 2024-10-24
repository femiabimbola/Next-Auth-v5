import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { redirect } from "next/navigation";
import { getUserById } from "./data/user";
import { NextResponse, NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "@/routes";

//@ts-ignore
export default auth((req) => {
  const pathname = req.nextUrl;
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // console.log(req.nextUrl.pathname)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  // console.log(isLoggedIn);
  if (isAuthRoute) {
    // if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    if (isLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    // return Response.redirect(new URL(`/auth/login?callbackUrl=$(encodedCallbackUrl)`, nextUrl));

    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// It invokes the auth method on every path
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
