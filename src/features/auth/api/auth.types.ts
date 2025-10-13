export type SignUpArgs = {
   login: string
   email: string
   password: string
   isAgreeWithPrivacy: boolean
}

export type SignUpValidationError = {
   status: number
   data: {
      errorsMessages: {
         field: string
         message: string
      }[]
   }
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
