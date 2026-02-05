'use client'
import { baseApi } from '@/shared/store'
import {
   CreateSubscriptionArgs,
   CreateSubscriptionResponse,
   PaymentsResponse,
} from './settings.types'
import { UserEndpoints } from '@/entities/user'
import { PaymentsEndpoints } from '@/shared/enums/paymentsEndpoints'

export const paymentsService = baseApi.injectEndpoints({
   endpoints: builder => ({
      createSubscription: builder.mutation<CreateSubscriptionResponse, CreateSubscriptionArgs>({
         query: body => ({
            url: UserEndpoints.subscription,
            method: 'POST',
            body,
         }),
      }),
      getPayments: builder.query<PaymentsResponse, { page: number; limit: number }>({
         query: ({ page, limit }) => ({
            url: PaymentsEndpoints.paymentsList,
            params: { page, limit },
         }),
      }),
      deleteSubscription: builder.mutation<void, void>({
         query: () => ({
            url: PaymentsEndpoints.deleteSubscription,
            method: 'DELETE',
         }),
         invalidatesTags: ['Me'],
      }),
   }),
})

export const { useCreateSubscriptionMutation, useGetPaymentsQuery, useDeleteSubscriptionMutation } =
   paymentsService
