import { Queue } from "bullmq"
import { env } from '../config/env'

const connection = {
    host: new URL (env.REDIS_URL).hostname,
    port: Number(new URL(env.REDIS_URL).port)
}

export const holdExpiryQueue = new Queue('hold-expiry', { connection })