import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Users } from "@/lib/dbSchemas/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }
  try {
    const existingUser = await Users.findOne({ email:email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const genSalt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    await Users.insertOne({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await Users.findOne({ email:email });
    const id = user?._id;
    const token = jwt.sign(
      { name: name, email: email, password: hashedPassword, id: id },
      process.env.JWT_SECRET!,
    );
    const response = NextResponse.json(
      {
        success: "Signup successful",
        data: { name: user?.name, email: user?.email },
      },
      { status: 200 },
    );
    response.cookies.set("token",token,{
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      maxAge: 30 * 24 * 60 * 60,
    });
    return response;
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json({message:"Server Side Error occurred."},{status:500});
  }
}
