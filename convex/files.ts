import { v } from 'convex/values';
import { mutation } from './_generated/server'

export const createFile = mutation({
  args: {
    storageId: v.string(),
    author: v.string(),
  },
  async handler(ctx, args){
    await ctx.db.insert('files', {
      storageId: args.storageId,
      author: args.author,
    });
  },
});