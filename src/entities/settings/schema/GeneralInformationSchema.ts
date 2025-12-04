import z from 'zod'

export const generalInformationSchema = z.object({
   login: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters' })
      .max(30, { message: 'Username must not exceed 30 characters' })
      .regex(/^[a-zA-Z0-9_-]+$/, {
         message: 'Username can only contain letters, numbers, underscores (_) and hyphens (-)',
      }),
   firstName: z
      .string()
      .min(1, { message: 'Required field' })
      .max(50, { message: 'Maximum 50 characters' })
      .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, { message: 'Only letters, spaces and hyphens allowed' }),
   lastName: z
      .string()
      .min(1, { message: 'Required field' })
      .max(50, { message: 'Maximum 50 characters' })
      .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, { message: 'Only letters, spaces and hyphens allowed' }),
   dateOfBirth: z
      .string()
      .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Format dd.mm.yyyy')
      .refine(
         date => {
            const [day, month, year] = date.split('.').map(Number)
            const d = new Date(year, month - 1, day)
            return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
         },
         { message: 'Invalid date' }
      ),
   country: z.string().optional(),
   city: z.string().optional(),
   aboutMe: z
      .string()
      .max(200, { message: 'Maximum 200 characters' })
      .regex(/^[\s\S]{0,200}$/, { message: 'Letters, numbers and special characters allowed' })
      .optional(),
})
