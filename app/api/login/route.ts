import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // const values = body;
    // const { email, password } = LoginSchema.parse(body);
    const validatedFields = await LoginSchema.safeParse(body);
    if (!validatedFields.success) return NextResponse.json({ success: "The fields are not valid" }, { status: 401 });

    const { email, password } = validatedFields.data;
    console.log(email, password);
    return NextResponse.json({ success: "user created sucessfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  return NextResponse.json({ success: "LOGIN ROUTE" }, { status: 200 });
};
