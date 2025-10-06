import { Typography } from '@/shared/components/Typography'
import { Button } from '@/shared/components/Button'
import { PageContainer } from '@/shared/components/PageContainer'
import Image from 'next/image'
import confirmed from './assets/confirmed.png'
import Link from 'next/link'

export default function SignUpSuccessPage() {
   return (
      <PageContainer>
         <Typography variant="h1" className={'mt-3'}>
            Congratulations!
         </Typography>
         <Typography className={'mt-5 mb-[54px]'}>Your email has been confirmed</Typography>
         <Button asChild className={'w-full max-w-[182px]'}>
            <Link href={'/sign-in'}>Sign In</Link>
         </Button>
         <Image
            src={confirmed}
            alt="email-confirmed"
            quality={90}
            width={432}
            height={300}
            className={'mt-[72px] mb-[84px]'}
         />
      </PageContainer>
   )
}
