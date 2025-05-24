import { Client } from "node-appwrite";

const keyClient = new Client();
keyClient
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68250a6e0006861eb428")
  .setKey(process.env.APP_WRITE_API_KEY || "");
export default keyClient;
