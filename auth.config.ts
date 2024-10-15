import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { error } from "console";

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.g,
    }),
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          // The reason for password is because oAuth does not need a password
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password); //we are jus comparing the password
          if (!passwordsMatch) return null;
          return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
