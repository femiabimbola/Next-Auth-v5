import { getUserByEmail } from "@/data/user";
import { sendPasswordReset } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedFields = await ResetSchema.safeParse(body);

    if (!validatedFields.success) return NextResponse.json({ error: "Invalid email" }, { status: 401 });

    const { email } = validatedFields.data;
    const exisitingUser = await getUserByEmail(email);
    if (!exisitingUser) return NextResponse.json({ error: "User is not found" });
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordReset(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset email sent" };
  } catch (error) {
    return NextResponse.json({ error: "cannot reset your email now" }, { status: 500 });
  }
};
