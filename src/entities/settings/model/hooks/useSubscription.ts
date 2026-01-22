'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useMeQuery } from '@/features/auth/api'
import { useCreateSubscriptionMutation } from '@/features/settings/api/settings.service'
import { alert } from '@/shared/components/Alert'
import { clearQueryParam } from '@/shared/utils'
import { ACCOUNT_TYPE, PAYMENT_RESULT } from '@/entities/settings'
import { QUERY_PARAMS } from '@/shared/constants'

export type SubscriptionPlanName = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
export type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE]

export const useSubscription = () => {
   const { data } = useMeQuery()
   const [createSubscriptionReq] = useCreateSubscriptionMutation()

   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const paymentStatus = searchParams.get(QUERY_PARAMS.paymentStatus)

   const [changeAccountType, setChangeAccountType] = useState<AccountType>(ACCOUNT_TYPE.PERSONAL)
   const [userAccountType, setUserAccountType] = useState<AccountType>(ACCOUNT_TYPE.PERSONAL)
   const [changeSubscription, setChangeSubscription] = useState<SubscriptionPlanName>('DAY')

   const isUserHaveAlreadyBusinessAccount = userAccountType === ACCOUNT_TYPE.BUSINESS
   const isBusinessAccount = changeAccountType === ACCOUNT_TYPE.BUSINESS

   const isSuccessfulPaymentStatus = paymentStatus === PAYMENT_RESULT.success
   const isErrorPaymentStatus = paymentStatus === PAYMENT_RESULT.error

   const [isSuccessfulModalOpen, setIsSuccessfulModalOpen] = useState(isSuccessfulPaymentStatus)
   const [isErrorModalOpen, setIsErrorModalOpen] = useState(isErrorPaymentStatus)

   useEffect(() => {
      if (!data) return

      if (data.accountType) {
         setChangeAccountType(data.accountType)
         setUserAccountType(data.accountType)
      }

      if (data.currentSubscription?.planName) {
         setChangeSubscription(data.currentSubscription.planName)
      }
   }, [data])

   const onAccountTypeChange = (value: string) => {
      if (value === ACCOUNT_TYPE.BUSINESS || value === ACCOUNT_TYPE.PERSONAL) {
         setChangeAccountType(value)
      }
   }

   const createSubscription = async () => {
      try {
         const response = await createSubscriptionReq({
            planId: changeSubscription,
         }).unwrap()

         if (response.paymentUrl) {
            router.push(response.paymentUrl)
         }
      } catch (error) {
         console.error(error)
         alert.error('Something went wrong, please try again 💊')
      }
   }

   const closeSuccessModal = () => {
      setIsSuccessfulModalOpen(false)
      const newParams = clearQueryParam(searchParams, QUERY_PARAMS.paymentStatus)
      router.replace(`${pathname}?${newParams}`)
   }

   const closeErrorModal = () => {
      setIsErrorModalOpen(false)
      const newParams = clearQueryParam(searchParams, QUERY_PARAMS.paymentStatus)
      router.replace(`${pathname}?${newParams}`)
   }

   return {
      data,

      changeAccountType,
      changeSubscription,

      isBusinessAccount,
      isUserHaveAlreadyBusinessAccount,

      onAccountTypeChange,
      setChangeSubscription,
      createSubscription,

      isSuccessfulModalOpen,
      isErrorModalOpen,
      closeSuccessModal,
      closeErrorModal,
   }
}
