import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, //Can't use db because of prisma. It can store session
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token; //token.sub means i'm logged out
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      //token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },

    //It is important to try next-auth.d.ts
    async session({ token, session }) {
      if (token.role && session.user) {
        session.user.role = token.role as UserRole; // uses the next-auth.d.ts
      }
      return session;
    },

    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);
      // if (!existingUser?.emailVerified) return false;

      return true;
    },
  },
  ...authConfig,
});
