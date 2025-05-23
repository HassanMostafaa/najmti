// app/api/register/route.ts

import { registerUserDB } from "@/appwrite/services/registerDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received registration data:", { body });
    const { email, password, fullName: name } = body || {};

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Email, password, and name are required." },
        { status: 400 }
      );
    }

    const result = await registerUserDB(email, password, name);

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
