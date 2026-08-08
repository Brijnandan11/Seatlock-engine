import express, { Router } from 'express'
import { pinoHttp } from 'pino-http'
import { logger } from './lib/logger'
import { healthRouter } from './routes/health.routes'
import { errorHandler } from './middlewares/errorHandler'
import { authRouter } from './routes/auth.routes'
import { sectionRouter } from './routes/section.routes'
import { eventRouter } from './routes/event.routes'
import { venueRouter } from './routes/venue.routes'
import { showRouter } from './routes/show.routes'


export const app = express()

app.use(express.json())
app.use(pinoHttp({logger}))

app.use(healthRouter)
app.use('/auth', authRouter)

app.use('/v1', sectionRouter)
app.use('/v1', venueRouter);
app.use('/v1', eventRouter);
app.use('/v1', showRouter);


app.use(errorHandler)
