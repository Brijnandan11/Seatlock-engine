import { Response, Request, NextFunction } from "express"
import { AppError } from "../errors"
import { logger } from "../lib/logger"
import { env } from "../config/env"

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
){

    if(err instanceof AppError && err.isOperational){
        logger.warn({err, reqId: req.id}, "Operational error")

        return res.status(err.httpStatus).json({
            error: {
                code: err.code,
                message: err.message,
                details: err.details
            }
        })
    }
    logger.error({ err, reqId: req.id }, 'Unhandled error')

    return res.status(500).json({
        error:{
            code: "INTERNAL_ERROR",
            message: env.NODE_ENV === "production" ? "Somehting went wrong" : err.message
        }
    })
        
}