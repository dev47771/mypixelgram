import { PostActions } from '@/entities/posts/ui/Post/PostFooter/PostActions'
import { PostStats } from '@/entities/posts/ui/Post/PostFooter/PostStats'
import { PostAddComment } from '@/entities/posts/ui/Post/PostFooter/PostAddComment'
import type { PostByIdType } from '@/features/posts/api'

type Props = {
   post: PostByIdType
}
export const PostFooter = ({ post }: Props) => {
   return (
      <>
         <div className={'border-dark-100 border-b px-6 pt-3 pb-2'}>
            <PostActions />
            <PostStats
               userAvatar={post.user.avatar}
               dateCreated={post.createdAt}
               likesCount={post.likesCount}
            />
         </div>
         <PostAddComment />
      </>
   )
}
