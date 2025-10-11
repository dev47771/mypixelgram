import { baseApi } from '@/shared/store'
import { AuthEndpoints } from '@/shared/enums'
import {
   verifyReCaptchaArgs,
   verifyReCaptchaResponse,
   type SignInArgs,
   type SignInResponse,
   SignUpArgs,
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
      verifyReCaptcha: builder.mutation<verifyReCaptchaResponse, verifyReCaptchaArgs>({
         query: body => ({
            method: 'POST',
            url: AuthEndpoints.reCaptcha,
            body,
         }),
      }),
   }),
})

export const {
   useSignUpMutation,
   useConfirmEmailMutation,
   useLoginMutation,
   useVerifyReCaptchaMutation,
} = authService
