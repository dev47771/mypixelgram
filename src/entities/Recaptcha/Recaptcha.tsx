import { Card } from '@/shared/components/Card'
import { Checkbox } from '@/shared/components/Checkbox'
import { ReCaptchaIcon, RecaptchaSuccessIcon } from '@/shared/icons'
import { RecaptchaSpinner } from '@/entities/Recaptcha/RecaptchaSpinner'

type Props = {
   status?: 'init' | 'loading' | 'success'
}

export const Recaptcha = ({ status }: Props) => {
   function getCheckedStatus(status: Props['status']) {
      if (status === 'init') {
         return false
      }
   }

   return (
      <Card className={'w-fit px-5 py-3'}>
         <Checkbox
            label={'I’m not a robot'}
            variant={'recaptcha'}
            checked={getCheckedStatus(status)}
         />
         <ReCaptchaIcon className={'h-[44px] w-[44px]'} />
         <RecaptchaSuccessIcon />
         <RecaptchaSpinner />
      </Card>
   )
}
