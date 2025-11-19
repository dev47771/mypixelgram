'use client'

import { useMeQuery } from '@/features/auth/api'
import { cn } from '@/shared/lib'
import { Sidebar } from '@/widgets/Sidebar'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
   const { data } = useMeQuery()

   return (
      <div
         className={cn(
            'mx-auto flex w-full max-w-[1280px] px-[60px]',
            data ? 'flex-col items-start' : 'justify-center'
         )}
      >
         {data ? <Sidebar /> : null}
         <div
            className={cn(
               'border-dark-300 min-h-screen border-l transition-all duration-300',
               data ? 'ml-[162px]' : 'ml-0 flex justify-center border-none'
            )}
         >
            {children}
         </div>
      </div>
   )
}
