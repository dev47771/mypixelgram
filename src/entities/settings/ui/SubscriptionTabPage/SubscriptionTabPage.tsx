'use client'
import { Card } from '@/shared/components/Card'
import { Typography } from '@/shared/components/Typography'
import { RadioGroup, RadioItem } from '@/shared/components/Radio-group'
import { useEffect, useState } from 'react'
import { useMeQuery } from '@/features/auth/api'
import { PayPalIcon, StripeIcon } from '@/shared/icons'
import { useCreateSubscriptionMutation } from '@/features/settings/api/settings.service'
import { alert } from '@/shared/components/Alert'
import { Loader } from '@/shared/components/Loader'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { prettifyDate } from '@/shared/utils/date/prettifyDate'
import { OkModal } from '@/entities/common/ui'
import { clearQueryParam } from '@/shared/utils'
import { ACCOUNT_TYPE, PAYMENT_RESULT } from '@/shared/constants'

export type SubscriptionPlanName = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
type AccountType = (typeof ACCOUNT_TYPE)[keyof typeof ACCOUNT_TYPE]

export const SubscriptionTabPage = () => {
   const { data } = useMeQuery()
   const [createSubscriptionReq] = useCreateSubscriptionMutation()

   const router = useRouter()
   const searchParams = useSearchParams()
   const pathname = usePathname()

   const paymentStatus = searchParams.get('payment_status')
   const [changeAccountType, setChangeAccountType] = useState<AccountType>(ACCOUNT_TYPE.PERSONAL)
   const [userAccountType, setUserAccountType] = useState<AccountType>(ACCOUNT_TYPE.PERSONAL)
   const [changeSubscription, setChangeSubscription] = useState('DAY')

   const isUserHaveAlreadyBusinessAccount = userAccountType === ACCOUNT_TYPE.BUSINESS
   const isBusinessAccount = changeAccountType === ACCOUNT_TYPE.BUSINESS
   const isSuccessfulPaymentStatus = paymentStatus === PAYMENT_RESULT.success
   const isErrorPaymentStatus = paymentStatus === PAYMENT_RESULT.error

   const [isSuccessfulModalOpen, setIsSuccessfulModalOpen] = useState(isSuccessfulPaymentStatus)
   const [isErrorModalOpen, setIsErrorModalOpen] = useState(isErrorPaymentStatus)

   useEffect(() => {
      if (data?.accountType) {
         setChangeAccountType(data.accountType)
         setUserAccountType(data.accountType)
      }
      if (data?.accountType && data?.currentSubscription?.planName) {
         setChangeSubscription(data?.currentSubscription?.planName)
      }
   }, [data])

   const createSubscriptionHandler = async () => {
      try {
         const redirectStripeLink = await createSubscriptionReq({
            planId: changeSubscription as SubscriptionPlanName,
         }).unwrap()
         if (redirectStripeLink.paymentUrl) {
            router.push(redirectStripeLink.paymentUrl)
         }
      } catch (error) {
         console.error(error)
         alert.error('Something went wrong, please try again 💊')
      }
   }

   const modalButtonHandler = (setter: (value: boolean) => void) => {
      setter(false)
      const newParams = clearQueryParam(searchParams, 'payment_status')
      router.replace(pathname + '?' + newParams)
   }

   const onAccountTypeChange = (value: string) => {
      if (value === ACCOUNT_TYPE.BUSINESS || value === ACCOUNT_TYPE.PERSONAL) {
         setChangeAccountType(value)
      }
   }

   if (!data) {
      return <Loader />
   }

   return (
      <section>
         {isBusinessAccount && data.currentSubscription && (
            <>
               <Typography variant={'h3'} className={'mb-4.5'}>
                  Current Subscription:
               </Typography>
               <Card className={'mb-10.5 flex gap-11 px-3 py-1.5'}>
                  <div className={'flex flex-col gap-3'}>
                     <Typography
                        as={'span'}
                        variant={'captionRegular'}
                        className={'text-light-900'}
                     >
                        Expire at
                     </Typography>
                     <Typography variant={'captionBold'}>
                        {prettifyDate(data?.currentSubscription?.expiresAt)}
                     </Typography>
                  </div>
                  <div className={'flex flex-col gap-3'}>
                     <Typography
                        as={'span'}
                        variant={'captionRegular'}
                        className={'text-light-900'}
                     >
                        Next payment
                     </Typography>
                     <Typography variant={'captionBold'}>
                        {prettifyDate(data?.currentSubscription?.nextPayment)}
                     </Typography>
                  </div>
               </Card>
            </>
         )}
         <Typography variant={'h3'} className={'mb-4.5'}>
            Account type:
         </Typography>
         <Card className={'mb-10.5 px-3 py-1.5'}>
            <RadioGroup value={changeAccountType} onValueChange={onAccountTypeChange}>
               <RadioItem
                  disabled={isUserHaveAlreadyBusinessAccount}
                  value={'PERSONAL'}
                  label={'Personal'}
               />
               <RadioItem value={'BUSINESS'} label={'Business'} />
            </RadioGroup>
         </Card>
         {isBusinessAccount && (
            <>
               <Typography variant={'h3'} className={'mb-4.5'}>
                  Your subscription costs:
               </Typography>
               <Card className={'mb-6 px-3 py-1.5'}>
                  <RadioGroup value={changeSubscription} onValueChange={setChangeSubscription}>
                     <RadioItem value={'DAY'} label={'$1.99 per day'} />
                     <RadioItem value={'WEEK'} label={'$4.99 per week'} />
                     <RadioItem value={'MONTH'} label={'$9.99 per month'} />
                     <RadioItem value={'YEAR'} label={'$99.99 per year'} />
                  </RadioGroup>
               </Card>
               <div className={'flex items-center justify-end gap-[54px]'}>
                  <Card
                     as={'button'}
                     className={
                        'flex h-[64px] w-[96px] cursor-not-allowed items-center justify-center rounded-[5px]'
                     }
                  >
                     <PayPalIcon className={'h-[48px] w-[70px]'} />
                  </Card>
                  <Typography variant={'bodyRegular'}>Or</Typography>
                  <Card
                     onClick={createSubscriptionHandler}
                     as={'button'}
                     className={
                        'flex h-[64px] w-[96px] cursor-pointer items-center justify-center rounded-[5px]'
                     }
                  >
                     <StripeIcon className={'h-[29px] w-[70px]'} />
                  </Card>
               </div>
            </>
         )}
         <OkModal
            open={isSuccessfulModalOpen}
            title={'Success'}
            description={'Payment was successful!'}
            buttonText={'OK'}
            onOpenChangeAction={() => modalButtonHandler(setIsSuccessfulModalOpen)}
         />
         <OkModal
            open={isErrorModalOpen}
            className={'min-w-[376px]'}
            title={'Error'}
            description={'Transaction failed. Please, write to support'}
            buttonText={'Back to payment'}
            onOpenChangeAction={() => modalButtonHandler(setIsErrorModalOpen)}
         />
      </section>
   )
}
