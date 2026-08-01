import Redis from "ioredis"
import { env } from '../config/env'
import { logger } from "./logger"

export const redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest:3,
    retryStrategy(times) {
        const delay = Math.min(times * 200, 2000)
        logger.warn({attempts: times, delay}, "Redis reconnect attempt")
        return delay
    },
})

redis.on('error', (error)=> logger.error({error}, "Redis client error"))
redis.on('connect', () => logger.info("Redis connected"))

export async function checkRedisConnection(): Promise<boolean> {
  try {
    const pong = await redis.ping();
    return pong === 'PONG';
  } catch (err) {
    logger.error({ err }, 'Redis health check failed');
    return false;
  }
}