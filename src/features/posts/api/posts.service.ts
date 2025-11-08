import { baseApi } from '@/shared/store'
import { UploadPostRequest } from './post.types'

export const postService = baseApi.injectEndpoints({
   endpoints: builder => ({
      uploadFile: builder.mutation<{ fields: string[] }, File[]>({
         query: files => {
            const formData = new FormData()
            files.forEach(file => formData.append('files', file))
            return {
               url: '/files/upload',
               method: 'POST',
               body: formData,
            }
         },
      }),

      uploadPostData: builder.mutation<void, UploadPostRequest>({
         query: postData => ({
            url: '/posts',
            method: 'POST',
            body: postData,
         }),
      }),
   }),
})

export const { useUploadFileMutation, useUploadPostDataMutation } = postService
