import { serial, varchar, integer, pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable('user', {
    id: serial('id').primaryKey(),
    name: varchar('name', 255).notNull(),
    email: varchar('email', 255).notNull(),
    imageUrl: varchar('imageUrl', 255).notNull(),
    credits: integer('credits').default(3),
});

