import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// List all files
export const list = query({
  args: {},
  handler: async (ctx) => {
    const files = await ctx.db.query("files").collect();
    return Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.storageId),
      }))
    );
  },
});

// Generate an upload URL
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Send an image
export const sendImage = mutation({
  args: { storageId: v.id("_storage"), author: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", {
      storageId: args.storageId,
      author: args.author,
    });
  },
});
