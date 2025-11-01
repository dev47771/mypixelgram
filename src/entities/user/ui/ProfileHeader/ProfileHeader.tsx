import { UserAvatar } from '../UserAvatar'
import { UserStats } from '../UserStats'
import { Typography } from '@/shared/components/Typography'
import { PostOutlineIcon } from '@/shared/icons'
import { User } from '@/entities/user'
import { Button } from '@/shared/components/Button'
import Link from 'next/link'
import { PaidIcon } from '@/shared/icons'

type ProfileHeaderProps = {
   user: User
   isOwnerProfile?: boolean
   isPaidAccount?: boolean
}

export const ProfileHeader = ({
   user,
   isOwnerProfile = true,
   isPaidAccount = true,
}: ProfileHeaderProps) => (
   <div className="flex gap-9.5">
      <div className="">
         {user.avatarUrl ? (
            <UserAvatar size={204} src={user.avatarUrl} />
         ) : (
            <div className={'bg-dark-500 flex h-51 w-51 items-center justify-center rounded-full'}>
               <PostOutlineIcon width={36} height={36} />
            </div>
         )}
      </div>

      <div className="flex flex-col">
         <div>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Typography variant={'h1'}>{user.username}</Typography>
                  {isPaidAccount && <PaidIcon />}
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
                  followers={user.followers}
                  following={user.following}
                  publications={user.publications}
               />
            </div>
         </div>

         <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco{' '}
            <Typography variant={'linkRegular'} as={Link} href={'#'}>
               {' '}
               laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
         </Typography>
      </div>
   </div>
)
