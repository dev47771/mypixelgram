'use client'
import { baseApi } from '@/shared/store'
import { CountriesResponse, getProfileResponse, updateProfileArgs } from './settings.types'
import { UserEndpoints } from '@/entities/user'
import { UploadFileResponse } from '@/features/posts/api'
import { FilesEndpoints, UsersEndpoints } from '@/shared/enums'

export const profileService = baseApi.injectEndpoints({
   endpoints: builder => ({
      updateProfile: builder.mutation<void, updateProfileArgs>({
         query: profileData => ({
            url: UserEndpoints.settings,
            method: 'PUT',
            body: profileData,
         }),
         invalidatesTags: ['Profile'],
      }),
      getProfile: builder.query<getProfileResponse, void>({
         query: () => ({
            url: UserEndpoints.settings,
         }),
         providesTags: ['Profile'],
      }),
      getCountriesWithCities: builder.query<CountriesResponse, void>({
         query: () => ({
            url: UserEndpoints.countriesWithCities,
         }),
      }),
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
   }),
})

export const {
   useUpdateProfileMutation,
   useGetProfileQuery,
   useGetCountriesWithCitiesQuery,
   useDeleteAvatarMutation,
   useUploadAvatarMutation,
} = profileService
