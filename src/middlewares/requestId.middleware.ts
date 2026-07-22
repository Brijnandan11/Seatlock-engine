import { randomUUID } from "crypto"
import { NextFunction, Request, Response} from "express"

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction){

    const requestId = randomUUID()
    
    req.headers['x-request-id'] = requestId
    res.setHeader('X-Request-ID', requestId)

    next()
}