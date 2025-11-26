import { Typography } from '@/shared/components/Typography'
import { PostMenu } from '@/entities/posts/ui/Post/PostHeader/PostMenu'

import { Avatar } from '@/shared/components/Avatar'
import type { UserType } from '@/entities/user'

type Props = {
   user: UserType
}

export const PostHeader = ({ user }: Props) => {
   return (
      <div className={'border-dark-100 flex items-center gap-3 border-b px-6 py-[11px]'}>
         <Avatar src={user.avatar} size={'sm'} />
         <Typography variant={'h3'}>{user.login}</Typography>
         <PostMenu isOwner />
      </div>
   )
}
