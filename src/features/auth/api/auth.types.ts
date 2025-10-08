export type SignUpArgs = {
   login: string
   email: string
   password: string
   isAgreeWithPrivacy: boolean
}

export type MeResponse = {
   userId: string
   email: string
   login: string
}
