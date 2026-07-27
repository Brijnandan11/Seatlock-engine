import { Router } from 'express'
import { catchAsync } from '../middlewares/catchAsync'
import { authRateLimiter } from '../middlewares/rateLimiter'
import { registerSchema } from '../schemas/auth.schema'
import { registerUser } from '../services/auth.service'

export const authRouter = Router()

authRouter.post(
  '/register',
  authRateLimiter,
  catchAsync(async (req, res) => {
    const input = registerSchema.parse(req.body)
    const user = await registerUser(input)
    res.status(201).json({ user })
  })
);