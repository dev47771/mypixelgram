'use client'
import { ForgotPasswordForm } from '@/features/auth/forms/ForgotPasswordForm'
import { usePasswordRecoveryMutation } from '@/features/auth/api'
import { useState } from 'react'
import { EmailSentModal } from '@/entities/auth/ui/EmailSentModal'
import { PageContainer } from '@/shared/components/PageContainer'
import { alert } from '@/shared/components/Alert'

export default function ForgotPasswordPage() {
   const [showModal, setShowModal] = useState(false)
   const [emailToRecover, setEmailToRecover] = useState('')

   const [forgotPassword] = usePasswordRecoveryMutation()
   const modalHandler = () => setShowModal(false)

   const forgotModalHandler = async (data: { email: string }) => {
      try {
         await forgotPassword(data).unwrap()
         setEmailToRecover(data.email)
         setShowModal(true)
      } catch {
         alert.error('Something went wrong')
      }
   }

   return (
      <PageContainer>
         <ForgotPasswordForm onSubmitAction={forgotModalHandler} />
         {showModal && <EmailSentModal email={emailToRecover} onClose={modalHandler} />}
      </PageContainer>
   )
}
