import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import { MeResponse, SignUpArgs } from '@/features/auth/api'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
      me: builder.query<MeResponse, void>({
         query: () => ({
            method: 'GET',
            url: AuthEndpoints.me,
         }),
      }),
      signUp: builder.mutation<void, SignUpArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.signUp,
            body: args,
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
            } catch (e) {
               console.warn('Logout request failed, continuing...', e)
            } finally {
               localStorage.removeItem('accessToken')
            }
         },
      }),
   }),
})

export const { useSignUpMutation, useMeQuery, useLogoutMutation } = authService
