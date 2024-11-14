import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedFields = await ResetSchema.safeParse(body);

    if (!validatedFields.success) return NextResponse.json({ error: "Invalid email" }, { status: 401 });

    const { email } = validatedFields.data;
    const exisitingUser = await getUserByEmail(email);
    if (exisitingUser) return NextResponse.json({ error: "Email already in use" });
  } catch (error) {}
};
