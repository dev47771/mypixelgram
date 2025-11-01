import { PostDescription } from '@/entities/posts/ui/Post/PostBody/PostDescription'
import { PostComments } from '@/entities/posts/ui/Post/PostBody/PostComments'

type Props = {
   post: any
}
export const PostBody = ({ post }: Props) => {
   return (
      <div className={'border-dark-100 min-h-0 grow gap-[15px] overflow-y-auto border-b px-6'}>
         {post.description && <PostDescription post={post} />}
         <PostComments comments={post.comments} />
      </div>
   )
}
