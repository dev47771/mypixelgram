import { Button } from '@/shared/components/Button'
import { GoogleIcon } from '@/shared/icons'
import { AuthEndpoints } from '@/shared/enums'
import { useRouter } from 'next/navigation'

export const GoogleOAuthButton = () => {
   const router = useRouter()
   const onAuthWithGoogle = () => {
      router.push(`${process.env.NEXT_PUBLIC_BASE_URL}${AuthEndpoints.loginGoogle}`)
   }
   return (
      <Button variant={'textButton'} onClick={onAuthWithGoogle} className={'p-0'}>
         <GoogleIcon className={'h-[36px] w-[36px]'} />
      </Button>
   )
}
