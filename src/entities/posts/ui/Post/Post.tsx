import { Slider } from '@/shared/components/Slider'
import { PostHeader } from '@/entities/posts/ui/Post/PostHeader'
import { PostBody } from '@/entities/posts/ui/Post/PostBody'
import { PostFooter } from '@/entities/posts/ui/Post/PostFooter'
import { PostModal } from '@/shared/components/PostModal'
import type { PostByIdType } from '@/features/posts/api'

type Props = {
   post: PostByIdType
   onClose?: () => void
}

export const Post = ({ post, onClose }: Props) => {
    return (
      <PostModal
         size={'post-management'}
         contentColumns={'two'}
         onOpenChange={onClose}
         leftContent={<Slider images={post.images.map(el => el.url)} className={'h-full w-full'} />}
         rightContent={
            <>
               <PostHeader user={post.user} postId={post.postId} />
               <PostBody
                  user={post.user}
                  description={post.description}
                  updatedAt={post.updatedAt}
               />
               <PostFooter post={post} />
            </>
         }
         rightContentClassName={'flex h-[562px] w-[482px] flex-col'}
      />
   )
}
