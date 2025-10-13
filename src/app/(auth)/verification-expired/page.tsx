'use client'
import { VerificationExpiredForm } from '@/features/auth/forms/VerificationExpiredForm'
import Image from 'next/image'
import verificationExpired from './assets/verification-expired.png'
import { useResendEmailMutation, VerificationExpiredArgs, ErrorResponse } from '@/features/auth/api'
import { alert } from '@/shared/components/Alert'
import { PageContainer } from '@/shared/components/PageContainer'

export default function VerificationExpiredPage() {
   const [resendEmail] = useResendEmailMutation()

   const VerificationExpiredHandler = async (data: VerificationExpiredArgs): Promise<boolean> => {
      try {
         await resendEmail(data).unwrap()
         alert.success('The link has been sent to your email')
         return true
      } catch (e) {
         const error = e as ErrorResponse
         const message = error?.data.errorsMessages?.[0]?.message ?? 'Something went wrong'
         alert.error(message)
         return false
      }
   }

   return (
      <PageContainer>
         <VerificationExpiredForm onSubmitAction={VerificationExpiredHandler} />
         <Image src={verificationExpired} alt="verification-expired" width={473} height={353} />
      </PageContainer>
   )
}
