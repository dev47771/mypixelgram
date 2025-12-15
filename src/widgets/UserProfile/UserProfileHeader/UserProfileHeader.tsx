'use client'
import { Typography } from '@/shared/components/Typography'
import { PostOutlineIcon } from '@/shared/icons'
import { Avatar } from '@/shared/components/Avatar'
import { UserProfileType, UserStats } from '@/entities/user'
import { ReactNode } from 'react'
import { MeResponse, useMeQuery } from '@/features/auth/api'
import { usePathname } from 'next/navigation'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { settingsRoutes } from '@/shared/enums'

type UserProfileHeaderProps = {
   actions?: ReactNode
   userProfile: UserProfileType
}

export const UserProfileHeader = ({ userProfile }: UserProfileHeaderProps) => {
   const { data: meData } = useMeQuery()
   const { user, followers, following, publicationCount, description } = userProfile
   const pathname = usePathname()
   const userLogin = pathname.split('/')[2]
   return (
      <div className="flex gap-9.5">
         <div>
            {user.avatar ? (
               <Avatar size="lg" src={user.avatar} alt="user avatar" />
            ) : (
               <div className="bg-dark-500 flex h-51 w-51 items-center justify-center rounded-full">
                  <PostOutlineIcon width={36} height={36} />
               </div>
            )}
         </div>

         <div className="flex w-full flex-col">
            <div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Typography variant="h1">{user.login}</Typography>
                  </div>
                  {getActions(meData, userLogin)}
               </div>

               <div className="mt-[25px] mb-[23px]">
                  <UserStats
                     followers={followers}
                     following={following}
                     publications={publicationCount}
                  />
               </div>
            </div>

            <Typography>{description}</Typography>
         </div>
      </div>
   )
}

function getActions(data: MeResponse | undefined, userLogin: string) {
   if (!data) {
      return null
   }

   if (data.login !== userLogin) {
      return (
         <div className="flex items-center gap-3">
            <Button>Follow</Button>
            <Button variant="secondary">Send Message</Button>
         </div>
      )
   }

   return (
      <Button variant="secondary" asChild>
         <Link href={settingsRoutes.base}>Profile Settings</Link>
      </Button>
   )
}
