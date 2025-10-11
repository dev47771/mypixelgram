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

export type verifyReCaptchaArgs = {
   recaptchaToken: string
}

export type verifyReCaptchaResponse = {
   status: number
}

export type verifyReCaptchaError = {
   status: number
   data: {
      errorsMessages: FieldError[]
   }
}
