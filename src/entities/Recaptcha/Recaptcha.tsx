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

   const handleCheckboxClick = async () => {
      if (status === 'loading' || status === 'success') return

      setStatus('loading')

      try {
         const token = await window.grecaptcha.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
            { action: 'forgot_password' }
         )

         const response = await fetch('/api/v1/auth/verify-recaptcha', {
            //!!!заменить на правильный от бэка
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }), //!!! заменить на правильный от бэка
         })

         const result = await response.json()

         if (result.challenge_ts) {
            const challengeTime = new Date(result.challenge_ts)
            const currentTime = new Date()
            const timeDiff = (currentTime.getTime() - challengeTime.getTime()) / 1000
            if (timeDiff > 120) {
               setStatus('expired')
               onVerificationComplete(false)
               return
            }
            if (result.success) {
               setStatus('success')
               onVerificationComplete(true)
            } else {
               setStatus('error')
               onVerificationComplete(false)
            }
         }
      } catch {
         setStatus('error')
         onVerificationComplete(false)
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
         className={'m-[8px 7px] relative flex w-[300px] items-center justify-between px-5 py-3'}
      >
         {expiredStatus && (
            <p
               className={
                  'absolute top-[10px] text-[10px] leading-[10px] font-[400] text-[#FF0000]'
               }
            >
               Verifiction expired. Check the checkbox again.
            </p>
         )}
         <Checkbox
            label={'I’m not a robot'}
            variant={'recaptcha'}
            checked={getCheckedStatus(status)}
            onClick={handleCheckboxClick}
         />
         <div className={'flex flex-col items-center gap-0.5'}>
            <ReCaptchaIcon className={'mb-[7px]'} />
            <span className={'text-[6px] leading-[6px] font-[500]'}>reCAPTCHA</span>
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
         <div className={'w-[314px] border border-[#FF0000] px-2 pt-2'}>
            {content}
            <p className={'py-3.25 text-[10px] leading-[10px] font-[400] text-[#FF0000]'}>
               Please verify that you are not a robot
            </p>
         </div>
      )
   }
   return content
}
