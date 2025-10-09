import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import { MeResponse, SignUpArgs } from '@/features/auth/api'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
      signUp: builder.mutation<void, SignUpArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.signUp,
            body: args,
         }),
      }),
      me: builder.query<MeResponse, void>({
         query: () => ({
            method: 'GET',
            url: AuthEndpoints.me,
         }),
      }),
      logout: builder.mutation<void, void>({
         query: () => ({
            url: AuthEndpoints.logout,
            method: 'POST',
         }),
         async onQueryStarted(_, { queryFulfilled }) {
            try {
               await queryFulfilled
               localStorage.removeItem('accessToken')
            } catch (error) {
               console.error('Logout failed:', error)
            }
         },
      }),
   }),
})

export const { useSignUpMutation, useMeQuery, useLogoutMutation } = authService
