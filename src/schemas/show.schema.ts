import { z } from "zod"

export const createShowSchema = z.object({
    eventId: z.string().uuid(),
    startsAt: z.string().datetime(),
    status: z.enum(['scheduled', 'cancelled', 'completed']).default('scheduled')
})

export type createShowInput = z.infer<typeof createShowSchema>