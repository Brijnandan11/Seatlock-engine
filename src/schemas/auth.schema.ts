import { z } from 'zod'

export const registerSchema = z.object({
    email: z.string().email().max(255).transform((e)=> e.trim().toLowerCase()),
    password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password too long')
    .refine((p) => /[a-z]/.test(p), 'Password must contain a lowercase letter')
    .refine((p) => /[A-Z]/.test(p), 'Password must contain an uppercase letter')
    .refine((p) => /[0-9]/.test(p), 'Password must contain a number'),
})

export const loginSchema = z.object({
    email: z.string().email().max(255).transform((e)=> e.trim().toLowerCase()),
    password: z.string().min(1).max(128)
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>