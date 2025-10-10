import { VerificationExpiredForm } from '@/features/auth/forms/VerificationExpiredForm/index'
import Image from 'next/image'
import verificationExpired from './assets/verification-expired.png'
import {
   useResendEmailMutation,
   VerificationExpiredArgs,
   VerificationExpiredErrorResponse,
} from '@/features/auth/api'
import { alert } from '@/shared/components/Alert'

export default function VerificationExpiredPage() {
   const [resendEmail] = useResendEmailMutation()

   const VerificationExpiredHandler = async (data: VerificationExpiredArgs): Promise<boolean> => {
      try {
         await resendEmail(data).unwrap()
         alert.success('The link has been sent to your email')
         return true
      } catch (e) {
         const error = e as VerificationExpiredErrorResponse
         const message = error?.errorsMessages?.[0]?.message ?? 'Something went wrong'
         alert.error(message)
         return false
      }
   }

   return (
      <div className="flex flex-col items-center justify-center">
         <VerificationExpiredForm onSubmit={VerificationExpiredHandler} />
         <Image src={verificationExpired} alt="verification-expired" width={473} height={353} />
      </div>
   )
}
