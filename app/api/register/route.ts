import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // const { email, password } = LoginSchema.parse(body);
    const validatedFields = await RegisterSchema.safeParse(body);
    if (!validatedFields.success) return NextResponse.json({ error: "The fields are not valid" }, { status: 401 });

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const exisitingUser = await db.user.findUnique({ where: { email } });
    if (exisitingUser) return NextResponse.json({ error: "Email already in use" }, { status: 401 });

    return NextResponse.json({ success: "user created sucessfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  return NextResponse.json({ success: "Register ROUTE" }, { status: 200 });
};
