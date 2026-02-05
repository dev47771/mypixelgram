import { Slider } from '@/shared/components/Slider'
import { PostHeader } from '@/entities/post/ui/Post/PostHeader'
import { PostBody } from '@/entities/post/ui/Post/PostBody'
import { PostFooter } from '@/entities/post/ui/Post/PostFooter'
import { PostModal } from '@/shared/components/PostModal'
import type { PostByIdType } from '@/features/post/api'
import { Loader } from '@/shared/components/Loader'
import React from 'react'

type Props = {
   post: PostByIdType
   onClose?: () => void
   isFetchingPost?: boolean
}

export const Post = ({ post, onClose, isFetchingPost }: Props) => {
   if (isFetchingPost) {
      return <PostModal size={'post-management'} contentColumns={'two'} rightContent={<Loader />} /> // skeleton?
   }

   return (
      <PostModal
         portal={React.Fragment}
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
