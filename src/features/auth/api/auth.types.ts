export type SignUpArgs = {
   login: string
   email: string
   password: string
   isAgreeWithPrivacy: boolean
}

export type RecoveryPasswordArgs = {
   email: string
}
