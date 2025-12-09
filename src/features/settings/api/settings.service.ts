import { baseApi } from '@/shared/store'
import { CountriesResponse, getProfileResponse, updateProfileArgs } from './settings.types'

export const settingsService = baseApi.injectEndpoints({
   endpoints: builder => ({
      updateProfile: builder.mutation<void, updateProfileArgs>({
         query: profileData => ({
            url: '/users/profile',
            method: 'PUT',
            body: profileData,
         }),
         invalidatesTags: ['Profile'],
      }),
      getProfile: builder.query<getProfileResponse, void>({
         query: () => ({
            url: '/users/profile',
         }),
         providesTags: ['Profile'],
      }),
      getCountriesWithCities: builder.query<CountriesResponse, void>({
         query: () => ({
            url: '/public/users/getCountriesWithCities',
         }),
      }),
   }),
})

export const { useUpdateProfileMutation, useGetProfileQuery, useGetCountriesWithCitiesQuery } =
   settingsService
