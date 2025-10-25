import { useVerifyReCaptchaMutation, ErrorResponse } from '@/features/auth/api'
import { alert } from '@/shared/components/Alert'
import { Card } from '@/shared/components/Card'
import { Checkbox } from '@/shared/components/Checkbox'
import { ReCaptchaIcon } from '@/shared/icons'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
   onVerificationComplete: (success: boolean) => void
}

type Status = 'init' | 'loading' | 'success' | 'error' | 'expired'

export const Recaptcha = ({ onVerificationComplete }: Props) => {
   const [status, setStatus] = useState<Status>('init')
   const [verifyReCaptchaMutation] = useVerifyReCaptchaMutation()

   const handleCheckboxClick = async () => {
      if (status === 'loading' || status === 'success') return

      setStatus('loading')

      try {
         const recaptchaToken = await window.grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
            { action: 'forgot_password' }
         )

         await verifyReCaptchaMutation({ recaptchaToken }).unwrap()
         setStatus('success')
         onVerificationComplete(true)
      } catch (error) {
         alert.error((error as ErrorResponse).errorsMessages[0].message || 'Something went wrong')
         onVerificationComplete(false)
         if ((error as ErrorResponse).errorsMessages[0].message.includes('timeout-or-duplicate')) {
            setStatus('expired')
         } else {
            setStatus('error')
         }
      }
   }

   function getCheckedStatus(status: Status) {
      if (status === 'init' || status === 'error' || status === 'expired') {
         return false
      }
      if (status === 'success') {
         return true
      }
      if (status === 'loading') {
         return 'indeterminate'
      }
   }

   const errorStatus = status === 'error'
   const expiredStatus = status === 'expired'

   const content = (
      <Card
         className={
            'm-[8px 7px] relative flex w-[300px] items-center justify-between px-5 pt-[14.5px] pb-[14.5px]'
         }
      >
         {expiredStatus && (
            <p
               className={
                  'text-misc-error-100 absolute top-[10px] text-[10px] leading-[10px] font-[400]'
               }
            >
               Verification expired. Check the checkbox again.
            </p>
         )}
         <Checkbox
            label={'I’m not a robot'}
            variant={'recaptcha'}
            checked={getCheckedStatus(status)}
            onClick={handleCheckboxClick}
         />
         <div className={'flex flex-col items-center'}>
            <ReCaptchaIcon className={'mb-[7px]'} />
            <span className={'mb-0.5 text-[8px] leading-[8px] font-[500]'}>reCAPTCHA</span>
            <div className={'flex'}>
               <Link href={'#'} className={'!text-[6px] !leading-[6px] !font-[500]'}>
                  Privacy
               </Link>
               <span className={'mr-[2px] ml-[2px] h-[1px] text-[6px] leading-[6px] font-[500]'}>
                  -
               </span>
               <Link href={'#'} className={'text-[6px] leading-[6px] font-[500]'}>
                  Terms
               </Link>
            </div>
         </div>
      </Card>
   )

   if (errorStatus) {
      return (
         <div className={'border-misc-error-100 w-[314px] border px-2 pt-2'}>
            {content}
            <p className={'text-misc-error-100 py-3.25 text-[10px] leading-[10px] font-[400]'}>
               Please verify that you are not a robot
            </p>
         </div>
      )
   }
   return content
}
