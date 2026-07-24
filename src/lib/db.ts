import postgres from "postgres"
import { drizzle } from 'drizzle-orm/postgres-js'
import { logger  } from "./logger"
import { env } from "../config/env"

const queryClient = postgres(env.DATABASE_URL, {
    max: 10,
    onnotice: () => {},
})

export const db = drizzle(queryClient)

export async function checkDatabaseConnection(): Promise<boolean>{
    try {
        await queryClient `SELECT 1`
        return true
    } catch (err) {
        logger.error({err}, "DB health check failed")
        return false
    }
}