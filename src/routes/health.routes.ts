import { Router } from "express"
import { catchAsync } from "../middlewares/catchAsync"
import { checkDatabaseConnection } from "../lib/db"
import { checkRedisConnection } from "../lib/redis"

const healthRouter = Router()

healthRouter.get("/health", (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
})

healthRouter.get("/ready", catchAsync(async (req, res) => {
    const [ dbOk, redisOk ] = await Promise.all([
        checkDatabaseConnection(),
        checkRedisConnection()
    ])

    const ready = dbOk && redisOk

    res.status(ready ? 200 : 503).json({
    status: ready ? 'ready' : 'not_ready',
    checks: { db: dbOk, redis: redisOk },

  })
}))

