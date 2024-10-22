import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const POST = async (request: Request) => {
  const token = await request.json();

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) return NextResponse.json({ success: "Token does not exist" }, { status: 201 });

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return NextResponse.json({ success: "Token has expired" }, { status: 201 });

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return NextResponse.json({ success: "User does not exist" }, { status: 200 });

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return NextResponse.json({ success: "Email is verified " }, { status: 200 });
};
