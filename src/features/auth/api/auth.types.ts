export type MeResponse = {
   userId: string
   email: string
   login: string
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

export type ErrorResponse = {
   status: number
   data: {
      errorsMessages: FieldError[]
   }
}

type FieldError = {
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
