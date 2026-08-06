import { pgTable, pgEnum, uuid, index, varchar, integer, unique, timestamp } from "drizzle-orm/pg-core"
import { events } from "./events"

export const showsStatusEnum = pgEnum('show_status', ['scheduled', 'cancelled', 'completed'])

export  const shows = pgTable(
    'shows',{
        id: uuid('id').primaryKey().defaultRandom(),
        eventId: uuid('event_id').notNull().references(()=> events.id, {onDelete: 'restrict'}),
        startsAt: timestamp('starts_at').notNull(),
        status: showsStatusEnum('status').notNull().default('scheduled'),
        createdAt: timestamp('created_at').notNull().defaultNow(),
        updatedAt: timestamp('updated_at').notNull().defaultNow()
    },
    (table)=>( {
        eventIdIdx : index('shows_event_id_idx').on(table.eventId),
        startIdIdx: index('shows_starts_id_idx').on(table.startsAt)
    })
)

export type Show = typeof shows.$inferSelect
export type NewShow = typeof shows.$inferInsert