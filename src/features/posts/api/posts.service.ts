import { baseApi } from '@/shared/store'
import { CreatePostResponse, UploadFileResponse, CreatePostRequest } from './post.types'

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

      createPostData: builder.mutation<CreatePostResponse, CreatePostRequest>({
         query: postData => ({
            url: '/posts',
            method: 'POST',
            body: postData,
         }),
      }),
   }),
})

export const { useUploadFileMutation, useCreatePostDataMutation } = postService
