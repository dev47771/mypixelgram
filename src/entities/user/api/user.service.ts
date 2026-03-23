'use client'
import { baseApi } from '@/app/store'
import { AuthEndpoints, UserEndpoints } from '@/shared/enums'
import { MeResponse, UserProfileType } from './user.types'

export const userService = baseApi.injectEndpoints({
   endpoints: builder => ({
      me: builder.query<MeResponse, void>({
         query: () => ({
            method: 'GET',
            url: AuthEndpoints.me,
         }),
         providesTags: ['Me'],
      }),
      getUserByLogin: builder.query<UserProfileType, string>({
         query: login => ({
            method: 'GET',
            url: `${UserEndpoints.userProfile}/${login}`,
         }),
      }),
   }),
})

export const { useMeQuery, useGetUserByLoginQuery } = userService
