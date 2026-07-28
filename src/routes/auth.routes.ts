import { Router } from 'express'
import { catchAsync } from '../middlewares/catchAsync'
import { authRateLimiter } from '../middlewares/rateLimiter'
import { authenticate } from '../middlewares/auth.middleware'
import { registerSchema, loginSchema } from '../schemas/auth.schema'
import { registerUser, loginUser } from '../services/auth.service'
import { signToken } from '../lib/jwt'

export const authRouter = Router()

authRouter.post(
  '/register',
  authRateLimiter,
  catchAsync(async (req, res) => {
    const input = registerSchema.parse(req.body)
    const user = await registerUser(input)
    res.status(201).json({ user })
  })
)

authRouter.post(
  '/login',
  authRateLimiter,
  catchAsync(async (req, res) => {
    const input = loginSchema.parse(req.body)
    const user = await loginUser(input)

    const token = signToken({ userId: user.id, role: user.role })

    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    })
  })
)

authRouter.get(
  '/me',
  authenticate,
  catchAsync(async (req, res) => {
    res.status(200).json({ user: req.user })
  })
)