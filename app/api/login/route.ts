/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/login/route.ts
import { NextResponse } from "next/server";
import { isValidEmail, isValidPassword } from "@/lib/validation/authValidation";
import { emailPasswordLogin_DB } from "@/appwrite/services/email-password-login_DB";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) || {};

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  if (!isValidPassword(password)) {
    return NextResponse.json(
      {
        message:
          "Password must be at least 8 characters long and contain at least one letter and one number",
      },
      { status: 400 }
    );
  }

  // Here you would typically call your login function, e.g., emailPasswordLogin_DB
  const loginResponse: any = await emailPasswordLogin_DB({
    email,
    password,
  });

  if (loginResponse?.code) {
    return NextResponse.json(
      { message: loginResponse.response },
      { status: loginResponse.code ?? 500 }
    );
  }

  return NextResponse.json(
    {
      message: "Login successful",
      loginResponse,
    },
    { status: 200 }
  );
}
