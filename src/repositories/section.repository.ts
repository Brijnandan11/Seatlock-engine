import { db } from "../lib/db"
import { sections, NewSection } from "../db/schema/section"
import { seats, NewSeat } from "../db/schema/seats"

export async function insertSection(data: NewSection, tx: typeof db = db) {
  const result = await tx.insert(sections).values(data).returning()
  return result[0]
}

export async function insertSeatsBulk(seatRows: NewSeat[], tx: typeof db = db) {
    if (seatRows.length === 0) return []
    return tx.insert(seats).values(seatRows).returning()
}