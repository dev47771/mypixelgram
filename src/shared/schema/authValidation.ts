import { z } from 'zod'

export const usernameRegex = new RegExp('^[0-9A-Za-z_-]+$')

export const usernameSchema = z
   .string()
   .min(6, 'Minimum number of characters is 6')
   .max(30, 'Maximum number of characters is 30')
   .regex(usernameRegex, 'Only letters, numbers, underscores and dashes allowed')

export const emailSchema = z.email({
   message: 'The email must match the format example@example.com',
})
