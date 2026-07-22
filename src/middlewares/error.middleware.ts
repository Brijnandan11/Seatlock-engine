import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/response'

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  req.log.error(err)

  return sendError(res, 500, 'Internal server error')
}

export { errorMiddleware }
