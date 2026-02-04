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
      .regex(/^(?!\s)(?!.*\s$)(?!.*\s\s)[a-zA-Zа-яА-ЯёЁ\s'-]+$/, {
         message:
            'Only letters, spaces, hyphens and apostrophes. No leading/trailing/double spaces.',
      }),
   lastName: z
      .string()
      .min(1, { message: 'Required field' })
      .max(50, { message: 'Maximum 50 characters' })
      .regex(/^(?!\s)(?!.*\s$)(?!.*\s\s)[a-zA-Zа-яА-ЯёЁ\s'-]+$/, {
         message:
            'Only letters, spaces, hyphens and apostrophes. No leading/trailing/double spaces.',
      }),
   dateOfBirth: z
      .string()
      .refine(
         val => {
            if (!val) return true
            // Проверяем формат dd.mm.yyyy (точно 10 символов)
            return val.length === 10 && /^\d{2}\.\d{2}\.\d{4}$/.test(val)
         },
         { message: 'Format dd.mm.yyyy' }
      )
      .refine(
         date => {
            if (!date) return false
            const [day, month, year] = date.split('.').map(Number)

            // Проверяем корректность чисел
            if (isNaN(day) || isNaN(month) || isNaN(year)) return false
            if (day < 1 || day > 31) return false
            if (month < 1 || month > 12) return false

            // Проверяем, что год 4-значный и реалистичный для даты рождения
            const currentYear = new Date().getFullYear()
            if (year < 1900 || year > currentYear) return false

            const d = new Date(year, month - 1, day)
            return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day
         },
         { message: 'Invalid date' }
      )
      .refine(
         date => {
            if (!date) return false
            const [day, month, year] = date.split('.').map(Number)
            const birthDate = new Date(year, month - 1, day)
            const today = new Date()
            return birthDate <= today
         },
         { message: 'Date cannot be in the future' }
      )
      .refine(
         date => {
            if (!date) return false
            const [day, month, year] = date.split('.').map(Number)
            const birthDate = new Date(year, month - 1, day)
            const today = new Date()
            const age = today.getFullYear() - birthDate.getFullYear()
            const m = today.getMonth() - birthDate.getMonth()
            const d = today.getDate() - birthDate.getDate()
            return age > 13 || (age === 13 && (m > 0 || (m === 0 && d >= 0)))
         },
         { message: 'A user under 13 cannot create a profile.' }
      ),
   country: z.string().optional(),
   city: z.string().optional(),
   aboutMe: z
      .string()
      .max(200)
      .regex(/^[\s\S]{0,200}$/)
      .optional(),
})
