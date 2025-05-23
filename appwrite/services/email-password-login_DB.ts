import { Account } from "appwrite";
import client from "../appwrite-configs/public-client";

export async function emailPasswordLogin_DB({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const loginAccount = new Account(client);
    const promise = await loginAccount.createEmailPasswordSession(
      email,
      password
    );
    let accDetails;
    setTimeout(async () => {
      accDetails = await loginAccount.get();
    }, 1000);
    return { currentUser: accDetails, promise };
  } catch (error) {
    return error;
  }
}
