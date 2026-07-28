import jwt, { type SignOptions } from 'jsonwebtoken'
import { env } from '../config/env'

export interface JwtPayLoad{
    userId: string,
    role: string
}

export function signToken(payload: JwtPayLoad): string {
     return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
        algorithm: 'HS256',
     })
}
