import { UploadFileResponse } from '@/features/posts/api'
import { baseApi } from '@/shared/store'

export const settingsService = baseApi.injectEndpoints({
   endpoints: builder => ({
      uploadAvatar: builder.mutation<UploadFileResponse, File[]>({
         query: files => {
            const formData = new FormData()

            formData.append('post images', files[0])
            formData.append('type', 'avatar')

            return {
               url: '/files/upload-file',
               method: 'POST',
               body: formData,
            }
         },
      }),
      deleteAvatar: builder.mutation<void, void>({
         query: () => ({
            url: '/users/profile',
            method: 'DELETE',
         }),
         invalidatesTags: ['Profile'],
      }),
   }),
})

export const { useUploadAvatarMutation, useDeleteAvatarMutation } = settingsService
