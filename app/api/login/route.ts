import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { redirect } from "next/navigation";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // const values = body;
    // const { email, password } = LoginSchema.parse(body);
    const validatedFields = await LoginSchema.safeParse(body);
    if (!validatedFields.success) return NextResponse.json({ success: "The fields are not valid" }, { status: 200 });

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return NextResponse.json({ error: " User does not exist" }, { status: 200 });
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email);
      await sendVerificationEmail(verificationToken.email, verificationToken.token);
      return NextResponse.json({ success: "confirmation email sent" }, { status: 200 });
    }
    await signIn("credentials", { email, password, redirect: false });

    return NextResponse.json({ success: "user signed successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({ error: "Invalid password" }, { status: 200 });
        default:
          return NextResponse.json({ error: "Oauth" }, { status: 200 });
      }
    }
    // throw { error: "something went wrong again " };
    // return NextResponse.json({ error: "Something not right" }, { status: 200 });

    throw error;
  }
};

// export const GET = async (request: Request) => {
//   return NextResponse.json({ success: "LOGIN ROUTE" }, { status: 200 });
// };
