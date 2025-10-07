'use client'
import { ForgotPasswordForm } from '@/features/auth/forms/ForgotPasswordForm'
import { usePasswordRecoveryMutation } from '@/features/auth/api'
import { useState } from 'react'
import { EmailSentModal } from '@/entities/auth/ui/EmailSentModal'

export default function ForgotPasswordPage() {
   const [showModal, setShowModal] = useState(false)

   const [forgotPassword, { isLoading }] = usePasswordRecoveryMutation()
   const modalHandler = () => setShowModal(false)
   return (
      <>
         <ForgotPasswordForm onSubmitAction={forgotPassword} disabled={isLoading} />
         {showModal && <EmailSentModal email={''} onClose={modalHandler} />}
      </>
   )
}
