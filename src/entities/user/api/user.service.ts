'use client'
import { baseApi } from '@/app/store'
import { UserEndpoints } from '@/shared/enums'
import { UserProfileType } from '@/entities/user/api'

export const userService = baseApi.injectEndpoints({
   endpoints: builder => ({
      getUserByLogin: builder.query<UserProfileType, string>({
         query: login => ({
            method: 'GET',
            url: `${UserEndpoints.userProfile}/${login}`,
         }),
      }),
   }),
})

export const { useGetUserByLoginQuery } = userService
