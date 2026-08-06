import { z } from 'zod'

export const createEventSchema = z.object({
  venueId: z.string().uuid(),
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  category: z.enum(['concert', 'sports', 'theater', 'conference', 'other']),
})

export type CreateEventInput = z.infer<typeof createEventSchema>