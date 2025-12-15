import z from 'zod'

const userSchema = z.object({
   id: z.string(),
   login: z.string(),
   avatar: z.string().nullable(),
})

export const userProfileSchema = z.object({
   user: userSchema,
   publicationCount: z.number(),
   followers: z.number(),
   following: z.number(),
   description: z.string().nullable(),
})
