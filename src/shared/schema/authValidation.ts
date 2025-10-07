import { z } from 'zod'

export const passwordSchema = z
   .string()
   .min(6, 'Minimum number of characters 6')
   .max(20, 'Maximum number of characters 20')
   .regex(/^(?=.*[0-9])/, 'Password must contain at least one digit (0-9)')
   .regex(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter (a-z)')
   .regex(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter (A-Z)')
   .regex(/^[a-zA-Z0-9!@#$%^&*()_+-={};':"|,.<>/?~`]*$/, 'Password contains invalid characters')
