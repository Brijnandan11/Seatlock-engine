import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    REDIS_URL: z.string(),
    LOG_LEVEL: z.string(),
    JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)