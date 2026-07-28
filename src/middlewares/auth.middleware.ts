import { Request, Response, NextFunction } from 'express'
import { verifyToken, JwtPayload } from '../lib/jwt'
import { UnauthorizedError } from '../errors'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or malformed token'))
  }

  const token = header.slice('Bearer '.length)

  try {
    req.user = verifyToken(token)
    next()
  } catch (err) {
    next(err)
  }
}