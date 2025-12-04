import { baseApi } from '@/shared/store'
import { CountriesResponse, updateProfileArgs } from './settings.types'

export const settingsService = baseApi.injectEndpoints({
   endpoints: builder => ({
      updateProfile: builder.mutation<void, updateProfileArgs>({
         query: profileData => ({
            url: '/users/profile',
            method: 'PUT',
            body: profileData,
         }),
      }),
      getCountriesWithCities: builder.query<CountriesResponse, void>({
         query: () => ({
            method: 'GET',
            url: '/public/users/getCountriesWithCities',
         }),
      }),
   }),
})

export const { useUpdateProfileMutation, useGetCountriesWithCitiesQuery } = settingsService
