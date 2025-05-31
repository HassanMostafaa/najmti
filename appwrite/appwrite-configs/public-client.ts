import { Client } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env?.NEXT_PUBLIC_APP_WRITE_API_ENDPOINT ?? "")
  .setProject(process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID ?? "");
export default client;
