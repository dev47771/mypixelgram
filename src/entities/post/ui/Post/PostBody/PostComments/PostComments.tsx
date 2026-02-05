import { Comment } from '@/entities/comment/ui'
/* eslint-disable @typescript-eslint/no-explicit-any */
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
