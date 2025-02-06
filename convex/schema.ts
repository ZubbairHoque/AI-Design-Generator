import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    storageId: v.id("_storage"),
    fileName: v.string(),
    userId: v.string(),
    uploadedAt: v.string(),
  }).index('by_userId', ['userId']),
});