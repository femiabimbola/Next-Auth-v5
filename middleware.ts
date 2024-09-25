// Middleware work strictly on the edge, Auth.ts which prisma uses does not support edge
// So, auth.config.ts supplies to middleware and auth.ts, Authjs strictly uses auth.ts

import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const login = !req;
  console.log("route ->", login);
});
