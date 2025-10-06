'use client'

import { SignUp, SignUpEmailSentModal } from '@/features/auth/ui/signUp'
import { PageContainer } from '@/shared/components/PageContainer'
import { useState } from 'react'

export default function SignUpPage() {
   const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)

   return (
      <PageContainer>
         <SignUp onSubmit={() => {}} />
         {confirmationEmail && (
            <SignUpEmailSentModal email={confirmationEmail} onClose={setConfirmationEmail} />
         )}
      </PageContainer>
   )
}
