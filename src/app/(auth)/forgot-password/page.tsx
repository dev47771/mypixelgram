'use client'
import { ForgotPasswordForm } from '@/features/auth/forms/ForgotPasswordForm'
import { type RecoveryPasswordArgs, usePasswordRecoveryMutation } from '@/features/auth/api'
import { useState } from 'react'
import { EmailSentModal } from '@/entities/auth/ui/EmailSentModal'
import { PageContainer } from '@/shared/components/PageContainer'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'

export default function ForgotPasswordPage() {
   const [showModal, setShowModal] = useState(false)
   const [emailToRecover, setEmailToRecover] = useState('')

   const [forgotPassword, { error, isLoading }] = usePasswordRecoveryMutation()
   const modalHandler = () => setShowModal(false)

   const forgotModalHandler = async (data: RecoveryPasswordArgs) => {
      await forgotPassword(data).unwrap()
      setEmailToRecover(data.email)
      setShowModal(true)
   }

   return (
      <PageContainer>
         <ForgotPasswordForm
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            onSubmitAction={forgotModalHandler}
            disabled={isLoading}
         />
         {showModal && <EmailSentModal email={emailToRecover} onClose={modalHandler} />}
      </PageContainer>
   )
}
