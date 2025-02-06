import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';

export const uploadFile = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    
    // Check if the user is authenticated
    if (!identity) {
      throw new ConvexError('Not authenticated to upload a file');
    }  

    const fileId = await ctx.db.insert('files', {
      storageId: args.storageId,
      fileName: args.fileName,
      userId: identity.subject,
      uploadedAt: new Date().toISOString(),
    });

    return fileId; 
  }
});

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError('Not authenticated');
  }
  return await ctx.storage.generateUploadUrl();
});