import { baseApi } from '@/shared/store'

export const postdService = baseApi.injectEndpoints({
   endpoints: builder => ({
      uploadFile: builder.mutation<void, { files: string[] }>({
         query: formData => ({
            url: '/files/upload',
            method: 'POST',
            body: formData,
         }),
      }),

      uploadPostData: builder.mutation<void, { description?: string; location?: string }>({
         query: postData => ({
            url: '/posts',
            method: 'POST',
            body: postData,
         }),
      }),
   }),
})

export const { useUploadFileMutation, useUploadPostDataMutation } = postdService
