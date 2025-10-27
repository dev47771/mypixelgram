'use client'

import { Button } from '@/shared/components/Button'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/components/Select'
import { Typography } from '@/shared/components/Typography'
import { DropDownMenu, DropDownMenuItem, DropDownSeparator } from '@/shared/components/DropDownMenu'
import { DropDownMenuArrow } from '@/shared/components/DropDownMenu/DDropDownMenuArrow'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'
import { FlagRussiaIcon, FlagUKIcon, NotificationIcon } from '@/shared/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PublicRoutes } from '@/shared/enums'
import { TOKEN } from '@/shared/constants'
import { usePathname } from 'next/navigation'

type Props = {
   notificationCount?: number
   selectedLanguage?: string
}

export const Header = ({ notificationCount = 0, selectedLanguage = 'EN' }: Props) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [isClient, setIsClient] = useState(false)
   const pathname = usePathname()
   const isLoginRoute = pathname === PublicRoutes.signIn

   /**
    *setIsClient - flag synchronizes rendering between the server and the client (eliminating blinking on reboot)
    *setIsLoggedIn - authentication token check
    */
   useEffect(() => {
      setIsClient(true)
      setIsLoggedIn(!!localStorage.getItem(TOKEN))

      const handleStorageChange = (e: StorageEvent) => {
         if (e.key === TOKEN) {
            setIsLoggedIn(!!localStorage.getItem(TOKEN))
         }
      }

      window.addEventListener('storage', handleStorageChange)

      return () => {
         window.removeEventListener('storage', handleStorageChange)
      }
   }, [isLoginRoute])

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
   if (!isClient) {
      return null
   }

   return (
      <header className="border-dark-300 border-b">
         <div className="container flex h-[60px] items-center justify-between">
            <Typography as={'h1'} variant="large">
               Inctagram
            </Typography>
            {isLoggedIn ? (
               <div className="flex items-center">
                  <div className="mr-[50px]">
                     {notificationCount > 0 && (
                        <DropDownMenu
                           trigger={
                              <DropDownMenuTrigger>
                                 <NotificationIcon count={notificationCount} />
                              </DropDownMenuTrigger>
                           }
                           align={'end'}
                           className={'px-2 py-1'}
                           sideOffset={-4}
                           label="Notification"
                        >
                           <DropDownMenuArrow>
                              <span></span>
                           </DropDownMenuArrow>

                           <DropDownSeparator />

                           <DropDownMenuItem>
                              <Typography variant="h3"> Новое уведомление!</Typography>
                              <Typography as="span">новое</Typography>
                              <Typography>Следующий платеж у вас спишется через 1 день</Typography>
                              <Typography variant="captionRegular">1 час назад</Typography>
                           </DropDownMenuItem>
                        </DropDownMenu>
                     )}
                  </div>
                  {selectComponent}
               </div>
            ) : (
               <div className="flex gap-[24px]">
                  {selectComponent}
                  <Button asChild variant="textButton">
                     <Link href={PublicRoutes.signIn}>Log in</Link>
                  </Button>
                  <Button asChild variant="primary">
                     <Link href={PublicRoutes.signUp}>Sign up</Link>
                  </Button>
               </div>
            )}
         </div>
      </header>
   )
}
