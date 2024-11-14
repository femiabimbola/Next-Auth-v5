import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const body = await request.json();
    const token = searchParams.get("token") as string;
    const validatedFields = await NewPasswordSchema.safeParse(body);
    if (!validatedFields.success) return NextResponse.json({ success: "The fields are not valid" }, { status: 200 });

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) return NextResponse.json({ error: "Token does not exist" }, { status: 200 });

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return NextResponse.json({ error: "Token has expired" }, { status: 200 });

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return NextResponse.json({ error: "User does not exist" }, { status: 200 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Password updated successfully" };
  } catch (error) {
    return NextResponse.json({ error: "cannot reset your password now" }, { status: 500 });
  }
};
