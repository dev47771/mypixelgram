import z from "zod"


const fileSchema = z.object({
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
    fileId: z.string(),
})

const publicPostSchema = z.object({
    postId: z.string(),
    description: z.string().nullable(),
    location: z.string().nullable(),
    files: z.array(fileSchema),
    createdAt: z.string(),
})

export const publicPostsSchema = z.array(publicPostSchema)

export type publicPostsType = z.infer<typeof publicPostsSchema>
