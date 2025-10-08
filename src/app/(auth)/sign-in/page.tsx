'use client'

import { SignInForm } from '@/features/auth/forms/SignInForm/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'

export default function SignInPage() {
   return (
      <PageContainer className={'pt-6'}>
         <SignInForm />
      </PageContainer>
   )
}
