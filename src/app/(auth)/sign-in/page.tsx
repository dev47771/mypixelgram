'use client'

import { type Inputs, SignInForm } from '@/features/auth/forms/SignInForm/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'
import { type ErrorResponse, useLoginMutation } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/shared/enums'
import { alert } from '@/shared/components/Alert'
import type { UseFormSetError } from 'react-hook-form'

export default function SignInPage() {
   const [login, { isLoading }] = useLoginMutation()
   const router = useRouter()

   const handleLogin = async (data: Inputs, setError: UseFormSetError<Inputs>) => {
      try {
         const result = await login(data).unwrap()
         localStorage.setItem('accessToken', result.accessToken)
         router.push(PrivateRoutes.feed)
      } catch (error: unknown) {
         const err = error as ErrorResponse
         if (
            typeof err === 'object' &&
            err != null &&
            'data' in err &&
            err.data.errorsMessages.length > 0
         ) {
            if (err.status === 400) {
               setError('password', {
                  message: 'The email or password are incorrect. Try again please',
               })
            } else {
               alert.error(err.data.errorsMessages[0].message)
            }
         } else {
            alert.error('An unknown error occurred')
         }
      }
   }

   return (
      <PageContainer className={'pt-6'}>
         <SignInForm onSubmitAction={handleLogin} isLoading={isLoading} />
      </PageContainer>
   )
}
