import { Client, Account, Storage } from "appwrite";
import { configDotenv } from "dotenv";

configDotenv();

export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_SET_PROJECT_ID); // Project ID

export const storage = new Storage(client);
export const account = new Account(client);


// Account verification
const verifyAccount = async () => {
    try {
        const verificationResponse = await account.createVerification('https://example.com/verify');
        console.log('Verification email sent:', verificationResponse);
    } catch (error) {
        console.error('Error in account verification:', error);
    }
};

// File creation
const createFile = async (file) => {
    try {
        const response = await storage.createFile(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
            uuidv4(),
            file
        );
        console.log('File created:', response); // Success
    } catch (error) {
        console.error('Error creating file:', error); // Failure
    }
};

export { verifyAccount, createFile };
