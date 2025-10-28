import { z } from 'zod'

export const MAX_FILE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export function imgSchema(fieldName: string) {
   return z.object({
      [fieldName]: z
         .instanceof(FileList)
         .refine(
            files => !files.length || (files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
            '.jpg, .jpeg, .png and .webp files are accepted.'
         )
         .refine(
            files => !files.length || (files[0] && files[0].size <= MAX_FILE_SIZE),
            `Max file size is 5MB.`
         ),
   })
}
