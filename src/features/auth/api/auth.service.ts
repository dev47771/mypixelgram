import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import { type SignInArgs, type SignInResponse, SignUpArgs } from '@/features/auth/api'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
      signUp: builder.mutation<void, SignUpArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.signUp,
            body: args,
         }),
      }),
      login: builder.mutation<SignInResponse, SignInArgs>({
         query: body => ({
            method: 'POST',
            url: AuthEndpoints.login,
            body,
         }),
      }),
   }),
})

export const { useSignUpMutation, useLoginMutation } = authService
