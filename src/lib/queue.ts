import { Queue } from "bullmq"
import { env } from '../config/env'
import { connect } from "node:http2"

const connection = {
    host: new URL (env.REDIS_URL).hostname,
    port: Number(new URL(env.REDIS_URL).port)
}

export const holdExpiryQueue = new Queue('hold-expiry', { connection })