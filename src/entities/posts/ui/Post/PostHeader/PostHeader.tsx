import { Typography } from '@/shared/components/Typography'
import { PostMenu } from '@/entities/posts/ui/Post/PostHeader/PostMenu'

import { Avatar } from '@/shared/components/Avatar'
import type { UserType } from '@/entities/user'
import { useMeQuery } from '@/features/auth/api'
import { ProfileLink } from '@/shared/components/ProfileLink'

type Props = {
   user: UserType
   postId: string
}

export const PostHeader = ({ user, postId }: Props) => {
   const { data: me } = useMeQuery()
   const isOwner = me?.userId === user.id

   return (
      <div className={'border-dark-100 flex items-center gap-3 border-b px-6 py-[11px]'}>
         <ProfileLink login={user.login} className="flex items-center gap-3">
            <Avatar src={user.avatar} size={'sm'} />
            <Typography variant={'h3'}>{user.login}</Typography>
         </ProfileLink>
         {me && <PostMenu isOwner={isOwner} postId={postId} />}
      </div>
   )
}
