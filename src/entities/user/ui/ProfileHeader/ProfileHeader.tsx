import { UserAvatar } from '../UserAvatar'
import { UserStats } from '../UserStats'
import { Typography } from '@/shared/components/Typography'
import { PostOutlineIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { useGetUserByLoginQuery } from '@/entities/user'
import React from 'react'
import { useMeQuery } from '@/features/auth/api'

type Props = {
   login: string
}

export const ProfileHeader = ({ login }: Props) => {
   const { data: userProfile, isLoading: isProfileLoading } = useGetUserByLoginQuery(login)
   const { data: owner, isLoading: isOwnerProfileLoading } = useMeQuery()
   const isOwnerProfile = userProfile?.user.id === owner?.userId

   if (isProfileLoading || isOwnerProfileLoading) {
      return 'Loading...' // в дальнейшем скелетон
   }

   if (!userProfile) {
      return <Typography className={'text-center'}>User not found</Typography>
   }

   const { user, following, followers, publicationCount, description } = userProfile

   return (
      <div className="flex gap-9.5">
         <div>
            {user.avatar ? (
               <UserAvatar size={'L'} src={user.avatar} alt={'user avatar'} />
            ) : (
               <div
                  className={'bg-dark-500 flex h-51 w-51 items-center justify-center rounded-full'}
               >
                  <PostOutlineIcon width={36} height={36} />
               </div>
            )}
         </div>

         <div className="flex w-full flex-col">
            <div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Typography variant={'h1'}>{user.login}</Typography>
                     {/*{isPaidAccount && <PaidIcon />}*/}
                  </div>

                  {isOwnerProfile ? (
                     <Button variant={'secondary'} asChild>
                        <Link href={'#'}>Profile Settings</Link>
                     </Button>
                  ) : (
                     <div className={'flex items-center gap-3'}>
                        <Button>Follow</Button>
                        <Button variant={'secondary'}>Send Message</Button>
                     </div>
                  )}
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
