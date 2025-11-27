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
         <div className={'border-dark-300 ml-[162px] min-h-screen w-full border-l'}>{children}</div>
      </PageContainer>
   )
}
