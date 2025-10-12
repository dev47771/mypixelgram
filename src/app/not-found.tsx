import Link from 'next/link'
import notFoundImage from '../../public/404.jpg'
import Image from 'next/image'
import { Button } from '@/shared/components/Button'
import { PageContainer } from '@/shared/components/PageContainer'

export default function NotFound() {
   return (
      <PageContainer className={'flex-1 justify-center'}>
         <Image src={notFoundImage} alt="Not Found" width={450} height={190} />

         <h1 className={'mt-5 mb-3'}>Page not found</h1>

         <Button asChild>
            <Link href="/">На главную</Link>
         </Button>
      </PageContainer>
   )
}
