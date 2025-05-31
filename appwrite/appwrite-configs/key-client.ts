import { Client } from "node-appwrite";

const keyClient = new Client();
keyClient
  .setEndpoint(process.env.NEXT_PUBLIC_APP_WRITE_API_ENDPOINT ?? "")
  .setProject(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID ?? "")
  .setKey(process.env.APPWRITE_API_KEY || "");
export default keyClient;
