import { pgTable, varchar, pgEnum, index, uuid, timestamp } from "drizzle-orm/pg-core"
import { venues } from "./venues"

export const eventCategoryEnum = pgEnum(
    'event_category',[
        'sports',
        'concert',
        'theater',
        'conference',
        'other'
    ]
)

export const events = pgTable('events',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        venueId: uuid('venue_id').notNull().references(()=> venues.id , { onDelete: 'restrict'}),
        tittle: varchar('tittle', {length: 255}).notNull(),
        description: varchar('description', {length: 2000}),
        category: eventCategoryEnum('category').notNull(),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow(),
    },
    (table)=>({
        venueIdIdx: index('events_venue_id_idx').on(table.venueId)
    })
    )

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert