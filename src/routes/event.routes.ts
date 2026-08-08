import { Router, Request } from 'express';
import { catchAsync } from '../middlewares/catchAsync';
import { authenticate } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';
import { createEventSchema } from '../schemas/event.schema';
import { createEvent, getEventById } from '../services/event.service';

export const eventRouter = Router();

eventRouter.post(
  '/events',
  authenticate,
  requireRole('admin'),
  catchAsync(async (req, res) => {
    const input = createEventSchema.parse(req.body);
    const event = await createEvent(input);
    res.status(201).json({ event });
  })
);

eventRouter.get(
  '/events/:id',
  catchAsync(async (req, res) => {
    const event = await getEventById(req.params.id as string);
    res.status(200).json({ event });
  })
);