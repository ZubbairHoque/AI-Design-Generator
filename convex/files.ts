

import { v } from 'convex/values';
import { mutation } from './_generated/server'

export const createFile = mutation({
  args: {
    storageId: v.string(),
    author: v.string(),
  },
  async handler(ctx, args){
    await ctx.db.insert('files', {
      storageId: 'someStorageId', // replace with actual storage ID
      author: 'someAuthor', // replace with actual author
    })
  },
});