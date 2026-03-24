import { SubscriptionPlanName } from '@/features/settings'

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
