import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Users } from "@/lib/schema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }
  try {
    const existingUser = await Users.find({ email }).toArray();
    if (!existingUser || existingUser.length==0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 },
      );
    }
    const match = await bcrypt.compare(password, existingUser[0].password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }
    const hashedPassword = existingUser[0].password;
    const token = jwt.sign(
      {
        name: existingUser[0].name,
        email: email,
        password: hashedPassword,
        id: existingUser[0]._id,
      },
      process.env.JWT_SECRET!,
    );
    const response = NextResponse.json(
      {
        successful: "Login successful",
        data: { name: existingUser[0].name, email: existingUser[0].email },
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
    return NextResponse.json(
      { error: "Server side error occurred." },
      { status: 500 },
    );
  }
}
