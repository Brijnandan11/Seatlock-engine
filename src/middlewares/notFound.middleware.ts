import { Request, Response } from 'express'
import { sendError } from '../utils/response'

const notFoundMiddleware = (req: Request, res: Response) => {
  return sendError(res, 404, 'Route not found')
}

export { notFoundMiddleware }
