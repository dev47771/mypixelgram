'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/widgets/Sidebar'
import { cn } from '@/shared/lib'
import { PublicRoutes } from '@/shared/enums'

export const LayoutClient = ({ children }: { children: React.ReactNode }) => {
   const pathname = usePathname()
   const isSidebarVisible = (Object.values(PublicRoutes) as string[]).includes(pathname)
   return (
      <div
         className={cn(
            'mx-auto flex w-full max-w-[1280px] px-[60px]',
            isSidebarVisible ? 'justify-center' : 'flex-col items-start'
         )}
      >
         {isSidebarVisible ? null : <Sidebar />}
         <div
            className={`border-dark-300 min-h-screen border-l transition-all duration-300 ${
               isSidebarVisible ? 'ml-0 flex justify-center border-none' : 'ml-[180px]'
            }`}
         >
            {children}
         </div>
      </div>
   )
}
