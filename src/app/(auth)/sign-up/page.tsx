'use client'

import { PageContainer } from '@/shared/components/PageContainer'
import { useState } from 'react'
import { SignUpForm } from '@/features/auth/forms/SignUpForm'
import { EmailSentModal } from '@/entities/auth/ui/EmailSentModal'
import { SignUpArgs, SignUpValidationError, useSignUpMutation } from '@/features/auth/api'
import { alert } from '@/shared/components/Alert'

export default function SignUpPage() {
   const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)

   const [signUp] = useSignUpMutation()

   const signUpHandler = async (data: SignUpArgs): Promise<boolean> => {
      try {
         await signUp(data).unwrap()
         setConfirmationEmail(data.email)
         return true
      } catch (e) {
         alert.error(
            (e as SignUpValidationError).data.errorsMessages[0].message || 'Something went wrong'
         )
         setConfirmationEmail(null)
         return false
      }
   }

   return (
      <PageContainer>
         <SignUpForm onSubmitAction={signUpHandler} />
         {confirmationEmail && (
            <EmailSentModal email={confirmationEmail} onClose={setConfirmationEmail} />
         )}
      </PageContainer>
   )
}
