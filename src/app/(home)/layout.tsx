'use client'

import { useMeQuery } from '@/features/auth/api'
import { cn } from '@/shared/lib'
import { Sidebar } from '@/widgets/Sidebar'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
   const { error } = useMeQuery()

   const isAuthorized = !(error && 'status' in error && error.status === 401)

   return (
      <div
         className={cn(
            'mx-auto flex w-full max-w-[1280px] px-[60px]',
            isAuthorized ? 'flex-col items-start' : 'justify-center'
         )}
      >
         {isAuthorized ? <Sidebar /> : null}
         <div
            className={`border-dark-300 min-h-screen border-l transition-all duration-300 ${
               isAuthorized ? 'ml-[180px]' : 'ml-0 flex justify-center border-none'
            }`}
         >
            {children}
         </div>
      </div>
   )
}
