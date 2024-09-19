import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    // const values = body;
    const { email, password } = LoginSchema.parse(body);
    console.log(email, password);
    return NextResponse.json({ message: "user created sucessfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
};
