import { emailSchema, passwordSchema, usernameSchema } from '@/shared/schema'
import { z } from 'zod'

export const createNewPasswordSchema = z
   .object({
      password: passwordSchema,
      confirmPassword: passwordSchema,
   })
   .refine(data => data.password === data.confirmPassword, {
      message: 'The passwords must match',
      path: ['confirmPassword'],
   })

export const forgotPasswordSchema = z.object({
   email: z.email(),
})

export const signInSchema = z.object({
   email: z.email({ error: 'The email must match the format example@example.com' }),
   password: z.string({ error: 'The email or password are incorrect. Try again please' }),
})

export const signUpSchema = z
   .object({
      login: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
      isAgreeWithPrivacy: z.boolean(),
   })
   .refine(date => date.password === date.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
   })

export const verificationExpiredSchema = z.object({
   email: emailSchema,
})
