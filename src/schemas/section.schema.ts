import { z } from "zod"

export const createSectionSchema = z.object({
    showId: z.string().uuid(),
    name: z.string().min(1).max(100),
    priceInCents: z.number().int().positive(),
    totalRows: z.number().int().max(26),
    seatsPerRow: z.number().int().max(100)
})

export type createSectionInput = z.infer<typeof createSectionSchema>