'use client'

import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'
import { withPrivateRoute } from '@/shared/HOC/withPrivateRoute'
import { PageContainer } from '@/shared/components/PageContainer'

function ProfileLayout({ children }: { children: ReactNode }) {
   return (
      <PageContainer
         className={'mx-auto w-full flex-row items-stretch justify-between px-[60px] py-0'}
      >
         <Sidebar />
         <div className="border-dark-300 ml-[162px] min-h-screen w-full border-l">{children}</div>
      </PageContainer>
   )
}

export default withPrivateRoute(ProfileLayout)
