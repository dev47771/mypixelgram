import z from 'zod'

export const publicationSchema = z.object({
   description: z
      .string()
      .max(500, { message: 'Description must be less than 500 characters' })
      .optional(),
   location: z.string().max(20, { message: 'Location must be less than 20 characters' }).optional(),
})
