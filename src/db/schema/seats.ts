import { pgTable, uuid, pgEnum, varchar, integer, index, unique } from "drizzle-orm/pg-core"
import { sections } from "./section"

export const seats = pgTable(
    'seats',{
        id: uuid('id').primaryKey().defaultRandom(),
        sectionId: uuid('section_id').notNull().references(()=> sections.id, { onDelete: 'cascade'}),
        rowLabel: varchar('row_lebel', {length: 5 }).notNull(),
        seatNumber: integer('seat_number').notNull()
    },
    (table)=> ({
        sectionIdIdx: index('section_id_idx').on(table.sectionId),
        uniqueSeatPerSection: unique('unique_seat_per_section').on(
      table.sectionId,
      table.rowLabel,
      table.seatNumber
    )
    })
)

export const Seat = typeof seats.$inferSelect
export const NewSeat = typeof seats.$inferInsert