import { Client, Storage, Account, Permission, Role } from "appwrite";
import { configDotenv } from "dotenv";
import { v4 as uuidv4 } from 'uuid';

configDotenv();

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_SET_PROJECT_ID);

export const storage = new Storage(client);
export const account = new Account(client);


// Example usage of creating a file
const createFile = async (file) => {
    try {
        const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
            uuidv4(),
            file
        );
        console.log(response); // Success
    } catch (error) {
        console.log(error); // Failure
    }
};

// Example usage
// createFile(document.getElementById('uploader').files[0]);