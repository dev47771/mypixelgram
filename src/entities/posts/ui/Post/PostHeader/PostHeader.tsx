import { Typography } from '@/shared/components/Typography'
import { PostMenu } from '@/entities/posts/ui/Post/PostHeader/PostMenu'

import { Avatar } from '@/shared/components/Avatar'
import type { PostByIdType } from '@/features/posts/api'

type Props = {
   post: PostByIdType
}

export const PostHeader = ({ post }: Props) => {
   return (
      <div className={'border-dark-100 flex items-center gap-3 border-b px-6 py-[11px]'}>
         <Avatar src={post.user.avatar} size={'sm'} />
         <Typography variant={'h3'}>{post.user.login}</Typography>
         <PostMenu isOwner />
      </div>
   )
}
