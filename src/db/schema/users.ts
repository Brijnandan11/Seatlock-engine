import { pgTable, uuid, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core"

export const roleEnum = pgEnum('role', ['user', 'admin'])

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', {length: 255}).notNull().unique(),
    passwordHah: varchar("password_hash", {length: 255}).notNull(),
    role: roleEnum('role').notNull().default('user'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert