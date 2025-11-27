import { Button } from '@/shared/components/Button'
import { apiUrls } from '@/shared/constants'
import { GoogleIcon } from '@/shared/icons'
import { useRouter } from 'next/navigation'

export const GoogleOAuthButton = () => {
   const router = useRouter()
   const onAuthWithGoogle = () => {
      router.push(apiUrls.loginGoogle)
   }
   return (
      <Button variant={'textButton'} onClick={onAuthWithGoogle} className={'p-0'}>
         <GoogleIcon className={'h-[36px] w-[36px]'} />
      </Button>
   )
}
