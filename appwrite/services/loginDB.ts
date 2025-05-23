import client from "@/appwrite/appwrite-configs/public-client";
import { Account } from "appwrite";

export interface LoginResponse {
  userId: string;
  email: string;
  sessionId: string;
}
const account = new Account(client);

export async function loginWithEmail(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    console.log("Logging in with email:", { email, password });
    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Session created successfully:", session);

    // Fetch the logged-in user's info
    const user = await account.get();

    return {
      userId: user.$id,
      email: user.email,
      sessionId: session.$id,
    };
  } catch (error) {
    throw error;
  }
}
