// lib/appwrite-register.ts
import client from "@/appwrite/appwrite-configs/public-client";
import { Account, ID } from "appwrite";

const account = new Account(client);

export async function registerUser_DB(
  email: string,
  password: string,
  name: string
) {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    console.log("✅ Account created successfully:", response);
    return { success: true, data: response };
  } catch (error) {
    console.error("❌ Account creation failed:", error);
    return { success: false, error };
  }
}
