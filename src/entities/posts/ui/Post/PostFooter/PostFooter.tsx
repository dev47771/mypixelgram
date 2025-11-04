import { PostActions } from '@/entities/posts/ui/Post/PostFooter/PostActions'
import { PostStats } from '@/entities/posts/ui/Post/PostFooter/PostStats'
import { PostAddComment } from '@/entities/posts/ui/Post/PostFooter/PostAddComment'
import type { Post as PostType } from '@/entities/posts/model'

type Props = {
   post: PostType
}
export const PostFooter = ({ post }: Props) => {
   return (
      <>
         <div className={'border-dark-100 border-b px-6 pt-3 pb-2'}>
            <PostActions />
            <PostStats
               userAvatar={post.userAvatar}
               dateCreated={post.dateCreated}
               likesCount={post.likesCount}
            />
         </div>
         <PostAddComment />
      </>
   )
}
