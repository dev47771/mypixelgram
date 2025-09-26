'use client'

import { Button } from '@/shared/components/Button'
import { Typography } from '@/shared/components/Typography'
import { NotificationIcon } from '@/shared/icons'
import Link from 'next/link'
/* import { useState } from 'react' */

type Props = {
   notificationCount?: number
}

export const Header = ({ notificationCount = 0 }: Props) => {
   /*   const [isLogged, setIsLogged] = useState<string | null>(null) */
   const IS_LOGGED_IN = false

   return (
      <header className="flex justify-between">
         <Typography as={'h1'} variant="large">
            Inctagram
         </Typography>
         {IS_LOGGED_IN ? (
            <div className="flex">
               <NotificationIcon count={notificationCount} />
               <select id="fruits" name="language">
                  <option value="english">English</option>
                  <option value="russian">Russian</option>
               </select>
            </div>
         ) : (
            <div className="flex">
               <select id="fruits" name="language">
                  <option value="english">English</option>
                  <option value="russian">Russian</option>
               </select>
               <Button variant="textButton">
                  <Link href={'#'}>Log in</Link>
               </Button>
               <Button variant="primary">
                  <Link href={'#'}>Sign up</Link>
               </Button>
            </div>
         )}
      </header>
   )
}
