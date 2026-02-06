'use client'
import type { PostByIdType } from '@/features/post/api'
import { Post } from '@/entities/post/ui/Post'
import { usePostController } from '@/features/post/hooks'
import { EditPostModal } from '@/features/post-creator/ui/modals/EditPostModal'

export function PostClientWrapper({ post }: { post: PostByIdType }) {
   const { closePostModal, closeEditPostModal, isEditOpen } = usePostController()

   return (
      <>
         <Post post={post} onClose={closePostModal} />
         {isEditOpen && post && <EditPostModal post={post} onCloseAction={closeEditPostModal} />}
      </>
   )
}
