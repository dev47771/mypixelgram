'use client'

import { SignUp } from '@/features/auth/ui/signUp'
import { PageContainer } from '@/shared/components/PageContainer'

export default function SignUpPage() {
   return (
      <PageContainer>
         <SignUp onSubmit={() => {}} />
      </PageContainer>
   )
}
