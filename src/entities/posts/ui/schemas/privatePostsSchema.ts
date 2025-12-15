import z from 'zod'

const fileSchema = z.object({
   firstFileUrl: z
      .string()
      .nullable()
      .refine(
         val => {
            if (!val) return true
            try {
               new URL(val)
               return true
            } catch {
               return false
            }
         },
         { message: 'Invalid URL' }
      ),
   postId: z.string(),
})
const pageInfoSchema = z.object({
   nextCursor: z.string().nullable(),
   hasMore: z.boolean(),
})

export const privatePostsSchema = z.object({
   publications: z.array(fileSchema),
   pageInfo: pageInfoSchema,
})
