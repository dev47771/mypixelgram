import z from 'zod'

export const userSchema = z.object({
   userId: z.string(),
   userName: z.string(),
   avatar: z.string().nullable(),
})

export const fileSchema = z.object({
   url: z.string().refine(
      val => {
         try {
            new URL(val)
            return true
         } catch {
            return false
         }
      },
      { message: 'Invalid URL' }
   ),
})

export const lastPostSchema = z.object({
   postId: z.string(),
   description: z.string().nullable(),
   location: z.string().nullable(),
   file: fileSchema,
   createdAt: z.string(),
   user: userSchema,
})

export const lastPostsSchema = z.object({
   posts: z.array(lastPostSchema),
})

export type LastPostProps = z.infer<typeof lastPostSchema>
