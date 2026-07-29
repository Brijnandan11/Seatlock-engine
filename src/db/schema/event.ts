import { pgTable, varchar, pgEnum, index, uuid, timestamp } from "drizzle-orm/pg-core"
import { venues } from "./venue"

export const eventCategoryEnum = pgEnum(
    'event_category',[
        'sports',
        'concert',
        'theater',
        'conference',
        'other'
    ]
)

export const events = pgTable('event',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        venueId: uuid('vendor_id').notNull().references(()=> venues.id , { onDelete: 'restrict'}),
        tittle: varchar('tittle', {length: 255}).notNull(),
        description: varchar('description', {length: 2000}),
        category: eventCategoryEnum('category').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow(),
    },
    (table)=>({
        venueIdidx: index('event_vanueId_idx').on(table.venueId)
    })
    )

export const Event = typeof events.$inferSelect
export const NewEvent = typeof events.$inferInsert