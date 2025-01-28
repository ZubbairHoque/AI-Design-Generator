import { account } from "@/lib/appwrite.config";
import { useAuth } from '@clerk/clerk-react';

const useSyncAppwriteSession = async () => {
  const { getToken } = useAuth(); // Get Clerk's JWT token
  try {
    const token = await getToken();
    if (!token) {
      console.error("No Clerk token found.");
      return;
    }

    // Sync Clerk's token with Appwrite
    await account.createJWT(token);
    console.log("Clerk session synced with Appwrite.");
  } catch (error) {
    console.error("Error syncing Clerk session with Appwrite:", error);
  }
};

export default useSyncAppwriteSession;
