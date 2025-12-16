'use client'

import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode, Suspense } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'

export default function ProfilePrivateLayout({ children }: { children: ReactNode }) {
   return (
      <PageContainer className={'mx-auto w-full flex-row items-stretch justify-center px-15 py-0'}>
         <Suspense>
            <Sidebar />
         </Suspense>
         <div className={'ml-[162px] w-full'}>{children}</div>
      </PageContainer>
   )
}
