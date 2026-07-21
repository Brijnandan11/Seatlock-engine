import { env } from './config/env'
import app from './app'

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`)
})

export default server
