'use client'

import { type Inputs, SignInForm } from '@/features/auth/forms/SignInForm/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'
import { useLoginMutation } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/shared/enums'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'

export default function SignInPage() {
   const [login, { error }] = useLoginMutation()
   const router = useRouter()

   const handleLogin = async (data: Inputs) => {
      await login(data).unwrap()
      router.push(PrivateRoutes.feed)
   }

   return (
      <PageContainer className={'pt-6'}>
         <SignInForm
            onSubmitAction={handleLogin}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
         />
      </PageContainer>
   )
}
