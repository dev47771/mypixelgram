'use client'
import { PageContainer } from '@/shared/components/PageContainer'
import { CreateNewPasswordForm } from '@/features/auth/forms/CreateNewPasswordForm'
import { useCheckRecoveryCodeMutation, useNewPasswordMutation } from '@/features/auth/api'
import { useEffect, useState } from 'react'
import { Loader } from '@/shared/components/Loader'
import { useRouter, useSearchParams } from 'next/navigation'
import { isErrorInDataResponse } from '@/shared/utils/typeguards/isErrorInDataResponse'
import { ROUTES } from '@/shared/constants'

export default function CreateNewPasswordPage() {
   const router = useRouter()
   const searchParams = useSearchParams()

   const [checkCode, { isLoading: checkCodeLoading }] = useCheckRecoveryCodeMutation()
   const [newPassword, { error }] = useNewPasswordMutation()
   const recoveryCode = searchParams.get('code') ?? ''

   const [recoveryCodeCertificated, setRecoveryCodeCertificated] = useState(false)

   useEffect(() => {
      ;(async () => {
         try {
            await checkCode({ code: recoveryCode }).unwrap()
            setRecoveryCodeCertificated(true)
         } catch {
            router.push(ROUTES.public.verificationExpired)
         }
      })()
   }, [checkCode, recoveryCode, router])

   const createNewPasswordFormHandler = async (data: { password: string }) => {
      await newPassword({ newPassword: data.password, recoveryCode }).unwrap()
      router.push(ROUTES.public.signIn)
   }

   if (checkCodeLoading || !recoveryCodeCertificated) {
      return <Loader />
   }

   //todo add delete all sessions
   return (
      <PageContainer>
         <CreateNewPasswordForm
            onSubmitAction={createNewPasswordFormHandler}
            errorsFromApi={isErrorInDataResponse(error) ? error?.data.errorsMessages : undefined}
         />
      </PageContainer>
   )
}
