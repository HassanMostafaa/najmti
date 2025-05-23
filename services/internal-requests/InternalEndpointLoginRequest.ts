/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "@/appwrite/appwrite-configs/public-client";
import { Account } from "appwrite";

const account = new Account(client);
export const InternalEndpointLoginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const currentUser = await account.get();

    return { session, currentUser };
  } catch (error: any) {
    console.log("internal reuqest function refactor to direct db call error", {
      error,
    });
    return error;
  }
};
// export const InternalEndpointLoginRequest = async (formData: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//       email: formData.email,
//       password: formData.password,
//     });
//     return res;
//   } catch (error: any) {
//     return error;
//   }
// };
