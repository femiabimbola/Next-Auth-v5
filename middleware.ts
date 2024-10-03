// Middleware work strictly on the edge, Auth.ts which prisma uses does not support edge
// So, auth.config.ts supplies to middleware and auth.ts, Authjs strictly uses auth.ts

import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";

import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "@/routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

// export default auth(async function middleware(req) {
//   // Your custom middleware logic goes here
//   // const {nextUrl} = req;
//   const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
//   const isLoggedIn = !!req.auth;

//   if (isApiAuthRoute) return null; //Means no need to protect
//   if (isAuthRoute) {
//     if (isLoggedIn)
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
//     return null;
//   }
// });

export const middleware = (req: any) => {
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isLoggedIn = !!req.auth;

  if (isApiAuthRoute) return null; //Means no need to protect

  // if (isAuthRoute) {
  //   if (isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
  //   return null;
  // }

  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL(`/auth/login`, req.nextUrl));
  // }
  return null;
};

export default auth(middleware);

// export default auth(async function middleware(req: NextRequest) {
//   // Your custom middleware logic goes here
// });
