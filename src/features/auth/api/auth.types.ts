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
