import { Client, Account, Storage } from "appwrite";
import { configDotenv } from "dotenv";

configDotenv();

export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_SET_PROJECT_ID); // Project ID
  .setProject(process.env.PUBLIC_APPWRITE_PROJECT_ID); // Your project ID;

export const account = new Account(client);