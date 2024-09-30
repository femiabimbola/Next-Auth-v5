import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // const values = body;
    // const { email, password } = LoginSchema.parse(body);
    const validatedFields = await LoginSchema.safeParse(body);
    if (!validatedFields.success) return NextResponse.json({ success: "The fields are not valid" }, { status: 401 });

    const { email, password } = validatedFields.data;

    console.log(email, password);
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
    return NextResponse.json({ success: "user created sucessfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({ error: "Invaid credentials" }, { status: 500 });
        default:
          return NextResponse.json({ error: "Error not credential" }, { status: 500 });
      }
    }
    throw { error: "something went wrong again " };
  }
};

export const GET = async (request: Request) => {
  return NextResponse.json({ success: "LOGIN ROUTE" }, { status: 200 });
};
