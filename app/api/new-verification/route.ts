import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token not provided" }, { status: 200 });
  }

  const existingToken = await getVerificationTokenByToken(token);
  console.log(existingToken);

  if (!existingToken) return NextResponse.json({ error: "Token does not exist" }, { status: 200 });

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return NextResponse.json({ error: "Token has expired" }, { status: 200 });

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return NextResponse.json({ error: "User does not exist" }, { status: 200 });

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
