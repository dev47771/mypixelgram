'use client'
import { baseApi } from '@/shared/store'
import { getDevicesResponse } from './settings.types'
import { UserEndpoints } from '@/shared/enums'

export const devicesService = baseApi.injectEndpoints({
   endpoints: builder => ({
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
   }),
})

export const { useGetDevicesQuery, useDeleteDeviceByIdMutation, useDeleteOtherDevicesMutation } =
   devicesService
