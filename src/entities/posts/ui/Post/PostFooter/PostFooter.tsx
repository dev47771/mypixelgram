import { PostActions } from '@/entities/posts/ui/Post/PostFooter/PostActions'
import { PostStats } from '@/entities/posts/ui/Post/PostFooter/PostStats'
import { PostAddComment } from '@/entities/posts/ui/Post/PostFooter/PostAddComment'
import type { PostByIdType } from '@/features/posts/api'
import { useMeQuery } from '@/features/auth/api'

type Props = {
   post: PostByIdType
}
export const PostFooter = ({ post }: Props) => {
   const { data: me } = useMeQuery()
   return (
      <>
         <div className={'border-dark-100 border-b px-6 pt-3 pb-2'}>
            {me && <PostActions />}
            <PostStats
               userAvatar={post.user.avatar}
               dateCreated={post.createdAt}
               likesCount={post.likesCount}
            />
         </div>
         {me && <PostAddComment />}
      </>
   )
}
