import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import {
   type SignInArgs,
   type SignInResponse,
   SignUpArgs,
   VerificationExpiredArgs,
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
      resendEmail: builder.mutation<void, VerificationExpiredArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.resendEmail,
            body: args,
         }),
      }),
   }),
})

export const {
   useSignUpMutation,
   useConfirmEmailMutation,
   useLoginMutation,
   useResendEmailMutation,
} = authService
