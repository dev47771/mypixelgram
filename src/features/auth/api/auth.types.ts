import { SubscriptionPlanName } from '@/features/settings'

export type MeResponse = {
   userId: string
   avatar: string | null
   login: string
   email: string
   createdAt: string
   dateOfBirth: string | null
   accountType: 'PERSONAL' | 'BUSINESS'
   currentSubscription: null | {
      planName: SubscriptionPlanName
      expiresAt: string
      nextPayment: string
   }
}

export type SignUpArgs = {
   login: string
   email: string
   password: string
   isAgreeWithPrivacy: boolean
}

export type SignInArgs = {
   email: string
   password: string
}

export type SignInResponse = {
   accessToken: string
}

export type ErrorDataResponse = {
   status: number
   data: ErrorResponse
}

export type ErrorResponse = {
   errorsMessages: FieldError[]
}

export type FieldError = {
   field: string
   message: string
}

export type VerificationExpiredArgs = {
   email: string
}

export type verifyReCaptchaArgs = {
   recaptchaToken: string
}

export type verifyReCaptchaResponse = {
   status: number
}

export type RecoveryPasswordArgs = {
   email: string
}

export type CheckRecoveryCodeArgs = {
   code: string
}

export type NewPasswordArgs = {
   newPassword: string
   recoveryCode: string
}
