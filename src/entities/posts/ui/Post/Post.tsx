import { Slider } from '@/shared/components/Slider'
import { PostHeader } from '@/entities/posts/ui/Post/PostHeader'
import { PostBody } from '@/entities/posts/ui/Post/PostBody'
import { PostFooter } from '@/entities/posts/ui/Post/PostFooter'
import { PostModal } from '@/shared/components/PostModal'
import type { Post as PostType } from '@/entities/posts/model'

type Props = {
   post: PostType
}

export const Post = ({ post }: Props) => {
   return (
      <PostModal
         size={'post-management'}
         contentColumns={'two'}
         leftContent={
            <Slider images={post.images} className={'h-[562px] w-[490px] overflow-hidden'} />
         }
         rightContent={
            <>
               <PostHeader post={post} />
               <PostBody post={post} />
               <PostFooter post={post} />
            </>
         }
         rightContentClassName={'flex h-[562px] w-[482px] flex-col'}
      />
   )
}
