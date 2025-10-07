import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import { type RecoveryPasswordArgs, SignUpArgs } from '@/features/auth/api'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
      signUp: builder.mutation<void, SignUpArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.signUp,
            body: args,
         }),
      }),
      passwordRecovery: builder.mutation<void, RecoveryPasswordArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.passwordRecovery,
            body: args,
         }),
      }),
   }),
})

export const { useSignUpMutation, usePasswordRecoveryMutation } = authService
