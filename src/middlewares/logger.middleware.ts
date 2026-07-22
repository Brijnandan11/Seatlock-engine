import pinoHttp from 'pino-http'
import { logger } from '../config/logger'

export const loggerMiddleware = pinoHttp({
    logger,
})