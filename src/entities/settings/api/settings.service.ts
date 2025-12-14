import { UploadFileResponse } from '@/features/posts/api'
import { FilesEndpoints, UsersEndpoints } from '@/shared/enums'
import { baseApi } from '@/shared/store'
import { getProfileResponse } from './settings.types'

export const settingsService = baseApi.injectEndpoints({
   endpoints: builder => ({
      uploadAvatar: builder.mutation<UploadFileResponse, File[]>({
         query: files => {
            const formData = new FormData()

            formData.append('post images', files[0])
            formData.append('type', 'avatar')

            return {
               url: FilesEndpoints.uploadFiles,
               method: 'POST',
               body: formData,
            }
         },
         invalidatesTags: ['Profile'],
      }),
      deleteAvatar: builder.mutation<void, void>({
         query: () => ({
            url: UsersEndpoints.profile,
            method: 'DELETE',
         }),
         invalidatesTags: ['Profile'],
      }),
      getProfile: builder.query<getProfileResponse, void>({
         query: () => ({
            url: UsersEndpoints.profile,
         }),
         providesTags: ['Profile'],
      }),
   }),
})

export const { useUploadAvatarMutation, useDeleteAvatarMutation, useGetProfileQuery } =
   settingsService
