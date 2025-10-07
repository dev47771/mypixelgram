'use client'

import { PageContainer } from '@/shared/components/PageContainer'
import { useState } from 'react'
import { SignUpForm } from '@/features/auth/forms/SignUpForm'
import { SignUpEmailSentModal } from '@/features/auth/ui/signUp/ui/SignUpEmailSentModal'

export default function SignUpPage() {
   const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)

   return (
      <PageContainer>
         <SignUpForm onSubmit={() => {}} />
         {confirmationEmail && (
            <SignUpEmailSentModal email={confirmationEmail} onClose={setConfirmationEmail} />
         )}
      </PageContainer>
   )
}
