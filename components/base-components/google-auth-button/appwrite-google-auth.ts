import client from "@/appwrite/appwrite-configs/public-client";
import { Account, OAuthProvider } from "appwrite";

const account = new Account(client);

export const googleAuth = async () => {
  try {
    const response = await account.createOAuth2Session(
      OAuthProvider.Google,
      "https://localhost:3000/profile",
      "https://localhost:3000/login" // Replace with your actual redirect URL
    );
    return response;
  } catch (error) {
    console.error("Google Auth Error:", error);
    throw error;
  }
};
