'use client'
import { AuthEndpoints } from '@/shared/enums'
import type {
   MeResponse,
   SignInArgs,
   SignInResponse,
   RecoveryPasswordArgs,
   SignUpArgs,
   CheckRecoveryCodeArgs,
   NewPasswordArgs,
   verifyReCaptchaArgs,
   verifyReCaptchaResponse,
   VerificationExpiredArgs,
} from '@/features/auth/api'
import { TOKEN } from '@/shared/constants'
import { authChannel } from '@/shared/lib/authBroadcast'
import { baseApi } from '@/shared/store'
import { disconnectAllSockets } from '@/shared/socket'

export const authService = baseApi.injectEndpoints({
   endpoints: builder => ({
      me: builder.query<MeResponse, void>({
         query: () => ({
            method: 'GET',
            url: AuthEndpoints.me,
         }),
         providesTags: ['Me'],
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
            dispatch(authService.endpoints.me.initiate())
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
   useMeQuery,
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
