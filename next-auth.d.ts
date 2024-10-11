import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole; //"ADMIN" | "USER"
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
