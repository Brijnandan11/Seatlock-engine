import { Router } from 'express'
import { catchAsync } from '../middlewares/catchAsync'
import { authenticate } from '../middlewares/auth.middleware'
import { requireRole } from '../middlewares/rbac.middleware'
import { createSectionSchema } from '../schemas/section.schema'
import { createSectionWithSeats } from '../services/section.service'

export const sectionRouter = Router()

sectionRouter.post(
  '/sections',
  authenticate,
  requireRole('admin'),
  catchAsync(async (req, res) => {
    const input = createSectionSchema.parse(req.body)
    const result = await createSectionWithSeats(input)
    res.status(201).json(result)
  })
)