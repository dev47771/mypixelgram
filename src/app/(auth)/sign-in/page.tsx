'use client'

import { type Inputs, SignInForm } from '@/features/auth/forms/SignInForm/SignInForm'
import { PageContainer } from '@/shared/components/PageContainer'
import { useLoginMutation } from '@/features/auth/api'
import { useRouter } from 'next/navigation'
import { PrivateRoutes } from '@/shared/enums'
// import { alert } from '@/shared/components/Alert'

export default function SignInPage() {
   const [login] = useLoginMutation()
   const router = useRouter()

   const handleLogin = async (data: Inputs) => {
      const result = await login(data)
      if (result.data) {
         localStorage.setItem('accessToken', result.data.accessToken)
         router.push(PrivateRoutes.feed)
      }
      // else if (result.error?.data?.errorsMessages?.length) {
      //    //обработка ошибок
      //    alert.error(result.error.data.errorsMessages[0].message)
      // }
   }

   return (
      <PageContainer className={'pt-6'}>
         <SignInForm onSubmitAction={handleLogin} />
      </PageContainer>
   )
}
