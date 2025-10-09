'use client'
import { PageContainer } from '@/shared/components/PageContainer'
import { CreateNewPasswordForm } from '@/features/auth/forms/CreateNewPasswordForm'
import { useCheckRecoveryCodeMutation, useNewPasswordMutation } from '@/features/auth/api'
import { useEffect, useState } from 'react'
import { Loader } from '@/shared/components/Loader'
import { useRouter, useSearchParams } from 'next/navigation'
import { PublicRoutes } from '@/shared/enums'
import { alert } from '@/shared/components/Alert'

export default function CreateNewPasswordPage() {
   const router = useRouter()
   const searchParams = useSearchParams()

   const [checkCode, { isLoading: checkCodeLoading }] = useCheckRecoveryCodeMutation()
   const [newPassword] = useNewPasswordMutation()
   const recoveryCode = searchParams.get('code') ?? ''

   const [recoveryCodeCertificated, setRecoveryCodeCertificated] = useState(false)

   useEffect(() => {
      ;(async () => {
         try {
            await checkCode({ code: recoveryCode }).unwrap()
            setRecoveryCodeCertificated(true)
         } catch {
            router.push(PublicRoutes.verificationExpired)
         }
      })()
   }, [checkCode, recoveryCode, router])

   const createNewPasswordFormHandler = async (data: { password: string }) => {
      try {
         await newPassword({ newPassword: data.password, recoveryCode }).unwrap()
         router.push(PublicRoutes.signIn)
      } catch {
         alert.error('Something went wrong')
      }
   }

   if (checkCodeLoading || !recoveryCodeCertificated) {
      return <Loader />
   }

   //todo add delete all sessions
   return (
      <PageContainer>
         <CreateNewPasswordForm onSubmitAction={createNewPasswordFormHandler} />
      </PageContainer>
   )
}
