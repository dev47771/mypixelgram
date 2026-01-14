export type updateProfileArgs = {
   login: string
   firstName: string
   lastName: string
   dateOfBirth: string
   country?: string
   city?: string
   aboutMe?: string
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

//payments

export type SubscriptionType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'

export type PaymentType = 'Stripe' | 'PayPal'

export type Payment = {
   paymentDate: string
   endDate: string
   amount: string
   subscriptionType: SubscriptionType
   paymentType: PaymentType
}

export type Pagination = {
   page: number
   limit: number
   total: number
   pages: number
}

export type PaymentsResponse = {
   payments: Payment[]
   pagination: Pagination
}
