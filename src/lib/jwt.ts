import jwt, { type SignOptions } from 'jsonwebtoken'
import { env } from '../config/env'
import { InvalidTokenError, TokenExpiredError } from '../errors'

export interface JwtPayload{
    userId: string,
    role: string
}

export function signToken(payload: JwtPayload): string {
     return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
        algorithm: 'HS256',
     })
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET, { algorithms: ['HS256'] }) as JwtPayload;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new TokenExpiredError();
    }
    throw new InvalidTokenError();
  }
}