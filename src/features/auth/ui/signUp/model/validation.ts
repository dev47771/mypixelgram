import { z } from 'zod'
import { emailSchema, usernameSchema } from '@/shared/schema'

export const signUpSchema = z
   .object({
      name: usernameSchema,
      email: emailSchema,
      password: z.string(),
      confirmPassword: z.string(),
      termsAccepted: z.boolean(),
   })
   .refine(date => date.password === date.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
   })
