import { baseApi } from '@/shared/store'
import { UserEndpoints } from '@/shared/enums'
import { UserProfileType } from '@/entities/user'

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
