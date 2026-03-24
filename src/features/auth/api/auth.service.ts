'use client'
import { AuthEndpoints } from '@/shared/enums'
import type {
   SignInArgs,
   SignInResponse,
   RecoveryPasswordArgs,
   SignUpArgs,
   CheckRecoveryCodeArgs,
   NewPasswordArgs,
   verifyReCaptchaArgs,
   verifyReCaptchaResponse,
   VerificationExpiredArgs,
} from './auth.types'
import { TOKEN } from '@/shared/constants'
import { authChannel } from '@/shared/lib/authBroadcast'
import { baseApi } from '@/app/store'
import { userService } from '@/entities/user'
import { disconnectAllSockets } from '@/shared/socket'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
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
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               localStorage.removeItem(TOKEN)
               dispatch(baseApi.util.resetApiState())
               authChannel.postMessage({ type: 'LOGOUT' })
               await queryFulfilled
               disconnectAllSockets()
            } catch (err) {
               console.error('Logout failed', err)
            }
         },
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
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            const { data } = await queryFulfilled
            localStorage.setItem(TOKEN, data.accessToken)
            authChannel.postMessage({ type: 'LOGIN' })
            dispatch(userService.endpoints.me.initiate())
         },
      }),
      resendEmail: builder.mutation<void, VerificationExpiredArgs>({
         query: args => ({
            method: 'POST',
            url: AuthEndpoints.resendEmail,
            body: args,
         }),
      }),
      verifyReCaptcha: builder.mutation<verifyReCaptchaResponse, verifyReCaptchaArgs>({
         query: body => ({
            method: 'POST',
            url: AuthEndpoints.reCaptcha,
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
   useLogoutMutation,
   useConfirmEmailMutation,
   usePasswordRecoveryMutation,
   useLoginMutation,
   useVerifyReCaptchaMutation,
   useCheckRecoveryCodeMutation,
   useNewPasswordMutation,
   useResendEmailMutation,
} = authService
