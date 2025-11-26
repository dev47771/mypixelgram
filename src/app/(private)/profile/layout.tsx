'use client'

import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'
import { PageContainer } from '@/shared/components/PageContainer'
import { useMeQuery } from '@/features/auth/api'
import { cn } from '@/shared/lib'

export default function ProfileLayout({ children }: { children: ReactNode }) {
   const { data: me } = useMeQuery()

   return (
      <PageContainer
         className={'mx-auto w-full flex-row items-stretch justify-center px-[60px] py-0'}
      >
         {me && <Sidebar />}
         <div
            className={cn(
               'border-dark-300 ml-[162px] min-h-screen w-full border-l',
               me ? 'ml-[162px]' : 'ml-0 flex max-w-[992px] justify-center border-none'
            )}
         >
            {children}
         </div>
      </PageContainer>
   )
}
