import { UploadFileResponse } from '@/features/posts/api'
import { baseApi } from '@/shared/store'

export const settingsService = baseApi.injectEndpoints({
   endpoints: builder => ({
      uploadAvatar: builder.mutation<UploadFileResponse, File[]>({
         query: files => {
            const formData = new FormData()

            files.forEach(file => formData.append('post avatar', file))
            formData.append('avatar', 'post')

            return {
               url: '/files/upload-file',
               method: 'POST',
               body: formData,
            }
         },
      }),
      deleteAvatar: builder.mutation<void, string>({
         query: () => ({
            url: '/users/profile',
            method: 'DELETE',
         }),
         invalidatesTags: ['Profile'],
      }),
   }),
})

export const { useUploadAvatarMutation } = settingsService
