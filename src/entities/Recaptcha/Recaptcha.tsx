import { Card } from '@/shared/components/Card'
import { Checkbox } from '@/shared/components/Checkbox'
import { ReCaptchaIcon } from '@/shared/icons'
import Link from 'next/link'

type Props = {
   status?: 'init' | 'loading' | 'success' | 'error' | 'expired'
}

export const Recaptcha = ({ status }: Props) => {
   function getCheckedStatus(status: Props['status']) {
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
                  'absolute top-[10px] text-[10px] leading-[10px] font-[400] text-[#FF0000]'
               }
            >
               Verification expired. Check the checkbox again.
            </p>
         )}
         <Checkbox
            label={'I’m not a robot'}
            variant={'recaptcha'}
            checked={getCheckedStatus(status)}
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
