import { baseApi } from '@/shared/store'
import { CountriesResponse, getProfileResponse, updateProfileArgs } from './settings.types'
import { UserEndpoints } from '@/entities/user'

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
   }),
})

export const { useUpdateProfileMutation, useGetProfileQuery, useGetCountriesWithCitiesQuery } =
   settingsService
