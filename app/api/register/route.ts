import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // const { email, password } = LoginSchema.parse(body);
    const validatedFields = await RegisterSchema.safeParse(body);
    if (!validatedFields.success) return NextResponse.json({ error: "The fields are not valid" }, { status: 401 });

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    // const exisitingUser = await db.user.findUnique({ where: { email } });
    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser) return NextResponse.json({ error: "Email already in use" }, { status: 200 });

    await db.user.create({ data: { name, email, password: hashedPassword } });
    const verificationToken = await generateVerificationToken(email);

    return NextResponse.json({ success: "Confirmation email sent" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  return NextResponse.json({ success: "Register ROUTE" }, { status: 200 });
};
