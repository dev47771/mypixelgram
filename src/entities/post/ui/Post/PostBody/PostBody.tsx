import { PostDescription } from '@/entities/post/ui/Post/PostBody/PostDescription'
import { UserType } from '@/entities/user/api'
// import { PostComments } from '@/entities/posts/ui/Post/PostBody/PostComments'

type Props = {
   description: string
   user: UserType
   updatedAt: string
}
export const PostBody = ({ description, user, updatedAt }: Props) => {
   return (
      <div className={'border-dark-100 min-h-0 grow gap-[15px] overflow-y-auto border-b px-6'}>
         {description && (
            <PostDescription description={description} user={user} updatedAt={updatedAt} />
         )}
         {/*<PostComments comments={post.comments} />*/}
      </div>
   )
}
