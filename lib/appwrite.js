import { Client, Account, Storage, Permission, Role } from 'appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

const endpoint = PUBLIC_APPWRITE_ENDPOINT;
const projectId = PUBLIC_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint(endpoint) // Your API Endpoint
    .setProject(projectId); // Your project ID

export const account = new Account(client);
export const storage = new Storage(client);


let promise = storage.createDocument(
    '<DATABASE_ID>',
    '<COLLECTION_ID>',
    { 'title': 'My Private Document' },
    [
        Permission.read(Role.user('<USER_ID>')),    // Only this user can read
        Permission.update(Role.user('<USER_ID>')),  // Only this user can update
        Permission.delete(Role.user('<USER_ID>'))   // Only this user can delete
    ]
);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});

// Example usage
// createFile(document.getElementById('uploader').files[0]);