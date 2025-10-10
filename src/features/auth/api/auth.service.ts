import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'

import {
   type SignInArgs,
   SignInResponse,
   RecoveryPasswordArgs,
   SignUpArgs,
   CheckRecoveryCodeArgs,
   type NewPasswordArgs,
} from '@/features/auth/api'

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
      confirmEmail: builder.mutation<void, { code: string }>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.confirmEmail,
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
      checkRecoveryCode: builder.mutation<void, CheckRecoveryCodeArgs>({
         query: body => ({
            method: 'POST',
            url: AuthEndpoints.checkRecoveryCode,
            body,
         }),
      }),
      newPassword: builder.mutation<void, NewPasswordArgs>({
         query: body => ({
            method: 'POST',
            url: AuthEndpoints.newPassword,
            body,
         }),
      }),
      refreshToken: builder.mutation<SignInResponse, void>({
         query: body => ({
            method: 'POST',
            url: AuthEndpoints.refreshToken,
            body,
         }),
      }),
   }),
})

export const {
   useSignUpMutation,
   useConfirmEmailMutation,
   usePasswordRecoveryMutation,
   useLoginMutation,
   useCheckRecoveryCodeMutation,
   useNewPasswordMutation,
} = authService
