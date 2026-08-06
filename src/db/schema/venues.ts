import { pgTable, uuid, timestamp, varchar, integer, index } from "drizzle-orm/pg-core"

export const venues = pgTable(
    "venues",{

        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', { length: 255 }).notNull(),
        address: varchar('address', { length: 500 }).notNull(),
        city: varchar('city', { length: 100 }).notNull(),
        totalCapacity: integer('total_capacity').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow(),

    },(table)=>({
        cityIdx: index('venues_city_idx').on(table.city)
    })
)

export type Venue = typeof venues.$inferSelect
export type NewVenue = typeof venues.$inferInsert
