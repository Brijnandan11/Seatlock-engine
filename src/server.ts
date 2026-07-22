import { env } from './config/env'
import app from './app'
import { logger } from './config/logger'

const server = app.listen(env.PORT, () => {
  logger.info(`Server id running on port ${env.PORT}`)
})

export default server
