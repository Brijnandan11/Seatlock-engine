import { eq } from 'drizzle-orm'
import { db } from '../lib/db'
import { venues, NewVenue } from '../db/schema/venues'

export async function insertVenue(data: NewVenue) {
    const result = await db.insert(venues).values(data).returning()
    return result[0]
}

export async function findVenueById(id: string) {
    const result = await db.select().from(venues).where(eq(venues.id, id)).limit(1)
    return result[0] ?? null
}

export async function findAllVenues() {
    return db.select().from(venues)
}