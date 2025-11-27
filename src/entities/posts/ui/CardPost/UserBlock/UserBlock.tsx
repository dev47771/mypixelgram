import { Avatar } from '@/shared/components/Avatar'
import { Typography } from '@/shared/components/Typography'
import { useMeQuery } from '@/features/auth/api'
import Link from 'next/link'
import { profileRoutes } from '@/shared/enums'

type Props = {
   avatar?: string | null
   userName: string
   relativeTime: string
}

export const UserBlock = ({ avatar, userName, relativeTime }: Props) => {
   const { data: me } = useMeQuery()

   return (
      <div className="flex flex-col gap-2">
         <Link
            href={me ? profileRoutes.private(userName) : profileRoutes.public(userName)}
            className="flex items-center gap-3"
         >
            <Avatar src={avatar} alt={userName} />
            <Typography as="span" variant="h3">
               {userName}
            </Typography>
         </Link>
         <Typography as="span" variant="smallRegular" className="text-light-900">
            {relativeTime}
         </Typography>
      </div>
   )
}
