import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("Fetching all users request from api", { request });

  try {
    return NextResponse.json(
      { message: "Hello from all users" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching all users", error },
      { status: 500 }
    );
  }
}
