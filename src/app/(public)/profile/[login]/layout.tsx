import { ReactNode } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'

export default function ProfilePublicLayout({ children }: { children: ReactNode }) {
   return (
      <PageContainer
         className={'mx-auto w-full flex-row items-stretch justify-center px-[60px] py-0'}
      >
         <div className={'ml-0 flex w-full max-w-[992px] justify-center border-none'}>
            {children}
         </div>
      </PageContainer>
   )
}
