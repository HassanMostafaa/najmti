import { Account } from "appwrite";
import client from "../appwrite-configs/public-client";
const account = new Account(client);

export async function emailPasswordLogin_DB({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    // Ensure this runs only in browser
    if (typeof window === "undefined") throw new Error("Must run in browser");

    const session = await account.createEmailPasswordSession(email, password);

    // Session should be set via cookies — now we can call get()
    const currentUser = await account.get();
    return { currentUser, session };
  } catch (error) {
    console.error(error);

    return error;
  }
}
