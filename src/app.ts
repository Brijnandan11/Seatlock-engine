import express, { Router } from 'express'
import { pinoHttp } from 'pino-http'
import { logger } from './lib/logger'
import { healthRouter } from './routes/health.routes'
import { errorHandler } from './middlewares/errorHandler'

export const app = express()

app.use(express.json())
app.use(pinoHttp({logger}))

app.use(healthRouter)

app.use(errorHandler)