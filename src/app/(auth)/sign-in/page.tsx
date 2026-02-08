'use client'

import { SignInForm } from '@/features/auth/forms/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'
import { type SignInArgs, useLoginMutation } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/constants'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { useOAuthErrorModal } from '@/features/auth/hooks/useOAuthErrorModal'

export default function SignInPage() {
   const [login, { error, isLoading }] = useLoginMutation()
   const router = useRouter()
   const { modal: oAuthErrorModal } = useOAuthErrorModal()

   const handleLogin = async (data: SignInArgs) => {
      await login(data).unwrap()
      router.push(ROUTES.private.feed)
   }

   return (
      <PageContainer className={'pt-6'}>
         <SignInForm
            onSubmitAction={handleLogin}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
            isLoading={isLoading}
         />
         {oAuthErrorModal}
      </PageContainer>
   )
}
