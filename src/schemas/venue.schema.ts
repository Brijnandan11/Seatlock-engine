import { z } from 'zod'

export const createVenueSchema = z.object({
    name: z.string().min(1).max(255),
    address: z.string().min(1).max(500),
    city: z.string().min(1).max(100),
    totalCapacity: z.number().int().positive(),
})

export type createVenueInput = z.infer<typeof createVenueSchema>
