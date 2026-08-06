import { eq } from 'drizzle-orm';
import { db } from '../lib/db';
import { events, NewEvent } from '../db/schema/events';

export async function insertEvent(data: NewEvent) {
  const result = await db.insert(events).values(data).returning()
  return result[0]
}

export async function findEventById(id: string) {
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1)
  return result[0] ?? null
}