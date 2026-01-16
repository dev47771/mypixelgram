import { SubscriptionPlanName } from '@/entities/settings/ui/SubscriptionTabPage'

export type updateProfileArgs = {
   login: string
   firstName: string
   lastName: string
   dateOfBirth: string
   country?: string
   city?: string
   aboutMe?: string
}

export type CreateSubscriptionArgs = {
   planId: SubscriptionPlanName
}
export type CreateSubscriptionResponse = {
   paymentUrl: string
}
export type getProfileResponse = {
   login: string
   firstName: string
   lastName: string
   dateOfBirth: string | null
   country: string | null
   city: string | null
   aboutMe: string | null
   avatar: string | null
}

export type CountriesResponse = Record<string, string[]>

export type Country = keyof CountriesResponse

export type City = CountriesResponse[Country][number]

export type getSessionResponse = {
   sessionId: string
   deviceId: string
   deviceName: string
   deviceType: 'mobile' | 'desktop' | 'tablet'
   browser: string
   ip: string
   lastActiveAt: string
   isCurrent: boolean
}

export type getDevicesResponse = {
   sessions: getSessionResponse[]
}
