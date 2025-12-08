import { Avatar } from '@/shared/components/Avatar'
import { Typography } from '@/shared/components/Typography'
import { ProfileLink } from '@/shared/components/ProfileLink'

type Props = {
   avatar?: string | null
   userName: string
   relativeTime: string
}

export const UserBlock = ({ avatar, userName, relativeTime }: Props) => {
   return (
      <div className="flex flex-col gap-2">
         <ProfileLink login={userName} className="flex items-center gap-3">
            <Avatar src={avatar} alt={userName} />
            <Typography as="span" variant="h3">
               {userName}
            </Typography>
         </ProfileLink>
         <Typography as="span" variant="smallRegular" className="text-light-900">
            {relativeTime}
         </Typography>
      </div>
   )
}
