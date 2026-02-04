'use client'

import { Loader } from '@/shared/components/Loader'
import {
   CurrentSubscription,
   SubscriptionOptions,
   UserAccountType,
   useSubscription,
} from '@/entities/settings'
import { OkModal } from '@/shared/ui/OkModal'
import { YesAndNoModal } from '@/shared/ui/YesAndNoModal'

export const SubscriptionTabPage = () => {
   const {
      data,

      changeAccountType,
      changeSubscription,

      isBusinessAccount,
      isUserHaveAlreadyBusinessAccount,

      onAccountTypeChange,
      setChangeSubscription,
      createSubscription,
      onCancelSubscription,

      isSuccessfulModalOpen,
      isErrorModalOpen,
      isCancelModalOpen,
      closeSuccessModal,
      closeErrorModal,
      closeCancelModal,
      openCancelModal,
   } = useSubscription()

   if (!data) {
      return <Loader />
   }

   return (
      <section>
         {isBusinessAccount && data.currentSubscription && (
            <CurrentSubscription
               expiresAt={data.currentSubscription.expiresAt}
               nextPayment={data.currentSubscription.nextPayment}
               onCancelClick={openCancelModal}
            />
         )}

         <UserAccountType
            value={changeAccountType}
            disabled={isUserHaveAlreadyBusinessAccount}
            onChange={onAccountTypeChange}
         />

         {isBusinessAccount && (
            <SubscriptionOptions
               value={changeSubscription}
               onChange={setChangeSubscription}
               onPay={createSubscription}
               isActiveSubscription={!!data.currentSubscription}
            />
         )}

         <OkModal
            open={isSuccessfulModalOpen}
            title="Success"
            description="Payment was successful!"
            buttonText="OK"
            onOpenChangeAction={closeSuccessModal}
         />

         <OkModal
            open={isErrorModalOpen}
            className="min-w-[376px]"
            title="Error"
            description="Transaction failed. Please, write to support"
            buttonText="Back to payment"
            onOpenChangeAction={closeErrorModal}
         />

         <YesAndNoModal
            open={isCancelModalOpen}
            onCancel={closeCancelModal}
            onConfirm={onCancelSubscription}
            title="Cancel subscription"
            description="Are you sure you want to cancel your subscription?"
         />
      </section>
   )
}
