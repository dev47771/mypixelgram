'use client'

import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'

export default function ProfilePrivateLayout({ children }: { children: ReactNode }) {
   return (
      <PageContainer
         className={'mx-auto w-full flex-row items-stretch justify-center px-[60px] py-0'}
      >
         <Sidebar />
         <div className={'ml-[162px] w-full'}>{children}</div>
      </PageContainer>
   )
}
