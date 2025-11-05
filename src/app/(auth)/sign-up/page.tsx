'use client'

import { PageContainer } from '@/shared/components/PageContainer'
import { useState } from 'react'
import { SignUpForm } from '@/features/auth/forms/SignUpForm'
import { EmailSentModal } from '@/entities/auth/ui/EmailSentModal'
import { SignUpArgs, useSignUpMutation } from '@/features/auth/api'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { useOAuthErrorModal } from '@/features/auth/hooks/useOAuthErrorModal'

export default function SignUpPage() {
   const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)
   const { modal: oAuthErrorModal } = useOAuthErrorModal()

   const [signUp, { error }] = useSignUpMutation()

   const signUpHandler = async (data: SignUpArgs): Promise<boolean> => {
      try {
         await signUp(data).unwrap()
         setConfirmationEmail(data.email)
         return true
      } catch {
         setConfirmationEmail(null)
         return false
      }
   }

   return (
      <PageContainer>
         <SignUpForm
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            onSubmitAction={signUpHandler}
         />
         {confirmationEmail && (
            <EmailSentModal email={confirmationEmail} onClose={setConfirmationEmail} />
         )}
         {oAuthErrorModal}
      </PageContainer>
   )
}
