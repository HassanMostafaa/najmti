import { Account } from "appwrite";
import client from "../appwrite-configs/public-client";

const account = new Account(client);

export async function deleteSession_DB({ sessionId }: { sessionId: string }) {
  try {
    // Ensure this runs only in browser
    if (typeof window === "undefined") throw new Error("Must run in browser");

    const response = await account.deleteSession(sessionId);
    return response;
  } catch (error) {
    console.error(error);

    return error;
  }
}
