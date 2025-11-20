export type UserType = {
   id: string
   login: string
   avatar: string | null
}

export type UserProfileType = {
   user: UserType
   publicationCount: number
   followers: number
   following: number
   description: string | null
}
