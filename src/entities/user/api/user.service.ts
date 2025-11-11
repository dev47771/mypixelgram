import { baseApi } from '@/shared/store'
import { UserEndpoints } from '@/shared/enums'
import { UserType } from '@/entities/user'

export const userService = baseApi.injectEndpoints({
   endpoints: builder => ({
      getUserById: builder.query<UserType, string>({
         query: userId => ({
            method: 'GET',
            url: `${UserEndpoints.userProfile}/${userId}`,
         }),
      }),
   }),
})

export const { useGetUserByIdQuery } = userService
