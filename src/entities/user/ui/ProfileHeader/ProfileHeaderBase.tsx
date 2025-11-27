import { Typography } from '@/shared/components/Typography'
import { PostOutlineIcon } from '@/shared/icons'
import { Avatar } from '@/shared/components/Avatar'
import { UserProfileType, UserStats } from '@/entities/user'
import { ReactNode } from 'react'

type ProfileHeaderBaseProps = {
   actions: ReactNode
} & UserProfileType

export const ProfileHeaderBase = ({
   user,
   followers,
   following,
   publicationCount,
   description,
   actions,
}: ProfileHeaderBaseProps) => {
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

                  {actions}
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
