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
