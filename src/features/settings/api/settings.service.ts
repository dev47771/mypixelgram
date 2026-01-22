import { UserEndpoints } from '@/entities/user'
import { UploadFileResponse } from '@/features/posts/api'
import { FilesEndpoints, UsersEndpoints } from '@/shared/enums'
import { baseApi } from '@/shared/store'
import {
   CountriesResponse,
   PaymentsResponse,
   updateProfileArgs,
   getDevicesResponse,
   getProfileResponse,
} from './settings.types'
import { PaymentsEndpoints } from '@/shared/enums/paymentsEndpoints'

export const settingsService = baseApi.injectEndpoints({
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
      getDevices: builder.query<getDevicesResponse, void>({
         query: () => ({
            url: UserEndpoints.devices,
         }),
         providesTags: ['Device'],
      }),
      deleteDeviceById: builder.mutation<void, { deviceId: string }>({
         query: ({ deviceId }) => ({
            url: `${UserEndpoints.devices}/${deviceId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Device'],
      }),
      deleteOtherDevices: builder.mutation<void, void>({
         query: () => ({
            url: UserEndpoints.devices,
            method: 'DELETE',
         }),
         invalidatesTags: ['Device'],
      }),
      getPayments: builder.query<PaymentsResponse, { page: number; limit: number }>({
         query: ({ page, limit }) => ({
            url: PaymentsEndpoints.paymentsList,
            params: { page, limit },
         }),
      }),
   }),
})

export const {
   useUpdateProfileMutation,
   useGetProfileQuery,
   useGetCountriesWithCitiesQuery,
   useDeleteAvatarMutation,
   useUploadAvatarMutation,
   useGetDevicesQuery,
   useDeleteDeviceByIdMutation,
   useDeleteOtherDevicesMutation,
   useGetPaymentsQuery,
} = settingsService
