import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import { SignUpArgs } from '@/features/auth/api'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
      signUp: builder.mutation<void, SignUpArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.signUp,
            body: args,
         }),
      }),
      confirmEmail: builder.mutation<void, { code: string }>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.confirmEmail,
            body: args,
         }),
      }),
   }),
})

export const { useSignUpMutation, useConfirmEmailMutation } = authService
