import z from 'zod'

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

export const SubscriptionTypeSchema = z.enum(['DAY', 'WEEK', 'MONTH', 'YEAR'])

export const PaymentTypeSchema = z.enum(['Stripe', 'PayPal'])

export const PaymentSchema = z.object({
   paymentDate: z.string(),
   endDate: z.string(),
   amount: z.string(),
   subscriptionType: SubscriptionTypeSchema,
   paymentType: PaymentTypeSchema,
})

export const PaginationSchema = z.object({
   page: z.number(),
   limit: z.number(),
   total: z.number(),
   pages: z.number(),
})

export const PaymentsResponseSchema = z.object({
   payments: z.array(PaymentSchema),
   pagination: PaginationSchema,
})

export type PaymentsResponse = z.infer<typeof PaymentsResponseSchema>
