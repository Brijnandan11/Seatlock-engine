import { Request, Response, NextFunction } from 'express'
import { sendError } from '../utils/response'
import { AppError } from '../errors'

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if(err instanceof AppError){
     req.log.error(err)

     return sendError(
       res,
       err.statusCode,
       err.message,
       {
        code: err.code
       }
     )
  }

  req.log.error(err)

  return sendError(
        res,
        500,
        'Internal Server Error',
    )
}

export { errorMiddleware }
