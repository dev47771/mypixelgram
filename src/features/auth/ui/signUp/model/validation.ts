import { z } from 'zod'
import {
   confirmPasswordSchema,
   emailSchema,
   passwordSchema,
   usernameSchema,
} from '@/shared/lib/zod'

export const signUpSchema = z
   .object({
      name: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
      termsAccepted: z.boolean(),
   })
   .refine(date => date.password === date.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
   })
