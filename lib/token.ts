import { getVerificationTokenByEmail } from "@/data/verification-token";
// import {getPasswordResetTokenByEmail} from "@/data/password-reset-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
import crypto from "crypto";
// import {getTwoFactorTokenByEmail} from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  // shows how to remove a value from database
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
};
