import { eq } from 'drizzle-orm'
import { db } from '../lib/db'
import { users, NewUser} from '../db/schema/users'

export async function findUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] ?? null
}

const PG_UNIQUE_VIOLATION = '23505'

export async function createUser(data: NewUser) {
    try {
        const result = await db.insert(users).values(data).returning()
         return result[0]
    } catch (err: any) {
        if(err?.code === PG_UNIQUE_VIOLATION){
            throw new Error("DUPLICATE_EMAIL")
        }
        throw err
    }
}