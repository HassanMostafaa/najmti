import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  console.log("Fetching login request from api", { request });
  const body = await request.json();
  console.log("Login body", { body });
  const { email, password } = body;
  console.log("Login email and password", { email, password });

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Login data from fn:", { data });
    return NextResponse.json(data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching login", error },
      { status: 500 }
    );
  }
}
