'use client'
import { Sidebar } from '@/widgets/Sidebar'
import { ReactNode } from 'react'
import { withPrivateRoute } from '@/shared/HOC/withPrivateRoute'

function FeedLayout({ children }: { children: ReactNode }) {
   return (
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start px-[60px]">
         <Sidebar />
         <div className="border-dark-300 ml-[162px] border-l">{children}</div>
      </div>
   )
}

export default withPrivateRoute(FeedLayout)
