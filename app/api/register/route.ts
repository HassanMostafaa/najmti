// app/api/register/route.ts

import { registerUser_DB } from "@/appwrite/services/register_DB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, fullName: name } = body || {};

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password, and name are required." },
        { status: 400 }
      );
    }

    const result = await registerUser_DB(email, password, name);

    if (!result.success) {
      return NextResponse.json(
        { message: "Appwrite registration failed", error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User registered", data: result.data });
  } catch (error) {
    console.error("Server error during registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
