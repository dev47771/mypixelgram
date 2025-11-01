import { Comment } from '@/entities/comments/ui'

type Props = {
   comments: any
}

export const PostComments = ({ comments }: Props) => {
   return (
      <>
         {comments.map((comment: any, i: number) => (
            <Comment key={i} comment={comment} />
         ))}
      </>
   )
}
