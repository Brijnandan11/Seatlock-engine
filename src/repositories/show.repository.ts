import { eq } from "drizzle-orm"
import { shows, NewShow } from "../db/schema/shows"
import { db } from "../lib/db"

export async function insertShow(data: NewShow) {
    const result = await db.insert(shows).values(data).returning()
    return result[0]
}

export async function findShowById(id: string) {
    const result = await db.select().from(shows).where(eq(shows.id, id)).limit(1)
    return result[0] ?? null
}