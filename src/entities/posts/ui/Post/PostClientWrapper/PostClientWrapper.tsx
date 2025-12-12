'use client'
import type { PostByIdType } from '@/features/posts/api'
import { Post } from '@/entities/posts/ui/Post'
import { usePostController } from '@/features/posts/hooks'

export function PostClientWrapper({ post }: { post: PostByIdType }) {
   const { closePostModal } = usePostController()

   return <Post post={post} onClose={closePostModal} />
}
