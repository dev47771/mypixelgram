'use client'
import type { PostByIdType } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { usePostController } from '@/features/posts/hooks'
import { EditPostModal } from '@/entities/posts/ui/modals/EditPostModal'

export function PostClientWrapper({ post }: { post: PostByIdType }) {
   const { closePostModal, closeEditPostModal, isEditOpen } = usePostController()

   return (
      <>
         <Post post={post} onClose={closePostModal} />
         {isEditOpen && post && <EditPostModal post={post} onCloseAction={closeEditPostModal} />}
      </>
   )
}
