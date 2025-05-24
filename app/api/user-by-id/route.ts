import keyClient from "@/appwrite/appwrite-configs/key-client";
import { NextResponse } from "next/server";
import { Users } from "node-appwrite";

export async function POST(requestRaw: Request) {
  const request = await requestRaw.json();
  console.log("Request body:", request);
  const { id } = request || {};

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const users = new Users(keyClient);
  const user = await users.get(id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    { user, message: "Success user found" },
    { status: 200 }
  );
}
