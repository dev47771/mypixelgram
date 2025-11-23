import { baseApi } from '@/shared/store'
import { CreatePostResponse, UploadFileResponse, UploadPostRequest } from './post.types'

export const postService = baseApi.injectEndpoints({
   endpoints: builder => ({
      uploadFile: builder.mutation<UploadFileResponse, File[]>({
         query: files => {
            const formData = new FormData()

            files.forEach(file => formData.append('post images', file))
            formData.append('type', 'post')

            return {
               url: '/files/upload-file',
               method: 'POST',
               body: formData,
            }
         },
      }),

      uploadPostData: builder.mutation<CreatePostResponse, UploadPostRequest>({
         query: postData => ({
            url: '/posts',
            method: 'POST',
            body: postData,
         }),
      }),
   }),
})

export const { useUploadFileMutation, useUploadPostDataMutation } = postService
