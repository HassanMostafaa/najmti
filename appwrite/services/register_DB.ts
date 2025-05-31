/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/appwrite-register.ts
import { Account, ID } from "appwrite";
import client from "../appwrite-configs/public-client";

const account = new Account(client);
// const databases = new Databases(client);

export async function registerUser_DB(
  email: string,
  password: string,
  name: string
) {
  try {
    const newId = ID.unique();
    const authRes = await account.create(newId, email, password, name);
    // const userDuplicationVersionRes = await databases.createDocument(
    //   process.env.APP_WRITE_DB_ID || "",
    //   process.env.APP_WRITE_USERS_COLLECTION_ID || "",
    //   newId,
    //   { internalName: name, email }
    // );

    return {
      success: true,
      data: {
        authRes,
        // userDuplicationVersionRes,
      },
    };
  } catch (error) {
    console.error("❌ Account creation failed:", error);
    return { success: false, error };
  }
}
