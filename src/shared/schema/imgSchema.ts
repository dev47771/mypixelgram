import { z } from 'zod'

export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export function imgSchema(fieldName: string) {
   return z.object({
      [fieldName]: z
         .instanceof(FileList)
         .refine(
            files => !files.length || (files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
            'The format of the uploaded photo must be\n' + 'PNG and JPEG'
         )
         .refine(
            files => !files.length || (files[0] && files[0].size <= MAX_FILE_SIZE),
            `Max file size is 5MB.`
         ),
   })
}
