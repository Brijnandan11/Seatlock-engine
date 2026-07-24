import { z } from 'zod'
import dotenv from 'dotenv'

const envSchema = z.object({

    NODE_ENV: z.enum(["development","test","production"]).default("development"),
    PORT: z.coerce.number().default(3000),

    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),

    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info')
})

const parsed = envSchema.safeParse(process.env)

if(!parsed.success){
    console.error("'Invalid environment variables:'")
    console.error(parsed.error.flatten().fieldErrors)
    process.exit(1)
}

export const env = parsed.data