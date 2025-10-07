'use client'

import { PageContainer } from '@/shared/components/PageContainer'
import { useState } from 'react'
import { SignUpForm } from '@/features/auth/forms/SignUpForm'
import { EmailSentModal } from '@/entities/auth/ui/EmailSentModal'

export default function SignUpPage() {
   const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)

   return (
      <PageContainer>
         <SignUpForm onSubmit={() => {}} />
         {confirmationEmail && (
            <EmailSentModal email={confirmationEmail} onClose={setConfirmationEmail} />
         )}
      </PageContainer>
   )
}
