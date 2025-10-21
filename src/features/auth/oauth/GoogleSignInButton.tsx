import { Button } from '@/shared/components/Button'
import { GoogleIcon } from '@/shared/icons'
import { AuthEndpoints } from '@/shared/enums'
import { useRouter } from 'next/navigation'

export const GoogleSignInButton = () => {
   const router = useRouter()
   const onSignUpGoogle = () => {
      router.push(AuthEndpoints.loginGoogle)
   }
   return (
      <Button variant={'textButton'} onClick={onSignUpGoogle} className={'p-0'}>
         <GoogleIcon className={'h-[36px] w-[36px]'} />
      </Button>
   )
}
