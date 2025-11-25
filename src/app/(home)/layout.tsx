'use client'

import { useMeQuery } from '@/features/auth/api'
import { cn } from '@/shared/lib'
import { Sidebar } from '@/widgets/Sidebar'
import { createContext, useContext } from 'react'

const AuthContext = createContext<{ isAuthorized: boolean }>({
   isAuthorized: false,
})

export const useAuth = () => useContext(AuthContext)

export default function HomeLayout({ children }: { children: React.ReactNode }) {
   const { data, isLoading } = useMeQuery()
   const isAuthorized = !!data && !isLoading

   return (
      <AuthContext.Provider value={{ isAuthorized }}>
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
      </AuthContext.Provider>
   )
}
