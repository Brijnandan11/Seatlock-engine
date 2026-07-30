import { pgTable, uuid, varchar, integer, numeric, index } from 'drizzle-orm/pg-core';
import { shows } from './shows';

export const sections = pgTable(
  'sections',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    showId: uuid('show_id')
      .notNull()
      .references(() => shows.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 100 }).notNull(),
    priceInCents: integer('price_in_cents').notNull(),
    totalRows: integer('total_rows').notNull(),
    seatsPerRow: integer('seats_per_row').notNull(),
  },
  (table) => ({
    showIdIdx: index('sections_show_id_idx').on(table.showId),
  })
);

export type Section = typeof sections.$inferSelect;
export type NewSection = typeof sections.$inferInsert;