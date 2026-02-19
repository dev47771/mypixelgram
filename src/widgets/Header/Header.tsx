'use client'

import { Button } from '@/shared/components/Button'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/Select'
import { variantClasses } from '@/shared/components/Typography'
import { FlagRussiaIcon, FlagUKIcon } from '@/shared/icons'
import Link from 'next/link'
import { ROUTES } from '@/shared/constants'
import { useMeQuery } from '@/features/auth/api'
import { NotificationsDropdown } from '@/entities/notification'
import React from 'react'
type Props = {
   selectedLanguage?: string
}

export const Header = ({ selectedLanguage = 'EN' }: Props) => {
   // const [isLoggedIn, setIsLoggedIn] = useState(false)
   // const [isClient, setIsClient] = useState(false)
   // const pathname = usePathname()
   // const isLoginRoute = pathname === ROUTES.public.signIn
   const { data, isLoading } = useMeQuery()
   /**
    *setIsClient - flag synchronizes rendering between the server and the client (eliminating blinking on reboot)
    *setIsLoggedIn - authentication token check
    */
   // useEffect(() => {
   //    setIsClient(true)
   //    setIsLoggedIn(!!localStorage.getItem(TOKEN))
   //
   //    const handleStorageChange = (e: StorageEvent) => {
   //       if (e.key === TOKEN) {
   //          setIsLoggedIn(!!localStorage.getItem(TOKEN))
   //       }
   //    }
   //
   //    window.addEventListener('storage', handleStorageChange)
   //
   //    return () => {
   //       window.removeEventListener('storage', handleStorageChange)
   //    }
   // }, [isLoginRoute])

   const selectComponent = (
      <Select defaultValue={selectedLanguage}>
         <SelectTrigger className="w-[160px]">
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            <SelectItem value="RU">
               <FlagRussiaIcon />
               Russian
            </SelectItem>
            <SelectItem value="EN">
               <FlagUKIcon />
               English
            </SelectItem>
         </SelectContent>
      </Select>
   )

   //removes the incorrect state (blinking)
   // if (!isClient) {
   //    return null
   // }

   return (
      <header className="border-dark-300 bg-dark-700 border-b">
         <div className="bg-dark-700 relative z-10 container flex h-[60px] items-center justify-between">
            <Link href={ROUTES.public.main} className={variantClasses.large}>
               Inctagram
            </Link>
            {isLoading ? (
               <div />
            ) : data ? (
               <div className="flex items-center">
                  <div className="mr-[50px]">
                     <NotificationsDropdown />
                  </div>
                  {selectComponent}
               </div>
            ) : (
               <div className="flex gap-[24px]">
                  {selectComponent}
                  <Button asChild variant="textButton">
                     <Link href={ROUTES.public.signIn}>Log in</Link>
                  </Button>
                  <Button asChild variant="primary">
                     <Link href={ROUTES.public.signUp}>Sign up</Link>
                  </Button>
               </div>
            )}
         </div>
      </header>
   )
}
