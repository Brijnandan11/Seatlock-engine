import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../errors'

// this middleware check the role of the user 
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'))
    }
    next()
  }
}