import pinoHttp from 'pino-http'
import { logger } from '../config/logger'

export const loggerMiddleware = pinoHttp({
    logger,

    serializers: {
        req(req) {
            return {
                id: req.headers['x-request-id'],
                method: req.method,
                url: req.url,
            }
        },

        res(res) {
            return {
                statusCode: res.statusCode,
            }
        },
    },

    customSuccessMessage() {
        return 'Request completed'
    },

    customErrorMessage() {
        return 'Request failed'
    },
})